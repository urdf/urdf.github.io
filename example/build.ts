import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';

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
        label: 'Ultrasonic', color: '0.20 0.45 0.90 1.00',
        defaultZ: 0.015, geomType: 'box', defaultDims: [0.045, 0.020, 0.015],
    },
    servo: {
        label: 'Servo', color: '0.90 0.50 0.15 1.00',
        defaultZ: 0.020, geomType: 'box', defaultDims: [0.022, 0.012, 0.030],
    },
    lidar: {
        label: 'LIDAR', color: '0.20 0.80 0.45 1.00',
        defaultZ: 0.035, geomType: 'cylinder', defaultDims: [0.035, 0.040],
    },
    camera: {
        label: 'Camera', color: '0.90 0.20 0.25 1.00',
        defaultZ: 0.010, geomType: 'box', defaultDims: [0.025, 0.024, 0.009],
    },
    box: {
        label: 'Box', color: '0.65 0.65 0.65 1.00',
        defaultZ: 0.020, geomType: 'box', defaultDims: [0.040, 0.040, 0.020],
    },
};

// ── Internals ──────────────────────────────────────────────────────────────

const SUPPORTED_ROBOTS = new Set(['robot-car']);

type JointType = 'fixed' | 'continuous' | 'revolute' | 'prismatic';

interface Component {
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

    // Inline geometry patches (no STL needed — primitive shapes)
    private _casterRadius = 0.0146;
    private _casterWidth  = 0.0145;
    private _batteryBox   = { l: 0.0806, w: 0.0442, h: 0.022 };

    readonly noticeEl: HTMLElement;

    constructor(viewer: URDFManipulator, noticeEl: HTMLElement) {
        this._viewer  = viewer;
        this.noticeEl = noticeEl;
    }

    get isActive(): boolean    { return document.body.classList.contains('build-open'); }
    get isSupported(): boolean { return SUPPORTED_ROBOTS.has(this._robotName); }

    init(robotName: string, dir: string, partMap: Map<string, string>): void {
        this._robotName = robotName;
        this._dir       = dir;
        this._partMap   = new Map(partMap);

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        this._casterRadius = 0.0146;
        this._casterWidth  = 0.0145;
        this._batteryBox   = { l: 0.0806, w: 0.0442, h: 0.022 };

        const origWheelZ   = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
        this._wheelGroundZ = origWheelZ - WHEEL_DEFAULTS.radius;

        this.noticeEl.hidden = this.isSupported;
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    // ── Parametric STL parts ─────────────────────────────────────────────

    updateChassis(params: ChassisParams): void {
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        const z = params.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._setSTL('wheel.stl', generateWheel(params));
    }

    // ── Inline primitive patches ─────────────────────────────────────────

    updateCaster(radius: number, width: number): void {
        this._casterRadius = radius;
        this._casterWidth  = width;
        this._reload();
    }

    updateBatteryBox(l: number, w: number, h: number): void {
        this._batteryBox = { l, w, h };
        this._reload();
    }

    // ── Component catalog ────────────────────────────────────────────────

    addComponent(type: string): string {
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
        this._components.delete(id);
        this._reload();
    }

    updateComponent(id: string, updates: Partial<Omit<Component, 'type'>>): void {
        const c = this._components.get(id);
        if (!c) return;
        Object.assign(c, updates);
        this._reload();
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

    private _setSTL(filename: string, stl: ArrayBuffer): void {
        const old = this._stlBlobs.get(filename);
        if (old) URL.revokeObjectURL(old.split('#')[0]);
        const base = URL.createObjectURL(new Blob([stl], { type: 'application/octet-stream' }));
        this._stlBlobs.set(filename, `${base}#${filename}`);
        this._reload();
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
    }
}
