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

function _setActiveTab(id: string): void {
    for (const btn of document.querySelectorAll<HTMLButtonElement>('.tab-btn'))
        btn.setAttribute('aria-selected', btn.id === id ? 'true' : 'false');
}

export function initTabSwitching(opts: TabCtrlOptions): void {
    const { editorCtrl, buildCtrl, getGizmoCtrl, libTabCtrl, viewer, viewportGrid, buildGrid, chatInput } = opts;

    document.getElementById('tab-inspect')?.addEventListener('click', () => {
        editorCtrl.close();
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        _setActiveTab('tab-inspect');
    });

    document.getElementById('tab-editor')?.addEventListener('click', () => {
        buildCtrl.close();
        getGizmoCtrl()?.onBuildClose();
        editorCtrl.open();
        buildGrid.visible    = false;
        viewportGrid.visible = true;
        chatInput.placeholder = 'Ask AI to edit this URDF…';
        _setActiveTab('tab-editor');
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
        _setActiveTab('tab-build');
    });
}
