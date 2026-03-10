import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import type { URDFManipulator } from '../src/index.js';
import type { URDFBuildController } from './build.js';
import type { ComponentCrudController } from './component-crud.js';

// ── Gizmo mode toggle button ───────────────────────────────────────────────
let _modeBtn: HTMLButtonElement | null = null;

function _getModeBtn(): HTMLButtonElement {
    if (_modeBtn) return _modeBtn;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'gizmo-mode-btn';
    btn.title = 'Toggle gizmo mode (translate / rotate)';
    btn.textContent = 'T';
    btn.className = 'gizmo-mode-btn';
    btn.style.display = 'none';
    document.querySelector('main')?.appendChild(btn);
    _modeBtn = btn;
    return btn;
}

// ── GizmoController ────────────────────────────────────────────────────────

export class GizmoController {
    private readonly _tc: TransformControls;
    private readonly _viewer: URDFManipulator;
    private readonly _buildCtrl: URDFBuildController;
    private readonly _crudCtrl: ComponentCrudController;

    private _attachedId: string | null = null;
    private _mode: 'translate' | 'rotate' = 'translate';

    constructor(
        viewer: URDFManipulator,
        buildCtrl: URDFBuildController,
        crudCtrl: ComponentCrudController,
    ) {
        this._viewer    = viewer;
        this._buildCtrl = buildCtrl;
        this._crudCtrl  = crudCtrl;

        this._tc = new TransformControls(viewer.camera, viewer.renderer.domElement);
        this._tc.setSize(0.6);        // subtle — fits small robot scale
        // Do NOT add to scene here — added/removed in onBuildOpen/onBuildClose so its
        // invisible picker meshes don't block URDFDragControls raycasting on other tabs.

        // Keep the viewer render loop informed of gizmo changes
        this._tc.addEventListener('change', () => viewer.redraw());

        // Disable / re-enable orbit while dragging with the gizmo
        this._tc.addEventListener('dragging-changed', (e) => {
            const dragging = (e as { value: boolean }).value;
            viewer.controls.enabled = !dragging;

            if (dragging) {
                buildCtrl.startComponentDrag();
            } else {
                this._onDragEnd();
            }
        });

        // Mode toggle button
        const btn = _getModeBtn();
        btn.addEventListener('click', () => {
            this._mode = this._mode === 'translate' ? 'rotate' : 'translate';
            this._tc.setMode(this._mode);
            btn.textContent = this._mode === 'translate' ? 'T' : 'R';
        });
    }

    // ── Public API ─────────────────────────────────────────────────────────

    attach(id: string): void {
        const joint = this._findJoint(id);
        if (!joint) { this.detach(); return; }

        const buildOpen = document.body.classList.contains('build-open');
        this._attachedId = id;
        this._tc.attach(joint);
        this._tc.setMode(this._mode);
        this._tc.visible = buildOpen;
        this._showModeBtn(buildOpen);
        this._viewer.redraw();
    }

    detach(): void {
        this._attachedId = null;
        this._tc.detach();
        this._tc.visible = false;
        this._showModeBtn(false);
        this._viewer.redraw();
        // Keep TC in scene while Build tab is open (user may reselect); it will be
        // removed by onBuildClose when the tab switches.
    }

    /** Call when the Build tab opens — add gizmo to scene and re-show if selected. */
    onBuildOpen(): void {
        this._viewer.scene.add(this._tc);
        if (this._attachedId) {
            this._tc.visible = true;
            this._showModeBtn(true);
        }
        this._viewer.redraw();
    }

    /** Call when the Build tab closes — remove gizmo from scene so its picker meshes
     *  don't block URDFDragControls raycasting on the Inspect tab. */
    onBuildClose(): void {
        this._viewer.scene.remove(this._tc);
        this._showModeBtn(false);
        this._viewer.redraw();
    }

    // ── Private helpers ────────────────────────────────────────────────────

    private _showModeBtn(visible: boolean): void {
        _getModeBtn().style.display = visible ? '' : 'none';
    }

    private _findJoint(id: string): import('three').Object3D | null {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this._viewer.robot as any)?.joints?.[`${id}_joint`] ?? null;
    }

    private _onDragEnd(): void {
        const id = this._attachedId;
        if (!id) return;

        const joint = this._findJoint(id);
        if (!joint) return;

        const inp = this._crudCtrl.componentInputs.get(id);

        if (this._mode === 'translate') {
            // joint.position is in URDF coordinate space (parent-local, before world rotation)
            const p = joint.position;
            const SNAP = 0.001;
            const sx = Math.round(p.x / SNAP) * SNAP;
            const sy = Math.round(p.y / SNAP) * SNAP;
            const sz = Math.round(p.z / SNAP) * SNAP;
            this._buildCtrl.finishComponentDrag(id, sx, sy, sz);
            if (inp) {
                inp['x'].value = sx.toFixed(4);
                inp['y'].value = sy.toFixed(4);
                inp['z'].value = sz.toFixed(4);
            }
        } else {
            // Rotate mode: read the Euler angles and commit them to the build state
            const r = joint.rotation;
            const rx = parseFloat(r.x.toFixed(4));
            const ry = parseFloat(r.y.toFixed(4));
            const rz = parseFloat(r.z.toFixed(4));
            const data = this._buildCtrl.getComponentData(id);
            if (data) this._buildCtrl.updateComponent(id, { ...data, rx, ry, rz });
            if (inp) {
                if (inp['rx']) inp['rx'].value = rx.toFixed(4);
                if (inp['ry']) inp['ry'].value = ry.toFixed(4);
                if (inp['rz']) inp['rz'].value = rz.toFixed(4);
            }
        }
    }
}
