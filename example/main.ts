import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, CHASSIS_DEFAULTS, WHEEL_DEFAULTS, COMPONENT_CATALOG } from './build.js';
import type { Component as BuildComponent } from './build.js';
import { URDFChatController } from './chat.js';
import type { ChatCallbacks } from './chat.js';
import type { GestureController } from './gesture.js';
import { LIBRARY } from '../src/generators/components/index.js';
import type { LibraryEntry } from '../src/generators/components/index.js';
import { Raycaster, Vector2, Vector3, Plane, GridHelper } from 'three';
import { MuJoCoSimulator } from './simulator.js';

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

// ── Chat controller (constructed after editorCtrl + buildCtrl) ────────────────
// Full wiring happens after renderComponentItem / syncSlidersFromController are
// defined, so we declare and call init() below.
let chatCtrl: URDFChatController;

// Viewport grid: 2m × 2m, 100mm divisions — always visible for spatial reference (Three.js editor style)
const _viewportGrid = new GridHelper(2, 20, 0x888888, 0x444444);
_viewportGrid.raycast = () => {};
// Ground grid: 0.5m × 0.5m, 20mm divisions — visible only in Build mode, replaces viewport grid
const _buildGrid = new GridHelper(0.5, 25, 0x666666, 0x3d3d3d);
_buildGrid.visible = false;
_buildGrid.raycast = () => {};   // GridHelper extends LineSegments whose raycast ignores .visible
// Grid must be added after viewer element creates its scene (defer one frame)
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
    parts?: string;  // base path for browser-assembled robots, e.g. '/robots/robot-car/robot-car'
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
    // Rewrite relative mesh filenames to absolute paths — blob URLs have no usable base
    const xml      = assembleURDF(manifest.robot, partMap)
        .replace(/filename="([^/"]+)"/g, `filename="${dir}/$1"`);
    if (_partsBlobUrl) URL.revokeObjectURL(_partsBlobUrl);
    _partsBlobUrl  = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
    viewer.urdf    = _partsBlobUrl;

    // Expose assembled XML for simulation (filenames already absolute)
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

    // Reset simulation
    simulator.stop();
    document.body.classList.remove('simulating');
    viewer.disableDragging = false;
    simStatus.textContent = '';
    physicsModeOptions.hidden = true;

    // Parts robots: loadViaBrowserAssembly() sets _simSource and reveals bar after assembly.
    // Mobile bases default to float base so gravity is visible; arms use fixed base.
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

// Load catalog then render buttons and apply ?robot= deep-link
robotTrackSlider.style.transition = 'none';
fetch('/robots/catalog.json')
    .then(r => r.ok ? r.json() as Promise<{ version: number; robots: CatalogEntry[] }> : Promise.reject())
    .then(catalog => { ROBOTS = catalog.robots.map(catalogToConfig); })
    .catch(() => {
        // Fallback: hardcoded list so the app still works if catalog is unreachable
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
        if (_buildSelPartName) { _buildSelPartName = null; _updateContextPill(null); }
        return;
    }

    inspectorEl.style.display = '';
    inspectorName.textContent = toLabel(jointName);

    const p = joint.position;
    inspectorX.value = fmt(p.x);
    inspectorY.value = fmt(p.y);
    inspectorZ.value = fmt(p.z);

    const link = viewer.robot.links[linkNameFor(jointName)];
    inspectorScaleX.value = String(link ? link.scale.x : 1);
    inspectorScaleY.value = String(link ? link.scale.y : 1);
    inspectorScaleZ.value = String(link ? link.scale.z : 1);

    refreshSnippet();
    gestureCtrl?.setSelectedJoint(jointName);
    document.querySelectorAll<HTMLElement>('.fp-gesture-active').forEach(el => el.classList.remove('fp-gesture-active'));

    // In Build tab: surface existing URDF parts as AI context (skip dynamic components).
    if (document.body.classList.contains('build-open')) {
        const baseId = jointName.endsWith('_joint') ? jointName.slice(0, -6) : jointName;
        if (!buildCtrl.componentIds.has(baseId)) {
            _buildSelCompId = null;
            _buildSelPartName = jointName;
            for (const el of buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
                el.classList.remove('selected');
            buildInspEl.hidden = true;
            _updateContextPill({
                label:     toLabel(jointName),
                color:     'var(--text-3)',
                onDismiss: () => selectPart(null),
            });
        }
    }
}

/**
 * Make an inspector label scrub its paired number input on horizontal drag.
 * step attribute controls sensitivity (e.g. 0.001 -> 1 mm/px, 0.01 -> 1%/px).
 * A plain click (no drag) falls through to focus the input.
 */
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
    // Reset all build component preview sliders after each URDF reload
    document.querySelectorAll<HTMLInputElement>('input[data-preview="true"]')
        .forEach(s => { s.value = '0'; });
    // Sync grids to ground level (shadowPlane updates on next render frame)
    requestAnimationFrame(() => {
        const groundY = viewer.shadowPlane.position.y;
        _viewportGrid.position.y = groundY;
        _buildGrid.position.y = groundY;
    });
});

const DEG_TO_RAD = Math.PI / 180; // multiply degrees → radians; divide radians → degrees

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
        const displayScale = isPrismatic ? 1 : 1 / DEG_TO_RAD; // show degrees for rotary joints

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

