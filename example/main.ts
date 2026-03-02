import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';
import { URDFBuildController, CHASSIS_DEFAULTS, WHEEL_DEFAULTS, COMPONENT_CATALOG } from './build.js';
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

    // Restore persisted build state (replaces viewer.urdf if anything was saved)
    buildComponentsListEl.innerHTML = '';
    const restored = buildCtrl.restore();
    for (const { id, type } of restored) renderComponentItem(id, type);

    if (restored.length > 0) syncSlidersFromController();
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

let _hoverTimer: ReturnType<typeof setTimeout> | null = null;
let _gestureHoverBtn: HTMLButtonElement | null = null;

for (let i = 0; i < ROBOTS.length; i++) {
    const robot = ROBOTS[i];
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

// When leaving the pill entirely, cancel pending load and restore slider to active
robotsPanel.closest('.robot-shell')!.addEventListener('mouseleave', () => {
    if (_hoverTimer) { clearTimeout(_hoverTimer); _hoverTimer = null; }
    moveSliderToActive();
});

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

const buildCasterRadiusEl  = document.getElementById('build-caster-radius')  as HTMLInputElement;
const buildCasterWidthEl   = document.getElementById('build-caster-width')   as HTMLInputElement;
const buildBatteryLEl      = document.getElementById('build-battery-l')      as HTMLInputElement;
const buildBatteryWEl      = document.getElementById('build-battery-w')      as HTMLInputElement;
const buildBatteryHEl      = document.getElementById('build-battery-h')      as HTMLInputElement;
const buildPowerbankREl    = document.getElementById('build-powerbank-r')    as HTMLInputElement;
const buildPowerbankLEl    = document.getElementById('build-powerbank-l')    as HTMLInputElement;

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

syncPair(buildCasterRadiusEl, document.getElementById('build-caster-radius-num') as HTMLInputElement, onCasterChange);
syncPair(buildCasterWidthEl,  document.getElementById('build-caster-width-num')  as HTMLInputElement, onCasterChange);
syncPair(buildBatteryLEl,     document.getElementById('build-battery-l-num')     as HTMLInputElement, onBatteryChange);
syncPair(buildBatteryWEl,     document.getElementById('build-battery-w-num')     as HTMLInputElement, onBatteryChange);
syncPair(buildBatteryHEl,     document.getElementById('build-battery-h-num')     as HTMLInputElement, onBatteryChange);
syncPair(buildPowerbankREl,   document.getElementById('build-powerbank-r-num')   as HTMLInputElement, onPowerbankChange);
syncPair(buildPowerbankLEl,   document.getElementById('build-powerbank-l-num')   as HTMLInputElement, onPowerbankChange);

const buildExportBtn        = document.getElementById('build-export')          as HTMLButtonElement;
const buildUndoBtn          = document.getElementById('build-undo')            as HTMLButtonElement;
const buildRedoBtn          = document.getElementById('build-redo')            as HTMLButtonElement;
const buildResetBtn         = document.getElementById('build-reset')           as HTMLButtonElement;
const buildPaletteEl        = document.getElementById('build-palette')          as HTMLElement;
const buildComponentsListEl = document.getElementById('build-components-list') as HTMLElement;
const buildNewNameEl        = document.getElementById('build-new-name')         as HTMLInputElement;
const buildNewCreateBtn     = document.getElementById('build-new-create')       as HTMLButtonElement;

// Helper: sync all parametric sliders from controller state
function syncSlidersFromController(): void {
    const cp = buildCtrl.chassisParams;
    const wp = buildCtrl.wheelParams;
    const pb = buildCtrl.powerbank;
    const bb = buildCtrl.batteryBox;
    const setSlider = (el: HTMLInputElement, numId: string, v: number) => {
        el.value = String(v);
        const num = document.getElementById(numId) as HTMLInputElement | null;
        if (num) num.value = String(v);
    };
    setSlider(buildChassisThicknessEl, 'build-chassis-thickness-num', cp.thickness     * 1000);
    setSlider(buildChassisBodyHWEl,    'build-chassis-body-hw-num',   cp.bodyHalfWidth * 1000);
    setSlider(buildChassisRearHWEl,    'build-chassis-rear-hw-num',   cp.rearHalfWidth * 1000);
    setSlider(buildWheelRadiusEl,      'build-wheel-radius-num',      wp.radius        * 1000);
    setSlider(buildWheelWidthEl,       'build-wheel-width-num',       wp.width         * 1000);
    setSlider(buildCasterRadiusEl,     'build-caster-radius-num',     buildCtrl.casterRadius * 1000);
    setSlider(buildCasterWidthEl,      'build-caster-width-num',      buildCtrl.casterWidth  * 1000);
    setSlider(buildBatteryLEl,         'build-battery-l-num',         bb.l * 1000);
    setSlider(buildBatteryWEl,         'build-battery-w-num',         bb.w * 1000);
    setSlider(buildBatteryHEl,         'build-battery-h-num',         bb.h * 1000);
    setSlider(buildPowerbankREl,       'build-powerbank-r-num',       pb.radius * 1000);
    setSlider(buildPowerbankLEl,       'build-powerbank-l-num',       pb.length * 1000);
}

// Undo/redo/reset buttons
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
    buildComponentsListEl.innerHTML = '';
    for (const { id, type } of buildCtrl.getComponentEntries()) renderComponentItem(id, type);
    syncSlidersFromController();
    buildCtrl.onHistoryChange?.();
};

