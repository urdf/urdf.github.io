import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import { URDFChatController } from './chat.js';
import type { ChatCallbacks } from './chat.js';
import type { GestureController } from './gesture.js';
import { GridHelper } from 'three';
import { MuJoCoSimulator } from './simulator.js';
import { SimController } from './sim-ctrl.js';
import { initPanel } from './panel.js';

// ── Module imports for extracted concerns ─────────────────────────────────
import { BuildSlidersController } from './build-sliders.js';
import { InspectorController } from './inspector.js';
import { ComponentCrudController } from './component-crud.js';
import { initComponentDrag3D } from './component-drag-3d.js';
import { LibraryTabController } from './library-tab.js';
import { LIBRARY } from '../src/generators/components/index.js';
import { RobotLoader, catalogToConfig } from './robot-loader.js';
import type { RobotConfig, CatalogEntry } from './robot-loader.js';
import { $ } from './dom-utils.js';
import { initJointPanel, makeScrubLabel } from './joint-panel.js';
import { openPanel, openGestureHint } from './float-panel.js';
import { RobotCarousel } from './robot-carousel.js';
import { GizmoController } from './gizmo-ctrl.js';

customElements.define('urdf-viewer', URDFManipulator);

// ── Script component defaults ──────────────────────────────────────────────

// Synchronous cube STL used as placeholder when the Script palette button is clicked.
// The Worker re-evaluates the script immediately after the card renders, so this is
// only visible for a frame or two.
function makeDefaultCubeSTL(): ArrayBuffer {
    const h = 0.005; // half of 10 mm
    const faces: [number,number,number][][] = [
        [[-h,-h,h],[h,-h,h],[h,h,h]], [[-h,-h,h],[h,h,h],[-h,h,h]],
        [[h,-h,-h],[-h,-h,-h],[-h,h,-h]], [[h,-h,-h],[-h,h,-h],[h,h,-h]],
        [[h,-h,-h],[h,-h,h],[h,h,h]], [[h,-h,-h],[h,h,h],[h,h,-h]],
        [[-h,-h,h],[-h,-h,-h],[-h,h,-h]], [[-h,-h,h],[-h,h,-h],[-h,h,h]],
        [[-h,h,-h],[h,h,-h],[h,h,h]], [[-h,h,-h],[h,h,h],[-h,h,h]],
        [[h,-h,-h],[-h,-h,-h],[-h,-h,h]], [[h,-h,-h],[-h,-h,h],[h,-h,h]],
    ];
    const buf = new ArrayBuffer(84 + faces.length * 50);
    const dv  = new DataView(buf);
    dv.setUint32(80, faces.length, true);
    let off = 84;
    for (const [a, b, c] of faces) {
        const ex=b[0]-a[0], ey=b[1]-a[1], ez=b[2]-a[2];
        const fx=c[0]-a[0], fy=c[1]-a[1], fz=c[2]-a[2];
        const nx=ey*fz-ez*fy, ny=ez*fx-ex*fz, nz=ex*fy-ey*fx;
        const L = Math.sqrt(nx*nx+ny*ny+nz*nz) || 1;
        for (const v of [nx/L,ny/L,nz/L,...a,...b,...c])
            { dv.setFloat32(off,v,true); off+=4; }
        dv.setUint16(off,0,true); off+=2;
    }
    return buf;
}

// Default script shown in the editor when a Script component is first added.
// Returns binary STL (ArrayBuffer). Format: 84-byte header + N×50-byte triangles
// (12-byte normal + 3×12-byte vertices + 2-byte attribute = 50 bytes each, float32 LE).
const DEFAULT_SCRIPT = `(function () {
  const h = 0.005; // half-size → 10 mm cube
  const t = [
    [[-h,-h,h],[h,-h,h],[h,h,h]], [[-h,-h,h],[h,h,h],[-h,h,h]],
    [[h,-h,-h],[-h,-h,-h],[-h,h,-h]], [[h,-h,-h],[-h,h,-h],[h,h,-h]],
    [[h,-h,-h],[h,-h,h],[h,h,h]], [[h,-h,-h],[h,h,h],[h,h,-h]],
    [[-h,-h,h],[-h,-h,-h],[-h,h,-h]], [[-h,-h,h],[-h,h,-h],[-h,h,h]],
    [[-h,h,-h],[h,h,-h],[h,h,h]], [[-h,h,-h],[h,h,h],[-h,h,h]],
    [[h,-h,-h],[-h,-h,-h],[-h,-h,h]], [[h,-h,-h],[-h,-h,h],[h,-h,h]],
  ];
  const buf = new ArrayBuffer(84 + t.length * 50);
  const dv  = new DataView(buf);
  dv.setUint32(80, t.length, true);
  let off = 84;
  for (const [a, b, c] of t) {
    const ex=b[0]-a[0],ey=b[1]-a[1],ez=b[2]-a[2];
    const fx=c[0]-a[0],fy=c[1]-a[1],fz=c[2]-a[2];
    const nx=ey*fz-ez*fy, ny=ez*fx-ex*fz, nz=ex*fy-ey*fx;
    const L=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
    for (const v of [nx/L,ny/L,nz/L,...a,...b,...c])
      { dv.setFloat32(off,v,true); off+=4; }
    dv.setUint16(off,0,true); off+=2;
  }
  return buf;
})`;

