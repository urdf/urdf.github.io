// Floating inspector panel — builds, drags, and manages detachable parameter panels.

import type { InspectorController } from './inspector.js';
import type { FloatPanelDefs } from './build-sliders.js';
import { $ } from './dom-utils.js';

export function makeFloatPanel(title: string, onClose: () => void): { panel: HTMLDivElement; header: HTMLDivElement; body: HTMLDivElement } {
    const panel = document.createElement('div');
    panel.className = 'float-panel';

    const header = document.createElement('div');
    header.className = 'float-panel-header';
    const grip = document.createElement('div');
    grip.className = 'float-panel-grip';
    for (let i = 0; i < 6; i++) grip.appendChild(document.createElement('span'));
    const titleEl = document.createElement('span');
    titleEl.className = 'float-panel-title';
    titleEl.textContent = title;
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'float-panel-close';
    closeBtn.setAttribute('aria-label', 'Close panel');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', onClose);
    header.append(grip, titleEl, closeBtn);

    const body = document.createElement('div');
    body.className = 'float-panel-body';
    panel.append(header, body);

    return { panel, header, body };
}

export function makeDraggable(panel: HTMLElement, handle: HTMLElement): void {
    handle.addEventListener('pointerdown', (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest('.float-panel-close')) return;
        handle.setPointerCapture(e.pointerId);
        const rect = panel.getBoundingClientRect();
        const ox = e.clientX - rect.left;
        const oy = e.clientY - rect.top;
        const onMove = (ev: PointerEvent) => {
            panel.style.left = `${ev.clientX - ox}px`;
            panel.style.top  = `${ev.clientY - oy}px`;
        };
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', () => handle.removeEventListener('pointermove', onMove), { once: true });
    });
}

function nextPanelTop(): number {
    let maxBottom = 60;
    document.querySelectorAll<HTMLElement>('.float-panel').forEach(p => {
        const r = p.getBoundingClientRect();
        if (r.width > 0) maxBottom = Math.max(maxBottom, r.bottom + 8);
    });
    return maxBottom;
}

export function openPanel(
    section: string,
    inspectorCtrl: InspectorController,
    floatPanelDefs: FloatPanelDefs,
    syncSlidersFromController: () => void,
): void {
    inspectorCtrl.closeCurrentPanel();

    const host = $('float-panels');
    const def = floatPanelDefs[section];
    if (!def) return;

    const { panel, header, body } = makeFloatPanel(def.title, () => inspectorCtrl.closeCurrentPanel());
    panel.dataset.panel = section;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', `${def.title} controls`);
    const syncFns: Array<(mm: number) => void> = [];

    for (let ri = 0; ri < def.rows.length; ri++) {
        const row = def.rows[ri];
        const rowEl = document.createElement('div');
        rowEl.className = 'float-panel-row';
        rowEl.setAttribute('data-gesture-track', '');
        rowEl.dataset.fpRowIndex = String(ri);

        const head = document.createElement('div');
        head.className = 'float-panel-row-head';
        const lbl  = document.createElement('span'); lbl.className  = 'float-panel-row-label'; lbl.textContent  = row.label;
        const unit = document.createElement('span'); unit.className = 'float-panel-row-unit';  unit.textContent = row.unit;
        head.append(lbl, unit);

        const controls = document.createElement('div');
        controls.className = 'float-panel-row-inputs';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = String(row.min); slider.max = String(row.max); slider.step = String(row.step);
        slider.value = String(row.get());

        const num = document.createElement('input');
        num.type = 'number';
        num.min = String(row.min); num.max = String(row.max); num.step = String(row.step);
        num.value = String(row.get());

        const onChange = (mm: number): void => {
            row.set(mm);
            syncSlidersFromController();
        };
        slider.addEventListener('input',  () => { num.value    = slider.value; onChange(parseFloat(slider.value)); });
        num.addEventListener('change',    () => { slider.value = num.value;    onChange(parseFloat(num.value));    });

        syncFns.push((mm) => { slider.value = String(mm); num.value = String(mm); });
        controls.append(slider, num);
        rowEl.append(head, controls);
        body.appendChild(rowEl);
    }

    inspectorCtrl.setFloatPanelSync(() => def.rows.forEach((row, i) => syncFns[i](row.get())));
    inspectorCtrl.setFloatPanelInitState(section, def.rows.map(r => r.get()));

    const panelTop = nextPanelTop();
    host.appendChild(panel);
    panel.style.top = `${panelTop}px`;
    makeDraggable(panel, header);
    panel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') inspectorCtrl.closeCurrentPanel();
    });
}

export function openGestureHint(): void {
    const host = $('gesture-hint-host');
    if (!host) return;
    if (host.querySelector('.float-panel')) return;

    const rows: Array<{ icon: string; html: string }> = [
        { icon: '✊', html: '<strong>Fist + move</strong> — orbit camera' },
        { icon: '☝️', html: '<strong>Point + dwell 0.8 s</strong> — select joint' },
        { icon: '🤚', html: '<strong>Tilt wrist</strong> (joint selected) — rotate joint' },
        { icon: '🖐️', html: '<strong>Open palm, hold 1 s</strong> — reset all joints' },
        { icon: '🤲', html: '<strong>Two hands pinch/spread</strong> — zoom' },
        { icon: '👍', html: '<strong>Thumbs up</strong> — confirm / Continue' },
    ];

    const { panel, header, body } = makeFloatPanel('Gestures', () => { host.innerHTML = ''; });
    body.style.gap = '7px';
    for (const row of rows) {
        const rowEl = document.createElement('div');
        rowEl.className = 'gesture-row';
        const iconEl = document.createElement('span');
        iconEl.className = 'gesture-icon';
        iconEl.textContent = row.icon;
        const descEl = document.createElement('span');
        descEl.className = 'gesture-desc';
        descEl.innerHTML = row.html;
        rowEl.append(iconEl, descEl);
        body.appendChild(rowEl);
    }

    const hintTop = nextPanelTop();
    host.appendChild(panel);
    panel.style.top = `${hintTop}px`;
    makeDraggable(panel, header);
}
