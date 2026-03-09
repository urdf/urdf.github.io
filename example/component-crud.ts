import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import type { URDFManipulator } from '../src/index.js';

function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

// ── Shared state ──────────────────────────────────────────────────────────
export const componentInputs  = new Map<string, Record<string, HTMLInputElement>>();
export const componentSelects = new Map<string, HTMLSelectElement>();
export let _buildSelCompId:   string | null = null;
export let _buildSelPartName: string | null = null;

// ── Injected dependencies ─────────────────────────────────────────────────
let _buildCtrl: URDFBuildController;
let _viewer: URDFManipulator;
let _buildComponentsListEl: HTMLElement;
let _buildInspEl: HTMLElement;
let _buildInspTitle: HTMLElement;
let _buildInspBody: HTMLElement;
let _onContextPillUpdate: (ctx: ContextPillCtx | null) => void;
let _onSelectPartFromBuild: (jointName: string) => void;
let _makeScrubLabel: (label: HTMLElement, input: HTMLInputElement) => void;
let _refreshPaletteCounts: () => void;
let _addOptionToParentSelects: (id: string) => void;
let _removeOptionFromParentSelects: (id: string) => void;
let _regenMeshBlob: (id: string, type: string) => void;

export interface ContextPillCtx { label: string; color: string; onDismiss: () => void; }

export interface ComponentCrudOptions {
    buildCtrl: URDFBuildController;
    viewer: URDFManipulator;
    buildComponentsListEl: HTMLElement;
    buildInspEl: HTMLElement;
    buildInspTitle: HTMLElement;
    buildInspBody: HTMLElement;
    onContextPillUpdate: (ctx: ContextPillCtx | null) => void;
    onSelectPartFromBuild: (jointName: string) => void;
    makeScrubLabel: (label: HTMLElement, input: HTMLInputElement) => void;
    refreshPaletteCounts: () => void;
    addOptionToParentSelects: (id: string) => void;
    removeOptionFromParentSelects: (id: string) => void;
    regenMeshBlob: (id: string, type: string) => void;
}

export function initComponentCrud(opts: ComponentCrudOptions): void {
    _buildCtrl                  = opts.buildCtrl;
    _viewer                     = opts.viewer;
    _buildComponentsListEl      = opts.buildComponentsListEl;
    _buildInspEl                = opts.buildInspEl;
    _buildInspTitle             = opts.buildInspTitle;
    _buildInspBody              = opts.buildInspBody;
    _onContextPillUpdate        = opts.onContextPillUpdate;
    _onSelectPartFromBuild      = opts.onSelectPartFromBuild;
    _makeScrubLabel             = opts.makeScrubLabel;
    _refreshPaletteCounts       = opts.refreshPaletteCounts;
    _addOptionToParentSelects   = opts.addOptionToParentSelects;
    _removeOptionFromParentSelects = opts.removeOptionFromParentSelects;
    _regenMeshBlob              = opts.regenMeshBlob;
}

// ── Context pill ─────────────────────────────────────────────────────────
export function updateContextPill(ctx: ContextPillCtx | null): void {
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
export function addOptionToParentSelects(id: string): void {
    for (const [existingId, sel] of componentSelects) {
        if (existingId !== id && !Array.from(sel.options).some(o => o.value === id)) {
            const o = document.createElement('option');
            o.value = o.textContent = id;
            sel.appendChild(o);
        }
    }
}

export function removeOptionFromParentSelects(id: string): void {
    for (const sel of componentSelects.values()) {
        const opt = Array.from(sel.options).find(o => o.value === id);
        if (opt) sel.removeChild(opt);
    }
}

// ── Deselect / clear ──────────────────────────────────────────────────────
export function deselectComp(): void {
    _buildSelCompId   = null;
    _buildSelPartName = null;
    for (const el of _buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
        el.classList.remove('selected');
    _buildInspEl.hidden = true;
    _buildInspBody.innerHTML = '';
    componentInputs.clear();
    componentSelects.clear();
    _onContextPillUpdate(null);
}

export function clearBuildUI(): void {
    _buildComponentsListEl.innerHTML = '';
    deselectComp();
}

// ── Select a component card ───────────────────────────────────────────────
export function selectCompCard(id: string): void {
    _buildSelCompId   = id;
    _buildSelPartName = null;
    for (const el of _buildComponentsListEl.querySelectorAll<HTMLElement>('.build-component'))
        el.classList.toggle('selected', el.dataset.id === id);
    const entry = _buildCtrl.getComponentEntries().find(e => e.id === id);
    if (entry) renderInspector(id, entry.type);
    const def = COMPONENT_CATALOG[entry?.type ?? ''];
    _onContextPillUpdate({
        label:     `${def?.label ?? entry?.type ?? id} · ${id}`,
        color:     def?.cssColor ?? '#888',
        onDismiss: deselectComp,
    });
}

export function setBuildSelPartName(name: string | null): void {
    _buildSelPartName = name;
}

export function getBuildSelCompId(): string | null { return _buildSelCompId; }
export function getBuildSelPartName(): string | null { return _buildSelPartName; }

// ── Render a component list item ──────────────────────────────────────────
export function renderComponentItem(id: string, type: string): void {
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
        const newId = _buildCtrl.duplicateComponent(id);
        if (!newId) return;
        _addOptionToParentSelects(newId);
        renderComponentItem(newId, type);
        if (COMPONENT_CATALOG[type]?.geomType === 'mesh') _regenMeshBlob(newId, type);
        _refreshPaletteCounts();
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'build-remove-btn';
    removeBtn.title = 'Remove';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        _buildCtrl.removeComponent(id);
        if (_buildSelCompId === id) deselectComp();
        _removeOptionFromParentSelects(id);
        item.remove();
        _refreshPaletteCounts();
    });

    header.setAttribute('role', 'button');
    header.tabIndex = 0;
    header.addEventListener('click', () => selectCompCard(id));
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCompCard(id); }
    });
    header.append(dot, labelEl, dupBtn, removeBtn);
    item.appendChild(header);
    _buildComponentsListEl.appendChild(item);
}

