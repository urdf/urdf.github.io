import { URDFBuildController, CHASSIS_DEFAULTS, WHEEL_DEFAULTS } from './build.js';
import { $ } from './dom-utils.js';

// ── Single source of truth for all parametric parameter ranges ─────────────
// Each entry: [min, max, step] in display units (mm).
// HTML <input> attributes and FLOAT_PANEL_DEFS are both derived from this.

export interface ParamRange { min: number; max: number; step: number; }

export const PARAM_RANGES: Record<string, ParamRange> = {
    'chassis-thickness': { min: 1,   max: 10,  step: 0.5 },
    'chassis-body-hw':   { min: 40,  max: 90,  step: 1   },
    'chassis-rear-hw':   { min: 85,  max: 130, step: 1   },
    'wheel-radius':      { min: 20,  max: 50,  step: 0.5 },
    'wheel-width':       { min: 8,   max: 30,  step: 1   },
    'caster-radius':     { min: 8,   max: 25,  step: 0.5 },
    'caster-width':      { min: 5,   max: 25,  step: 0.5 },
    'battery-l':         { min: 40,  max: 120, step: 1   },
    'battery-w':         { min: 25,  max: 80,  step: 1   },
    'battery-h':         { min: 15,  max: 50,  step: 1   },
    'powerbank-r':       { min: 8,   max: 25,  step: 0.5 },
    'powerbank-l':       { min: 50,  max: 200, step: 1   },
};

function syncPair(slider: HTMLInputElement, num: HTMLInputElement, onChange: () => void): void {
    slider.addEventListener('input', () => { num.value = slider.value; onChange(); });
    num.addEventListener('change', () => {
        const v = Math.max(parseFloat(num.min), Math.min(parseFloat(num.max), parseFloat(num.value)));
        slider.value = String(v);
        num.value    = String(v);
        onChange();
    });
}

interface SliderPair {
    slider:    HTMLInputElement;
    numId:     string;
    defaultMm: number;
    get:       () => number;
    onChange:  () => void;
}

export interface FPRow {
    label: string; unit: string;
    min: number; max: number; step: number;
    get: () => number;
    set: (mm: number) => void;
}

export type FloatPanelDefs = Record<string, { title: string; rows: FPRow[] }>;

export class BuildSlidersController {
    private readonly _buildCtrl: URDFBuildController;
    private _buildSliderPairs: SliderPair[];

