import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import { URDFChatController } from './chat.js';
import type { ChatCallbacks } from './chat.js';
import type { GestureController } from './gesture.js';
import { Color } from 'three';
import { InfiniteGrid } from './infinite-grid.js';
import { MuJoCoSimulator } from './simulator.js';
import { SimController } from './sim-ctrl.js';
import { initPanel } from './panel.js';

// ── Module imports for extracted concerns ─────────────────────────────────
import { BuildSlidersController } from './build-sliders.js';
import { InspectorController } from './inspector.js';
import { ComponentCrudController } from './component-crud.js';
import { initComponentDrag3D } from './component-drag-3d.js';
import { LibraryTabController, refreshPaletteCounts as _refreshPaletteCounts } from './library-tab.js';
import { LIBRARY } from '../src/generators/components/index.js';
import { RobotLoader, catalogToConfig } from './robot-loader.js';
import type { RobotConfig, CatalogEntry } from './robot-loader.js';
import { $ } from './dom-utils.js';
import { initJointPanel, makeScrubLabel } from './joint-panel.js';
import { openPanel, openGestureHint } from './float-panel.js';
import { RobotPicker } from './robot-carousel.js';
import { GizmoController } from './gizmo-ctrl.js';
import { initTabSwitching } from './tab-ctrl.js';
import { initKeyboardHandler } from './keyboard-ctrl.js';
import { fmt, toLabel, linkNameFor } from './inspector-helpers.js';
import { makeDefaultCubeSTL, DEFAULT_SCRIPT } from './default-script.js';
import { updateDimensions, hideDimensions } from './dim-overlay.js';

customElements.define('urdf-viewer', URDFManipulator);

const simulator = new MuJoCoSimulator();

const viewer           = $<URDFManipulator>('viewer');
const jointsPanel      = $('joints');
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

// Shader-based infinite grid (perspective-correct, distance-faded)
function _cssColor(name: string, fallback: string): Color {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return new Color(parseInt((v || fallback).replace('#', ''), 16));
}

const _viewportGrid = new InfiniteGrid({
    majorSpacing: 0.1, minorSpacing: 0.02,        // 100mm major, 20mm minor
    majorColor: _cssColor('--grid-major', '888888'),
    minorColor: _cssColor('--grid-minor', '444444'),
    fadeRadius: 1.5,
});
const _buildGrid = new InfiniteGrid({
    majorSpacing: 0.05, minorSpacing: 0.01,        // 50mm major, 10mm minor
    majorColor: _cssColor('--grid-build-major', '666666'),
    minorColor: _cssColor('--grid-build-minor', '3d3d3d'),
    fadeRadius: 0.6,
});
_buildGrid.visible = false;
requestAnimationFrame(() => { viewer.scene.add(_viewportGrid); viewer.scene.add(_buildGrid); });

// Update grid colors when OS theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    _viewportGrid.setColors(
        _cssColor('--grid-major', '888888'),
        _cssColor('--grid-minor', '444444'));
    _buildGrid.setColors(
        _cssColor('--grid-build-major', '666666'),
        _cssColor('--grid-build-minor', '3d3d3d'));
    viewer.redraw();
});

const chatInput = $<HTMLTextAreaElement>('chat-input');

// Tab switching is initialized after libTabCtrl is defined (see below).

const ignoreLimitsEl  = $<HTMLInputElement>('ignore-limits');
const showCollisionEl = $<HTMLInputElement>('show-collision');
const displayShadowEl = $<HTMLInputElement>('display-shadow');
const upAxisEl        = $<HTMLSelectElement>('up-axis');

let ROBOTS: RobotConfig[] = [];

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

// ── Simulation controller ─────────────────────────────────────────────────
const simCtrl = new SimController({
    simulator,
    viewer,
    playBtn:     $<HTMLButtonElement>('sim-play-btn'),
    pauseBtn:    $<HTMLButtonElement>('sim-pause-btn'),
    stopBtn:     $<HTMLButtonElement>('sim-stop-btn'),
    resetBtn:    $<HTMLButtonElement>('sim-reset-btn'),
    statusEl:    $('sim-status'),
    floatBaseEl: $<HTMLInputElement>('sim-float-base'),
    speedEl:     $<HTMLInputElement>('sim-speed'),
});

