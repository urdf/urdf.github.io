import type { GestureRecognizer, NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { URDFManipulator } from '../src/index.js';
import * as THREE from 'three';

interface GestureControllerOptions {
    viewer: URDFManipulator;
    overlayCanvas: HTMLCanvasElement;
    videoEl: HTMLVideoElement;
    onDwellSelect(clientX: number, clientY: number): void;
    onStop(): void;
}

// Standard MediaPipe hand connections
const HAND_CONNECTIONS: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17],
];

const WASM_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm';

export class GestureController {
    private viewer: URDFManipulator;
    private canvas: HTMLCanvasElement;
    private video: HTMLVideoElement;
    private onDwellSelect: (x: number, y: number) => void;
    private onStop: () => void;

    private recognizer: GestureRecognizer | null = null;
    private stream: MediaStream | null = null;
    private rafId = 0;
    private selectedJoint: string | null = null;
    private running = false;

    // Orbit state
    private prevIndexTip: { x: number; y: number } | null = null;
    private sphTheta = 0;
    private sphPhi = Math.PI / 3;
    private sphRadius = 0;

    // Dwell select state
    private dwellStart = 0;
    private dwellMoved = false;
    private dwellScreenX = 0;
    private dwellScreenY = 0;
    private dwellStartScreenX = 0;
    private dwellStartScreenY = 0;
    private readonly DWELL_MS = 1200;

    // Open-palm reset state
    private palmResetStart = 0;
    private readonly PALM_RESET_MS = 1000;

    // Wrist roll state
    private prevWristAngle = Infinity;

    // Zoom state
    private prevZoomDist = 0;

    constructor(opts: GestureControllerOptions) {
        this.viewer = opts.viewer;
        this.canvas = opts.overlayCanvas;
        this.video = opts.videoEl;
        this.onDwellSelect = opts.onDwellSelect;
        this.onStop = opts.onStop;
    }

    async start(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cdnMjs: any = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { GestureRecognizer, FilesetResolver } = await import(/* @vite-ignore */ cdnMjs) as any;

        const vision = await FilesetResolver.forVisionTasks(WASM_CDN);
        this.recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath:
                    'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
                delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
            minHandDetectionConfidence: 0.6,
            minHandPresenceConfidence: 0.6,
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

        // Capture current spherical coords from camera
        const controls = (this.viewer as unknown as { controls: THREE.EventDispatcher & { target: THREE.Vector3 } }).controls;
        const cam = this.viewer.camera as THREE.PerspectiveCamera;
        if (cam && controls) {
            const sph = new THREE.Spherical().setFromVector3(
                cam.position.clone().sub((controls as unknown as { target: THREE.Vector3 }).target)
            );
            this.sphTheta  = sph.theta;
            this.sphPhi    = sph.phi;
            this.sphRadius = sph.radius;
        }

        // Disable OrbitControls
        const ctrl = (this.viewer as unknown as { controls: { enabled: boolean } }).controls;
        if (ctrl) ctrl.enabled = false;

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

        // Re-enable OrbitControls
        const ctrl = (this.viewer as unknown as { controls: { enabled: boolean } }).controls;
        if (ctrl) ctrl.enabled = true;

        window.removeEventListener('resize', this._onResize);
        this.onStop();
    }

    setSelectedJoint(name: string | null): void {
        if (name !== this.selectedJoint) {
            this.prevWristAngle = Infinity;
        }
        this.selectedJoint = name;
    }

