// ── AISession ─────────────────────────────────────────────────────────────
//
// Abstract base class for AI conversation controllers.
// Provides shared session lifecycle, history management, and SSE stream
// processing. Subclasses implement _callAPI(), _buildSystem(), _buildTools(),
// _executeTool(), and _appendToolCard().

import type { TextBlock, ToolUseBlock, ToolResBlock, ContentBlock, Msg } from './ai-types.js';
import { renderMd } from './ai-types.js';
import { parseSSE, appendUserBubble, appendAssistantBubble, appendSpinner } from './ai-chat-ui.js';

export const LOCAL_PROXY = 'http://127.0.0.1:7337/claude'; // claude-local-proxy (npm i -g claude-local-proxy)
export const MODEL       = 'claude-sonnet-4-6';

export type ToolCardHandle = { setResult(ok: boolean, input?: Record<string, unknown>, result?: unknown): void };

export interface AISessionOptions {
    messagesEl: HTMLElement;
    sendBtn:    HTMLButtonElement;
    abortBtn:   HTMLButtonElement;
}

export abstract class AISession {
    protected _history:   Msg[] = [];
    protected _abortCtrl: AbortController | null = null;

    protected readonly _messagesEl: HTMLElement;
    protected readonly _sendBtn:    HTMLButtonElement;
    protected readonly _abortBtn:   HTMLButtonElement;

    constructor(opts: AISessionOptions) {
        this._messagesEl = opts.messagesEl;
        this._sendBtn    = opts.sendBtn;
        this._abortBtn   = opts.abortBtn;
    }

    // ── Abstract methods — implemented by subclasses ───────────────────────

    protected abstract _callAPI(): Promise<ReadableStream<Uint8Array>>;
    protected abstract _appendToolCard(name: string): ToolCardHandle;
    protected abstract _executeTool(name: string, args: Record<string, unknown>): Promise<unknown>;

    // ── Overridable hooks ─────────────────────────────────────────────────

    /** Called in the finally block of _withSession. Override to clean up
     *  subclass-specific UI (e.g. a Continue button). */
    protected _onSessionFinally(): void {}

    // ── History management ─────────────────────────────────────────────────

    protected _sanitizeHistory(): void {
        while (this._history.length > 0) {
            const last = this._history[this._history.length - 1];
            // Remove trailing user message that is only tool_result blocks (orphaned after a failed tool loop)
            if (last.role === 'user' && Array.isArray(last.content) &&
                (last.content as ContentBlock[]).every(b => b.type === 'tool_result')) {
                this._history.pop(); continue;
            }
            // Remove trailing assistant message with unresolved tool_use
            if (last.role === 'assistant' &&
                (last.content as ContentBlock[]).some(b => b.type === 'tool_use')) {
                this._history.pop(); continue;
            }
            break;
        }
    }

    protected _saveHistory(): void {
        try { localStorage.setItem('urdf-chat-history', JSON.stringify(this._history)); } catch { /**/ }
    }

    // ── Tool execution ─────────────────────────────────────────────────────

    protected async _executeTools(
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

    // ── Conversation loop ──────────────────────────────────────────────────

    protected async _runLoop(): Promise<void> {
        while (true) {
            const spinner = appendSpinner(this._messagesEl);
            const stream  = await this._callAPI();
            const result  = await this._processStream(stream, spinner);
            this._history.push({ role: 'assistant', content: result.content });
            this._saveHistory();
            if (!result.toolCalls.length) break;
            const { noFollowUp } = await this._executeTools(result.toolCalls, result.toolCards);
            if (noFollowUp) break;
        }
    }

    protected async _withSession(fn: () => Promise<void>): Promise<void> {
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
                appendAssistantBubble(this._messagesEl, `\u26a0 ${e.message || 'Request failed'}`);
            }
        } finally {
            this._abortCtrl        = null;
            this._sendBtn.disabled = false;
            this._abortBtn.hidden  = true;
            this._onSessionFinally();
        }
    }

    // ── SSE stream processor ───────────────────────────────────────────────

    protected async _processStream(
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

        for await (const { event, data } of parseSSE(body)) {
            const d = data as {
                content_block?: { type: string; id?: string; name?: string };
                delta?: { type: string; text?: string; partial_json?: string };
            };

            if (event === 'content_block_start') {
                removeSpinner();
                const cb = d.content_block;
                if (cb?.type === 'text') {
                    curMsgEl = appendAssistantBubble(this._messagesEl, '');
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
}
