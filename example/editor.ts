import type { URDFManipulator } from '../src/index.js';

const LOCAL_PROXY        = 'http://127.0.0.1:7337/claude';
const MODEL              = 'claude-sonnet-4-6';
const RENDER_DEBOUNCE_MS = 600;
const MAX_XML_CHARS      = 30_000;
const IS_DEV             = import.meta.env.DEV;

// ── Tool schemas ──────────────────────────────────────────────────────────────

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
        'Use a new filename like "07-lidar.xml" to add a new component. ' +
        'The assembler rebuilds the full URDF and re-renders immediately.',
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

const TOOL_CARDS = new Set(['update_urdf', 'update_part']);

// ── Types ─────────────────────────────────────────────────────────────────────

interface TextBlock    { type: 'text'; text: string; }
interface ToolUseBlock { type: 'tool_use'; id: string; name: string; input: Record<string, unknown>; }
interface ToolResBlock { type: 'tool_result'; tool_use_id: string; content: string; }
type ContentBlock = TextBlock | ToolUseBlock | ToolResBlock;
type Msg =
    | { role: 'user';      content: string | ToolResBlock[] }
    | { role: 'assistant'; content: ContentBlock[] };

type Action = {
    fn?: (args: string[]) => void;
    prompt?: (arg: string) => string;
    desc: string;
    arg?: string;
};

// ── Markdown renderer ─────────────────────────────────────────────────────────

function renderMd(text: string): string {
    const m = (window as Record<string, unknown>).marked as { parse(s: string): string } | undefined;
    const d = (window as Record<string, unknown>).DOMPurify as { sanitize(s: string, o?: object): string } | undefined;
    if (m && d) return d.sanitize(m.parse(text), { ADD_ATTR: ['style'] });
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
}

// ── EditorController ──────────────────────────────────────────────────────────

export class URDFEditorController {
    private readonly _viewer:       URDFManipulator;
    private readonly _panelEl:      HTMLElement;
    private readonly _textareaEl:   HTMLTextAreaElement;
    private readonly _lineNumsEl:   HTMLElement;
    private readonly _chatMsgsEl:   HTMLElement;
    private readonly _chatInputEl:  HTMLTextAreaElement;
    private readonly _sendBtn:      HTMLButtonElement;
    private readonly _abortBtn:     HTMLButtonElement;
    private readonly _editorPaneEl: HTMLElement;
    private readonly _cmdAcEl:      HTMLElement;
    private readonly _actions:      Record<string, Action>;

    private _sourceUrl:   string | null = null;
    private _ownBlobUrl:  string | null = null;
    private _renderTimer  = 0;
    private _history:     Msg[] = [];
    private _abort:       AbortController | null = null;
    private _highlights   = new Set<number>();
    private _cmdAcIdx     = -1;
    private _partsList:   string[] = [];
    private _robotName = '';
    private readonly _partSelEl: HTMLSelectElement;
    private readonly _tabsEl: HTMLElement;

