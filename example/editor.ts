import type { URDFManipulator } from '../src/index.js';
import type { ToolUseBlock, ToolResBlock, ContentBlock, Msg } from './ai-types.js';
import { assembleURDF } from './urdf-assemble.js';
import { appendUserBubble, appendAssistantBubble, appendToolCard } from './ai-chat-ui.js';
import { AISession, LOCAL_PROXY, MODEL } from './ai-session.js';
import type { ToolCardHandle } from './ai-session.js';
import { $ } from './dom-utils.js';
const RENDER_DEBOUNCE_MS = 600;
const MAX_XML_CHARS      = 30_000;

const TOOL_FULL_URDF = {
    name: 'update_urdf',
    description:
        'Replace the URDF code in the editor with new XML and immediately re-render the 3D model. ' +
        'Always send the COMPLETE URDF, not a diff.',
    input_schema: {
        type: 'object',
        properties: { xml: { type: 'string', description: 'Complete URDF XML' } },
        required: ['xml'],
    },
} as const;

const TOOL_UPDATE_PART = {
    name: 'update_part',
    description:
        'Write or create a URDF part file (e.g. "05-motor-driver.xml"). ' +
        'Send the complete content of that part — link + joint elements only, no <robot> wrapper. ' +
        'Use a new filename like "07-lidar.xml" to add a new component.',
    input_schema: {
        type: 'object',
        properties: {
            filename: { type: 'string', description: 'Part filename, e.g. "05-motor-driver.xml"' },
            xml:      { type: 'string', description: 'Complete content of this part file' },
        },
        required: ['filename', 'xml'],
    },
} as const;

const TOOL_HIGHLIGHT = {
    name: 'highlight_lines',
    description: 'Highlight 1-based line numbers in the editor. Call after every explanation.',
    input_schema: {
        type: 'object',
        properties: { lines: { type: 'array', items: { type: 'number' }, description: '1-based line numbers' } },
        required: ['lines'],
    },
} as const;

const TOOL_SCROLL = {
    name: 'scroll_to_line',
    description: 'Scroll the editor to bring a specific line into view.',
    input_schema: {
        type: 'object',
        properties: { line: { type: 'number', description: '1-based line number' } },
        required: ['line'],
    },
} as const;

const TOOL_READ_PART = {
    name: 'read_part',
    description:
        'Read the full XML of any part file. Call this before placing a new component to check ' +
        'occupied xyz positions and avoid spatial overlaps.',
    input_schema: {
        type: 'object',
        properties: {
            filename: { type: 'string', description: 'Part filename, e.g. "01-chassis.xml"' },
        },
        required: ['filename'],
    },
} as const;

const TOOL_CARDS = new Set(['update_urdf', 'update_part']);

const URDF_REF = `URDF reference:
• <link name="..."> rigid body — <visual>, <collision>, <inertial>
• <joint name="..." type="fixed|revolute|continuous|prismatic|floating|planar">
• <origin xyz="x y z" rpy="r p y"/> — position + Euler angles (radians)
• <geometry>: <box size="x y z">, <cylinder radius length>, <sphere radius>, <mesh filename="..."/>
• revolute joints need <limit lower upper effort velocity/>

Coordinate conventions:
• -X = front/bumper, +X = rear, -Y = left, +Y = right, +Z = up
• rpy = roll(X), pitch(Y), yaw(Z) in radians`;

type Action = {
    fn?: (args: string[]) => void;
    prompt?: (arg: string) => string;
    desc: string;
    arg?: string;
};


export class URDFEditorController extends AISession {
    private readonly _viewer:       URDFManipulator;
    private readonly _panelEl:      HTMLElement;
    private readonly _textareaEl:   HTMLTextAreaElement;
    private readonly _lineNumsEl:   HTMLElement;
    private readonly _detailBtn:    HTMLButtonElement;
    private readonly _actions:      Record<string, Action>;

    private _sourceUrl:   string | null = null;
    private _ownBlobUrl:  string | null = null;
    private _renderTimer  = 0;
    private _highlights   = new Set<number>();
    private _partsList:       string[] = [];
    private _partCache        = new Map<string, string>();
    private _originalCache    = new Map<string, string>();
    private _robotName        = '';
    private _urdfFetched      = false;
    private _componentSpecs:  string | null = null;
    private _detailed = false;
    private readonly _partSelEl:  HTMLSelectElement;
    private readonly _tabsEl:     HTMLElement;
    private readonly _resetBtn:   HTMLButtonElement;

