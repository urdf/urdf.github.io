import { URDFManipulator } from '../src/index.js';

customElements.define('urdf-viewer', URDFManipulator);

const viewer = document.getElementById('viewer') as URDFManipulator;
const jointsPanel = document.getElementById('joints')!;
const robotsPanel = document.getElementById('robots')!;
const loadingEl = document.getElementById('loading')!;

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

function loadRobot(robot: (typeof ROBOTS)[number] | { name?: string; urdf: string; up: string; package?: string }) {
    viewer.up = robot.up;
    upAxisEl.value = robot.up;
    viewer.package = ('package' in robot && robot.package) ? robot.package : '';
    viewer.urdf = robot.urdf;

    for (const btn of robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn')) {
        btn.classList.toggle('active', 'name' in robot && btn.dataset.name === robot.name);
    }
}

for (const robot of ROBOTS) {
    const btn = document.createElement('button');
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

function loadUrl() {
    const url = urlInput.value.trim();
    if (!url) return;
    for (const btn of robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn')) {
        btn.classList.remove('active');
    }
    viewer.urdf = url;
}

urlLoadBtn.addEventListener('click', loadUrl);
urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') loadUrl(); });

// ── Loading indicator ─────────────────────────────────────────────────────────

viewer.addEventListener('urdf-change', () => {
    loadingEl.classList.add('visible');
    jointsPanel.innerHTML = '';
});

viewer.addEventListener('urdf-processed', () => {
    loadingEl.classList.remove('visible');
});

// ── Joint panel ───────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

type JointEl = HTMLElement & { update: () => void };

function buildJointPanel() {
    jointsPanel.innerHTML = '';
    if (!viewer.robot) return;

    const joints = Object.values(viewer.robot.joints)
        .filter(j => j.jointType !== 'fixed')
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
            const lo = viewer.ignoreLimits ? -6.28 : joint.limit.lower;
            const hi = viewer.ignoreLimits ? 6.28 : joint.limit.upper;
            slider.min = String(lo);
            slider.max = String(hi);
            slider.value = String(joint.angle);
            number.min = String(+(lo * displayScale).toFixed(3));
            number.max = String(+(hi * displayScale).toFixed(3));
            number.value = String(+(joint.angle * displayScale).toPrecision(4));
        };

        slider.addEventListener('input', () => {
            viewer.setJointValue(joint.name, parseFloat(slider.value));
        });

        number.addEventListener('change', () => {
            const scale = isPrismatic ? 1 : DEG;
            viewer.setJointValue(joint.name, parseFloat(number.value) * scale);
        });

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
    (jointsPanel.querySelector<JointEl>(`[data-joint="${name}"]`))?.update?.();
});

viewer.addEventListener('joint-mouseover', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.setAttribute('data-hovered', '');
});

viewer.addEventListener('joint-mouseout', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.removeAttribute('data-hovered');
});

// ── Drag and drop ─────────────────────────────────────────────────────────────

document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file?.name.toLowerCase().endsWith('.urdf')) {
        for (const btn of robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn')) {
            btn.classList.remove('active');
        }
        viewer.urdf = URL.createObjectURL(file);
    }
});
