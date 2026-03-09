import { URDFBuildController, CHASSIS_DEFAULTS, WHEEL_DEFAULTS } from './build.js';

function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

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

let _buildCtrl: URDFBuildController;
let _buildSliderPairs: SliderPair[];

function onChassisChange(): void {
    if (!_buildCtrl.isSupported) return;
    _buildCtrl.updateChassis({
        thickness:     parseFloat($<HTMLInputElement>('build-chassis-thickness').value) / 1000,
        bodyHalfWidth: parseFloat($<HTMLInputElement>('build-chassis-body-hw').value)    / 1000,
        rearHalfWidth: parseFloat($<HTMLInputElement>('build-chassis-rear-hw').value)    / 1000,
    });
}

function onWheelChange(): void {
    if (!_buildCtrl.isSupported) return;
    _buildCtrl.updateWheel({
        radius: parseFloat($<HTMLInputElement>('build-wheel-radius').value) / 1000,
        width:  parseFloat($<HTMLInputElement>('build-wheel-width').value)  / 1000,
    });
}

function onCasterChange(): void {
    if (!_buildCtrl.isSupported) return;
    _buildCtrl.updateCaster(
        parseFloat($<HTMLInputElement>('build-caster-radius').value) / 1000,
        parseFloat($<HTMLInputElement>('build-caster-width').value)  / 1000,
    );
}

function onBatteryChange(): void {
    if (!_buildCtrl.isSupported) return;
    _buildCtrl.updateBatteryBox(
        parseFloat($<HTMLInputElement>('build-battery-l').value) / 1000,
        parseFloat($<HTMLInputElement>('build-battery-w').value) / 1000,
        parseFloat($<HTMLInputElement>('build-battery-h').value) / 1000,
    );
}

function onPowerbankChange(): void {
    if (!_buildCtrl.isSupported) return;
    _buildCtrl.updatePowerbank(
        parseFloat($<HTMLInputElement>('build-powerbank-r').value) / 1000,
        parseFloat($<HTMLInputElement>('build-powerbank-l').value) / 1000,
    );
}