    constructor(viewer: URDFManipulator, panelEl: HTMLElement) {
        super({
            messagesEl: $('chat-messages'),
            sendBtn:    $<HTMLButtonElement>('chat-send'),
            abortBtn:   $<HTMLButtonElement>('chat-abort'),
        });
        this._viewer       = viewer;
        this._panelEl      = panelEl;
        this._textareaEl   = panelEl.querySelector<HTMLTextAreaElement>('#editor-textarea')!;
        this._lineNumsEl   = panelEl.querySelector<HTMLElement>('#editor-line-nums')!;
        this._detailBtn    = $<HTMLButtonElement>('chat-brief-toggle');
        this._partSelEl    = panelEl.querySelector<HTMLSelectElement>('#part-select')!;
        this._tabsEl       = $('editor-tabs');
        this._resetBtn     = panelEl.querySelector<HTMLButtonElement>('#part-reset')!;
        this._resetBtn.addEventListener('click', () => this._resetParts());

        this._partSelEl.addEventListener('change', () => void this._onPartChange());

        this._actions = {
            clear:  { fn: () => this._clearChat(), desc: 'Clear chat history' },
            format: { fn: () => this._formatXml(), desc: 'Prettify URDF XML'  },
        };

        this._textareaEl.addEventListener('input',  () => this._onEdit());
        this._textareaEl.addEventListener('scroll', () => {
            this._lineNumsEl.scrollTop = this._textareaEl.scrollTop;
        });

    }

    get isOpen(): boolean { return this._panelEl.classList.contains('open'); }

    get partsList(): string[] { return this._partsList; }

    async readPart(filename: string): Promise<string | null> {
        if (!/^[\w-]+\.xml$/.test(filename) || !this._sourceUrl) return null;
        const cached = this._partCache.get(this._partUrl(filename));
        if (cached !== undefined) return cached;
        try { return await fetch(this._partUrl(filename)).then(r => r.text()); }
        catch { return null; }
    }

    async writePart(filename: string, xml: string): Promise<boolean> {
        if (!/^[\w-]+\.xml$/.test(filename) || !this._sourceUrl) return false;
        this._partCache.set(this._partUrl(filename), xml);
        this._saveOverrides();
        if (!this._partsList.includes(filename)) {
            this._partsList = [...this._partsList, filename].sort();
            this._rebuildPartOptions();
            this._renderTabs();
        }
        this._setEditorContent(xml);
        this._partSelEl.value = filename;
        this._updateActiveTab();
        this._applyPartsRender();
        return true;
    }

    /** Eagerly load the parts manifest when the editor panel is closed. */
    loadPartsInBackground(): void {
        if (!this._sourceUrl || this._partsList.length > 0 || this.isOpen) return;
        void this._loadPartsManifest();
    }

    /** Called by URDFChatController when editor tab is active. */
    handleExternalInput(text: string): void {
        if (text.startsWith('/')) {
            const [rawCmd, ...rest] = text.slice(1).trim().split(/\s+/);
            const action = this._actions[rawCmd.toLowerCase()];
            if (action?.fn) { action.fn(rest); return; }
        }
        if (this._abortCtrl) return;
        void this._runConversation(text);
    }

    set brief(v: boolean) {
        this._detailed = !v;
        this._detailBtn.classList.toggle('active', this._detailed);
        this._detailBtn.setAttribute('aria-pressed', String(this._detailed));
    }

    async jumpToJoint(name: string): Promise<void> {
        if (!this._partsList.length || !this._sourceUrl) return;
        const needle = `name="${name}"`;
        for (const filename of this._partsList) {
            const url = this._sourceUrl.replace(/[^/]+\.urdf(\?.*)?$/, `parts/${filename}`);
            const text = await fetch(url).then(r => r.text());
            if (!text.includes(needle)) continue;
            this._partSelEl.value = filename;
            await this._onPartChange();
            const idx = this._textareaEl.value.indexOf(needle);
            if (idx !== -1) {
                this._textareaEl.focus();
                this._textareaEl.setSelectionRange(idx, idx);
                const line = this._textareaEl.value.slice(0, idx).split('\n').length;
                this._scrollEditorToLine(line);
            }
            return;
        }
    }