    constructor(buildCtrl: URDFBuildController) {
        this._buildCtrl = buildCtrl;

        this._buildSliderPairs = [
            { slider: $<HTMLInputElement>('build-chassis-thickness'), numId: 'build-chassis-thickness-num', defaultMm: CHASSIS_DEFAULTS.thickness     * 1000, get: () => buildCtrl.chassisParams.thickness     * 1000, onChange: () => this._onChassisChange() },
            { slider: $<HTMLInputElement>('build-chassis-body-hw'),   numId: 'build-chassis-body-hw-num',   defaultMm: CHASSIS_DEFAULTS.bodyHalfWidth * 1000, get: () => buildCtrl.chassisParams.bodyHalfWidth * 1000, onChange: () => this._onChassisChange() },
            { slider: $<HTMLInputElement>('build-chassis-rear-hw'),   numId: 'build-chassis-rear-hw-num',   defaultMm: CHASSIS_DEFAULTS.rearHalfWidth * 1000, get: () => buildCtrl.chassisParams.rearHalfWidth * 1000, onChange: () => this._onChassisChange() },
            { slider: $<HTMLInputElement>('build-wheel-radius'),      numId: 'build-wheel-radius-num',      defaultMm: WHEEL_DEFAULTS.radius          * 1000, get: () => buildCtrl.wheelParams.radius          * 1000, onChange: () => this._onWheelChange() },
            { slider: $<HTMLInputElement>('build-wheel-width'),       numId: 'build-wheel-width-num',       defaultMm: WHEEL_DEFAULTS.width           * 1000, get: () => buildCtrl.wheelParams.width           * 1000, onChange: () => this._onWheelChange() },
            { slider: $<HTMLInputElement>('build-caster-radius'),     numId: 'build-caster-radius-num',     defaultMm: 0, get: () => buildCtrl.casterRadius    * 1000, onChange: () => this._onCasterChange() },
            { slider: $<HTMLInputElement>('build-caster-width'),      numId: 'build-caster-width-num',      defaultMm: 0, get: () => buildCtrl.casterWidth     * 1000, onChange: () => this._onCasterChange() },
            { slider: $<HTMLInputElement>('build-battery-l'),         numId: 'build-battery-l-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.l    * 1000, onChange: () => this._onBatteryChange() },
            { slider: $<HTMLInputElement>('build-battery-w'),         numId: 'build-battery-w-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.w    * 1000, onChange: () => this._onBatteryChange() },
            { slider: $<HTMLInputElement>('build-battery-h'),         numId: 'build-battery-h-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.h    * 1000, onChange: () => this._onBatteryChange() },
            { slider: $<HTMLInputElement>('build-powerbank-r'),       numId: 'build-powerbank-r-num',       defaultMm: 0, get: () => buildCtrl.powerbank.radius * 1000, onChange: () => this._onPowerbankChange() },
            { slider: $<HTMLInputElement>('build-powerbank-l'),       numId: 'build-powerbank-l-num',       defaultMm: 0, get: () => buildCtrl.powerbank.length * 1000, onChange: () => this._onPowerbankChange() },
        ];

        // Apply PARAM_RANGES to HTML inputs at runtime (single source of truth).
        for (const [key, range] of Object.entries(PARAM_RANGES)) {
            const slider = $<HTMLInputElement>(`build-${key}`);
            const num    = $<HTMLInputElement>(`build-${key}-num`);
            if (slider) { slider.min = String(range.min); slider.max = String(range.max); slider.step = String(range.step); }
            if (num)    { num.min    = String(range.min); num.max    = String(range.max); num.step    = String(range.step); }
        }

        for (const { slider, numId, defaultMm, onChange } of this._buildSliderPairs) {
            if (defaultMm > 0) slider.value = String(defaultMm);
            const num = $<HTMLInputElement>(numId);
            num.value = slider.value;
            syncPair(slider, num, onChange);
        }
    }

    private _onChassisChange(): void {
        if (!this._buildCtrl.isSupported) return;
        this._buildCtrl.updateChassis({
            thickness:     parseFloat($<HTMLInputElement>('build-chassis-thickness').value) / 1000,
            bodyHalfWidth: parseFloat($<HTMLInputElement>('build-chassis-body-hw').value)    / 1000,
            rearHalfWidth: parseFloat($<HTMLInputElement>('build-chassis-rear-hw').value)    / 1000,
        });
    }

    private _onWheelChange(): void {
        if (!this._buildCtrl.isSupported) return;
        this._buildCtrl.updateWheel({
            radius: parseFloat($<HTMLInputElement>('build-wheel-radius').value) / 1000,
            width:  parseFloat($<HTMLInputElement>('build-wheel-width').value)  / 1000,
        });
    }

    private _onCasterChange(): void {
        if (!this._buildCtrl.isSupported) return;
        this._buildCtrl.updateCaster(
            parseFloat($<HTMLInputElement>('build-caster-radius').value) / 1000,
            parseFloat($<HTMLInputElement>('build-caster-width').value)  / 1000,
        );
    }

    private _onBatteryChange(): void {
        if (!this._buildCtrl.isSupported) return;
        this._buildCtrl.updateBatteryBox(
            parseFloat($<HTMLInputElement>('build-battery-l').value) / 1000,
            parseFloat($<HTMLInputElement>('build-battery-w').value) / 1000,
            parseFloat($<HTMLInputElement>('build-battery-h').value) / 1000,
        );
    }

    private _onPowerbankChange(): void {
        if (!this._buildCtrl.isSupported) return;
        this._buildCtrl.updatePowerbank(
            parseFloat($<HTMLInputElement>('build-powerbank-r').value) / 1000,
            parseFloat($<HTMLInputElement>('build-powerbank-l').value) / 1000,
        );
    }

    syncSlidersFromCtrl(): void {
        for (const { slider, numId, get } of this._buildSliderPairs) {
            const v = String(get());
            slider.value = v;
            $<HTMLInputElement>(numId).value = v;
        }
    }

    makeFloatPanelDefs(): FloatPanelDefs {
        const r = PARAM_RANGES;
        const ctrl = this._buildCtrl;
        return {
            chassis: {
                title: 'Chassis',
                rows: [
                    { label: 'Thickness',  unit: 'mm',     ...r['chassis-thickness'],
                      get: () => ctrl.chassisParams.thickness     * 1000,
                      set: (v) => ctrl.updateChassis({ ...ctrl.chassisParams, thickness:     v / 1000 }) },
                    { label: 'Body width', unit: 'mm × 2', ...r['chassis-body-hw'],
                      get: () => ctrl.chassisParams.bodyHalfWidth * 1000,
                      set: (v) => ctrl.updateChassis({ ...ctrl.chassisParams, bodyHalfWidth: v / 1000 }) },
                    { label: 'Rear width', unit: 'mm × 2', ...r['chassis-rear-hw'],
                      get: () => ctrl.chassisParams.rearHalfWidth * 1000,
                      set: (v) => ctrl.updateChassis({ ...ctrl.chassisParams, rearHalfWidth: v / 1000 }) },
                ],
            },
            wheels: {
                title: 'Wheels',
                rows: [
                    { label: 'Radius', unit: 'mm', ...r['wheel-radius'],
                      get: () => ctrl.wheelParams.radius * 1000,
                      set: (v) => ctrl.updateWheel({ ...ctrl.wheelParams, radius: v / 1000 }) },
                    { label: 'Width',  unit: 'mm', ...r['wheel-width'],
                      get: () => ctrl.wheelParams.width  * 1000,
                      set: (v) => ctrl.updateWheel({ ...ctrl.wheelParams, width:  v / 1000 }) },
                ],
            },
            caster: {
                title: 'Caster',
                rows: [
                    { label: 'Radius', unit: 'mm', ...r['caster-radius'],
                      get: () => ctrl.casterRadius * 1000,
                      set: (v) => ctrl.updateCaster(v / 1000, ctrl.casterWidth) },
                    { label: 'Width',  unit: 'mm', ...r['caster-width'],
                      get: () => ctrl.casterWidth  * 1000,
                      set: (v) => ctrl.updateCaster(ctrl.casterRadius, v / 1000) },
                ],
            },
            battery: {
                title: 'Battery Box',
                rows: [
                    { label: 'Length', unit: 'mm', ...r['battery-l'],
                      get: () => ctrl.batteryBox.l * 1000,
                      set: (v) => ctrl.updateBatteryBox(v / 1000, ctrl.batteryBox.w, ctrl.batteryBox.h) },
                    { label: 'Width',  unit: 'mm', ...r['battery-w'],
                      get: () => ctrl.batteryBox.w * 1000,
                      set: (v) => ctrl.updateBatteryBox(ctrl.batteryBox.l, v / 1000, ctrl.batteryBox.h) },
                    { label: 'Height', unit: 'mm', ...r['battery-h'],
                      get: () => ctrl.batteryBox.h * 1000,
                      set: (v) => ctrl.updateBatteryBox(ctrl.batteryBox.l, ctrl.batteryBox.w, v / 1000) },
                ],
            },
            powerbank: {
                title: 'Power Bank',
                rows: [
                    { label: 'Radius', unit: 'mm', ...r['powerbank-r'],
                      get: () => ctrl.powerbank.radius * 1000,
                      set: (v) => ctrl.updatePowerbank(v / 1000, ctrl.powerbank.length) },
                    { label: 'Length', unit: 'mm', ...r['powerbank-l'],
                      get: () => ctrl.powerbank.length * 1000,
                      set: (v) => ctrl.updatePowerbank(ctrl.powerbank.radius, v / 1000) },
                ],
            },
        };
    }
}
