import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';

interface SavedState {
    version:   1;
    chassis:   ChassisParams;
    wheel:     WheelParams;
    caster:    { radius: number; width: number };
    battery:   { l: number; w: number; h: number };
    powerbank: { radius: number; length: number };
    components: Array<[string, Component]>;
    counters:   Array<[string, number]>;
}

interface Snapshot {
    chassisParams: ChassisParams;
    wheelParams:   WheelParams;
    casterRadius:  number;
    casterWidth:   number;
    batteryBox:    { l: number; w: number; h: number };
    powerbank:     { radius: number; length: number };
    components:    Array<[string, Component]>;
    counters:      Array<[string, number]>;
}

export { CHASSIS_DEFAULTS, WHEEL_DEFAULTS };

// ── Component catalog ──────────────────────────────────────────────────────

export interface ComponentDef {
    label:       string;
    color:       string;              // URDF rgba string
    defaultZ:    number;              // metres
    geomType:    'box' | 'cylinder';
    defaultDims: number[];            // [w,d,h] for box · [r,l] for cylinder
}

export const COMPONENT_CATALOG: Record<string, ComponentDef> = {
    ultrasonic: {
        label: 'Ultrasonic',  color: '0.20 0.45 0.90 1.00',
        defaultZ: 0.015, geomType: 'box', defaultDims: [0.045, 0.020, 0.015],
    },
    camera: {
        label: 'Camera',      color: '0.90 0.20 0.25 1.00',
        defaultZ: 0.010, geomType: 'box', defaultDims: [0.025, 0.024, 0.009],
    },
    lidar: {
        label: 'LIDAR',       color: '0.20 0.80 0.45 1.00',
        defaultZ: 0.035, geomType: 'cylinder', defaultDims: [0.035, 0.040],
    },
    imu: {
        label: 'IMU',         color: '0.55 0.35 0.80 1.00',
        defaultZ: 0.008, geomType: 'box', defaultDims: [0.020, 0.020, 0.008],
    },
    servo: {
        label: 'Servo',       color: '0.90 0.50 0.15 1.00',
        defaultZ: 0.020, geomType: 'box', defaultDims: [0.022, 0.012, 0.030],
    },
    arduino: {
        label: 'Arduino',     color: '0.00 0.45 0.20 1.00',
        defaultZ: 0.008, geomType: 'box', defaultDims: [0.044, 0.018, 0.008],
    },
    raspberry_pi: {
        label: 'Raspberry Pi', color: '0.70 0.10 0.20 1.00',
        defaultZ: 0.017, geomType: 'box', defaultDims: [0.086, 0.056, 0.017],
    },
    gps: {
        label: 'GPS',         color: '0.20 0.70 0.35 1.00',
        defaultZ: 0.010, geomType: 'box', defaultDims: [0.025, 0.025, 0.010],
    },
    buck_converter: {
        label: 'Buck Conv.',  color: '0.85 0.60 0.00 1.00',
        defaultZ: 0.011, geomType: 'box', defaultDims: [0.023, 0.017, 0.011],
    },
    box: {
        label: 'Box',         color: '0.65 0.65 0.65 1.00',
        defaultZ: 0.020, geomType: 'box', defaultDims: [0.040, 0.040, 0.020],
    },
};

// ── Internals ──────────────────────────────────────────────────────────────

const SUPPORTED_ROBOTS = new Set(['robot-car']);

type JointType = 'fixed' | 'continuous' | 'revolute' | 'prismatic';

export interface Component {
    type:       string;
    x: number; y: number; z: number;
    rx: number; ry: number; rz: number;
    dims:       number[];
    jointType:  JointType;
    axis:       [number, number, number];
    limitLower: number;
    limitUpper: number;
    parent:     string;
}