    open(): void {
        this._panelEl.classList.add('open');
        document.body.classList.add('editor-open');
        if (this._sourceUrl) {
            if (!this._textareaEl.value) void this._fetchAndPopulate(this._sourceUrl);
            if (!this._partsList.length) void this._loadPartsManifest();
        }
    }

    close(): void {
        this._panelEl.classList.remove('open');
        document.body.classList.remove('editor-open');
        this._abortCtrl?.abort();
    }

    setSourceUrl(url: string): void {
        this._abortCtrl?.abort();
        this._sourceUrl      = url;
        this._history        = [];
        this._partsList      = [];
        this._partCache.clear();
        this._originalCache.clear();
        this._robotName      = '';
        this._urdfFetched    = false;
        this._componentSpecs = null;
        this._textareaEl.value = '';
        this._rebuildPartOptions();
        this._partSelEl.hidden = true;
        this._loadPersistedHistory();
        setTimeout(() => this._maybeResume(), 0);
        if (this.isOpen) {
            void this._fetchAndPopulate(url);
            void this._loadPartsManifest();
        }
    }

    private async _fetchAndPopulate(url: string): Promise<void> {
        try {
            const text = await fetch(url).then(r => r.text());
            this._textareaEl.value = text;
            this._urdfFetched = true;
            this._updateLineNums();
        } catch { /* ignore CORS / revoked blob */ }
    }

    private _onEdit(): void {
        this._updateLineNums();
        clearTimeout(this._renderTimer);
        const filename = this._partSelEl.value;
        if (filename) {
            this._partCache.set(this._partUrl(filename), this._textareaEl.value);
            this._saveOverrides();
        }
        this._renderTimer = window.setTimeout(
            () => filename ? this._applyPartsRender() : this._applyRender(),
            RENDER_DEBOUNCE_MS,
        );
    }

    private _applyRender(): void {
        const xml = this._textareaEl.value;
        if (this._ownBlobUrl) URL.revokeObjectURL(this._ownBlobUrl);
        this._ownBlobUrl = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
        this._viewer.urdf = this._ownBlobUrl;
    }

    private _updateLineNums(): void {
        const lines = this._textareaEl.value.split('\n');
        this._lineNumsEl.innerHTML = lines
            .map((_, i) => `<div class="lnum${this._highlights.has(i + 1) ? ' hl' : ''}">${i + 1}</div>`)
            .join('');
    }

    private _scrollEditorToLine(line: number): void {
        const lh  = parseFloat(getComputedStyle(this._textareaEl).lineHeight) || 19;
        const top = (line - 1) * lh - this._textareaEl.clientHeight / 2;
        this._textareaEl.scrollTop  = Math.max(0, top);
        this._lineNumsEl.scrollTop  = this._textareaEl.scrollTop;
    }

    private _highlightLines(lines: number[]): void {
        this._highlights = new Set(lines);
        this._updateLineNums();
        if (lines.length) this._scrollEditorToLine(lines[0]);
    }

    private _clearChat(): void {
        this._history = [];
        this._messagesEl.innerHTML = '';
        const key = this._historyKey();
        if (key) try { localStorage.removeItem(key); } catch {}
    }

    private _formatXml(): void {
        const xml = this._textareaEl.value.trim();
        if (!xml) return;
        try {
            const doc = new DOMParser().parseFromString(xml, 'application/xml');
            if (doc.querySelector('parsererror')) return; // invalid XML
            const formatted = _indentXml(new XMLSerializer().serializeToString(doc));
            this._textareaEl.value = formatted;
            this._updateLineNums();
        } catch { /* keep original */ }
    }

    private _rebuildPartOptions(): void {
        this._partSelEl.innerHTML = '<option value="">Full URDF</option>' +
            this._partsList.map(p => `<option value="${p}">${p}</option>`).join('');
    }

    private _partUrl(filename: string): string {
        return this._sourceUrl!.replace(/[^/]+\.urdf(\?.*)?$/, `parts/${filename}`);
    }

    private _overridesKey(): string | null {
        return this._sourceUrl && this._partsList.length > 0
            ? `urdf-parts:${this._sourceUrl}` : null;
    }

