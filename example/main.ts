import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import { URDFChatController } from './chat.js';
import type { ChatCallbacks } from './chat.js';
import type { GestureController } from './gesture.js';
import { LIBRARY } from '../src/generators/components/index.js';
import { GridHelper } from 'three';
import { MuJoCoSimulator } from './simulator.js';
import './panel.js';

// ── Module imports for extracted concerns ─────────────────────────────────
import { initBuildSliders, syncSlidersFromCtrl, makeFloatPanelDefs } from './build-sliders.js';
import {
    initInspector, closeCurrentPanel,
    getFloatPanelSync, getFloatPanelInitSection,
    setFloatPanelSync, setFloatPanelInitState,
} from './inspector.js';
import {
    initComponentCrud, renderComponentItem, renderInspector,
    removeComponentItem, selectCompCard, deselectComp, clearBuildUI,
    updateContextPill, addOptionToParentSelects, removeOptionFromParentSelects,
    componentInputs, getBuildSelCompId, getBuildSelPartName, setBuildSelPartName,
} from './component-crud.js';
import { initComponentDrag3D, setComponentInputsRef } from './component-drag-3d.js';
import { initLibraryTab, buildLibraryGrid } from './library-tab.js';

function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

customElements.define('urdf-viewer', URDFManipulator);

const simulator = new MuJoCoSimulator();
type SimSource =
    | { kind: 'url'; urdfUrl: string; pkgStr: string }
    | { kind: 'xml'; xml: string; base: string };
let _simSource: SimSource | null = null;

const viewer           = $<URDFManipulator>('viewer');
const jointsPanel      = $('joints');
const robotsPanel      = $('robots');
const loadingEl        = $('loading');
const partLabel        = $('part-label');

const gestureToggleBtn = $<HTMLButtonElement>('gesture-toggle');
const gestureOverlay   = $<HTMLCanvasElement>('gesture-overlay');
const gestureVideo     = $<HTMLVideoElement>('gesture-video');
const gestureSectionEl = $('gesture-section');
const gestureHeaderEl  = $('gesture-section-header');

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

$('tab-robot').addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.close();
    _buildGrid.visible = false;
    _viewportGrid.visible = true;
    _setActiveTab('tab-robot');
});
$('tab-editor').addEventListener('click', () => {
    buildCtrl.close();
    editorCtrl.open();
    _buildGrid.visible = false;
    _viewportGrid.visible = true;
    chatInput.placeholder = 'Ask AI to edit this URDF…';
    _setActiveTab('tab-editor');
});
$('tab-build').addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.open();
    _viewportGrid.visible = false;
    _buildGrid.visible = true;
    _buildGrid.position.y = viewer.shadowPlane.position.y;
    chatInput.placeholder = 'Ask AI to add or modify components…';
    buildLibraryGrid();
    _setActiveTab('tab-build');
});

const ignoreLimitsEl  = $<HTMLInputElement>('ignore-limits');
const showCollisionEl = $<HTMLInputElement>('show-collision');
const displayShadowEl = $<HTMLInputElement>('display-shadow');
const upAxisEl        = $<HTMLSelectElement>('up-axis');
const btnKinematic    = $<HTMLButtonElement>('btn-kinematic');
const btnDynamic      = $<HTMLButtonElement>('btn-dynamic');
const simStatus       = $('simulate-status');
const simFloatBase    = $<HTMLInputElement>('sim-float-base');
const physicsModeOptions = $('physics-mode-options');

interface RobotConfig {
    name: string;
    label: string;
    urdf?: string;
    parts?: string;
    up: string;
    package?: string;
    id?: string;
}

interface CatalogEntry {
    id: string;
    name: string;
    label: string;
    tags: string[];
    up: string;
    urdf?: string;
    parts?: string;
    package?: string;
}