function assembleXML(robotName: string, partMap: Map<string, string>): string {
    const sorted = [...partMap.entries()].sort(([a], [b]) => a.localeCompare(b));
    const intro  = sorted.filter(([k]) =>  k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n');
    const body   = sorted.filter(([k]) => !k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n\n');
    return `<?xml version="1.0"?>\n${intro}\n<robot name="${robotName}">\n\n${body}\n\n</robot>\n`;
}

// ── Controller ─────────────────────────────────────────────────────────────

export class URDFBuildController {
    private _viewer:    URDFManipulator;
    private _robotName  = '';
    private _dir        = '';
    private _partMap    = new Map<string, string>();
    private _stlBlobs   = new Map<string, string>();
    private _jointZPatches  = new Map<string, number>();
    private _wheelGroundZ   = 0;
    private _blobUrl: string | null = null;

    private _components   = new Map<string, Component>();
    private _compCounters = new Map<string, number>();
    private _isCustom     = false;

    // Inline geometry patches (no STL needed — primitive shapes)
    private _casterRadius = 0.0146;
    private _casterWidth  = 0.0145;
    private _batteryBox   = { l: 0.0806, w: 0.0442, h: 0.022 };

    // Parametric params — tracked so they can be persisted
    private _chassisParams: ChassisParams = { ...CHASSIS_DEFAULTS };
    private _wheelParams:   WheelParams   = { ...WHEEL_DEFAULTS   };
    private _powerbank      = { radius: 0.0115, length: 0.1199 };

    private _undoStack: Snapshot[] = [];
    private _redoStack: Snapshot[] = [];
    private readonly _maxUndo = 50;

    onDOMRebuild:    (() => void) | null = null;
    onHistoryChange: (() => void) | null = null;

    readonly noticeEl: HTMLElement;

    constructor(viewer: URDFManipulator, noticeEl: HTMLElement) {
        this._viewer  = viewer;
        this.noticeEl = noticeEl;
    }

    get isActive(): boolean        { return document.body.classList.contains('build-open'); }
    get isSupported(): boolean     { return SUPPORTED_ROBOTS.has(this._robotName); }
    get isCatalogActive(): boolean { return this.isSupported || this._isCustom; }

    init(robotName: string, dir: string, partMap: Map<string, string>): void {
        this._robotName = robotName;
        this._dir       = dir;
        this._partMap   = new Map(partMap);
        this._isCustom  = false;
        document.body.classList.remove('build-custom');

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        this._casterRadius = 0.0146;
        this._casterWidth  = 0.0145;
        this._batteryBox   = { l: 0.0806, w: 0.0442, h: 0.022 };
        this._powerbank    = { radius: 0.0115, length: 0.1199 };
        this._chassisParams = { ...CHASSIS_DEFAULTS };
        this._wheelParams   = { ...WHEEL_DEFAULTS   };
        this._undoStack.length = 0;
        this._redoStack.length = 0;

        const origWheelZ   = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
        this._wheelGroundZ = origWheelZ - WHEEL_DEFAULTS.radius;

        this.noticeEl.hidden = this.isSupported;
    }

    initFromScratch(name: string): void {
        this._robotName = name.trim() || 'custom-robot';
        this._dir       = '';
        this._isCustom  = true;
        document.body.classList.add('build-custom');

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        this._chassisParams = { ...CHASSIS_DEFAULTS };
        this._wheelParams   = { ...WHEEL_DEFAULTS   };
        this._casterRadius  = 0.0146;
        this._casterWidth   = 0.0145;
        this._batteryBox    = { l: 0.0806, w: 0.0442, h: 0.022 };
        this._powerbank     = { radius: 0.0115, length: 0.1199 };
        this._wheelGroundZ  = -WHEEL_DEFAULTS.radius;
        this._undoStack.length = 0;
        this._redoStack.length = 0;

        // Minimal blank-slate robot: just a base_link
        this._partMap = new Map([['01-base.xml', '  <link name="base_link"/>']]);

        this.noticeEl.hidden = true;
        this._reload();
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    // ── Parametric STL parts ─────────────────────────────────────────────

    updateChassis(params: ChassisParams): void {
        this._pushUndo();
        this._chassisParams = { ...params };
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        this._pushUndo();
        this._wheelParams = { ...params };
        const z = params.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._setSTL('wheel.stl', generateWheel(params));
    }

    // ── Inline primitive patches ─────────────────────────────────────────

    updateCaster(radius: number, width: number): void {
        this._pushUndo();
        this._casterRadius = radius;
        this._casterWidth  = width;
        this._reload();
    }

    updateBatteryBox(l: number, w: number, h: number): void {
        this._pushUndo();
        this._batteryBox = { l, w, h };
        this._reload();
    }

    // ── Component catalog ────────────────────────────────────────────────

    addComponent(type: string): string {
        this._pushUndo();
        const n  = (this._compCounters.get(type) ?? 0) + 1;
        this._compCounters.set(type, n);
        const id = `${type}_${n}`;
        const def = COMPONENT_CATALOG[type];
        this._components.set(id, {
            type, x: 0, y: 0, z: def?.defaultZ ?? 0.020,
            rx: 0, ry: 0, rz: 0,
            dims:       [...(def?.defaultDims ?? [0.040, 0.040, 0.020])],
            jointType:  'fixed',
            axis:       [0, 0, 1],
            limitLower: -1.5708,
            limitUpper:  1.5708,
            parent:     'base_link',
        });
        this._reload();
        return id;
    }

    removeComponent(id: string): void {
        this._pushUndo();
        this._components.delete(id);
        this._reload();
    }

    updateComponent(id: string, updates: Partial<Omit<Component, 'type'>>): void {
        if (!this._components.has(id)) return;
        this._pushUndo();
        this._updateComponentDirect(id, updates);
    }

    private _updateComponentDirect(id: string, updates: Partial<Omit<Component, 'type'>>): void {
        const c = this._components.get(id);
        if (!c) return;
        Object.assign(c, updates);
        this._reload();
    }

    // ── Getters for slider sync ──────────────────────────────────────────
    get chassisParams(): ChassisParams { return { ...this._chassisParams }; }
    get wheelParams():   WheelParams   { return { ...this._wheelParams   }; }
    get casterRadius():  number        { return this._casterRadius; }
    get casterWidth():   number        { return this._casterWidth;  }
    get batteryBox():    { l: number; w: number; h: number } { return { ...this._batteryBox }; }
    get powerbank():     { radius: number; length: number }  { return { ...this._powerbank  }; }

    get canUndo(): boolean { return this._undoStack.length > 0; }
    get canRedo(): boolean { return this._redoStack.length > 0; }
    get componentIds(): Set<string> { return new Set(this._components.keys()); }

    isFixedComponent(id: string): boolean {
        return this._components.get(id)?.jointType === 'fixed';
    }

    getComponentXYZ(id: string): { x: number; y: number; z: number } | null {
        const c = this._components.get(id);
        return c ? { x: c.x, y: c.y, z: c.z } : null;
    }

    startComponentDrag(id: string): void { this._pushUndo(); }

    finishComponentDrag(id: string, x: number, y: number, z: number): void {
        this._updateComponentDirect(id, { x, y, z });
    }

    updatePowerbank(radius: number, length: number): void {
        this._pushUndo();
        this._powerbank = { radius, length };
        this._reload();
    }

    getComponentEntries(): Array<{ id: string; type: string }> {
        return [...this._components.keys()].map(id => ({ id, type: this._components.get(id)!.type }));
    }

    getComponentData(id: string): Component | null {
        const c = this._components.get(id);
        return c ? { ...c, axis: [...c.axis] as [number, number, number] } : null;
    }

    duplicateComponent(id: string): string | null {
        const src = this._components.get(id);
        if (!src) return null;
        this._pushUndo();
        const n  = (this._compCounters.get(src.type) ?? 0) + 1;
        this._compCounters.set(src.type, n);
        const newId = `${src.type}_${n}`;
        this._components.set(newId, {
            ...src,
            axis: [...src.axis] as [number, number, number],
            x: src.x + 0.020, // 20mm offset so it's not hidden behind original
        });
        this._reload();
        return newId;
    }

    getURDFXML(): string { return this._buildXML(); }

    resetToDefaults(): void {
        this._pushUndo();
        this._chassisParams = { ...CHASSIS_DEFAULTS };
        this._wheelParams   = { ...WHEEL_DEFAULTS   };
        this._casterRadius  = 0.0146;
        this._casterWidth   = 0.0145;
        this._batteryBox    = { l: 0.0806, w: 0.0442, h: 0.022 };
        this._powerbank     = { radius: 0.0115, length: 0.1199 };
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();

        try { localStorage.removeItem(`urdf-build-${this._robotName}`); } catch { /**/ }

        this._reload();
        this.onDOMRebuild?.();
    }

    undo(): void {
        if (!this.canUndo) return;
        this._redoStack.push(this._snapshot());
        this._applySnapshot(this._undoStack.pop()!);
        this.onHistoryChange?.();
    }

    redo(): void {
        if (!this.canRedo) return;
        this._undoStack.push(this._snapshot());
        this._applySnapshot(this._redoStack.pop()!);
        this.onHistoryChange?.();
    }

    restore(): Array<{ id: string; type: string }> {
        const raw = localStorage.getItem(`urdf-build-${this._robotName}`);
        if (!raw) return [];
        let saved: SavedState;
        try { saved = JSON.parse(raw) as SavedState; } catch { return []; }
        if (saved.version !== 1) return [];

        this._casterRadius  = saved.caster.radius;
        this._casterWidth   = saved.caster.width;
        this._batteryBox    = { ...saved.battery };
        this._powerbank     = saved.powerbank ?? { radius: 0.0115, length: 0.1199 };
        this._components    = new Map(saved.components);
        this._compCounters  = new Map(saved.counters);

        this._chassisParams = { ...saved.chassis };
        this._storeSTLBlob('chassis.stl', generateChassis(saved.chassis));

        this._wheelParams = { ...saved.wheel };
        const z = saved.wheel.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._storeSTLBlob('wheel.stl', generateWheel(saved.wheel));

        this._reload();
        return [...this._components.keys()].map(id => ({ id, type: this._components.get(id)!.type }));
    }

    getAvailableLinks(): string[] {
        const seen = new Set<string>();
        const links: string[] = [];
        for (const xml of this._partMap.values()) {
            for (const m of xml.matchAll(/<link\s[^>]*name="([^"]+)"/g)) {
                if (!seen.has(m[1])) { seen.add(m[1]); links.push(m[1]); }
            }
        }
        for (const compId of this._components.keys()) {
            if (!seen.has(compId)) links.push(compId);
        }
        return links;
    }

    // ── Export ───────────────────────────────────────────────────────────

    async exportZip(btn: HTMLButtonElement): Promise<void> {
        const origText = btn.textContent;
        btn.textContent = 'Exporting…';
        btn.disabled = true;
        try {
            const xml      = this._buildXML();
            const stlNames = new Set<string>(
                [...xml.matchAll(/filename="([^"]+\.stl)"/g)].map(m => m[1])
            );

            const files: Record<string, Uint8Array> = {};
            for (const name of stlNames) {
                const url = this._stlBlobs.has(name)
                    ? this._stlBlobs.get(name)!.split('#')[0]
                    : `${this._dir}/${name}`;
                files[name] = new Uint8Array(await fetch(url).then(r => r.arrayBuffer()));
            }
            files[`${this._robotName}.urdf`] = new TextEncoder().encode(xml);

            const { zipSync } = await import('fflate');
            const a = Object.assign(document.createElement('a'), {
                href:     URL.createObjectURL(new Blob([zipSync(files)], { type: 'application/zip' })),
                download: `${this._robotName}.zip`,
            });
            a.click();
            URL.revokeObjectURL(a.href);
        } finally {
            btn.textContent = origText;
            btn.disabled    = false;
        }
    }

    // ── Private helpers ──────────────────────────────────────────────────

    /** Full XML for export: patched joints + geometry + components, relative filenames. */
    private _buildXML(): string {
        return this._insertComponents(
            this._applyGeometryPatches(
                this._applyJointPatches(assembleXML(this._robotName, this._partMap))
            )
        );
    }

    private _applyJointPatches(xml: string): string {
        for (const [joint, z] of this._jointZPatches) {
            xml = xml.replace(
                new RegExp(`(<joint\\b[^>]*?\\bname="${joint}"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),
                (_, pre, xyz, post) => {
                    const parts = xyz.trim().split(/\s+/);
                    parts[2] = z.toFixed(4);
                    return `${pre}${parts.join(' ')}${post}`;
                }
            );
        }
        return xml;
    }

    private _applyGeometryPatches(xml: string): string {
        const r = this._casterRadius;
        const cw = this._casterWidth;

        // Caster wheel cylinder size
        xml = xml.replace(
            /(<link\s[^>]*name="caster_wheel"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,
            `$1radius="${r.toFixed(4)}" length="${cw.toFixed(4)}"`
        );
        // Caster wheel joint Z — bottom of wheel = wheelGroundZ
        xml = xml.replace(
            new RegExp(`(<joint\\b[^>]*?\\bname="caster_wheel_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),
            (_, pre, xyz, post) => {
                const parts = xyz.trim().split(/\s+/);
                parts[2] = (this._wheelGroundZ + r).toFixed(4);
                return `${pre}${parts.join(' ')}${post}`;
            }
        );

        // Battery box size
        const { l, w, h } = this._batteryBox;
        xml = xml.replace(
            /(<link\s[^>]*name="battery_box"[\s\S]*?<box\s+)size="[^"]*"/,
            `$1size="${l.toFixed(4)} ${w.toFixed(4)} ${h.toFixed(4)}"`
        );
        // Battery box joint Z — flush against chassis underside (bottom at -1.5 mm)
        xml = xml.replace(
            new RegExp(`(<joint\\b[^>]*?\\bname="battery_box_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),
            (_, pre, xyz, post) => {
                const parts = xyz.trim().split(/\s+/);
                parts[2] = (-0.0015 - h / 2).toFixed(4);
                return `${pre}${parts.join(' ')}${post}`;
            }
        );

        // Powerbank cylinder size + joint Z
        const { radius: pr, length: pl } = this._powerbank;
        xml = xml.replace(
            /(<link\s[^>]*name="powerbank"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,
            `$1radius="${pr.toFixed(4)}" length="${pl.toFixed(4)}"`
        );
        xml = xml.replace(
            new RegExp(`(<joint\\b[^>]*?\\bname="powerbank_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),
            (_, pre, xyz, post) => {
                const parts = xyz.trim().split(/\s+/);
                parts[2] = (-0.0015 - pr).toFixed(4);
                return `${pre}${parts.join(' ')}${post}`;
            }
        );

        return xml;
    }

    private _insertComponents(xml: string): string {
        if (this._components.size === 0) return xml;
        const parts = [...this._components.entries()]
            .map(([id, c]) => {
                const def  = COMPONENT_CATALOG[c.type];
                const geom = def.geomType === 'cylinder'
                    ? `<cylinder radius="${c.dims[0].toFixed(4)}" length="${c.dims[1].toFixed(4)}"/>`
                    : `<box size="${c.dims[0].toFixed(4)} ${c.dims[1].toFixed(4)} ${c.dims[2].toFixed(4)}"/>`;
                const axisXml  = c.jointType !== 'fixed'
                    ? `\n    <axis xyz="${c.axis[0]} ${c.axis[1]} ${c.axis[2]}"/>`
                    : '';
                const limitXml = (c.jointType === 'revolute' || c.jointType === 'prismatic')
                    ? `\n    <limit lower="${c.limitLower.toFixed(4)}" upper="${c.limitUpper.toFixed(4)}" effort="1" velocity="1"/>`
                    : '';
                return `\n  <link name="${id}">\n    <visual>\n      <geometry>${geom}</geometry>\n      <material name="${id}_mat"><color rgba="${def.color}"/></material>\n    </visual>\n  </link>\n  <joint name="${id}_joint" type="${c.jointType}">\n    <parent link="${c.parent}"/>\n    <child link="${id}"/>\n    <origin xyz="${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}" rpy="${c.rx.toFixed(4)} ${c.ry.toFixed(4)} ${c.rz.toFixed(4)}"/>${axisXml}${limitXml}\n  </joint>`;
            })
            .join('\n');
        return xml.replace('</robot>', `${parts}\n</robot>`);
    }

    private _parseJointZ(joint: string): number | null {
        for (const xml of this._partMap.values()) {
            const m = xml.match(
                new RegExp(`<joint[^>]*name="${joint}"[\\s\\S]*?<origin[^>]*\\bxyz="([^"]+)"`)
            );
            if (m) return parseFloat(m[1].trim().split(/\s+/)[2]);
        }
        return null;
    }

    private _snapshot(): Snapshot {
        return {
            chassisParams: { ...this._chassisParams },
            wheelParams:   { ...this._wheelParams   },
            casterRadius:  this._casterRadius,
            casterWidth:   this._casterWidth,
            batteryBox:    { ...this._batteryBox },
            powerbank:     { ...this._powerbank  },
            components:    [...this._components.entries()].map(([k, v]) => [k, { ...v, axis: [...v.axis] as [number, number, number] }]),
            counters:      [...this._compCounters.entries()],
        };
    }

    private _pushUndo(): void {
        this._undoStack.push(this._snapshot());
        if (this._undoStack.length > this._maxUndo) this._undoStack.shift();
        this._redoStack.length = 0;
        this.onHistoryChange?.();
    }

    private _applySnapshot(snap: Snapshot): void {
        this._chassisParams = { ...snap.chassisParams };
        this._wheelParams   = { ...snap.wheelParams   };
        this._casterRadius  = snap.casterRadius;
        this._casterWidth   = snap.casterWidth;
        this._batteryBox    = { ...snap.batteryBox };
        this._powerbank     = { ...snap.powerbank  };
        this._components    = new Map(snap.components.map(([k, v]) => [k, { ...v, axis: [...v.axis] as [number, number, number] }]));
        this._compCounters  = new Map(snap.counters);

        const wz = snap.wheelParams.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  wz);
        this._jointZPatches.set('wheel_right_joint', wz);

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._storeSTLBlob('chassis.stl', generateChassis(this._chassisParams));
        this._storeSTLBlob('wheel.stl',   generateWheel(this._wheelParams));

        this._reload();
        this.onDOMRebuild?.();
    }

    private _storeSTLBlob(filename: string, stl: ArrayBuffer): void {
        const old = this._stlBlobs.get(filename);
        if (old) URL.revokeObjectURL(old.split('#')[0]);
        const base = URL.createObjectURL(new Blob([stl], { type: 'application/octet-stream' }));
        this._stlBlobs.set(filename, `${base}#${filename}`);
    }

    private _setSTL(filename: string, stl: ArrayBuffer): void {
        this._storeSTLBlob(filename, stl);
        this._reload();
    }

    private _saveState(): void {
        if (!this._robotName || !this.isCatalogActive) return;
        try {
            localStorage.setItem(`urdf-build-${this._robotName}`, JSON.stringify({
                version:    1,
                chassis:    { ...this._chassisParams },
                wheel:      { ...this._wheelParams   },
                caster:     { radius: this._casterRadius, width: this._casterWidth },
                battery:    { ...this._batteryBox },
                powerbank:  { ...this._powerbank  },
                components: [...this._components.entries()],
                counters:   [...this._compCounters.entries()],
            } satisfies SavedState));
            if (this._isCustom) {
                localStorage.setItem('urdf-build-last-custom', this._robotName);
            }
        } catch { /* storage quota — ignore */ }
    }

    get robotName(): string { return this._robotName; }

    /** Remove the saved custom robot from localStorage. */
    clearCustom(): void {
        try {
            const name = localStorage.getItem('urdf-build-last-custom');
            if (name) localStorage.removeItem(`urdf-build-${name}`);
            localStorage.removeItem('urdf-build-last-custom');
        } catch { /**/ }
    }

    /** Name of the last saved custom robot, or null if none exists. */
    static lastCustomName(): string | null {
        try {
            const name = localStorage.getItem('urdf-build-last-custom');
            if (!name) return null;
            return localStorage.getItem(`urdf-build-${name}`) ? name : null;
        } catch { return null; }
    }

    /** Restore the last saved custom robot. Returns component entries, empty if nothing to restore. */
    restoreCustom(): Array<{ id: string; type: string }> {
        const name = URDFBuildController.lastCustomName();
        if (!name) return [];
        this.initFromScratch(name);
        return this.restore();
    }

    private _reload(): void {
        if (!this._robotName) return;
        let xml = this._insertComponents(
            this._applyGeometryPatches(
                this._applyJointPatches(assembleXML(this._robotName, this._partMap))
            )
        );

        for (const [filename, blobUrl] of this._stlBlobs) {
            xml = xml.replaceAll(`filename="${filename}"`, `filename="${blobUrl}"`);
        }
        xml = xml.replace(/filename="([^/"]+)"/g, `filename="${this._dir}/$1"`);

        if (this._blobUrl) URL.revokeObjectURL(this._blobUrl);
        this._blobUrl = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
        this._viewer.urdf = this._blobUrl;
        this._saveState();
    }
}
