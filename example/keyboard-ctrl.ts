// ── Keyboard controller ────────────────────────────────────────────────────
//
// Extracted from main.ts. Registers document-level keydown handlers for
// build-mode shortcuts and robot navigation.

import type { URDFBuildController } from './build.js';
import type { ComponentCrudController } from './component-crud.js';
import type { RobotLoader, RobotConfig } from './robot-loader.js';

export interface KeyboardCtrlOptions {
    buildCtrl:            URDFBuildController;
    crudCtrl:             ComponentCrudController;
    refreshPaletteCounts: () => void;
    getRobotLoader:       () => RobotLoader;
    getRobots:            () => RobotConfig[];
}

export function initKeyboardHandler(opts: KeyboardCtrlOptions): void {
    const { buildCtrl, crudCtrl, refreshPaletteCounts, getRobotLoader, getRobots } = opts;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        // ── Build-mode keys ───────────────────────────────────────────────
        if (buildCtrl.isActive) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); buildCtrl.undo(); }
            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); buildCtrl.redo(); }

            const selId = crudCtrl.getBuildSelCompId();
            if (selId && (e.key === 'Delete' || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey) {
                const el = document.activeElement as HTMLElement;
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
                e.preventDefault();
                buildCtrl.removeComponent(selId);
                crudCtrl.removeComponentItem(selId);
                refreshPaletteCounts();
                return;
            }

            if (e.key === 'Escape' && crudCtrl.getBuildSelCompId()) {
                const el = document.activeElement as HTMLElement;
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
                crudCtrl.deselectComp();
                return;
            }

            if (selId && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key) && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const c = buildCtrl.getComponentData(selId);
                if (!c) return;
                const d = 0.001;
                let { x, y, z } = c;
                if (e.shiftKey) {
                    if (e.key === 'ArrowUp')   z += d;
                    if (e.key === 'ArrowDown') z -= d;
                } else {
                    if (e.key === 'ArrowLeft')  y += d;
                    if (e.key === 'ArrowRight') y -= d;
                    if (e.key === 'ArrowUp')    x -= d;
                    if (e.key === 'ArrowDown')  x += d;
                }
                buildCtrl.updateComponent(selId, { x, y, z });
                const inp = crudCtrl.componentInputs.get(selId);
                if (inp) { inp['x'].value = x.toFixed(4); inp['y'].value = y.toFixed(4); inp['z'].value = z.toFixed(4); }
                return;
            }
        }

        // ── Robot navigation (ArrowLeft / ArrowRight) ────────────────────
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const el = document.activeElement as HTMLElement;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;
        const robots = getRobots();
        const robotLoader = getRobotLoader();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const idx = (robotLoader.currentRobotIndex + dir + robots.length) % robots.length;
        robotLoader.load(robots[idx], idx);
    });
}