displayShadowEl.checked = viewer.displayShadow;
upAxisEl.value = viewer.up;


const inspectorEl          = $('inspector');
const inspectorName        = $('inspector-name');
const inspectorJointBadge  = $<HTMLSpanElement>('inspector-joint-badge');
const inspectorProps       = $('inspector-props');
const inspectorJointSection = $('inspector-joint-section');
const inspectorJointVal    = $('inspector-joint-val');
const inspectorJointSldr   = $<HTMLInputElement>('inspector-joint-sldr');
const inspectorClose       = $('inspector-close');

// State object replaces hidden DOM inputs for position/scale/snippet
const inspectorState = {
    x: 0, y: 0, z: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    snippet: '',
};

let selectedJoint: string | null = null;
let hoveredJointName: string | null = null;
let gestureCtrl: GestureController | null = null;
let gizmoCtrl: GizmoController | null = null;
let _sliderListener: ((e: Event) => void) | null = null;

function refreshSnippet(): void {
    if (!selectedJoint || !viewer.robot) return;
    const joint = viewer.robot.joints[selectedJoint];
    if (!joint) return;
    const p = joint.position;
    const r = joint.rotation;
    const { scaleX: sx, scaleY: sy, scaleZ: sz } = inspectorState;
    const anyScale = Math.abs(sx - 1) > 0.005 || Math.abs(sy - 1) > 0.005 || Math.abs(sz - 1) > 0.005;
    const uniform = Math.abs(sx - sy) < 0.001 && Math.abs(sy - sz) < 0.001;
    let scaleLine = '';
    if (anyScale && uniform) scaleLine = `\nscale: ${sx.toFixed(2)}\u00d7`;
    else if (anyScale)       scaleLine = `\nscale: ${sx.toFixed(2)} ${sy.toFixed(2)} ${sz.toFixed(2)}`;
    inspectorState.snippet =
        `[${selectedJoint}]\n` +
        `<origin xyz="${fmt(p.x)} ${fmt(p.y)} ${fmt(p.z)}"\n` +
        `        rpy="${fmt(r.x)} ${fmt(r.y)} ${fmt(r.z)}"/>${scaleLine}`;
}

let _snippetDebounce = 0;

function applyInspector(): void {
    if (!selectedJoint || !viewer.robot) return;
    const joint = viewer.robot.joints[selectedJoint];
    if (!joint) return;
    joint.position.set(inspectorState.x, inspectorState.y, inspectorState.z);
    const { scaleX: sx, scaleY: sy, scaleZ: sz } = inspectorState;
    const link = viewer.robot.links[linkNameFor(selectedJoint)];
    if (link) link.scale.set(sx, sy, sz);
    viewer.redraw();
    clearTimeout(_snippetDebounce);
    _snippetDebounce = window.setTimeout(refreshSnippet, 150);
}

// ── Joint type badge config ────────────────────────────────────────────────
const JOINT_BADGE: Record<string, { cls: string; text: string }> = {
    continuous: { cls: 'badge-cont',  text: 'continuous' },
    revolute:   { cls: 'badge-rev',   text: 'revolute'   },
    prismatic:  { cls: 'badge-pris',  text: 'prismatic'  },
    fixed:      { cls: 'badge-fixed', text: 'fixed'      },
};

