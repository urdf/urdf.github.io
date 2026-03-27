// Joint slider panel — renders and updates the joint controls in the Robot tab.

import { URDFManipulator } from '../src/index.js';
import type { URDFJoint } from '../src/URDFClasses.js';

const DEG_TO_RAD = Math.PI / 180; // multiply degrees → radians; divide radians → degrees

export function makeScrubLabel(label: HTMLElement, input: HTMLInputElement): void {
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

type JointEl = HTMLElement & { update: () => void };

// ── Pose preset system ────────────────────────────────────────────────────

type Pose = { name: string; joints: Record<string, number> };

function _poseKey(): string {
    if (!_viewer?.robot) return '';
    const names = Object.values(_viewer.robot.joints)
        .filter(j => j.jointType !== 'fixed')
        .map(j => j.name)
        .sort();
    return 'urdf-poses-' + names.join(',');
}

function _loadPoses(): Pose[] {
    const key = _poseKey();
    if (!key) return [];
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
}

function _savePoses(poses: Pose[]): void {
    const key = _poseKey();
    if (key) localStorage.setItem(key, JSON.stringify(poses));
}

export function initPosePresets(
    posesList: HTMLElement,
    nameInput: HTMLInputElement,
    saveBtn: HTMLButtonElement,
    applyPose: (joints: Record<string, number>) => void,
): void {
    function renderPoses(): void {
        posesList.innerHTML = '';
        for (const pose of _loadPoses()) {
            const item = document.createElement('div');
            item.className = 'pose-item';

            const restoreBtn = document.createElement('button');
            restoreBtn.type = 'button';
            restoreBtn.className = 'pose-item-restore';
            restoreBtn.textContent = pose.name;
            restoreBtn.title = `Restore "${pose.name}"`;
            restoreBtn.addEventListener('click', () => applyPose(pose.joints));

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'pose-item-del';
            delBtn.textContent = '×';
            delBtn.title = `Delete "${pose.name}"`;
            delBtn.addEventListener('click', () => {
                _savePoses(_loadPoses().filter(p => p.name !== pose.name));
                renderPoses();
            });

            item.append(restoreBtn, delBtn);
            posesList.appendChild(item);
        }
    }

    saveBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name || !_viewer?.robot) return;
        const joints: Record<string, number> = {};
        for (const [n, j] of Object.entries(_viewer.robot.joints)) {
            if (j.jointType !== 'fixed') joints[n] = (j as URDFJoint).angle;
        }
        const poses = _loadPoses();
        const idx = poses.findIndex(p => p.name === name);
        if (idx >= 0) poses[idx] = { name, joints };
        else poses.push({ name, joints });
        _savePoses(poses);
        nameInput.value = '';
        renderPoses();
    });

    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveBtn.click(); });

    // Refresh list when a new robot loads
    if (_viewer) {
        _viewer.addEventListener('urdf-processed', renderPoses);
    }

    renderPoses();
}

let _viewer: URDFManipulator;
let _jointsPanel: HTMLElement;
let _jointPanelAbort: AbortController | null = null;

export function initJointPanel(viewer: URDFManipulator, jointsPanel: HTMLElement): void {
    _viewer = viewer;
    _jointsPanel = jointsPanel;

    viewer.addEventListener('urdf-processed', buildJointPanel);

    viewer.addEventListener('ignore-limits-change', () => {
        for (const el of _jointsPanel.querySelectorAll<JointEl>('.joint')) el.update?.();
    });

    viewer.addEventListener('angle-change', (e: Event) => {
        const name = (e as CustomEvent<string>).detail;
        _jointsPanel.querySelector<JointEl>(`[data-joint="${name}"]`)?.update?.();
    });
}

function buildJointPanel(): void {
    _jointPanelAbort?.abort();
    _jointPanelAbort = new AbortController();
    const { signal } = _jointPanelAbort;

    _jointsPanel.innerHTML = '';
    if (!_viewer.robot) return;

    const joints = Object.values(_viewer.robot.joints)
        .filter(j => j.jointType !== 'fixed' && j.visible)
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const joint of joints) {
        const el = document.createElement('div') as JointEl;
        el.className = 'joint';
        el.dataset.joint = joint.name;
        el.dataset.jointType = joint.jointType;

        const nameEl = document.createElement('div');
        nameEl.className = 'joint-name';
        nameEl.title = joint.name;
        nameEl.textContent = joint.name;

        const row = document.createElement('div');
        row.className = 'joint-row';

        const isPrismatic = joint.jointType === 'prismatic';
        const displayScale = isPrismatic ? 1 : 1 / DEG_TO_RAD; // show degrees for rotary joints

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.step = isPrismatic ? '0.001' : '0.01';

        const number = document.createElement('input');
        number.type = 'number';
        number.step = isPrismatic ? '0.001' : '0.1'; // degrees for rotary

        const ticks = document.createElement('div');
        ticks.className = 'joint-ticks';
        const tickLo = document.createElement('span');
        const tickMid = document.createElement('span');
        tickMid.className = 'joint-tick-mid';
        const tickHi = document.createElement('span');
        ticks.append(tickLo, tickMid, tickHi);

        el.update = () => {
            const continuous = joint.jointType === 'continuous';
            const lo = (_viewer.ignoreLimits || continuous) ? -6.28 : joint.limit.lower;
            const hi = (_viewer.ignoreLimits || continuous) ? 6.28 : joint.limit.upper;
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
            // Center tick: show "0" only when range spans zero and joint is not continuous
            if (!continuous && lo < 0 && hi > 0) {
                const pct = (-lo / (hi - lo)) * 100;
                tickMid.textContent = isPrismatic ? '0 m' : '0°';
                tickMid.style.left = `${pct.toFixed(1)}%`;
                tickMid.hidden = false;
            } else {
                tickMid.hidden = true;
            }
        };

        slider.setAttribute('aria-label', `${joint.name} angle`);
        number.setAttribute('aria-label', `${joint.name} angle${isPrismatic ? ' (meters)' : ' (degrees)'}`);

        slider.addEventListener('input', () => {
            _viewer.setJointValue(joint.name, parseFloat(slider.value));
        }, { signal });

        number.addEventListener('change', () => {
            const scale = isPrismatic ? 1 : DEG_TO_RAD;
            _viewer.setJointValue(joint.name, parseFloat(number.value) * scale);
        }, { signal });

        row.append(slider, number);
        el.append(nameEl, row, ticks);
        _jointsPanel.appendChild(el);
        el.update();
    }
}