    private get _isDirty(): boolean {
        return this._partsList.some(f => {
            const url = this._partUrl(f);
            return this._partCache.get(url) !== this._originalCache.get(url);
        });
    }

    private _updateResetBtn(): void {
        const hasParts = this._partsList.length > 0;
        this._resetBtn.hidden    = !hasParts;
        this._resetBtn.disabled  = !this._isDirty;
    }

    private _saveOverrides(): void {
        const key = this._overridesKey();
        if (!key) return;
        const overrides: Record<string, string> = {};
        for (const f of this._partsList) {
            const url = this._partUrl(f);
            const cur = this._partCache.get(url), orig = this._originalCache.get(url);
            if (cur !== undefined && cur !== orig) overrides[f] = cur;
        }
        try {
            if (Object.keys(overrides).length === 0) localStorage.removeItem(key);
            else localStorage.setItem(key, JSON.stringify(overrides));
        } catch {}
        this._updateResetBtn();
    }

    private _resetParts(): void {
        if (!this._isDirty) return;
        if (!confirm('Reset all parts to their original version?')) return;
        const key = this._overridesKey();
        if (key) try { localStorage.removeItem(key); } catch {}
        for (const f of this._partsList) {
            const url = this._partUrl(f);
            const orig = this._originalCache.get(url);
            if (orig !== undefined) this._partCache.set(url, orig);
        }
        const cur = this._partSelEl.value;
        this._setEditorContent(
            cur ? (this._partCache.get(this._partUrl(cur)) ?? '') : this._assembleFromCache(),
        );
        this._applyPartsRender();
        this._updateResetBtn();
    }

    private _assembleFromCache(): string {
        return assembleURDF(
            this._robotName,
            this._partsList.map(f => [f, this._partCache.get(this._partUrl(f)) ?? ''] as [string, string]),
        );
    }

