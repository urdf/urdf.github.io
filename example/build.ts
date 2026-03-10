import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';
import { LIBRARY } from '../src/generators/components/index.js';
import { assembleURDF } from './urdf-assemble.js';

interface SavedState {
    version:   1;
    chassis:   ChassisParams;
    wheel:     WheelParams;
    caster:    { radius: number; width: number };
    battery:   { l: number; w: number; h: number };
    powerbank: { radius: number; length: number };
    components: Array<[string, Component]>;
    counters:   Array<[string, number]>;
    scripts?:   Array<[string, string]>;
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
    geomType:    'box' | 'cylinder' | 'mesh';
    defaultDims: number[];            // [w,d,h] for box · [r,l] for cylinder · bounding box for mesh
    category?:   string;
    cssColor?:   string;
}

// Mesh entries are derived from LIBRARY — single source of truth for label, color, dims, etc.
const meshEntries = Object.fromEntries(
    LIBRARY.map(e => [e.id, {
        label:       e.label,
        color:       e.urdfRgba,
        defaultZ:    e.defaultZ,
        geomType:    'mesh' as const,
        defaultDims: [...e.defaultDims],
        category:    e.category,
        cssColor:    e.cssColor,
    } satisfies ComponentDef])
);

export const COMPONENT_CATALOG: Record<string, ComponentDef> = {
    // Script — user-defined geometry evaluated in a Worker
    script:        { label: 'Script',       color: '0.40 0.75 0.45 1.00', defaultZ: 0.020, geomType: 'mesh', defaultDims: [0.040, 0.040, 0.020], cssColor: '#44bb66' },
    // Primitives — kept for saved-robot backward compatibility
    ultrasonic:    { label: 'Ultrasonic',   color: '0.20 0.45 0.90 1.00', defaultZ: 0.015, geomType: 'box',      defaultDims: [0.045, 0.020, 0.015] },
    camera:        { label: 'Camera',       color: '0.90 0.20 0.25 1.00', defaultZ: 0.010, geomType: 'box',      defaultDims: [0.025, 0.024, 0.009] },
    lidar:         { label: 'LIDAR',        color: '0.20 0.80 0.45 1.00', defaultZ: 0.035, geomType: 'cylinder', defaultDims: [0.035, 0.040] },
    imu:           { label: 'IMU',          color: '0.55 0.35 0.80 1.00', defaultZ: 0.008, geomType: 'box',      defaultDims: [0.020, 0.020, 0.008] },
    servo:         { label: 'Servo',        color: '0.90 0.50 0.15 1.00', defaultZ: 0.020, geomType: 'box',      defaultDims: [0.022, 0.012, 0.030] },
    arduino:       { label: 'Arduino',      color: '0.00 0.45 0.20 1.00', defaultZ: 0.008, geomType: 'box',      defaultDims: [0.044, 0.018, 0.008] },
    raspberry_pi:  { label: 'Raspberry Pi', color: '0.70 0.10 0.20 1.00', defaultZ: 0.017, geomType: 'box',      defaultDims: [0.086, 0.056, 0.017] },
    gps:           { label: 'GPS',          color: '0.20 0.70 0.35 1.00', defaultZ: 0.010, geomType: 'box',      defaultDims: [0.025, 0.025, 0.010] },
    buck_converter: { label: 'Buck Conv.',  color: '0.85 0.60 0.00 1.00', defaultZ: 0.011, geomType: 'box',      defaultDims: [0.023, 0.017, 0.011] },
    box:           { label: 'Box',          color: '0.65 0.65 0.65 1.00', defaultZ: 0.020, geomType: 'box',      defaultDims: [0.040, 0.040, 0.020] },
    // Mesh components — derived from LIBRARY, do not edit here
    ...meshEntries,
};

// ── Internals ──────────────────────────────────────────────────────────────