const simulator = new MuJoCoSimulator();

const viewer           = $<URDFManipulator>('viewer');
const jointsPanel      = $('joints');
const robotsPanel      = $('robots');
const loadingEl        = $('loading');
const partLabel        = $('part-label');

const gestureToggleBtn = $<HTMLButtonElement>('gesture-toggle');
const gestureOverlay   = $<HTMLCanvasElement>('gesture-overlay');
const gestureVideo     = $<HTMLVideoElement>('gesture-video');
const gestureSectionEl = $<HTMLDetailsElement>('gesture-section');

const editorPanelEl    = $('editor-panel');
const buildNoticeEl    = $('build-notice');

const editorCtrl = new URDFEditorController(viewer, editorPanelEl);
const buildCtrl  = new URDFBuildController(viewer, buildNoticeEl);

// ── Chat controller (constructed after all helpers are defined) ────────────
let chatCtrl: URDFChatController;

// Viewport grid: 2m × 2m, 100mm divisions — always visible for spatial reference
const _viewportGrid = new GridHelper(2, 20, 0x888888, 0x444444);
_viewportGrid.raycast = () => {};
// Ground grid: 0.5m × 0.5m, 20mm divisions — visible only in Build mode
const _buildGrid = new GridHelper(0.5, 25, 0x666666, 0x3d3d3d);
_buildGrid.visible = false;
_buildGrid.raycast = () => {};
requestAnimationFrame(() => { viewer.scene.add(_viewportGrid); viewer.scene.add(_buildGrid); });

const chatInput = $<HTMLTextAreaElement>('chat-input');
function _setActiveTab(id: string): void {
    for (const btn of document.querySelectorAll<HTMLButtonElement>('.tab-btn'))
        btn.setAttribute('aria-selected', btn.id === id ? 'true' : 'false');
}

$('tab-inspect').addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.close();
    gizmoCtrl?.onBuildClose();
    _buildGrid.visible = false;
    _viewportGrid.visible = true;
    _setActiveTab('tab-inspect');
});
$('tab-editor').addEventListener('click', () => {
    buildCtrl.close();
    gizmoCtrl?.onBuildClose();
    editorCtrl.open();
    _buildGrid.visible = false;
    _viewportGrid.visible = true;
    chatInput.placeholder = 'Ask AI to edit this URDF…';
    _setActiveTab('tab-editor');
});
$('tab-build').addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.open();
    gizmoCtrl?.onBuildOpen();
    _viewportGrid.visible = false;
    _buildGrid.visible = true;
    _buildGrid.position.y = viewer.shadowPlane.position.y;
    chatInput.placeholder = 'Ask AI to add or modify components…';
    libTabCtrl.buildLibraryGrid();
    _setActiveTab('tab-build');
});

const ignoreLimitsEl  = $<HTMLInputElement>('ignore-limits');
const showCollisionEl = $<HTMLInputElement>('show-collision');
const displayShadowEl = $<HTMLInputElement>('display-shadow');
const upAxisEl        = $<HTMLSelectElement>('up-axis');

let ROBOTS: RobotConfig[] = [];
// Instantiated after refreshBuildHeader / syncSlidersFromController are defined (see below).
// eslint-disable-next-line prefer-const
let robotLoader: RobotLoader;

const robotTrackSlider = $('robot-track-slider');
// robotCarousel instantiated later (after buildCtrl / crudCtrl / helpers are ready).
// eslint-disable-next-line prefer-const
let robotCarousel: RobotCarousel;