function onDwellSelect(clientX: number, clientY: number): void {
    const robotBtn = document.elementFromPoint(clientX, clientY)?.closest<HTMLButtonElement>('.robot-btn');
    if (robotBtn) { robotBtn.click(); return; }

    const fpRow = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>('[data-fp-row-index]');
    if (fpRow && gestureCtrl && _floatPanelInitSection) {
        const def = FLOAT_PANEL_DEFS[_floatPanelInitSection];
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

// ── Build panel sliders ────────────────────────────────────────────────────

function syncPair(slider: HTMLInputElement, num: HTMLInputElement, onChange: () => void): void {
    slider.addEventListener('input', () => { num.value = slider.value; onChange(); });
    num.addEventListener('change', () => {
        const v = Math.max(parseFloat(num.min), Math.min(parseFloat(num.max), parseFloat(num.value)));
        slider.value = String(v);
        num.value    = String(v);
        onChange();
    });
}

const buildChassisThicknessEl = $<HTMLInputElement>('build-chassis-thickness');
const buildChassisBodyHWEl   = $<HTMLInputElement>('build-chassis-body-hw');
const buildChassisRearHWEl   = $<HTMLInputElement>('build-chassis-rear-hw');
const buildWheelRadiusEl     = $<HTMLInputElement>('build-wheel-radius');
const buildWheelWidthEl      = $<HTMLInputElement>('build-wheel-width');
const buildCasterRadiusEl    = $<HTMLInputElement>('build-caster-radius');
const buildCasterWidthEl     = $<HTMLInputElement>('build-caster-width');
const buildBatteryLEl        = $<HTMLInputElement>('build-battery-l');
const buildBatteryWEl        = $<HTMLInputElement>('build-battery-w');
const buildBatteryHEl        = $<HTMLInputElement>('build-battery-h');
const buildPowerbankREl      = $<HTMLInputElement>('build-powerbank-r');
const buildPowerbankLEl      = $<HTMLInputElement>('build-powerbank-l');

function onChassisChange(): void {
    if (!buildCtrl.isSupported) return;
    buildCtrl.updateChassis({
        thickness:     parseFloat(buildChassisThicknessEl.value) / 1000,
        bodyHalfWidth: parseFloat(buildChassisBodyHWEl.value)    / 1000,
        rearHalfWidth: parseFloat(buildChassisRearHWEl.value)    / 1000,
    });
}

function onWheelChange(): void {
    if (!buildCtrl.isSupported) return;
    buildCtrl.updateWheel({
        radius: parseFloat(buildWheelRadiusEl.value) / 1000,
        width:  parseFloat(buildWheelWidthEl.value)  / 1000,
    });
}

function onCasterChange(): void {
    if (!buildCtrl.isSupported) return;
    buildCtrl.updateCaster(
        parseFloat(buildCasterRadiusEl.value) / 1000,
        parseFloat(buildCasterWidthEl.value)  / 1000,
    );
}

function onBatteryChange(): void {
    if (!buildCtrl.isSupported) return;
    buildCtrl.updateBatteryBox(
        parseFloat(buildBatteryLEl.value) / 1000,
        parseFloat(buildBatteryWEl.value) / 1000,
        parseFloat(buildBatteryHEl.value) / 1000,
    );
}

function onPowerbankChange(): void {
    if (!buildCtrl.isSupported) return;
    buildCtrl.updatePowerbank(
        parseFloat(buildPowerbankREl.value) / 1000,
        parseFloat(buildPowerbankLEl.value) / 1000,
    );
}

interface SliderPair {
    slider:    HTMLInputElement;
    numId:     string;
    defaultMm: number;
    get:       () => number;
    onChange:  () => void;
}

const buildSliderPairs: SliderPair[] = [
    { slider: buildChassisThicknessEl, numId: 'build-chassis-thickness-num', defaultMm: CHASSIS_DEFAULTS.thickness     * 1000, get: () => buildCtrl.chassisParams.thickness     * 1000, onChange: onChassisChange },
    { slider: buildChassisBodyHWEl,    numId: 'build-chassis-body-hw-num',   defaultMm: CHASSIS_DEFAULTS.bodyHalfWidth * 1000, get: () => buildCtrl.chassisParams.bodyHalfWidth * 1000, onChange: onChassisChange },
    { slider: buildChassisRearHWEl,    numId: 'build-chassis-rear-hw-num',   defaultMm: CHASSIS_DEFAULTS.rearHalfWidth * 1000, get: () => buildCtrl.chassisParams.rearHalfWidth * 1000, onChange: onChassisChange },
    { slider: buildWheelRadiusEl,      numId: 'build-wheel-radius-num',      defaultMm: WHEEL_DEFAULTS.radius          * 1000, get: () => buildCtrl.wheelParams.radius          * 1000, onChange: onWheelChange },
    { slider: buildWheelWidthEl,       numId: 'build-wheel-width-num',       defaultMm: WHEEL_DEFAULTS.width           * 1000, get: () => buildCtrl.wheelParams.width           * 1000, onChange: onWheelChange },
    { slider: buildCasterRadiusEl,     numId: 'build-caster-radius-num',     defaultMm: 0, get: () => buildCtrl.casterRadius    * 1000, onChange: onCasterChange },
    { slider: buildCasterWidthEl,      numId: 'build-caster-width-num',      defaultMm: 0, get: () => buildCtrl.casterWidth     * 1000, onChange: onCasterChange },
    { slider: buildBatteryLEl,         numId: 'build-battery-l-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.l    * 1000, onChange: onBatteryChange },
    { slider: buildBatteryWEl,         numId: 'build-battery-w-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.w    * 1000, onChange: onBatteryChange },
    { slider: buildBatteryHEl,         numId: 'build-battery-h-num',         defaultMm: 0, get: () => buildCtrl.batteryBox.h    * 1000, onChange: onBatteryChange },
    { slider: buildPowerbankREl,       numId: 'build-powerbank-r-num',       defaultMm: 0, get: () => buildCtrl.powerbank.radius * 1000, onChange: onPowerbankChange },
    { slider: buildPowerbankLEl,       numId: 'build-powerbank-l-num',       defaultMm: 0, get: () => buildCtrl.powerbank.length * 1000, onChange: onPowerbankChange },
];

for (const { slider, numId, defaultMm, onChange } of buildSliderPairs) {
    if (defaultMm > 0) slider.value = String(defaultMm);
    const num = $<HTMLInputElement>(numId);
    num.value = slider.value;
    syncPair(slider, num, onChange);
}

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
const libSearchEl           = $<HTMLInputElement>('lib-search');
const libPillsEl            = $('lib-pills');
const libGridEl             = $('lib-grid');
const libEmptyEl            = $('lib-empty');
const buildCompCountEl      = $('build-comp-count');
const buildCompEmptyEl      = $('build-comp-empty');
const contextBarEl          = document.getElementById('chat-context-bar')!;
const buildInspEl           = document.getElementById('build-inspector')!;
const buildInspTitle        = document.getElementById('build-inspector-title')!;
const buildInspBody         = document.getElementById('build-inspector-body')!;
const buildInspClose        = document.getElementById('build-inspector-close') as HTMLButtonElement;

function syncSlidersFromController(): void {
    for (const { slider, numId, get } of buildSliderPairs) {
        const v = String(get());
        slider.value = v;
        $<HTMLInputElement>(numId).value = v;
    }
    // Re-render inspector to sync values after AI tool call or undo/redo
    if (_buildSelCompId) {
        const entry = buildCtrl.getComponentEntries().find(e => e.id === _buildSelCompId);
        if (entry) renderInspector(_buildSelCompId, entry.type);
    }
    _floatPanelSync?.();
}

// ── Floating control panels ────────────────────────────────────────────────

interface FPRow {
    label: string; unit: string;
    min: number; max: number; step: number;
    get: () => number;
    set: (mm: number) => void;
}

const FLOAT_PANEL_DEFS: Record<string, { title: string; rows: FPRow[] }> = {
    chassis: {
        title: 'Chassis',
        rows: [
            { label: 'Thickness',  unit: 'mm',     min: 1,  max: 10,  step: 0.5,
              get: () => buildCtrl.chassisParams.thickness     * 1000,
              set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, thickness:     v / 1000 }) },
            { label: 'Body width', unit: 'mm × 2', min: 40, max: 90,  step: 1,
              get: () => buildCtrl.chassisParams.bodyHalfWidth * 1000,
              set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, bodyHalfWidth: v / 1000 }) },
            { label: 'Rear width', unit: 'mm × 2', min: 85, max: 130, step: 1,
              get: () => buildCtrl.chassisParams.rearHalfWidth * 1000,
              set: (v) => buildCtrl.updateChassis({ ...buildCtrl.chassisParams, rearHalfWidth: v / 1000 }) },
        ],
    },
    wheels: {
        title: 'Wheels',
        rows: [
            { label: 'Radius', unit: 'mm', min: 20, max: 50, step: 0.5,
              get: () => buildCtrl.wheelParams.radius * 1000,
              set: (v) => buildCtrl.updateWheel({ ...buildCtrl.wheelParams, radius: v / 1000 }) },
            { label: 'Width',  unit: 'mm', min: 8,  max: 30, step: 1,
              get: () => buildCtrl.wheelParams.width  * 1000,
              set: (v) => buildCtrl.updateWheel({ ...buildCtrl.wheelParams, width:  v / 1000 }) },
        ],
    },
    caster: {
        title: 'Caster',
        rows: [
            { label: 'Radius', unit: 'mm', min: 8,  max: 25, step: 0.5,
              get: () => buildCtrl.casterRadius * 1000,
              set: (v) => buildCtrl.updateCaster(v / 1000, buildCtrl.casterWidth) },
            { label: 'Width',  unit: 'mm', min: 5,  max: 25, step: 0.5,
              get: () => buildCtrl.casterWidth  * 1000,
              set: (v) => buildCtrl.updateCaster(buildCtrl.casterRadius, v / 1000) },
        ],
    },
    battery: {
        title: 'Battery Box',
        rows: [
            { label: 'Length', unit: 'mm', min: 40, max: 120, step: 1,
              get: () => buildCtrl.batteryBox.l * 1000,
              set: (v) => buildCtrl.updateBatteryBox(v / 1000, buildCtrl.batteryBox.w, buildCtrl.batteryBox.h) },
            { label: 'Width',  unit: 'mm', min: 25, max: 80,  step: 1,
              get: () => buildCtrl.batteryBox.w * 1000,
              set: (v) => buildCtrl.updateBatteryBox(buildCtrl.batteryBox.l, v / 1000, buildCtrl.batteryBox.h) },
            { label: 'Height', unit: 'mm', min: 15, max: 50,  step: 1,
              get: () => buildCtrl.batteryBox.h * 1000,
              set: (v) => buildCtrl.updateBatteryBox(buildCtrl.batteryBox.l, buildCtrl.batteryBox.w, v / 1000) },
        ],
    },
    powerbank: {
        title: 'Power Bank',
        rows: [
            { label: 'Radius', unit: 'mm', min: 8,  max: 25,  step: 0.5,
              get: () => buildCtrl.powerbank.radius * 1000,
              set: (v) => buildCtrl.updatePowerbank(v / 1000, buildCtrl.powerbank.length) },
            { label: 'Length', unit: 'mm', min: 50, max: 200, step: 1,
              get: () => buildCtrl.powerbank.length * 1000,
              set: (v) => buildCtrl.updatePowerbank(buildCtrl.powerbank.radius, v / 1000) },
        ],
    },
};

