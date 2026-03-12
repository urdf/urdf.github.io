// ── Tab switching ──────────────────────────────────────────────────────────
//
// Extracted from main.ts. Manages body class changes, grid visibility, and
// editor/build controller open/close when the user switches sidebar tabs.

import type { URDFManipulator } from '../src/index.js';
import type { URDFEditorController } from './editor.js';
import type { URDFBuildController } from './build.js';
import type { GizmoController } from './gizmo-ctrl.js';
import type { LibraryTabController } from './library-tab.js';
import type { GridHelper } from 'three';

export interface TabCtrlOptions {
    editorCtrl:      URDFEditorController;
    buildCtrl:       URDFBuildController;
    getGizmoCtrl:    () => GizmoController | null;
    libTabCtrl:      LibraryTabController;
    viewer:          URDFManipulator;
    viewportGrid:    GridHelper;
    buildGrid:       GridHelper;
    chatInput:       HTMLTextAreaElement;
}

function _setActiveTab(tab: string): void {
    for (const btn of document.querySelectorAll<HTMLButtonElement>('.mode-btn.tab-btn'))
        btn.setAttribute('aria-selected', btn.dataset.tab === tab ? 'true' : 'false');
}

function _setActiveAdvTab(tab: string): void {
    const advPanel = document.getElementById('adv-panel');
    advPanel?.setAttribute('data-adv-tab', tab);
    for (const btn of document.querySelectorAll<HTMLButtonElement>('.adv-tab'))
        btn.setAttribute('aria-selected', btn.dataset.tab === tab || btn.dataset.advTab === tab ? 'true' : 'false');
}

function _setAdvContext(tab: string): void {
    const advContext = document.getElementById('adv-context');
    if (advContext) {
        const titles: Record<string, string> = {
            ai: 'AI',
            inspect: 'Control',
            build: 'Build',
            editor: 'XML',
            meshes: 'Mesh Files',
        };
        advContext.textContent = titles[tab] ?? 'Advanced';
    }
}

function _syncTabUi(tab: string): void {
    _setActiveAdvTab(tab);
    _setAdvContext(tab);
}

export function initTabSwitching(opts: TabCtrlOptions): void {
    const { editorCtrl, buildCtrl, getGizmoCtrl, libTabCtrl, viewer, viewportGrid, buildGrid, chatInput } = opts;

    const advPanel = document.getElementById('adv-panel');

    function openAdvPanelIfClosed(): void {
        if (advPanel && !advPanel.classList.contains('open')) {
            advPanel.classList.add('open', 'pinned');
            document.getElementById('adv-toggle')?.classList.add('on');
            document.body.classList.add('adv-open');
        }
    }

    document.getElementById('tab-inspect')?.addEventListener('click', () => {
        editorCtrl.close();
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        document.body.classList.remove('meshes-open');
        _syncTabUi('inspect');
        _setActiveTab('inspect');
    });

    document.getElementById('tab-editor')?.addEventListener('click', () => {
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        editorCtrl.open();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        chatInput.placeholder = 'Ask AI to edit this URDF…';
        document.body.classList.remove('meshes-open');
        openAdvPanelIfClosed();
        _syncTabUi('editor');
        _setActiveTab('editor');
    });

    document.getElementById('tab-build')?.addEventListener('click', () => {
        editorCtrl.close();
        buildCtrl.open();
        getGizmoCtrl()?.onBuildOpen();
        viewportGrid.visible = false;
        buildGrid.visible    = true;
        buildGrid.position.y = viewer.shadowPlane.position.y;
        chatInput.placeholder = 'Ask AI to add or modify components…';
        libTabCtrl.buildLibraryGrid();
        document.body.classList.remove('meshes-open');
        openAdvPanelIfClosed();
        _syncTabUi('build');
        _setActiveTab('build');
    });

    // Adv-panel tab buttons mirror the mode pill buttons
    document.getElementById('adv-tab-inspect')?.addEventListener('click', () =>
        document.getElementById('tab-inspect')?.click());
    document.getElementById('adv-tab-editor')?.addEventListener('click', () =>
        document.getElementById('tab-editor')?.click());
    document.getElementById('adv-tab-build')?.addEventListener('click', () =>
        document.getElementById('tab-build')?.click());

    // Meshes tab — adv-panel only (no mode-pill button)
    document.getElementById('adv-tab-meshes')?.addEventListener('click', () => {
        editorCtrl.close();
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        document.body.classList.add('meshes-open');
        openAdvPanelIfClosed();
        for (const btn of document.querySelectorAll<HTMLButtonElement>('.mode-btn.tab-btn'))
            btn.setAttribute('aria-selected', 'false');
        _syncTabUi('meshes');
    });

    document.getElementById('adv-tab-ai')?.addEventListener('click', () => {
        openAdvPanelIfClosed();
        _syncTabUi('ai');
    });

    _setActiveTab('inspect');
    _syncTabUi('inspect');
}