const CASTER_DEFAULTS    = { radius: 0.0146, width:  0.0145 } as const;
const BATTERY_DEFAULTS   = { l: 0.0806, w: 0.0442, h: 0.022 } as const;
const POWERBANK_DEFAULTS = { radius: 0.0175, length: 0.130  } as const;

const SUPPORTED_ROBOTS = new Set(['robot-car']);

const BLANK_WHEELS_XML = `<link name="wheel_left">
  <visual>
    <geometry><mesh filename="wheel.stl"/></geometry>
    <material name="rubber"><color rgba="0.03 0.03 0.03 1.00"/></material>
  </visual>
  <visual>
    <origin xyz="0 0 0.0075" rpy="0 0 0"/>
    <geometry><cylinder radius="0.022" length="0.012"/></geometry>
    <material name="hub_yellow"><color rgba="1.00 0.85 0.00 1.00"/></material>
  </visual>
</link>
<joint name="wheel_left_joint" type="continuous">
  <parent link="base_link"/>
  <child link="wheel_left"/>
  <origin xyz="-0.010 -0.090 0.0000" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
  <limit effort="2.0" velocity="15.0"/>
</joint>

<link name="wheel_right">
  <visual>
    <geometry><mesh filename="wheel.stl"/></geometry>
    <material name="rubber"><color rgba="0.03 0.03 0.03 1.00"/></material>
  </visual>
  <visual>
    <origin xyz="0 0 -0.0075" rpy="0 0 0"/>
    <geometry><cylinder radius="0.022" length="0.012"/></geometry>
    <material name="hub_yellow"><color rgba="1.00 0.85 0.00 1.00"/></material>
  </visual>
</link>
<joint name="wheel_right_joint" type="continuous">
  <parent link="base_link"/>
  <child link="wheel_right"/>
  <origin xyz="-0.010 0.090 0.0000" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
  <limit effort="2.0" velocity="15.0"/>
</joint>`;

const BLANK_CHASSIS_XML = `<joint name="chassis_joint" type="fixed">
  <parent link="base_link"/>
  <child link="chassis"/>
  <origin xyz="0 0 0" rpy="0 0 0"/>
</joint>

<link name="chassis">
  <visual>
    <geometry>
      <mesh filename="chassis.stl" scale="1.00 1.05 1.00"/>
    </geometry>
    <material name="acrylic">
      <color rgba="0.85 0.95 1.00 0.25"/>
    </material>
  </visual>
</link>`;

const BLANK_CASTER_XML = `<link name="caster_plate">
  <visual>
    <geometry><box size="0.036 0.036 0.004"/></geometry>
    <material name="caster_metal"><color rgba="0.76 0.76 0.78 1.00"/></material>
  </visual>
</link>
<joint name="caster_plate_joint" type="fixed">
  <parent link="base_link"/>
  <child link="caster_plate"/>
  <origin xyz="-0.1200 0.0000 -0.0040" rpy="0 0 0"/>
</joint>

<link name="caster_fork">
  <visual>
    <geometry><box size="0.008 0.016 0.030"/></geometry>
    <material name="caster_metal"><color rgba="0.76 0.76 0.78 1.00"/></material>
  </visual>
</link>
<joint name="caster_fork_joint" type="continuous">
  <parent link="caster_plate"/>
  <child link="caster_fork"/>
  <origin xyz="0 0 -0.002" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
</joint>

<link name="caster_wheel">
  <visual>
    <geometry><cylinder radius="0.0146" length="0.0145"/></geometry>
    <material name="caster_rubber"><color rgba="0.08 0.08 0.08 1.00"/></material>
  </visual>
</link>
<joint name="caster_wheel_joint" type="continuous">
  <parent link="caster_fork"/>
  <child link="caster_wheel"/>
  <origin xyz="0 0 -0.0229" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
</joint>`;

