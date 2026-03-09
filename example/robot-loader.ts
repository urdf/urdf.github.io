import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';
import type { URDFManipulator } from '../src/index.js';
import type { URDFEditorController } from './editor.js';
import type { MuJoCoSimulator } from './simulator.js';
import type { ComponentCrudController } from './component-crud.js';
import { assembleURDF } from './urdf-assemble.js';
import { $ } from './dom-utils.js';

export interface RobotConfig {
    name: string;
    label: string;
    urdf?: string;
    parts?: string;
    up: string;
    package?: string;
    id?: string;
}

export interface CatalogEntry {
    id: string;
    name: string;
    label: string;
    tags: string[];
    up: string;
    urdf?: string;
    parts?: string;
    package?: string;
}

export function catalogToConfig(e: CatalogEntry): RobotConfig {
    return {
        id:      e.id,
        name:    e.name,
        label:   e.label,
        up:      e.up,
        ...(e.parts   ? { parts:   `/robots/${e.parts}`   } : {}),
        ...(e.urdf    ? { urdf:    `/robots/${e.urdf}`    } : {}),
        ...(e.package ? { package: `${e.package}: /robots/${e.id}` } : {}),
    };
}

export type SimSource =
    | { kind: 'url'; urdfUrl: string; pkgStr: string }
    | { kind: 'xml'; xml: string; base: string };

export interface RobotLoaderOptions {
    viewer:                  URDFManipulator;
    buildCtrl:               URDFBuildController;
    crudCtrl:                ComponentCrudController;
    editorCtrl:              URDFEditorController;
    simulator:               MuJoCoSimulator;
    upAxisEl:                HTMLSelectElement;
    simStatus:               HTMLElement;
    physicsModeOptions:      HTMLElement;
    simFloatBase:            HTMLInputElement;
    syncSlidersFromController: () => void;
    refreshPaletteCounts:    () => void;
    refreshBuildHeader:      () => void;
    /** Called after load is initiated; use to update robot button active state and slider. */
    onRobotSelected:         (robot: RobotConfig) => void;
}

export class RobotLoader {
    private readonly _opts: RobotLoaderOptions;

    private _simSource:    SimSource | null = null;
    private _partsBlobUrl: string | null = null;
    private _currentRobotIndex = 0;

    constructor(opts: RobotLoaderOptions) {
        this._opts = opts;
    }

    get simSource(): SimSource | null { return this._simSource; }
    get currentRobotIndex(): number   { return this._currentRobotIndex; }

    load(robot: RobotConfig, index: number): void {
        this._currentRobotIndex = index;
        this._opts.viewer.up = robot.up;
        this._opts.upAxisEl.value = robot.up;
        this._opts.viewer.package = robot.package ?? '';

        this._opts.simulator.stop();
        document.body.classList.remove('simulating');
        this._opts.viewer.disableDragging = false;
        this._opts.simStatus.textContent = '';
        this._opts.physicsModeOptions.hidden = true;

        this._simSource = robot.urdf
            ? { kind: 'url', urdfUrl: robot.urdf, pkgStr: robot.package ?? '' }
            : null;
        this._opts.simFloatBase.checked = !!robot.parts;
        $('physics-mode-bar').hidden = !robot.urdf;

        const sourceUrl = robot.parts ? `${robot.parts}.urdf` : robot.urdf!;

        if (robot.parts) {
            void this._loadViaBrowserAssembly(robot).catch(() => {});
        } else {
            this._opts.viewer.urdf = robot.urdf!;
        }

        this._opts.onRobotSelected(robot);
        this._opts.editorCtrl.setSourceUrl(sourceUrl);
        this._opts.editorCtrl.loadPartsInBackground();
    }

    private async _loadViaBrowserAssembly(robot: RobotConfig): Promise<void> {
        const base     = robot.parts!;
        const manifest = await fetch(`${base}.parts.json`).then(r => r.json()) as {
            robot: string; parts: string[];
        };
        const dir      = base.replace(/\/[^/]+$/, '');
        const partMap  = new Map(await Promise.all(manifest.parts.map(async f =>
            [f, await fetch(`${dir}/parts/${f}`).then(r => r.text())] as [string, string]
        )));
        this._opts.buildCtrl.init(manifest.robot, dir, partMap);
        const xml      = assembleURDF(manifest.robot, partMap)
            .replace(/filename="([^/"]+)"/g, `filename="${dir}/$1"`);
        if (this._partsBlobUrl) URL.revokeObjectURL(this._partsBlobUrl);
        this._partsBlobUrl  = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
        this._opts.viewer.urdf   = this._partsBlobUrl;

        this._simSource = { kind: 'xml', xml, base: dir + '/' };
        $('physics-mode-bar').hidden = false;

        this._opts.crudCtrl.clearBuildUI();
        const restored = this._opts.buildCtrl.restore();
        for (const { id, type } of restored) {
            const def = COMPONENT_CATALOG[type];
            if (def?.geomType === 'mesh') {
                const libEntry = LIBRARY.find(e => e.id === type);
                if (libEntry) {
                    libEntry.factory()
                        .then(({ generate }) => this._opts.buildCtrl.restoreMeshBlob(id, generate()))
                        .catch(err => console.warn('[restore] mesh regen failed for', id, err));
                }
            }
            this._opts.crudCtrl.renderComponentItem(id, type);
        }

        if (restored.length > 0) this._opts.syncSlidersFromController();
        this._opts.refreshPaletteCounts();
        this._opts.refreshBuildHeader();
    }
}