function selectPart(jointName: string | null): void {
    selectedJoint = jointName;
    const joint = jointName ? viewer.robot?.joints[jointName] : null;
    if (!joint || !jointName) {
        inspectorEl.style.display = 'none';
        hideDimensions();
        if (crudCtrl.getBuildSelPartName()) { crudCtrl.setBuildSelPartName(null); crudCtrl.updateContextPill(null); }
        return;
    }

    inspectorEl.style.display = '';
    updateDimensions(viewer, jointName);
    inspectorName.textContent = toLabel(jointName);

    // ── Joint type badge ────────────────────────────────────────────────────
    const jointType = (joint as { jointType?: string }).jointType ?? 'fixed';
    const badgeCfg = JOINT_BADGE[jointType] ?? { cls: '', text: jointType };
    inspectorJointBadge.className = `pc-badge ${badgeCfg.cls}`;
    inspectorJointBadge.textContent = badgeCfg.text;
    inspectorJointBadge.hidden = false;

    const p = joint.position;

    // ── Properties list (mm display) ────────────────────────────────────────
    const fmm = (v: number) => `${(v * 1000).toFixed(1)} mm`;
    let propsHtml =
        `<div class="pc-prop"><span class="pc-prop-lbl">X offset</span><span class="pc-prop-val">${fmm(p.x)}</span></div>` +
        `<div class="pc-prop"><span class="pc-prop-lbl">Y offset</span><span class="pc-prop-val">${fmm(p.y)}</span></div>` +
        `<div class="pc-prop"><span class="pc-prop-lbl">Z offset</span><span class="pc-prop-val">${fmm(p.z)}</span></div>`;

    // Cylinder geometry extras
    const link = viewer.robot!.links[linkNameFor(jointName)];
    if (link) {
        const cylGeom = link.traverse ? (() => {
            let cyl: { parameters?: { radiusTop?: number; height?: number } } | null = null;
            link.traverse((obj: { geometry?: { parameters?: { radiusTop?: number; height?: number }; type?: string } }) => {
                if (!cyl && obj.geometry?.type === 'CylinderGeometry') cyl = obj.geometry as { parameters?: { radiusTop?: number; height?: number } };
            });
            return cyl as { parameters?: { radiusTop?: number; height?: number } } | null;
        })() : null;
        if (cylGeom?.parameters) {
            const r = cylGeom.parameters.radiusTop ?? 0;
            const h = cylGeom.parameters.height    ?? 0;
            propsHtml +=
                `<div class="pc-prop"><span class="pc-prop-lbl">Radius</span><span class="pc-prop-val">${fmm(r)}</span></div>` +
                `<div class="pc-prop"><span class="pc-prop-lbl">Width</span><span class="pc-prop-val">${fmm(h)}</span></div>`;
        }
    }
    inspectorProps.innerHTML = propsHtml;

    // ── Joint slider for non-fixed joints ───────────────────────────────────
    const isMovable = jointType !== 'fixed';
    inspectorJointSection.hidden = !isMovable;
    if (isMovable) {
        const lim = (joint as { limit?: { lower?: number; upper?: number } }).limit ?? {};
        const lower = lim.lower ?? -Math.PI;
        const upper = lim.upper ??  Math.PI;
        const isPrismatic = jointType === 'prismatic';
        const toDisplay = (rad: number) => isPrismatic ? rad * 1000 : rad * (180 / Math.PI);
        const sldrMin = isPrismatic ? lower * 1000 : lower * (180 / Math.PI);
        const sldrMax = isPrismatic ? upper * 1000 : upper * (180 / Math.PI);
        inspectorJointSldr.min   = String(sldrMin);
        inspectorJointSldr.max   = String(sldrMax);
        const currentAngle = (joint as { angle?: number }).angle ?? 0;
        inspectorJointSldr.value = String(toDisplay(currentAngle));
        inspectorJointVal.textContent = isPrismatic
            ? `${(currentAngle * 1000).toFixed(1)} mm`
            : `${(currentAngle * 180 / Math.PI).toFixed(1)}°`;

        // Swap listener on the same DOM node (avoids broken clone-and-replace)
        if (_sliderListener) inspectorJointSldr.removeEventListener('input', _sliderListener);
        _sliderListener = () => {
            const raw = parseFloat(inspectorJointSldr.value);
            const rad = isPrismatic ? raw / 1000 : raw * (Math.PI / 180);
            if (viewer.robot && jointName) {
                (viewer.robot.joints[jointName] as { setJointValue?: (v: number) => void }).setJointValue?.(rad);
                viewer.redraw();
            }
            inspectorJointVal.textContent = isPrismatic
                ? `${raw.toFixed(1)} mm`
                : `${raw.toFixed(1)}°`;
        };
        inspectorJointSldr.addEventListener('input', _sliderListener);
    }

    inspectorState.x = p.x;
    inspectorState.y = p.y;
    inspectorState.z = p.z;
    inspectorState.scaleX = link ? link.scale.x : 1;
    inspectorState.scaleY = link ? link.scale.y : 1;
    inspectorState.scaleZ = link ? link.scale.z : 1;

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

inspectorClose.addEventListener('click', () => selectPart(null));

// Update viewport dimension annotations when camera orbits
viewer.controls.addEventListener('change', () => {
    if (selectedJoint) updateDimensions(viewer, selectedJoint);
});

// ── New POC inspector action buttons ──────────────────────────────────────
document.getElementById('inspector-details-btn')?.addEventListener('click', () => {
    const advPanel = document.getElementById('adv-panel');
    if (advPanel && !advPanel.classList.contains('open')) {
        document.getElementById('adv-toggle')?.click();
    }
    document.getElementById('tab-inspect')?.click();
});

document.getElementById('inspector-copy-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(inspectorState.snippet);
    const btn = document.getElementById('inspector-copy-btn') as HTMLButtonElement | null;
    if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    }
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
        _viewportGrid.groundY = groundY;
        _buildGrid.groundY = groundY;
        // Re-attach gizmo to newly loaded robot (joint objects are replaced on each reload)
        const selId = crudCtrl.getBuildSelCompId();
        if (selId) gizmoCtrl?.attach(selId);
    });
    populateMeshTab();
});