    private _applyPartsRender(): void {
        const robotDir = this._sourceUrl!.replace(/\/[^/]+\.urdf(\?.*)?$/, '');
        const xml = this._assembleFromCache()
            .replace(/filename="([^/"]+)"/g, `filename="${robotDir}/$1"`);
        if (this._ownBlobUrl) URL.revokeObjectURL(this._ownBlobUrl);
        this._ownBlobUrl = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
        this._viewer.urdf = this._ownBlobUrl;
    }

    private async _loadPartsManifest(): Promise<void> {
        if (!this._sourceUrl) return;
        const manifestUrl = this._sourceUrl.replace(/\.urdf(\?.*)?$/, '.parts.json');
        try {
            const data = await fetch(manifestUrl).then(r => r.json()) as { robot: string; parts: string[] };
            this._robotName = data.robot;
            this._partsList = data.parts;

            // Eagerly fetch all parts from server into original + working cache
            await Promise.all(data.parts.map(async f => {
                const url = this._partUrl(f);
                const text = await fetch(url).then(r => r.text());
                this._originalCache.set(url, text);
                this._partCache.set(url, text);
            }));

            // Overlay any saved local overrides (including new parts not in the manifest)
            let hadOverrides = false;
            const oKey = this._overridesKey();
            if (oKey) {
                try {
                    const raw = localStorage.getItem(oKey);
                    if (raw) {
                        const saved = JSON.parse(raw) as Record<string, string>;
                        for (const [f, xml] of Object.entries(saved)) {
                            if (!this._partsList.includes(f)) {
                                this._partsList = [...this._partsList, f].sort();
                            }
                            this._partCache.set(this._partUrl(f), xml);
                            hadOverrides = true;
                        }
                    }
                } catch {}
            }

            this._urdfFetched = true;
            if (!this._partSelEl.value) {
                this._textareaEl.value = this._assembleFromCache();
                this._updateLineNums();
            }
            if (hadOverrides) this._applyPartsRender();
            this._rebuildPartOptions();
            this._partSelEl.hidden = false;
            this._renderTabs();
            this._updateResetBtn();
        } catch { /* no manifest, parts not available */ }

        // Try to load per-robot hardware specs for placement guidance.
        if (this._sourceUrl) {
            const specsUrl = this._sourceUrl.replace(/\.urdf(\?.*)?$/, '.components.json');
            try {
                type SpecEntry = { size_mm: number[]; note?: string };
                const specs = await fetch(specsUrl).then(r => r.json()) as {
                    chassis?: SpecEntry;
                    components?: Record<string, SpecEntry>;
                };
                const lines: string[] = [];
                if (specs.chassis) {
                    const [x, y, z] = specs.chassis.size_mm;
                    lines.push(`chassis: ${x}×${y}×${z} mm${specs.chassis.note ? ' — ' + specs.chassis.note : ''}`);
                }
                for (const [name, c] of Object.entries(specs.components ?? {})) {
                    const [x, y, z] = c.size_mm;
                    lines.push(`${name}: ${x}×${y}×${z} mm${c.note ? ' — ' + c.note : ''}`);
                }
                this._componentSpecs = lines.join('\n');
            } catch { /* no specs file for this robot */ }
        }
    }

    private async _onPartChange(): Promise<void> {
        const filename = this._partSelEl.value;
        if (filename) {
            const url = this._partUrl(filename);
            try {
                const cached = this._partCache.get(url);
                const text = cached !== undefined ? cached : await fetch(url).then(r => r.text());
                this._partCache.set(url, text);
                this._setEditorContent(text);
            } catch { /* ignore */ }
        } else if (this._partsList.length > 0) {
            this._setEditorContent(this._assembleFromCache());
        } else if (this._sourceUrl) {
            this._highlights.clear();
            await this._fetchAndPopulate(this._sourceUrl);
        }
        this._updateActiveTab();
    }

    private _renderTabs(): void {
        this._tabsEl.innerHTML = '';
        this._appendTab('all', '');
        for (const f of this._partsList) {
            this._appendTab(f.replace(/^\d+-/, '').replace(/\.xml$/, ''), f);
        }
        this._updateActiveTab();
    }

    private _appendTab(label: string, value: string): void {
        const btn = document.createElement('button');
        btn.className = 'editor-tab';
        btn.textContent = label;
        btn.dataset.part = value;
        btn.addEventListener('click', () => this._selectTab(value));
        this._tabsEl.appendChild(btn);
    }

    private _selectTab(filename: string): void {
        this._partSelEl.value = filename;
        void this._onPartChange();
    }

    private _updateActiveTab(): void {
        for (const btn of this._tabsEl.querySelectorAll<HTMLElement>('.editor-tab'))
            btn.classList.toggle('active', (btn.dataset.part ?? '') === this._partSelEl.value);
    }

    // ── History persistence ───────────────────────────────────────────────────

    private _historyKey(): string | null {
        return this._sourceUrl ? `urdf-chat:${this._sourceUrl}` : null;
    }

    private _loadPersistedHistory(): void {
        this._messagesEl.innerHTML = '';
        const key = this._historyKey();
        if (!key) return;
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return;
            this._history = JSON.parse(raw) as Msg[];
            for (const msg of this._history) {
                if (msg.role === 'user' && typeof msg.content === 'string') {
                    appendUserBubble(this._messagesEl, msg.content);
                } else if (msg.role === 'assistant') {
                    for (const b of msg.content as ContentBlock[]) {
                        if (b.type === 'text' && b.text) appendAssistantBubble(this._messagesEl, b.text);
                        else if (b.type === 'tool_use' && TOOL_CARDS.has(b.name))
                            appendToolCard(this._messagesEl, b.name).setResult(true);
                    }
                }
            }
        } catch { this._history = []; }
    }

    // ── Conversation engine ───────────────────────────────────────────────────

    protected override _saveHistory(): void {
        const key = this._historyKey();
        if (!key) return;
        try { localStorage.setItem(key, JSON.stringify(this._history)); } catch {}
    }

    protected _appendToolCard(name: string): ToolCardHandle {
        if (TOOL_CARDS.has(name)) return appendToolCard(this._messagesEl, name);
        return { setResult() {} };
    }

    protected override async _executeTools(
        toolCalls: ToolUseBlock[],
        cardMap?: Map<string, ToolCardHandle>,
    ): Promise<{ noFollowUp: boolean }> {
        let noFollowUp = false;
        const results: ToolResBlock[] = [];
        for (const tc of toolCalls) {
            const card = cardMap?.get(tc.id) ?? this._appendToolCard(tc.name);
            const res  = await this._executeTool(tc.name, tc.input);
            const ok   = !(res as Record<string, unknown>).error;
            card.setResult(ok);
            if (ok && TOOL_CARDS.has(tc.name)) noFollowUp = true;
            results.push({ type: 'tool_result', tool_use_id: tc.id, content: JSON.stringify(res) });
        }
        this._history.push({ role: 'user', content: results });
        this._saveHistory();
        return { noFollowUp };
    }

    // Called after setSourceUrl: re-execute any pending tool calls left from a previous session.
    private _maybeResume(): void {
        const last = this._history[this._history.length - 1];
        if (!last || last.role !== 'assistant') return;
        const pending = (last.content as ContentBlock[])
            .filter(b => b.type === 'tool_use' && Object.keys((b as ToolUseBlock).input).length > 0) as ToolUseBlock[];
        if (!pending.length) return;
        void this._withSession(async () => {
            await this._executeTools(pending);
            await this._runLoop();
        });
    }

    private async _runConversation(userText: string): Promise<void> {
        this._sanitizeHistory();
        appendUserBubble(this._messagesEl, userText);
        this._history.push({ role: 'user', content: userText });
        this._saveHistory();

        if (!this._urdfFetched && this._sourceUrl) {
            await this._fetchAndPopulate(this._sourceUrl);
            await this._loadPartsManifest();
        }

        await this._withSession(() => this._runLoop());
    }

    private get _displayRobotName(): string {
        if (this._robotName) return this._robotName;
        const m = this._sourceUrl?.match(/([^/]+)\.urdf/i);
        return m?.[1] ?? '';
    }

    private _summarizePart(xml: string): string {
        try {
            const doc    = new DOMParser().parseFromString(`<root>${xml}</root>`, 'application/xml');
            const links  = [...doc.querySelectorAll('link')].map(l => l.getAttribute('name') ?? '?');
            const joints = [...doc.querySelectorAll('joint')].map(j => {
                const name   = j.getAttribute('name') ?? '?';
                const type   = j.getAttribute('type') ?? 'fixed';
                const xyz    = j.querySelector('origin')?.getAttribute('xyz') ?? '';
                return xyz ? `${name}(${type} xyz=${xyz})` : `${name}(${type})`;
            });
            return [
                links.length  ? `links=[${links.join(', ')}]`  : '',
                joints.length ? `joints=[${joints.join(', ')}]` : '',
            ].filter(Boolean).join(', ');
        } catch { return ''; }
    }

    private _buildSystem(): string {
        const xml     = this._textareaEl.value;
        const nLines  = xml.split('\n').length;
        const preview = xml.length > MAX_XML_CHARS
            ? xml.slice(0, MAX_XML_CHARS) + '\n<!-- ... truncated ... -->'
            : xml;
        const robotHeader = this._displayRobotName ? `ROBOT: ${this._displayRobotName}\n\n` : '';
        const briefNote   = !this._detailed
            ? '\nBRIEF MODE: Answer in fewer than 4 lines. No preamble, no postamble, no elaboration. Minimize tokens. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.'
            : '';
        return this._partSelEl.value && this._partsList.length
            ? this._buildSystemParts(nLines, preview, robotHeader, briefNote)
            : this._buildSystemFull(nLines, preview, robotHeader, briefNote);
    }

    private _buildSystemParts(nLines: number, preview: string, robotHeader: string, briefNote: string): string {
        const selectedPart = this._partSelEl.value;
        const specsBlock   = this._componentSpecs
            ? `\nHARDWARE SPECS (real dimensions for sizing new components, in mm):\n${this._componentSpecs}\n`
            : '';
        const partsDesc = this._partsList.map(p => {
            const summary = this._summarizePart(this._partCache.get(this._partUrl(p)) ?? '');
            const tag     = p === selectedPart ? ' ← editing' : '';
            return summary ? `  ${p}: ${summary}${tag}` : `  ${p}${tag}`;
        }).join('\n');
        return `You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The robot URDF is split into part files. You are editing one part at a time.

${robotHeader}PARTS (auto-summarised with joint xyz positions — use this to understand the complete robot topology and occupied space):
${partsDesc}
${specsBlock}
CURRENTLY EDITING: ${selectedPart} (${nLines} lines)
Part files contain <link> and <joint> elements only — no <?xml?> declaration, no <robot> wrapper.
\`\`\`xml
${preview}
\`\`\`

${URDF_REF}

Tool rules:
• update_part — write the COMPLETE content of a part file; assembler rebuilds + viewer re-renders
• update_part with a new filename (e.g. "07-lidar.xml") to add a new component
• read_part — read the full XML of any part file before placing a new component nearby
• highlight_lines / scroll_to_line — editor navigation

Be concise. Use tools proactively. Before adding a new component, check the part summaries for occupied xyz positions to avoid overlaps; use read_part for full details if needed.${briefNote}`;
    }

    private _buildSystemFull(nLines: number, preview: string, robotHeader: string, briefNote: string): string {
        return `You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The viewer re-renders in real time when you call update_urdf. The user sees the 3D result instantly.

${robotHeader}CURRENT URDF (${nLines} lines):
\`\`\`xml
${preview}
\`\`\`

${URDF_REF}

Tool rules:
• update_urdf — COMPLETE XML only; viewer re-renders immediately
• highlight_lines — call after every explanation with the relevant line numbers
• scroll_to_line — navigate editor to a specific line

Be concise. Use tools proactively.${briefNote}`;
    }

    private _buildTools(): readonly object[] {
        const canEditParts = this._partsList.length > 0;
        const editTool = canEditParts ? TOOL_UPDATE_PART : TOOL_FULL_URDF;
        if (canEditParts) return [editTool, TOOL_READ_PART, TOOL_HIGHLIGHT, TOOL_SCROLL];
        return [editTool, TOOL_HIGHLIGHT, TOOL_SCROLL];
    }

    protected async _callAPI(): Promise<ReadableStream<Uint8Array>> {
        const res = await fetch(LOCAL_PROXY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: this._abortCtrl!.signal,
            body: JSON.stringify({
                model: MODEL, max_tokens: 4096,
                system: this._buildSystem(),
                messages: this._history,
                tools: this._buildTools(), stream: true,
            }),
        });
        if (!res.ok) {
            const msg = await res.text().catch(() => res.statusText);
            throw new Error(`API ${res.status}: ${msg.slice(0, 200)}`);
        }
        return res.body!;
    }

    private _setEditorContent(xml: string): void {
        this._textareaEl.value = xml;
        this._highlights.clear();
        this._updateLineNums();
    }

    protected async _executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
        switch (name) {
            case 'update_part': {
                const { filename, xml } = args as { filename: string; xml: string };
                if (!/^[\w-]+\.xml$/.test(filename)) return { error: 'invalid filename' };
                this._partCache.set(this._partUrl(filename), xml);
                this._saveOverrides();
                if (!this._partsList.includes(filename)) {
                    this._partsList = [...this._partsList, filename].sort();
                    this._rebuildPartOptions();
                    this._renderTabs();
                }
                this._setEditorContent(xml);
                this._partSelEl.value = filename;
                this._updateActiveTab();
                this._applyPartsRender();
                return { ok: true, lines: xml.split('\n').length };
            }
            case 'update_urdf': {
                const xml = args.xml as string;
                this._setEditorContent(xml);
                this._applyRender();
                return { ok: true, lines: xml.split('\n').length };
            }
            case 'highlight_lines': {
                this._highlightLines(args.lines as number[]);
                return { ok: true };
            }
            case 'scroll_to_line': {
                this._scrollEditorToLine(args.line as number);
                return { ok: true };
            }
            case 'read_part': {
                const { filename } = args as { filename: string };
                if (!/^[\w-]+\.xml$/.test(filename)) return { error: 'invalid filename' };
                const cached = this._partCache.get(this._partUrl(filename));
                if (cached !== undefined) return { ok: true, xml: cached };
                try {
                    const text = await fetch(this._partUrl(filename)).then(r => r.text());
                    return { ok: true, xml: text };
                } catch {
                    return { error: `could not read ${filename}` };
                }
            }
            default:
                return { error: `unknown tool: ${name}` };
        }
    }

}

function _indentXml(xml: string): string {
    const lines = xml.trim().replace(/>\s*</g, '>\n<').split('\n');
    const out: string[] = [];
    let indent = 0;

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;

        if (line.startsWith('</')) {
            indent = Math.max(0, indent - 1);
        }

        out.push('  '.repeat(indent) + line);

        if (line.startsWith('<')
            && !line.startsWith('</')
            && !line.endsWith('/>')
            && !line.startsWith('<!--')
            && !line.startsWith('<?')) {
            indent++;
        }
    }

    return out.join('\n');
}