robotTrackSlider.style.transition = 'none';
fetch('/robots/catalog.json')
    .then(r => r.ok ? r.json() as Promise<{ version: number; robots: CatalogEntry[] }> : Promise.reject())
    .then(catalog => { ROBOTS = catalog.robots.map(catalogToConfig); })
    .catch(() => {
        ROBOTS = [
            { id: 'robot-car',         name: 'Robot Car',          label: 'Car',      parts: '/robots/robot-car/robot-car',                                         up: '+Z' },
            { id: 'T12',               name: 'T12',                label: 'T12',      urdf: '/robots/T12/urdf/T12.URDF',                                            up: '-Z' },
            { id: 'TriATHLETE',        name: 'TriATHLETE',         label: 'Tri',      urdf: '/robots/TriATHLETE/urdf/TriATHLETE.URDF',                              up: '-Z' },
            { id: 'laikago',           name: 'Laikago',            label: 'Laikago',  urdf: '/robots/laikago/urdf/laikago.urdf',                                    up: '+Z' },
            { id: 'open_manipulator_x',name: 'Open Manipulator X', label: 'OM-X',     urdf: '/robots/open_manipulator_x/open_manipulator_x.urdf', package: 'open_manipulator_description: /robots/open_manipulator_x', up: '+Z' },
            { id: 'so_arm100',         name: 'SO-ARM100',          label: 'SO-100',   urdf: '/robots/so_arm100/so100.urdf',                                         up: '+Z' },
            { id: 'simple_humanoid',   name: 'Simple Humanoid',    label: 'Humanoid', urdf: '/robots/simple_humanoid/simple_humanoid.urdf',                         up: '+Z' },
            { id: 'spryped',           name: 'Spryped',            label: 'Spryped',  urdf: '/robots/spryped/urdf/spryped.urdf', package: 'spryped_urdf_rev06: /robots/spryped', up: '+Z' },
        ];
    })
    .finally(() => {
        robotCarousel.buildRobotButtons(ROBOTS);
        const paramId = new URLSearchParams(location.search).get('robot');
        const startIdx = paramId ? Math.max(0, ROBOTS.findIndex(r => r.id === paramId)) : 0;
        robotLoader.load(ROBOTS[startIdx], startIdx);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            robotTrackSlider.style.transition = '';
        }));
    });

document.addEventListener('keydown', (e: KeyboardEvent) => {
    // ── Build-mode keys ───────────────────────────────────────────────────
    if (buildCtrl.isActive) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); buildCtrl.undo(); }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); buildCtrl.redo(); }

        const selId = crudCtrl.getBuildSelCompId();
        if (selId && (e.key === 'Delete' || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey) {
            const el = document.activeElement as HTMLElement;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
            e.preventDefault();
            const card = buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${selId}"]`);
            buildCtrl.removeComponent(selId);
            crudCtrl.deselectComp();
            crudCtrl.removeOptionFromParentSelects(selId);
            card?.remove();
            refreshPaletteCounts();
            return;
        }

        if (e.key === 'Escape' && crudCtrl.getBuildSelCompId()) {
            const el = document.activeElement as HTMLElement;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
            crudCtrl.deselectComp();
            return;
        }

        if (selId && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const c = buildCtrl.getComponentData(selId);
            if (!c) return;
            const d = 0.001;
            let { x, y, z } = c;
            if (e.shiftKey) {
                if (e.key === 'ArrowUp')   z += d;
                if (e.key === 'ArrowDown') z -= d;
            } else {
                if (e.key === 'ArrowLeft')  y += d;
                if (e.key === 'ArrowRight') y -= d;
                if (e.key === 'ArrowUp')    x -= d;
                if (e.key === 'ArrowDown')  x += d;
            }
            buildCtrl.updateComponent(selId, { x, y, z });
            const inp = crudCtrl.componentInputs.get(selId);
            if (inp) { inp['x'].value = x.toFixed(4); inp['y'].value = y.toFixed(4); inp['z'].value = z.toFixed(4); }
            return;
        }
    }

    // ── Robot carousel navigation (ArrowLeft / ArrowRight) ────────────────
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const el = document.activeElement as HTMLElement;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const idx = (robotLoader.currentRobotIndex + dir + ROBOTS.length) % ROBOTS.length;
    robotLoader.load(ROBOTS[idx], idx);
});

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

// ── Simulation controller ─────────────────────────────────────────────────
const simCtrl = new SimController({
    simulator,
    viewer,
    playBtn:     $<HTMLButtonElement>('sim-play-btn'),
    stopBtn:     $<HTMLButtonElement>('sim-stop-btn'),
    resetBtn:    $<HTMLButtonElement>('sim-reset-btn'),
    statusEl:    $('sim-status'),
    floatBaseEl: $<HTMLInputElement>('sim-float-base'),
    speedEl:     $<HTMLInputElement>('sim-speed'),
});

displayShadowEl.checked = viewer.displayShadow;
upAxisEl.value = viewer.up;

