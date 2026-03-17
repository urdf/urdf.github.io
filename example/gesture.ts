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
    onThumbsUp?(): void;
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

const ORBIT_DAMPING = 0.14; // lerp factor per frame — lower = smoother, higher = more responsive

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
    private onThumbsUp: (() => void) | undefined;
    private onStop: () => void;

    // ── MediaPipe / lifecycle ─────────────────────────────────────────────
    private recognizer: GestureRecognizer | null = null;
    private stream: MediaStream | null = null;
    private rafId = 0;
    private running = false;
    private _lastVideoTime = -1;

    // ── Camera orbit (spherical coords; lerped toward target) ─────────────
    private sphTheta = 0;
    private sphPhi = Math.PI / 3;
    private sphRadius = 0;
    private targetTheta = 0;
    private targetPhi = Math.PI / 3;
    private targetRadius = 0;

    // ── Signal filtering ──────────────────────────────────────────────────
    private _wristFilterX = new OneEuroFilter(1.0, 0.007);
    private _wristFilterY = new OneEuroFilter(1.0, 0.007);
    private prevHandPos: { x: number; y: number } | null = null;

    // ── Dwell selection ───────────────────────────────────────────────────
    private dwellStart = 0;
    private dwellMoved = false;
    private dwellScreenX = 0;
    private dwellScreenY = 0;
    private dwellStartScreenX = 0;
    private dwellStartScreenY = 0;
    private readonly DWELL_MS = 800;

    // ── Palm reset ────────────────────────────────────────────────────────
    private palmResetStart = 0;
    private readonly PALM_RESET_MS = 1000;

    // ── Joint / parameter control ─────────────────────────────────────────
    private selectedJoint: string | null = null;
    private prevWristAngle = Infinity;
    private _paramCallback: ((deltaRad: number) => void) | null = null;

    // ── Two-hand zoom ─────────────────────────────────────────────────────
    private prevZoomDist = 0;

    // ── Gesture recognition state ─────────────────────────────────────────
    private _prevGestureName = '';
    private _stableGestureName = '';
    private _thumbsUpFired = false;

    // ── Mirror mode ───────────────────────────────────────────────────────
    private _mirrorCallback: ((joints: Record<string, number>) => void) | null = null;
    private _mirrorFilters = new Map<string, OneEuroFilter>();

    // ── Raycasting / drag integration ─────────────────────────────────────
    private _raycaster = new THREE.Raycaster();
    private _overRobot = false;
    private _dragCtrl: { enabled: boolean; raycaster: THREE.Raycaster; update(): void } | null = null;

    private _cssBlue = '';
    private _cssText1 = '';

    constructor(opts: GestureControllerOptions) {
        this.viewer = opts.viewer;
        this.canvas = opts.overlayCanvas;
        this.video = opts.videoEl;
        this.onDwellSelect = opts.onDwellSelect;
        this.onPointerMove = opts.onPointerMove;
        this.onPointerLeave = opts.onPointerLeave;
        this.onThumbsUp = opts.onThumbsUp;
        this.onStop = opts.onStop;
        // Cache design tokens once — Canvas 2D cannot reference CSS custom properties directly
        const style = getComputedStyle(document.documentElement);
        this._cssBlue  = style.getPropertyValue('--blue').trim()  || 'hsl(220,100%,65%)';
        this._cssText1 = style.getPropertyValue('--text-1').trim() || '#fff';
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
            video: { width: 1280, height: 720, facingMode: 'user' },
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

        const dc = this.viewer.dragControls;
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
        this._paramCallback = null;
    }

    setMirrorMode(cb: ((joints: Record<string, number>) => void) | null): void {
        this._mirrorCallback = cb;
        if (!cb) this._mirrorFilters.forEach(f => f.reset());
    }

    setParamCallback(cb: ((deltaRad: number) => void) | null): void {
        this._paramCallback = cb;
        if (cb) {
            this.selectedJoint = null;
            this.prevWristAngle = Infinity;
        }
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
            } else if (this._mirrorCallback) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const worldLms: { x: number; y: number; z: number }[] = (result as any).worldLandmarks?.[0] ?? [];
                if (worldLms.length >= 21) {
                    const pose = this._computeHandPose(worldLms);
                    const t = performance.now();
                    const filtered: Record<string, number> = {};
                    for (const [name, val] of Object.entries(pose)) {
                        if (!this._mirrorFilters.has(name)) {
                            this._mirrorFilters.set(name, new OneEuroFilter(2.0, 0.05));
                        }
                        filtered[name] = this._mirrorFilters.get(name)!.filter(val, t);
                    }
                    this._mirrorCallback(filtered);
                }
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

                if (name === 'Thumb_Up') {
                    if (!this._thumbsUpFired) {
                        this._thumbsUpFired = true;
                        this.onThumbsUp?.();
                    }
                    this._resetDwell();
                    this._clearHover();
                    this.prevHandPos = null;
                    this.palmResetStart = 0;
                } else {
                    this._thumbsUpFired = false;
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

        this.sphTheta  += (this.targetTheta  - this.sphTheta)  * ORBIT_DAMPING;
        this.sphPhi    += (this.targetPhi    - this.sphPhi)    * ORBIT_DAMPING;
        this.sphRadius += (this.targetRadius - this.sphRadius) * ORBIT_DAMPING;

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
    // Ratios chosen empirically: 1.2 requires index tip to extend 20% beyond
    // wrist-to-MCP distance; 1.15 confirms remaining fingers are curled inward.
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
        ctx.strokeStyle = overTarget ? this._cssBlue : `color-mix(in srgb, ${this._cssText1} 30%, transparent)`;
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
        if (!this.selectedJoint && !this._paramCallback) return;

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

        if (this._paramCallback) {
            this._paramCallback(delta);
            return;
        }

        if (!this.viewer.robot) return;
        const joint = this.viewer.robot.joints[this.selectedJoint!];
        if (!joint || joint.jointType === 'fixed') return;

        const continuous   = joint.jointType === 'continuous';
        const ignoreLimits = this.viewer.ignoreLimits;
        const lo = (ignoreLimits || continuous) ? -6.28 : joint.limit.lower;
        const hi = (ignoreLimits || continuous) ?  6.28 : joint.limit.upper;

        const current = joint.angle;
        this.viewer.setJointValue(this.selectedJoint!, Math.max(lo, Math.min(hi, current + delta * 1.5)));
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
        this._mirrorFilters.forEach(f => f.reset());
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

    // Compute per-joint curl angles from MediaPipe world landmarks.
    // Returns ORCA Hand right-hand joint names → angle in radians (0 = straight).
    // curl(a,b,c) = π − angle-at-b, so 0 = straight and ~π/2 = fully bent.
    // setJointValue clamps to limits; unknown joint names on other robots are silently ignored.
    private _computeHandPose(lms: { x: number; y: number; z: number }[]): Record<string, number> {
        const curl = (
            a: { x: number; y: number; z: number },
            b: { x: number; y: number; z: number },
            c: { x: number; y: number; z: number },
        ): number => {
            const v1x = a.x - b.x, v1y = a.y - b.y, v1z = a.z - b.z;
            const v2x = c.x - b.x, v2y = c.y - b.y, v2z = c.z - b.z;
            const dot = v1x * v2x + v1y * v2y + v1z * v2z;
            const m = Math.sqrt((v1x ** 2 + v1y ** 2 + v1z ** 2) * (v2x ** 2 + v2y ** 2 + v2z ** 2));
            if (m < 1e-10) return 0;
            return Math.PI - Math.acos(Math.max(-1, Math.min(1, dot / m)));
        };

        // MediaPipe landmark indices:
        //   Thumb:  1=CMC  2=MCP  3=IP   4=tip
        //   Index:  5=MCP  6=PIP  7=DIP  8=tip
        //   Middle: 9=MCP 10=PIP 11=DIP 12=tip
        //   Ring:  13=MCP 14=PIP 15=DIP 16=tip
        //   Pinky: 17=MCP 18=PIP 19=DIP 20=tip
        const thumbIp = curl(lms[2], lms[3], lms[4]);
        return {
            right_index_mcp:  curl(lms[0], lms[5],  lms[6]),
            right_index_pip:  curl(lms[5], lms[6],  lms[7]),
            right_middle_mcp: curl(lms[0], lms[9],  lms[10]),
            right_middle_pip: curl(lms[9], lms[10], lms[11]),
            right_ring_mcp:   curl(lms[0], lms[13], lms[14]),
            right_ring_pip:   curl(lms[13], lms[14], lms[15]),
            right_pinky_mcp:  curl(lms[0], lms[17], lms[18]),
            right_pinky_pip:  curl(lms[17], lms[18], lms[19]),
            right_thumb_mcp:  curl(lms[1], lms[2],  lms[3]),
            right_thumb_pip:  thumbIp,
            right_thumb_dip:  thumbIp * 0.7, // no 4th landmark — approximate from IP flex
        };
    }

    private _drawHand(ctx: CanvasRenderingContext2D, lms: NormalizedLandmark[]): void {
        const sw = this.canvas.width, sh = this.canvas.height;

        ctx.strokeStyle = `color-mix(in srgb, ${this._cssBlue} 70%, transparent)`;
        ctx.lineWidth = 2;
        for (const [a, b] of HAND_CONNECTIONS) {
            ctx.beginPath();
            ctx.moveTo((1 - lms[a].x) * sw, lms[a].y * sh);
            ctx.lineTo((1 - lms[b].x) * sw, lms[b].y * sh);
            ctx.stroke();
        }

        ctx.fillStyle = this._cssText1;
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
        ctx.strokeStyle = `color-mix(in srgb, ${this._cssText1} 20%, transparent)`;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * 2 * Math.PI);
        ctx.strokeStyle = `color-mix(in srgb, ${this._cssBlue} 90%, transparent)`;
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}
