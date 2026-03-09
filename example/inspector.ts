import type { FloatPanelDefs, FPRow } from './build-sliders.js';
import { $ } from './dom-utils.js';

// ── Floating panel state ───────────────────────────────────────────────────

export class InspectorController {
    private _floatPanelSync: (() => void) | null = null;
    private _floatPanelInitVals: number[] | null = null;
    private _floatPanelInitSection: string | null = null;

    private readonly _getFloatPanelDefs: () => FloatPanelDefs;
    private readonly _onPanelClose: (title: string, changes: Array<{ label: string; unit: string; from: number; to: number }>) => void;
    private readonly _onGestureParamClear: () => void;

    constructor(opts: {
        getFloatPanelDefs: () => FloatPanelDefs;
        onPanelClose: (title: string, changes: Array<{ label: string; unit: string; from: number; to: number }>) => void;
        onGestureParamClear: () => void;
    }) {
        this._getFloatPanelDefs   = opts.getFloatPanelDefs;
        this._onPanelClose        = opts.onPanelClose;
        this._onGestureParamClear = opts.onGestureParamClear;
    }

    getFloatPanelSync(): (() => void) | null {
        return this._floatPanelSync;
    }

    getFloatPanelInitSection(): string | null {
        return this._floatPanelInitSection;
    }

    getFloatPanelInitVals(): number[] | null {
        return this._floatPanelInitVals;
    }

    closeCurrentPanel(): void {
        const host = $('float-panels');
        if (!host.hasChildNodes()) return;
        if (this._floatPanelInitVals && this._floatPanelInitSection) {
            const def = this._getFloatPanelDefs()[this._floatPanelInitSection];
            if (def) {
                const changes = def.rows
                    .map((row: FPRow, i: number) => ({ label: row.label, unit: row.unit, from: this._floatPanelInitVals![i], to: row.get() }))
                    .filter((c: { from: number; to: number }) => Math.abs(c.from - c.to) >= 0.01);
                if (changes.length > 0) this._onPanelClose(def.title, changes);
            }
        }
        host.innerHTML = '';
        this._floatPanelSync = null;
        this._floatPanelInitVals = null;
        this._floatPanelInitSection = null;
        this._onGestureParamClear();
    }

    setFloatPanelSync(fn: (() => void) | null): void {
        this._floatPanelSync = fn;
    }

    setFloatPanelInitState(section: string, initVals: number[]): void {
        this._floatPanelInitSection = section;
        this._floatPanelInitVals    = initVals;
    }
}