function toLabel(jointName: string): string {
    return jointName
        .replace(/_joint$/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function linkNameFor(jointName: string): string {
    return jointName.replace(/_joint$/, '');
}

const inspectorEl      = $('inspector');
const inspectorName    = $('inspector-name');
const inspectorX       = $<HTMLInputElement>('inspector-x');
const inspectorY       = $<HTMLInputElement>('inspector-y');
const inspectorZ       = $<HTMLInputElement>('inspector-z');
const inspectorScaleX  = $<HTMLInputElement>('inspector-scale-x');
const inspectorScaleY  = $<HTMLInputElement>('inspector-scale-y');
const inspectorScaleZ  = $<HTMLInputElement>('inspector-scale-z');
const inspectorSnippet = $('inspector-snippet');
const inspectorCopy    = $<HTMLButtonElement>('inspector-copy');
const inspectorClose   = $('inspector-close');

let selectedJoint: string | null = null;
let hoveredJointName: string | null = null;
let gestureCtrl: GestureController | null = null;
let gizmoCtrl: GizmoController | null = null;

function fmt(v: number): string { return v.toFixed(4); }

function refreshSnippet(): void {
    if (!selectedJoint || !viewer.robot) return;
    const joint = viewer.robot.joints[selectedJoint];
    if (!joint) return;
    const p = joint.position;
    const r = joint.rotation;
    const sx = parseFloat(inspectorScaleX.value);
    const sy = parseFloat(inspectorScaleY.value);
    const sz = parseFloat(inspectorScaleZ.value);
    const anyScale = Math.abs(sx - 1) > 0.005 || Math.abs(sy - 1) > 0.005 || Math.abs(sz - 1) > 0.005;
    const uniform = Math.abs(sx - sy) < 0.001 && Math.abs(sy - sz) < 0.001;
    let scaleLine = '';
    if (anyScale && uniform) scaleLine = `\nscale: ${sx.toFixed(2)}\u00d7`;
    else if (anyScale)       scaleLine = `\nscale: ${sx.toFixed(2)} ${sy.toFixed(2)} ${sz.toFixed(2)}`;
    inspectorSnippet.textContent =
        `[${selectedJoint}]\n` +
        `<origin xyz="${fmt(p.x)} ${fmt(p.y)} ${fmt(p.z)}"\n` +
        `        rpy="${fmt(r.x)} ${fmt(r.y)} ${fmt(r.z)}"/>${scaleLine}`;
}

let _snippetDebounce = 0;

function applyInspector(): void {
    if (!selectedJoint || !viewer.robot) return;
    const joint = viewer.robot.joints[selectedJoint];
    if (!joint) return;
    joint.position.set(
        parseFloat(inspectorX.value) || 0,
        parseFloat(inspectorY.value) || 0,
        parseFloat(inspectorZ.value) || 0,
    );
    const sx = parseFloat(inspectorScaleX.value) || 1;
    const sy = parseFloat(inspectorScaleY.value) || 1;
    const sz = parseFloat(inspectorScaleZ.value) || 1;
    const link = viewer.robot.links[linkNameFor(selectedJoint)];
    if (link) link.scale.set(sx, sy, sz);
    viewer.redraw();
    clearTimeout(_snippetDebounce);
    _snippetDebounce = window.setTimeout(refreshSnippet, 150);
}

function selectPart(jointName: string | null): void {
    selectedJoint = jointName;
    const joint = jointName ? viewer.robot?.joints[jointName] : null;
    if (!joint) {
        inspectorEl.style.display = 'none';
        if (crudCtrl.getBuildSelPartName()) { crudCtrl.setBuildSelPartName(null); crudCtrl.updateContextPill(null); }
        return;
    }

    inspectorEl.style.display = '';
    inspectorName.textContent = toLabel(jointName);

    const p = joint.position;
    inspectorX.value = fmt(p.x);
    inspectorY.value = fmt(p.y);
    inspectorZ.value = fmt(p.z);

    const link = viewer.robot!.links[linkNameFor(jointName)];
    inspectorScaleX.value = String(link ? link.scale.x : 1);
    inspectorScaleY.value = String(link ? link.scale.y : 1);
    inspectorScaleZ.value = String(link ? link.scale.z : 1);

    refreshSnippet();
    gestureCtrl?.setSelectedJoint(jointName);
    document.querySelectorAll<HTMLElement>('.fp-gesture-active').forEach(el => el.classList.remove('fp-gesture-active'));

    if (document.body.classList.contains('build-open')) {
        const baseId = jointName.endsWith('_joint') ? jointName.slice(0, -6) : jointName;
        if (!buildCtrl.componentIds.has(baseId)) {
            const buildComponentsListEl = $('build-components-list');
            for (const el of buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
                el.classList.remove('selected');
            $('build-inspector').hidden = true;
            crudCtrl.setBuildSelPartName(jointName);
            crudCtrl.updateContextPill({
                label:     toLabel(jointName),
                color:     'var(--text-3)',
                onDismiss: () => selectPart(null),
            });
        }
    }
}

for (const input of [inspectorX, inspectorY, inspectorZ, inspectorScaleX, inspectorScaleY, inspectorScaleZ]) {
    input.addEventListener('input', applyInspector);
    const label = input.closest('.inspector-row')?.querySelector('label') as HTMLElement | null;
    if (label) makeScrubLabel(label, input);
}

inspectorClose.addEventListener('click', () => selectPart(null));

inspectorCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(inspectorSnippet.textContent ?? '');
    inspectorCopy.textContent = 'Copied!';
    setTimeout(() => { inspectorCopy.textContent = 'Copy'; }, 1500);
});

viewer.addEventListener('click', () => {
    if (!hoveredJointName) return;
    selectPart(hoveredJointName);
    if (editorCtrl.isOpen) void editorCtrl.jumpToJoint(hoveredJointName);
});

const urdfErrorBannerEl = $('urdf-error-banner');
const urdfErrorTextEl   = $('urdf-error-text');
const urdfErrorCloseBtn = $<HTMLButtonElement>('urdf-error-close');

viewer.addEventListener('urdf-change', () => {
    loadingEl.classList.add('visible');
    jointsPanel.innerHTML = '';
    selectPart(null);
    urdfErrorBannerEl.classList.remove('visible');
});

viewer.addEventListener('urdf-error', (e: Event) => {
    loadingEl.classList.remove('visible');
    urdfErrorTextEl.textContent = (e as CustomEvent<string>).detail || 'URDF load error';
    urdfErrorBannerEl.classList.add('visible');
});

urdfErrorCloseBtn.addEventListener('click', () => { urdfErrorBannerEl.classList.remove('visible'); });

viewer.addEventListener('urdf-processed', () => {
    loadingEl.classList.remove('visible');
    document.querySelectorAll<HTMLInputElement>('input[data-preview="true"]')
        .forEach(s => { s.value = '0'; });
    requestAnimationFrame(() => {
        const groundY = viewer.shadowPlane.position.y;
        _viewportGrid.position.y = groundY;
        _buildGrid.position.y = groundY;
        // Re-attach gizmo to newly loaded robot (joint objects are replaced on each reload)
        const selId = crudCtrl.getBuildSelCompId();
        if (selId) gizmoCtrl?.attach(selId);
    });
});

// ── Init joint panel ──────────────────────────────────────────────────────
initJointPanel(viewer, jointsPanel);

let _labelRaf = 0;
viewer.addEventListener('pointermove', (e: PointerEvent) => {
    cancelAnimationFrame(_labelRaf);
    _labelRaf = requestAnimationFrame(() => {
        partLabel.style.left = (e.clientX + 14) + 'px';
        partLabel.style.top  = (e.clientY - 32) + 'px';
    });
});

viewer.addEventListener('joint-mouseover', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    hoveredJointName = name;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.setAttribute('data-hovered', '');
    partLabel.textContent = toLabel(name);
    partLabel.style.display = 'block';
});

