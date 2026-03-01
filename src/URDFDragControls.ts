import { Camera, Object3D, Plane, Raycaster, Ray, Vector2, Vector3 } from 'three';
import { URDFJoint } from './URDFClasses.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nearestJoint(object: Object3D): URDFJoint | null {
    let curr: Object3D | null = object;
    while (curr) {
        if ((curr as URDFJoint).isURDFJoint && (curr as URDFJoint).jointType !== 'fixed') {
            return curr as URDFJoint;
        }
        curr = curr.parent;
    }
    return null;
}

// ─── Shared temps ─────────────────────────────────────────────────────────────

const _prev = new Vector3();
const _next = new Vector3();
const _pivot = new Vector3();
const _a = new Vector3();
const _b = new Vector3();
const _projStart = new Vector3();
const _projEnd = new Vector3();
const _plane = new Plane();

// ─── URDFDragControls ────────────────────────────────────────────────────────

export class URDFDragControls {
    enabled = true;
    scene: Object3D;
    raycaster = new Raycaster();
    initialGrabPoint = new Vector3();

    hovered: URDFJoint | null = null;
    manipulating: URDFJoint | null = null;
    hitDistance = -1;

    constructor(scene: Object3D) {
        this.scene = scene;
    }

    update(): void {
        if (this.manipulating) return;

        const hits = this.raycaster.intersectObject(this.scene, true);
        const hit = hits[0];

        const hoveredJoint = hit ? nearestJoint(hit.object) : null;
        if (hit) {
            this.hitDistance = hit.distance;
            this.initialGrabPoint.copy(hit.point);
        }

        if (hoveredJoint !== this.hovered) {
            if (this.hovered) this.onUnhover(this.hovered);
            this.hovered = hoveredJoint;
            if (hoveredJoint) this.onHover(hoveredJoint);
        }
    }

    moveRay(ray: Ray): void {
        const { raycaster, hitDistance, manipulating } = this;

        if (manipulating) {
            raycaster.ray.at(hitDistance, _prev);
            ray.at(hitDistance, _next);

            let delta = 0;
            const type = manipulating.jointType;
            if (type === 'revolute' || type === 'continuous') {
                delta = this.getRevoluteDelta(manipulating, _prev, _next);
            } else if (type === 'prismatic') {
                delta = this.getPrismaticDelta(manipulating, _prev, _next);
            }

            if (delta) this.updateJoint(manipulating, manipulating.angle + delta);
        }

        raycaster.ray.copy(ray);
        this.update();
    }

    setGrabbed(grabbed: boolean): void {
        if (grabbed) {
            if (this.manipulating !== null || this.hovered === null) return;
            this.manipulating = this.hovered;
            this.onDragStart(this.hovered);
        } else {
            if (this.manipulating === null) return;
            this.onDragEnd(this.manipulating);
            this.manipulating = null;
            this.update();
        }
    }

    getRevoluteDelta(joint: URDFJoint, start: Vector3, end: Vector3): number {
        _a.copy(joint.axis).transformDirection(joint.matrixWorld).normalize();
        _pivot.set(0, 0, 0).applyMatrix4(joint.matrixWorld);
        _plane.setFromNormalAndCoplanarPoint(_a, _pivot);

        _plane.projectPoint(start, _projStart).sub(_pivot);
        _plane.projectPoint(end, _projEnd).sub(_pivot);

        _a.crossVectors(_projStart, _projEnd);
        return Math.sign(_a.dot(_plane.normal)) * _projEnd.angleTo(_projStart);
    }

    getPrismaticDelta(joint: URDFJoint, start: Vector3, end: Vector3): number {
        _a.subVectors(end, start);
        _plane.normal
            .copy(joint.axis)
            .transformDirection(joint.parent!.matrixWorld)
            .normalize();
        return _a.dot(_plane.normal);
    }

    // ── Override hooks ─────────────────────────────────────────────────────

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateJoint(joint: URDFJoint, angle: number): void {
        joint.setJointValue(angle);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDragStart(_joint: URDFJoint): void {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDragEnd(_joint: URDFJoint): void {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onHover(_joint: URDFJoint): void {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUnhover(_joint: URDFJoint): void {}
}

// ─── PointerURDFDragControls ─────────────────────────────────────────────────

export class PointerURDFDragControls extends URDFDragControls {
    camera: Camera;
    domElement: HTMLElement;

    private _raycaster = new Raycaster();
    private _mouse = new Vector2();

    private _onDown: (e: PointerEvent) => void;
    private _onMove: (e: PointerEvent) => void;
    private _onUp: (e: PointerEvent) => void;

    constructor(scene: Object3D, camera: Camera, domElement: HTMLElement) {
        super(scene);
        this.camera = camera;
        this.domElement = domElement;

        const updateMouse = (e: PointerEvent) => {
            const rect = domElement.getBoundingClientRect();
            this._mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this._mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        this._onDown = e => {
            updateMouse(e);
            this._raycaster.setFromCamera(this._mouse, camera);
            this.moveRay(this._raycaster.ray);
            this.setGrabbed(true);
        };

        this._onMove = e => {
            updateMouse(e);
            this._raycaster.setFromCamera(this._mouse, camera);
            this.moveRay(this._raycaster.ray);
        };

        this._onUp = e => {
            updateMouse(e);
            this._raycaster.setFromCamera(this._mouse, camera);
            this.moveRay(this._raycaster.ray);
            this.setGrabbed(false);
        };

        domElement.addEventListener('pointerdown', this._onDown);
        domElement.addEventListener('pointermove', this._onMove);
        domElement.addEventListener('pointerup', this._onUp);
    }

    override getRevoluteDelta(joint: URDFJoint, start: Vector3, end: Vector3): number {
        _a.copy(joint.axis).transformDirection(joint.matrixWorld).normalize();
        _pivot.set(0, 0, 0).applyMatrix4(joint.matrixWorld);
        _plane.setFromNormalAndCoplanarPoint(_a, _pivot);

        _b.copy(this.camera.position).sub(this.initialGrabPoint).normalize();

        // If looking roughly into the rotation plane, use standard delta
        if (Math.abs(_b.dot(_plane.normal)) > 0.3) {
            return super.getRevoluteDelta(joint, start, end);
        }

        // Otherwise project onto camera screen-space
        _plane.projectPoint(start, _projStart);
        _plane.projectPoint(end, _projEnd);
        _a.set(0, 0, -1).transformDirection(this.camera.matrixWorld).cross(_plane.normal);
        _b.subVectors(end, start);
        return _a.dot(_b);
    }

    dispose(): void {
        this.domElement.removeEventListener('pointerdown', this._onDown);
        this.domElement.removeEventListener('pointermove', this._onMove);
        this.domElement.removeEventListener('pointerup', this._onUp);
    }
}