export function initBuildSliders(buildCtrl: URDFBuildController): void {
    _buildCtrl = buildCtrl;

    _buildSliderPairs = [
        { slider: $<HTMLInputElement>('build-chassis-thickness'), numId: 'build-chassis-thickness-num', defaultMm: CHASSIS_DEFAULTS.thickness     * 1000, get: () => buildCtrl.chassisParams.thickness     * 1000, onChange: onChassisChange },
        { slider: $<HTMLInputElement>('build-chassis-body-hw'),   numId: 'build-chassis-body-hw-num',   defaultMm: CHASSIS_DEFAULTS.bodyHalfWidth * 1000, get: () => buildCtrl.chassisParams.bodyHalfWidth * 1000, onChange: onChassisChange },
        { slider: $<HTMLInputElement>('build-chassis-rear-hw'),   numId: 'build-chassis-rear-hw-num',   defaultMm: CHASSIS_DEFAULTS.rearHalfWidth * 1000, get: () => buildCtrl.chassisParams.rearHalfWidth * 1000, onChange: onChassisChange },
        { slider: $<HTMLInputElement>('build-wheel-radius'),      numId: 'build-wheel-radius-num',      defaultMm: WHEEL_DEFAULTS.radius          * 1000, get: () => buildCtrl.wheelParams.radius          * 1000, onChange: onWheelChange },
        { slider: $<HTMLInputElement>('build-wheel-width'),       numId: 'build-wheel-width-num',       defaultMm: WHEEL_DEFAULTS.width           * 1000, get: () => buildCtrl.wheelParams.width           * 1000, onChange: onWheelChange },
        { slider: $<HTMLInputElement>('build-caster-radius'),     numId: 'build-caster-radius-num',     defaultMm: 0, get: () => buildCtrl.casterRadius    * 1000, onChange: onCasterChange },
        { slider: $<HTMLInputElement>('build-caster-width'),      numId: 'build-caster-width-num',      defaultMm: 0, get: () => buildCtrl.casterWidth     * 1000, onChange: onCasterChange },
        { slider: $<HTMLInputElement>('build-battery-l'),         numId: 'build-battery-l-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.l    * 1000, onChange: onBatteryChange },
        { slider: $<HTMLInputElement>('build-battery-w'),         numId: 'build-battery-w-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.w    * 1000, onChange: onBatteryChange },
        { slider: $<HTMLInputElement>('build-battery-h'),         numId: 'build-battery-h-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.h    * 1000, onChange: onBatteryChange },
        { slider: $<HTMLInputElement>('build-powerbank-r'),       numId: 'build-powerbank-r-num',       defaultMm: 0, get: () => buildCtrl.powerbank.radius * 1000, onChange: onPowerbankChange },
        { slider: $<HTMLInputElement>('build-powerbank-l'),       numId: 'build-powerbank-l-num',       defaultMm: 0, get: () => buildCtrl.powerbank.length * 1000, onChange: onPowerbankChange },
    ];

    // Apply PARAM_RANGES to HTML inputs at runtime (single source of truth).
    for (const [key, range] of Object.entries(PARAM_RANGES)) {
        const slider = document.getElementById(`build-${key}`) as HTMLInputElement | null;
        const num    = document.getElementById(`build-${key}-num`) as HTMLInputElement | null;
        if (slider) { slider.min = String(range.min); slider.max = String(range.max); slider.step = String(range.step); }
        if (num)    { num.min    = String(range.min); num.max    = String(range.max); num.step    = String(range.step); }
    }

    for (const { slider, numId, defaultMm, onChange } of _buildSliderPairs) {
        if (defaultMm > 0) slider.value = String(defaultMm);
        const num = $<HTMLInputElement>(numId);
        num.value = slider.value;
        syncPair(slider, num, onChange);
    }
}

export function syncSlidersFromCtrl(): void {
    for (const { slider, numId, get } of _buildSliderPairs) {
        const v = String(get());
        slider.value = v;
        $<HTMLInputElement>(numId).value = v;
    }
}

// ── Floating control panel definitions ────────────────────────────────────────
// Derived from PARAM_RANGES — min/max/step come from the same source.

export interface FPRow {
    label: string; unit: string;
    min: number; max: number; step: number;
    get: () => number;
    set: (mm: number) => void;
}

export type FloatPanelDefs = Record<string, { title: string; rows: FPRow[] }>;

export function makeFloatPanelDefs(buildCtrl: URDFBuildController): FloatPanelDefs {
    const r = PARAM_RANGES;
    return {
        chassis: {
            title: 'Chassis',
            rows: [
                { label: 'Thickness',  unit: 'mm',     ...r['chassis-thickness'],
                  get: () => buildCtrl.chassisParams.thickness     * 1000,
                  set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, thickness:     v / 1000 }) },
                { label: 'Body width', unit: 'mm × 2', ...r['chassis-body-hw'],
                  get: () => buildCtrl.chassisParams.bodyHalfWidth * 1000,
                  set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, bodyHalfWidth: v / 1000 }) },
                { label: 'Rear width', unit: 'mm × 2', ...r['chassis-rear-hw'],
                  get: () => buildCtrl.chassisParams.rearHalfWidth * 1000,
                  set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, rearHalfWidth: v / 1000 }) },
            ],
        },
        wheels: {
            title: 'Wheels',
            rows: [
                { label: 'Radius', unit: 'mm', ...r['wheel-radius'],
                  get: () => buildCtrl.wheelParams.radius * 1000,
                  set: (v) => buildCtrl.updateWheel({ ...buildCtrl.wheelParams, radius: v / 1000 }) },
                { label: 'Width',  unit: 'mm', ...r['wheel-width'],
                  get: () => buildCtrl.wheelParams.width  * 1000,
                  set: (v) => buildCtrl.updateWheel({ ...buildCtrl.wheelParams, width:  v / 1000 }) },
            ],
        },
        caster: {
            title: 'Caster',
            rows: [
                { label: 'Radius', unit: 'mm', ...r['caster-radius'],
                  get: () => buildCtrl.casterRadius * 1000,
                  set: (v) => buildCtrl.updateCaster(v / 1000, buildCtrl.casterWidth) },
                { label: 'Width',  unit: 'mm', ...r['caster-width'],
                  get: () => buildCtrl.casterWidth  * 1000,
                  set: (v) => buildCtrl.updateCaster(buildCtrl.casterRadius, v / 1000) },
            ],
        },
        battery: {
            title: 'Battery Box',
            rows: [
                { label: 'Length', unit: 'mm', ...r['battery-l'],
                  get: () => buildCtrl.batteryBox.l * 1000,
                  set: (v) => buildCtrl.updateBatteryBox(v / 1000, buildCtrl.batteryBox.w, buildCtrl.batteryBox.h) },
                { label: 'Width',  unit: 'mm', ...r['battery-w'],
                  get: () => buildCtrl.batteryBox.w * 1000,
                  set: (v) => buildCtrl.updateBatteryBox(buildCtrl.batteryBox.l, v / 1000, buildCtrl.batteryBox.h) },
                { label: 'Height', unit: 'mm', ...r['battery-h'],
                  get: () => buildCtrl.batteryBox.h * 1000,
                  set: (v) => buildCtrl.updateBatteryBox(buildCtrl.batteryBox.l, buildCtrl.batteryBox.w, v / 1000) },
            ],
        },
        powerbank: {
            title: 'Power Bank',
            rows: [
                { label: 'Radius', unit: 'mm', ...r['powerbank-r'],
                  get: () => buildCtrl.powerbank.radius * 1000,
                  set: (v) => buildCtrl.updatePowerbank(v / 1000, buildCtrl.powerbank.length) },
                { label: 'Length', unit: 'mm', ...r['powerbank-l'],
                  get: () => buildCtrl.powerbank.length * 1000,
                  set: (v) => buildCtrl.updatePowerbank(buildCtrl.powerbank.radius, v / 1000) },
            ],
        },
    };
}
