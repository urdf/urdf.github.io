// Ghost overlay — clones the current robot with semi-transparent materials for pose comparison.

import { URDFManipulator } from '../src/index.js';
import { Mesh, Material, Object3D } from 'three';

let _ghostRobot: Object3D | null = null;

export function clearGhost(viewer: URDFManipulator, ghostBtn: HTMLButtonElement): void {
    if (!_ghostRobot) return;
    viewer.scene.remove(_ghostRobot);
    _ghostRobot = null;
    ghostBtn.classList.remove('active');
    viewer.redraw();
}

export function initGhostOverlay(viewer: URDFManipulator, ghostBtn: HTMLButtonElement): void {
    ghostBtn.addEventListener('click', () => {
        if (_ghostRobot) { clearGhost(viewer, ghostBtn); return; }
        if (!viewer.robot) return;
        _ghostRobot = viewer.robot.clone(true);
        _ghostRobot.traverse((node) => {
            if (!(node instanceof Mesh)) return;
            const mats = Array.isArray(node.material) ? node.material : [node.material];
            node.material = mats.map((m: Material) => {
                const c = m.clone();
                c.transparent = true;
                (c as Material & { opacity: number; depthWrite: boolean }).opacity = 0.2;
                (c as Material & { depthWrite: boolean }).depthWrite = false;
                return c;
            });
        });
        viewer.scene.add(_ghostRobot);
        ghostBtn.classList.add('active');
        viewer.redraw();
    });

    // Show ghost-btn once a robot is loaded; clear stale ghost on robot switch
    viewer.addEventListener('urdf-processed', () => {
        ghostBtn.hidden = false;
        clearGhost(viewer, ghostBtn);
    });
}