function catalogToConfig(e: CatalogEntry): RobotConfig {
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

function assembleURDF(robotName: string, partMap: Map<string, string>): string {
    const sorted = [...partMap.entries()].sort(([a], [b]) => a.localeCompare(b));
    const intro  = sorted.filter(([k]) => k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n');
    const body   = sorted.filter(([k]) => !k.startsWith('00')).map(([, v]) => v.trimEnd()).join('\n\n');
    return `<?xml version="1.0"?>\n${intro}\n<robot name="${robotName}">\n\n${body}\n\n</robot>\n`;
}

let _partsBlobUrl: string | null = null;

async function loadViaBrowserAssembly(robot: RobotConfig): Promise<void> {
    const base     = robot.parts!;
    const manifest = await fetch(`${base}.parts.json`).then(r => r.json()) as {
        robot: string; parts: string[];
    };
    const dir      = base.replace(/\/[^/]+$/, '');
    const partMap  = new Map(await Promise.all(manifest.parts.map(async f =>
        [f, await fetch(`${dir}/parts/${f}`).then(r => r.text())] as [string, string]
    )));
    buildCtrl.init(manifest.robot, dir, partMap);
    const xml      = assembleURDF(manifest.robot, partMap)
        .replace(/filename="([^/"]+)"/g, `filename="${dir}/$1"`);
    if (_partsBlobUrl) URL.revokeObjectURL(_partsBlobUrl);
    _partsBlobUrl  = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
    viewer.urdf    = _partsBlobUrl;

    _simSource = { kind: 'xml', xml, base: dir + '/' };
    $('physics-mode-bar').hidden = false;

    clearBuildUI();
    const restored = buildCtrl.restore();
    for (const { id, type } of restored) {
        const def = COMPONENT_CATALOG[type];
        if (def?.geomType === 'mesh') {
            const libEntry = LIBRARY.find(e => e.id === type);
            if (libEntry) {
                libEntry.factory()
                    .then(({ generate }) => buildCtrl.restoreMeshBlob(id, generate()))
                    .catch(err => console.warn('[restore] mesh regen failed for', id, err));
            }
        }
        renderComponentItem(id, type);
    }

    if (restored.length > 0) syncSlidersFromController();
    refreshPaletteCounts();
    refreshBuildHeader();
}

let ROBOTS: RobotConfig[] = [];
let currentRobotIndex = 0;

const robotTrackSlider = $('robot-track-slider');

function moveSliderTo(btn: HTMLButtonElement): void {
    const trackRect  = robotsPanel.getBoundingClientRect();
    const btnRect    = btn.getBoundingClientRect();
    robotTrackSlider.style.width  = `${btnRect.width}px`;
    robotTrackSlider.style.height = `${btnRect.height}px`;
    robotTrackSlider.style.left   = `${btnRect.left - trackRect.left}px`;
    robotTrackSlider.style.top    = `${btnRect.top  - trackRect.top}px`;
}

function moveSliderToActive(): void {
    const active = robotsPanel.querySelector<HTMLButtonElement>('.robot-btn.active');
    if (active) moveSliderTo(active);
}

function clearActiveRobot(): void {
    for (const btn of robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn')) {
        btn.classList.remove('active');
    }
}

function loadRobot(robot: RobotConfig, index: number): void {
    currentRobotIndex = index;
    viewer.up = robot.up;
    upAxisEl.value = robot.up;
    viewer.package = robot.package ?? '';

    simulator.stop();
    document.body.classList.remove('simulating');
    viewer.disableDragging = false;
    simStatus.textContent = '';
    physicsModeOptions.hidden = true;

    _simSource = robot.urdf ? { kind: 'url', urdfUrl: robot.urdf, pkgStr: robot.package ?? '' } : null;
    simFloatBase.checked = !!robot.parts;
    $('physics-mode-bar').hidden = !robot.urdf;

    const sourceUrl = robot.parts ? `${robot.parts}.urdf` : robot.urdf!;

    if (robot.parts) {
        void loadViaBrowserAssembly(robot).catch(() => {});
    } else {
        viewer.urdf = robot.urdf!;
    }

    clearActiveRobot();
    const btn = robot.name
        ? robotsPanel.querySelector<HTMLButtonElement>(`.robot-btn[data-name="${robot.name}"]`)
        : null;
    if (btn) {
        btn.classList.add('active');
        moveSliderTo(btn);
    }
    editorCtrl.setSourceUrl(sourceUrl);
    editorCtrl.loadPartsInBackground();
}

let _hoverTimer: ReturnType<typeof setTimeout> | null = null;
let _gestureHoverBtn: HTMLButtonElement | null = null;

function buildRobotButtons(robots: RobotConfig[]): void {
    robotsPanel.querySelectorAll('.robot-btn').forEach(b => b.remove());
    for (let i = 0; i < robots.length; i++) {
        const robot = robots[i];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'robot-btn';
        btn.textContent = robot.label;
        btn.title = robot.name;
        btn.dataset.name  = robot.name;
        btn.dataset.index = String(i);
        btn.addEventListener('click', () => loadRobot(robot, i));
        btn.addEventListener('mouseenter', () => {
            moveSliderTo(btn);
            if (_hoverTimer) clearTimeout(_hoverTimer);
            _hoverTimer = setTimeout(() => loadRobot(robot, i), 150);
        });
        robotsPanel.appendChild(btn);
    }
}

robotsPanel.closest('.robot-shell')!.addEventListener('mouseleave', () => {
    if (_hoverTimer) { clearTimeout(_hoverTimer); _hoverTimer = null; }
    moveSliderToActive();
});

new ResizeObserver(moveSliderToActive).observe(robotsPanel);

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
        buildRobotButtons(ROBOTS);
        const paramId = new URLSearchParams(location.search).get('robot');
        const startIdx = paramId ? Math.max(0, ROBOTS.findIndex(r => r.id === paramId)) : 0;
        loadRobot(ROBOTS[startIdx], startIdx);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            robotTrackSlider.style.transition = '';
        }));
    });

