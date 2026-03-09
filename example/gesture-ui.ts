// Gesture mode UI wiring — toggle button, hint panel, section accordion.

import { URDFManipulator } from '../src/index.js';
import type { GestureController } from './gesture.js';
import { makeFloatPanel, nextPanelTop, makeDraggable } from './inspector.js';

interface GestureUIDeps {
    viewer:            URDFManipulator;
    gestureToggleBtn:  HTMLButtonElement;
    gestureOverlay:    HTMLCanvasElement;
    gestureVideo:      HTMLVideoElement;
    gestureSectionEl:  HTMLElement;
    gestureHeaderEl:   HTMLElement;
    onDwellSelect:     (clientX: number, clientY: number) => void;
    onPointerMove:     (clientX: number, clientY: number) => void;
    onPointerLeave:    () => void;
    onThumbsUp:        () => void;
    onStop:            () => void;
}

let _getGestureCtrl: () => GestureController | null;
let _setGestureCtrl: (ctrl: GestureController | null) => void;

export function initGestureUI(
    deps: GestureUIDeps,
    getGestureCtrl: () => GestureController | null,
    setGestureCtrl: (ctrl: GestureController | null) => void,
): void {
    _getGestureCtrl = getGestureCtrl;
    _setGestureCtrl = setGestureCtrl;

    deps.gestureToggleBtn.addEventListener('click', async () => {
        const gestureCtrl = _getGestureCtrl();
        if (gestureCtrl) {
            gestureCtrl.stop();
            return;
        }
        const { GestureController } = await import('./gesture.js');
        const ctrl = new GestureController({
            viewer: deps.viewer,
            overlayCanvas: deps.gestureOverlay,
            videoEl: deps.gestureVideo,
            onDwellSelect: deps.onDwellSelect,
            onPointerMove: deps.onPointerMove,
            onPointerLeave: deps.onPointerLeave,
            onThumbsUp: deps.onThumbsUp,
            onStop() {
                _setGestureCtrl(null);
                deps.gestureToggleBtn.classList.remove('active');
                deps.onStop();
            },
        });
        _setGestureCtrl(ctrl);
        ctrl.start()
            .then(() => {
                deps.gestureToggleBtn.classList.add('active');
                deps.gestureSectionEl.classList.add('open');
                deps.gestureHeaderEl.setAttribute('aria-expanded', 'true');
            })
            .catch(() => {
                _setGestureCtrl(null);
            });
    });

    deps.gestureHeaderEl.addEventListener('click', () => {
        const open = deps.gestureSectionEl.classList.toggle('open');
        deps.gestureHeaderEl.setAttribute('aria-expanded', String(open));
    });

    deps.gestureHeaderEl.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); deps.gestureHeaderEl.click(); }
    });
}

export function openGestureHint(): void {
    const host = document.getElementById('gesture-hint-host');
    if (!host) return;
    if (host.querySelector('.float-panel')) return; // already open

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
