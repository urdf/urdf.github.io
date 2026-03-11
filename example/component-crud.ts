import { URDFBuildController, COMPONENT_CATALOG } from './build.js';
import type { URDFManipulator } from '../src/index.js';
import { $ } from './dom-utils.js';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { lintGutter, setDiagnostics } from '@codemirror/lint';
import type { Diagnostic } from '@codemirror/lint';

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
    onCompSelected?: (id: string) => void;
    onCompDeselected?: () => void;
}

export class ComponentCrudController {
    readonly componentInputs  = new Map<string, Record<string, HTMLInputElement>>();
    readonly componentSelects = new Map<string, HTMLSelectElement>();

    private _buildSelCompId:   string | null = null;
    private _buildSelPartName: string | null = null;

    private readonly _opts: ComponentCrudOptions;
    private _worker: Worker | null = null;
    private _scriptStatusEls = new Map<string, HTMLElement>();
    private _cmEditors = new Map<string, EditorView>();
    private _cmDiags   = new Map<string, Diagnostic[]>();

    constructor(opts: ComponentCrudOptions) {
        this._opts = opts;
    }

    // ── Script Worker ─────────────────────────────────────────────────────────
    private _getWorker(): Worker {
        if (!this._worker) {
            this._worker = new Worker(new URL('./script-worker.ts', import.meta.url), { type: 'module' });
            this._worker.onmessage = ({ data }: MessageEvent<{ id: string; buf?: ArrayBuffer; error?: string; line?: number }>) => {
                const { id, buf, error, line } = data;
                const statusEl = this._scriptStatusEls.get(id);
                const view = this._cmEditors.get(id);
                if (buf) {
                    this._opts.buildCtrl.restoreMeshBlob(id, buf);
                    if (statusEl) { statusEl.textContent = '✓'; statusEl.className = 'script-status ok'; }
                    // Clear any previous diagnostics
                    this._cmDiags.set(id, []);
                    if (view) view.dispatch(setDiagnostics(view.state, []));
                } else {
                    const loc = line != null ? `line ${line}: ` : '';
                    if (statusEl) { statusEl.textContent = loc + (error ?? 'Unknown error'); statusEl.className = 'script-status err'; }
                    // Surface error as inline diagnostic
                    if (view && line != null) {
                        const lineInfo = view.state.doc.line(Math.max(1, Math.min(line, view.state.doc.lines)));
                        const diag: Diagnostic = { from: lineInfo.from, to: lineInfo.to, severity: 'error', message: error ?? 'Unknown error' };
                        this._cmDiags.set(id, [diag]);
                        view.dispatch(setDiagnostics(view.state, [diag]));
                    } else {
                        this._cmDiags.set(id, []);
                    }
                }
            };
            this._worker.onerror = (e) => console.warn('[script-worker]', e.message);
        }
        return this._worker;
    }

    runScript(id: string, src: string): void {
        this._getWorker().postMessage({ id, src });
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
        this._opts.onCompDeselected?.();
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
            color:     def?.cssColor ?? 'var(--text-3)',
            onDismiss: () => this.deselectComp(),
        });
        this._opts.onCompSelected?.(id);
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
        dot.style.background = def?.cssColor ?? 'var(--text-3)';

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

        // ── Inline script editor (script type only) ───────────────────────
        if (type === 'script') {
            const section = document.createElement('div');
            section.className = 'script-editor-section';

            const wrap = document.createElement('div');
            wrap.className = 'script-editor-wrap';

            const cmHost = document.createElement('div');
            cmHost.className = 'script-editor-cm';
            wrap.appendChild(cmHost);

            const statusEl = document.createElement('div');
            statusEl.className = 'script-status';
            this._scriptStatusEls.set(id, statusEl);

            section.append(wrap, statusEl);
            item.appendChild(section);

            const initSrc = this._opts.buildCtrl.getComponentScript(id) ?? '';
            let debounce = 0;

            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const editorTheme = EditorView.theme({
                '&': { background: 'var(--surface-lo)', color: 'var(--text-1)', height: '152px' },
                '.cm-content':        { caretColor: 'var(--text-1)' },
                '.cm-cursor':         { borderLeftColor: 'var(--text-1)' },
                '.cm-gutters': {
                    background: 'var(--bg)', color: 'var(--text-3)',
                    border: 'none', borderRight: '1px solid var(--border)',
                },
                '.cm-activeLineGutter':              { background: 'var(--surface-hover)' },
                '.cm-activeLine':                    { background: 'rgba(30, 33, 46, 0.8)' },
                '.cm-selectionBackground, ::selection': { background: 'var(--blue-bg) !important' },
                '.cm-focused .cm-selectionBackground':  { background: 'var(--blue-bg) !important' },
                '.cm-tooltip':        { background: 'var(--surface)', border: '1px solid var(--border)' },
                '.cm-lintRange-error':  { backgroundImage: 'none', borderBottom: '2px solid var(--red)' },
                '.cm-diagnostic-error': { borderLeft: '3px solid var(--red)', color: 'var(--text-1)' },
                '.cm-lint-marker-error': { color: 'var(--red)' },
            }, { dark: isDark });

            const view = new EditorView({
                state: EditorState.create({
                    doc: initSrc,
                    extensions: [
                        lineNumbers(),
                        history(),
                        javascript(),
                        lintGutter(),
                        keymap.of([
                            ...defaultKeymap,
                            ...historyKeymap,
                            // Escape releases focus so Tab can navigate away
                            { key: 'Escape', run: (v) => { v.contentDOM.blur(); return false; } },
                        ]),
                        editorTheme,
                        EditorView.updateListener.of((update) => {
                            if (!update.docChanged) return;
                            const src = update.state.doc.toString();
                            this._opts.buildCtrl.setComponentScript(id, src);
                            statusEl.textContent = '…';
                            statusEl.className = 'script-status';
                            clearTimeout(debounce);
                            debounce = window.setTimeout(() => this.runScript(id, src), 600);
                        }),
                    ],
                }),
                parent: cmHost,
            });

            this._cmEditors.set(id, view);

            // Run immediately if there's existing source (e.g. after restore)
            if (initSrc) this.runScript(id, initSrc);
        }

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
                : type === 'script'
                    ? (this._opts.buildCtrl.getComponentData(id)?.dims ?? def.defaultDims)
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

        if (type !== 'script') {
            addGroupLabel('Size');
            if (def.geomType === 'cylinder') {
                addRow('r', 'axis-x', 'R', 0.005, saved.dims[0] ?? def.defaultDims[0]);
                addRow('l', 'axis-z', 'L', 0.005, saved.dims[1] ?? def.defaultDims[1]);
            } else {
                addRow('w', 'axis-x', 'W', 0.005, saved.dims[0] ?? def.defaultDims[0]);
                addRow('d', 'axis-y', 'D', 0.005, saved.dims[1] ?? def.defaultDims[1]);
                addRow('h', 'axis-z', 'H', 0.005, saved.dims[2] ?? def.defaultDims[2]);
            }
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
        this._scriptStatusEls.delete(id);
        const cmView = this._cmEditors.get(id);
        if (cmView) { cmView.destroy(); this._cmEditors.delete(id); }
        this._cmDiags.delete(id);
        this.removeOptionFromParentSelects(id);
        if (this._buildSelCompId === id) this.deselectComp();
        card?.remove();
    }
}
