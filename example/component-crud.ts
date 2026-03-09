import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import type { URDFManipulator } from '../src/index.js';
import { $ } from './dom-utils.js';

export interface ContextPillCtx { label: string; color: string; onDismiss: () => void; }

export interface ComponentCrudOptions {
    buildCtrl: URDFBuildController;
    viewer: URDFManipulator;
    buildComponentsListEl: HTMLElement;
    buildInspEl: HTMLElement;
    buildInspTitle: HTMLElement;
    buildInspBody: HTMLElement;
    onSelectPartFromBuild: (jointName: string) => void;
    makeScrubLabel: (label: HTMLElement, input: HTMLInputElement) => void;
    refreshPaletteCounts: () => void;
    regenMeshBlob: (id: string, type: string) => void;
}

export class ComponentCrudController {
    readonly componentInputs  = new Map<string, Record<string, HTMLInputElement>>();
    readonly componentSelects = new Map<string, HTMLSelectElement>();

    private _buildSelCompId:   string | null = null;
    private _buildSelPartName: string | null = null;

    private readonly _opts: ComponentCrudOptions;

    constructor(opts: ComponentCrudOptions) {
        this._opts = opts;
    }

    // ── Context pill ─────────────────────────────────────────────────────────
    updateContextPill(ctx: ContextPillCtx | null): void {
        const contextBarEl = $('chat-context-bar');
        contextBarEl.innerHTML = '';
        contextBarEl.hidden = !ctx;
        if (!ctx) return;
        const pill = document.createElement('span');
        pill.className = 'context-pill';
        const dot = document.createElement('span');
        dot.className = 'context-pill-dot';
        dot.style.background = ctx.color;
        const label = document.createElement('span');
        label.textContent = ctx.label;
        const dismiss = document.createElement('button');
        dismiss.type = 'button'; dismiss.className = 'context-pill-dismiss';
        dismiss.textContent = '×'; dismiss.title = 'Deselect';
        dismiss.addEventListener('click', ctx.onDismiss);
        pill.append(dot, label, dismiss);
        contextBarEl.appendChild(pill);
    }

    // ── Parent select helpers ─────────────────────────────────────────────────
    addOptionToParentSelects(id: string): void {
        for (const [existingId, sel] of this.componentSelects) {
            if (existingId !== id && !Array.from(sel.options).some(o => o.value === id)) {
                const o = document.createElement('option');
                o.value = o.textContent = id;
                sel.appendChild(o);
            }
        }
    }

    removeOptionFromParentSelects(id: string): void {
        for (const sel of this.componentSelects.values()) {
            const opt = Array.from(sel.options).find(o => o.value === id);
            if (opt) sel.removeChild(opt);
        }
    }

