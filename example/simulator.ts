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

/**
 * Minimal valid binary STL (1 tiny triangle at origin, normal = +Z).
 * Written to VFS when a collision mesh can't be fetched, so MuJoCo always
 * finds a file at the rewritten path and uses <inertial> for dynamics.
 */
const DUMMY_STL: Uint8Array = (() => {
    const buf = new ArrayBuffer(134); // 80 header + 4 count + 50 triangle
    const dv  = new DataView(buf);
    dv.setUint32(80, 1, true);          // 1 triangle
    dv.setFloat32(84, 0, true);         // normal x
    dv.setFloat32(88, 0, true);         // normal y
    dv.setFloat32(92, 1, true);         // normal z
    // vertex 1: (0, 0, 0) — all zeros, already set
    dv.setFloat32(108, 1e-6, true);     // vertex 2 x
    dv.setFloat32(120, 1e-6, true);     // vertex 3 y
    // attribute byte count: 0
    return new Uint8Array(buf);
})();

/** Return the root link — the one that never appears as a <child>. */
function findRootLink(xml: string): string {
    const links    = [...xml.matchAll(/<link\s+name="([^"]+)"/g)].map(m => m[1]);
    const children = new Set([...xml.matchAll(/<child\s+link="([^"]+)"/g)].map(m => m[1]));
    return links.find(l => !children.has(l)) ?? 'base_link';
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

    /**
     * Strip <visual> blocks, rewrite collision mesh paths to flat VFS names,
     * inject minimal <inertial> into any link with no mass or collision geometry
     * (handles visualization-only URDFs), and optionally fix the base to world.
     * Skips world injection if URDF already declares a "world" link.
     */
    private _prepareUrdf(xml: string, colPaths: Map<string, string>, floatBase: boolean): string {
        let out = xml.replace(/<visual[\s\S]*?<\/visual>/g, '');
        for (const [orig, flat] of colPaths) {
            out = out.replaceAll(`"${orig}"`, `"/working/${flat}"`);
        }

        // Expand self-closing <link .../> so the next step can inject inertial
        out = out.replace(/<link(\s[^>]*)\/>/g, '<link$1></link>');

        // Any link without <inertial> or <collision> gets a minimal mass so MuJoCo
        // can compile visualization-only URDFs that have no dynamics data.
        const MINIMAL_INERTIAL =
            '\n  <inertial>\n    <mass value="0.001"/>\n' +
            '    <inertia ixx="1e-6" ixy="0" ixz="0" iyy="1e-6" iyz="0" izz="1e-6"/>\n' +
            '  </inertial>';
        out = out.replace(/<link(\s[^>]*)>([\s\S]*?)<\/link>/g, (match, attrs, body) => {
            if (/<inertial\b/.test(body) || /<collision\b/.test(body)) return match;
            return `<link${attrs}>${body}${MINIMAL_INERTIAL}\n</link>`;
        });

        if (floatBase) {
            // Inject a floor plane so the robot lands instead of falling forever.
            // Z=-0.5 gives ~0.3 s of visible free-fall before contact.
            out = out.replace('</robot>', `
  <mujoco>
    <worldbody>
      <geom name="_floor" type="plane" pos="0 0 -0.5" size="0 0 1"
            condim="3" friction="1.0 0.005 0.0001"/>
    </worldbody>
  </mujoco>
</robot>`);
        } else if (!/<link\s[^>]*name="world"/.test(out)) {
            const root = findRootLink(out);
            out = out.replace('</robot>', `
  <link name="world"/>
  <joint name="_world_fixed" type="fixed">
    <parent link="world"/>
    <child link="${root}"/>
    <origin xyz="0 0 0" rpy="0 0 0"/>
  </joint>
</robot>`);
        }
        return out;
    }

    private async _processAndLoad(mj: MuJoCo, xml: string, baseUrl: string, pkgStr: string, floatBase: boolean): Promise<void> {
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

        // Fetch collision meshes → VFS.
        // Always write something at the rewritten path — dummy STL if fetch fails —
        // so MuJoCo never hits a missing-file error. Dynamics use <inertial>, not the mesh.
        for (const [origPath, flatName] of colPathMap) {
            const url = this._resolve(origPath, pkgStr, baseUrl);
            let data: Uint8Array = DUMMY_STL;
            if (url) {
                try {
                    const r = await fetch(url);
                    if (r.ok) data = new Uint8Array(await r.arrayBuffer());
                    else console.warn(`[simulator] mesh fetch ${r.status}: ${url}`);
                } catch (e) {
                    console.warn(`[simulator] mesh fetch failed: ${url}`, e);
                }
            } else {
                console.warn(`[simulator] unresolved mesh path: ${origPath}`);
            }
            mj.FS.writeFile(`/working/${flatName}`, data);
        }

        const processed = this._prepareUrdf(xml, colPathMap, floatBase);
        mj.FS.writeFile('/working/model.xml', processed);

        this._model?.delete();
        this._data?.delete();
        try {
            this._model = mj.MjModel.loadFromXML('/working/model.xml');
        } catch (e) {
            // Log the processed XML to help diagnose compile failures
            console.error('[simulator] MuJoCo compile failed. Processed URDF:\n', processed);
            throw e;
        }
        this._data = new mj.MjData(this._model);
    }

    private _floatBase = false;

    async load(urdfUrl: string, pkgStr: string, floatBase = false): Promise<void> {
        this.stop();
        this._floatBase = floatBase;
        const mj = await loadMuJoCo();
        this._mj = mj;
        const xml     = await fetch(urdfUrl).then(r => r.text());
        const baseUrl = urdfUrl.replace(/[^/]+$/, '');
        await this._processAndLoad(mj, xml, baseUrl, pkgStr, floatBase);
    }

    async loadFromXML(xml: string, baseUrl: string, pkgStr: string, floatBase = false): Promise<void> {
        this.stop();
        this._floatBase = floatBase;
        const mj = await loadMuJoCo();
        this._mj = mj;
        await this._processAndLoad(mj, xml, baseUrl, pkgStr, floatBase);
    }

    start(robot: URDFRobot, redraw: () => void): void {
        if (!this._model || !this._data || !this._mj) return;
        const { _mj: mj, _model: model, _data: data, _floatBase } = this;

        const loop = () => {
            this._raf = requestAnimationFrame(loop);
            mj.mj_step(model, data);

            // Float base: sync body 1 world pose onto the robot's Three.js object.
            // robot lives in viewer.world whose local space = URDF space (_applyUp handles
            // the global transform), so MuJoCo xpos/xquat map directly to robot.position/quaternion.
            if (_floatBase && data.xpos.length > 5) {
                robot.position.set(data.xpos[3], data.xpos[4], data.xpos[5]);
                // MuJoCo xquat layout: (w, x, y, z) per body; Three.js: (x, y, z, w)
                robot.quaternion.set(
                    data.xquat[5], data.xquat[6], data.xquat[7], data.xquat[4],
                );
            }

            for (let i = 0; i < model.njnt; i++) {
                const type = model.jnt_type[i];
                if (type !== 2 && type !== 3) continue; // slide or hinge only; skip free/ball
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
