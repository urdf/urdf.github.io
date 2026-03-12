import { renderMd } from './ai-types.js';

// ── SSE stream parser ─────────────────────────────────────────────────────

export async function* parseSSE(
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

// ── DOM helpers ───────────────────────────────────────────────────────────

function appendChat(msgsEl: HTMLElement, el: HTMLElement): void {
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
}

export function appendUserBubble(msgsEl: HTMLElement, text: string): void {
    const div = document.createElement('div');
    div.className   = 'msg user';
    div.textContent = text;
    appendChat(msgsEl, div);
}

export interface AssistantBubbleOpts {
    onAccept?: () => void;
    onUndo?:   () => void;
    onAdjust?: () => void;
}

/**
 * Creates a `.msg.ai` bubble and returns the inner `.ai-body` element.
 * Callers that stream content should set `bodyEl.innerHTML = renderMd(text)`.
 * If `opts.onAccept` is provided, an Accept / Undo / Adjust button row is
 * appended and wired to the supplied callbacks.
 */
export function appendAssistantBubble(
    msgsEl: HTMLElement,
    html: string,
    opts?: AssistantBubbleOpts,
): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'msg ai';

    const hd = document.createElement('div');
    hd.className = 'ai-hd';
    hd.innerHTML = '<div class="ai-icon">C</div><span class="ai-name">Claude</span>';

    const body = document.createElement('div');
    body.className = 'ai-body';
    body.innerHTML = renderMd(html);

    wrapper.append(hd, body);

    if (opts?.onAccept !== undefined) {
        const caRow = document.createElement('div');
        caRow.className = 'ca-row';

        const acceptBtn = document.createElement('button');
        acceptBtn.className   = 'ca-accept';
        acceptBtn.textContent = '✓ Accept';
        acceptBtn.addEventListener('click', () => opts.onAccept!());

        const undoBtn = document.createElement('button');
        undoBtn.className   = 'ca-undo';
        undoBtn.textContent = '↩ Undo';
        undoBtn.addEventListener('click', () => opts.onUndo?.());

        const adjustBtn = document.createElement('button');
        adjustBtn.className   = 'ca-adjust';
        adjustBtn.textContent = 'Adjust…';
        adjustBtn.addEventListener('click', () => opts.onAdjust?.());

        caRow.append(acceptBtn, undoBtn, adjustBtn);
        wrapper.appendChild(caRow);
    }

    appendChat(msgsEl, wrapper);
    return body;
}

export function appendSpinner(msgsEl: HTMLElement): HTMLElement {
    const div = document.createElement('div');
    div.className = 'msg thinking';
    div.innerHTML =
        '<div class="think-dots">' +
            '<span class="think-dot"></span>' +
            '<span class="think-dot"></span>' +
            '<span class="think-dot"></span>' +
        '</div>' +
        '<span class="think-label">Thinking…</span>';
    appendChat(msgsEl, div);
    return div;
}

/** Creates a `.msg.accepted` entry (dimmed, summarises a past accepted turn). */
export function appendAcceptedBubble(msgsEl: HTMLElement, text: string): void {
    const div = document.createElement('div');
    div.className = 'msg accepted';

    const check = document.createElement('span');
    check.className   = 'acc-check';
    check.textContent = '✓';

    div.append(check, document.createTextNode(text));
    appendChat(msgsEl, div);
}

/** Appends a `.stl-note` warning to an existing `.ai-body` element. */
export function appendStlNote(bodyEl: HTMLElement, message: string): void {
    const note = document.createElement('div');
    note.className = 'stl-note';
    note.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 14 14" fill="none">' +
            '<path d="M7 1.5l5.5 10.5H1.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
            '<line x1="7" y1="6" x2="7" y2="9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
            '<circle cx="7" cy="10.5" r=".6" fill="currentColor"/>' +
        '</svg>';
    note.appendChild(document.createTextNode(message));
    bodyEl.appendChild(note);
}

export function appendToolCard(
    msgsEl: HTMLElement,
    name: string,
): { setResult(ok: boolean): void } {
    const card     = document.createElement('div');
    card.className = 'chat-tool-card';
    const nameEl   = document.createElement('span');
    nameEl.className   = 'chat-tool-card-name';
    nameEl.textContent = name;
    const statusEl = document.createElement('span');
    statusEl.className = 'chat-tool-card-status';
    card.append(nameEl, statusEl);
    appendChat(msgsEl, card);
    return {
        setResult(ok: boolean) {
            statusEl.classList.add(ok ? 'ok' : 'err');
        },
    };
}