document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const el = document.activeElement as HTMLElement;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const idx = (currentRobotIndex + dir + ROBOTS.length) % ROBOTS.length;
    loadRobot(ROBOTS[idx], idx);
});

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

function stopSimulation(): void {
    simulator.stop();
    document.body.classList.remove('simulating');
    viewer.disableDragging = false;
    simStatus.textContent = '';
    physicsModeOptions.hidden = true;
}

btnKinematic.addEventListener('click', stopSimulation);

btnDynamic.addEventListener('click', async () => {
    if (document.body.classList.contains('simulating')) return;
    btnDynamic.disabled = true;
    physicsModeOptions.hidden = false;
    simStatus.textContent = 'Loading physics…';
    try {
        const src = _simSource!;
        const floatBase = simFloatBase.checked;
        if (src.kind === 'xml') {
            await simulator.loadFromXML(src.xml, src.base, '', floatBase);
        } else {
            await simulator.load(src.urdfUrl, src.pkgStr, floatBase);
        }
        simulator.start(viewer.robot!, () => viewer.redraw());
        viewer.disableDragging = true;
        document.body.classList.add('simulating');
        simStatus.textContent = '';
    } catch (err) {
        simStatus.textContent = 'Failed';
        console.error('[simulator]', err);
        physicsModeOptions.hidden = true;
    } finally {
        btnDynamic.disabled = false;
    }
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
        if (getBuildSelPartName()) { setBuildSelPartName(null); updateContextPill(null); }
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
            setBuildSelPartName(jointName);
            updateContextPill({
                label:     toLabel(jointName),
                color:     'var(--text-3)',
                onDismiss: () => selectPart(null),
            });
        }
    }
}

function makeScrubLabel(label: HTMLElement, input: HTMLInputElement): void {
    let startX = 0, startVal = 0, dragging = false;
    const step = parseFloat(input.step) || 0.001;

    label.addEventListener('pointerdown', (e) => {
        startX   = e.clientX;
        startVal = parseFloat(input.value) || 0;
        dragging = false;
        label.setPointerCapture(e.pointerId);
    });

    label.addEventListener('pointermove', (e) => {
        if (!label.hasPointerCapture(e.pointerId)) return;
        const dx = e.clientX - startX;
        if (!dragging && Math.abs(dx) < 3) return;
        dragging = true;
        input.value = String(parseFloat((startVal + dx * step).toFixed(6)));
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    label.addEventListener('pointerup', () => {
        if (!dragging) input.focus();
        dragging = false;
    });
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
    });
});

