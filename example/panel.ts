// Panel open/close, backdrop, and resize logic.

import { $ } from './dom-utils.js';

function isDesktop(): boolean { return window.innerWidth > 768; }

export function initPanel(): void {

const advPanel  = $('adv-panel');
const backdrop  = $('sidebar-backdrop');
const advToggle = $<HTMLButtonElement>('adv-toggle');
const advClose  = $('adv-close');

let _mobilePanel: HTMLElement | null = null;

function openAdvPanel(): void {
    advPanel.classList.add('open');
    advToggle.classList.add('on');
    document.body.classList.add('adv-open');
    if (isDesktop()) { advPanel.classList.add('pinned'); }
    else { backdrop.classList.add('visible'); _mobilePanel = advPanel; }
}
function closeAdvPanel(): void {
    advPanel.classList.remove('open', 'pinned');
    advToggle.classList.remove('on');
    document.body.classList.remove('adv-open');
    backdrop.classList.remove('visible');
    _mobilePanel = null;
}

advToggle.addEventListener('click', () =>
    advPanel.classList.contains('open') ? closeAdvPanel() : openAdvPanel());
advClose.addEventListener('click', () => closeAdvPanel());
backdrop.addEventListener('click', () => { if (_mobilePanel) closeAdvPanel(); });

// ── Resize handle factory ─────────────────────────────────────────────────

interface ResizeHandleOptions {
    handle:       HTMLElement;
    panel:        HTMLElement;
    cssVar:       string;       // e.g. '--adv-w'
    storageKey:   string;
    defaultW:     number;
    minW:         number;
    maxW:         () => number;
    dirSign:      1 | -1;       // +1: drag right = wider; -1: drag left = wider
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

// ── Adv panel (slides from right) ────────────────────────────────────────

if (isDesktop()) openAdvPanel();

const resizeTooltip = $('resize-tooltip');

makeResizeHandle({
    handle:     advPanel.querySelector<HTMLElement>('.adv-panel-resize-handle')!,
    panel:      advPanel,
    cssVar:     '--adv-w',
    storageKey: 'urdf-adv-w',
    defaultW:   320,
    minW:       260,
    maxW:       () => Math.min(700, window.innerWidth * 0.6),
    dirSign:    -1,
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
