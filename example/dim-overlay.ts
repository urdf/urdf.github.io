// Viewport dimension annotations — shows X/Y/Z measurements on the selected part.
// Renders as HTML overlays projected from 3D world coordinates.

import type { URDFManipulator } from '../src/index.js';
import * as THREE from 'three';

const _v = new THREE.Vector3();
const _box = new THREE.Box3();

let _container: HTMLElement | null = null;
let _labels: HTMLElement[] = [];

function getContainer(): HTMLElement {
    if (_container) return _container;
    _container = document.createElement('div');
    _container.className = 'dim-overlay';
    document.querySelector('.viewport')!.appendChild(_container);
    return _container;
}

function makeLabel(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'dim-label';
    return el;
}

function project(viewer: URDFManipulator, world: THREE.Vector3): { x: number; y: number; behind: boolean } {
    _v.copy(world).project(viewer.camera);
    const rect = viewer.getBoundingClientRect();
    return {
        x: ((_v.x + 1) / 2) * rect.width,
        y: ((-_v.y + 1) / 2) * rect.height,
        behind: _v.z > 1,
    };
}

export function showDimensions(viewer: URDFManipulator, jointName: string): void {
    const joint = viewer.robot?.joints[jointName];
    if (!joint) { hideDimensions(); return; }

    // Find the child link
    const link = joint.children.find((c): c is THREE.Object3D & { isURDFLink?: boolean } =>
        (c as { isURDFLink?: boolean }).isURDFLink === true) ?? joint.children[0];
    if (!link) { hideDimensions(); return; }

    // Compute world-space bounding box of the link
    _box.setFromObject(link);
    if (_box.isEmpty()) { hideDimensions(); return; }

    const size = _box.getSize(new THREE.Vector3());
    const center = _box.getCenter(new THREE.Vector3());
    const min = _box.min;
    const max = _box.max;

    // Skip if too small (< 1mm in all axes)
    if (size.x < 0.001 && size.y < 0.001 && size.z < 0.001) { hideDimensions(); return; }

    const container = getContainer();
    container.style.display = '';

    // Ensure we have 3 label elements
    while (_labels.length < 3) {
        const l = makeLabel();
        container.appendChild(l);
        _labels.push(l);
    }

    // Map URDF axes to display: account for the _applyUp rotation
    // With +Z up: URDF X→Three X, URDF Y→Three -Z, URDF Z→Three +Y
    const axes = [
        { axis: 'X', color: 'var(--red)',   size: size.x, from: new THREE.Vector3(min.x, min.y, center.z), to: new THREE.Vector3(max.x, min.y, center.z), mid: new THREE.Vector3(center.x, min.y - size.y * 0.15, center.z) },
        { axis: 'Y', color: 'var(--green)', size: size.z, from: new THREE.Vector3(max.x, min.y, min.z), to: new THREE.Vector3(max.x, min.y, max.z), mid: new THREE.Vector3(max.x + size.x * 0.15, min.y, center.z) },
        { axis: 'Z', color: 'var(--blue-text)', size: size.y, from: new THREE.Vector3(max.x, min.y, center.z), to: new THREE.Vector3(max.x, max.y, center.z), mid: new THREE.Vector3(max.x + size.x * 0.15, center.y, center.z) },
    ];

    for (let i = 0; i < 3; i++) {
        const a = axes[i];
        const mm = (a.size * 1000).toFixed(1);
        const p = project(viewer, a.mid);
        const label = _labels[i];
        label.textContent = `${a.axis} ${mm}mm`;
        label.style.left = p.x + 'px';
        label.style.top = p.y + 'px';
        label.style.borderLeftColor = a.color;
        label.style.display = p.behind ? 'none' : '';
    }
}

export function hideDimensions(): void {
    if (_container) _container.style.display = 'none';
}

// Call on each render frame to keep labels in sync with camera
export function updateDimensions(viewer: URDFManipulator, jointName: string | null): void {
    if (!jointName) { hideDimensions(); return; }
    showDimensions(viewer, jointName);
}
