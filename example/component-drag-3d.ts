import { Raycaster, Vector2, Vector3, Plane } from 'three';
import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import type { URDFManipulator } from '../src/index.js';
import type { ComponentCrudController } from './component-crud.js';

// ── Pre-allocated constants (Pattern 8 — no per-frame heap allocation) ────
const _planeNormal  = new Vector3();
const _camFwd       = new Vector3();
const _coplanarPt   = new Vector3();

// ── Component 3D drag state ───────────────────────────────────────────────
const _compDrag = {
    raycaster: new Raycaster(),
    mouse:     new Vector2(),
    hPlane:    new Plane(),    // horizontal — XY drag
    vPlane:    new Plane(),    // vertical   — Z drag (Shift)
    initHit:   new Vector3(),
    initVHit:  new Vector3(),
    newHit:    new Vector3(),
    id:        null as string | null,
    card:      null as HTMLElement | null,
    initX:     0, initY: 0, initZ: 0,
    curZ:      0, curX:  0, curY:  0,
    downX:     0, downY: 0,
};

const _SNAP = 0.001; // 1 mm grid snap for component drag

// ── Injected dependencies ─────────────────────────────────────────────────
let _buildCtrl: URDFBuildController;
let _viewer: URDFManipulator;
let _buildComponentsListEl: HTMLElement;
let _crudCtrl: ComponentCrudController;
let _hoverTip: HTMLElement;

export function initComponentDrag3D(
    buildCtrl: URDFBuildController,
    viewer: URDFManipulator,
    buildComponentsListEl: HTMLElement,
    crudCtrl: ComponentCrudController,
): void {
    _buildCtrl            = buildCtrl;
    _viewer               = viewer;
    _buildComponentsListEl = buildComponentsListEl;
    _crudCtrl             = crudCtrl;
    _hoverTip             = document.getElementById('build-hover-tip')!;

    viewer.renderer.domElement.addEventListener('pointerdown', _onPointerDown);
    viewer.renderer.domElement.addEventListener('pointermove', _onPointerMove);
    viewer.renderer.domElement.addEventListener('pointerup',   _onPointerUp);
    viewer.renderer.domElement.addEventListener('pointermove', _onHoverMove);
    viewer.renderer.domElement.addEventListener('pointerleave', _onPointerLeave);
}

function _updateNDC(e: PointerEvent): void {
    const rect = _viewer.renderer.domElement.getBoundingClientRect();
    _compDrag.mouse.set(
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
       -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    );
}

function _findId(obj: { parent: typeof obj | null; isURDFLink?: boolean; urdfName?: string }): string | null {
    const ids = _buildCtrl.componentIds;
    let curr = obj;
    while (curr) {
        if (curr.isURDFLink && curr.urdfName && ids.has(curr.urdfName)) return curr.urdfName;
        curr = curr.parent!;
    }
    return null;
}

function _onPointerDown(e: PointerEvent): void {
    if (!_buildCtrl.isCatalogActive) return;
    _updateNDC(e);
    _compDrag.raycaster.setFromCamera(_compDrag.mouse, _viewer.camera);
    const hits = _compDrag.raycaster.intersectObject(_viewer.scene, true);
    if (!hits.length) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = _findId(hits[0].object as any);
    if (!id || !_buildCtrl.isFixedComponent(id)) return;

    const xyz = _buildCtrl.getComponentXYZ(id);
    if (!xyz) return;

    // Horizontal drag plane at the component's height (Three.js Y = URDF Z)
    _planeNormal.set(0, 1, 0);
    _compDrag.hPlane.set(_planeNormal, -xyz.z);
    _compDrag.raycaster.ray.intersectPlane(_compDrag.hPlane, _compDrag.initHit);

    // Vertical drag plane facing the camera (for Shift+drag Z axis)
    _viewer.camera.getWorldDirection(_camFwd);
    _camFwd.y = 0; _camFwd.normalize();
    _coplanarPt.set(xyz.x, xyz.z, -xyz.y);
    _compDrag.vPlane.setFromNormalAndCoplanarPoint(_camFwd, _coplanarPt);
    _compDrag.raycaster.ray.intersectPlane(_compDrag.vPlane, _compDrag.initVHit);

    _compDrag.id    = id;
    _compDrag.initX = xyz.x;
    _compDrag.initY = xyz.y;
    _compDrag.initZ = xyz.z;
    _compDrag.curZ  = xyz.z;
    _compDrag.curX  = xyz.x;
    _compDrag.curY  = xyz.y;

    _buildCtrl.startComponentDrag(id);
    _viewer.controls.enabled = false;

    _compDrag.downX = e.clientX;
    _compDrag.downY = e.clientY;

    _compDrag.card = _buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
    _compDrag.card?.classList.add('dragging');
    _crudCtrl.selectCompCard(id);

    _viewer.renderer.domElement.setPointerCapture(e.pointerId);
    e.stopPropagation();
}

