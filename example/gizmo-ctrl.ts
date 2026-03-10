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
    Object.assign(btn.style, {
        position:    'absolute',
        bottom:      '8px',
        right:       '8px',
        zIndex:      '20',
        padding:     '2px 6px',
        fontSize:    '0.625rem',
        fontFamily:  'var(--font-mono, monospace)',
        fontWeight:  '600',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        background:  'var(--surface-2, #2a2a2a)',
        color:       'var(--text-1, #e8e8e8)',
        border:      '1px solid var(--border, #3a3a3a)',
        borderRadius: '3px',
        cursor:      'pointer',
        lineHeight:  '1.4',
        display:     'none',
    });
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
        this._tc.visible = false;
        viewer.scene.add(this._tc);

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

        this._attachedId = id;
        this._tc.attach(joint);
        this._tc.setMode(this._mode);
        this._tc.visible = document.body.classList.contains('build-open');

        const btn = _getModeBtn();
        btn.style.display = document.body.classList.contains('build-open') ? '' : 'none';

        this._viewer.redraw();
    }

    detach(): void {
        this._attachedId = null;
        this._tc.detach();
        this._tc.visible = false;
        _getModeBtn().style.display = 'none';
        this._viewer.redraw();
    }

    /** Call when the Build tab opens — re-show gizmo if something is selected. */
    onBuildOpen(): void {
        if (this._attachedId) {
            this._tc.visible = true;
            _getModeBtn().style.display = '';
        }
        this._viewer.redraw();
    }

    /** Call when the Build tab closes — hide gizmo without detaching. */
    onBuildClose(): void {
        this._tc.visible = false;
        _getModeBtn().style.display = 'none';
        this._viewer.redraw();
    }

    // ── Private helpers ────────────────────────────────────────────────────

    private _findJoint(id: string): import('three').Object3D | null {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this._viewer.robot as any)?.joints?.[`${id}_joint`] ?? null;
    }

    private _onDragEnd(): void {
        const id = this._attachedId;
        if (!id) return;

        const joint = this._findJoint(id);
        if (!joint) return;

        // joint.position is in URDF coordinate space (parent-local, before world rotation)
        // because the +Z up-axis rotation is applied at the world container level above the robot.
        const p = joint.position;
        const x = p.x;
        const y = p.y;
        const z = p.z;

        // Snap to 1 mm grid (matches the drag-3d SNAP constant)
        const SNAP = 0.001;
        const sx = Math.round(x / SNAP) * SNAP;
        const sy = Math.round(y / SNAP) * SNAP;
        const sz = Math.round(z / SNAP) * SNAP;

        this._buildCtrl.finishComponentDrag(id, sx, sy, sz);

        // Sync the inspector number inputs
        const inp = this._crudCtrl.componentInputs.get(id);
        if (inp) {
            inp['x'].value = sx.toFixed(4);
            inp['y'].value = sy.toFixed(4);
            inp['z'].value = sz.toFixed(4);
        }
    }
}
