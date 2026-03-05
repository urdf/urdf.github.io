import type { URDFRobot } from '../src/URDFClasses.js';

type MuJoCo = any; // mujoco-js has no TS types

let _mujoco: MuJoCo | null = null;

async function loadMuJoCo(): Promise<MuJoCo> {
    if (_mujoco) return _mujoco;
    const { default: load } = await import(
        /* @vite-ignore */
        'https://cdn.jsdelivr.net/npm/mujoco-js@0.0.7/dist/mujoco_wasm.js'
    );
    _mujoco = await load();
    _mujoco.FS.mkdir('/working');
    _mujoco.FS.mount(_mujoco.MEMFS, { root: '.' }, '/working');
    return _mujoco;
}

export class MuJoCoSimulator {
    private _model: any = null;
    private _data:  any = null;
    private _raf = 0;
    private _mj: MuJoCo | null = null;

    /** Resolve package:// URIs using the viewer's colon-separated package string. */
    private _resolve(path: string, pkgStr: string, urdfBase: string): string | null {
        if (!path.startsWith('package://')) {
            if (path.startsWith('/') || path.startsWith('http')) return path;
            return urdfBase + path;
        }
        const [pkg, rel] = path.slice('package://'.length).split(/\/(.+)/);
        for (const entry of pkgStr.split(';')) {
            const [name, base] = entry.split(':').map(s => s.trim());
            if (name === pkg) return `${base}/${rel}`;
        }
        return null;
    }

    /** Strip <visual> blocks; rewrite collision mesh paths to flat VFS names. */
    private _prepareUrdf(xml: string, colPaths: Map<string, string>): string {
        let out = xml.replace(/<visual[\s\S]*?<\/visual>/g, '');
        for (const [orig, flat] of colPaths) {
            out = out.replaceAll(`"${orig}"`, `"/working/${flat}"`);
        }
        return out;
    }

    async load(urdfUrl: string, pkgStr: string): Promise<void> {
        this.stop();
        const mj = await loadMuJoCo();
        this._mj = mj;

        const xml = await fetch(urdfUrl).then(r => r.text());
        const urdfBase = urdfUrl.replace(/[^/]+$/, '');

        // Collect unique collision STL/OBJ paths
        const colPathMap = new Map<string, string>();
        let idx = 0;
        for (const block of xml.matchAll(/<collision[\s\S]*?<\/collision>/g)) {
            const fn = block[0].match(/filename="([^"]+)"/)?.[1];
            if (!fn) continue;
            const ext = fn.split('.').pop()?.toLowerCase() ?? '';
            if (ext !== 'stl' && ext !== 'obj') continue;
            if (!colPathMap.has(fn)) colPathMap.set(fn, `col_${idx++}.stl`);
        }

        // Fetch collision meshes → VFS
        for (const [origPath, flatName] of colPathMap) {
            const url = this._resolve(origPath, pkgStr, urdfBase);
            if (!url) continue;
            try {
                const buf = await fetch(url).then(r => r.arrayBuffer());
                mj.FS.writeFile(`/working/${flatName}`, new Uint8Array(buf));
            } catch { /* missing mesh — MuJoCo uses default inertia */ }
        }

        // Write processed URDF → VFS
        mj.FS.writeFile('/working/model.xml', this._prepareUrdf(xml, colPathMap));

        this._model?.delete();
        this._data?.delete();
        this._model = mj.MjModel.loadFromXML('/working/model.xml');
        this._data  = new mj.MjData(this._model);
    }

    start(robot: URDFRobot, redraw: () => void): void {
        if (!this._model || !this._data || !this._mj) return;
        const { _mj: mj, _model: model, _data: data } = this;

        const loop = () => {
            this._raf = requestAnimationFrame(loop);
            mj.mj_step(model, data);

            for (let i = 0; i < model.njnt; i++) {
                const type = model.jnt_type[i];
                if (type !== 2 && type !== 3) continue; // slide or hinge only
                const name = mj.mj_id2name(model, mj.mjtObj.mjOBJ_JOINT.value, i);
                if (name && robot.joints[name]) {
                    robot.setJointValue(name, data.qpos[model.jnt_qposadr[i]]);
                }
            }
            redraw();
        };
        loop();
    }

    stop(): void {
        cancelAnimationFrame(this._raf);
        this._raf = 0;
        this._model?.delete(); this._model = null;
        this._data?.delete();  this._data  = null;
    }
}