const DEG_TO_RAD = Math.PI / 180;

type JointEl = HTMLElement & { update: () => void };

let _jointPanelAbort: AbortController | null = null;

function buildJointPanel(): void {
    _jointPanelAbort?.abort();
    _jointPanelAbort = new AbortController();
    const { signal } = _jointPanelAbort;

    jointsPanel.innerHTML = '';
    if (!viewer.robot) return;

    const joints = Object.values(viewer.robot.joints)
        .filter(j => j.jointType !== 'fixed' && j.visible)
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const joint of joints) {
        const el = document.createElement('div') as JointEl;
        el.className = 'joint';
        el.dataset.joint = joint.name;

        const nameEl = document.createElement('div');
        nameEl.className = 'joint-name';
        nameEl.title = joint.name;
        nameEl.textContent = joint.name;

        const row = document.createElement('div');
        row.className = 'joint-row';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.step = '0.001';

        const number = document.createElement('input');
        number.type = 'number';
        number.step = '0.001';

        const ticks = document.createElement('div');
        ticks.className = 'joint-ticks';
        const tickLo = document.createElement('span');
        const tickHi = document.createElement('span');
        ticks.append(tickLo, tickHi);

        const isPrismatic = joint.jointType === 'prismatic';
        const displayScale = isPrismatic ? 1 : 1 / DEG_TO_RAD;

        el.update = () => {
            const continuous = joint.jointType === 'continuous';
            const lo = (viewer.ignoreLimits || continuous) ? -6.28 : joint.limit.lower;
            const hi = (viewer.ignoreLimits || continuous) ? 6.28 : joint.limit.upper;
            slider.min = String(lo);
            slider.max = String(hi);
            slider.value = String(joint.angle);
            number.min = String(+(lo * displayScale).toFixed(3));
            number.max = String(+(hi * displayScale).toFixed(3));
            number.value = String(+(joint.angle * displayScale).toPrecision(4));
            const loD = +(lo * displayScale).toFixed(1);
            const hiD = +(hi * displayScale).toFixed(1);
            tickLo.textContent = isPrismatic ? `${loD} m` : `${loD}°`;
            tickHi.textContent = isPrismatic ? `${hiD} m` : `${hiD}°`;
        };

        slider.addEventListener('input', () => {
            viewer.setJointValue(joint.name, parseFloat(slider.value));
        }, { signal });

        number.addEventListener('change', () => {
            const scale = isPrismatic ? 1 : DEG_TO_RAD;
            viewer.setJointValue(joint.name, parseFloat(number.value) * scale);
        }, { signal });

        row.append(slider, number);
        el.append(nameEl, row, ticks);
        jointsPanel.appendChild(el);
        el.update();
    }
}

viewer.addEventListener('urdf-processed', buildJointPanel);

viewer.addEventListener('ignore-limits-change', () => {
    for (const el of jointsPanel.querySelectorAll<JointEl>('.joint')) el.update?.();
});

viewer.addEventListener('angle-change', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    jointsPanel.querySelector<JointEl>(`[data-joint="${name}"]`)?.update?.();
});

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

// ── Float panel defs — built once after buildCtrl is available ────────────
const FLOAT_PANEL_DEFS = makeFloatPanelDefs(buildCtrl);

function syncSlidersFromController(): void {
    syncSlidersFromCtrl();
    // Re-render inspector to sync values after AI tool call or undo/redo
    const selId = getBuildSelCompId();
    if (selId) {
        const entry = buildCtrl.getComponentEntries().find(e => e.id === selId);
        if (entry) renderInspector(selId, entry.type);
    }
    getFloatPanelSync()?.();
}