let _floatPanelSync: (() => void) | null = null;
let _floatPanelInitVals: number[] | null = null;
let _floatPanelInitSection: string | null = null;

function _closeCurrentPanel(): void {
    const host = $('float-panels');
    if (!host.hasChildNodes()) return;
    if (_floatPanelInitVals && _floatPanelInitSection) {
        const def = FLOAT_PANEL_DEFS[_floatPanelInitSection];
        if (def) {
            const changes = def.rows
                .map((row, i) => ({ label: row.label, unit: row.unit, from: _floatPanelInitVals![i], to: row.get() }))
                .filter(c => Math.abs(c.from - c.to) >= 0.01);
            if (changes.length > 0) chatCtrl?.appendRecapCard(def.title, changes);
        }
    }
    host.innerHTML = '';
    _floatPanelSync = null;
    _floatPanelInitVals = null;
    _floatPanelInitSection = null;
    gestureCtrl?.setParamCallback(null);
}

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
    _closeCurrentPanel();

    const host = $('float-panels');
    const def = FLOAT_PANEL_DEFS[section];
    if (!def) return;

    const { panel, header, body } = makeFloatPanel(def.title, () => _closeCurrentPanel());
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

    _floatPanelSync = () => def.rows.forEach((row, i) => syncFns[i](row.get()));
    _floatPanelInitVals = def.rows.map(r => r.get());
    _floatPanelInitSection = section;

    const panelTop = nextPanelTop();
    host.appendChild(panel);
    panel.style.top = `${panelTop}px`;
    makeDraggable(panel, header);
    panel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') _closeCurrentPanel();
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
    if (host.querySelector('.float-panel')) return; // already open

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
    const prevSel = _buildSelCompId;
    clearBuildUI();
    for (const { id, type } of buildCtrl.getComponentEntries()) {
        renderComponentItem(id, type);
        if (COMPONENT_CATALOG[type]?.geomType === 'mesh') regenMeshBlob(id, type);
    }
    syncSlidersFromController();
    refreshPaletteCounts();
    buildCtrl.onHistoryChange?.();
    chatCtrl?.syncToolCount();
    if (prevSel && buildCtrl.getComponentData(prevSel)) _selectCompCard(prevSel);
};