viewer.addEventListener('joint-mouseout', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    hoveredJointName = null;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.removeAttribute('data-hovered');
    partLabel.style.display = 'none';
});

// ── Init build sliders ────────────────────────────────────────────────────
const buildSlidersCtrl = new BuildSlidersController(buildCtrl);

// ── Float panel defs — built once after buildCtrl is available ────────────
const FLOAT_PANEL_DEFS = buildSlidersCtrl.makeFloatPanelDefs();

// ── Init inspector module ─────────────────────────────────────────────────
// Defined here so it is available inside onDwellSelect (called lazily on gesture click).
const inspectorCtrl = new InspectorController({
    getFloatPanelDefs: () => FLOAT_PANEL_DEFS,
    onPanelClose: (title, changes) => chatCtrl?.appendRecapCard(title, changes),
    onGestureParamClear: () => gestureCtrl?.setParamCallback(null),
});

function syncSlidersFromController(): void {
    buildSlidersCtrl.syncSlidersFromCtrl();
    // Re-render inspector to sync values after AI tool call or undo/redo
    const selId = crudCtrl.getBuildSelCompId();
    if (selId) {
        const entry = buildCtrl.getComponentEntries().find(e => e.id === selId);
        if (entry) crudCtrl.renderInspector(selId, entry.type);
    }
    inspectorCtrl.getFloatPanelSync()?.();
}

function onDwellSelect(clientX: number, clientY: number): void {
    const robotBtn = document.elementFromPoint(clientX, clientY)?.closest<HTMLButtonElement>('.robot-btn');
    if (robotBtn) { robotBtn.click(); return; }

    const fpRow = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>('[data-fp-row-index]');
    const initSection = inspectorCtrl.getFloatPanelInitSection();
    if (fpRow && gestureCtrl && initSection) {
        const def = FLOAT_PANEL_DEFS[initSection];
        const ri  = parseInt(fpRow.dataset.fpRowIndex!, 10);
        const row = def?.rows[ri];
        if (row) {
            document.querySelectorAll<HTMLElement>('.fp-gesture-active').forEach(el => el.classList.remove('fp-gesture-active'));
            fpRow.classList.add('fp-gesture-active');
            gestureCtrl.setParamCallback((deltaRad: number) => {
                const next = Math.max(row.min, Math.min(row.max, row.get() + deltaRad * 15));
                row.set(next);
                syncSlidersFromController();
            });
            return;
        }
    }

    const opts: PointerEventInit = { clientX, clientY, bubbles: true, pointerId: 1 };
    viewer.dispatchEvent(new PointerEvent('pointerdown', opts));
    viewer.dispatchEvent(new PointerEvent('pointerup', opts));
}

