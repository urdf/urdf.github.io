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
    div.className   = 'chat-msg-user';
    div.textContent = text;
    appendChat(msgsEl, div);
}

export function appendAssistantBubble(msgsEl: HTMLElement, html: string): HTMLElement {
    const div = document.createElement('div');
    div.className = 'chat-msg-assistant';
    div.innerHTML  = renderMd(html);
    appendChat(msgsEl, div);
    return div;
}

export function appendSpinner(msgsEl: HTMLElement): HTMLElement {
    const div = document.createElement('div');
    div.className = 'chat-spinner';
    div.innerHTML = '<span></span><span></span><span></span>';
    appendChat(msgsEl, div);
    return div;
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
            statusEl.textContent = ok ? '✓' : '✕';
            statusEl.classList.add(ok ? 'ok' : 'err');
        },
    };
}