function _onPointerMove(e: PointerEvent): void {
    if (!_compDrag.id) return;
    _updateNDC(e);
    _compDrag.raycaster.setFromCamera(_compDrag.mouse, _viewer.camera);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const joint = (_viewer.robot as any)?.joints[`${_compDrag.id}_joint`];
    const inp   = getComponentInputs().get(_compDrag.id);

    _viewer.renderer.domElement.style.cursor = e.shiftKey ? 'ns-resize' : 'grabbing';

    if (e.shiftKey) {
        if (!_compDrag.raycaster.ray.intersectPlane(_compDrag.vPlane, _compDrag.newHit)) return;
        _compDrag.curZ = Math.round((_compDrag.initZ + (_compDrag.newHit.y - _compDrag.initVHit.y)) / _SNAP) * _SNAP;
        if (joint) joint.position.set(_compDrag.curX, _compDrag.curY, _compDrag.curZ);
        if (inp) inp['z'].value = _compDrag.curZ.toFixed(4);
    } else {
        if (!_compDrag.raycaster.ray.intersectPlane(_compDrag.hPlane, _compDrag.newHit)) return;
        _compDrag.curX = Math.round((_compDrag.initX + (_compDrag.newHit.x - _compDrag.initHit.x)) / _SNAP) * _SNAP;
        _compDrag.curY = Math.round((_compDrag.initY - (_compDrag.newHit.z - _compDrag.initHit.z)) / _SNAP) * _SNAP;
        if (joint) joint.position.set(_compDrag.curX, _compDrag.curY, _compDrag.curZ);
        if (inp) { inp['x'].value = _compDrag.curX.toFixed(4); inp['y'].value = _compDrag.curY.toFixed(4); }
    }
}

function _onPointerUp(e: PointerEvent): void {
    if (!_compDrag.id) return;
    const wasDrag = Math.hypot(e.clientX - _compDrag.downX, e.clientY - _compDrag.downY) > 8;
    _buildCtrl.finishComponentDrag(_compDrag.id, _compDrag.curX, _compDrag.curY, _compDrag.curZ);
    _viewer.controls.enabled = true;
    _viewer.renderer.domElement.style.cursor = '';
    _compDrag.card?.classList.remove('dragging');

    if (!wasDrag && _compDrag.card) {
        const cardId = _compDrag.card.dataset.id;
        if (cardId) _crudCtrl.selectCompCard(cardId);
        _compDrag.card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    _compDrag.card = null;
    _compDrag.id   = null;
}

let _hoverTipRaf = 0;

function _onHoverMove(e: PointerEvent): void {
    if (!_buildCtrl.isCatalogActive || _compDrag.id) { _hoverTip.style.display = 'none'; return; }
    cancelAnimationFrame(_hoverTipRaf);
    _hoverTipRaf = requestAnimationFrame(() => {
        _updateNDC(e);
        _compDrag.raycaster.setFromCamera(_compDrag.mouse, _viewer.camera);
        const hits = _compDrag.raycaster.intersectObject(_viewer.scene, true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const id = hits.length ? _findId(hits[0].object as any) : null;
        if (id) {
            const def = COMPONENT_CATALOG[_buildCtrl.getComponentData(id)?.type ?? ''];
            _hoverTip.textContent = def ? `${def.label} #${id.split('_').pop()}` : id;
            _hoverTip.style.display = 'block';
            _hoverTip.style.left = (e.clientX + 12) + 'px';
            _hoverTip.style.top  = (e.clientY - 28) + 'px';
        } else {
            _hoverTip.style.display = 'none';
        }
    });
}

function _onPointerLeave(): void {
    _hoverTip.style.display = 'none';
}

function getComponentInputs(): Map<string, Record<string, HTMLInputElement>> {
    return _crudCtrl?.componentInputs ?? new Map();
}
