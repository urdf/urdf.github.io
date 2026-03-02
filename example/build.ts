import type { URDFManipulator } from '../src/index.js';
import { generateChassis, CHASSIS_DEFAULTS } from '../src/generators/chassis.js';
import { generateWheel, WHEEL_DEFAULTS } from '../src/generators/wheel.js';
import type { ChassisParams } from '../src/generators/chassis.js';
import type { WheelParams } from '../src/generators/wheel.js';

export { CHASSIS_DEFAULTS, WHEEL_DEFAULTS };

/** Robots that have parametric generators (by manifest robot name). */
const SUPPORTED_ROBOTS = new Set(['robot-car']);

function assembleXML(robotName: string, partMap: Map<string, string>): string {
    const sorted = [...partMap.entries()].sort(([a], [b]) => a.localeCompare(b));
    const intro  = sorted.filter(([k]) =>  k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n');
    const body   = sorted.filter(([k]) => !k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n\n');
    return `<?xml version="1.0"?>\n${intro}\n<robot name="${robotName}">\n\n${body}\n\n</robot>\n`;
}

export class URDFBuildController {
    private _viewer:    URDFManipulator;
    private _robotName  = '';
    private _dir        = '';
    private _partMap    = new Map<string, string>();
    private _stlBlobs   = new Map<string, string>();  // filename → object URL
    private _jointZPatches = new Map<string, number>(); // joint name → new Z value
    private _wheelGroundZ  = 0; // joint_Z − radius at load time; constant ground offset
    private _blobUrl:   string | null = null;

    readonly noticeEl:  HTMLElement;

    constructor(viewer: URDFManipulator, noticeEl: HTMLElement) {
        this._viewer   = viewer;
        this.noticeEl  = noticeEl;
    }

    get isActive(): boolean { return document.body.classList.contains('build-open'); }

    get isSupported(): boolean { return SUPPORTED_ROBOTS.has(this._robotName); }

    /** Called by main.ts after a parts-based robot finishes loading. */
    init(robotName: string, dir: string, partMap: Map<string, string>): void {
        this._robotName = robotName;
        this._dir       = dir;
        this._partMap   = new Map(partMap);

        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url.split('#')[0]);
        this._stlBlobs.clear();
        this._jointZPatches.clear();

        // Capture the wheel axle height so that when radius changes the wheel
        // bottom stays at the same Z (ground plane stays visually consistent).
        //   ground_z = joint_Z − radius  →  new joint_Z = new_radius + ground_z
        const origWheelZ   = this._parseJointZ('wheel_left_joint') ?? (-WHEEL_DEFAULTS.radius);
        this._wheelGroundZ = origWheelZ - WHEEL_DEFAULTS.radius;

        this.noticeEl.hidden = this.isSupported;
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    updateChassis(params: ChassisParams): void {
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        // Keep wheel bottom at the same ground-plane Z as at load time.
        const z = params.radius + this._wheelGroundZ;
        this._jointZPatches.set('wheel_left_joint',  z);
        this._jointZPatches.set('wheel_right_joint', z);
        this._setSTL('wheel.stl', generateWheel(params));
    }

    /** Read the Z component of a named joint's origin xyz from the source partMap. */
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
        // Strip fragment before revoking — only the bare blob URL is a valid object URL
        if (old) URL.revokeObjectURL(old.split('#')[0]);
        const base = URL.createObjectURL(new Blob([stl], { type: 'application/octet-stream' }));
        // Append the original filename as a fragment so the loader can detect the .stl extension.
        // Browsers ignore fragments when fetching blob URLs, so the data still loads correctly.
        const url = `${base}#${filename}`;
        this._stlBlobs.set(filename, url);
        this._reload();
    }

    private _reload(): void {
        if (!this._robotName) return;
        let xml = assembleXML(this._robotName, this._partMap);

        // Patch joint Z values where geometry drives kinematics (e.g. wheel radius).
        // Always applied to the original _partMap assembly so there is no drift across calls.
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

        // Replace matching filenames with generated blob URLs
        for (const [filename, blobUrl] of this._stlBlobs) {
            xml = xml.replaceAll(`filename="${filename}"`, `filename="${blobUrl}"`);
        }

        // Rewrite remaining relative filenames to absolute server paths
        xml = xml.replace(/filename="([^/"]+)"/g, `filename="${this._dir}/$1"`);

        if (this._blobUrl) URL.revokeObjectURL(this._blobUrl);
        this._blobUrl = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
        this._viewer.urdf = this._blobUrl;
    }
}
