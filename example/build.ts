import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';

export { CHASSIS_DEFAULTS, WHEEL_DEFAULTS };

// ── Component catalog ──────────────────────────────────────────────────────

export interface ComponentDef {
    label:    string;
    color:    string;   // URDF rgba string
    defaultZ: number;   // metres — sensible starting height above chassis
    geometry: string;   // URDF <geometry> inner XML
}

export const COMPONENT_CATALOG: Record<string, ComponentDef> = {
    ultrasonic: {
        label: 'Ultrasonic',
        color: '0.20 0.45 0.90 1.00',
        defaultZ: 0.015,
        geometry: '<box size="0.045 0.020 0.015"/>',
    },
    servo: {
        label: 'Servo',
        color: '0.90 0.50 0.15 1.00',
        defaultZ: 0.020,
        geometry: '<box size="0.022 0.012 0.030"/>',
    },
    lidar: {
        label: 'LIDAR',
        color: '0.20 0.80 0.45 1.00',
        defaultZ: 0.035,
        geometry: '<cylinder radius="0.035" length="0.040"/>',
    },
    camera: {
        label: 'Camera',
        color: '0.90 0.20 0.25 1.00',
        defaultZ: 0.010,
        geometry: '<box size="0.025 0.024 0.009"/>',
    },
    box: {
        label: 'Box',
        color: '0.65 0.65 0.65 1.00',
        defaultZ: 0.020,
        geometry: '<box size="0.040 0.040 0.020"/>',
    },
};

// ── Internals ──────────────────────────────────────────────────────────────

/** Robots that have parametric generators (by manifest robot name). */
const SUPPORTED_ROBOTS = new Set(['robot-car']);

interface Component { type: string; x: number; y: number; z: number; }

function assembleXML(robotName: string, partMap: Map<string, string>): string {
    const sorted = [...partMap.entries()].sort(([a], [b]) => a.localeCompare(b));
    const intro  = sorted.filter(([k]) =>  k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n');
    const body   = sorted.filter(([k]) => !k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n\n');
    return `<?xml version="1.0"?>\n${intro}\n<robot name="${robotName}">\n\n${body}\n\n</robot>\n`;
}

// ── Controller ─────────────────────────────────────────────────────────────

export class URDFBuildController {
    private _viewer:       URDFManipulator;
    private _robotName   = '';
    private _dir         = '';
    private _partMap     = new Map<string, string>();
    private _stlBlobs    = new Map<string, string>();   // filename → object URL
    private _jointZPatches  = new Map<string, number>(); // joint name → new Z
    private _wheelGroundZ   = 0;
    private _blobUrl: string | null = null;

    private _components   = new Map<string, Component>(); // id → component
    private _compCounters = new Map<string, number>();     // type → count

    readonly noticeEl: HTMLElement;

    constructor(viewer: URDFManipulator, noticeEl: HTMLElement) {
        this._viewer  = viewer;
        this.noticeEl = noticeEl;
    }

    get isActive(): boolean    { return document.body.classList.contains('build-open'); }
    get isSupported(): boolean { return SUPPORTED_ROBOTS.has(this._robotName); }

    /** Called by main.ts after a parts-based robot finishes loading. */
    init(robotName: string, dir: string, partMap: Map<string, string>): void {
        this._robotName = robotName;
        this._dir       = dir;
        this._partMap   = new Map(partMap);

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._jointZPatches.clear();
        this._components.clear();
        this._compCounters.clear();

        const origWheelZ   = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
        this._wheelGroundZ = origWheelZ - WHEEL_DEFAULTS.radius;

        this.noticeEl.hidden = this.isSupported;
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    // ── Parametric part updates ──────────────────────────────────────────

    updateChassis(params: ChassisParams): void {
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        const z = params.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._setSTL('wheel.stl', generateWheel(params));
    }

    // ── Component catalog ────────────────────────────────────────────────

    /** Add a component from the catalog. Returns the generated ID. */
    addComponent(type: string): string {
        const n  = (this._compCounters.get(type) ?? 0) + 1;
        this._compCounters.set(type, n);
        const id = `${type}_${n}`;
        this._components.set(id, {
            type,
            x: 0,
            y: 0,
            z: COMPONENT_CATALOG[type]?.defaultZ ?? 0.020,
        });
        this._reload();
        return id;
    }

    removeComponent(id: string): void {
        this._components.delete(id);
        this._reload();
    }

    moveComponent(id: string, x: number, y: number, z: number): void {
        const c = this._components.get(id);
        if (!c) return;
        c.x = x; c.y = y; c.z = z;
        this._reload();
    }

    // ── Export ───────────────────────────────────────────────────────────

    async exportZip(btn: HTMLButtonElement): Promise<void> {
        const origText = btn.textContent;
        btn.textContent = 'Exporting…';
        btn.disabled = true;
        try {
            let xml = this._buildXML();

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

    /** Build the full URDF XML for export (relative filenames, joint patches, components). */
    private _buildXML(): string {
        let xml = this._applyJointPatches(assembleXML(this._robotName, this._partMap));
        return this._insertComponents(xml);
    }

    private _insertComponents(xml: string): string {
        if (this._components.size === 0) return xml;
        const parts = [...this._components.entries()]
            .map(([id, c]) => {
                const def = COMPONENT_CATALOG[c.type];
                return `\n  <link name="${id}">\n    <visual>\n      <geometry>${def.geometry}</geometry>\n      <material name="${id}_mat"><color rgba="${def.color}"/></material>\n    </visual>\n  </link>\n  <joint name="${id}_joint" type="fixed">\n    <parent link="base_link"/>\n    <child link="${id}"/>\n    <origin xyz="${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}" rpy="0 0 0"/>\n  </joint>`;
            })
            .join('\n');
        return xml.replace('</robot>', `${parts}\n</robot>`);
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
            this._applyJointPatches(assembleXML(this._robotName, this._partMap))
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