// ── Render the component property inspector ───────────────────────────────
export function renderInspector(id: string, type: string): void {
    const saved = _buildCtrl.getComponentData(id);
    if (!saved) return;
    const def = COMPONENT_CATALOG[type];

    _buildInspBody.innerHTML = '';
    componentInputs.delete(id);
    componentSelects.delete(id);

    const inputs:  Record<string, HTMLInputElement>  = {};
    const selects: Record<string, HTMLSelectElement> = {};

    function dispatchUpdate(): void {
        const dims = def.geomType === 'cylinder'
            ? [parseFloat(inputs['r'].value) || 0.001, parseFloat(inputs['l'].value) || 0.001]
            : [parseFloat(inputs['w'].value) || 0.001, parseFloat(inputs['d'].value) || 0.001, parseFloat(inputs['h'].value) || 0.001];
        const jt = selects['jt']?.value ?? 'fixed';
        _buildCtrl.updateComponent(id, {
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
    }

    function addRow(key: string, axisClass: string, label: string, step: number, value: number, container: HTMLElement = _buildInspBody): void {
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
        _makeScrubLabel(lbl, inp);
        inputs[key] = inp;
        row.append(lbl, inp);
        container.appendChild(row);
    }

    function addGroupLabel(text: string, container: HTMLElement = _buildInspBody): void {
        const lbl = document.createElement('div');
        lbl.className   = 'build-group-label';
        lbl.textContent = text;
        container.appendChild(lbl);
    }

    function addSelectRow(key: string, label: string, options: string[], container: HTMLElement = _buildInspBody): void {
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
    }

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
    _buildInspBody.appendChild(advancedDetails);

    addGroupLabel('Rotation', advancedDetails);
    addRow('rx', 'axis-x', 'Rx', 0.01, saved.rx ?? 0, advancedDetails);
    addRow('ry', 'axis-y', 'Ry', 0.01, saved.ry ?? 0, advancedDetails);
    addRow('rz', 'axis-z', 'Rz', 0.01, saved.rz ?? 0, advancedDetails);

    addGroupLabel('Joint', advancedDetails);
    addSelectRow('parent', 'Parent', _buildCtrl.getAvailableLinks().filter(l => l !== id), advancedDetails);
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
        _viewer.robot?.setJointValue(`${id}_joint`, parseFloat(previewSlider.value));
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
            _viewer.robot?.setJointValue(`${id}_joint`, 0);
        }
    });

    componentInputs.set(id, inputs);
    if (selects['parent']) componentSelects.set(id, selects['parent']);
    _buildInspTitle.textContent = `${def.label} · ${id}`;
    _buildInspEl.hidden = false;
}

// ── Remove a component item ───────────────────────────────────────────────
export function removeComponentItem(id: string): void {
    const card = _buildComponentsListEl.querySelector<HTMLElement>(`[data-id="${id}"]`);
    componentInputs.delete(id);
    componentSelects.delete(id);
    _removeOptionFromParentSelects(id);
    if (_buildSelCompId === id) deselectComp();
    card?.remove();
}