gestureToggleBtn.addEventListener('click', async () => {
    if (gestureCtrl) {
        gestureCtrl.stop();
        return;
    }
    const { GestureController } = await import('./gesture.js');
    gestureCtrl = new GestureController({
        viewer, overlayCanvas: gestureOverlay, videoEl: gestureVideo,
        onDwellSelect,
        onPointerMove(clientX, clientY) {
            const btn = document.elementFromPoint(clientX, clientY)?.closest<HTMLButtonElement>('.robot-btn');
            if (btn) {
                robotCarousel.moveSliderTo(btn);
                if (btn !== robotCarousel.gestureHoverBtn) {
                    robotCarousel.gestureHoverBtn = btn;
                    const idx = parseInt(btn.dataset.index!, 10);
                    robotCarousel.scheduleHoverLoad(idx, ROBOTS);
                }
            } else {
                if (robotCarousel.gestureHoverBtn) {
                    robotCarousel.gestureHoverBtn = null;
                    robotCarousel.cancelHoverLoad();
                }
                robotCarousel.moveSliderToActive();
            }
        },
        onPointerLeave() { robotCarousel.gestureHoverBtn = null; robotCarousel.moveSliderToActive(); },
        onThumbsUp() { chatCtrl?.resumeFromGesture(); },
        onStop() {
            gestureCtrl = null;
            gestureToggleBtn.classList.remove('active');
            robotCarousel.moveSliderToActive();
        },
    });
    gestureCtrl.start()
        .then(() => {
            gestureToggleBtn.classList.add('active');
            gestureSectionEl.open = true;
        })
        .catch(() => {
            gestureCtrl = null;
        });
});

// ── Init panel (open/close + resize) ─────────────────────────────────────
initPanel();

// ── Build panel elements ──────────────────────────────────────────────────
const buildExportBtn        = $<HTMLButtonElement>('build-export');
const buildCopyUrdfBtn      = $<HTMLButtonElement>('build-copy-urdf');
const buildUndoBtn          = $<HTMLButtonElement>('build-undo');
const buildRedoBtn          = $<HTMLButtonElement>('build-redo');
const buildResetBtn         = $<HTMLButtonElement>('build-reset');
const buildPaletteEl        = $('build-palette');
const buildComponentsListEl = $('build-components-list');
const buildNewNameEl        = $<HTMLInputElement>('build-new-name');
const buildNewCreateBtn     = $<HTMLButtonElement>('build-new-create');
const buildSavedToggleBtn   = $<HTMLButtonElement>('build-saved-toggle');
const buildSavedListEl      = $('build-saved-list');
const buildActiveHeaderEl   = $('build-active-header');
const buildActiveNameEl     = $('build-active-name');
const buildClearCustomBtn   = $<HTMLButtonElement>('build-clear-custom');
const buildShortcutsToggle  = $<HTMLButtonElement>('build-shortcuts-toggle');
const buildShortcutsEl      = $('build-shortcuts');
const buildCompCountEl      = document.getElementById('build-comp-count');
const buildCompEmptyEl      = document.getElementById('build-comp-empty') as HTMLElement | null;
const buildInspEl           = $('build-inspector');
const buildInspTitle        = $('build-inspector-title');
const buildInspBody         = $('build-inspector-body');
const buildInspClose        = $<HTMLButtonElement>('build-inspector-close');

// ── Init component-crud module ────────────────────────────────────────────
function regenMeshBlob(id: string, type: string): void {
    if (type === 'script') {
        const src = buildCtrl.getComponentScript(id);
        if (src) crudCtrl.runScript(id, src);
        return;
    }
    const libEntry = LIBRARY.find(e => e.id === type);
    if (!libEntry) return;
    libEntry.factory()
        .then(({ generate }) => buildCtrl.restoreMeshBlob(id, generate()))
        .catch(err => console.warn('[regenMeshBlob] failed for', id, err));
}

const crudCtrl = new ComponentCrudController({
    buildCtrl,
    viewer,
    buildComponentsListEl,
    buildInspEl,
    buildInspTitle,
    buildInspBody,
    onSelectPartFromBuild:        (jointName) => selectPart(jointName),
    makeScrubLabel,
    refreshPaletteCounts:         () => refreshPaletteCounts(),
    regenMeshBlob,
    onCompSelected:               (id) => gizmoCtrl?.attach(id),
    onCompDeselected:             () => gizmoCtrl?.detach(),
});

// ── Init transform gizmo ──────────────────────────────────────────────────
gizmoCtrl = new GizmoController(viewer, buildCtrl, crudCtrl);

// ── Init component 3D drag ────────────────────────────────────────────────
initComponentDrag3D(buildCtrl, viewer, buildComponentsListEl, crudCtrl);

// ── Init library tab ──────────────────────────────────────────────────────
const libTabCtrl = new LibraryTabController(buildCtrl, (id, type) => {
    crudCtrl.addOptionToParentSelects(id);
    crudCtrl.renderComponentItem(id, type);
    refreshPaletteCounts();
});

