// Panel open/close, backdrop, and resize logic.

function isDesktop(): boolean { return window.innerWidth > 768; }

export function initPanel(): void {

const ctrlPanel  = document.getElementById('control-panel')!;
const chatPanel  = document.getElementById('chat-panel')!;
const backdrop   = document.getElementById('sidebar-backdrop')!;
const ctrlToggle = document.getElementById('control-panel-toggle')!;
const chatToggle = document.getElementById('chat-panel-toggle')!;
const ctrlClose  = document.getElementById('control-panel-close')!;
const chatClose  = document.getElementById('chat-panel-close')!;
const mainEl     = document.querySelector('main')!;

let _mobilePanel: HTMLElement | null = null;

function openSidePanel(panel: HTMLElement): void {
    panel.classList.add('open');
    if (isDesktop()) { panel.classList.add('pinned'); }
    else { backdrop.classList.add('visible'); _mobilePanel = panel; }
}
function closeSidePanel(panel: HTMLElement): void {
    panel.classList.remove('open', 'pinned');
    backdrop.classList.remove('visible');
    _mobilePanel = null;
}

ctrlToggle.addEventListener('click', () =>
    ctrlPanel.classList.contains('open') ? closeSidePanel(ctrlPanel) : openSidePanel(ctrlPanel));
chatToggle.addEventListener('click', () =>
    chatPanel.classList.contains('open') ? closeSidePanel(chatPanel) : openSidePanel(chatPanel));
ctrlClose.addEventListener('click', () => closeSidePanel(ctrlPanel));
chatClose.addEventListener('click', () => closeSidePanel(chatPanel));
backdrop.addEventListener('click', () => { if (_mobilePanel) closeSidePanel(_mobilePanel); });

// ── Resize handle factory (Pattern 6 — extracted from two identical blocks) ──

interface ResizeHandleOptions {
    handle:       HTMLElement;
    panel:        HTMLElement;
    cssVar:       string;       // e.g. '--panel-w'
    storageKey:   string;
    defaultW:     number;
    minW:         number;
    maxW:         () => number;
    dirSign:      1 | -1;       // +1: drag right = wider; -1: drag left = wider
    ariaMax:      number;
    tooltip:      HTMLElement;  // element to show width while dragging
}

function makeResizeHandle(opts: ResizeHandleOptions): void {
    const SNAP_RADIUS = 10;

    function applyWidth(w: number): number {
        const clamped = Math.max(opts.minW, Math.min(opts.maxW(), w));
        document.documentElement.style.setProperty(opts.cssVar, clamped + 'px');
        opts.handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
        return clamped;
    }

    function saveWidth(): void {
        try { localStorage.setItem(opts.storageKey, String(opts.panel.offsetWidth)); } catch { /* quota */ }
    }

    // Restore saved width on desktop
    if (isDesktop()) {
        const saved = parseInt(localStorage.getItem(opts.storageKey) ?? '', 10);
        if (saved >= opts.minW) applyWidth(saved);
    }

    opts.handle.addEventListener('pointerdown', (e: PointerEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startW = opts.panel.offsetWidth;
        opts.handle.setPointerCapture(e.pointerId);
        opts.handle.classList.add('dragging');
        mainEl.style.transition = 'none';

        function onMove(ev: PointerEvent): void {
            let w = startW + opts.dirSign * (ev.clientX - startX);
            if (Math.abs(w - opts.defaultW) <= SNAP_RADIUS) w = opts.defaultW;
            const applied = applyWidth(w);
            opts.tooltip.textContent = Math.round(applied) + 'px';
            opts.tooltip.style.left    = (ev.clientX + 12) + 'px';
            opts.tooltip.style.top     = (ev.clientY - 20) + 'px';
            opts.tooltip.style.display = 'block';
        }
        function onUp(): void {
            opts.handle.classList.remove('dragging');
            mainEl.style.transition = '';
            opts.tooltip.style.display = 'none';
            opts.handle.removeEventListener('pointermove', onMove);
            opts.handle.removeEventListener('pointerup', onUp);
            saveWidth();
        }
        opts.handle.addEventListener('pointermove', onMove);
        opts.handle.addEventListener('pointerup', onUp);
    });

    opts.handle.addEventListener('dblclick', () => { applyWidth(opts.defaultW); saveWidth(); });

    opts.handle.addEventListener('keydown', (e: KeyboardEvent) => {
        const cur = opts.panel.offsetWidth;
        let next: number | undefined;
        if (opts.dirSign === 1) {
            // Left panel: ArrowRight = wider
            if (e.key === 'ArrowRight') next = cur + 16;
            else if (e.key === 'ArrowLeft') next = cur - 16;
        } else {
            // Right panel: ArrowLeft = wider
            if (e.key === 'ArrowLeft')  next = cur + 16;
            else if (e.key === 'ArrowRight') next = cur - 16;
        }
        if (e.key === 'Home') next = opts.minW;
        if (e.key === 'End')  next = opts.maxW();
        if (next === undefined) return;
        e.preventDefault(); applyWidth(next); saveWidth();
    });

    // Re-clamp on viewport resize (do not overwrite stored value)
    let _wResizeTimer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(_wResizeTimer);
        _wResizeTimer = window.setTimeout(() => {
            const cur = parseInt(getComputedStyle(document.documentElement).getPropertyValue(opts.cssVar), 10);
            if (cur > opts.maxW()) applyWidth(cur);
        }, 50);
    });
}

// ── Left panel (control panel) ────────────────────────────────────────────

if (isDesktop()) openSidePanel(ctrlPanel);

const resizeTooltip = document.getElementById('resize-tooltip')!;

makeResizeHandle({
    handle:     ctrlPanel.querySelector<HTMLElement>('.panel-resize-handle')!,
    panel:      ctrlPanel,
    cssVar:     '--panel-w',
    storageKey: 'urdf-panel-w',
    defaultW:   320,
    minW:       260,
    maxW:       () => Math.min(700, window.innerWidth * 0.6),
    dirSign:    1,
    ariaMax:    700,
    tooltip:    resizeTooltip,
});

// ── Right panel (chat panel) ──────────────────────────────────────────────

makeResizeHandle({
    handle:     chatPanel.querySelector<HTMLElement>('.panel-resize-handle')!,
    panel:      chatPanel,
    cssVar:     '--chat-w',
    storageKey: 'urdf-chat-w',
    defaultW:   320,
    minW:       260,
    maxW:       () => Math.min(600, window.innerWidth * 0.6),
    dirSign:    -1,
    ariaMax:    600,
    tooltip:    resizeTooltip,
});

// ── Editor tab bar: convert vertical wheel to horizontal scroll ───────────
document.getElementById('editor-tabs')?.addEventListener('wheel', (e: WheelEvent) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollLeft += e.deltaY;
    }
}, { passive: false });

} // end initPanel
