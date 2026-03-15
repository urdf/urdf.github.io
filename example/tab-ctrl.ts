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

function _setAdvTab(tab: string): void {
    const advPanel = document.getElementById('adv-panel');
    advPanel?.setAttribute('data-adv-tab', tab);
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
        advContext.textContent = titles[tab] ?? '';
    }
}

function _syncTabUi(tab: string): void {
    _setAdvTab(tab);
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
        openAdvPanelIfClosed();
        _syncTabUi('build');
        _setActiveTab('build');
    });

    // Mesh tab — mode pill button, opens panel with mesh content
    document.getElementById('tab-meshes')?.addEventListener('click', () => {
        editorCtrl.close();
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        openAdvPanelIfClosed();
        _syncTabUi('meshes');
        _setActiveTab('meshes');
    });

    // AI tab — mode pill button, preserves current viewport controllers
    document.getElementById('tab-ai')?.addEventListener('click', () => {
        openAdvPanelIfClosed();
        _syncTabUi('ai');
        _setActiveTab('ai');
    });

    // Default to AI tab — strongest value demonstration for first-time users
    _setActiveTab('ai');
    _syncTabUi('ai');
    openAdvPanelIfClosed();
}