    private _onResize = () => {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    private _loop = () => {
        if (!this.running) return;
        this.rafId = requestAnimationFrame(this._loop);
        if (!this.recognizer || this.video.readyState < 2) return;

        const result = this.recognizer.recognizeForVideo(this.video, performance.now());
        const ctx = this.canvas.getContext('2d')!;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const hands = result.landmarks ?? [];
        const gestures = result.gestures ?? [];

        // Draw all hands
        for (const lms of hands) this._drawHand(ctx, lms);

        if (hands.length === 0) {
            this._resetTimers();
            return;
        }

        if (hands.length >= 2) {
            this._handleZoom(hands);
            this._resetOneHandTimers();
            return;
        }

        // Single hand
        const lms  = hands[0];
        const name = gestures[0]?.[0]?.categoryName ?? '';

        this._handleWristRoll(lms);

        if (name === 'Pointing_Up') {
            this._handleOrbitAndDwell(ctx, lms);
            this.palmResetStart = 0;
        } else if (name === 'Open_Palm') {
            this._handlePalmReset(ctx, lms);
            this._resetDwell();
            this.prevIndexTip = null;
        } else {
            this._resetOneHandTimers();
        }
    };

    private _handleOrbitAndDwell(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        const tipX = 1 - lms[8].x;
        const tipY = lms[8].y;

        const sw = this.canvas.width;
        const sh = this.canvas.height;
        const screenX = tipX * sw;
        const screenY = tipY * sh;

        if (this.prevIndexTip === null) {
            this.prevIndexTip = { x: tipX, y: tipY };
            this.dwellStart = performance.now();
            this.dwellStartScreenX = screenX;
            this.dwellStartScreenY = screenY;
            this.dwellMoved = false;
            this.dwellScreenX = screenX;
            this.dwellScreenY = screenY;
            return;
        }

        const dx = tipX - this.prevIndexTip.x;
        const dy = tipY - this.prevIndexTip.y;
        this.prevIndexTip = { x: tipX, y: tipY };

        // Check for dwell movement
        const movePixels = Math.hypot(screenX - this.dwellStartScreenX, screenY - this.dwellStartScreenY);
        if (movePixels > 30) {
            this.dwellMoved = true;
            this.dwellStart = performance.now();
            this.dwellStartScreenX = screenX;
            this.dwellStartScreenY = screenY;
        }
        this.dwellScreenX = screenX;
        this.dwellScreenY = screenY;

        const moving = Math.abs(dx) >= 0.004 || Math.abs(dy) >= 0.004;
        if (moving) {
            this._orbit(dx, dy);
        }

        // Dwell select
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

    private _orbit(dx: number, dy: number): void {
        const controls = (this.viewer as unknown as { controls: { target: THREE.Vector3; update(): void } }).controls;
        const cam = this.viewer.camera as THREE.PerspectiveCamera;
        if (!cam || !controls) return;

        this.sphTheta -= dx * 4.0;
        this.sphPhi = Math.max(0.05, Math.min(Math.PI - 0.05, this.sphPhi - dy * 4.0));

        const sph = new THREE.Spherical(this.sphRadius, this.sphPhi, this.sphTheta);
        cam.position.setFromSpherical(sph).add(controls.target);
        cam.lookAt(controls.target);
        controls.update();
        this.viewer.redraw();
    }

    private _handlePalmReset(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        if (this.palmResetStart === 0) this.palmResetStart = performance.now();

        const elapsed = performance.now() - this.palmResetStart;
        const progress = Math.min(elapsed / this.PALM_RESET_MS, 1);

        // Palm center: average of fingertips (4, 8, 12, 16, 20)
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
            if (joint.jointType !== 'fixed') {
                this.viewer.setJointValue(name, 0);
            }
        }
    }

    private _handleWristRoll(lms: NormalizedLandmark[]): void {
        if (!this.selectedJoint || !this.viewer.robot) return;
        const joint = this.viewer.robot.joints[this.selectedJoint];
        if (!joint || joint.jointType === 'fixed') return;

        const wx = 1 - lms[0].x;
        const wy = lms[0].y;
        const mx = 1 - lms[5].x;
        const my = lms[5].y;

        const angle = Math.atan2(my - wy, mx - wx);

        if (this.prevWristAngle === Infinity) {
            this.prevWristAngle = angle;
            return;
        }

        let delta = angle - this.prevWristAngle;
        // Wrap delta to ±π
        if (delta > Math.PI)  delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;

        this.prevWristAngle = angle;

        const continuous = joint.jointType === 'continuous';
        const ignoreLimits = this.viewer.ignoreLimits;
        const lo = (ignoreLimits || continuous) ? -6.28 : joint.limit.lower;
        const hi = (ignoreLimits || continuous) ? 6.28 : joint.limit.upper;

        const current = (joint as unknown as { angle: number }).angle ?? 0;
        const newVal = Math.max(lo, Math.min(hi, current + delta * 1.5));
        this.viewer.setJointValue(this.selectedJoint, newVal);
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

        if (this.prevZoomDist === 0) {
            this.prevZoomDist = dist;
            return;
        }

        const controls = (this.viewer as unknown as {
            controls: { target: THREE.Vector3; minDistance: number; maxDistance: number; update(): void };
        }).controls;
        const cam = this.viewer.camera as THREE.PerspectiveCamera;
        if (!cam || !controls) { this.prevZoomDist = dist; return; }

        const ratio = this.prevZoomDist / dist;
        const newDist = Math.max(
            controls.minDistance ?? 0.1,
            Math.min(controls.maxDistance ?? 100, this.sphRadius * ratio),
        );
        this.sphRadius = newDist;

        const sph = new THREE.Spherical(this.sphRadius, this.sphPhi, this.sphTheta);
        cam.position.setFromSpherical(sph).add(controls.target);
        cam.lookAt(controls.target);
        controls.update();
        this.viewer.redraw();

        this.prevZoomDist = dist;
    }

    private _resetTimers(): void {
        this._resetDwell();
        this.palmResetStart = 0;
        this.prevIndexTip = null;
        this.prevWristAngle = Infinity;
        this.prevZoomDist = 0;
    }

    private _resetOneHandTimers(): void {
        this._resetDwell();
        this.palmResetStart = 0;
        this.prevIndexTip = null;
        this.prevZoomDist = 0;
    }

    private _resetDwell(): void {
        this.dwellStart = 0;
        this.dwellMoved = false;
    }

    private _drawHand(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        const sw = this.canvas.width;
        const sh = this.canvas.height;

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
        cx: number,
        cy: number,
        progress: number,
        isPalm = false,
    ): void {
        const r = isPalm ? 28 : 22;

        // Background ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Progress arc
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0,122,255,0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}
