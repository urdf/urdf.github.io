import type { FloatPanelDefs, FPRow } from './build-sliders.js';

// ── Floating panel state ───────────────────────────────────────────────────
// All three variables are intentionally unexported; callers use the accessor
// functions below to read them and closeCurrentPanel() to close the panel.

let _floatPanelSync: (() => void) | null = null;
let _floatPanelInitVals: number[] | null = null;
let _floatPanelInitSection: string | null = null;

// Injected at init time — avoids circular imports.
let _getFloatPanelDefs: (() => FloatPanelDefs) | null = null;
let _onPanelClose: ((title: string, changes: Array<{ label: string; unit: string; from: number; to: number }>) => void) | null = null;
let _onGestureParamClear: (() => void) | null = null;

export interface InspectorOptions {
    getFloatPanelDefs: () => FloatPanelDefs;
    onPanelClose: (title: string, changes: Array<{ label: string; unit: string; from: number; to: number }>) => void;
    onGestureParamClear: () => void;
}

export function initInspector(opts: InspectorOptions): void {
    _getFloatPanelDefs    = opts.getFloatPanelDefs;
    _onPanelClose         = opts.onPanelClose;
    _onGestureParamClear  = opts.onGestureParamClear;
}

export function getFloatPanelSync(): (() => void) | null {
    return _floatPanelSync;
}

export function getFloatPanelInitSection(): string | null {
    return _floatPanelInitSection;
}

export function getFloatPanelInitVals(): number[] | null {
    return _floatPanelInitVals;
}

export function closeCurrentPanel(): void {
    const host = document.getElementById('float-panels')!;
    if (!host.hasChildNodes()) return;
    if (_floatPanelInitVals && _floatPanelInitSection && _getFloatPanelDefs) {
        const def = _getFloatPanelDefs()[_floatPanelInitSection];
        if (def) {
            const changes = def.rows
                .map((row: FPRow, i: number) => ({ label: row.label, unit: row.unit, from: _floatPanelInitVals![i], to: row.get() }))
                .filter((c: { from: number; to: number }) => Math.abs(c.from - c.to) >= 0.01);
            if (changes.length > 0) _onPanelClose?.(def.title, changes);
        }
    }
    host.innerHTML = '';
    _floatPanelSync = null;
    _floatPanelInitVals = null;
    _floatPanelInitSection = null;
    _onGestureParamClear?.();
}

export function setFloatPanelSync(fn: (() => void) | null): void {
    _floatPanelSync = fn;
}

export function setFloatPanelInitState(section: string, initVals: number[]): void {
    _floatPanelInitSection = section;
    _floatPanelInitVals    = initVals;
}
