import type { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';

const LOCAL_PROXY = 'http://127.0.0.1:7337/claude';
const MODEL       = 'claude-sonnet-4-6';

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
}

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
    private _cmdAcIdx = -1;

    // DOM refs set in init()
    private _messagesEl!: HTMLElement;
    private _inputEl!:    HTMLTextAreaElement;
    private _sendBtn!:    HTMLButtonElement;
    private _abortBtn!:   HTMLButtonElement;
    private _briefBtn!:   HTMLButtonElement;
    private _toolCountBtn!: HTMLButtonElement;
    private _cmdAcEl!:    HTMLElement;

    constructor(buildCtrl: URDFBuildController, cb: ChatCallbacks) {
        this._buildCtrl = buildCtrl;
        this._cb        = cb;
    }

    init(): void {
        this._messagesEl  = document.getElementById('chat-messages')!;
        this._inputEl     = document.getElementById('chat-input') as HTMLTextAreaElement;
        this._sendBtn     = document.getElementById('chat-send') as HTMLButtonElement;
        this._abortBtn    = document.getElementById('chat-abort') as HTMLButtonElement;
        this._briefBtn    = document.getElementById('chat-brief-toggle') as HTMLButtonElement;
        this._toolCountBtn = document.getElementById('chat-tool-count') as HTMLButtonElement;
        this._cmdAcEl     = document.getElementById('cmd-ac') as HTMLElement;

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
        this._abortBtn.addEventListener('click', () => this._abortCtrl?.abort());

        // Detail toggle — inactive = brief/default, active = detail mode
        this._briefBtn.addEventListener('click', () => {
            this._brief = !this._brief;
            this._briefBtn.classList.toggle('active', !this._brief);
            this._briefBtn.setAttribute('aria-pressed', String(!this._brief));
            this._cb.onBriefToggle(this._brief);
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
    }

    syncToolCount(): void {
        if (this._toolCountBtn) {
            const n = this._buildTools().length;
            this._toolCountBtn.textContent = `${n} tools`;
            this._toolCountBtn.hidden = n === 0;
        }
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

        return [
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
        ];
        void allTypes; // suppress unused warning — types used in descriptions above
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
                    return { ok: true, id };
                }
                // Primitive component
                const id = this._buildCtrl.addComponent(type);
                if (!id) return { error: `Unknown component type: ${type}` };
                this._cb.onComponentAdded(id, type);
                this._cb.syncSlidersFromController();
                this._cb.refreshPaletteCounts();
                return { ok: true, id };
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._buildCtrl.updateChassis(args as any);
                this._cb.syncSlidersFromController();
                return { ok: true };
            }
            case 'update_wheels': {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._buildCtrl.updateWheel(args as any);
                this._cb.syncSlidersFromController();
                return { ok: true };
            }
            case 'update_caster': {
                const { radius, width } = args as { radius?: number; width?: number };
                const cur = { radius: this._buildCtrl.casterRadius, width: this._buildCtrl.casterWidth };
                this._buildCtrl.updateCaster(radius ?? cur.radius, width ?? cur.width);
                this._cb.syncSlidersFromController();
                return { ok: true };
            }
            case 'update_battery_box': {
                const { l, w, h } = args as { l?: number; w?: number; h?: number };
                const cur = this._buildCtrl.batteryBox;
                this._buildCtrl.updateBatteryBox(l ?? cur.l, w ?? cur.w, h ?? cur.h);
                this._cb.syncSlidersFromController();
                return { ok: true };
            }
            case 'update_powerbank': {
                const { radius, length } = args as { radius?: number; length?: number };
                const cur = this._buildCtrl.powerbank;
                this._buildCtrl.updatePowerbank(radius ?? cur.radius, length ?? cur.length);
                this._cb.syncSlidersFromController();
                return { ok: true };
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

        const briefNote = this._brief
            ? '\nBRIEF MODE: Answer in fewer than 4 lines. No preamble. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.'
            : '';

        return `You are a robot builder assistant embedded in a live 3D URDF viewer.
The robot-car uses: −X = front, +X = rear, −Y = left, +Y = right, +Z = up.

Current chassis: thickness=${(cp.thickness * 1000).toFixed(1)}mm  bodyHW=${(cp.bodyHalfWidth * 1000).toFixed(1)}mm  rearHW=${(cp.rearHalfWidth * 1000).toFixed(1)}mm
Current wheels: radius=${(wp.radius * 1000).toFixed(1)}mm  width=${(wp.width * 1000).toFixed(1)}mm
Current components:
${compList}

Available library components: ${LIBRARY.map(e => e.id).join(', ')}${focusedBlock}

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
        cardMap?: Map<string, { setResult(ok: boolean): void }>,
    ): Promise<void> {
        const results: ToolResBlock[] = [];
        for (const tc of toolCalls) {
            const card = cardMap?.get(tc.id) ?? this._appendToolCard(tc.name);
            const res  = await this._executeTool(tc.name, tc.input);
            const ok   = !(res as Record<string, unknown>).error;
            card.setResult(ok);
            results.push({ type: 'tool_result', tool_use_id: tc.id, content: JSON.stringify(res) });
        }
        this._history.push({ role: 'user', content: results });
    }

    private async _runLoop(): Promise<void> {
        while (true) {
            const spinner = this._appendSpinner();
            const stream  = await this._callAPI();
            const { content, toolCalls, toolCards } = await this._processStream(stream, spinner);
            this._history.push({ role: 'assistant', content });
            if (!toolCalls.length) break;
            await this._executeTools(toolCalls, toolCards);
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
        }
    }

    private async _runConversation(userText: string): Promise<void> {
        this._sanitizeHistory();
        this._appendUserBubble(userText);
        this._history.push({ role: 'user', content: userText });
        await this._withSession(() => this._runLoop());
    }

    // ── API ───────────────────────────────────────────────────────────────────

    private async _callAPI(): Promise<ReadableStream<Uint8Array>> {
        const body = {
            model: MODEL, max_tokens: 4096,
            system:   this._buildSystem(),
            messages: this._history,
            tools:    this._buildTools(),
            stream:   true,
        };

        // Try local proxy first
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
        if (!key) { this._showApiKeyPrompt(); throw new Error('no-api-key'); }

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

    private _showApiKeyPrompt(): void {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg-system';
        wrap.innerHTML = `
            <div style="margin-bottom:6px;font-size:0.8125rem;color:var(--text-2)">
                Enter your Anthropic API key to use the build AI:
            </div>
            <div style="display:flex;gap:6px">
                <input type="password" placeholder="sk-ant-…"
                    style="flex:1;padding:4px 8px;border-radius:6px;border:1px solid var(--border);
                           background:var(--bg);color:var(--text-1);font-size:0.8125rem"/>
                <button type="button" style="padding:4px 10px;border-radius:6px;border:none;
                    background:var(--blue);color:#fff;font-size:0.8125rem;cursor:pointer">Save</button>
            </div>`;
        const inp = wrap.querySelector('input')!;
        const btn = wrap.querySelector('button')!;
        btn.addEventListener('click', () => {
            const val = inp.value.trim();
            if (!val) return;
            localStorage.setItem('urdf-api-key', val);
            wrap.remove();
            void this._runConversation(this._history[this._history.length - 1]?.role === 'user'
                ? (this._history.pop() as { role: 'user'; content: string }).content
                : '');
        });
        this._appendChat(wrap);
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
    ): Promise<{ content: ContentBlock[]; toolCalls: ToolUseBlock[]; toolCards: Map<string, { setResult(ok: boolean): void }> }> {
        const content: ContentBlock[] = [];
        const toolCalls: ToolUseBlock[] = [];
        const toolCards = new Map<string, { setResult(ok: boolean): void }>();
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

    private _appendToolCard(name: string): { setResult(ok: boolean): void } {
        const card     = document.createElement('div');
        card.className = 'chat-tool-card';
        const nameEl   = document.createElement('span');
        nameEl.className   = 'chat-tool-card-name';
        nameEl.textContent = name;
        const statusEl = document.createElement('span');
        statusEl.className = 'chat-tool-card-status';
        card.append(statusEl, nameEl);
        this._appendChat(card);
        return {
            setResult(ok: boolean) {
                statusEl.textContent = ok ? '✓' : '✕';
                statusEl.classList.add(ok ? 'ok' : 'err');
            },
        };
    }
}
