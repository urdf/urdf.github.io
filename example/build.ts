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

        // Discard old generated STLs — they belong to the previous robot
        for (const url of this._stlBlobs.values()) URL.revokeObjectURL(url);
        this._stlBlobs.clear();

        this.noticeEl.hidden = this.isSupported;
    }

    open(): void  { document.body.classList.add('build-open');    }
    close(): void { document.body.classList.remove('build-open'); }

    updateChassis(params: ChassisParams): void {
        this._setSTL('chassis.stl', generateChassis(params));
    }

    updateWheel(params: WheelParams): void {
        this._setSTL('wheel.stl', generateWheel(params));
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
