import { URDFManipulator } from '../src/index.js';

customElements.define('urdf-viewer', URDFManipulator);

const viewer = document.getElementById('viewer') as URDFManipulator;
const jointsPanel = document.getElementById('joints')!;
const robotsPanel = document.getElementById('robots')!;

const ignoreLimitsEl = document.getElementById('ignore-limits') as HTMLInputElement;
const showCollisionEl = document.getElementById('show-collision') as HTMLInputElement;
const displayShadowEl = document.getElementById('display-shadow') as HTMLInputElement;
const upAxisEl = document.getElementById('up-axis') as HTMLSelectElement;

// ── Available robots ──────────────────────────────────────────────────────────

const ROBOTS = [
    {
        name: 'T12',
        urdf: '/robots/T12/urdf/T12.URDF',
        up: '-Z',
    },
    {
        name: 'TriATHLETE',
        urdf: '/robots/TriATHLETE/urdf/TriATHLETE.URDF',
        up: '-Z',
    },
];

function loadRobot(robot: (typeof ROBOTS)[number]) {
    viewer.up = robot.up;
    upAxisEl.value = robot.up;
    viewer.urdf = robot.urdf;

    for (const btn of robotsPanel.querySelectorAll('.robot-btn')) {
        btn.classList.toggle('active', btn.textContent === robot.name);
    }
}

// Build robot picker buttons
for (const robot of ROBOTS) {
    const btn = document.createElement('button');
    btn.className = 'robot-btn';
    btn.textContent = robot.name;
    btn.addEventListener('click', () => loadRobot(robot));
    robotsPanel.appendChild(btn);
}

// Auto-load the first robot
loadRobot(ROBOTS[0]);

// ── Controls sync ─────────────────────────────────────────────────────────────

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

displayShadowEl.checked = viewer.displayShadow;
upAxisEl.value = viewer.up;

// ── Joint panel ───────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

function buildJointPanel() {
    jointsPanel.innerHTML = '';
    if (!viewer.robot) return;

    const joints = Object.values(viewer.robot.joints)
        .filter(j => j.jointType !== 'fixed')
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const joint of joints) {
        const el = document.createElement('div');
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

        const update = () => {
            const isPrismatic = joint.jointType === 'prismatic';
            const lo = viewer.ignoreLimits ? -6.28 : joint.limit.lower;
            const hi = viewer.ignoreLimits ? 6.28 : joint.limit.upper;

            slider.min = String(lo);
            slider.max = String(hi);
            slider.value = String(joint.angle);

            const displayScale = isPrismatic ? 1 : (1 / DEG);
            number.min = String(+(lo * displayScale).toFixed(3));
            number.max = String(+(hi * displayScale).toFixed(3));
            number.value = String(+(joint.angle * displayScale).toPrecision(4));
        };

        slider.addEventListener('input', () => {
            viewer.setJointValue(joint.name, parseFloat(slider.value));
        });

        number.addEventListener('change', () => {
            const isPrismatic = joint.jointType === 'prismatic';
            const scale = isPrismatic ? 1 : DEG;
            viewer.setJointValue(joint.name, parseFloat(number.value) * scale);
        });

        row.append(slider, number);
        el.append(nameEl, row);
        jointsPanel.appendChild(el);

        update();
        (el as HTMLElement & { update: () => void }).update = update;
    }
}

// ── Viewer events ─────────────────────────────────────────────────────────────

viewer.addEventListener('urdf-processed', buildJointPanel);

viewer.addEventListener('urdf-change', () => {
    jointsPanel.innerHTML = '';
});

viewer.addEventListener('angle-change', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    const el = jointsPanel.querySelector(`[data-joint="${name}"]`) as
        (HTMLElement & { update?: () => void }) | null;
    el?.update?.();
});

viewer.addEventListener('joint-mouseover', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.setAttribute('data-hovered', '');
});

viewer.addEventListener('joint-mouseout', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    jointsPanel.querySelector(`[data-joint="${name}"]`)?.removeAttribute('data-hovered');
});

// ── Drag and drop a custom URDF ───────────────────────────────────────────────

document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file?.name.toLowerCase().endsWith('.urdf')) {
        for (const btn of robotsPanel.querySelectorAll('.robot-btn')) {
            btn.classList.remove('active');
        }
        viewer.urdf = URL.createObjectURL(file);
    }
});