const BLANK_POWER_XML = `<link name="battery_box">
  <visual>
    <geometry><box size="0.0806 0.0442 0.022"/></geometry>
    <material name="battery"><color rgba="0.12 0.12 0.14 1.00"/></material>
  </visual>
</link>
<joint name="battery_box_joint" type="fixed">
  <parent link="base_link"/>
  <child link="battery_box"/>
  <origin xyz="0.0460 0.0000 -0.0120" rpy="0 0 0"/>
</joint>

<link name="powerbank">
  <visual>
    <geometry><cylinder radius="0.0175" length="0.130"/></geometry>
    <material name="powerbank_blue"><color rgba="0.05 0.12 0.40 1.00"/></material>
  </visual>
</link>
<joint name="powerbank_joint" type="fixed">
  <parent link="base_link"/>
  <child link="powerbank"/>
  <origin xyz="-0.0350 0.0000 -0.0180" rpy="1.5708 0.0000 0.0000"/>
</joint>`;

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
    private _meshBlobs    = new Map<string, string>();   // componentId → blobUrl#id.stl
    private _scripts      = new Map<string, string>();   // componentId → JS source (script type)
    private _partTemplates = new Map<string, string>(); // fetched real-robot XML templates
    private _isCustom     = false;

    // Inline geometry patches (no STL needed — primitive shapes)
    private _casterRadius = CASTER_DEFAULTS.radius;
    private _casterWidth  = CASTER_DEFAULTS.width;
    private _batteryBox   = { ...BATTERY_DEFAULTS };

    // Parametric params — tracked so they can be persisted
    private _chassisParams: ChassisParams = { ...CHASSIS_DEFAULTS };
    private _wheelParams:   WheelParams   = { ...WHEEL_DEFAULTS   };
    private _powerbank      = { ...POWERBANK_DEFAULTS };

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

    private _resetRuntimeState(): void {
        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();
        this._scripts.clear();
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        this._casterRadius = CASTER_DEFAULTS.radius;
        this._casterWidth  = CASTER_DEFAULTS.width;
        this._batteryBox   = { ...BATTERY_DEFAULTS };
        this._powerbank    = { ...POWERBANK_DEFAULTS };
        this._chassisParams = { ...CHASSIS_DEFAULTS };
        this._wheelParams   = { ...WHEEL_DEFAULTS   };
        this._undoStack.length = 0;
        this._redoStack.length = 0;
    }

    init(robotName: string, dir: string, partMap: Map<string, string>): void {
        this._robotName = robotName;
        this._dir       = dir;
        this._partMap   = new Map(partMap);
        this._isCustom  = false;
        document.body.classList.remove('build-custom');

        this._resetRuntimeState();

        const origWheelZ   = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
        this._wheelGroundZ = origWheelZ - WHEEL_DEFAULTS.radius;

        this.noticeEl.hidden = this.isSupported;
    }

    initFromScratch(name: string): void {
        this._robotName = name.trim() || 'custom-robot';
        this._dir       = '';
        this._isCustom  = true;
        document.body.classList.add('build-custom');

        this._resetRuntimeState();
        this._wheelGroundZ  = -WHEEL_DEFAULTS.radius;
        this._partTemplates.clear();

        // Truly blank — parts appear progressively as update_* methods are called.
        this._partMap = new Map([['01-base.xml', '  <link name="base_link"/>']]);

        this.noticeEl.hidden = true;
        this._reload();
    }

    setPartTemplate(key: string, xml: string): void {
        this._partTemplates.set(key, xml);
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    // ── Parametric STL parts ─────────────────────────────────────────────

    updateChassis(params: ChassisParams): void {
        this._pushUndo();
        if (!this._partMap.has('02-chassis.xml')) this._partMap.set('02-chassis.xml', BLANK_CHASSIS_XML);
        this._chassisParams = { ...params };
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        this._pushUndo();
        if (!this._partMap.has('03-wheels.xml')) {
            this._partMap.set('03-wheels.xml', this._partTemplates.get('03-wheels.xml') ?? BLANK_WHEELS_XML);
            const wz = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
            this._wheelGroundZ = wz - WHEEL_DEFAULTS.radius;
        }
        this._wheelParams = { ...params };
        const z = params.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._setSTL('wheel.stl', generateWheel(params));
    }

    // ── Inline primitive patches ─────────────────────────────────────────

    updateCaster(radius: number, width: number): void {
        this._pushUndo();
        if (!this._partMap.has('04-caster.xml')) this._partMap.set('04-caster.xml', this._partTemplates.get('04-caster.xml') ?? BLANK_CASTER_XML);
        this._casterRadius = radius;
        this._casterWidth  = width;
        this._reload();
    }

    updateBatteryBox(l: number, w: number, h: number): void {
        this._pushUndo();
        if (!this._partMap.has('06-power.xml')) this._partMap.set('06-power.xml', this._partTemplates.get('06-power.xml') ?? BLANK_POWER_XML);
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

    addMeshComponent(type: string, stl: ArrayBuffer): string {
        this._pushUndo();
        const n  = (this._compCounters.get(type) ?? 0) + 1;
        this._compCounters.set(type, n);
        const id = `${type}_${n}`;
        const base = URL.createObjectURL(new Blob([stl], { type: 'application/octet-stream' }));
        this._meshBlobs.set(id, `${base}#${id}.stl`);
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

    restoreMeshBlob(id: string, stl: ArrayBuffer): void {
        if (!this._components.has(id)) return;
        const old = this._meshBlobs.get(id);
        if (old) URL.revokeObjectURL(old.split('#')[0]);
        const base = URL.createObjectURL(new Blob([stl], { type: 'application/octet-stream' }));
        this._meshBlobs.set(id, `${base}#${id}.stl`);
        this._reload();
    }

    addScriptComponent(src: string, stl: ArrayBuffer): string {
        const id = this.addMeshComponent('script', stl);
        this._scripts.set(id, src);
        return id;
    }

    setComponentScript(id: string, src: string): void { this._scripts.set(id, src); }
    getComponentScript(id: string): string | undefined { return this._scripts.get(id); }

    removeComponent(id: string): void {
        this._pushUndo();
        const meshUrl = this._meshBlobs.get(id);
        if (meshUrl) { URL.revokeObjectURL(meshUrl.split('#')[0]); this._meshBlobs.delete(id); }
        this._scripts.delete(id);
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

    startComponentDrag(): void { this._pushUndo(); }

    finishComponentDrag(id: string, x: number, y: number, z: number): void {
        this._updateComponentDirect(id, { x, y, z });
    }

    updatePowerbank(radius: number, length: number): void {
        this._pushUndo();
        if (!this._partMap.has('06-power.xml')) this._partMap.set('06-power.xml', this._partTemplates.get('06-power.xml') ?? BLANK_POWER_XML);
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
        // Copy script source so duplicate can be re-evaluated independently
        const script = this._scripts.get(id);
        if (script) this._scripts.set(newId, script);
        this._reload();
        return newId;
    }

    getURDFXML(): string { return this._buildXML(); }

    resetToDefaults(): void {
        this._pushUndo();
        this._chassisParams = { ...CHASSIS_DEFAULTS };
        this._wheelParams   = { ...WHEEL_DEFAULTS   };
        this._casterRadius  = CASTER_DEFAULTS.radius;
        this._casterWidth   = CASTER_DEFAULTS.width;
        this._batteryBox    = { ...BATTERY_DEFAULTS };
        this._powerbank     = { ...POWERBANK_DEFAULTS };
        this._components.clear();
        this._compCounters.clear();
        this._scripts.clear();

        // Revoke after param reset to preserve existing ordering
        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();

        // Regenerate STL blobs and re-apply wheel Z patches (mirrors _applySnapshot).
        // Without this, _reload falls back to this._dir/chassis.stl which may not exist
        // (e.g. _dir='' for custom builds).
        this._storeSTLBlob('chassis.stl', generateChassis(this._chassisParams));
        this._storeSTLBlob('wheel.stl',   generateWheel(this._wheelParams));
        const wz = WHEEL_DEFAULTS.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  wz);
        this._jointZPatches.set('wheel_right_joint', wz);

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
        this._powerbank     = saved.powerbank ?? { ...POWERBANK_DEFAULTS };
        this._components    = new Map(saved.components);
        this._compCounters  = new Map(saved.counters);
        if (saved.scripts) this._scripts = new Map(saved.scripts);

        this._chassisParams = { ...saved.chassis };
        this._partMap.set('02-chassis.xml', BLANK_CHASSIS_XML);
        this._storeSTLBlob('chassis.stl', generateChassis(saved.chassis));

        this._wheelParams = { ...saved.wheel };
        this._partMap.set('03-wheels.xml', BLANK_WHEELS_XML);
        const z = saved.wheel.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._storeSTLBlob('wheel.stl', generateWheel(saved.wheel));

        this._partMap.set('04-caster.xml', BLANK_CASTER_XML);
        this._partMap.set('06-power.xml',  BLANK_POWER_XML);

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
            // Start with raw XML (blob URLs for mesh components, relative names for STL blobs)
            let xml = this._buildXML();

            // Replace mesh blob URLs with their short relative names (e.g. "hcsr04_1.stl")
            for (const [, blobUrlWithHash] of this._meshBlobs) {
                const shortName = blobUrlWithHash.split('#')[1];
                if (shortName) xml = xml.replaceAll(blobUrlWithHash, shortName);
            }

            // Now all filenames are relative — extract them (blob URLs excluded by [^/"]+)
            const stlNames = new Set<string>(
                [...xml.matchAll(/filename="([^/"]+\.stl)"/g)].map(m => m[1])
            );

            // Also add mesh blob names in case any weren't found above
            for (const [, url] of this._meshBlobs) {
                const name = url.split('#')[1];
                if (name) stlNames.add(name);
            }

            const files: Record<string, Uint8Array> = {};
            for (const name of stlNames) {
                let fetchUrl: string;
                if (this._stlBlobs.has(name)) {
                    fetchUrl = this._stlBlobs.get(name)!.split('#')[0];
                } else {
                    const meshEntry = [...this._meshBlobs.values()].find(v => v.endsWith(`#${name}`));
                    fetchUrl = meshEntry ? meshEntry.split('#')[0] : `${this._dir}/${name}`;
                }
                files[name] = new Uint8Array(await fetch(fetchUrl).then(r => r.arrayBuffer()));
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
                this._applyJointPatches(assembleURDF(this._robotName, this._partMap))
            )
        );
    }

    private _applyJointPatches(xml: string): string {
        if (this._jointZPatches.size === 0) return xml;
        const doc = new DOMParser().parseFromString(xml, 'application/xml');
        for (const [joint, z] of this._jointZPatches) {
            const originEl = doc.querySelector(`joint[name="${joint}"] > origin`);
            if (!originEl) continue;
            const parts = (originEl.getAttribute('xyz') ?? '0 0 0').trim().split(/\s+/);
            parts[2] = z.toFixed(4);
            originEl.setAttribute('xyz', parts.join(' '));
        }
        return new XMLSerializer().serializeToString(doc);
    }

    private _applyGeometryPatches(xml: string): string {
        const doc = new DOMParser().parseFromString(xml, 'application/xml');

        // Caster wheel: update cylinder size and joint Z (fork-relative)
        const r  = this._casterRadius;
        const cw = this._casterWidth;
        const casterCyl = doc.querySelector('link[name="caster_wheel"] cylinder');
        if (casterCyl) {
            casterCyl.setAttribute('radius', r.toFixed(4));
            casterCyl.setAttribute('length', cw.toFixed(4));
        }
        const casterOrigin = doc.querySelector('joint[name="caster_wheel_joint"] > origin');
        if (casterOrigin) {
            // caster_wheel_joint is relative to caster_fork (world Z = −0.006)
            const parts = (casterOrigin.getAttribute('xyz') ?? '0 0 0').trim().split(/\s+/);
            parts[2] = (this._wheelGroundZ + r + 0.006).toFixed(4);
            casterOrigin.setAttribute('xyz', parts.join(' '));
        }

        // Battery box: update box size and joint Z
        const { l, w, h } = this._batteryBox;
        const batteryBox = doc.querySelector('link[name="battery_box"] box');
        if (batteryBox) {
            batteryBox.setAttribute('size', `${l.toFixed(4)} ${w.toFixed(4)} ${h.toFixed(4)}`);
        }
        const batteryOrigin = doc.querySelector('joint[name="battery_box_joint"] > origin');
        if (batteryOrigin) {
            const parts = (batteryOrigin.getAttribute('xyz') ?? '0 0 0').trim().split(/\s+/);
            parts[2] = (-0.0015 - h / 2).toFixed(4);
            batteryOrigin.setAttribute('xyz', parts.join(' '));
        }

        // Powerbank: update cylinder size and joint Z
        const { radius: pr, length: pl } = this._powerbank;
        const powerbankCyl = doc.querySelector('link[name="powerbank"] cylinder');
        if (powerbankCyl) {
            powerbankCyl.setAttribute('radius', pr.toFixed(4));
            powerbankCyl.setAttribute('length', pl.toFixed(4));
        }
        const powerbankOrigin = doc.querySelector('joint[name="powerbank_joint"] > origin');
        if (powerbankOrigin) {
            const parts = (powerbankOrigin.getAttribute('xyz') ?? '0 0 0').trim().split(/\s+/);
            parts[2] = (-0.0005 - pr).toFixed(4);
            powerbankOrigin.setAttribute('xyz', parts.join(' '));
        }

        return new XMLSerializer().serializeToString(doc);
    }

    private _insertComponents(xml: string): string {
        if (this._components.size === 0) return xml;
        const parts: string[] = [];
        for (const [id, c] of this._components) {
            const def = COMPONENT_CATALOG[c.type];
            let geom: string;
            if (def?.geomType === 'mesh') {
                const blobUrl = this._meshBlobs.get(id);
                if (!blobUrl) continue;  // blob not yet ready (restore in progress or post-undo)
                geom = `<mesh filename="${blobUrl}"/>`;
            } else if (def?.geomType === 'cylinder') {
                geom = `<cylinder radius="${c.dims[0].toFixed(4)}" length="${c.dims[1].toFixed(4)}"/>`;
            } else {
                geom = `<box size="${c.dims[0].toFixed(4)} ${c.dims[1].toFixed(4)} ${c.dims[2].toFixed(4)}"/>`;
            }
            const axisXml  = c.jointType !== 'fixed'
                ? `\n    <axis xyz="${c.axis[0]} ${c.axis[1]} ${c.axis[2]}"/>`
                : '';
            const limitXml = (c.jointType === 'revolute' || c.jointType === 'prismatic')
                ? `\n    <limit lower="${c.limitLower.toFixed(4)}" upper="${c.limitUpper.toFixed(4)}" effort="1" velocity="1"/>`
                : '';
            parts.push(`\n  <link name="${id}">\n    <visual>\n      <geometry>${geom}</geometry>\n      <material name="${id}_mat"><color rgba="${def?.color ?? '0.65 0.65 0.65 1.00'}"/></material>\n    </visual>\n  </link>\n  <joint name="${id}_joint" type="${c.jointType}">\n    <parent link="${c.parent}"/>\n    <child link="${id}"/>\n    <origin xyz="${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}" rpy="${c.rx.toFixed(4)} ${c.ry.toFixed(4)} ${c.rz.toFixed(4)}"/>${axisXml}${limitXml}\n  </joint>`);
        }
        if (parts.length === 0) return xml;
        return xml.replace('</robot>', `${parts.join('\n')}\n</robot>`);
    }

    getJointXYZ(joint: string): { x: number; y: number; z: number } | null {
        for (const xml of this._partMap.values()) {
            const m = xml.match(
                new RegExp(`<joint[^>]*name="${joint}"[\\s\\S]*?<origin[^>]*\\bxyz="([^"]+)"`)
            );
            if (m) {
                const [x, y, z] = m[1].trim().split(/\s+/).map(parseFloat);
                return { x, y, z };
            }
        }
        return null;
    }

    private _parseJointZ(joint: string): number | null {
        return this.getJointXYZ(joint)?.z ?? null;
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
        // Only revoke mesh blobs for components absent from the snapshot.
        // Components that survive the undo/redo keep their blobs, avoiding a flash of invisible geometry.
        const snapCompIds = new Set(snap.components.map(([id]) => id));
        for (const [id, url] of this._meshBlobs) {
            if (!snapCompIds.has(id)) {
                URL.revokeObjectURL(url.split('#')[0]);
                this._meshBlobs.delete(id);
            }
        }
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
                scripts:    [...this._scripts.entries()],
            } satisfies SavedState));
            if (this._isCustom) {
                localStorage.setItem('urdf-build-last-custom', this._robotName);
                const raw  = localStorage.getItem('urdf-build-custom-list');
                const list: string[] = raw ? JSON.parse(raw) as string[] : [];
                if (!list.includes(this._robotName)) {
                    list.push(this._robotName);
                    localStorage.setItem('urdf-build-custom-list', JSON.stringify(list));
                }
            }
        } catch { /* storage quota — ignore */ }
    }

    get robotName(): string { return this._robotName; }

    /** Remove the saved custom robot from localStorage. */
    clearCustom(): void {
        try {
            const name = localStorage.getItem('urdf-build-last-custom');
            if (name) this.deleteCustom(name);
            else localStorage.removeItem('urdf-build-last-custom');
        } catch { /**/ }
    }

    /** Remove a named custom robot from the saved list and storage. */
    deleteCustom(name: string): void {
        try {
            const raw  = localStorage.getItem('urdf-build-custom-list');
            const list: string[] = raw ? JSON.parse(raw) as string[] : [];
            const next = list.filter(n => n !== name);
            if (next.length > 0) localStorage.setItem('urdf-build-custom-list', JSON.stringify(next));
            else localStorage.removeItem('urdf-build-custom-list');
            localStorage.removeItem(`urdf-build-${name}`);
            if (localStorage.getItem('urdf-build-last-custom') === name) {
                localStorage.removeItem('urdf-build-last-custom');
            }
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

    /** All saved custom robot names (only those with actual data). */
    static savedCustomNames(): string[] {
        try {
            const raw  = localStorage.getItem('urdf-build-custom-list');
            const list: string[] = raw ? JSON.parse(raw) as string[] : [];
            // Backward compat: include last-custom if not already listed
            const lc = localStorage.getItem('urdf-build-last-custom');
            if (lc && !list.includes(lc) && localStorage.getItem(`urdf-build-${lc}`)) list.unshift(lc);
            return list.filter(n => !!localStorage.getItem(`urdf-build-${n}`));
        } catch { return []; }
    }

    /** Restore the last saved custom robot. Returns component entries, empty if nothing to restore. */
    restoreCustom(): Array<{ id: string; type: string }> {
        const name = URDFBuildController.lastCustomName();
        if (!name) return [];
        return this.restoreCustomByName(name);
    }

    /** Restore a named custom robot. Returns component entries, empty if not found. */
    restoreCustomByName(name: string): Array<{ id: string; type: string }> {
        this.initFromScratch(name);
        return this.restore();
    }

    private _reload(): void {
        if (!this._robotName) return;
        let xml = this._insertComponents(
            this._applyGeometryPatches(
                this._applyJointPatches(assembleURDF(this._robotName, this._partMap))
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