buildUndoBtn.addEventListener('click',  () => buildCtrl.undo());
buildRedoBtn.addEventListener('click',  () => buildCtrl.redo());
buildResetBtn.addEventListener('click', () => {
    if (!buildCtrl.isCatalogActive) return;
    buildCtrl.resetToDefaults();
    syncSlidersFromController();
});

buildCtrl.onHistoryChange = () => {
    buildUndoBtn.disabled = !buildCtrl.canUndo;
    buildRedoBtn.disabled = !buildCtrl.canRedo;
};

buildCtrl.onDOMRebuild = () => {
    const prevSel = crudCtrl.getBuildSelCompId();
    crudCtrl.clearBuildUI();
    for (const { id, type } of buildCtrl.getComponentEntries()) {
        crudCtrl.renderComponentItem(id, type);
        if (COMPONENT_CATALOG[type]?.geomType === 'mesh') regenMeshBlob(id, type);
    }
    syncSlidersFromController();
    refreshPaletteCounts();
    buildCtrl.onHistoryChange?.();
    chatCtrl?.syncToolCount();
    if (prevSel && buildCtrl.getComponentData(prevSel)) crudCtrl.selectCompCard(prevSel);
};

buildInspClose.addEventListener('click', () => crudCtrl.deselectComp());


buildExportBtn.addEventListener('click', () => void buildCtrl.exportZip(buildExportBtn));

buildCopyUrdfBtn.addEventListener('click', () => {
    const xml = buildCtrl.getURDFXML();
    navigator.clipboard.writeText(xml).then(() => {
        const orig = buildCopyUrdfBtn.textContent;
        buildCopyUrdfBtn.textContent = 'Copied!';
        setTimeout(() => { buildCopyUrdfBtn.textContent = orig; }, 1500);
    }).catch(() => { /* clipboard denied — silently ignore */ });
});

buildNewCreateBtn.addEventListener('click', () => {
    crudCtrl.clearBuildUI();
    buildCtrl.initFromScratch(buildNewNameEl.value);
    buildCtrl.open();
    $('tab-build').click();
    robotCarousel.refreshSavedList();
    robotCarousel.refreshBuildHeader();
    refreshPaletteCounts();
});

buildSavedToggleBtn.addEventListener('click', () => {
    const next = buildSavedListEl.hidden;
    buildSavedListEl.hidden = !next;
    buildSavedToggleBtn.setAttribute('aria-expanded', String(next));
});

buildClearCustomBtn.addEventListener('click', () => {
    buildCtrl.deleteCustom(buildCtrl.robotName);
    buildActiveHeaderEl.hidden = true;
    buildSavedListEl.hidden = true;
    buildSavedToggleBtn.setAttribute('aria-expanded', 'false');
    robotCarousel.refreshSavedList();
});

buildShortcutsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    buildShortcutsEl.hidden = !buildShortcutsEl.hidden;
});

const paletteBadges
 = new Map<string, HTMLSpanElement>();

function refreshPaletteCounts(): void {
    const counts = new Map<string, number>();
    const entries = buildCtrl.getComponentEntries();
    for (const { type } of entries) {
        counts.set(type, (counts.get(type) ?? 0) + 1);
    }
    for (const [type, badge] of paletteBadges) {
        const n = counts.get(type) ?? 0;
        badge.textContent = n > 0 ? String(n) : '';
        badge.style.display = n > 0 ? 'inline' : 'none';
    }
    const total = entries.length;
    if (buildCompCountEl) buildCompCountEl.textContent = total > 0 ? `${total} added` : '';
    if (buildCompEmptyEl) buildCompEmptyEl.hidden = total > 0 || !buildCtrl.isCatalogActive;
}

// ── Robot carousel ─────────────────────────────────────────────────────────
robotCarousel = new RobotCarousel({
    robotsPanel,
    robotTrackSlider,
    buildCtrl,
    buildActiveHeaderEl,
    buildActiveNameEl,
    buildClearCustomBtn,
    buildSavedToggleBtn,
    buildSavedListEl,
    crudCtrl,
    syncSlidersFromController,
    refreshPaletteCounts,
    getRobotLoader: () => robotLoader,
});
robotCarousel.refreshSavedList();
robotCarousel.refreshBuildHeader();

// ── Robot loader ───────────────────────────────────────────────────────────
robotLoader = new RobotLoader({
    viewer, buildCtrl, crudCtrl, editorCtrl, simulator,
    upAxisEl,
    onSimSourceChange: (src) => simCtrl.setSource(src),
    syncSlidersFromController,
    refreshPaletteCounts,
    refreshBuildHeader: () => robotCarousel.refreshBuildHeader(),
    onRobotSelected(robot) {
        robotCarousel.clearActiveRobot();
        const btn = robot.name
            ? robotsPanel.querySelector<HTMLButtonElement>(`.robot-btn[data-name="${robot.name}"]`)
            : null;
        if (btn) { btn.classList.add('active'); robotCarousel.moveSliderTo(btn); }
    },
});