function onDwellSelect(clientX: number, clientY: number): void {
    const robotBtn = document.elementFromPoint(clientX, clientY)?.closest<HTMLButtonElement>('.robot-btn');
    if (robotBtn) { robotBtn.click(); return; }

    const fpRow = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>('[data-fp-row-index]');
    const initSection = getFloatPanelInitSection();
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
                moveSliderTo(btn);
                if (btn !== _gestureHoverBtn) {
                    _gestureHoverBtn = btn;
                    if (_hoverTimer) clearTimeout(_hoverTimer);
                    const idx = parseInt(btn.dataset.index!, 10);
                    _hoverTimer = setTimeout(() => loadRobot(ROBOTS[idx], idx), 150);
                }
            } else {
                if (_gestureHoverBtn) {
                    _gestureHoverBtn = null;
                    if (_hoverTimer) { clearTimeout(_hoverTimer); _hoverTimer = null; }
                }
                moveSliderToActive();
            }
        },
        onPointerLeave() { _gestureHoverBtn = null; moveSliderToActive(); },
        onThumbsUp() { chatCtrl?.resumeFromGesture(); },
        onStop() {
            gestureCtrl = null;
            gestureToggleBtn.classList.remove('active');
            moveSliderToActive();
        },
    });
    gestureCtrl.start()
        .then(() => {
            gestureToggleBtn.classList.add('active');
            gestureSectionEl.classList.add('open');
            gestureHeaderEl.setAttribute('aria-expanded', 'true');
        })
        .catch(() => {
            gestureCtrl = null;
        });
});

gestureHeaderEl.addEventListener('click', () => {
    const open = gestureSectionEl.classList.toggle('open');
    gestureHeaderEl.setAttribute('aria-expanded', String(open));
});

gestureHeaderEl.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); gestureHeaderEl.click(); }
});

// ── Init inspector module ─────────────────────────────────────────────────
initInspector({
    getFloatPanelDefs: () => FLOAT_PANEL_DEFS,
    onPanelClose: (title, changes) => chatCtrl?.appendRecapCard(title, changes),
    onGestureParamClear: () => gestureCtrl?.setParamCallback(null),
});

// ── Init build sliders ────────────────────────────────────────────────────
initBuildSliders(buildCtrl);

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
const buildCompCountEl      = $('build-comp-count');
const buildCompEmptyEl      = $('build-comp-empty');
const buildInspEl           = document.getElementById('build-inspector')!;
const buildInspTitle        = document.getElementById('build-inspector-title')!;
const buildInspBody         = document.getElementById('build-inspector-body')!;
const buildInspClose        = document.getElementById('build-inspector-close') as HTMLButtonElement;

// ── Init component-crud module ────────────────────────────────────────────
function regenMeshBlob(id: string, type: string): void {
    const libEntry = LIBRARY.find(e => e.id === type);
    if (!libEntry) return;
    libEntry.factory()
        .then(({ generate }) => buildCtrl.restoreMeshBlob(id, generate()))
        .catch(err => console.warn('[regenMeshBlob] failed for', id, err));
}

initComponentCrud({
    buildCtrl,
    viewer,
    buildComponentsListEl,
    buildInspEl,
    buildInspTitle,
    buildInspBody,
    onContextPillUpdate:          updateContextPill,
    onSelectPartFromBuild:        (jointName) => selectPart(jointName),
    makeScrubLabel,
    refreshPaletteCounts:         () => refreshPaletteCounts(),
    addOptionToParentSelects,
    removeOptionFromParentSelects,
    regenMeshBlob,
});

// Wire component inputs ref into drag module after crud is initialized
setComponentInputsRef(componentInputs);

// ── Init component 3D drag ────────────────────────────────────────────────
initComponentDrag3D(buildCtrl, viewer, buildComponentsListEl, selectCompCard);

// ── Init library tab ──────────────────────────────────────────────────────
initLibraryTab(buildCtrl, (id, type) => {
    addOptionToParentSelects(id);
    renderComponentItem(id, type);
    refreshPaletteCounts();
});

// ── Floating control panels ───────────────────────────────────────────────

