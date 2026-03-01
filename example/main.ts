import { URDFManipulator } from '../src/index.js';

customElements.define('urdf-viewer', URDFManipulator);

const viewer = document.getElementById('viewer') as URDFManipulator;
const jointsPanel = document.getElementById('joints')!;

const ignoreLimitsEl = document.getElementById('ignore-limits') as HTMLInputElement;
const showCollisionEl = document.getElementById('show-collision') as HTMLInputElement;
const displayShadowEl = document.getElementById('display-shadow') as HTMLInputElement;
const upAxisEl = document.getElementById('up-axis') as HTMLSelectElement;

// ── Controls sync ─────────────────────────────────────────────────────────────

ignoreLimitsEl.addEventListener('change', () => { viewer.ignoreLimits = ignoreLimitsEl.checked; });
showCollisionEl.addEventListener('change', () => { viewer.showCollision = showCollisionEl.checked; });
displayShadowEl.addEventListener('change', () => { viewer.displayShadow = displayShadowEl.checked; });
upAxisEl.addEventListener('change', () => { viewer.up = upAxisEl.value; });

// Sync initial checkbox states from element attributes
displayShadowEl.checked = viewer.displayShadow;
upAxisEl.value = viewer.up;

// ── Joint panel ───────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;
let useRadians = false;

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
            const scale = (!isPrismatic && !useRadians) ? DEG : 1;
            const lo = viewer.ignoreLimits ? -6.28 : joint.limit.lower;
            const hi = viewer.ignoreLimits ? 6.28 : joint.limit.upper;

            slider.min = String(lo);
            slider.max = String(hi);
            slider.value = String(joint.angle);

            number.min = String(lo / scale);
            number.max = String(hi / scale);
            number.value = String(+(joint.angle / scale).toPrecision(4));
        };

        slider.addEventListener('input', () => {
            viewer.setJointValue(joint.name, parseFloat(slider.value));
        });

        number.addEventListener('change', () => {
            const isPrismatic = joint.jointType === 'prismatic';
            const scale = (!isPrismatic && !useRadians) ? DEG : 1;
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

viewer.addEventListener('angle-change', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    const el = jointsPanel.querySelector(`[data-joint="${name}"]`) as
        (HTMLElement & { update?: () => void }) | null;
    el?.update?.();
});

viewer.addEventListener('joint-mouseover', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    const el = jointsPanel.querySelector(`[data-joint="${name}"]`);
    el?.setAttribute('data-hovered', '');
});

viewer.addEventListener('joint-mouseout', (e: Event) => {
    const name = (e as CustomEvent<string>).detail;
    const el = jointsPanel.querySelector(`[data-joint="${name}"]`);
    el?.removeAttribute('data-hovered');
});

// ── Load a robot ──────────────────────────────────────────────────────────────
// Drop a URDF onto the page or set viewer.urdf / viewer.package programmatically.

document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file && file.name.endsWith('.urdf')) {
        viewer.urdf = URL.createObjectURL(file);
    }
});
