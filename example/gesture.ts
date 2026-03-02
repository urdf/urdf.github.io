import type { GestureRecognizer, NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { URDFManipulator } from '../src/index.js';
import * as THREE from 'three';

interface GestureControllerOptions {
    viewer: URDFManipulator;
    overlayCanvas: HTMLCanvasElement;
    videoEl: HTMLVideoElement;
    onDwellSelect(clientX: number, clientY: number): void;
    onPointerMove?(clientX: number, clientY: number): void;
    onPointerLeave?(): void;
    onStop(): void;
}

const HAND_CONNECTIONS: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17],
];

const WASM_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm';

const CAM_LERP = 0.14;

class OneEuroFilter {
    private x_prev = NaN;
    private dx_prev = 0;
    private t_prev = NaN;
    constructor(
        private readonly f_min = 1.0,
        private readonly beta = 0.007,
        private readonly d_cutoff = 1.0,
    ) {}

    private alpha(cutoff: number, dt: number): number {
        const r = 2 * Math.PI * cutoff * dt;
        return r / (r + 1);
    }

    filter(x: number, t: number): number {
        if (isNaN(this.t_prev)) {
            this.t_prev = t;
            this.x_prev = x;
            return x;
        }
        const dt = Math.max((t - this.t_prev) / 1000, 1e-6);
        this.t_prev = t;

        const dx = (x - this.x_prev) / dt;
        const ad = this.alpha(this.d_cutoff, dt);
        const dx_hat = dx * ad + this.dx_prev * (1 - ad);
        this.dx_prev = dx_hat;

        const cutoff = this.f_min + this.beta * Math.abs(dx_hat);
        const ac = this.alpha(cutoff, dt);
        const x_hat = x * ac + this.x_prev * (1 - ac);
        this.x_prev = x_hat;
        return x_hat;
    }

    reset(): void {
        this.x_prev = NaN;
        this.t_prev = NaN;
        this.dx_prev = 0;
    }
}

const _sph = new THREE.Spherical();
const _vec3 = new THREE.Vector3();
const _ndc = new THREE.Vector2();

export class GestureController {
    private viewer: URDFManipulator;
    private canvas: HTMLCanvasElement;
    private video: HTMLVideoElement;
    private onDwellSelect: (x: number, y: number) => void;
    private onPointerMove: ((x: number, y: number) => void) | undefined;
    private onPointerLeave: (() => void) | undefined;
    private onStop: () => void;

    private recognizer: GestureRecognizer | null = null;
    private stream: MediaStream | null = null;
    private rafId = 0;
    private selectedJoint: string | null = null;
    private running = false;

    private sphTheta = 0;
    private sphPhi = Math.PI / 3;
    private sphRadius = 0;

    private targetTheta = 0;
    private targetPhi = Math.PI / 3;
    private targetRadius = 0;

    private _wristFilterX = new OneEuroFilter(1.0, 0.007);
    private _wristFilterY = new OneEuroFilter(1.0, 0.007);

    private prevHandPos: { x: number; y: number } | null = null;
    private dwellStart = 0;
    private dwellMoved = false;
    private dwellScreenX = 0;
    private dwellScreenY = 0;
    private dwellStartScreenX = 0;
    private dwellStartScreenY = 0;
    private readonly DWELL_MS = 800;

    private palmResetStart = 0;
    private readonly PALM_RESET_MS = 1000;

    private prevWristAngle = Infinity;

    private prevZoomDist = 0;

    private _lastVideoTime = -1;

    private _prevGestureName = '';
    private _stableGestureName = '';

    private _raycaster = new THREE.Raycaster();
    private _overRobot = false;

    private _dragCtrl: { enabled: boolean; raycaster: THREE.Raycaster; update(): void } | null = null;

    constructor(opts: GestureControllerOptions) {
        this.viewer = opts.viewer;
        this.canvas = opts.overlayCanvas;
        this.video = opts.videoEl;
        this.onDwellSelect = opts.onDwellSelect;
        this.onPointerMove = opts.onPointerMove;
        this.onPointerLeave = opts.onPointerLeave;
        this.onStop = opts.onStop;
    }