for (const [type, def] of Object.entries(COMPONENT_CATALOG)) {
    if ((def.geomType === 'mesh' && type !== 'script') || def.hidden) continue;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'palette-btn';
    btn.textContent = def.label;
    btn.dataset.comp = type;
    const badge = document.createElement('span');
    badge.className = 'palette-badge';
    btn.appendChild(badge);
    paletteBadges.set(type, badge);
    if (type === 'script') {
        btn.addEventListener('click', () => {
            if (!buildCtrl.isCatalogActive) return;
            const id = buildCtrl.addScriptComponent(DEFAULT_SCRIPT, makeDefaultCubeSTL());
            crudCtrl.addOptionToParentSelects(id);
            crudCtrl.renderComponentItem(id, type);
            refreshPaletteCounts();
            buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    } else {
        btn.addEventListener('click', () => {
            if (!buildCtrl.isCatalogActive) return;
            const id = buildCtrl.addComponent(type);
            crudCtrl.addOptionToParentSelects(id);
            crudCtrl.renderComponentItem(id, type);
            refreshPaletteCounts();
            buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    buildPaletteEl.appendChild(btn);
}

document.querySelectorAll<HTMLButtonElement>('.build-section-detach').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = btn.closest<HTMLElement>('[data-panel]')?.dataset.panel ?? '';
        openPanel(section, inspectorCtrl, FLOAT_PANEL_DEFS, syncSlidersFromController);
    });
});

// ── Chat controller wiring ─────────────────────────────────────────────────
{
    const chatCallbacks: ChatCallbacks = {
        isEditorTabActive:        () => document.body.classList.contains('editor-open'),
        handleEditorInput:        (t) => editorCtrl.handleExternalInput(t),
        onComponentAdded:         (id, type) => {
            crudCtrl.addOptionToParentSelects(id);
            crudCtrl.renderComponentItem(id, type);
        },
        onComponentRemoved:       (id) => crudCtrl.removeComponentItem(id),
        syncSlidersFromController,
        switchToBuildTab:         () => $<HTMLButtonElement>('tab-build').click(),
        onBriefToggle:            (v) => { editorCtrl.brief = v; },
        refreshPaletteCounts,
        getPartsList:             () => editorCtrl.partsList,
        readPart:                 (filename) => editorCtrl.readPart(filename),
        updatePart:               (filename, xml) => editorCtrl.writePart(filename, xml),
        highlightPart:            (jointName) => selectPart(jointName),
        getJointNames:            () => Object.keys(viewer.robot?.joints ?? {}),
        initRobot: (type, name) => {
            crudCtrl.clearBuildUI();
            buildCtrl.initFromScratch(type === 'robot-car' ? 'Robot Car' : (name ?? 'My Robot'));
            if (type === 'robot-car') {
                ['03-wheels.xml', '04-caster.xml', '06-power.xml'].forEach(f => {
                    fetch(`/robots/robot-car/parts/${f}`)
                        .then(r => r.ok ? r.text() : null)
                        .then(text => { if (text) buildCtrl.setPartTemplate(f, text); })
                        .catch(() => {});
                });
            }
            buildCtrl.open();
            robotCarousel.refreshSavedList();
            robotCarousel.refreshBuildHeader();
            refreshPaletteCounts();
            $<HTMLButtonElement>('tab-build').click();
            chatCtrl?.syncToolCount();
        },
        getFocusedComponent: () => {
            const selId = crudCtrl.getBuildSelCompId();
            if (selId) {
                const entry = buildCtrl.getComponentEntries().find(e => e.id === selId);
                if (!entry) return null;
                return { id: selId, type: entry.type, data: buildCtrl.getComponentData(selId) };
            }
            const selPart = crudCtrl.getBuildSelPartName();
            if (selPart) {
                const joint = viewer.robot?.joints[selPart];
                if (!joint) return null;
                const p = joint.position;
                const jt = (joint as { jointType?: string }).jointType ?? 'fixed';
                return {
                    id:   selPart,
                    type: jt,
                    data: { type: jt, x: p.x, y: p.y, z: p.z, rx: 0, ry: 0, rz: 0,
                            dims: [], jointType: jt as never, axis: [0,0,1] as [number,number,number],
                            limitLower: 0, limitUpper: 0, parent: 'base_link' },
                };
            }
            return null;
        },
        openPanel:        (section) => openPanel(section, inspectorCtrl, FLOAT_PANEL_DEFS, syncSlidersFromController),
        openGestureHint:  () => openGestureHint(),
        isGestureActive:  () => gestureCtrl !== null,
    };
    chatCtrl = new URDFChatController(buildCtrl, chatCallbacks);
    chatCtrl.init();
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