function makeFloatPanel(title: string, onClose: () => void): { panel: HTMLDivElement; header: HTMLDivElement; body: HTMLDivElement } {
    const panel = document.createElement('div');
    panel.className = 'float-panel';

    const header = document.createElement('div');
    header.className = 'float-panel-header';
    const grip = document.createElement('div');
    grip.className = 'float-panel-grip';
    for (let i = 0; i < 6; i++) grip.appendChild(document.createElement('span'));
    const titleEl = document.createElement('span');
    titleEl.className = 'float-panel-title';
    titleEl.textContent = title;
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'float-panel-close';
    closeBtn.setAttribute('aria-label', 'Close panel');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', onClose);
    header.append(grip, titleEl, closeBtn);

    const body = document.createElement('div');
    body.className = 'float-panel-body';
    panel.append(header, body);

    return { panel, header, body };
}

function openPanel(section: string): void {
    closeCurrentPanel();

    const host = $('float-panels');
    const def = FLOAT_PANEL_DEFS[section];
    if (!def) return;

    const { panel, header, body } = makeFloatPanel(def.title, () => closeCurrentPanel());
    panel.dataset.panel = section;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', `${def.title} controls`);
    const syncFns: Array<(mm: number) => void> = [];

    for (let ri = 0; ri < def.rows.length; ri++) {
        const row = def.rows[ri];
        const rowEl = document.createElement('div');
        rowEl.className = 'float-panel-row';
        rowEl.setAttribute('data-gesture-track', '');
        rowEl.dataset.fpRowIndex = String(ri);

        const head = document.createElement('div');
        head.className = 'float-panel-row-head';
        const lbl  = document.createElement('span'); lbl.className  = 'float-panel-row-label'; lbl.textContent  = row.label;
        const unit = document.createElement('span'); unit.className = 'float-panel-row-unit';  unit.textContent = row.unit;
        head.append(lbl, unit);

        const controls = document.createElement('div');
        controls.className = 'float-panel-row-inputs';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = String(row.min); slider.max = String(row.max); slider.step = String(row.step);
        slider.value = String(row.get());

        const num = document.createElement('input');
        num.type = 'number';
        num.min = String(row.min); num.max = String(row.max); num.step = String(row.step);
        num.value = String(row.get());

        const onChange = (mm: number): void => {
            row.set(mm);
            syncSlidersFromController();
        };
        slider.addEventListener('input',  () => { num.value    = slider.value; onChange(parseFloat(slider.value)); });
        num.addEventListener('change',    () => { slider.value = num.value;    onChange(parseFloat(num.value));    });

        syncFns.push((mm) => { slider.value = String(mm); num.value = String(mm); });
        controls.append(slider, num);
        rowEl.append(head, controls);
        body.appendChild(rowEl);
    }

    setFloatPanelSync(() => def.rows.forEach((row, i) => syncFns[i](row.get())));
    setFloatPanelInitState(section, def.rows.map(r => r.get()));

    const panelTop = nextPanelTop();
    host.appendChild(panel);
    panel.style.top = `${panelTop}px`;
    makeDraggable(panel, header);
    panel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCurrentPanel();
    });
}

function nextPanelTop(): number {
    let maxBottom = 60;
    document.querySelectorAll<HTMLElement>('.float-panel').forEach(p => {
        const r = p.getBoundingClientRect();
        if (r.width > 0) maxBottom = Math.max(maxBottom, r.bottom + 8);
    });
    return maxBottom;
}

function makeDraggable(panel: HTMLElement, handle: HTMLElement): void {
    handle.addEventListener('pointerdown', (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest('.float-panel-close')) return;
        handle.setPointerCapture(e.pointerId);
        const rect = panel.getBoundingClientRect();
        const ox = e.clientX - rect.left;
        const oy = e.clientY - rect.top;
        const onMove = (ev: PointerEvent) => {
            panel.style.left = `${ev.clientX - ox}px`;
            panel.style.top  = `${ev.clientY - oy}px`;
        };
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', () => handle.removeEventListener('pointermove', onMove), { once: true });
    });
}

