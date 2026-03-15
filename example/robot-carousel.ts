// Robot picker dropdown + build header/saved list management.

import { URDFBuildController } from './build.js';
import type { ComponentCrudController } from './component-crud.js';
import type { RobotLoader, RobotConfig } from './robot-loader.js';
import { $ } from './dom-utils.js';

export interface RobotPickerOptions {
    pickerBtn:                 HTMLButtonElement;
    pickerMenu:                HTMLElement;
    pickerNameEl:              HTMLElement;
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

export class RobotPicker {
    private readonly _opts: RobotPickerOptions;

    constructor(opts: RobotPickerOptions) {
        this._opts = opts;

        opts.pickerBtn.addEventListener('click', () => this._toggle());
        document.addEventListener('click', (e) => {
            if (!opts.pickerBtn.contains(e.target as Node) && !opts.pickerMenu.contains(e.target as Node))
                this._close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this._close();
        });
    }

    private _toggle(): void {
        const open = this._opts.pickerMenu.hidden;
        if (open) this._open(); else this._close();
    }

    private _open(): void {
        this._opts.pickerMenu.hidden = false;
        this._opts.pickerBtn.setAttribute('aria-expanded', 'true');
        const selected = this._opts.pickerMenu.querySelector<HTMLButtonElement>('[aria-selected="true"]');
        selected?.focus();
    }

    private _close(): void {
        this._opts.pickerMenu.hidden = true;
        this._opts.pickerBtn.setAttribute('aria-expanded', 'false');
    }

    buildRobotItems(robots: RobotConfig[]): void {
        const { pickerMenu } = this._opts;
        pickerMenu.innerHTML = '';
        for (let i = 0; i < robots.length; i++) {
            const robot = robots[i];
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'robot-picker-item';
            btn.textContent = robot.name;
            btn.dataset.name = robot.name;
            btn.dataset.index = String(i);
            btn.setAttribute('role', 'option');
            btn.setAttribute('aria-selected', 'false');
            btn.addEventListener('click', () => {
                this._opts.getRobotLoader().load(robot, i);
                this._close();
            });
            pickerMenu.appendChild(btn);
        }
    }

    setActive(robotName: string): void {
        for (const btn of this._opts.pickerMenu.querySelectorAll<HTMLButtonElement>('.robot-picker-item'))
            btn.setAttribute('aria-selected', String(btn.dataset.name === robotName));
        this._opts.pickerNameEl.textContent = robotName;
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
}
