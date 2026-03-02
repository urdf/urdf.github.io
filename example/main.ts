import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, CHASSIS_DEFAULTS, WHEEL_DEFAULTS } from './build.js';
import type { GestureController } from './gesture.js';

customElements.define('urdf-viewer', URDFManipulator);

const viewer = document.getElementById('viewer') as URDFManipulator;
const jointsPanel = document.getElementById('joints')!;
const robotsPanel = document.getElementById('robots')!;
const loadingEl = document.getElementById('loading')!;

const partLabel = document.getElementById('part-label')!;

const gestureToggleBtn = document.getElementById('gesture-toggle') as HTMLButtonElement;
const gestureOverlay   = document.getElementById('gesture-overlay') as HTMLCanvasElement;
const gestureVideo     = document.getElementById('gesture-video') as HTMLVideoElement;
const gestureSectionEl = document.getElementById('gesture-section')!;
const gestureHeaderEl  = document.getElementById('gesture-section-header')!;

const editorPanelEl = document.getElementById('editor-panel')!;
const buildNoticeEl = document.getElementById('build-notice') as HTMLElement;

const editorCtrl = new URDFEditorController(viewer, editorPanelEl);
const buildCtrl  = new URDFBuildController(viewer, buildNoticeEl);

document.getElementById('tab-robot')!.addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.close();
});
document.getElementById('tab-editor')!.addEventListener('click', () => {
    buildCtrl.close();
    editorCtrl.open();
});
document.getElementById('tab-build')!.addEventListener('click', () => {
    editorCtrl.close();
    buildCtrl.open();
});

const ignoreLimitsEl = document.getElementById('ignore-limits') as HTMLInputElement;
const showCollisionEl = document.getElementById('show-collision') as HTMLInputElement;
const displayShadowEl = document.getElementById('display-shadow') as HTMLInputElement;
const upAxisEl = document.getElementById('up-axis') as HTMLSelectElement;

interface RobotConfig {
    name: string;
    label: string;
    urdf?: string;
    parts?: string;  // base path for browser-assembled robots, e.g. '/robots/robot-car/robot-car'
    up: string;
    package?: string;
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
    const manifest = await fetch(`${base}.parts.json`).then(r => r.json()) as { robot: string; parts: string[] };
    const dir      = base.replace(/\/[^/]+$/, '');
    const texts    = await Promise.all(manifest.parts.map(f => fetch(`${dir}/parts/${f}`).then(r => r.text())));
    const partMap  = new Map(manifest.parts.map((f, i) => [f, texts[i]] as [string, string]));
    buildCtrl.init(manifest.robot, dir, partMap);
    // Rewrite relative mesh filenames to absolute paths — blob URLs have no usable base
    const xml      = assembleURDF(manifest.robot, partMap)
        .replace(/filename="([^/"]+)"/g, `filename="${dir}/$1"`);
    if (_partsBlobUrl) URL.revokeObjectURL(_partsBlobUrl);
    _partsBlobUrl  = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
    viewer.urdf    = _partsBlobUrl;
}

const ROBOTS: RobotConfig[] = [
    { name: 'Robot Car',          label: 'Car',      parts: '/robots/robot-car/robot-car',                     up: '+Z' },
    { name: 'T12',                label: 'T12',      urdf: '/robots/T12/urdf/T12.URDF',                       up: '-Z' },
    { name: 'TriATHLETE',         label: 'Tri',      urdf: '/robots/TriATHLETE/urdf/TriATHLETE.URDF',         up: '-Z' },
    { name: 'Laikago',            label: 'Laikago',  urdf: '/robots/laikago/urdf/laikago.urdf',               up: '+Z' },
    {
        name: 'Open Manipulator X',
        label: 'OM-X',
        urdf: '/robots/open_manipulator_x/open_manipulator_x.urdf',
        package: 'open_manipulator_description: /robots/open_manipulator_x',
        up: '+Z',
    },
    { name: 'SO-ARM100',          label: 'SO-100',   urdf: '/robots/so_arm100/so100.urdf',                    up: '+Z' },
    { name: 'Simple Humanoid',    label: 'Humanoid', urdf: '/robots/simple_humanoid/simple_humanoid.urdf',    up: '+Z' },
    {
        name: 'Spryped',
        label: 'Spryped',
        urdf: '/robots/spryped/urdf/spryped.urdf',
        package: 'spryped_urdf_rev06: /robots/spryped',
        up: '+Z',
    },
];

let currentRobotIndex = 0;

const robotTrackSlider = document.getElementById('robot-track-slider') as HTMLElement;

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

    // Derive a stable source URL for the editor regardless of loading method
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
}

for (let i = 0; i < ROBOTS.length; i++) {
    const robot = ROBOTS[i];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'robot-btn';
    btn.textContent = robot.label;
    btn.title = robot.name;
    btn.dataset.name = robot.name;
    btn.addEventListener('click', () => loadRobot(robot, i));
    robotsPanel.appendChild(btn);
}

new ResizeObserver(moveSliderToActive).observe(robotsPanel);

robotTrackSlider.style.transition = 'none';
loadRobot(ROBOTS[0], 0);
requestAnimationFrame(() => requestAnimationFrame(() => {
    robotTrackSlider.style.transition = '';
}));

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