    async start(): Promise<void> {
        const cdnMjs = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { GestureRecognizer, FilesetResolver } = await import(/* @vite-ignore */ cdnMjs) as any;

        const vision = await FilesetResolver.forVisionTasks(WASM_CDN);
        this.recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath:
                    'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            },
            runningMode: 'VIDEO',
            numHands: 2,
            minHandDetectionConfidence: 0.7,
            minHandPresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        this.stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' },
        });
        this.video.srcObject = this.stream;
        await this.video.play();

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', this._onResize);

        const { controls, camera } = this.viewer;
        _sph.setFromVector3(_vec3.copy(camera.position).sub(controls.target));
        this.sphTheta  = this.targetTheta  = _sph.theta;
        this.sphPhi    = this.targetPhi    = _sph.phi;
        this.sphRadius = this.targetRadius = _sph.radius;

        controls.enabled = false;

        const dc = (this.viewer as unknown as {
            _dragControls?: { enabled: boolean; raycaster: THREE.Raycaster; update(): void };
        })._dragControls;
        if (dc) { this._dragCtrl = dc; dc.enabled = false; }

        this.running = true;
        this.rafId = requestAnimationFrame(this._loop);
    }

    stop(): void {
        this.running = false;
        cancelAnimationFrame(this.rafId);

        const ctx = this.canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.stream?.getTracks().forEach(t => t.stop());
        this.stream = null;
        this.recognizer?.close();
        this.recognizer = null;
        this._lastVideoTime = -1;

        this.viewer.controls.enabled = true;

        if (this._dragCtrl) {
            this._clearHover();
            this._dragCtrl.enabled = true;
            this._dragCtrl = null;
        }

        window.removeEventListener('resize', this._onResize);
        this.onStop();
    }

    setSelectedJoint(name: string | null): void {
        if (name !== this.selectedJoint) this.prevWristAngle = Infinity;
        this.selectedJoint = name;
    }

    private _onResize = () => {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    private _loop = () => {
        if (!this.running) return;
        this.rafId = requestAnimationFrame(this._loop);

        if (this.recognizer && this.video.readyState >= 2 &&
                this.video.currentTime !== this._lastVideoTime) {
            this._lastVideoTime = this.video.currentTime;
            const result = this.recognizer.recognizeForVideo(this.video, performance.now());
            const hands    = result.landmarks ?? [];
            const gestures = result.gestures ?? [];

            const ctx = this.canvas.getContext('2d')!;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (const lms of hands) this._drawHand(ctx, lms);

            if (hands.length === 0) {
                this._resetTimers();
            } else if (hands.length >= 2) {
                this._handleZoom(hands);
                this._resetOneHandTimers();
            } else {
                const lms     = hands[0];
                const rawName = gestures[0]?.[0]?.categoryName ?? '';

                if (rawName === this._prevGestureName) this._stableGestureName = rawName;
                this._prevGestureName = rawName;
                const name = this._stableGestureName;

                this._handleWristRoll(lms);

                if (name === 'Open_Palm') {
                    this._handlePalmReset(ctx, lms);
                    this._resetDwell();
                    this.prevHandPos = null;
                    this._clearHover();
                } else if (name === 'Closed_Fist') {
                    this._handleOrbit(lms);
                    this._resetDwell();
                    this._clearHover();
                    this.palmResetStart = 0;
                } else if (name === 'Pointing_Up' || this._isIndexPointing(lms)) {
                    this._handleDwellAndHover(ctx, lms);
                    this.prevHandPos = null;
                    this.palmResetStart = 0;
                } else {
                    this._resetDwell();
                    this._clearHover();
                    this.prevHandPos = null;
                    this.palmResetStart = 0;
                }
            }
        }

        this._syncCameraIfNeeded();
        this._applyCamera();
    };

    private _syncCameraIfNeeded(): void {
        const { controls, camera } = this.viewer;
        if (this.sphRadius === 0) return;

        _sph.set(this.sphRadius, this.sphPhi, this.sphTheta);
        _vec3.setFromSpherical(_sph).add(controls.target);

        if (camera.position.distanceTo(_vec3) > this.sphRadius * 0.1) {
            _sph.setFromVector3(_vec3.copy(camera.position).sub(controls.target));
            this.sphTheta  = this.targetTheta  = _sph.theta;
            this.sphPhi    = this.targetPhi    = _sph.phi;
            this.sphRadius = this.targetRadius = _sph.radius;
        }
    }

    private _applyCamera(): void {
        const { controls, camera } = this.viewer;

        this.sphTheta  += (this.targetTheta  - this.sphTheta)  * CAM_LERP;
        this.sphPhi    += (this.targetPhi    - this.sphPhi)    * CAM_LERP;
        this.sphRadius += (this.targetRadius - this.sphRadius) * CAM_LERP;

        _sph.set(this.sphRadius, this.sphPhi, this.sphTheta);
        camera.position.setFromSpherical(_sph).add(controls.target);
        camera.lookAt(controls.target);
        controls.update();
        this.viewer.redraw();
    }

    private _updateHoverState(screenX: number, screenY: number): boolean {
        const { camera } = this.viewer;

        const rect = this.viewer.getBoundingClientRect();
        _ndc.set(
            ((screenX - rect.left) / rect.width) * 2 - 1,
            -((screenY - rect.top) / rect.height) * 2 + 1,
        );

        if (this._dragCtrl) {
            this._dragCtrl.raycaster.setFromCamera(_ndc, camera);
            this._dragCtrl.update();
        }

        if (!this.viewer.robot) return false;
        this._raycaster.setFromCamera(_ndc, camera);
        return this._raycaster.intersectObject(this.viewer.robot, true).length > 0;
    }

    private _clearHover(): void {
        if (!this._dragCtrl) return;
        this._dragCtrl.raycaster.ray.origin.set(0, 10000, 0);
        this._dragCtrl.raycaster.ray.direction.set(0, 1, 0);
        this._dragCtrl.update();
    }

    // Detects index-finger-extended pose at any hand orientation.
    // Uses landmark distances rather than the orientation-sensitive ML label.
    private _isIndexPointing(lms: NormalizedLandmark[]): boolean {
        const w = lms[0];
        const d = (a: NormalizedLandmark, b: NormalizedLandmark) =>
            Math.hypot(a.x - b.x, a.y - b.y);
        return d(lms[8],  w) > d(lms[5],  w) * 1.2    // index extended
            && d(lms[12], w) < d(lms[9],  w) * 1.15   // middle curled
            && d(lms[16], w) < d(lms[13], w) * 1.15   // ring curled
            && d(lms[20], w) < d(lms[17], w) * 1.15;  // pinky curled
    }

    private _handleOrbit(lms: NormalizedLandmark[]): void {
        const t = performance.now();
        const wristX = this._wristFilterX.filter(1 - lms[0].x, t);
        const wristY = this._wristFilterY.filter(lms[0].y, t);

        if (this.prevHandPos === null) {
            this.prevHandPos = { x: wristX, y: wristY };
        } else {
            const dx = wristX - this.prevHandPos.x;
            const dy = wristY - this.prevHandPos.y;
            this.prevHandPos = { x: wristX, y: wristY };

            if (Math.abs(dx) >= 0.004 || Math.abs(dy) >= 0.004) {
                this.targetTheta -= dx * 6.0;
                this.targetPhi = Math.max(0.05, Math.min(Math.PI - 0.05, this.targetPhi - dy * 6.0));
            }
        }
    }

    private _handleDwellAndHover(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        const tipX = 1 - lms[8].x;
        const tipY = lms[8].y;
        const sw = this.canvas.width;
        const sh = this.canvas.height;
        const screenX = tipX * sw;
        const screenY = tipY * sh;

        this._overRobot = this._updateHoverState(screenX, screenY);
        const overTrack = !!document.elementFromPoint(screenX, screenY)?.closest('[data-gesture-track]');

        this.viewer.dispatchEvent(new PointerEvent('pointermove', {
            clientX: screenX, clientY: screenY, bubbles: true, pointerId: 1,
        }));

        this.onPointerMove?.(screenX, screenY);

        const overTarget = this._overRobot || overTrack;

        ctx.beginPath();
        ctx.arc(screenX, screenY, 8, 0, 2 * Math.PI);
        ctx.strokeStyle = overTarget ? 'rgba(0,122,255,0.9)' : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (!overTarget) {
            this._resetDwell();
            return;
        }

        if (this.dwellStart === 0) {
            this.dwellStart = performance.now();
            this.dwellStartScreenX = screenX;
            this.dwellStartScreenY = screenY;
            this.dwellMoved = false;
            this.dwellScreenX = screenX;
            this.dwellScreenY = screenY;
            return;
        }

        const movePixels = Math.hypot(screenX - this.dwellStartScreenX, screenY - this.dwellStartScreenY);
        if (movePixels > 30) {
            this.dwellMoved = true;
            this.dwellStart = performance.now();
            this.dwellStartScreenX = screenX;
            this.dwellStartScreenY = screenY;
        }
        this.dwellScreenX = screenX;
        this.dwellScreenY = screenY;

        const elapsed = performance.now() - this.dwellStart;
        if (!this.dwellMoved && elapsed > 100) {
            const progress = Math.min(elapsed / this.DWELL_MS, 1);
            this._drawDwellRing(ctx, screenX, screenY, progress);
            if (progress >= 1) {
                this.onDwellSelect(screenX, screenY);
                this.dwellStart = performance.now();
                this.dwellStartScreenX = screenX;
                this.dwellStartScreenY = screenY;
            }
        }
    }

    private _handlePalmReset(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        if (this.palmResetStart === 0) this.palmResetStart = performance.now();

        const elapsed  = performance.now() - this.palmResetStart;
        const progress = Math.min(elapsed / this.PALM_RESET_MS, 1);

        const tips = [4, 8, 12, 16, 20];
        let cx = 0, cy = 0;
        for (const i of tips) {
            cx += (1 - lms[i].x) * this.canvas.width;
            cy += lms[i].y * this.canvas.height;
        }
        cx /= tips.length;
        cy /= tips.length;

        this._drawDwellRing(ctx, cx, cy, progress, true);

        if (progress >= 1) {
            this._resetAllJoints();
            this.palmResetStart = performance.now();
        }
    }

    private _resetAllJoints(): void {
        if (!this.viewer.robot) return;
        for (const [name, joint] of Object.entries(this.viewer.robot.joints)) {
            if (joint.jointType !== 'fixed') this.viewer.setJointValue(name, 0);
        }
    }

    private _handleWristRoll(lms: NormalizedLandmark[]): void {
        if (!this.selectedJoint || !this.viewer.robot) return;
        const joint = this.viewer.robot.joints[this.selectedJoint];
        if (!joint || joint.jointType === 'fixed') return;

        const angle = Math.atan2(
            lms[5].y - lms[0].y,
            lms[0].x - lms[5].x,
        );

        if (this.prevWristAngle === Infinity) {
            this.prevWristAngle = angle;
            return;
        }

        let delta = angle - this.prevWristAngle;
        if (delta >  Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;
        this.prevWristAngle = angle;

        const continuous  = joint.jointType === 'continuous';
        const ignoreLimits = this.viewer.ignoreLimits;
        const lo = (ignoreLimits || continuous) ? -6.28 : joint.limit.lower;
        const hi = (ignoreLimits || continuous) ?  6.28 : joint.limit.upper;

        const current = joint.angle;
        this.viewer.setJointValue(this.selectedJoint, Math.max(lo, Math.min(hi, current + delta * 1.5)));
    }

    private _handleZoom(hands: NormalizedLandmark[][]): void {
        const w0 = hands[0][0];
        const w1 = hands[1][0];
        const sw = this.canvas.width;
        const sh = this.canvas.height;

        const dist = Math.hypot(
            (1 - w0.x - (1 - w1.x)) * sw,
            (w0.y - w1.y) * sh,
        );

        if (this.prevZoomDist === 0) { this.prevZoomDist = dist; return; }

        const { controls } = this.viewer;
        const ratio = this.prevZoomDist / dist;
        this.targetRadius = Math.max(
            controls.minDistance ?? 0.1,
            Math.min(controls.maxDistance ?? 100, this.targetRadius * ratio),
        );
        this.prevZoomDist = dist;
    }

    private _resetTimers(): void {
        this._resetOneHandTimers();
        this.prevWristAngle     = Infinity;
        this._prevGestureName   = '';
        this._stableGestureName = '';
        this._wristFilterX.reset();
        this._wristFilterY.reset();
        this._clearHover();
        this.onPointerLeave?.();
    }

    private _resetOneHandTimers(): void {
        this._resetDwell();
        this.palmResetStart = 0;
        this.prevHandPos    = null;
        this.prevZoomDist   = 0;
    }

    private _resetDwell(): void {
        this.dwellStart = 0;
        this.dwellMoved = false;
    }

    private _drawHand(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        const sw = this.canvas.width, sh = this.canvas.height;

        ctx.strokeStyle = 'rgba(0,122,255,0.7)';
        ctx.lineWidth = 2;
        for (const [a, b] of HAND_CONNECTIONS) {
            ctx.beginPath();
            ctx.moveTo((1 - lms[a].x) * sw, lms[a].y * sh);
            ctx.lineTo((1 - lms[b].x) * sw, lms[b].y * sh);
            ctx.stroke();
        }

        ctx.fillStyle = '#ffffff';
        for (const lm of lms) {
            ctx.beginPath();
            ctx.arc((1 - lm.x) * sw, lm.y * sh, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    private _drawDwellRing(
        ctx: CanvasRenderingContext2D,
        cx: number, cy: number,
        progress: number,
        isPalm = false,
    ): void {
        const r = isPalm ? 28 : 22;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0,122,255,0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}