    constructor(viewer: URDFManipulator, panelEl: HTMLElement) {
        this._viewer       = viewer;
        this._panelEl      = panelEl;
        this._textareaEl   = panelEl.querySelector<HTMLTextAreaElement>('#editor-textarea')!;
        this._lineNumsEl   = panelEl.querySelector<HTMLElement>('#editor-line-nums')!;
        this._chatMsgsEl   = document.getElementById('chat-messages') as HTMLElement;
        this._chatInputEl  = document.getElementById('chat-input') as HTMLTextAreaElement;
        this._sendBtn      = document.getElementById('chat-send') as HTMLButtonElement;
        this._abortBtn     = document.getElementById('chat-abort') as HTMLButtonElement;
        this._editorPaneEl = panelEl.querySelector<HTMLElement>('.editor-pane')!;
        this._cmdAcEl      = document.getElementById('cmd-ac') as HTMLElement;
        this._partSelEl    = panelEl.querySelector<HTMLSelectElement>('#part-select')!;
        this._tabsEl       = document.getElementById('editor-tabs') as HTMLElement;

        this._partSelEl.addEventListener('change', () => void this._onPartChange());

        // Slash command registry — only actions that can't be expressed as natural language
        this._actions = {
            clear:  { fn: () => this._clearChat(), desc: 'Clear chat history' },
            format: { fn: () => this._formatXml(), desc: 'Prettify URDF XML'  },
        };

        // Code editor events
        this._textareaEl.addEventListener('input',  () => this._onEdit());
        this._textareaEl.addEventListener('scroll', () => {
            this._lineNumsEl.scrollTop = this._textareaEl.scrollTop;
        });

        // Chat input — auto-expand + autocomplete trigger
        this._chatInputEl.addEventListener('input', () => {
            this._chatInputEl.style.height = 'auto';
            this._chatInputEl.style.height = `${Math.min(this._chatInputEl.scrollHeight, 120)}px`;
            const val = this._chatInputEl.value;
            if (/^\/[a-z]*$/.test(val)) {
                this._showCmdAc(val.slice(1));
            } else {
                this._hideCmdAc();
            }
        });

        // Chat input keydown: Enter to send, arrows/tab/esc for autocomplete
        this._chatInputEl.addEventListener('keydown', (e) => {
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

        this._sendBtn.addEventListener('click', () => this._handleSend());
        this._abortBtn.addEventListener('click', () => this._abort?.abort());

        // Global: route printable keys to chat input when panel open and robot tab visible
        document.addEventListener('keydown', (e) => {
            if (!this._panelEl.closest('aside')?.classList.contains('open')) return;
            if (document.body.classList.contains('editor-open')) return;
            const active = document.activeElement as HTMLElement | null;
            if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
            if (active?.isContentEditable) return;
            if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
            this._chatInputEl.focus();
        });
    }

    get ownBlobUrl(): string | null { return this._ownBlobUrl; }
    get isOpen(): boolean { return this._panelEl.classList.contains('open'); }

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
        this._abort?.abort();
        this._hideCmdAc();
    }

    toggle(): void {
        if (this.isOpen) this.close();
        else this.open();
    }

    setSourceUrl(url: string): void {
        this._sourceUrl = url;
        this._history   = [];
        this._partsList = [];
        this._robotName = '';
        this._partSelEl.innerHTML = '<option value="">Full URDF</option>';
        this._partSelEl.hidden = true;
        if (this.isOpen) {
            void this._fetchAndPopulate(url);
            void this._loadPartsManifest();
        }
    }

    // ── Slash commands ────────────────────────────────────────────────────────

    private _showCmdAc(filter: string): void {
        const matches = Object.entries(this._actions).filter(([k]) => k.startsWith(filter));
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
        const action = this._actions[cmd];
        if (!action) return;
        this._hideCmdAc();
        if (action.fn) {
            this._chatInputEl.value = '';
            this._chatInputEl.style.height = '';
            action.fn([]);
        } else if (action.prompt) {
            this._chatInputEl.value = `/${cmd} `;
            this._chatInputEl.focus();
        }
    }

    // ── Editor ────────────────────────────────────────────────────────────────

    private async _fetchAndPopulate(url: string): Promise<void> {
        try {
            const text = await fetch(url).then(r => r.text());
            this._textareaEl.value = text;
            this._updateLineNums();
        } catch { /* ignore CORS / revoked blob */ }
    }

    private _onEdit(): void {
        this._updateLineNums();
        clearTimeout(this._renderTimer);
        this._renderTimer = window.setTimeout(() => this._applyRender(), RENDER_DEBOUNCE_MS);
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
        this._chatMsgsEl.innerHTML = '';
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

    // ── Parts ─────────────────────────────────────────────────────────────────

    private async _loadPartsManifest(): Promise<void> {
        if (!this._sourceUrl) return;
        const manifestUrl = this._sourceUrl.replace(/\.urdf(\?.*)?$/, '.parts.json');
        try {
            const data = await fetch(manifestUrl).then(r => r.json()) as { robot: string; parts: string[] };
            this._robotName = data.robot;
            this._partsList = data.parts;
            this._partSelEl.innerHTML = '<option value="">Full URDF</option>' +
                data.parts.map(p => `<option value="${p}">${p}</option>`).join('');
            this._partSelEl.hidden = false;
            this._renderTabs();
        } catch { /* no manifest — parts not available */ }
    }

    private async _onPartChange(): Promise<void> {
        const filename = this._partSelEl.value;
        this._highlights.clear();
        if (filename) {
            const partUrl = this._sourceUrl!.replace(/[^/]+\.urdf(\?.*)?$/, `parts/${filename}`);
            try {
                const text = await fetch(partUrl).then(r => r.text());
                this._textareaEl.value = text;
                this._updateLineNums();
            } catch { /* ignore */ }
        } else if (this._sourceUrl) {
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

    // ── AI Chat ───────────────────────────────────────────────────────────────

    private _handleSend(): void {
        this._hideCmdAc();
        const raw = this._chatInputEl.value.trim();
        if (!raw) return;

        // Slash command dispatch
        if (raw.startsWith('/')) {
            const [rawCmd, ...rest] = raw.slice(1).trim().split(/\s+/);
            const cmd    = rawCmd.toLowerCase();
            const action = this._actions[cmd];
            if (action?.fn) {
                this._chatInputEl.value = '';
                this._chatInputEl.style.height = '';
                action.fn(rest);
                return;
            }
            if (action?.prompt) {
                this._chatInputEl.value = action.prompt(rest.join(' '));
                return; // let user review + press Enter again
            }
            // Unknown slash command — fall through to send as text
        }

        if (this._abort) return;
        this._chatInputEl.value = '';
        this._chatInputEl.style.height = '';
        void this._runConversation(raw);
    }

    private _sanitizeHistory(): void {
        while (this._history.length > 0) {
            const last = this._history[this._history.length - 1];
            if (last.role !== 'assistant') break;
            const hasToolUse = (last.content as ContentBlock[]).some(b => b.type === 'tool_use');
            if (hasToolUse) { this._history.pop(); continue; }
            break;
        }
    }

    private async _runConversation(userText: string): Promise<void> {
        this._sanitizeHistory();
        this._appendUserBubble(userText);
        this._history.push({ role: 'user', content: userText });
        this._abort          = new AbortController();
        this._sendBtn.disabled = true;
        this._abortBtn.hidden  = false;

        try {
            while (true) {
                const spinnerEl = this._appendSpinner();
                const stream    = await this._callAPI();
                const { content, toolCalls } = await this._processStream(stream, spinnerEl);
                this._history.push({ role: 'assistant', content });

                if (!toolCalls.length) break;

                const results: ToolResBlock[] = [];
                for (const tc of toolCalls) {
                    const card = TOOL_CARDS.has(tc.name) ? this._appendToolCard(tc.name) : null;
                    const res  = await this._executeTool(tc.name, tc.input);
                    card?.setResult(!(res as Record<string, unknown>).error);
                    results.push({ type: 'tool_result', tool_use_id: tc.id, content: JSON.stringify(res) });
                }
                this._history.push({ role: 'user', content: results });
            }
        } catch (err) {
            const e = err as Error;
            if (e.name !== 'AbortError') {
                this._sanitizeHistory();
                this._appendAssistantBubble(`\u26a0 ${e.message || 'Request failed'}`);
            }
        } finally {
            this._abort            = null;
            this._sendBtn.disabled = false;
            this._abortBtn.hidden  = true;
        }
    }

    private _buildSystem(): string {
        const xml     = this._textareaEl.value;
        const nLines  = xml.split('\n').length;
        const preview = xml.length > MAX_XML_CHARS
            ? xml.slice(0, MAX_XML_CHARS) + '\n<!-- ... truncated ... -->'
            : xml;

        const selectedPart = this._partSelEl.value;

        const urdfRef = `URDF reference:
• <link name="..."> rigid body — <visual>, <collision>, <inertial>
• <joint name="..." type="fixed|revolute|continuous|prismatic|floating|planar">
• <origin xyz="x y z" rpy="r p y"/> — position + Euler angles (radians)
• <geometry>: <box size="x y z">, <cylinder radius length>, <sphere radius>, <mesh filename="..."/>
• revolute joints need <limit lower upper effort velocity/>

Coordinate conventions:
• -X = front/bumper, +X = rear, -Y = left, +Y = right, +Z = up
• rpy = roll(X), pitch(Y), yaw(Z) in radians`;

        if (selectedPart && this._partsList.length) {
            const partsDesc = this._partsList
                .map(p => `  ${p}${p === selectedPart ? ' ← editing' : ''}`)
                .join('\n');
            return `You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The robot URDF is split into part files assembled at build time. You are editing one part at a time.

ROBOT PARTS (${this._robotName}):
${partsDesc}

CURRENTLY EDITING: ${selectedPart} (${nLines} lines)
Part files contain <link> and <joint> elements only — no <?xml?> declaration, no <robot> wrapper.
\`\`\`xml
${preview}
\`\`\`

${urdfRef}

Tool rules:
• update_part — write the COMPLETE content of a part file; assembler rebuilds + viewer re-renders
• update_part with a new filename (e.g. "07-lidar.xml") to add a new component
• highlight_lines / scroll_to_line — editor navigation

Be concise. Use tools proactively.`;
        }

        return `You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The viewer re-renders in real time when you call update_urdf. The user sees the 3D result instantly.

CURRENT URDF (${nLines} lines):
\`\`\`xml
${preview}
\`\`\`

${urdfRef}

Tool rules:
• update_urdf — COMPLETE XML only; viewer re-renders immediately
• highlight_lines — call after every explanation with the relevant line numbers
• scroll_to_line — navigate editor to a specific line

Be concise. Use tools proactively.`;
    }

    private _buildTools() {
        const canEditParts = IS_DEV && this._partSelEl.value && this._partsList.length > 0;
        const editTool = canEditParts ? TOOL_UPDATE_PART : TOOL_FULL_URDF;
        return [editTool, TOOL_HIGHLIGHT, TOOL_SCROLL];
    }

    private async _callAPI(): Promise<ReadableStream<Uint8Array>> {
        const res = await fetch(LOCAL_PROXY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: this._abort!.signal,
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

    private async _processStream(
        body: ReadableStream<Uint8Array>,
        spinnerEl: HTMLElement,
    ): Promise<{ content: ContentBlock[]; toolCalls: ToolUseBlock[] }> {
        const content: ContentBlock[] = [];
        const toolCalls: ToolUseBlock[] = [];
        let curMsgEl: HTMLElement | null = null;
        let curText = '';
        let curTool: { id: string; name: string; idx: number } | null = null;
        let curJson = '';
        let rafPending = false;
        let spinnerRemoved = false;

        function removeSpinner(): void {
            if (spinnerRemoved) return;
            spinnerRemoved = true;
            spinnerEl.remove();
        }

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
                                this._chatMsgsEl.scrollTop = this._chatMsgsEl.scrollHeight;
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
        return { content, toolCalls };
    }

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

    private async _executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
        switch (name) {
            case 'update_part': {
                const { filename, xml } = args as { filename: string; xml: string };
                const res = await fetch('/urdf-write-part', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ robot: this._robotName, filename, content: xml }),
                });
                if (!res.ok) return { error: await res.text() };
                // Update textarea with the saved part content
                this._textareaEl.value = xml;
                this._highlights.clear();
                this._updateLineNums();
                // Update part selector if a new file was created
                if (this._partsList.length && !this._partsList.includes(filename)) {
                    this._partsList = [...this._partsList, filename].sort();
                    this._partSelEl.innerHTML = '<option value="">Full URDF</option>' +
                        this._partsList.map(p => `<option value="${p}">${p}</option>`).join('');
                    this._renderTabs();
                }
                this._partSelEl.value = filename;
                this._updateActiveTab();
                // Reload the assembled URDF in the viewer with a cache-bust
                if (this._sourceUrl) {
                    const base = this._sourceUrl.split('?')[0];
                    this._viewer.urdf = `${base}?t=${Date.now()}`;
                }
                return { ok: true, lines: xml.split('\n').length };
            }
            case 'update_urdf': {
                const xml = args.xml as string;
                this._textareaEl.value = xml;
                this._highlights.clear();
                this._updateLineNums();
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
            default:
                return { error: `unknown tool: ${name}` };
        }
    }

    // ── DOM helpers ───────────────────────────────────────────────────────────

    private _appendUserBubble(text: string): void {
        const div = document.createElement('div');
        div.className   = 'chat-msg-user';
        div.textContent = text;
        this._chatMsgsEl.appendChild(div);
        this._chatMsgsEl.scrollTop = this._chatMsgsEl.scrollHeight;
    }

    private _appendAssistantBubble(html: string): HTMLElement {
        const div = document.createElement('div');
        div.className = 'chat-msg-assistant';
        div.innerHTML  = renderMd(html);
        this._chatMsgsEl.appendChild(div);
        this._chatMsgsEl.scrollTop = this._chatMsgsEl.scrollHeight;
        return div;
    }

    private _appendSpinner(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'chat-spinner';
        div.innerHTML = '<span></span><span></span><span></span>';
        this._chatMsgsEl.appendChild(div);
        this._chatMsgsEl.scrollTop = this._chatMsgsEl.scrollHeight;
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
        card.append(nameEl, statusEl);
        this._chatMsgsEl.appendChild(card);
        this._chatMsgsEl.scrollTop = this._chatMsgsEl.scrollHeight;
        return {
            setResult(ok: boolean) {
                statusEl.textContent = ok ? '✓' : '✕';
                statusEl.classList.add(ok ? 'ok' : 'err');
            },
        };
    }
}

// ── XML indenter ──────────────────────────────────────────────────────────────

function _indentXml(xml: string): string {
    let indent = 0;
    return xml.trim()
        .replace(/>\s*</g, '>\n<')
        .split('\n')
        .map(raw => {
            const line = raw.trim();
            if (!line) return '';

            // Closing tag: dedent first
            if (line.startsWith('</')) {
                indent = Math.max(0, indent - 1);
                return '  '.repeat(indent) + line;
            }

            const result = '  '.repeat(indent) + line;

            // Opening tag (not self-closing, comment, or PI): indent children
            const isOpening = line.startsWith('<')
                && !line.endsWith('/>')
                && !line.startsWith('<!--')
                && !line.startsWith('<?');
            if (isOpening) indent++;

            return result;
        })
        .filter(Boolean)
        .join('\n');
}
