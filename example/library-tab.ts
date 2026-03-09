import { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';
import type { LibraryEntry } from '../src/generators/components/index.js';

function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

const CATEGORY_ICON: Record<string, string> = {
    Sensor: '📡', Actuator: '⚙️', MCU: '💾', Power: '🔋', Structural: '🧱',
};

let _libActiveCat = '';
let _buildCtrl: URDFBuildController;
let _onComponentAdded: (id: string, type: string) => void;

export function initLibraryTab(
    buildCtrl: URDFBuildController,
    onComponentAdded: (id: string, type: string) => void,
): void {
    _buildCtrl        = buildCtrl;
    _onComponentAdded = onComponentAdded;

    const libSearchEl = $<HTMLInputElement>('lib-search');
    const libPillsEl  = $('lib-pills');

    libSearchEl.addEventListener('input', buildLibraryGrid);

    for (const pill of libPillsEl.querySelectorAll<HTMLButtonElement>('.lib-pill')) {
        pill.addEventListener('click', () => {
            for (const p of libPillsEl.querySelectorAll<HTMLButtonElement>('.lib-pill'))
                p.classList.remove('lib-pill--active');
            pill.classList.add('lib-pill--active');
            _libActiveCat = pill.dataset.cat ?? '';
            buildLibraryGrid();
        });
    }
}

export function buildLibraryGrid(): void {
    const libSearchEl = $<HTMLInputElement>('lib-search');
    const libGridEl   = $('lib-grid');
    const libEmptyEl  = $('lib-empty');

    const hasBuild = _buildCtrl.isCatalogActive;
    const query    = libSearchEl.value.trim().toLowerCase();

    const entries = LIBRARY.filter(e => {
        if (_libActiveCat && e.category !== _libActiveCat) return false;
        if (query && !e.label.toLowerCase().includes(query)
                  && !e.description.toLowerCase().includes(query)) return false;
        return true;
    });

    libGridEl.innerHTML = '';
    libEmptyEl.hidden = entries.length > 0;
    for (const entry of entries) libGridEl.appendChild(createLibCard(entry, hasBuild));
}

function createLibCard(entry: LibraryEntry, hasBuild: boolean): HTMLElement {
    const card = document.createElement('div');
    card.className = 'lib-card';

    const thumb = document.createElement('div');
    thumb.className = 'lib-thumb';
    thumb.style.background = entry.cssColor + '33';
    thumb.style.borderBottom = `2px solid ${entry.cssColor}`;
    thumb.textContent = CATEGORY_ICON[entry.category] ?? '📦';

    const info = document.createElement('div');
    info.className = 'lib-card-info';

    const name = document.createElement('div');
    name.className = 'lib-card-name';
    name.textContent = entry.label;
    name.title = entry.description;

    const meta = document.createElement('div');
    meta.className = 'lib-card-meta';
    const cat  = Object.assign(document.createElement('span'), { className: 'lib-card-cat',  textContent: entry.category });
    const dimsText = entry.defaultDims.map(d => Math.round(d * 1000)).join('×') + ' mm';
    const dims = Object.assign(document.createElement('span'), { className: 'lib-card-dims', textContent: dimsText });
    meta.append(cat, dims);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'lib-card-add';
    addBtn.textContent = 'Add to Build';
    addBtn.disabled = !hasBuild;
    addBtn.addEventListener('click', () => void handleLibraryAdd(entry, addBtn));

    info.append(name, meta, addBtn);
    card.append(thumb, info);
    return card;
}

async function handleLibraryAdd(entry: LibraryEntry, btn: HTMLButtonElement): Promise<void> {
    if (!_buildCtrl.isCatalogActive) return;
    const origText = btn.textContent ?? 'Add to Build';
    btn.disabled = true;
    btn.textContent = 'Generating…';
    try {
        const { generate } = await entry.factory();
        const stl = generate();
        const id = _buildCtrl.addMeshComponent(entry.id, stl);
        _onComponentAdded(id, entry.id);
        $<HTMLButtonElement>('tab-build').click();
        document.getElementById('build-components-list')
            ?.querySelector<HTMLElement>(`[data-id="${id}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
        console.error('[Library] generate failed:', err);
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = origText; btn.disabled = !_buildCtrl.isCatalogActive; }, 2000);
        return;
    }
    btn.textContent = origText;
    btn.disabled = false;
}