function openGestureHint(): void {
    const host = $('gesture-hint-host');
    if (!host) return;
    if (host.querySelector('.float-panel')) return;

    const rows: Array<{ icon: string; html: string }> = [
        { icon: '✊', html: '<strong>Fist + move</strong> — orbit camera' },
        { icon: '☝️', html: '<strong>Point + dwell 0.8 s</strong> — select joint' },
        { icon: '🤚', html: '<strong>Tilt wrist</strong> (joint selected) — rotate joint' },
        { icon: '🖐️', html: '<strong>Open palm, hold 1 s</strong> — reset all joints' },
        { icon: '🤲', html: '<strong>Two hands pinch/spread</strong> — zoom' },
        { icon: '👍', html: '<strong>Thumbs up</strong> — confirm / Continue' },
    ];

    const { panel, header, body } = makeFloatPanel('Gestures', () => { host.innerHTML = ''; });
    body.style.gap = '7px';
    for (const row of rows) {
        const rowEl = document.createElement('div');
        rowEl.className = 'gesture-row';
        const iconEl = document.createElement('span');
        iconEl.className = 'gesture-icon';
        iconEl.textContent = row.icon;
        const descEl = document.createElement('span');
        descEl.className = 'gesture-desc';
        descEl.innerHTML = row.html;
        rowEl.append(iconEl, descEl);
        body.appendChild(rowEl);
    }

    const hintTop = nextPanelTop();
    host.appendChild(panel);
    panel.style.top = `${hintTop}px`;
    makeDraggable(panel, header);
}

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
    const prevSel = getBuildSelCompId();
    clearBuildUI();
    for (const { id, type } of buildCtrl.getComponentEntries()) {
        renderComponentItem(id, type);
        if (COMPONENT_CATALOG[type]?.geomType === 'mesh') regenMeshBlob(id, type);
    }
    syncSlidersFromController();
    refreshPaletteCounts();
    buildCtrl.onHistoryChange?.();
    chatCtrl?.syncToolCount();
    if (prevSel && buildCtrl.getComponentData(prevSel)) selectCompCard(prevSel);
};

buildInspClose.addEventListener('click', () => deselectComp());

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!buildCtrl.isActive) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); buildCtrl.undo(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); buildCtrl.redo(); }

    const selId = getBuildSelCompId();
    if (selId && (e.key === 'Delete' || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey) {
        const el = document.activeElement as HTMLElement;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
        e.preventDefault();
        const card = buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${selId}"]`);
        buildCtrl.removeComponent(selId);
        deselectComp();
        removeOptionFromParentSelects(selId);
        card?.remove();
        refreshPaletteCounts();
        return;
    }

    if (e.key === 'Escape' && getBuildSelCompId()) {
        const el = document.activeElement as HTMLElement;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
        deselectComp();
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
        const inp = componentInputs.get(selId);
        if (inp) { inp['x'].value = x.toFixed(4); inp['y'].value = y.toFixed(4); inp['z'].value = z.toFixed(4); }
    }
});

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
    clearBuildUI();
    buildCtrl.initFromScratch(buildNewNameEl.value);
    buildCtrl.open();
    $('tab-build').click();
    refreshSavedList();
    refreshBuildHeader();
    refreshPaletteCounts();
});

function refreshSavedList(): void {
    const names = URDFBuildController.savedCustomNames();
    buildSavedToggleBtn.hidden = names.length === 0;
    if (names.length === 0) { buildSavedListEl.hidden = true; return; }

    buildSavedListEl.innerHTML = '';
    for (const name of names) {
        const row = document.createElement('div');
        row.className = 'build-saved-row';

        const nameEl = document.createElement('span');
        nameEl.className = 'build-saved-name';
        nameEl.textContent = name;

        const loadBtn = document.createElement('button');
        loadBtn.type = 'button';
        loadBtn.className = 'build-export-btn build-saved-load';
        loadBtn.textContent = 'Load';
        loadBtn.addEventListener('click', () => {
            clearBuildUI();
            const entries = buildCtrl.restoreCustomByName(name);
            for (const { id, type } of entries) renderComponentItem(id, type);
            if (entries.length > 0) syncSlidersFromController();
            refreshPaletteCounts();
            buildCtrl.open();
            $('tab-build').click();
            refreshBuildHeader();
            buildSavedListEl.hidden = true;
        });

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'build-remove-btn';
        delBtn.textContent = '×';
        delBtn.title = 'Delete saved robot';
        delBtn.addEventListener('click', () => {
            buildCtrl.deleteCustom(name);
            if (buildCtrl.robotName === name) refreshBuildHeader();
            refreshSavedList();
        });

        row.append(nameEl, loadBtn, delBtn);
        buildSavedListEl.appendChild(row);
    }
}