const inspectorEl       = document.getElementById('inspector')!;
const inspectorName     = document.getElementById('inspector-name')!;
const inspectorX        = document.getElementById('inspector-x') as HTMLInputElement;
const inspectorY        = document.getElementById('inspector-y') as HTMLInputElement;
const inspectorZ        = document.getElementById('inspector-z') as HTMLInputElement;
const inspectorScaleX   = document.getElementById('inspector-scale-x') as HTMLInputElement;
const inspectorScaleY   = document.getElementById('inspector-scale-y') as HTMLInputElement;
const inspectorScaleZ   = document.getElementById('inspector-scale-z') as HTMLInputElement;
const inspectorSnippet  = document.getElementById('inspector-snippet')!;
const inspectorCopy     = document.getElementById('inspector-copy') as HTMLButtonElement;
const inspectorClose    = document.getElementById('inspector-close')!;

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
    if (!joint) { inspectorEl.style.display = 'none'; return; }

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
}

for (const el of [inspectorX, inspectorY, inspectorZ, inspectorScaleX, inspectorScaleY, inspectorScaleZ]) {
    el.addEventListener('input', applyInspector);
}

/**
 * Make an inspector label scrub its paired number input on horizontal drag.
 * step attribute controls sensitivity (e.g. 0.001 → 1 mm/px, 0.01 → 1%/px).
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
        if (!dragging && Math.abs(dx) < 3) return;   // 3 px dead zone
        dragging = true;
        input.value = String(parseFloat((startVal + dx * step).toFixed(6)));
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    label.addEventListener('pointerup', () => {
        if (!dragging) input.focus();   // plain click → focus the input
        dragging = false;
    });
}

for (const input of [inspectorX, inspectorY, inspectorZ, inspectorScaleX, inspectorScaleY, inspectorScaleZ]) {
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

viewer.addEventListener('urdf-change', () => {
    loadingEl.classList.add('visible');
    jointsPanel.innerHTML = '';
    selectPart(null);
});

viewer.addEventListener('urdf-error', () => {
    loadingEl.classList.remove('visible');
});

viewer.addEventListener('urdf-processed', () => {
    loadingEl.classList.remove('visible');
});

const DEG = Math.PI / 180;

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

        const isPrismatic = joint.jointType === 'prismatic';
        const displayScale = isPrismatic ? 1 : 1 / DEG; // show degrees for rotary joints

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
        };

        slider.addEventListener('input', () => {
            viewer.setJointValue(joint.name, parseFloat(slider.value));
        }, { signal });

        number.addEventListener('change', () => {
            const scale = isPrismatic ? 1 : DEG;
            viewer.setJointValue(joint.name, parseFloat(number.value) * scale);
        }, { signal });

        row.append(slider, number);
        el.append(nameEl, row);
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
            if (btn) moveSliderTo(btn);
            else moveSliderToActive();
        },
        onPointerLeave() { moveSliderToActive(); },
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

/** Keep a range slider and a number input in sync. */
function syncPair(slider: HTMLInputElement, num: HTMLInputElement, onChange: () => void): void {
    slider.addEventListener('input', () => { num.value = slider.value; onChange(); });
    num.addEventListener('change', () => {
        const v = Math.max(parseFloat(num.min), Math.min(parseFloat(num.max), parseFloat(num.value)));
        slider.value = String(v);
        num.value    = String(v);
        onChange();
    });
}

const buildChassisThicknessEl = document.getElementById('build-chassis-thickness')     as HTMLInputElement;
const buildChassisBodyHWEl    = document.getElementById('build-chassis-body-hw')       as HTMLInputElement;
const buildChassisRearHWEl    = document.getElementById('build-chassis-rear-hw')       as HTMLInputElement;
const buildWheelRadiusEl      = document.getElementById('build-wheel-radius')          as HTMLInputElement;
const buildWheelWidthEl       = document.getElementById('build-wheel-width')           as HTMLInputElement;

// Set default values from generator defaults (convert m → mm)
buildChassisThicknessEl.value = String(CHASSIS_DEFAULTS.thickness     * 1000);
buildChassisBodyHWEl.value    = String(CHASSIS_DEFAULTS.bodyHalfWidth * 1000);
buildChassisRearHWEl.value    = String(CHASSIS_DEFAULTS.rearHalfWidth * 1000);
buildWheelRadiusEl.value      = String(WHEEL_DEFAULTS.radius           * 1000);
buildWheelWidthEl.value       = String(WHEEL_DEFAULTS.width            * 1000);

// Mirror initial values to number inputs
for (const id of ['build-chassis-thickness', 'build-chassis-body-hw', 'build-chassis-rear-hw',
                   'build-wheel-radius', 'build-wheel-width']) {
    const slider = document.getElementById(id) as HTMLInputElement;
    const num    = document.getElementById(`${id}-num`) as HTMLInputElement;
    if (slider && num) num.value = slider.value;
}

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

syncPair(buildChassisThicknessEl, document.getElementById('build-chassis-thickness-num') as HTMLInputElement, onChassisChange);
syncPair(buildChassisBodyHWEl,    document.getElementById('build-chassis-body-hw-num')   as HTMLInputElement, onChassisChange);
syncPair(buildChassisRearHWEl,    document.getElementById('build-chassis-rear-hw-num')   as HTMLInputElement, onChassisChange);
syncPair(buildWheelRadiusEl,      document.getElementById('build-wheel-radius-num')      as HTMLInputElement, onWheelChange);
syncPair(buildWheelWidthEl,       document.getElementById('build-wheel-width-num')       as HTMLInputElement, onWheelChange);

const buildExportBtn = document.getElementById('build-export') as HTMLButtonElement;
buildExportBtn.addEventListener('click', () => void buildCtrl.exportZip(buildExportBtn));