function populateMeshTab(): void {
    const meshList = document.getElementById('mesh-file-list');
    if (!meshList) return;

    // Collect mesh filenames referenced in robot objects
    const meshNames: string[] = [];
    if (viewer.robot) {
        viewer.robot.traverse((obj: { userData?: { meshFileName?: string }; name?: string }) => {
            const fn = obj.userData?.meshFileName;
            if (fn && !meshNames.includes(fn)) meshNames.push(fn);
        });
    }

    // Always show chassis.stl for robot-car
    const allMeshes = meshNames.length > 0
        ? meshNames
        : ['chassis.stl'];

    meshList.innerHTML = allMeshes.map(name => {
        const isChassisStl = name === 'chassis.stl';
        const regenBtn = isChassisStl
            ? `<button type="button" class="m-btn" data-regen="${name}">Regenerate</button>`
            : '';
        return `<div class="mesh-row">
            <span class="m-name">${name}</span>
            <button type="button" class="m-btn" data-download="${name}">\u2193 Download</button>
            ${regenBtn}
        </div>`;
    }).join('');

    // Wire download buttons
    meshList.querySelectorAll<HTMLButtonElement>('[data-download]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filename = btn.dataset.download!;
            const pkg = (viewer as { _packageMap?: Map<string, string> })._packageMap;
            if (pkg) {
                for (const [key, url] of pkg.entries()) {
                    if (key.endsWith(filename) || url.endsWith(filename)) {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        a.click();
                        return;
                    }
                }
            }
            const orig = btn.textContent;
            btn.textContent = 'Not found';
            setTimeout(() => { btn.textContent = orig; }, 2000);
        });
    });

    // Wire regenerate buttons (chassis.stl only for now)
    meshList.querySelectorAll<HTMLButtonElement>('[data-regen]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filename = btn.dataset.regen!;
            if (filename === 'chassis.stl') {
                const orig = btn.textContent;
                btn.textContent = 'Regenerating\u2026';
                btn.disabled = true;
                try {
                    (buildCtrl as { regenerateChassis?: () => void }).regenerateChassis?.();
                } catch { /* no-op */ }
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.disabled = false;
                }, 1500);
            }
        });
    });
}

// Mesh tab: custom STL upload
document.getElementById('mesh-upload-input')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    chatCtrl?.attachStlFile?.(file.name, url);
    const meshList = document.getElementById('mesh-file-list');
    if (meshList) {
        const row = document.createElement('div');
        row.className = 'mesh-row';
        row.innerHTML = `<span class="m-name">${file.name} <em style="color:var(--green);font-style:normal;font-size:.5rem">UPLOADED</em></span>`;
        meshList.insertBefore(row, meshList.firstChild);
    }
});

// Input bar STL attachment
document.getElementById('chat-stl-upload')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    chatCtrl?.attachStlFile?.(file.name, url);
    const input = document.getElementById('chat-input') as HTMLTextAreaElement | null;
    if (input && !input.value) {
        input.placeholder = `\uD83D\uDCCE ${file.name} attached \u2014 type your question\u2026`;
        const onceReset = () => {
            input.placeholder = 'Ask AI to build or edit your robot\u2026';
            input.removeEventListener('input', onceReset);
        };
        input.addEventListener('input', onceReset);
    }
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
        onPointerMove() {},
        onPointerLeave() {},
        onThumbsUp() { chatCtrl?.resumeFromGesture(); },
        onStop() {
            gestureCtrl = null;
            gestureToggleBtn.classList.remove('active');
            gestureSectionEl.hidden = true;
        },
    });
    gestureCtrl.start()
        .then(() => {
            gestureToggleBtn.classList.add('active');
            gestureSectionEl.hidden = false;
            gestureSectionEl.open = true;
        })
        .catch(() => {
            gestureCtrl = null;
        });
});

