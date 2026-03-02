import { URDFManipulator } from '../src/index.js';
import { URDFEditorController } from './editor.js';

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

const editorPanelEl   = document.getElementById('editor-panel')!;
const editorToggleBtn = document.getElementById('editor-toggle') as HTMLButtonElement;

const editorCtrl = new URDFEditorController(viewer, editorPanelEl);

document.getElementById('editor-close')!.addEventListener('click', () => {
    editorCtrl.close();
    editorToggleBtn.classList.remove('active');
});

editorToggleBtn.addEventListener('click', () => {
    editorCtrl.toggle();
    editorToggleBtn.classList.toggle('active', editorCtrl.isOpen);
});

const ignoreLimitsEl = document.getElementById('ignore-limits') as HTMLInputElement;
const showCollisionEl = document.getElementById('show-collision') as HTMLInputElement;
const displayShadowEl = document.getElementById('display-shadow') as HTMLInputElement;
const upAxisEl = document.getElementById('up-axis') as HTMLSelectElement;
const urlInput = document.getElementById('url-input') as HTMLInputElement;
const urlLoadBtn = document.getElementById('url-load') as HTMLButtonElement;

// ── Available robots ──────────────────────────────────────────────────────────

const ROBOTS = [
    { name: 'Robot Car',          urdf: '/robots/robot-car/robot-car.urdf',                 up: '+Z' },
    { name: 'T12',                urdf: '/robots/T12/urdf/T12.URDF',                       up: '-Z' },
    { name: 'TriATHLETE',         urdf: '/robots/TriATHLETE/urdf/TriATHLETE.URDF',         up: '-Z' },
    { name: 'Laikago',            urdf: '/robots/laikago/urdf/laikago.urdf',               up: '+Z' },
    {
        name: 'Open Manipulator X',
        urdf: '/robots/open_manipulator_x/open_manipulator_x.urdf',
        package: 'open_manipulator_description: /robots/open_manipulator_x',
        up: '+Z',
    },
    { name: 'SO-ARM100',          urdf: '/robots/so_arm100/so100.urdf',                    up: '+Z' },
    { name: 'Simple Humanoid',    urdf: '/robots/simple_humanoid/simple_humanoid.urdf',    up: '+Z' },
    {
        name: 'Spryped',
        urdf: '/robots/spryped/urdf/spryped.urdf',
        package: 'spryped_urdf_rev06: /robots/spryped',
        up: '+Z',
    },
];

function clearActiveRobot(): void {
    for (const btn of robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn')) {
        btn.classList.remove('active');
    }
}

function loadRobot(robot: { name?: string; urdf: string; up: string; package?: string }): void {
    viewer.up = robot.up;
    upAxisEl.value = robot.up;
    viewer.package = robot.package ?? '';
    viewer.urdf = robot.urdf;

    clearActiveRobot();
    if (robot.name) {
        robotsPanel.querySelector<HTMLButtonElement>(`.robot-btn[data-name="${robot.name}"]`)
            ?.classList.add('active');
    }
    editorCtrl.setSourceUrl(robot.urdf);
}

for (const robot of ROBOTS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'robot-btn';
    btn.textContent = robot.name;
    btn.dataset.name = robot.name;
    btn.addEventListener('click', () => loadRobot(robot));
    robotsPanel.appendChild(btn);
}

loadRobot(ROBOTS[0]);

// ── Controls ──────────────────────────────────────────────────────────────────

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

displayShadowEl.checked = viewer.displayShadow;
upAxisEl.value = viewer.up;

// ── URL loader ────────────────────────────────────────────────────────────────

function loadUrl(): void {
    const url = urlInput.value.trim();
    if (!url) return;
    const lower = url.toLowerCase();
    if (!lower.endsWith('.urdf') && !lower.endsWith('.xml')) return;
    clearActiveRobot();
    viewer.urdf = url;
    editorCtrl.setSourceUrl(url);
}

urlLoadBtn.addEventListener('click', loadUrl);
urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') loadUrl(); });

// ── Helpers ───────────────────────────────────────────────────────────────────

function toLabel(jointName: string): string {
    return jointName
        .replace(/_joint$/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function linkNameFor(jointName: string): string {
    return jointName.replace(/_joint$/, '');
}

// ── Part Inspector ────────────────────────────────────────────────────────────

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
    if (!jointName || !viewer.robot) { inspectorEl.style.display = 'none'; return; }
    const joint = viewer.robot.joints[jointName];
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

inspectorClose.addEventListener('click', () => selectPart(null));

inspectorCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(inspectorSnippet.textContent ?? '');
    inspectorCopy.textContent = 'Copied!';
    setTimeout(() => { inspectorCopy.textContent = 'Copy'; }, 1500);
});

viewer.addEventListener('click', () => {
    if (hoveredJointName) selectPart(hoveredJointName);
});

// ── Loading indicator ─────────────────────────────────────────────────────────

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

// ── Joint panel ───────────────────────────────────────────────────────────────

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

// ── Drag and drop ─────────────────────────────────────────────────────────────

let _dropBlobUrl: string | null = null;

document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file?.name.toLowerCase().endsWith('.urdf')) {
        clearActiveRobot();
        if (_dropBlobUrl) URL.revokeObjectURL(_dropBlobUrl);
        _dropBlobUrl = URL.createObjectURL(file);
        viewer.urdf = _dropBlobUrl;
        editorCtrl.setSourceUrl(_dropBlobUrl);
    }
});

// ── Gesture mode ───────────────────────────────────────────────────────────────

function onDwellSelect(clientX: number, clientY: number): void {
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
        onStop() {
            gestureCtrl = null;
            gestureToggleBtn.classList.remove('active');
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
