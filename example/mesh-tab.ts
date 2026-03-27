// Mesh tab — populates the mesh file list and wires download / regenerate buttons.

import { URDFManipulator } from '../src/index.js';
import type { URDFBuildController } from './build.js';

export function populateMeshTab(viewer: URDFManipulator, buildCtrl: URDFBuildController): void {
    const meshList = document.getElementById('mesh-file-list');
    if (!meshList) return;

    // Collect mesh filenames referenced in robot objects
    const meshNames: string[] = [];
    if (viewer.robot) {
        viewer.robot.traverse((obj: { userData?: { meshFileName?: string } }) => {
            const fn = obj.userData?.meshFileName;
            if (fn && !meshNames.includes(fn)) meshNames.push(fn);
        });
    }

    // Always show chassis.stl for robot-car
    const allMeshes = meshNames.length > 0 ? meshNames : ['chassis.stl'];

    meshList.innerHTML = allMeshes.map(name => {
        const isChassisStl = name === 'chassis.stl';
        const regenBtn = isChassisStl
            ? `<button type="button" class="m-btn" data-regen="${name}">Regenerate</button>`
            : '';
        return `<div class="mesh-row">
            <span class="m-name">${name}</span>
            <button type="button" class="m-btn" data-download="${name}">\u2193 Download</button>
            ${regenBtn}
        </div>`;
    }).join('');

    // Wire download buttons
    meshList.querySelectorAll<HTMLButtonElement>('[data-download]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filename = btn.dataset.download!;
            const pkg = (viewer as { _packageMap?: Map<string, string> })._packageMap;
            if (pkg) {
                for (const [key, url] of pkg.entries()) {
                    if (key.endsWith(filename) || url.endsWith(filename)) {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        a.click();
                        return;
                    }
                }
            }
            const orig = btn.textContent;
            btn.textContent = 'Not found';
            setTimeout(() => { btn.textContent = orig; }, 2000);
        });
    });

    // Wire regenerate buttons (chassis.stl only for now)
    meshList.querySelectorAll<HTMLButtonElement>('[data-regen]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filename = btn.dataset.regen!;
            if (filename === 'chassis.stl') {
                const orig = btn.textContent;
                btn.textContent = 'Regenerating\u2026';
                btn.disabled = true;
                try {
                    (buildCtrl as { regenerateChassis?: () => void }).regenerateChassis?.();
                } catch { /* no-op */ }
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.disabled = false;
                }, 1500);
            }
        });
    });
}