// ── Init panel (open/close + resize) ─────────────────────────────────────
initPanel();

// ── Export split-button menu ──────────────────────────────────────────────
{
    const exportMenu  = document.getElementById('export-menu');
    const exportCaret = document.getElementById('export-caret');
    if (exportMenu && exportCaret) {
        exportCaret.addEventListener('click', (e) => {
            e.stopPropagation();
            exportMenu.hidden = !exportMenu.hidden;
        });
        document.addEventListener('click', () => { exportMenu.hidden = true; });
    }

    // Bundle: same as main export button
    document.getElementById('build-export-bundle')?.addEventListener('click', () => {
        if (exportMenu) exportMenu.hidden = true;
        void buildCtrl.exportZip(buildExportBtn);
    });

    // BOM export
    document.getElementById('build-export-bom')?.addEventListener('click', () => {
        if (exportMenu) exportMenu.hidden = true;
        import('./bom-export.js').then(({ exportBomHtml }) => exportBomHtml(buildCtrl));
    });

}

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

// ── Init tab switching ─────────────────────────────────────────────────────
initTabSwitching({
    editorCtrl,
    buildCtrl,
    getGizmoCtrl: () => gizmoCtrl,
    libTabCtrl,
    viewer,
    viewportGrid: _viewportGrid,
    buildGrid:    _buildGrid,
    chatInput,
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
    robotPicker.refreshSavedList();
    robotPicker.refreshBuildHeader();
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
    robotPicker.refreshSavedList();
});

buildShortcutsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    buildShortcutsEl.hidden = !buildShortcutsEl.hidden;
});

const paletteBadges
 = new Map<string, HTMLSpanElement>();

function refreshPaletteCounts(): void {
    _refreshPaletteCounts(buildCtrl, paletteBadges);
}

// ── Robot picker dropdown ──────────────────────────────────────────────────
const robotPicker = new RobotPicker({
    pickerBtn:    $<HTMLButtonElement>('robot-picker-btn'),
    pickerMenu:   $('robot-picker-menu'),
    pickerNameEl: $('robot-picker-name'),
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
robotPicker.refreshSavedList();
robotPicker.refreshBuildHeader();

// ── Robot loader ───────────────────────────────────────────────────────────
const robotLoader = new RobotLoader({
    viewer, buildCtrl, crudCtrl, editorCtrl, simulator,
    upAxisEl,
    onSimSourceChange: (src) => simCtrl.setSource(src),
    syncSlidersFromController,
    refreshPaletteCounts,
    refreshBuildHeader: () => robotPicker.refreshBuildHeader(),
    onRobotSelected(robot) {
        if (robot.name) robotPicker.setActive(robot.name);
    },
});

// ── Keyboard handler ──────────────────────────────────────────────────────
initKeyboardHandler({
    buildCtrl,
    crudCtrl,
    refreshPaletteCounts,
    getRobotLoader: () => robotLoader,
    getRobots:      () => ROBOTS,
});

// ── Load robot catalog and start initial robot ─────────────────────────────
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
            { id: 'franka_panda',      name: 'Franka Panda',       label: 'Panda',    urdf: '/robots/franka_panda/panda.urdf', package: 'franka_panda: /robots/franka_panda',    up: '+Z' },
            { id: 'orca_hand',         name: 'ORCA Hand',          label: 'ORCA',     urdf: '/robots/orca_hand/orcahand_right.urdf', package: 'orcahand_description: /robots/orca_hand', up: '+Z' },
        ];
    })
    .finally(() => {
        robotPicker.buildRobotItems(ROBOTS);
        const paramId = new URLSearchParams(location.search).get('robot');
        const startIdx = paramId ? Math.max(0, ROBOTS.findIndex(r => r.id === paramId)) : 0;
        robotLoader.load(ROBOTS[startIdx], startIdx);
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
            robotPicker.refreshSavedList();
            robotPicker.refreshBuildHeader();
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