    // ── Deselect / clear ──────────────────────────────────────────────────────
    deselectComp(): void {
        this._buildSelCompId   = null;
        this._buildSelPartName = null;
        for (const el of this._opts.buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
            el.classList.remove('selected');
        this._opts.buildInspEl.hidden = true;
        this._opts.buildInspBody.innerHTML = '';
        this.componentInputs.clear();
        this.componentSelects.clear();
        this.updateContextPill(null);
    }

    clearBuildUI(): void {
        this._opts.buildComponentsListEl.innerHTML = '';
        this.deselectComp();
    }

    // ── Select a component card ───────────────────────────────────────────────
    selectCompCard(id: string): void {
        this._buildSelCompId   = id;
        this._buildSelPartName = null;
        for (const el of this._opts.buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
            el.classList.toggle('selected', el.dataset.id === id);
        const entry = this._opts.buildCtrl.getComponentEntries().find(e => e.id === id);
        if (entry) this.renderInspector(id, entry.type);
        const def = COMPONENT_CATALOG[entry?.type ?? ''];
        this.updateContextPill({
            label:     `${def?.label ?? entry?.type ?? id} · ${id}`,
            color:     def?.cssColor ?? '#888',
            onDismiss: () => this.deselectComp(),
        });
    }

    setBuildSelPartName(name: string | null): void {
        this._buildSelPartName = name;
    }

    getBuildSelCompId(): string | null { return this._buildSelCompId; }
    getBuildSelPartName(): string | null { return this._buildSelPartName; }

    // ── Render a component list item ──────────────────────────────────────────
    renderComponentItem(id: string, type: string): void {
        const def  = COMPONENT_CATALOG[type];
        const item = document.createElement('div');
        item.className = 'build-component';
        item.dataset.id = id;

        const header = document.createElement('div');
        header.className = 'build-component-header';

        const dot = document.createElement('span');
        dot.className = 'comp-dot';
        dot.style.background = def?.cssColor ?? '#888';

        const labelEl = document.createElement('span');
        labelEl.textContent = `${def.label} ${id.split('_').pop()}`;

        const dupBtn = document.createElement('button');
        dupBtn.type = 'button';
        dupBtn.className = 'build-dup-btn';
        dupBtn.title = 'Duplicate';
        dupBtn.textContent = '⧉';
        dupBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newId = this._opts.buildCtrl.duplicateComponent(id);
            if (!newId) return;
            this.addOptionToParentSelects(newId);
            this.renderComponentItem(newId, type);
            if (COMPONENT_CATALOG[type]?.geomType === 'mesh') this._opts.regenMeshBlob(newId, type);
            this._opts.refreshPaletteCounts();
        });

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'build-remove-btn';
        removeBtn.title = 'Remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._opts.buildCtrl.removeComponent(id);
            if (this._buildSelCompId === id) this.deselectComp();
            this.removeOptionFromParentSelects(id);
            item.remove();
            this._opts.refreshPaletteCounts();
        });

        header.setAttribute('role', 'button');
        header.tabIndex = 0;
        header.addEventListener('click', () => this.selectCompCard(id));
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.selectCompCard(id); }
        });
        header.append(dot, labelEl, dupBtn, removeBtn);
        item.appendChild(header);
        this._opts.buildComponentsListEl.appendChild(item);
    }

    // ── Render the component property inspector ───────────────────────────────
    renderInspector(id: string, type: string): void {
        const saved = this._opts.buildCtrl.getComponentData(id);
        if (!saved) return;
        const def = COMPONENT_CATALOG[type];

        this._opts.buildInspBody.innerHTML = '';
        this.componentInputs.delete(id);
        this.componentSelects.delete(id);

        const inputs:  Record<string, HTMLInputElement>  = {};
        const selects: Record<string, HTMLSelectElement> = {};

        const dispatchUpdate = (): void => {
            const dims = def.geomType === 'cylinder'
                ? [parseFloat(inputs['r'].value) || 0.001, parseFloat(inputs['l'].value) || 0.001]
                : [parseFloat(inputs['w'].value) || 0.001, parseFloat(inputs['d'].value) || 0.001, parseFloat(inputs['h'].value) || 0.001];
            const jt = selects['jt']?.value ?? 'fixed';
            this._opts.buildCtrl.updateComponent(id, {
                x:  parseFloat(inputs['x'].value)  || 0,
                y:  parseFloat(inputs['y'].value)  || 0,
                z:  parseFloat(inputs['z'].value)  || 0,
                rx: parseFloat(inputs['rx'].value) || 0,
                ry: parseFloat(inputs['ry'].value) || 0,
                rz: parseFloat(inputs['rz'].value) || 0,
                dims,
                jointType:  jt as 'fixed' | 'continuous' | 'revolute' | 'prismatic',
                axis: [
                    parseFloat(inputs['ax']?.value) || 0,
                    parseFloat(inputs['ay']?.value) || 0,
                    parseFloat(inputs['az']?.value) || 1,
                ] as [number, number, number],
                limitLower: parseFloat(inputs['limitMin']?.value) || -1.5708,
                limitUpper: parseFloat(inputs['limitMax']?.value) ||  1.5708,
                parent: selects['parent']?.value ?? 'base_link',
            });
        };

        const addRow = (key: string, axisClass: string, label: string, step: number, value: number, container: HTMLElement = this._opts.buildInspBody): void => {
            const row = document.createElement('div');
            row.className = 'inspector-row';
            const lbl = document.createElement('label');
            lbl.className   = axisClass;
            lbl.textContent = label;
            const inp = document.createElement('input');
            inp.type  = 'number';
            inp.step  = String(step);
            inp.value = String(value);
            inp.addEventListener('input', dispatchUpdate);
            this._opts.makeScrubLabel(lbl, inp);
            inputs[key] = inp;
            row.append(lbl, inp);
            container.appendChild(row);
        };

        const addGroupLabel = (text: string, container: HTMLElement = this._opts.buildInspBody): void => {
            const lbl = document.createElement('div');
            lbl.className   = 'build-group-label';
            lbl.textContent = text;
            container.appendChild(lbl);
        };

        const addSelectRow = (key: string, label: string, options: string[], container: HTMLElement = this._opts.buildInspBody): void => {
            const row = document.createElement('div');
            row.className = 'inspector-row';
            const lbl = document.createElement('label');
            lbl.textContent = label;
            const sel = document.createElement('select');
            sel.className = 'build-select';
            for (const opt of options) {
                const o = document.createElement('option');
                o.value = o.textContent = opt;
                sel.appendChild(o);
            }
            sel.addEventListener('change', dispatchUpdate);
            selects[key] = sel;
            row.append(lbl, sel);
            container.appendChild(row);
        };

        addGroupLabel('Position');
        addRow('x',  'axis-x', 'X', 0.005, saved.x  ?? 0);
        addRow('y',  'axis-y', 'Y', 0.005, saved.y  ?? 0);
        addRow('z',  'axis-z', 'Z', 0.005, saved.z  ?? def.defaultZ);

        addGroupLabel('Size');
        if (def.geomType === 'cylinder') {
            addRow('r', 'axis-x', 'R', 0.005, saved.dims[0] ?? def.defaultDims[0]);
            addRow('l', 'axis-z', 'L', 0.005, saved.dims[1] ?? def.defaultDims[1]);
        } else {
            addRow('w', 'axis-x', 'W', 0.005, saved.dims[0] ?? def.defaultDims[0]);
            addRow('d', 'axis-y', 'D', 0.005, saved.dims[1] ?? def.defaultDims[1]);
            addRow('h', 'axis-z', 'H', 0.005, saved.dims[2] ?? def.defaultDims[2]);
        }

        // ── Advanced section (Rotation, Joint, Axis, Limits, Preview) ─────────
        const savedJt   = saved.jointType ?? 'fixed';
        const hasLimits = savedJt === 'revolute' || savedJt === 'prismatic';

        const advancedDetails = document.createElement('details');
        advancedDetails.className = 'build-comp-advanced';
        if (savedJt !== 'fixed') advancedDetails.open = true;
        const advancedSummary = document.createElement('summary');
        advancedSummary.textContent = 'Rotation · Joint · Limits';
        advancedDetails.appendChild(advancedSummary);
        this._opts.buildInspBody.appendChild(advancedDetails);

        addGroupLabel('Rotation', advancedDetails);
        addRow('rx', 'axis-x', 'Rx', 0.01, saved.rx ?? 0, advancedDetails);
        addRow('ry', 'axis-y', 'Ry', 0.01, saved.ry ?? 0, advancedDetails);
        addRow('rz', 'axis-z', 'Rz', 0.01, saved.rz ?? 0, advancedDetails);

        addGroupLabel('Joint', advancedDetails);
        addSelectRow('parent', 'Parent', this._opts.buildCtrl.getAvailableLinks().filter(l => l !== id), advancedDetails);
        addSelectRow('jt', 'Type', ['fixed', 'continuous', 'revolute', 'prismatic'], advancedDetails);
        if (saved.parent && selects['parent']) selects['parent'].value = saved.parent;
        if (saved.jointType && selects['jt'])  selects['jt'].value    = saved.jointType;

        const axisSection = document.createElement('div');
        addGroupLabel('Axis', axisSection);
        addRow('ax', 'axis-x', 'X', 0.1, saved.axis[0] ?? 0, axisSection);
        addRow('ay', 'axis-y', 'Y', 0.1, saved.axis[1] ?? 0, axisSection);
        addRow('az', 'axis-z', 'Z', 0.1, saved.axis[2] ?? 1, axisSection);
        axisSection.hidden = savedJt === 'fixed';
        advancedDetails.appendChild(axisSection);

        const limitsSection = document.createElement('div');
        addGroupLabel('Limits', limitsSection);
        addRow('limitMin', 'axis-x', 'Min', 0.01, saved.limitLower ?? -1.5708, limitsSection);
        addRow('limitMax', 'axis-z', 'Max', 0.01, saved.limitUpper ??  1.5708, limitsSection);
        limitsSection.hidden = !hasLimits;
        advancedDetails.appendChild(limitsSection);

        const previewSection = document.createElement('div');
        const previewSlider  = document.createElement('input');
        previewSlider.type  = 'range';
        previewSlider.step  = '0.01';
        previewSlider.min   = String(saved.limitLower ?? -1.5708);
        previewSlider.max   = String(saved.limitUpper ??  1.5708);
        previewSlider.value = '0';
        previewSlider.dataset.preview = 'true';
        previewSlider.className = 'insp-preview-slider';
        previewSlider.addEventListener('input', () => {
            this._opts.viewer.robot?.setJointValue(`${id}_joint`, parseFloat(previewSlider.value));
        });
        inputs['limitMin']?.addEventListener('input', () => { previewSlider.min = inputs['limitMin'].value; });
        inputs['limitMax']?.addEventListener('input', () => { previewSlider.max = inputs['limitMax'].value; });
        addGroupLabel('Preview', previewSection);
        const previewRow = document.createElement('div');
        previewRow.className = 'build-preview-row';
        previewRow.appendChild(previewSlider);
        previewSection.appendChild(previewRow);
        previewSection.hidden = !hasLimits;
        advancedDetails.appendChild(previewSection);

        selects['jt'].addEventListener('change', () => {
            const jt = selects['jt'].value;
            const showLimits = jt === 'revolute' || jt === 'prismatic';
            axisSection.hidden    = jt === 'fixed';
            limitsSection.hidden  = !showLimits;
            previewSection.hidden = !showLimits;
            if (jt !== 'fixed' && !advancedDetails.open) advancedDetails.open = true;
            if (!showLimits) {
                previewSlider.value = '0';
                this._opts.viewer.robot?.setJointValue(`${id}_joint`, 0);
            }
        });

        this.componentInputs.set(id, inputs);
        if (selects['parent']) this.componentSelects.set(id, selects['parent']);
        this._opts.buildInspTitle.textContent = `${def.label} · ${id}`;
        this._opts.buildInspEl.hidden = false;
    }

    // ── Remove a component item ───────────────────────────────────────────────
    removeComponentItem(id: string): void {
        const card = this._opts.buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
        this.componentInputs.delete(id);
        this.componentSelects.delete(id);
        this.removeOptionFromParentSelects(id);
        if (this._buildSelCompId === id) this.deselectComp();
        card?.remove();
    }
}