function refreshBuildHeader(): void {
    const active = buildCtrl.isCatalogActive;
    buildActiveHeaderEl.hidden = !active;
    if (active) {
        buildActiveNameEl.textContent = buildCtrl.robotName;
        buildClearCustomBtn.hidden = buildCtrl.isSupported;
    }
}

buildSavedToggleBtn.addEventListener('click', () => {
    buildSavedListEl.hidden = !buildSavedListEl.hidden;
});

buildClearCustomBtn.addEventListener('click', () => {
    buildCtrl.deleteCustom(buildCtrl.robotName);
    buildActiveHeaderEl.hidden = true;
    buildSavedListEl.hidden = true;
    refreshSavedList();
});

buildShortcutsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    buildShortcutsEl.hidden = !buildShortcutsEl.hidden;
});

refreshSavedList();
refreshBuildHeader();

const paletteBadges = new Map<string, HTMLSpanElement>();

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
    buildCompCountEl.textContent = total > 0 ? `${total} added` : '';
    buildCompEmptyEl.hidden = total > 0 || !buildCtrl.isCatalogActive;
}

for (const [type, def] of Object.entries(COMPONENT_CATALOG)) {
    if (def.geomType === 'mesh' || def.hidden) continue;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'palette-btn';
    btn.textContent = def.label;
    btn.dataset.comp = type;
    const badge = document.createElement('span');
    badge.className = 'palette-badge';
    btn.appendChild(badge);
    paletteBadges.set(type, badge);
    btn.addEventListener('click', () => {
        if (!buildCtrl.isCatalogActive) return;
        const id = buildCtrl.addComponent(type);
        addOptionToParentSelects(id);
        renderComponentItem(id, type);
        refreshPaletteCounts();
        buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    buildPaletteEl.appendChild(btn);
}

document.querySelectorAll<HTMLButtonElement>('.build-section-detach').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = btn.closest<HTMLElement>('[data-panel]')?.dataset.panel ?? '';
        openPanel(section);
    });
});

// ── Chat controller wiring ─────────────────────────────────────────────────
{
    const chatCallbacks: ChatCallbacks = {
        isEditorTabActive:        () => document.body.classList.contains('editor-open'),
        handleEditorInput:        (t) => editorCtrl.handleExternalInput(t),
        onComponentAdded:         (id, type) => {
            addOptionToParentSelects(id);
            renderComponentItem(id, type);
        },
        onComponentRemoved:       (id) => removeComponentItem(id),
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
            clearBuildUI();
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
            refreshSavedList();
            refreshBuildHeader();
            refreshPaletteCounts();
            $<HTMLButtonElement>('tab-build').click();
            chatCtrl?.syncToolCount();
        },
        getFocusedComponent: () => {
            const selId = getBuildSelCompId();
            if (selId) {
                const entry = buildCtrl.getComponentEntries().find(e => e.id === selId);
                if (!entry) return null;
                return { id: selId, type: entry.type, data: buildCtrl.getComponentData(selId) };
            }
            const selPart = getBuildSelPartName();
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
        openPanel:        (section) => openPanel(section),
        openGestureHint:  () => openGestureHint(),
        isGestureActive:  () => gestureCtrl !== null,
    };
    chatCtrl = new URDFChatController(buildCtrl, chatCallbacks);
    chatCtrl.init();
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
