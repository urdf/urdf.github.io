import type { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';
import { buildTools, buildJointTools } from './chat-tools.js';
import type { JointInfo } from './chat-tools.js';
import { executeTool } from './chat-tool-executor.js';
import type { TextBlock, ToolUseBlock, ToolResBlock, ContentBlock, Msg } from './ai-types.js';
import { renderMd } from './ai-types.js';
import { appendUserBubble, appendAssistantBubble, appendSpinner, appendAcceptedBubble, appendStlNote } from './ai-chat-ui.js';
import { AISession, LOCAL_PROXY, MODEL } from './ai-session.js';
import type { ToolCardHandle } from './ai-session.js';
import { $ } from './dom-utils.js';

type GitHubAuth = { username: string; token: string };
type Provider   = 'anthropic' | 'github';

let _connectGitHubFn: ((scope: string, appId: string) => Promise<GitHubAuth>) | null = null;
async function loadConnectGitHub(): Promise<(scope: string, appId: string) => Promise<GitHubAuth>> {
    if (_connectGitHubFn) return _connectGitHubFn;
    // @ts-ignore — CDN module, not bundled by Vite
    const mod = await import(/* @vite-ignore */ 'https://neevs.io/auth/connect.js');
    _connectGitHubFn = mod.connectGitHub;
    return _connectGitHubFn!;
}

function highlightJson(raw: string): string {
    const s = raw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return s
        .replace(/"([^"\\]*(\\.[^"\\]*)*)"(\s*:)/g, '<span class="j-key">"$1"</span>$3')
        .replace(/:\s*"([^"\\]*(\\.[^"\\]*)*)"/g, ': <span class="j-str">"$1"</span>')
        .replace(/:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, ': <span class="j-num">$1</span>')
        .replace(/:\s*(true|false|null)\b/g, ': <span class="j-kw">$1</span>');
}

// ── Public interface ─────────────────────────────────────────────────────────

export interface ChatCallbacks {
    isEditorTabActive:        () => boolean;
    handleEditorInput:        (text: string) => void;
    onComponentAdded:         (id: string, type: string) => void;
    onComponentRemoved:       (id: string) => void;
    syncSlidersFromController: () => void;
    switchToBuildTab:         () => void;
    onBriefToggle:            (v: boolean) => void;
    refreshPaletteCounts:     () => void;
    getFocusedComponent:      () => { id: string; type: string; data: ReturnType<URDFBuildController['getComponentData']> } | null;
    getPartsList:             () => string[];
    readPart:                 (filename: string) => Promise<string | null>;
    updatePart:               (filename: string, xml: string) => Promise<boolean>;
    highlightPart:            (jointName: string | null) => void;
    getJointNames:            () => string[];
    initRobot:                (type: 'robot-car' | 'custom', name?: string) => void;
    openPanel:                (section: string) => void;
    openGestureHint:          () => void;
    isGestureActive:          () => boolean;
    setJointValue:            (name: string, angle: number) => void;
    getJointLimits:           () => Record<string, JointInfo>;
}

const SECTION_TITLES: Record<string, string> = {
    chassis: 'Chassis', wheels: 'Wheels', caster: 'Caster',
    battery: 'Battery Box', powerbank: 'Power Bank',
};

// ── Slash-command action maps ─────────────────────────────────────────────────

interface CmdEntry { desc: string; arg?: string; }

const EDITOR_CMDS: Record<string, CmdEntry> = {
    clear:  { desc: 'Clear chat history' },
    format: { desc: 'Prettify URDF XML' },
};

const BUILD_CMDS: Record<string, CmdEntry> = {
    add:    { desc: 'Add a component from the library', arg: 'type' },
    remove: { desc: 'Remove a component by id', arg: 'id' },
    move:   { desc: 'Move a component (x=… y=… z=…)', arg: 'id' },
    chassis:{ desc: 'Update chassis params (key=val …)' },
    wheels: { desc: 'Update wheel params (key=val …)' },
    undo:   { desc: 'Undo last action' },
    redo:   { desc: 'Redo last undone action' },
    reset:  { desc: 'Reset robot to defaults' },
    export: { desc: 'Export URDF + STL ZIP' },
};

// ── Main controller ───────────────────────────────────────────────────────────

export class URDFChatController extends AISession {
    private readonly _buildCtrl: URDFBuildController;
    private readonly _cb: ChatCallbacks;
    private _detailed = false;
    private _guide = false;
    private _cmdAcIdx = -1;
    private _pauseResolve: ((aborted: boolean) => void) | null = null;
    private _provider: Provider = 'anthropic';
    private _model = MODEL;
    private _githubAuth: GitHubAuth | null = null;
    private _attachedStl: { name: string; url: string } | null = null;

    // DOM refs set in init() — _messagesEl, _sendBtn, _abortBtn are inherited from AISession
    private _emptyStateEl!:  HTMLElement;
    private _chatPaneEl!:    HTMLElement;
    private _historyToggleEl!: HTMLButtonElement;
    private _inputEl!:       HTMLTextAreaElement;
    private _detailBtn!:     HTMLButtonElement;
    private _continueBtn!:   HTMLButtonElement;
    private _toolCountBtn!:  HTMLElement;
    private _cmdAcEl!:       HTMLElement;
    private _modelSelectEl!: HTMLSelectElement;
    private _ghBarEl!:       HTMLElement;
    private _apikeyBarEl!:   HTMLElement;
    private _proxyBarEl!:    HTMLElement;
    private _proxyAvailable  = false;

    constructor(buildCtrl: URDFBuildController, cb: ChatCallbacks) {
        super({
            messagesEl: $('chat-messages'),
            sendBtn:    $<HTMLButtonElement>('chat-send'),
            abortBtn:   $<HTMLButtonElement>('chat-abort'),
        });
        this._buildCtrl = buildCtrl;
        this._cb        = cb;
    }

    init(): void {
        this._emptyStateEl = $('chat-empty-state');
        this._chatPaneEl   = this._messagesEl.closest('.chat-pane') as HTMLElement;
        this._historyToggleEl = $<HTMLButtonElement>('chat-history-toggle');
        this._inputEl      = $<HTMLTextAreaElement>('chat-input');
        this._detailBtn   = $<HTMLButtonElement>('chat-brief-toggle');
        this._continueBtn = $<HTMLButtonElement>('chat-continue');
        this._toolCountBtn = $('chat-tool-count');
        this._cmdAcEl      = $('cmd-ac');
        this._modelSelectEl = $<HTMLSelectElement>('chat-model-select');
        this._ghBarEl       = $('chat-github-bar');
        this._apikeyBarEl   = $('chat-apikey-bar');
        this._proxyBarEl    = $('chat-proxy-bar');
        document.getElementById('chat-proxy-dismiss')
            ?.addEventListener('click', () => { this._proxyBarEl.hidden = true; });

        // Probe local proxy once on init
        this._probeProxy();

        // Restore persisted GitHub auth before applying model (so auth bar renders correctly)
        const savedAuth = localStorage.getItem('urdf-gh-auth');
        if (savedAuth) { try { this._githubAuth = JSON.parse(savedAuth); } catch { /**/ } }

        // Restore persisted model selection
        const savedModel = localStorage.getItem('urdf-chat-model');
        if (savedModel) this._modelSelectEl.value = savedModel;
        this._applyModel(this._modelSelectEl.value);

        this._modelSelectEl.addEventListener('change', () => {
            this._applyModel(this._modelSelectEl.value);
            this._clearChat();
        });

        // Textarea auto-height + autocomplete filter
        this._inputEl.addEventListener('input', () => {
            this._inputEl.style.height = 'auto';
            this._inputEl.style.height = `${Math.min(this._inputEl.scrollHeight, 120)}px`;
            const val = this._inputEl.value;
            if (/^\/[a-z]*$/.test(val)) {
                this._showCmdAc(val.slice(1));
            } else {
                this._hideCmdAc();
            }
        });

        // Keydown — autocomplete navigation + send
        this._inputEl.addEventListener('keydown', (e) => {
            if (!this._cmdAcEl.hidden) {
                const items = this._cmdAcEl.querySelectorAll<HTMLElement>('.cmd-ac-item');
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this._cmdAcIdx = (this._cmdAcIdx + 1) % items.length;
                    this._updateCmdAcSelection(items);
                    return;
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this._cmdAcIdx = (this._cmdAcIdx - 1 + items.length) % items.length;
                    this._updateCmdAcSelection(items);
                    return;
                }
                if (e.key === 'Tab' || (e.key === 'Enter' && this._cmdAcIdx >= 0)) {
                    const sel = items[this._cmdAcIdx];
                    if (sel) { e.preventDefault(); this._applyCmd(sel.dataset.cmd!); return; }
                }
                if (e.key === 'Escape') { this._hideCmdAc(); return; }
            }
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._handleSend(); }
        });

        this._sendBtn.addEventListener('click',  () => this._handleSend());
        this._abortBtn.addEventListener('click', () => {
            this._abortCtrl?.abort();
            this._pauseResolve?.(true);
        });

        // Detail toggle: label reflects current state (Brief → Verbose)
        this._detailBtn.addEventListener('click', () => {
            this._detailed = !this._detailed;
            this._detailBtn.classList.toggle('active', this._detailed);
            this._detailBtn.setAttribute('aria-pressed', String(this._detailed));
            this._detailBtn.textContent = this._detailed ? 'Verbose' : 'Brief';
            this._cb.onBriefToggle(!this._detailed);
        });

        this._continueBtn.addEventListener('click', () => this._pauseResolve?.(false));

        document.getElementById('chat-guide-start')!.addEventListener('click', () => {
            this._guide = true;
            // Always reset to a blank Build canvas before the guide starts —
            // don't leave this to Claude, it's too easy to skip.
            this._cb.initRobot('robot-car');
            this._runConversation('Please guide me through building this robot step by step.');
        });
        document.getElementById('chat-new-robot')?.addEventListener('click', () => {
            this._guide = false;
            this._cb.initRobot('custom', 'My Robot');
            this._inputEl.focus();
        });
        for (const chip of document.querySelectorAll<HTMLButtonElement>('.chat-empty-chip')) {
            chip.addEventListener('click', () => {
                const prompt = chip.dataset.prompt?.trim();
                if (!prompt) return;
                this._inputEl.value = prompt;
                this._inputEl.dispatchEvent(new Event('input'));
                this._inputEl.focus();
            });
        }
        this._historyToggleEl.addEventListener('click', () => {
            const open = !this._messagesEl.classList.contains('show-accepted-history');
            this._messagesEl.classList.toggle('show-accepted-history', open);
            this._historyToggleEl.setAttribute('aria-expanded', String(open));
            this._syncAcceptedHistoryToggle();
        });

        // Global keydown — double-Escape to clear, single key to focus chat
        let _lastEsc = 0;
        document.addEventListener('keydown', (e) => {
            if (document.body.classList.contains('editor-open')) return;
            const active = document.activeElement as HTMLElement | null;

            if (e.key === 'Escape') {
                const now = Date.now();
                if (now - _lastEsc < 400) {
                    if (confirm('Clear chat history?')) this._clearChat();
                    _lastEsc = 0;
                    return;
                }
                _lastEsc = now;
                return;
            }

            if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
            if (active?.isContentEditable) return;
            if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
            this._inputEl.focus();
        });

        this.syncToolCount();
        this._restoreHistory();
        this._syncAcceptedHistoryToggle();
    }

    protected override _onSessionFinally(): void {
        this._hideContinueButton();
    }

    notifyRobotLoaded(): void {
        if (this._history.length > 0) {
            this._clearChat();
            this._appendSystemMsg('Robot changed — conversation reset.');
        }
        this.syncToolCount();
    }

    syncToolCount(): void {
        if (this._toolCountBtn) {
            const active = this._buildCtrl.isCatalogActive;
            this._toolCountBtn.hidden = !active;
            if (active) this._toolCountBtn.textContent = `${this._buildTools().length} tools`;
        }
    }

    resumeFromGesture(): void {
        this._pauseResolve?.(false);
    }

    attachStlFile(name: string, url: string): void {
        this._attachedStl = { name, url };
    }

    private _showContinueButton(): void {
        this._inputEl.disabled   = true;
        this._sendBtn.hidden     = true;
        this._continueBtn.hidden = false;
    }

    private _hideContinueButton(): void {
        this._continueBtn.hidden = true;
        this._sendBtn.hidden     = false;
        this._inputEl.disabled   = false;
        this._pauseResolve       = null;
    }

    private _updateEmptyState(): void {
        const empty = this._history.length === 0;
        this._emptyStateEl.style.display = empty ? 'flex' : 'none';
        this._emptyStateEl.setAttribute('aria-hidden', String(!empty));
        this._chatPaneEl.classList.toggle('chat-empty', empty);
        if (empty) this._messagesEl.classList.remove('show-accepted-history');
        this._syncAcceptedHistoryToggle();
    }

    private _syncAcceptedHistoryToggle(): void {
        const accepted = this._messagesEl.querySelectorAll('.msg.accepted').length;
        const open = this._messagesEl.classList.contains('show-accepted-history');
        this._historyToggleEl.hidden = accepted === 0;
        this._historyToggleEl.textContent = open
            ? `Hide accepted changes (${accepted})`
            : `Show accepted changes (${accepted})`;
    }

    // ── Autocomplete ──────────────────────────────────────────────────────────

    private _activeCmds(): Record<string, CmdEntry> {
        return this._cb.isEditorTabActive() ? EDITOR_CMDS : BUILD_CMDS;
    }

    private _showCmdAc(filter: string): void {
        const cmds = this._activeCmds();
        const matches = Object.entries(cmds).filter(([k]) => k.startsWith(filter));
        if (!matches.length) { this._hideCmdAc(); return; }
        this._cmdAcIdx = 0;
        this._cmdAcEl.innerHTML = matches.map(([k, v], i) => `
            <div class="cmd-ac-item${i === 0 ? ' selected' : ''}" role="option" data-cmd="${k}" aria-selected="${i === 0}">
                <span class="cmd-ac-name">/${k}</span>
                ${v.arg ? `<span class="cmd-ac-arg">&lt;${v.arg}&gt;</span>` : ''}
                <span class="cmd-ac-desc">${v.desc}</span>
            </div>`).join('');
        for (const item of this._cmdAcEl.querySelectorAll<HTMLElement>('.cmd-ac-item')) {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this._applyCmd(item.dataset.cmd!);
            });
        }
        this._cmdAcEl.hidden = false;
    }

    private _hideCmdAc(): void {
        this._cmdAcEl.hidden = true;
        this._cmdAcIdx = -1;
    }

    private _updateCmdAcSelection(items: NodeListOf<HTMLElement>): void {
        items.forEach((it, i) => {
            const selected = i === this._cmdAcIdx;
            it.setAttribute('aria-selected', String(selected));
            it.classList.toggle('selected', selected);
        });
    }

    private _applyCmd(cmd: string): void {
        const cmds = this._activeCmds();
        const entry = cmds[cmd];
        if (!entry) return;
        this._hideCmdAc();
        if (entry.arg) {
            this._inputEl.value = `/${cmd} `;
            this._inputEl.focus();
        } else {
            this._clearInput();
            this._handleSendText(`/${cmd}`);
        }
    }

    private _clearInput(): void {
        this._inputEl.value = '';
        this._inputEl.style.height = '';
    }

    // ── Three-way dispatch ────────────────────────────────────────────────────

    private _handleSend(): void {
        this._hideCmdAc();
        const text = this._inputEl.value.trim();
        if (!text) return;
        this._clearInput();
        this._handleSendText(text);
    }

    private _handleSendText(text: string): void {
        if (this._cb.isEditorTabActive()) {
            this._cb.handleEditorInput(text);
            return;
        }
        if (text.startsWith('/')) {
            void this._executeSlashCommand(text);
            return;
        }
        let message = text;
        if (this._attachedStl) {
            message = `[Attached STL: ${this._attachedStl.name}]\n${text}`;
            this._attachedStl = null;
        }
        void this._runConversation(message);
    }

    // ── Slash commands ────────────────────────────────────────────────────────

    private async _executeSlashCommand(raw: string): Promise<void> {
        const parts = raw.trim().split(/\s+/);
        const cmd   = parts[0].slice(1).toLowerCase();
        const args  = parts.slice(1);

        switch (cmd) {
            case 'add': {
                const type = args[0]?.toLowerCase();
                if (!type) { this._appendSystemMsg('Usage: /add <type>'); return; }
                const entry = LIBRARY.find(e => e.id.toLowerCase() === type || e.label.toLowerCase() === type);
                if (!entry) { this._appendSystemMsg(`Unknown library type: ${type}`); return; }
                if (!this._buildCtrl.isCatalogActive) { this._appendSystemMsg('No robot loaded — use the Build tab first.'); return; }
                try {
                    const { generate } = await entry.factory();
                    const stl = generate();
                    const id  = this._buildCtrl.addMeshComponent(entry.id, stl);
                    this._cb.onComponentAdded(id, entry.id);
                    this._cb.syncSlidersFromController();
                    this._cb.refreshPaletteCounts();
                    this._cb.switchToBuildTab();
                    this._appendSystemMsg(`Added ${entry.label} as ${id}`);
                } catch (err) {
                    this._appendSystemMsg(`Failed to add ${type}: ${(err as Error).message}`);
                }
                return;
            }
            case 'remove': {
                const id = args[0];
                if (!id) { this._appendSystemMsg('Usage: /remove <id>'); return; }
                this._buildCtrl.removeComponent(id);
                this._cb.onComponentRemoved(id);
                this._cb.refreshPaletteCounts();
                this._appendSystemMsg(`Removed ${id}`);
                return;
            }
            case 'move': {
                const id = args[0];
                if (!id) { this._appendSystemMsg('Usage: /move <id> x=… y=… z=…'); return; }
                const kv = this._parseKV(args.slice(1));
                const upd: Record<string, number> = {};
                if (kv.x !== undefined) upd['x'] = parseFloat(kv.x);
                if (kv.y !== undefined) upd['y'] = parseFloat(kv.y);
                if (kv.z !== undefined) upd['z'] = parseFloat(kv.z);
                this._buildCtrl.updateComponent(id, upd);
                this._cb.syncSlidersFromController();
                this._appendSystemMsg(`Moved ${id}`);
                return;
            }
            case 'chassis': {
                const kv = this._parseKV(args);
                const upd: Record<string, number> = {};
                if (kv.thickness)     upd['thickness']     = parseFloat(kv.thickness)     / 1000;
                if (kv.bodyHalfWidth) upd['bodyHalfWidth'] = parseFloat(kv.bodyHalfWidth) / 1000;
                if (kv.rearHalfWidth) upd['rearHalfWidth'] = parseFloat(kv.rearHalfWidth) / 1000;
                this._buildCtrl.updateChassis(upd as Parameters<URDFBuildController['updateChassis']>[0]);
                this._cb.syncSlidersFromController();
                this._appendSystemMsg('Chassis updated');
                return;
            }
            case 'wheels': {
                const kv = this._parseKV(args);
                const upd: Record<string, number> = {};
                if (kv.radius) upd['radius'] = parseFloat(kv.radius) / 1000;
                if (kv.width)  upd['width']  = parseFloat(kv.width)  / 1000;
                this._buildCtrl.updateWheel(upd as Parameters<URDFBuildController['updateWheel']>[0]);
                this._cb.syncSlidersFromController();
                this._appendSystemMsg('Wheels updated');
                return;
            }
            case 'undo':
                this._buildCtrl.undo();
                this._cb.syncSlidersFromController();
                this._appendSystemMsg('Undone');
                return;
            case 'redo':
                this._buildCtrl.redo();
                this._cb.syncSlidersFromController();
                this._appendSystemMsg('Redone');
                return;
            case 'reset':
                this._buildCtrl.resetToDefaults();
                this._cb.syncSlidersFromController();
                this._appendSystemMsg('Reset to defaults');
                return;
            case 'export':
                void this._buildCtrl.exportZip(document.getElementById('build-export') as HTMLButtonElement);
                return;
            default:
                this._appendSystemMsg(`Unknown command: /${cmd}`);
        }
    }

    private _parseKV(args: string[]): Record<string, string> {
        const out: Record<string, string> = {};
        for (const a of args) {
            const [k, v] = a.split('=');
            if (k && v !== undefined) out[k] = v;
        }
        return out;
    }

    // ── Build AI tools ────────────────────────────────────────────────────────

    private _buildTools(): object[] {
        return [
            ...buildTools({
                buildCtrl:       this._buildCtrl,
                guide:           this._guide,
                isGestureActive: this._cb.isGestureActive,
                getPartsList:    this._cb.getPartsList,
            }),
            ...buildJointTools(this._cb.getJointLimits),
        ];
    }

    // ── Tool execution ────────────────────────────────────────────────────────

    protected async _executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
        return executeTool(name, args, {
            buildCtrl:          this._buildCtrl,
            cb:                 this._cb,
            appendChat:         el => this._appendChat(el),
            inputEl:            this._inputEl,
            sendBtn:            this._sendBtn,
            setPauseResolve:    fn => { this._pauseResolve = fn; },
            hideContinueButton: () => this._hideContinueButton(),
            appendActionCard:   (section, message) => this._appendActionCard(section, message),
            setJointValue:      (name, angle) => this._cb.setJointValue(name, angle),
        });
    }

    // ── Conversation engine (copied from editor.ts pattern) ───────────────────

    private _buildSystem(): string {
        const entries = this._buildCtrl.getComponentEntries();
        const compList = entries.length
            ? entries.map(e => {
                const d = this._buildCtrl.getComponentData(e.id);
                return `  - ${e.id} (${e.type}) @ x=${d?.x ?? 0} y=${d?.y ?? 0} z=${d?.z ?? 0}`;
            }).join('\n')
            : '  (none)';

        const cp = this._buildCtrl.chassisParams;
        const wp = this._buildCtrl.wheelParams;

        const focused = this._cb.getFocusedComponent();
        const focusedBlock = focused?.data
            ? `\nFOCUSED: ${focused.id} (${focused.type}) @ x=${focused.data.x} y=${focused.data.y} z=${focused.data.z} — joint: ${focused.data.jointType}\nWhen the user says "this", "it", or "the selected one", refer to this component.`
            : '';

        const parts = this._cb.getPartsList();
        const partsBlock = parts.length > 0
            ? `\nPart files (use read_part + update_part to change colors, materials, or geometry): ${parts.join(', ')}`
            : '';

        const briefNote = (!this._detailed && !this._guide)
            ? '\nBRIEF MODE: Answer in fewer than 4 lines. No preamble. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.'
            : '';

        const jointLimits  = this._cb.getJointLimits();
        const moveableJoints = Object.entries(jointLimits).filter(([, v]) => v.type !== 'fixed');
        const jointBlock = moveableJoints.length > 0
            ? '\nJoints (set_joint_value / set_pose, radians): ' +
              moveableJoints
                  .map(([n, v]) => v.type === 'continuous' ? n : `${n}[${v.lower.toFixed(2)}..${v.upper.toFixed(2)}]`)
                  .join(' ')
            : '';

        const catalogActive = this._buildCtrl.isCatalogActive;
        const jointNames    = this._cb.getJointNames();
        const noRobot       = !catalogActive && parts.length === 0;

        // Pre-built robot with moveable joints (e.g. ORCA Hand) — skip car-specific context entirely
        if (!catalogActive && !this._guide && moveableJoints.length > 0) {
            const gest = this._cb.isGestureActive()
                ? '\nGESTURE MODE ACTIVE: call show_gesture_hint instead of writing gesture lists.\n'
                : '';
            const jointList = moveableJoints
                .map(([n, v]) => v.type === 'continuous' ? n : `${n}[${v.lower.toFixed(2)}..${v.upper.toFixed(2)}]`)
                .join(' ');
            return `${gest}You are a robot joint controller embedded in a live 3D URDF viewer.
A pre-built robot is loaded. Use set_joint_value or set_pose to animate it. Angles in radians; limits enforced automatically.

Joints (${moveableJoints.length} moveable): ${jointList}${partsBlock}

Prefer direct tool calls over explanations. Name poses naturally (fist, peace sign, point, open hand, thumbs up).${briefNote}`;
        }

        const guideContext = noRobot
            ? `The workspace is empty. Ask the user what they want to build, then call init_robot with their choice:
• "robot-car" — Robot Car (TT motors, L298N controller, ESP32-CAM, 4-wheel chassis).
• "custom" — blank chassis to build anything.`
            : entries.length > 0
            ? `Assembly in progress — library components already added: ${entries.map(e => e.type).join(', ')}. Continue from the next unfinished step. Do NOT re-add components that are already listed above.`
            : `The viewer is blank. Build the Robot Car from scratch, one step at a time. Each tool call adds that part to the 3D scene for the first time. Logical order: (1) update_chassis → chassis appears, (2) update_wheels → drive wheels appear, (3) update_caster → caster wheel appears, (4) update_battery_box → battery box appears, (5) update_powerbank → power bank appears, (6) add_component('tt_motor') ×2, (7) add_component('l298n'), (8) add_component('hcsr04'), (9) add_component('esp32_cam'). Do NOT add arduino_nano, mpu6050, or sg90.`;

        const guideBlock = this._guide ? `GUIDE MODE: You are an interactive assembly guide. Rules:
• NO welcome message, intro, step overview list, or preamble. Start immediately with Step 1 content.
• Do NOT write out the gesture reference — it is already shown in the sidebar.
• Write your explanation text FIRST, then call tools. Never call pause as your opening action.
• One step per message. Call pause at the END of each step, after your text and any other tools.
• Call highlight_part (before pause) to show the relevant part in the 3D viewer.
• Be educational — assume the user is learning.
• After pause resolves, the tool result includes state_mm with the current dimensions. If the user changed something noteworthy (physically implausible, mechanically interesting, or very different from the real part), make a brief educational observation before continuing. Otherwise say nothing about the values.
• SPATIAL GROUND TRUTH: placement tools (update_caster, update_battery_box, update_powerbank) return a \`where\` field ("under chassis" or "above chassis") derived from the actual joint Z coordinate. Always use this field when describing where a part sits — never infer position from prior knowledge. Coordinate convention: z < 0 = under chassis plate, z > 0 = above.
• ${guideContext}
${jointNames.length > 0 ? `Current joints in viewer: ${jointNames.join(', ')}` : ''}

` : '';

        const gestureBlock = this._cb.isGestureActive() ? `
GESTURE MODE ACTIVE: The user controls the viewer with hand gestures.
• NEVER write a gesture reference table or list in chat — call show_gesture_hint instead (opens a floating card in the viewer).
• At each pause, end with one line: "Show 👍 to continue."
• Reference other gestures inline only when contextually useful (e.g. "rotate with a fist to see the underside").
` : '';

        return `${guideBlock}${gestureBlock}You are a robot builder assistant embedded in a live 3D URDF viewer.
The robot-car uses: −X = front, +X = rear, −Y = left, +Y = right, +Z = up.

Current chassis: thickness=${(cp.thickness * 1000).toFixed(1)}mm  bodyHW=${(cp.bodyHalfWidth * 1000).toFixed(1)}mm  rearHW=${(cp.rearHalfWidth * 1000).toFixed(1)}mm
Current wheels: radius=${(wp.radius * 1000).toFixed(1)}mm  width=${(wp.width * 1000).toFixed(1)}mm
Current components:
${compList}

Available library components: ${LIBRARY.map(e => e.id).join(', ')}${focusedBlock}${partsBlock}${jointBlock}

Use tools to modify the robot. Prefer direct tool calls over lengthy explanations.${briefNote}`;
    }

    protected override async _executeTools(
        toolCalls: ToolUseBlock[],
        cardMap?: Map<string, ToolCardHandle>,
    ): Promise<{ noFollowUp: boolean }> {
        const results: ToolResBlock[] = [];
        for (const tc of toolCalls) {
            const card = cardMap?.get(tc.id) ?? this._appendToolCard(tc.name);
            const res  = await this._executeTool(tc.name, tc.input);
            const ok   = !(res as Record<string, unknown>).error;
            card.setResult(ok, tc.input, res);
            results.push({ type: 'tool_result', tool_use_id: tc.id, content: JSON.stringify(res) });
        }
        this._history.push({ role: 'user', content: results });
        return { noFollowUp: false };
    }

    protected override async _runLoop(): Promise<void> {
        while (true) {
            const spinner = appendSpinner(this._messagesEl);
            const stream  = await this._callAPI();
            const result  = this._provider === 'github'
                ? await this._processStreamOpenAI(stream, spinner)
                : await this._processStream(stream, spinner);
            this._history.push({ role: 'assistant', content: result.content });
            if (!result.toolCalls.length) break;
            await this._executeTools(result.toolCalls, result.toolCards);
        }
    }

    private _restoreHistory(): void {
        const raw = localStorage.getItem('urdf-chat-history');
        if (!raw) { this._updateEmptyState(); return; }
        try { this._history = JSON.parse(raw) as Msg[]; } catch { return; }
        for (let i = 0; i < this._history.length; i++) {
            const msg = this._history[i];
            if (msg.role === 'user') {
                if (typeof msg.content === 'string') appendUserBubble(this._messagesEl, msg.content);
            } else {
                for (const block of msg.content as ContentBlock[]) {
                    if (block.type === 'text' && block.text) {
                        appendAssistantBubble(this._messagesEl, block.text);
                        // History replay: no action buttons needed for past turns
                    } else if (block.type === 'tool_use') {
                        const nextMsg = this._history[i + 1];
                        let result: unknown = { ok: true };
                        if (nextMsg?.role === 'user' && Array.isArray(nextMsg.content)) {
                            const tr = (nextMsg.content as ToolResBlock[]).find(r => r.tool_use_id === block.id);
                            if (tr) try { result = JSON.parse(tr.content); } catch { result = tr.content; }
                        }
                        const card = this._appendToolCard(block.name);
                        card.setResult(!(result as Record<string, unknown>)?.error, block.input, result);
                    }
                }
            }
        }
        this._updateEmptyState();
    }

    private async _runConversation(userText: string): Promise<void> {
        this._sanitizeHistory();
        appendUserBubble(this._messagesEl, userText);
        this._history.push({ role: 'user', content: userText });
        this._saveHistory();
        this._updateEmptyState();
        await this._withSession(() => this._runLoop());
        this._saveHistory();
    }

    // ── Model / provider management ───────────────────────────────────────────

    private async _probeProxy(): Promise<void> {
        try {
            const ctrl = new AbortController();
            setTimeout(() => ctrl.abort(), 1500);
            await fetch(LOCAL_PROXY, {
                method: 'POST', signal: ctrl.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ probe: true }),
            });
            this._proxyAvailable = true;
        } catch {
            this._proxyAvailable = false;
        }
        this._updateApiKeyBar();
        this._updateProxyBar();
    }

    private _updateProxyBar(): void {
        this._proxyBarEl.hidden = !(this._proxyAvailable && this._provider === 'anthropic');
    }

    private _applyModel(value: string): void {
        const colon = value.indexOf(':');
        this._provider = value.slice(0, colon) as Provider;
        this._model    = this._provider === 'github' ? value.slice(colon + 1) : MODEL;
        this._ghBarEl.hidden     = (this._provider !== 'github');
        this._apikeyBarEl.hidden = (this._provider !== 'anthropic') || this._proxyAvailable;
        localStorage.setItem('urdf-chat-model', value);
        this._updateGitHubBar();
        this._updateApiKeyBar();
        this._updateProxyBar();
    }

    private _updateApiKeyBar(): void {
        if (this._proxyAvailable) { this._apikeyBarEl.hidden = true; return; }
        this._apikeyBarEl.innerHTML = '';
        const key = localStorage.getItem('urdf-api-key');
        if (key) {
            const saved = document.createElement('span');
            saved.className = 'chat-apikey-saved';
            saved.textContent = 'API key saved';
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chat-apikey-remove';
            btn.textContent = 'Remove';
            btn.addEventListener('click', () => {
                localStorage.removeItem('urdf-api-key');
                this._updateApiKeyBar();
            });
            this._apikeyBarEl.append(saved, btn);
        } else {
            const form = document.createElement('form');
            form.autocomplete = 'off';
            const inp = document.createElement('input');
            inp.type = 'password';
            inp.placeholder = 'sk-ant-… Anthropic API key';
            inp.setAttribute('aria-label', 'Anthropic API key');
            inp.autocomplete = 'new-password';
            const btn = document.createElement('button');
            btn.type = 'submit';
            btn.className = 'chat-apikey-save';
            btn.textContent = 'Save';
            const save = () => {
                const val = inp.value.trim();
                if (!val) return;
                localStorage.setItem('urdf-api-key', val);
                this._updateApiKeyBar();
            };
            form.addEventListener('submit', (e) => { e.preventDefault(); save(); });
            form.append(inp, btn);
            this._apikeyBarEl.append(form);
        }
    }

    private _updateGitHubBar(): void {
        this._ghBarEl.innerHTML = '';
        if (this._githubAuth) {
            const label = document.createElement('span');
            label.className = 'chat-github-user';
            label.textContent = `@${this._githubAuth.username}`;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chat-github-disconnect';
            btn.textContent = 'Disconnect';
            btn.addEventListener('click', () => {
                this._githubAuth = null;
                localStorage.removeItem('urdf-gh-auth');
                this._clearChat();
                this._updateGitHubBar();
            });
            this._ghBarEl.append(label, btn);
        } else {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chat-github-connect';
            btn.textContent = 'Connect GitHub';
            btn.addEventListener('click', async () => {
                btn.textContent = 'Connecting…';
                btn.disabled = true;
                try {
                    const connect = await loadConnectGitHub();
                    this._githubAuth = await connect('read:user', 'urdf-viewer');
                    localStorage.setItem('urdf-gh-auth', JSON.stringify(this._githubAuth));
                    this._updateGitHubBar();
                } catch (err) {
                    const e = err as Error;
                    if (e.message !== 'OAuth flow cancelled') this._appendSystemMsg(`GitHub auth failed: ${e.message}`);
                    btn.textContent = 'Connect GitHub';
                    btn.disabled = false;
                }
            });
            this._ghBarEl.appendChild(btn);
        }
        const note = document.createElement('span');
        note.className = 'chat-github-note';
        note.textContent = 'Tool calls may be less reliable than Claude.';
        this._ghBarEl.appendChild(note);
    }

    // ── API ───────────────────────────────────────────────────────────────────

    protected override async _callAPI(): Promise<ReadableStream<Uint8Array>> {
        return this._provider === 'github' ? this._callAPIGitHub() : this._callAPIClaude();
    }

    private async _callAPIClaude(): Promise<ReadableStream<Uint8Array>> {
        const body = {
            model: MODEL, max_tokens: 4096,
            system:   this._buildSystem(),
            messages: this._history,
            tools:    this._buildTools(),
            stream:   true,
        };

        // Try local proxy first (fall through only on network error — proxy not running)
        try {
            const r = await fetch(LOCAL_PROXY, {
                method: 'POST', signal: this._abortCtrl!.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (r.ok) return r.body!;
            // HTTP error from the API — retrying directly won't help
            const msg = await r.text().catch(() => r.statusText);
            throw new Error(`API ${r.status}: ${msg.slice(0, 200)}`);
        } catch (e) {
            if (!(e instanceof TypeError)) throw e; // propagate API errors and AbortError
            // TypeError = network failure = proxy not running, fall through to direct API
        }

        // Fallback: direct Anthropic API
        const key = localStorage.getItem('urdf-api-key');
        if (!key) { this._appendSystemMsg('Enter your Anthropic API key in the bar above.'); throw new Error('no-api-key'); }

        const r = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST', signal: this._abortCtrl!.signal,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true',
            },
            body: JSON.stringify(body),
        });
        if (!r.ok) {
            const msg = await r.text().catch(() => r.statusText);
            throw new Error(`API ${r.status}: ${msg.slice(0, 200)}`);
        }
        return r.body!;
    }

    private async _callAPIGitHub(): Promise<ReadableStream<Uint8Array>> {
        if (!this._githubAuth) {
            this._appendSystemMsg('Connect your GitHub account above to use GitHub Models.');
            throw new Error('github-no-auth');
        }
        const oaiTools = (this._buildTools() as Array<Record<string, unknown>>).map(t => ({
            type: 'function',
            function: { name: t['name'], description: t['description'], parameters: t['input_schema'] },
        }));
        const r = await fetch('https://models.github.ai/inference/chat/completions', {
            method: 'POST', signal: this._abortCtrl!.signal,
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${this._githubAuth.token}` },
            body: JSON.stringify({
                model: this._model,
                messages: [{ role: 'system', content: this._buildSystem() }, ...this._historyToOpenAI()],
                tools: oaiTools, tool_choice: 'auto', max_completion_tokens: 4096, stream: true,
            }),
        });
        if (!r.ok) {
            const msg = await r.text().catch(() => r.statusText);
            if (r.status === 429) throw new Error('GitHub Models rate limit reached. Try again later.');
            throw new Error(`GitHub API ${r.status}: ${msg.slice(0, 200)}`);
        }
        return r.body!;
    }

    private _historyToOpenAI(): Array<Record<string, unknown>> {
        const out: Array<Record<string, unknown>> = [];
        for (const msg of this._history) {
            if (msg.role === 'user') {
                if (typeof msg.content === 'string') {
                    out.push({ role: 'user', content: msg.content });
                } else {
                    for (const tr of msg.content as ToolResBlock[]) {
                        out.push({ role: 'tool', tool_call_id: tr.tool_use_id, content: tr.content });
                    }
                }
            } else {
                const blocks = msg.content as ContentBlock[];
                const text   = blocks.filter(b => b.type === 'text').map(b => (b as TextBlock).text).join('');
                const tcs    = blocks.filter(b => b.type === 'tool_use').map(b => {
                    const tu = b as ToolUseBlock;
                    return { id: tu.id, type: 'function', function: { name: tu.name, arguments: JSON.stringify(tu.input) } };
                });
                const m: Record<string, unknown> = { role: 'assistant', content: text || null };
                if (tcs.length) m['tool_calls'] = tcs;
                out.push(m);
            }
        }
        return out;
    }


    // ── OpenAI SSE parser + stream processor ──────────────────────────────────

    private async *_parseDataSSE(body: ReadableStream<Uint8Array>): AsyncGenerator<unknown> {
        const reader  = body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop()!;
            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const raw = line.slice(6).trim();
                if (raw === '[DONE]') return;
                try { yield JSON.parse(raw); } catch { /**/ }
            }
        }
    }

    private async _processStreamOpenAI(
        body: ReadableStream<Uint8Array>,
        spinnerEl: HTMLElement,
    ): Promise<{ content: ContentBlock[]; toolCalls: ToolUseBlock[]; toolCards: Map<string, ToolCardHandle> }> {
        const toolCards = new Map<string, ToolCardHandle>();
        const tcMap     = new Map<number, { id: string; name: string; args: string; shown: boolean }>();
        let curMsgEl: HTMLElement | null = null;
        let curText  = '';
        let rafPending   = false;
        let spinnerDone  = false;
        const removeSpinner = () => { if (!spinnerDone) { spinnerDone = true; spinnerEl.remove(); } };

        type OAIChunk = { choices?: Array<{ delta: { content?: string; tool_calls?: Array<{ index: number; id?: string; function?: { name?: string; arguments?: string } }> } }> };
        for await (const chunk of this._parseDataSSE(body)) {
            const delta = (chunk as OAIChunk).choices?.[0]?.delta;
            if (!delta) continue;

            if (delta.content) {
                removeSpinner();
                if (!curMsgEl) {
                    curMsgEl = appendAssistantBubble(this._messagesEl, '', {
                        onAccept: () => {
                            const wrapper = curMsgEl?.parentElement;
                            if (!wrapper) return;
                            const summary = curText.slice(0, 80).replace(/\s+/g, ' ').trim();
                            wrapper.className = 'msg accepted';
                            wrapper.innerHTML = `<span class="acc-check">✓</span>${summary}`;
                        },
                        onUndo: () => {
                            console.log('[chat] undo not yet implemented');
                        },
                        onAdjust: () => {
                            this._inputEl.focus();
                        },
                    });
                    curText = '';
                }
                curText += delta.content;
                if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(() => {
                        rafPending = false;
                        if (curMsgEl) { curMsgEl.innerHTML = renderMd(curText); this._messagesEl.scrollTop = this._messagesEl.scrollHeight; }
                    });
                }
            }
            if (delta.tool_calls) {
                removeSpinner();
                for (const tc of delta.tool_calls) {
                    if (!tcMap.has(tc.index)) tcMap.set(tc.index, { id: '', name: '', args: '', shown: false });
                    const e = tcMap.get(tc.index)!;
                    if (tc.id) e.id = tc.id;
                    if (tc.function?.name) e.name = tc.function.name;
                    if (tc.function?.arguments) e.args += tc.function.arguments;
                    if (!e.shown && e.id && e.name) { e.shown = true; toolCards.set(e.id, this._appendToolCard(e.name)); }
                }
            }
        }

        if (curMsgEl && curText) {
            curMsgEl.innerHTML = renderMd(curText);
            if (/width|radius|length|scale|STL|stl|mesh/i.test(curText)) {
                appendStlNote(curMsgEl, 'chassis.stl will regenerate on next export — changes are URDF-only until then.');
            }
        }
        removeSpinner();
        const content: ContentBlock[] = [];
        if (curText) content.push({ type: 'text', text: curText });
        const toolCalls: ToolUseBlock[] = [];
        for (const [, e] of tcMap) {
            let input: Record<string, unknown> = {};
            try { input = JSON.parse(e.args || '{}'); } catch { /**/ }
            const tc: ToolUseBlock = { type: 'tool_use', id: e.id, name: e.name, input };
            content.push(tc);
            toolCalls.push(tc);
        }
        return { content, toolCalls, toolCards };
    }

    // ── DOM helpers ───────────────────────────────────────────────────────────

    private _clearChat(): void {
        this._history = [];
        this._messagesEl.innerHTML = '';
        localStorage.removeItem('urdf-chat-history');
        this._updateEmptyState();
    }

    private _appendChat(el: HTMLElement): void {
        this._messagesEl.appendChild(el);
        this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
        this._syncAcceptedHistoryToggle();
    }

    private _appendSystemMsg(text: string): void {
        const div = document.createElement('div');
        div.className   = 'chat-msg-system';
        div.textContent = text;
        this._appendChat(div);
    }

    protected override _appendToolCard(name: string): ToolCardHandle {
        const el = document.createElement('details');
        el.className = 'chat-tool-card';
        const summary = document.createElement('summary');
        const statusEl = document.createElement('span');
        statusEl.className = 'chat-tool-card-status';
        const nameEl = document.createElement('span');
        nameEl.className = 'chat-tool-card-name';
        nameEl.textContent = name;
        const subtitleEl = document.createElement('span');
        subtitleEl.className = 'chat-tool-card-subtitle';
        summary.append(statusEl, nameEl, subtitleEl);
        el.appendChild(summary);
        this._appendChat(el);
        return {
            setResult(ok: boolean, input?: Record<string, unknown>, result?: unknown) {
                statusEl.classList.add(ok ? 'ok' : 'err');
                if (input && Object.keys(input).length) {
                    subtitleEl.textContent = Object.entries(input)
                        .slice(0, 3)
                        .map(([k, v]) => `${k}=${typeof v === 'number' ? +Number(v).toFixed(3) : v}`)
                        .join(' ');
                }
                const body = document.createElement('div');
                body.className = 'chat-tool-card-body';
                const htmlLines: string[] = [];
                if (input && Object.keys(input).length)
                    htmlLines.push(`<span class="j-dir">in</span>  ${highlightJson(JSON.stringify(input))}`);
                htmlLines.push(`<span class="j-dir">out</span> ${highlightJson(JSON.stringify(result))}`);
                body.innerHTML = htmlLines.join('\n');
                el.appendChild(body);
            },
        };
    }

    appendRecapCard(title: string, changes: Array<{ label: string; from: number; to: number; unit: string }>): void {
        if (!changes.length) return;
        const card = document.createElement('div');
        card.className = 'chat-recap-card';
        const titleEl = document.createElement('div');
        titleEl.className = 'chat-recap-card-title';
        titleEl.textContent = `${title} adjusted`;
        card.appendChild(titleEl);
        for (const c of changes) {
            const row = document.createElement('div');
            row.className = 'chat-recap-card-row';
            const lbl = document.createElement('span');
            lbl.textContent = c.label;
            const val = document.createElement('span');
            val.textContent = `${+c.from.toFixed(1)} → ${+c.to.toFixed(1)} ${c.unit}`;
            row.append(lbl, val);
            card.appendChild(row);
        }
        this._appendChat(card);
    }

    private _appendActionCard(section: string, message: string): void {
        const card = document.createElement('div');
        card.className = 'chat-action-card';
        const titleEl = document.createElement('div');
        titleEl.className = 'chat-action-card-title';
        titleEl.textContent = SECTION_TITLES[section] ?? section;
        const msgEl = document.createElement('div');
        msgEl.className = 'chat-action-card-msg';
        msgEl.textContent = message;
        const footer = document.createElement('div');
        footer.className = 'chat-action-card-footer';
        const openBtn = document.createElement('button');
        openBtn.type = 'button';
        openBtn.className = 'chat-action-btn primary';
        openBtn.textContent = 'Open Panel';
        openBtn.addEventListener('click', () => { this._cb.openPanel(section); card.remove(); });
        const dismissBtn = document.createElement('button');
        dismissBtn.type = 'button';
        dismissBtn.className = 'chat-action-btn';
        dismissBtn.textContent = 'Dismiss';
        dismissBtn.addEventListener('click', () => card.remove());
        footer.append(openBtn, dismissBtn);
        card.append(titleEl, msgEl, footer);
        this._appendChat(card);
    }
}