buildInspClose.addEventListener('click', () => _deselectComp());

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!buildCtrl.isActive) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); buildCtrl.undo(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); buildCtrl.redo(); }

    if (_buildSelCompId && (e.key === 'Delete' || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey) {
        const el = document.activeElement as HTMLElement;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
        e.preventDefault();
        const id   = _buildSelCompId;
        const card = buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
        buildCtrl.removeComponent(id);
        _deselectComp();
        removeOptionFromParentSelects(id);
        card?.remove();
        refreshPaletteCounts();
        return;
    }

    if (e.key === 'Escape' && _buildSelCompId) {
        const el = document.activeElement as HTMLElement;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
        _deselectComp();
        return;
    }

    if (_buildSelCompId && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const c = buildCtrl.getComponentData(_buildSelCompId);
        if (!c) return;
        const d = 0.001; // 1 mm nudge
        let { x, y, z } = c;
        // Convention: −Y = left, +Y = right, −X = front, +X = rear (see CLAUDE.md).
        // Shift+arrow moves vertically (Z); plain arrow moves in the XY plane.
        if (e.shiftKey) {
            if (e.key === 'ArrowUp')   z += d;
            if (e.key === 'ArrowDown') z -= d;
        } else {
            if (e.key === 'ArrowLeft')  y += d; // screen-left → less negative Y → +Y
            if (e.key === 'ArrowRight') y -= d;
            if (e.key === 'ArrowUp')    x -= d; // screen-up → toward front (−X)
            if (e.key === 'ArrowDown')  x += d;
        }
        buildCtrl.updateComponent(_buildSelCompId, { x, y, z });
        const inp = componentInputs.get(_buildSelCompId);
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
    if (def.geomType === 'mesh' || def.hidden) continue;  // mesh types and superseded primitives excluded
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

const componentInputs  = new Map<string, Record<string, HTMLInputElement>>();
const componentSelects = new Map<string, HTMLSelectElement>();
let _buildSelCompId:   string | null = null;
let _buildSelPartName: string | null = null;

function clearBuildUI(): void {
    buildComponentsListEl.innerHTML = '';
    _deselectComp();
}

function _deselectComp(): void {
    _buildSelCompId   = null;
    _buildSelPartName = null;
    for (const el of buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
        el.classList.remove('selected');
    buildInspEl.hidden = true;
    buildInspBody.innerHTML = '';
    componentInputs.clear();
    componentSelects.clear();
    _updateContextPill(null);
}

interface ContextPillCtx { label: string; color: string; onDismiss: () => void; }

function _updateContextPill(ctx: ContextPillCtx | null): void {
    contextBarEl.innerHTML = '';
    contextBarEl.hidden = !ctx;
    if (!ctx) return;
    const pill = document.createElement('span');
    pill.className = 'context-pill';
    const dot = document.createElement('span');
    dot.className = 'context-pill-dot';
    dot.style.background = ctx.color;
    const label = document.createElement('span');
    label.textContent = ctx.label;
    const dismiss = document.createElement('button');
    dismiss.type = 'button'; dismiss.className = 'context-pill-dismiss';
    dismiss.textContent = '×'; dismiss.title = 'Deselect';
    dismiss.addEventListener('click', ctx.onDismiss);
    pill.append(dot, label, dismiss);
    contextBarEl.appendChild(pill);
}

function addOptionToParentSelects(id: string): void {
    for (const [existingId, sel] of componentSelects) {
        if (existingId !== id && !Array.from(sel.options).some(o => o.value === id)) {
            const o = document.createElement('option');
            o.value = o.textContent = id;
            sel.appendChild(o);
        }
    }
}

function removeOptionFromParentSelects(id: string): void {
    for (const sel of componentSelects.values()) {
        const opt = Array.from(sel.options).find(o => o.value === id);
        if (opt) sel.removeChild(opt);
    }
}

function _selectCompCard(id: string): void {
    _buildSelCompId   = id;
    _buildSelPartName = null;
    for (const el of buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
        el.classList.toggle('selected', el.dataset.id === id);
    const entry = buildCtrl.getComponentEntries().find(e => e.id === id);
    if (entry) renderInspector(id, entry.type);
    const def = COMPONENT_CATALOG[entry?.type ?? ''];
    _updateContextPill({
        label:     `${def?.label ?? entry?.type ?? id} · ${id}`,
        color:     def?.cssColor ?? '#888',
        onDismiss: _deselectComp,
    });
}

function renderComponentItem(id: string, type: string): void {
    const def  = COMPONENT_CATALOG[type];
    const item = document.createElement('div');
    item.className = 'build-component';
    item.dataset.id = id;

    const header = document.createElement('div');
    header.className = 'build-component-header';

    const dot = document.createElement('span');
    dot.className = 'comp-dot';
    dot.style.background = def?.cssColor ?? '#888';

    const labelEl = document.createElement('span');
    labelEl.textContent = `${def.label} ${id.split('_').pop()}`;

    const dupBtn = document.createElement('button');
    dupBtn.type = 'button';
    dupBtn.className = 'build-dup-btn';
    dupBtn.title = 'Duplicate';
    dupBtn.textContent = '⧉';
    dupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newId = buildCtrl.duplicateComponent(id);
        if (!newId) return;
        addOptionToParentSelects(newId);
        renderComponentItem(newId, type);
        if (COMPONENT_CATALOG[type]?.geomType === 'mesh') regenMeshBlob(newId, type);
        refreshPaletteCounts();
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'build-remove-btn';
    removeBtn.title = 'Remove';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        buildCtrl.removeComponent(id);
        if (_buildSelCompId === id) _deselectComp();
        removeOptionFromParentSelects(id);
        item.remove();
        refreshPaletteCounts();
    });

    header.setAttribute('role', 'button');
    header.tabIndex = 0;
    header.addEventListener('click', () => _selectCompCard(id));
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _selectCompCard(id); }
    });
    header.append(dot, labelEl, dupBtn, removeBtn);
    item.appendChild(header);
    buildComponentsListEl.appendChild(item);
}

