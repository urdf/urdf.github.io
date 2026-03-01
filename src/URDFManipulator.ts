import * as THREE from 'three';
import { URDFJoint } from './URDFClasses.js';
import { PointerURDFDragControls } from './URDFDragControls.js';
import { URDFViewer } from './URDFViewer.js';

// ─── URDFManipulator ──────────────────────────────────────────────────────────
//
// Extends URDFViewer with mouse-driven joint manipulation.
//
// Additional attributes
//   highlight-color   – hex color for hovered joint highlight (default "#FFFFFF")
//   disable-dragging  – boolean; disables drag interaction
//
// Additional events
//   joint-mouseover   – fired (detail = jointName) on hover
//   joint-mouseout    – fired (detail = jointName) on unhover
//   manipulate-start  – fired (detail = jointName) when drag begins
//   manipulate-end    – fired (detail = jointName) when drag ends

export class URDFManipulator extends URDFViewer {

    static get observedAttributes() {
        return ['highlight-color', 'disable-dragging', ...super.observedAttributes];
    }

    get highlightColor(): string { return this.getAttribute('highlight-color') ?? '#ffffff'; }
    set highlightColor(v: string) { this.setAttribute('highlight-color', v); }

    get disableDragging(): boolean { return this.hasAttribute('disable-dragging'); }
    set disableDragging(v: boolean) { v ? this.setAttribute('disable-dragging', '') : this.removeAttribute('disable-dragging'); }

    private _highlightMaterial: THREE.MeshPhongMaterial;
    private _dragControls: PointerURDFDragControls;

    constructor() {
        super();

        this._highlightMaterial = new THREE.MeshPhongMaterial({
            shininess: 10,
            color: this.highlightColor,
            emissive: this.highlightColor,
            emissiveIntensity: 0.25,
        });

        this._dragControls = new PointerURDFDragControls(
            this.scene,
            this.camera,
            this.renderer.domElement,
        );

        this._dragControls.updateJoint = (joint, angle) => {
            this.setJointValue(joint.name, angle);
        };

        this._dragControls.onHover = joint => {
            this._highlightJoint(joint, false);
            this.redraw();
        };

        this._dragControls.onUnhover = joint => {
            this._highlightJoint(joint, true);
            this.redraw();
        };

        this._dragControls.onHoverAny = joint => {
            this.dispatchEvent(new CustomEvent('joint-mouseover', { bubbles: true, detail: joint.name }));
        };

        this._dragControls.onUnhoverAny = joint => {
            this.dispatchEvent(new CustomEvent('joint-mouseout', { bubbles: true, detail: joint.name }));
        };

        this._dragControls.onDragStart = joint => {
            this.controls.enabled = false;
            this.dispatchEvent(new CustomEvent('manipulate-start', { bubbles: true, detail: joint.name }));
            this.redraw();
        };

        this._dragControls.onDragEnd = joint => {
            this.controls.enabled = true;
            this.dispatchEvent(new CustomEvent('manipulate-end', { bubbles: true, detail: joint.name }));
            this.redraw();
        };
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._dragControls.dispose();
    }

    override attributeChangedCallback(attr: string, old: string | null, next: string | null) {
        super.attributeChangedCallback(attr, old, next);
        if (attr === 'highlight-color') {
            this._highlightMaterial.color.set(this.highlightColor);
            this._highlightMaterial.emissive.set(this.highlightColor);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────

    private _highlightJoint(joint: URDFJoint, revert: boolean): void {
        const isMovable = (j: THREE.Object3D) =>
            (j as URDFJoint).isURDFJoint && (j as URDFJoint).jointType !== 'fixed';

        const walk = (node: THREE.Object3D) => {
            const mesh = node as THREE.Mesh;
            if (mesh.isMesh) {
                if (revert) {
                    const orig = (mesh as THREE.Mesh & { __orig?: THREE.Material | THREE.Material[] }).__orig;
                    if (orig !== undefined) {
                        mesh.material = orig;
                        delete (mesh as THREE.Mesh & { __orig?: THREE.Material | THREE.Material[] }).__orig;
                    }
                } else {
                    (mesh as THREE.Mesh & { __orig?: THREE.Material | THREE.Material[] }).__orig = mesh.material;
                    mesh.material = this._highlightMaterial;
                }
            }

            // Recurse, but stop at child joints and skip colliders
            for (const child of node.children) {
                if (node === joint || !isMovable(node)) {
                    if (!(child as { isURDFCollider?: boolean }).isURDFCollider) {
                        walk(child);
                    }
                }
            }
        };

        walk(joint);
    }
}
