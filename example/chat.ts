import type { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';

const LOCAL_PROXY = 'http://127.0.0.1:7337/claude';
const MODEL       = 'claude-sonnet-4-6';

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

// ── Types shared with editor.ts ──────────────────────────────────────────────

interface TextBlock    { type: 'text'; text: string; }
interface ToolUseBlock { type: 'tool_use'; id: string; name: string; input: Record<string, unknown>; }
interface ToolResBlock { type: 'tool_result'; tool_use_id: string; content: string; }
type ContentBlock = TextBlock | ToolUseBlock | ToolResBlock;
type Msg =
    | { role: 'user';      content: string | ToolResBlock[] }
    | { role: 'assistant'; content: ContentBlock[] };

declare const marked: { parse(s: string): string } | undefined;
declare const DOMPurify: { sanitize(s: string, o?: object): string } | undefined;

function highlightJson(raw: string): string {
    const s = raw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return s
        .replace(/"([^"\\]*(\\.[^"\\]*)*)"(\s*:)/g, '<span class="j-key">"$1"</span>$3')
        .replace(/:\s*"([^"\\]*(\\.[^"\\]*)*)"/g, ': <span class="j-str">"$1"</span>')
        .replace(/:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, ': <span class="j-num">$1</span>')
        .replace(/:\s*(true|false|null)\b/g, ': <span class="j-kw">$1</span>');
}

function renderMd(text: string): string {
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(marked.parse(text), { ADD_ATTR: ['style'] });
    }
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
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
}

const SECTION_TITLES: Record<string, string> = {
    chassis: 'Chassis', wheels: 'Wheels', caster: 'Caster',
    battery: 'Battery Box', powerbank: 'Power Bank',
};

type ToolCardHandle = { setResult(ok: boolean, input?: Record<string, unknown>, result?: unknown): void };

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

export class URDFChatController {
    private readonly _buildCtrl: URDFBuildController;
    private readonly _cb: ChatCallbacks;
    private _history: Msg[] = [];
    private _abortCtrl: AbortController | null = null;
    private _brief = true;
    private _guide = false;
    private _cmdAcIdx = -1;
    private _pauseResolve: ((aborted: boolean) => void) | null = null;
    private _provider: Provider = 'anthropic';
    private _model = MODEL;
    private _githubAuth: GitHubAuth | null = null;

    // DOM refs set in init()
    private _messagesEl!:    HTMLElement;
    private _emptyStateEl!:  HTMLElement;
    private _chatPaneEl!:    HTMLElement;
    private _inputEl!:       HTMLTextAreaElement;
    private _sendBtn!:       HTMLButtonElement;
    private _abortBtn!:      HTMLButtonElement;
    private _briefBtn!:      HTMLButtonElement;
    private _continueBtn!:   HTMLButtonElement;
    private _toolCountBtn!:  HTMLButtonElement;
    private _cmdAcEl!:       HTMLElement;
    private _modelSelectEl!: HTMLSelectElement;
    private _ghBarEl!:       HTMLElement;
    private _apikeyBarEl!:   HTMLElement;

    constructor(buildCtrl: URDFBuildController, cb: ChatCallbacks) {
        this._buildCtrl = buildCtrl;
        this._cb        = cb;
    }

    init(): void {
        this._messagesEl   = document.getElementById('chat-messages')!;
        this._emptyStateEl = document.getElementById('chat-empty-state')!;
        this._chatPaneEl   = this._messagesEl.closest('.chat-pane') as HTMLElement;
        this._inputEl      = document.getElementById('chat-input') as HTMLTextAreaElement;
        this._sendBtn     = document.getElementById('chat-send') as HTMLButtonElement;
        this._abortBtn    = document.getElementById('chat-abort') as HTMLButtonElement;
        this._briefBtn    = document.getElementById('chat-brief-toggle') as HTMLButtonElement;
        this._continueBtn = document.getElementById('chat-continue') as HTMLButtonElement;
        this._toolCountBtn = document.getElementById('chat-tool-count') as HTMLButtonElement;
        this._cmdAcEl      = document.getElementById('cmd-ac') as HTMLElement;
        this._modelSelectEl = document.getElementById('chat-model-select') as HTMLSelectElement;
        this._ghBarEl       = document.getElementById('chat-github-bar') as HTMLElement;
        this._apikeyBarEl   = document.getElementById('chat-apikey-bar') as HTMLElement;

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

        // Detail toggle — inactive = brief/default, active = detail mode
        this._briefBtn.addEventListener('click', () => {
            this._brief = !this._brief;
            this._briefBtn.classList.toggle('active', !this._brief);
            this._briefBtn.setAttribute('aria-pressed', String(!this._brief));
            this._cb.onBriefToggle(this._brief);
        });

        this._continueBtn.addEventListener('click', () => this._pauseResolve?.(false));

        document.getElementById('chat-guide-start')!.addEventListener('click', () => {
            this._guide = true;
            // Always reset to a blank Build canvas before the guide starts —
            // don't leave this to Claude, it's too easy to skip.
            this._cb.initRobot('robot-car');
            this._runConversation('Please guide me through building this robot step by step.');
        });

        // Global keydown — double-Escape to clear, single key to focus chat
        let _lastEsc = 0;
        document.addEventListener('keydown', (e) => {
            const aside = this._messagesEl.closest('aside');
            if (!aside?.classList.contains('open')) return;
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
        void this._runConversation(text);
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
        if (!this._buildCtrl.isCatalogActive) return [];

        const compTypes = Object.keys(
            // dynamically import the catalog at runtime to avoid circular deps
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this._buildCtrl as any)._catalog ?? {}
        );
        const libTypes = LIBRARY.map(e => e.id);
        const allTypes = [...new Set([...compTypes, ...libTypes])];

        const tools: object[] = [
            {
                name: 'get_robot_state',
                description: 'Returns current chassis dimensions, wheel params, and all added components.',
                input_schema: { type: 'object', properties: {} },
            },
            {
                name: 'add_component',
                description: 'Add a component to the robot. Use library types for 3D mesh components.',
                input_schema: {
                    type: 'object',
                    properties: {
                        type:   { type: 'string', description: `Component type. Library types: ${libTypes.join(', ')}` },
                        parent: { type: 'string', description: 'Parent link name (default: base_link)' },
                    },
                    required: ['type'],
                },
            },
            {
                name: 'remove_component',
                description: 'Remove a component by id.',
                input_schema: {
                    type: 'object',
                    properties: { id: { type: 'string', description: 'Component id, e.g. hcsr04_1' } },
                    required: ['id'],
                },
            },
            {
                name: 'duplicate_component',
                description: 'Duplicate an existing component.',
                input_schema: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                    required: ['id'],
                },
            },
            {
                name: 'update_component',
                description: 'Update position, rotation, size, or joint of a component. Positions in metres, angles in radians.',
                input_schema: {
                    type: 'object',
                    properties: {
                        id:   { type: 'string', description: 'Component id' },
                        x:    { type: 'number', description: 'URDF X position (m). −X = front' },
                        y:    { type: 'number', description: 'URDF Y position (m). +Y = right' },
                        z:    { type: 'number', description: 'URDF Z position (m). +Z = up' },
                        rx:   { type: 'number', description: 'Roll (rad)' },
                        ry:   { type: 'number', description: 'Pitch (rad)' },
                        rz:   { type: 'number', description: 'Yaw (rad)' },
                        jointType: { type: 'string', enum: ['fixed', 'continuous', 'revolute', 'prismatic'] },
                        parent: { type: 'string' },
                    },
                    required: ['id'],
                },
            },
            {
                name: 'undo',
                description: 'Undo the last build action.',
                input_schema: { type: 'object', properties: {} },
            },
            {
                name: 'redo',
                description: 'Redo the last undone build action.',
                input_schema: { type: 'object', properties: {} },
            },
            {
                name: 'update_chassis',
                description: 'Update chassis dimensions. All values in metres.',
                input_schema: {
                    type: 'object',
                    properties: {
                        thickness:     { type: 'number', description: 'Plate thickness (m)' },
                        bodyHalfWidth: { type: 'number', description: 'Half-width of the main body (m)' },
                        rearHalfWidth: { type: 'number', description: 'Half-width of the rear section (m)' },
                    },
                },
            },
            {
                name: 'update_wheels',
                description: 'Update drive-wheel dimensions. All values in metres.',
                input_schema: {
                    type: 'object',
                    properties: {
                        radius: { type: 'number', description: 'Wheel radius (m)' },
                        width:  { type: 'number', description: 'Wheel width (m)' },
                    },
                },
            },
            {
                name: 'update_caster',
                description: 'Update caster wheel dimensions. All values in metres.',
                input_schema: {
                    type: 'object',
                    properties: {
                        radius: { type: 'number', description: 'Caster sphere radius (m)' },
                        width:  { type: 'number', description: 'Caster width (m)' },
                    },
                },
            },
            {
                name: 'update_battery_box',
                description: 'Update battery box dimensions (length, width, height in metres).',
                input_schema: {
                    type: 'object',
                    properties: {
                        l: { type: 'number', description: 'Length (m)' },
                        w: { type: 'number', description: 'Width (m)' },
                        h: { type: 'number', description: 'Height (m)' },
                    },
                },
            },
            {
                name: 'update_powerbank',
                description: 'Update powerbank cylinder dimensions (radius and length in metres).',
                input_schema: {
                    type: 'object',
                    properties: {
                        radius: { type: 'number', description: 'Cylinder radius (m)' },
                        length: { type: 'number', description: 'Cylinder length (m)' },
                    },
                },
            },
            {
                name: 'open_panel',
                description: 'Open a floating control panel over the 3D viewer so the user can fine-tune a specific section while watching the robot update live. Use this before calling pause to give the user something to interact with.',
                input_schema: {
                    type: 'object',
                    properties: {
                        section: {
                            type: 'string',
                            enum: ['chassis', 'wheels', 'caster', 'battery', 'powerbank'],
                            description: 'Which parametric section to open.',
                        },
                    },
                    required: ['section'],
                },
            },
        ];

        if (this._cb.isGestureActive()) {
            tools.push({
                name: 'show_gesture_hint',
                description: 'Open a floating gesture reference card over the 3D viewer. Use this instead of writing a gesture list in chat. Call it once early in the conversation so the user has a persistent reference.',
                input_schema: { type: 'object', properties: {} },
            });
        }

        const parts = this._cb.getPartsList();
        if (parts.length > 0) {
            tools.push(
                {
                    name: 'read_part',
                    description: 'Read the XML of a URDF part file. Use before editing to see current content.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            filename: { type: 'string', description: `Part filename. Available: ${parts.join(', ')}` },
                        },
                        required: ['filename'],
                    },
                },
                {
                    name: 'update_part',
                    description:
                        'Write a URDF part file (link + joint elements only, no <robot> wrapper). ' +
                        'Use to change colors (<material><color rgba="r g b a"/>), geometry, or add new links.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            filename: { type: 'string', description: 'Part filename to write' },
                            xml:      { type: 'string', description: 'Complete content of this part file' },
                        },
                        required: ['filename', 'xml'],
                    },
                },
            );
        }

        if (this._guide) {
            tools.push(
                {
                    name: 'init_robot',
                    description: 'Load a robot to work with. Call this before starting the guided tour/build when the workspace is empty.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            type: { type: 'string', enum: ['robot-car', 'custom'], description: '"robot-car" loads the Robot Car; "custom" starts a blank chassis' },
                            name: { type: 'string', description: 'Name for a custom robot (only used when type is "custom")' },
                        },
                        required: ['type'],
                    },
                },
                {
                    name: 'highlight_part',
                    description: 'Select and highlight a robot part in the 3D viewer.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            joint: { type: 'string', description: 'Joint name (e.g. "wheel_left_joint"), or empty string to clear.' },
                        },
                        required: ['joint'],
                    },
                },
                {
                    name: 'pause',
                    description: 'Call at the END of each step (after your text explanation and highlight_part) to wait for the user to click Continue. Never call this before writing your step explanation.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Optional context for the user.' },
                        },
                    },
                },
                {
                    name: 'propose_adjustment',
                    description: 'Show an actionable suggestion card in the chat with an Open Panel button. Use after observing state_mm when a dimension is noteworthy — physically implausible, mechanically interesting, or very different from the real part. Do not call if the values are fine.',
                    input_schema: {
                        type: 'object',
                        properties: {
                            section: {
                                type: 'string',
                                enum: ['chassis', 'wheels', 'caster', 'battery', 'powerbank'],
                                description: 'Which section to offer to open.',
                            },
                            message: {
                                type: 'string',
                                description: 'Brief educational observation (1–2 sentences). No preamble.',
                            },
                        },
                        required: ['section', 'message'],
                    },
                },
            );
        }

        void allTypes; // suppress unused warning — types used in descriptions above
        return tools;
    }

    // ── Tool execution ────────────────────────────────────────────────────────

    private async _executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
        switch (name) {
            case 'get_robot_state': {
                const cp = this._buildCtrl.chassisParams;
                const wp = this._buildCtrl.wheelParams;
                const components = this._buildCtrl.getComponentEntries().map(({ id, type }) => ({
                    id, type, ...this._buildCtrl.getComponentData(id),
                }));
                return {
                    chassis: cp,
                    wheels:  wp,
                    casterRadius: this._buildCtrl.casterRadius,
                    casterWidth:  this._buildCtrl.casterWidth,
                    batteryBox:   this._buildCtrl.batteryBox,
                    powerbank:    this._buildCtrl.powerbank,
                    components,
                };
            }
            case 'add_component': {
                const type = args.type as string;
                if (!this._buildCtrl.isCatalogActive) return { error: 'No robot loaded' };
                const libEntry = LIBRARY.find(e => e.id === type);
                if (libEntry) {
                    const { generate } = await libEntry.factory();
                    const id = this._buildCtrl.addMeshComponent(libEntry.id, generate());
                    this._cb.onComponentAdded(id, libEntry.id);
                    this._cb.syncSlidersFromController();
                    this._cb.refreshPaletteCounts();
                    const total = this._buildCtrl.getComponentEntries().length;
                    return { ok: true, id, total_components: total };
                }
                // Primitive component
                const id = this._buildCtrl.addComponent(type);
                if (!id) return { error: `Unknown component type: ${type}` };
                this._cb.onComponentAdded(id, type);
                this._cb.syncSlidersFromController();
                this._cb.refreshPaletteCounts();
                const total = this._buildCtrl.getComponentEntries().length;
                return { ok: true, id, total_components: total };
            }
            case 'remove_component': {
                const id = args.id as string;
                this._buildCtrl.removeComponent(id);
                this._cb.onComponentRemoved(id);
                this._cb.refreshPaletteCounts();
                return { ok: true };
            }
            case 'duplicate_component': {
                const id = args.id as string;
                const newId = this._buildCtrl.duplicateComponent(id);
                if (!newId) return { error: 'Could not duplicate' };
                const data = this._buildCtrl.getComponentData(newId);
                this._cb.onComponentAdded(newId, data?.type ?? '');
                this._cb.refreshPaletteCounts();
                return { ok: true, id: newId };
            }
            case 'update_component': {
                const { id, ...rest } = args as { id: string } & Record<string, unknown>;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._buildCtrl.updateComponent(id, rest as any);
                this._cb.syncSlidersFromController();
                return { ok: true };
            }
            case 'undo':
                this._buildCtrl.undo();
                this._cb.syncSlidersFromController();
                return { ok: true };
            case 'redo':
                this._buildCtrl.redo();
                this._cb.syncSlidersFromController();
                return { ok: true };
            case 'update_chassis': {
                const merged = { ...this._buildCtrl.chassisParams, ...(args as Record<string, number>) };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._buildCtrl.updateChassis(merged as any);
                this._cb.syncSlidersFromController();
                const cp = this._buildCtrl.chassisParams;
                return { ok: true, chassis_m: cp };
            }
            case 'update_wheels': {
                const merged = { ...this._buildCtrl.wheelParams, ...(args as Record<string, number>) };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._buildCtrl.updateWheel(merged as any);
                this._cb.syncSlidersFromController();
                const wp = this._buildCtrl.wheelParams;
                return { ok: true, wheels_m: wp };
            }
            case 'update_caster': {
                const { radius, width } = args as { radius?: number; width?: number };
                const cur = { radius: this._buildCtrl.casterRadius, width: this._buildCtrl.casterWidth };
                this._buildCtrl.updateCaster(radius ?? cur.radius, width ?? cur.width);
                this._cb.syncSlidersFromController();
                const casterPos = this._buildCtrl.getJointXYZ('caster_wheel_joint');
                return { ok: true, ...(casterPos ? { joint_xyz_m: casterPos, where: casterPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
            }
            case 'update_battery_box': {
                const { l, w, h } = args as { l?: number; w?: number; h?: number };
                const cur = this._buildCtrl.batteryBox;
                this._buildCtrl.updateBatteryBox(l ?? cur.l, w ?? cur.w, h ?? cur.h);
                this._cb.syncSlidersFromController();
                const battPos = this._buildCtrl.getJointXYZ('battery_box_joint');
                return { ok: true, ...(battPos ? { joint_xyz_m: battPos, where: battPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
            }
            case 'update_powerbank': {
                const { radius, length } = args as { radius?: number; length?: number };
                const cur = this._buildCtrl.powerbank;
                this._buildCtrl.updatePowerbank(radius ?? cur.radius, length ?? cur.length);
                this._cb.syncSlidersFromController();
                const pbPos = this._buildCtrl.getJointXYZ('powerbank_joint');
                return { ok: true, ...(pbPos ? { joint_xyz_m: pbPos, where: pbPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
            }
            case 'open_panel': {
                this._cb.openPanel(args.section as string);
                return { ok: true };
            }
            case 'show_gesture_hint': {
                this._cb.openGestureHint();
                return { ok: true };
            }
            case 'propose_adjustment': {
                this._appendActionCard(args.section as string, args.message as string);
                return { ok: true };
            }
            case 'read_part': {
                const filename = args.filename as string;
                const xml = await this._cb.readPart(filename);
                if (xml === null) return { error: `could not read ${filename}` };
                return { ok: true, xml };
            }
            case 'update_part': {
                const { filename, xml } = args as { filename: string; xml: string };
                const ok = await this._cb.updatePart(filename, xml);
                if (!ok) return { error: 'invalid filename or no source URL' };
                return { ok: true };
            }
            case 'init_robot': {
                const type = args.type as 'robot-car' | 'custom';
                const name = (args.name as string | undefined);
                this._cb.initRobot(type, name);
                return { ok: true, note: type === 'robot-car' ? 'Robot Car is loading — call pause next to let it finish.' : 'Custom robot initialized.' };
            }
            case 'highlight_part': {
                const raw = (args.joint as string) || null;
                // Accept link names too (e.g. "chassis" → "chassis_joint")
                const joints = this._cb.getJointNames();
                const resolved = raw && !joints.includes(raw) && joints.includes(raw + '_joint')
                    ? raw + '_joint'
                    : raw;
                this._cb.highlightPart(resolved);
                return { ok: true };
            }
            case 'pause': {
                const continueBtn = document.createElement('button');
                continueBtn.type = 'button';
                continueBtn.className = 'chat-continue-bubble';
                continueBtn.textContent = 'Continue →';
                this._appendChat(continueBtn);
                this._inputEl.disabled = true;
                this._sendBtn.hidden   = true;
                await new Promise<void>((resolve, reject) => {
                    this._pauseResolve = (aborted: boolean) => {
                        continueBtn.remove();
                        if (aborted) reject(Object.assign(new Error('AbortError'), { name: 'AbortError' }));
                        else resolve();
                    };
                    continueBtn.addEventListener('click', () => this._pauseResolve?.(false));
                });
                this._hideContinueButton();
                const cp2 = this._buildCtrl.chassisParams;
                const wp2 = this._buildCtrl.wheelParams;
                const bb2 = this._buildCtrl.batteryBox;
                const pb2 = this._buildCtrl.powerbank;
                return {
                    ok: true,
                    state_mm: {
                        chassis:   { thickness: +(cp2.thickness * 1000).toFixed(2), bodyHalfWidth: +(cp2.bodyHalfWidth * 1000).toFixed(2), rearHalfWidth: +(cp2.rearHalfWidth * 1000).toFixed(2) },
                        wheels:    { radius: +(wp2.radius * 1000).toFixed(2), width: +(wp2.width * 1000).toFixed(2) },
                        caster:    { radius: +(this._buildCtrl.casterRadius * 1000).toFixed(2), width: +(this._buildCtrl.casterWidth * 1000).toFixed(2) },
                        battery:   { l: +(bb2.l * 1000).toFixed(2), w: +(bb2.w * 1000).toFixed(2), h: +(bb2.h * 1000).toFixed(2) },
                        powerbank: { radius: +(pb2.radius * 1000).toFixed(2), length: +(pb2.length * 1000).toFixed(2) },
                    },
                };
            }
            default:
                return { error: `Unknown tool: ${name}` };
        }
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

        const briefNote = (this._brief && !this._guide)
            ? '\nBRIEF MODE: Answer in fewer than 4 lines. No preamble. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.'
            : '';

        const catalogActive = this._buildCtrl.isCatalogActive;
        const jointNames    = this._cb.getJointNames();
        const noRobot       = !catalogActive && parts.length === 0;

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

Available library components: ${LIBRARY.map(e => e.id).join(', ')}${focusedBlock}${partsBlock}

Use tools to modify the robot. Prefer direct tool calls over lengthy explanations.${briefNote}`;
    }

    private _sanitizeHistory(): void {
        while (this._history.length > 0) {
            const last = this._history[this._history.length - 1];
            if (last.role !== 'assistant') return;
            if (!(last.content as ContentBlock[]).some(b => b.type === 'tool_use')) return;
            this._history.pop();
        }
    }

    private async _executeTools(
        toolCalls: ToolUseBlock[],
        cardMap?: Map<string, ToolCardHandle>,
    ): Promise<void> {
        const results: ToolResBlock[] = [];
        for (const tc of toolCalls) {
            const card = cardMap?.get(tc.id) ?? this._appendToolCard(tc.name);
            const res  = await this._executeTool(tc.name, tc.input);
            const ok   = !(res as Record<string, unknown>).error;
            card.setResult(ok, tc.input, res);
            results.push({ type: 'tool_result', tool_use_id: tc.id, content: JSON.stringify(res) });
        }
        this._history.push({ role: 'user', content: results });
    }

    private async _runLoop(): Promise<void> {
        while (true) {
            const spinner = this._appendSpinner();
            const stream  = await this._callAPI();
            const result  = this._provider === 'github'
                ? await this._processStreamOpenAI(stream, spinner)
                : await this._processStream(stream, spinner);
            this._history.push({ role: 'assistant', content: result.content });
            if (!result.toolCalls.length) break;
            await this._executeTools(result.toolCalls, result.toolCards);
        }
    }

    private async _withSession(fn: () => Promise<void>): Promise<void> {
        if (this._abortCtrl) return;
        this._abortCtrl        = new AbortController();
        this._sendBtn.disabled = true;
        this._abortBtn.hidden  = false;
        try {
            await fn();
        } catch (err) {
            const e = err as Error;
            if (e.name !== 'AbortError') {
                this._sanitizeHistory();
                this._appendAssistantBubble(`\u26a0 ${e.message || 'Request failed'}`);
            }
        } finally {
            this._abortCtrl        = null;
            this._sendBtn.disabled = false;
            this._abortBtn.hidden  = true;
            this._hideContinueButton();
        }
    }

    private _saveHistory(): void {
        try { localStorage.setItem('urdf-chat-history', JSON.stringify(this._history)); } catch { /**/ }
    }

    private _restoreHistory(): void {
        const raw = localStorage.getItem('urdf-chat-history');
        if (!raw) { this._updateEmptyState(); return; }
        try { this._history = JSON.parse(raw) as Msg[]; } catch { return; }
        for (let i = 0; i < this._history.length; i++) {
            const msg = this._history[i];
            if (msg.role === 'user') {
                if (typeof msg.content === 'string') this._appendUserBubble(msg.content);
            } else {
                for (const block of msg.content as ContentBlock[]) {
                    if (block.type === 'text' && block.text) {
                        this._appendAssistantBubble(block.text);
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
        this._appendUserBubble(userText);
        this._history.push({ role: 'user', content: userText });
        this._saveHistory();
        this._updateEmptyState();
        await this._withSession(() => this._runLoop());
        this._saveHistory();
    }

    // ── Model / provider management ───────────────────────────────────────────

    private _applyModel(value: string): void {
        const colon = value.indexOf(':');
        this._provider = value.slice(0, colon) as Provider;
        this._model    = this._provider === 'github' ? value.slice(colon + 1) : MODEL;
        this._ghBarEl.hidden     = (this._provider !== 'github');
        this._apikeyBarEl.hidden = (this._provider !== 'anthropic');
        localStorage.setItem('urdf-chat-model', value);
        this._updateGitHubBar();
        this._updateApiKeyBar();
    }

    private _updateApiKeyBar(): void {
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
            const inp = document.createElement('input');
            inp.type = 'password';
            inp.placeholder = 'sk-ant-… Anthropic API key';
            inp.setAttribute('aria-label', 'Anthropic API key');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chat-apikey-save';
            btn.textContent = 'Save';
            const save = () => {
                const val = inp.value.trim();
                if (!val) return;
                localStorage.setItem('urdf-api-key', val);
                this._updateApiKeyBar();
            };
            inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });
            btn.addEventListener('click', save);
            this._apikeyBarEl.append(inp, btn);
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

    private async _callAPI(): Promise<ReadableStream<Uint8Array>> {
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

        // Try local proxy first (silent fallback if not running)
        try {
            const r = await fetch(LOCAL_PROXY, {
                method: 'POST', signal: this._abortCtrl!.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (r.ok) return r.body!;
        } catch { /* proxy not running */ }

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
                if (!curMsgEl) { curMsgEl = this._appendAssistantBubble(''); curText = ''; }
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

        if (curMsgEl && curText) curMsgEl.innerHTML = renderMd(curText);
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

    // ── SSE parsing (identical to editor.ts) ─────────────────────────────────

    private async *_parseSSE(
        body: ReadableStream<Uint8Array>,
    ): AsyncGenerator<{ event: string; data: unknown }> {
        const reader  = body.getReader();
        const decoder = new TextDecoder();
        let buffer   = '';
        let curEvent: string | null = null;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop()!;
            for (const line of lines) {
                if (line.startsWith('event: '))      curEvent = line.slice(7).trim();
                else if (line.startsWith('data: ') && curEvent) {
                    const raw = line.slice(6);
                    if (raw === '[DONE]') return;
                    try { yield { event: curEvent, data: JSON.parse(raw) }; } catch { /**/ }
                    curEvent = null;
                }
            }
        }
    }

    private async _processStream(
        body: ReadableStream<Uint8Array>,
        spinnerEl: HTMLElement,
    ): Promise<{ content: ContentBlock[]; toolCalls: ToolUseBlock[]; toolCards: Map<string, ToolCardHandle> }> {
        const content: ContentBlock[] = [];
        const toolCalls: ToolUseBlock[] = [];
        const toolCards = new Map<string, ToolCardHandle>();
        let curMsgEl: HTMLElement | null = null;
        let curText = '';
        let curTool: { id: string; name: string; idx: number } | null = null;
        let curJson = '';
        let rafPending = false;
        let spinnerRemoved = false;

        const removeSpinner = (): void => {
            if (spinnerRemoved) return;
            spinnerRemoved = true;
            spinnerEl.remove();
        };

        for await (const { event, data } of this._parseSSE(body)) {
            const d = data as {
                content_block?: { type: string; id?: string; name?: string };
                delta?: { type: string; text?: string; partial_json?: string };
            };

            if (event === 'content_block_start') {
                removeSpinner();
                const cb = d.content_block;
                if (cb?.type === 'text') {
                    curMsgEl = this._appendAssistantBubble('');
                    curText  = '';
                    content.push({ type: 'text', text: '' });
                } else if (cb?.type === 'tool_use') {
                    curTool = { id: cb.id!, name: cb.name!, idx: content.length };
                    curJson = '';
                    content.push({ type: 'tool_use', id: cb.id!, name: cb.name!, input: {} });
                    toolCards.set(cb.id!, this._appendToolCard(cb.name!));
                }
            } else if (event === 'content_block_delta') {
                const delta = d.delta;
                if (delta?.type === 'text_delta') {
                    curText += delta.text ?? '';
                    const blk = content[content.length - 1];
                    if (blk?.type === 'text') blk.text = curText;
                    if (curMsgEl && !rafPending) {
                        rafPending = true;
                        requestAnimationFrame(() => {
                            rafPending = false;
                            if (curMsgEl) {
                                curMsgEl.innerHTML = renderMd(curText);
                                this._messagesEl.scrollTop = this._messagesEl.scrollHeight;
                            }
                        });
                    }
                } else if (delta?.type === 'input_json_delta') {
                    curJson += delta.partial_json ?? '';
                }
            } else if (event === 'content_block_stop' && curTool) {
                let input: Record<string, unknown> = {};
                try { input = JSON.parse(curJson); } catch { /**/ }
                (content[curTool.idx] as ToolUseBlock).input = input;
                toolCalls.push({ type: 'tool_use', id: curTool.id, name: curTool.name, input });
                curTool = null;
            }
        }

        removeSpinner();
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
    }

    private _appendUserBubble(text: string): void {
        const div = document.createElement('div');
        div.className   = 'chat-msg-user';
        div.textContent = text;
        this._appendChat(div);
    }

    private _appendAssistantBubble(html: string): HTMLElement {
        const div = document.createElement('div');
        div.className = 'chat-msg-assistant';
        div.innerHTML  = renderMd(html);
        this._appendChat(div);
        return div;
    }

    private _appendSystemMsg(text: string): void {
        const div = document.createElement('div');
        div.className   = 'chat-msg-system';
        div.textContent = text;
        this._appendChat(div);
    }

    private _appendSpinner(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'chat-spinner';
        div.innerHTML = '<span></span><span></span><span></span>';
        this._appendChat(div);
        return div;
    }

    private _appendToolCard(name: string): ToolCardHandle {
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
                statusEl.textContent = ok ? '✓' : '✕';
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