function renderInspector(id: string, type: string): void {
    const saved = buildCtrl.getComponentData(id);
    if (!saved) return;
    const def = COMPONENT_CATALOG[type];

    buildInspBody.innerHTML = '';
    componentInputs.delete(id);
    componentSelects.delete(id);

    const inputs:  Record<string, HTMLInputElement>  = {};
    const selects: Record<string, HTMLSelectElement> = {};

    function dispatchUpdate(): void {
        const dims = def.geomType === 'cylinder'
            ? [parseFloat(inputs['r'].value) || 0.001, parseFloat(inputs['l'].value) || 0.001]
            : [parseFloat(inputs['w'].value) || 0.001, parseFloat(inputs['d'].value) || 0.001, parseFloat(inputs['h'].value) || 0.001];
        const jt = selects['jt']?.value ?? 'fixed';
        buildCtrl.updateComponent(id, {
            x:  parseFloat(inputs['x'].value)  || 0,
            y:  parseFloat(inputs['y'].value)  || 0,
            z:  parseFloat(inputs['z'].value)  || 0,
            rx: parseFloat(inputs['rx'].value) || 0,
            ry: parseFloat(inputs['ry'].value) || 0,
            rz: parseFloat(inputs['rz'].value) || 0,
            dims,
            jointType:  jt as 'fixed' | 'continuous' | 'revolute' | 'prismatic',
            axis: [
                parseFloat(inputs['ax']?.value) || 0,
                parseFloat(inputs['ay']?.value) || 0,
                parseFloat(inputs['az']?.value) || 1,
            ] as [number, number, number],
            limitLower: parseFloat(inputs['limitMin']?.value) || -1.5708,
            limitUpper: parseFloat(inputs['limitMax']?.value) ||  1.5708,
            parent: selects['parent']?.value ?? 'base_link',
        });
    }

    function addRow(key: string, axisClass: string, label: string, step: number, value: number, container: HTMLElement = buildInspBody): void {
        const row = document.createElement('div');
        row.className = 'inspector-row';
        const lbl = document.createElement('label');
        lbl.className   = axisClass;
        lbl.textContent = label;
        const inp = document.createElement('input');
        inp.type  = 'number';
        inp.step  = String(step);
        inp.value = String(value);
        inp.addEventListener('input', dispatchUpdate);
        makeScrubLabel(lbl, inp);
        inputs[key] = inp;
        row.append(lbl, inp);
        container.appendChild(row);
    }

    function addGroupLabel(text: string, container: HTMLElement = buildInspBody): void {
        const lbl = document.createElement('div');
        lbl.className   = 'build-group-label';
        lbl.textContent = text;
        container.appendChild(lbl);
    }

    function addSelectRow(key: string, label: string, options: string[], container: HTMLElement = buildInspBody): void {
        const row = document.createElement('div');
        row.className = 'inspector-row';
        const lbl = document.createElement('label');
        lbl.textContent = label;
        const sel = document.createElement('select');
        sel.className = 'build-select';
        for (const opt of options) {
            const o = document.createElement('option');
            o.value = o.textContent = opt;
            sel.appendChild(o);
        }
        sel.addEventListener('change', dispatchUpdate);
        selects[key] = sel;
        row.append(lbl, sel);
        container.appendChild(row);
    }

    addGroupLabel('Position');
    addRow('x',  'axis-x', 'X', 0.005, saved.x  ?? 0);
    addRow('y',  'axis-y', 'Y', 0.005, saved.y  ?? 0);
    addRow('z',  'axis-z', 'Z', 0.005, saved.z  ?? def.defaultZ);

    addGroupLabel('Size');
    if (def.geomType === 'cylinder') {
        addRow('r', 'axis-x', 'R', 0.005, saved.dims[0] ?? def.defaultDims[0]);
        addRow('l', 'axis-z', 'L', 0.005, saved.dims[1] ?? def.defaultDims[1]);
    } else {
        addRow('w', 'axis-x', 'W', 0.005, saved.dims[0] ?? def.defaultDims[0]);
        addRow('d', 'axis-y', 'D', 0.005, saved.dims[1] ?? def.defaultDims[1]);
        addRow('h', 'axis-z', 'H', 0.005, saved.dims[2] ?? def.defaultDims[2]);
    }

    // ── Advanced section (Rotation, Joint, Axis, Limits, Preview) ─────────
    const savedJt   = saved.jointType ?? 'fixed';
    const hasLimits = savedJt === 'revolute' || savedJt === 'prismatic';

    const advancedDetails = document.createElement('details');
    advancedDetails.className = 'build-comp-advanced';
    if (savedJt !== 'fixed') advancedDetails.open = true;
    const advancedSummary = document.createElement('summary');
    advancedSummary.textContent = 'Rotation · Joint · Limits';
    advancedDetails.appendChild(advancedSummary);
    buildInspBody.appendChild(advancedDetails);

    addGroupLabel('Rotation', advancedDetails);
    addRow('rx', 'axis-x', 'Rx', 0.01, saved.rx ?? 0, advancedDetails);
    addRow('ry', 'axis-y', 'Ry', 0.01, saved.ry ?? 0, advancedDetails);
    addRow('rz', 'axis-z', 'Rz', 0.01, saved.rz ?? 0, advancedDetails);

    addGroupLabel('Joint', advancedDetails);
    addSelectRow('parent', 'Parent', buildCtrl.getAvailableLinks().filter(l => l !== id), advancedDetails);
    addSelectRow('jt', 'Type', ['fixed', 'continuous', 'revolute', 'prismatic'], advancedDetails);
    if (saved.parent && selects['parent']) selects['parent'].value = saved.parent;
    if (saved.jointType && selects['jt'])  selects['jt'].value    = saved.jointType;

    const axisSection = document.createElement('div');
    addGroupLabel('Axis', axisSection);
    addRow('ax', 'axis-x', 'X', 0.1, saved.axis[0] ?? 0, axisSection);
    addRow('ay', 'axis-y', 'Y', 0.1, saved.axis[1] ?? 0, axisSection);
    addRow('az', 'axis-z', 'Z', 0.1, saved.axis[2] ?? 1, axisSection);
    axisSection.hidden = savedJt === 'fixed';
    advancedDetails.appendChild(axisSection);

    const limitsSection = document.createElement('div');
    addGroupLabel('Limits', limitsSection);
    addRow('limitMin', 'axis-x', 'Min', 0.01, saved.limitLower ?? -1.5708, limitsSection);
    addRow('limitMax', 'axis-z', 'Max', 0.01, saved.limitUpper ??  1.5708, limitsSection);
    limitsSection.hidden = !hasLimits;
    advancedDetails.appendChild(limitsSection);

    const previewSection = document.createElement('div');
    const previewSlider  = document.createElement('input');
    previewSlider.type  = 'range';
    previewSlider.step  = '0.01';
    previewSlider.min   = String(saved.limitLower ?? -1.5708);
    previewSlider.max   = String(saved.limitUpper ??  1.5708);
    previewSlider.value = '0';
    previewSlider.dataset.preview = 'true';
    previewSlider.className = 'insp-preview-slider';
    previewSlider.addEventListener('input', () => {
        viewer.robot?.setJointValue(`${id}_joint`, parseFloat(previewSlider.value));
    });
    inputs['limitMin']?.addEventListener('input', () => { previewSlider.min = inputs['limitMin'].value; });
    inputs['limitMax']?.addEventListener('input', () => { previewSlider.max = inputs['limitMax'].value; });
    addGroupLabel('Preview', previewSection);
    const previewRow = document.createElement('div');
    previewRow.className = 'build-preview-row';
    previewRow.appendChild(previewSlider);
    previewSection.appendChild(previewRow);
    previewSection.hidden = !hasLimits;
    advancedDetails.appendChild(previewSection);

    selects['jt'].addEventListener('change', () => {
        const jt = selects['jt'].value;
        const showLimits = jt === 'revolute' || jt === 'prismatic';
        axisSection.hidden    = jt === 'fixed';
        limitsSection.hidden  = !showLimits;
        previewSection.hidden = !showLimits;
        if (jt !== 'fixed' && !advancedDetails.open) advancedDetails.open = true;
        if (!showLimits) {
            previewSlider.value = '0';
            viewer.robot?.setJointValue(`${id}_joint`, 0);
        }
    });

    componentInputs.set(id, inputs);
    if (selects['parent']) componentSelects.set(id, selects['parent']);
    buildInspTitle.textContent = `${def.label} · ${id}`;
    buildInspEl.hidden = false;
}