// Keyboard shortcuts
document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!buildCtrl.isActive) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); buildCtrl.undo(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); buildCtrl.redo(); }
});

buildExportBtn.addEventListener('click', () => void buildCtrl.exportZip(buildExportBtn));

buildNewCreateBtn.addEventListener('click', () => {
    buildComponentsListEl.innerHTML = '';
    buildCtrl.initFromScratch(buildNewNameEl.value);
    buildCtrl.open();
    document.getElementById('tab-build')?.click();
});

// Populate component palette
for (const [type, def] of Object.entries(COMPONENT_CATALOG)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'robot-btn';
    btn.textContent = def.label;
    btn.dataset.comp = type;
    btn.addEventListener('click', () => {
        if (!buildCtrl.isCatalogActive) return;
        const id = buildCtrl.addComponent(type);
        renderComponentItem(id, type);
    });
    buildPaletteEl.appendChild(btn);
}

function renderComponentItem(id: string, type: string): void {
    const def  = COMPONENT_CATALOG[type];
    const item = document.createElement('div');
    item.className = 'build-component';
    item.dataset.id = id;

    // ── Header ────────────────────────────────────────────────────────
    const header = document.createElement('div');
    header.className = 'build-component-header';
    const labelEl = document.createElement('span');
    labelEl.textContent = `${def.label} ${id.split('_').pop()}`;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'build-remove-btn';
    removeBtn.title = 'Remove';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => { buildCtrl.removeComponent(id); item.remove(); });
    header.append(labelEl, removeBtn);

    // ── Input rows ────────────────────────────────────────────────────
    const body = document.createElement('div');
    body.style.cssText = 'display: flex; flex-direction: column; gap: 2px;';

    const inputs:  Record<string, HTMLInputElement>  = {};
    const selects: Record<string, HTMLSelectElement> = {};

    const dispatchUpdate = () => {
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
    };

    const addRow = (key: string, axisClass: string, label: string, step: number, value: number, container: HTMLElement = body) => {
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
    };

    const addGroupLabel = (text: string, container: HTMLElement = body) => {
        const lbl = document.createElement('div');
        lbl.className   = 'build-group-label';
        lbl.textContent = text;
        container.appendChild(lbl);
    };

    const addSelectRow = (key: string, label: string, options: string[], container: HTMLElement = body) => {
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
    };

    // Position
    addGroupLabel('Position');
    addRow('x',  'axis-x', 'X', 0.005, 0);
    addRow('y',  'axis-y', 'Y', 0.005, 0);
    addRow('z',  'axis-z', 'Z', 0.005, def.defaultZ);

    // Rotation
    addGroupLabel('Rotation');
    addRow('rx', 'axis-x', 'Rx', 0.01, 0);
    addRow('ry', 'axis-y', 'Ry', 0.01, 0);
    addRow('rz', 'axis-z', 'Rz', 0.01, 0);

    // Dimensions
    addGroupLabel('Size');
    if (def.geomType === 'cylinder') {
        addRow('r', 'axis-x', 'R',  0.005, def.defaultDims[0]);
        addRow('l', 'axis-z', 'L',  0.005, def.defaultDims[1]);
    } else {
        addRow('w', 'axis-x', 'W',  0.005, def.defaultDims[0]);
        addRow('d', 'axis-y', 'D',  0.005, def.defaultDims[1]);
        addRow('h', 'axis-z', 'H',  0.005, def.defaultDims[2]);
    }

    // Joint
    addGroupLabel('Joint');
    addSelectRow('parent', 'Parent', buildCtrl.getAvailableLinks().filter(l => l !== id));
    addSelectRow('jt', 'Type', ['fixed', 'continuous', 'revolute', 'prismatic']);

    // Axis section (shown for non-fixed joints)
    const axisSection = document.createElement('div');
    addGroupLabel('Axis', axisSection);
    addRow('ax', 'axis-x', 'X', 0.1, 0, axisSection);
    addRow('ay', 'axis-y', 'Y', 0.1, 0, axisSection);
    addRow('az', 'axis-z', 'Z', 0.1, 1, axisSection);
    axisSection.hidden = true;
    body.appendChild(axisSection);

    // Limits section (shown for revolute/prismatic)
    const limitsSection = document.createElement('div');
    addGroupLabel('Limits', limitsSection);
    addRow('limitMin', 'axis-x', 'Min', 0.01, -1.5708, limitsSection);
    addRow('limitMax', 'axis-z', 'Max', 0.01,  1.5708, limitsSection);
    limitsSection.hidden = true;
    body.appendChild(limitsSection);

    selects['jt'].addEventListener('change', () => {
        const jt = selects['jt'].value;
        axisSection.hidden   = jt === 'fixed';
        limitsSection.hidden = jt !== 'revolute' && jt !== 'prismatic';
    });

    item.append(header, body);
    buildComponentsListEl.appendChild(item);
}
