// Robot button carousel — builds and manages the robot selector strip.

import { URDFBuildController } from './build.js';
import type { ComponentCrudController } from './component-crud.js';
import type { RobotLoader, RobotConfig } from './robot-loader.js';
import { $ } from './dom-utils.js';

export interface RobotCarouselOptions {
    robotsPanel:               HTMLElement;
    robotTrackSlider:          HTMLElement;
    buildCtrl:                 URDFBuildController;
    buildActiveHeaderEl:       HTMLElement;
    buildActiveNameEl:         HTMLElement;
    buildClearCustomBtn:       HTMLButtonElement;
    buildSavedToggleBtn:       HTMLButtonElement;
    buildSavedListEl:          HTMLElement;
    crudCtrl:                  ComponentCrudController;
    syncSlidersFromController: () => void;
    refreshPaletteCounts:      () => void;
    getRobotLoader:            () => RobotLoader;
}

export class RobotCarousel {
    private readonly _opts: RobotCarouselOptions;
    private _hoverTimer: ReturnType<typeof setTimeout> | null = null;
    gestureHoverBtn: HTMLButtonElement | null = null;

    constructor(opts: RobotCarouselOptions) {
        this._opts = opts;

        opts.robotsPanel.closest('.robot-shell')!.addEventListener('mouseleave', () => {
            if (this._hoverTimer) { clearTimeout(this._hoverTimer); this._hoverTimer = null; }
            this.moveSliderToActive();
        });

        new ResizeObserver(() => this.moveSliderToActive()).observe(opts.robotsPanel);
    }

    moveSliderTo(btn: HTMLButtonElement): void {
        const { robotsPanel, robotTrackSlider } = this._opts;
        const trackRect = robotsPanel.getBoundingClientRect();
        const btnRect   = btn.getBoundingClientRect();
        robotTrackSlider.style.width  = `${btnRect.width}px`;
        robotTrackSlider.style.height = `${btnRect.height}px`;
        robotTrackSlider.style.left   = `${btnRect.left - trackRect.left}px`;
        robotTrackSlider.style.top    = `${btnRect.top  - trackRect.top}px`;
    }

    moveSliderToActive(): void {
        const active = this._opts.robotsPanel.querySelector<HTMLButtonElement>('.robot-btn.active');
        if (active) this.moveSliderTo(active);
    }

    clearActiveRobot(): void {
        for (const btn of this._opts.robotsPanel.querySelectorAll<HTMLButtonElement>('.robot-btn'))
            btn.classList.remove('active');
    }

    buildRobotButtons(robots: RobotConfig[]): void {
        const { robotsPanel } = this._opts;
        robotsPanel.querySelectorAll('.robot-btn').forEach(b => b.remove());
        for (let i = 0; i < robots.length; i++) {
            const robot = robots[i];
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'robot-btn';
            btn.textContent = robot.label;
            btn.title = robot.name;
            btn.dataset.name  = robot.name;
            btn.dataset.index = String(i);
            btn.addEventListener('click', () => this._opts.getRobotLoader().load(robot, i));
            btn.addEventListener('mouseenter', () => {
                this.moveSliderTo(btn);
                if (this._hoverTimer) clearTimeout(this._hoverTimer);
                this._hoverTimer = setTimeout(() => this._opts.getRobotLoader().load(robot, i), 150);
            });
            robotsPanel.appendChild(btn);
        }
    }

    refreshBuildHeader(): void {
        const { buildCtrl, buildActiveHeaderEl, buildActiveNameEl, buildClearCustomBtn } = this._opts;
        const active = buildCtrl.isCatalogActive;
        buildActiveHeaderEl.hidden = !active;
        if (active) {
            buildActiveNameEl.textContent = buildCtrl.robotName;
            buildClearCustomBtn.hidden = buildCtrl.isSupported;
        }
    }

    refreshSavedList(): void {
        const { buildCtrl, buildSavedToggleBtn, buildSavedListEl, crudCtrl, syncSlidersFromController, refreshPaletteCounts } = this._opts;
        const names = URDFBuildController.savedCustomNames();
        buildSavedToggleBtn.hidden = names.length === 0;
        if (names.length === 0) { buildSavedListEl.hidden = true; buildSavedToggleBtn.setAttribute('aria-expanded', 'false'); return; }

        buildSavedListEl.innerHTML = '';
        for (const name of names) {
            const row = document.createElement('div');
            row.className = 'build-saved-row';

            const nameEl = document.createElement('span');
            nameEl.className = 'build-saved-name';
            nameEl.textContent = name;

            const loadBtn = document.createElement('button');
            loadBtn.type = 'button';
            loadBtn.className = 'build-export-btn build-saved-load';
            loadBtn.textContent = 'Load';
            loadBtn.addEventListener('click', () => {
                crudCtrl.clearBuildUI();
                const entries = buildCtrl.restoreCustomByName(name);
                for (const { id, type } of entries) crudCtrl.renderComponentItem(id, type);
                if (entries.length > 0) syncSlidersFromController();
                refreshPaletteCounts();
                buildCtrl.open();
                $<HTMLButtonElement>('tab-build').click();
                this.refreshBuildHeader();
                buildSavedListEl.hidden = true;
                buildSavedToggleBtn.setAttribute('aria-expanded', 'false');
            });

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'build-remove-btn';
            delBtn.textContent = '×';
            delBtn.title = 'Delete saved robot';
            delBtn.addEventListener('click', () => {
                buildCtrl.deleteCustom(name);
                if (buildCtrl.robotName === name) this.refreshBuildHeader();
                this.refreshSavedList();
            });

            row.append(nameEl, loadBtn, delBtn);
            buildSavedListEl.appendChild(row);
        }
    }

    scheduleHoverLoad(idx: number, robots: RobotConfig[]): void {
        if (this._hoverTimer) clearTimeout(this._hoverTimer);
        this._hoverTimer = setTimeout(() => this._opts.getRobotLoader().load(robots[idx], idx), 150);
    }

    cancelHoverLoad(): void {
        if (this._hoverTimer) { clearTimeout(this._hoverTimer); this._hoverTimer = null; }
    }
}
