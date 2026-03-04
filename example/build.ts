import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';
import { LIBRARY } from '../src/generators/components/index.js';

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
    geomType:    'box' | 'cylinder' | 'mesh';
    defaultDims: number[];            // [w,d,h] for box · [r,l] for cylinder · bounding box for mesh
    category?:   string;
    cssColor?:   string;
    hidden?:     boolean;            // true = exclude from Build palette (superseded by Library)
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
    // Primitives — kept for saved-robot backward compatibility; hidden ones are superseded by Library
    ultrasonic:    { label: 'Ultrasonic',   color: '0.20 0.45 0.90 1.00', defaultZ: 0.015, geomType: 'box',      defaultDims: [0.045, 0.020, 0.015], hidden: true },
    camera:        { label: 'Camera',       color: '0.90 0.20 0.25 1.00', defaultZ: 0.010, geomType: 'box',      defaultDims: [0.025, 0.024, 0.009] },
    lidar:         { label: 'LIDAR',        color: '0.20 0.80 0.45 1.00', defaultZ: 0.035, geomType: 'cylinder', defaultDims: [0.035, 0.040] },
    imu:           { label: 'IMU',          color: '0.55 0.35 0.80 1.00', defaultZ: 0.008, geomType: 'box',      defaultDims: [0.020, 0.020, 0.008], hidden: true },
    servo:         { label: 'Servo',        color: '0.90 0.50 0.15 1.00', defaultZ: 0.020, geomType: 'box',      defaultDims: [0.022, 0.012, 0.030], hidden: true },
    arduino:       { label: 'Arduino',      color: '0.00 0.45 0.20 1.00', defaultZ: 0.008, geomType: 'box',      defaultDims: [0.044, 0.018, 0.008], hidden: true },
    raspberry_pi:  { label: 'Raspberry Pi', color: '0.70 0.10 0.20 1.00', defaultZ: 0.017, geomType: 'box',      defaultDims: [0.086, 0.056, 0.017] },
    gps:           { label: 'GPS',          color: '0.20 0.70 0.35 1.00', defaultZ: 0.010, geomType: 'box',      defaultDims: [0.025, 0.025, 0.010] },
    buck_converter: { label: 'Buck Conv.',  color: '0.85 0.60 0.00 1.00', defaultZ: 0.011, geomType: 'box',      defaultDims: [0.023, 0.017, 0.011] },
    box:           { label: 'Box',          color: '0.65 0.65 0.65 1.00', defaultZ: 0.020, geomType: 'box',      defaultDims: [0.040, 0.040, 0.020] },
    // Mesh components — derived from LIBRARY, do not edit here
    ...meshEntries,
};

// ── Internals ──────────────────────────────────────────────────────────────

const SUPPORTED_ROBOTS = new Set(['robot-car']);

const BLANK_WHEELS_XML = `<link name="wheel_left">
  <visual>
    <geometry><mesh filename="wheel.stl"/></geometry>
    <material name="rubber"><color rgba="0.10 0.10 0.10 1.00"/></material>
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
    <material name="rubber"><color rgba="0.10 0.10 0.10 1.00"/></material>
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
      <color rgba="0.72 0.91 1.00 0.50"/>
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
<joint name="caster_fork_joint" type="fixed">
  <parent link="base_link"/>
  <child link="caster_fork"/>
  <origin xyz="-0.1200 0.0000 -0.0149" rpy="0 0 0"/>
</joint>

<link name="caster_wheel">
  <visual>
    <geometry><cylinder radius="0.0146" length="0.0145"/></geometry>
    <material name="caster_rubber"><color rgba="0.08 0.08 0.08 1.00"/></material>
  </visual>
</link>
<joint name="caster_wheel_joint" type="continuous">
  <parent link="base_link"/>
  <child link="caster_wheel"/>
  <origin xyz="-0.1200 0.0000 -0.0289" rpy="1.5708 0.0000 0.0000"/>
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
    <geometry><cylinder radius="0.0115" length="0.1199"/></geometry>
    <material name="powerbank_blue"><color rgba="0.15 0.45 0.85 1.00"/></material>
  </visual>
</link>
<joint name="powerbank_joint" type="fixed">
  <parent link="base_link"/>
  <child link="powerbank"/>
  <origin xyz="-0.0350 0.0000 -0.0110" rpy="1.5708 0.0000 0.0000"/>
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
    private _meshBlobs    = new Map<string, string>();   // componentId → blobUrl#id.stl
    private _partTemplates = new Map<string, string>(); // fetched real-robot XML templates
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
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();
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
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();
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

    removeComponent(id: string): void {
        this._pushUndo();
        const meshUrl = this._meshBlobs.get(id);
        if (meshUrl) { URL.revokeObjectURL(meshUrl.split('#')[0]); this._meshBlobs.delete(id); }
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
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();

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
        for (const url of this._meshBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._meshBlobs.clear();
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