function removeComponentItem(id: string): void {
    const card = buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
    componentInputs.delete(id);
    componentSelects.delete(id);
    removeOptionFromParentSelects(id);
    if (_buildSelCompId === id) _deselectComp();
    card?.remove();
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
// Init here so all helpers (renderComponentItem, syncSlidersFromController,
// refreshPaletteCounts) are in scope.
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
            if (_buildSelCompId) {
                const entry = buildCtrl.getComponentEntries().find(e => e.id === _buildSelCompId);
                if (!entry) return null;
                return { id: _buildSelCompId, type: entry.type, data: buildCtrl.getComponentData(_buildSelCompId) };
            }
            if (_buildSelPartName) {
                const joint = viewer.robot?.joints[_buildSelPartName];
                if (!joint) return null;
                const p = joint.position;
                const jt = (joint as { jointType?: string }).jointType ?? 'fixed';
                return {
                    id:   _buildSelPartName,
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

// ── Component 3D drag ─────────────────────────────────────────────────────
// Click a catalog component in the viewer and drag to reposition it (XY plane).
// Only works for fixed-joint components (non-fixed joints use the joint manipulator).

// Component 3D drag state — all fields used together across three event handlers.
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

function _compUpdateNDC(e: PointerEvent): void {
    const rect = viewer.renderer.domElement.getBoundingClientRect();
    _compDrag.mouse.set(
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
       -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    );
}

function _compFindId(obj: { parent: typeof obj | null; isURDFLink?: boolean; urdfName?: string }): string | null {
    const ids = buildCtrl.componentIds;
    let curr = obj;
    while (curr) {
        if (curr.isURDFLink && curr.urdfName && ids.has(curr.urdfName)) return curr.urdfName;
        curr = curr.parent!;
    }
    return null;
}

const _SNAP = 0.001; // 1 mm grid snap for component drag

viewer.renderer.domElement.addEventListener('pointerdown', (e: PointerEvent) => {
    if (!buildCtrl.isCatalogActive) return;
    _compUpdateNDC(e);
    _compDrag.raycaster.setFromCamera(_compDrag.mouse, viewer.camera);
    const hits = _compDrag.raycaster.intersectObject(viewer.scene, true);
    if (!hits.length) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = _compFindId(hits[0].object as any);
    if (!id || !buildCtrl.isFixedComponent(id)) return;

    const xyz = buildCtrl.getComponentXYZ(id);
    if (!xyz) return;

    // Horizontal drag plane at the component's height (Three.js Y = URDF Z)
    _compDrag.hPlane.set(new Vector3(0, 1, 0), -xyz.z);
    _compDrag.raycaster.ray.intersectPlane(_compDrag.hPlane, _compDrag.initHit);

    // Vertical drag plane facing the camera (for Shift+drag Z axis)
    const _camFwd = new Vector3();
    viewer.camera.getWorldDirection(_camFwd);
    _camFwd.y = 0; _camFwd.normalize();
    _compDrag.vPlane.setFromNormalAndCoplanarPoint(_camFwd, new Vector3(xyz.x, xyz.z, -xyz.y));
    _compDrag.raycaster.ray.intersectPlane(_compDrag.vPlane, _compDrag.initVHit);

    _compDrag.id    = id;
    _compDrag.initX = xyz.x;
    _compDrag.initY = xyz.y;
    _compDrag.initZ = xyz.z;
    _compDrag.curZ  = xyz.z;
    _compDrag.curX  = xyz.x;
    _compDrag.curY  = xyz.y;

    buildCtrl.startComponentDrag(id);
    viewer.controls.enabled = false;

    _compDrag.downX = e.clientX;
    _compDrag.downY = e.clientY;

    _compDrag.card = buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
    _compDrag.card?.classList.add('dragging');
    _selectCompCard(id);  // ensures inspector inputs exist for drag position updates

    viewer.renderer.domElement.setPointerCapture(e.pointerId);
    e.stopPropagation();
});

viewer.renderer.domElement.addEventListener('pointermove', (e: PointerEvent) => {
    if (!_compDrag.id) return;
    _compUpdateNDC(e);
    _compDrag.raycaster.setFromCamera(_compDrag.mouse, viewer.camera);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const joint = (viewer.robot as any)?.joints[`${_compDrag.id}_joint`];
    const inp   = componentInputs.get(_compDrag.id);

    viewer.renderer.domElement.style.cursor = e.shiftKey ? 'ns-resize' : 'grabbing';

    if (e.shiftKey) {
        // Shift: vertical drag → change URDF Z
        if (!_compDrag.raycaster.ray.intersectPlane(_compDrag.vPlane, _compDrag.newHit)) return;
        _compDrag.curZ = Math.round((_compDrag.initZ + (_compDrag.newHit.y - _compDrag.initVHit.y)) / _SNAP) * _SNAP;
        if (joint) joint.position.set(_compDrag.curX, _compDrag.curY, _compDrag.curZ);
        if (inp) inp['z'].value = _compDrag.curZ.toFixed(4);
    } else {
        // Default: horizontal drag → change URDF X, Y
        if (!_compDrag.raycaster.ray.intersectPlane(_compDrag.hPlane, _compDrag.newHit)) return;
        _compDrag.curX = Math.round((_compDrag.initX + (_compDrag.newHit.x - _compDrag.initHit.x)) / _SNAP) * _SNAP;
        _compDrag.curY = Math.round((_compDrag.initY - (_compDrag.newHit.z - _compDrag.initHit.z)) / _SNAP) * _SNAP;
        if (joint) joint.position.set(_compDrag.curX, _compDrag.curY, _compDrag.curZ);
        if (inp) { inp['x'].value = _compDrag.curX.toFixed(4); inp['y'].value = _compDrag.curY.toFixed(4); }
    }
});

viewer.renderer.domElement.addEventListener('pointerup', (e: PointerEvent) => {
    if (!_compDrag.id) return;
    const wasDrag = Math.hypot(e.clientX - _compDrag.downX, e.clientY - _compDrag.downY) > 8;
    buildCtrl.finishComponentDrag(_compDrag.id, _compDrag.curX, _compDrag.curY, _compDrag.curZ);
    viewer.controls.enabled = true;
    viewer.renderer.domElement.style.cursor = '';
    _compDrag.card?.classList.remove('dragging');

    if (!wasDrag && _compDrag.card) {
        const cardId = _compDrag.card.dataset.id;
        if (cardId) _selectCompCard(cardId);
        _compDrag.card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    _compDrag.card = null;
    _compDrag.id   = null;
});

// ── Component hover tooltip ────────────────────────────────────────────────
const _hoverTip = $('build-hover-tip');
let _hoverTipRaf = 0;

viewer.renderer.domElement.addEventListener('pointermove', (e: PointerEvent) => {
    if (!buildCtrl.isCatalogActive || _compDrag.id) { _hoverTip.style.display = 'none'; return; }
    cancelAnimationFrame(_hoverTipRaf);
    _hoverTipRaf = requestAnimationFrame(() => {
        _compUpdateNDC(e);
        _compDrag.raycaster.setFromCamera(_compDrag.mouse, viewer.camera);
        const hits = _compDrag.raycaster.intersectObject(viewer.scene, true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const id = hits.length ? _compFindId(hits[0].object as any) : null;
        if (id) {
            const def = COMPONENT_CATALOG[buildCtrl.getComponentData(id)?.type ?? ''];
            _hoverTip.textContent = def ? `${def.label} #${id.split('_').pop()}` : id;
            _hoverTip.style.display = 'block';
            _hoverTip.style.left = (e.clientX + 12) + 'px';
            _hoverTip.style.top  = (e.clientY - 28) + 'px';
        } else {
            _hoverTip.style.display = 'none';
        }
    });
});

viewer.renderer.domElement.addEventListener('pointerleave', () => {
    _hoverTip.style.display = 'none';
});

// ── Mesh blob helpers ─────────────────────────────────────────────────────────

function regenMeshBlob(id: string, type: string): void {
    const libEntry = LIBRARY.find(e => e.id === type);
    if (!libEntry) return;
    libEntry.factory()
        .then(({ generate }) => buildCtrl.restoreMeshBlob(id, generate()))
        .catch(err => console.warn('[regenMeshBlob] failed for', id, err));
}

// ── Library tab ───────────────────────────────────────────────────────────────

const CATEGORY_ICON: Record<string, string> = {
    Sensor: '📡', Actuator: '⚙️', MCU: '💾', Power: '🔋', Structural: '🧱',
};

let _libActiveCat = '';

function buildLibraryGrid(): void {
    const hasBuild = buildCtrl.isCatalogActive;
    const query    = libSearchEl.value.trim().toLowerCase();

    const entries = LIBRARY.filter(e => {
        if (_libActiveCat && e.category !== _libActiveCat) return false;
        if (query && !e.label.toLowerCase().includes(query)
                  && !e.description.toLowerCase().includes(query)) return false;
        return true;
    });

    libGridEl.innerHTML = '';
    libEmptyEl.hidden = entries.length > 0;
    for (const entry of entries) libGridEl.appendChild(createLibCard(entry, hasBuild));
}

function createLibCard(entry: LibraryEntry, hasBuild: boolean): HTMLElement {
    const card = document.createElement('div');
    card.className = 'lib-card';

    const thumb = document.createElement('div');
    thumb.className = 'lib-thumb';
    thumb.style.background = entry.cssColor + '33';
    thumb.style.borderBottom = `2px solid ${entry.cssColor}`;
    thumb.textContent = CATEGORY_ICON[entry.category] ?? '📦';

    const info = document.createElement('div');
    info.className = 'lib-card-info';

    const name = document.createElement('div');
    name.className = 'lib-card-name';
    name.textContent = entry.label;
    name.title = entry.description;

    const meta = document.createElement('div');
    meta.className = 'lib-card-meta';
    const cat  = Object.assign(document.createElement('span'), { className: 'lib-card-cat',  textContent: entry.category });
    const dimsText = entry.defaultDims.map(d => Math.round(d * 1000)).join('×') + ' mm';
    const dims = Object.assign(document.createElement('span'), { className: 'lib-card-dims', textContent: dimsText });
    meta.append(cat, dims);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'lib-card-add';
    addBtn.textContent = 'Add to Build';
    addBtn.disabled = !hasBuild;
    addBtn.addEventListener('click', () => void handleLibraryAdd(entry, addBtn));

    info.append(name, meta, addBtn);
    card.append(thumb, info);
    return card;
}

async function handleLibraryAdd(entry: LibraryEntry, btn: HTMLButtonElement): Promise<void> {
    if (!buildCtrl.isCatalogActive) return;
    const origText = btn.textContent ?? 'Add to Build';
    btn.disabled = true;
    btn.textContent = 'Generating…';
    try {
        const { generate } = await entry.factory();
        const stl = generate();
        const id = buildCtrl.addMeshComponent(entry.id, stl);
        addOptionToParentSelects(id);
        renderComponentItem(id, entry.id);
        refreshPaletteCounts();
        $<HTMLButtonElement>('tab-build').click();
        buildComponentsListEl
            .querySelector<HTMLElement>(`[data-id="${id}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
        console.error('[Library] generate failed:', err);
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = origText; btn.disabled = !buildCtrl.isCatalogActive; }, 2000);
        return;
    }
    btn.textContent = origText;
    btn.disabled = false;
}

libSearchEl.addEventListener('input', buildLibraryGrid);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

for (const pill of libPillsEl.querySelectorAll<HTMLButtonElement>('.lib-pill')) {
    pill.addEventListener('click', () => {
        for (const p of libPillsEl.querySelectorAll<HTMLButtonElement>('.lib-pill'))
            p.classList.remove('lib-pill--active');
        pill.classList.add('lib-pill--active');
        _libActiveCat = pill.dataset.cat ?? '';
        buildLibraryGrid();
    });
}
