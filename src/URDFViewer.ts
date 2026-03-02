import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { URDFLoader, PackageMap } from './URDFLoader.js';
import { URDFRobot, URDFVisual, URDFCollider } from './URDFClasses.js';

// ─── URDFViewer ───────────────────────────────────────────────────────────────
//
// Custom element that loads and displays a URDF robot model.
//
// Attributes
//   urdf            – URL of the URDF file
//   package         – package path / map string (see URDFLoader)
//   up              – up axis, e.g. "+Z" (default) or "-Y"
//   ignore-limits   – boolean; when present, joint limits are ignored
//   show-collision  – boolean; shows collision geometry
//   display-shadow  – boolean; enables shadow casting
//   ambient-color   – hex color for ambient light (default "#8ea0a8")
//
// Events
//   urdf-change      – fired when a new URDF starts loading
//   urdf-processed   – fired when the robot model is fully loaded
//   angle-change     – fired (detail = jointName) when a joint value changes

const STYLE = `
:host {
    display: block;
    background: linear-gradient(160deg, #0f1117 0%, #1a1f2e 100%);
}
canvas { width: 100%; height: 100%; display: block; }
`;

const EMPTY_RAYCAST = () => {};
const _ZERO_VEC = new THREE.Vector3();

// Dispose a material and all textures it references.
// mat.dispose() alone only frees the shader program — texture GPU units are separate.
// For GLB/ImageBitmap-sourced textures, the CPU-side bitmap must also be closed first
// (Three.js intentionally does not do this automatically — see github.com/mrdoob/three.js/issues/23953).
function disposeMat(mat: THREE.Material): void {
    for (const value of Object.values(mat)) {
        if (value instanceof THREE.Texture) {
            if (value.source?.data instanceof ImageBitmap) value.source.data.close();
            value.dispose();
        }
    }
    mat.dispose();
}

const _reduceMotionMQ = window.matchMedia?.('(prefers-reduced-motion: reduce)');
// Fixed scene-space slide axis — matches the default fitCamera() view direction
// so robots always enter from screen-right and exit screen-left, regardless of
// where the user has orbited the camera.
const _SLIDE_RIGHT = new THREE.Vector3(1, 0, 1).normalize();
const _SLIDE_LEFT  = new THREE.Vector3(-1, 0, -1).normalize();

export class URDFViewer extends HTMLElement {

    static get observedAttributes() {
        return ['urdf', 'package', 'up', 'ignore-limits', 'show-collision', 'display-shadow', 'ambient-color'];
    }

    // ── Attributes ────────────────────────────────────────────────────────

    get urdf(): string { return this.getAttribute('urdf') ?? ''; }
    set urdf(v: string) { this.setAttribute('urdf', v); }

    get package(): string { return this.getAttribute('package') ?? ''; }
    set package(v: string) { this.setAttribute('package', v); }

    get up(): string { return this.getAttribute('up') ?? '+Z'; }
    set up(v: string) { this.setAttribute('up', v); }

    get ignoreLimits(): boolean { return this.hasAttribute('ignore-limits'); }
    set ignoreLimits(v: boolean) { v ? this.setAttribute('ignore-limits', '') : this.removeAttribute('ignore-limits'); }

    get showCollision(): boolean { return this.hasAttribute('show-collision'); }
    set showCollision(v: boolean) { v ? this.setAttribute('show-collision', '') : this.removeAttribute('show-collision'); }

    get displayShadow(): boolean { return this.hasAttribute('display-shadow'); }
    set displayShadow(v: boolean) { v ? this.setAttribute('display-shadow', '') : this.removeAttribute('display-shadow'); }

    get ambientColor(): string { return this.getAttribute('ambient-color') ?? '#8ea0a8'; }
    set ambientColor(v: string) { this.setAttribute('ambient-color', v); }

    // ── Public state ──────────────────────────────────────────────────────

    robot: URDFRobot | null = null;

    /** Override to provide a custom mesh loader (same signature as URDFLoader.loadMesh). */
    loadMesh: URDFLoader['loadMesh'] | null = null;

    // ── Three.js objects ──────────────────────────────────────────────────

    readonly scene: THREE.Scene;
    readonly camera: THREE.PerspectiveCamera;
    readonly renderer: THREE.WebGLRenderer;
    readonly controls: OrbitControls;
    readonly world: THREE.Object3D;
    readonly ambientLight: THREE.HemisphereLight;
    readonly directionalLight: THREE.DirectionalLight;
    readonly shadowPlane: THREE.Mesh;

    private _collisionMaterial: THREE.MeshPhongMaterial;
    private _rafId = 0;
    private _dirty = false;
    private _loadId = 0;
    private _introAnim: { start: THREE.Vector3; t0: number; dur: number } | null = null;
    private _outgoing: { obj: THREE.Object3D; from: THREE.Vector3; to: THREE.Vector3; t0: number; dur: number } | null = null;
    private _exitRotation = new THREE.Euler(); // world.rotation saved when robot finishes loading
    private _resizeObserver: ResizeObserver;
    private _shadow: ShadowRoot;

    // Reusable scratch objects – avoids per-frame allocations in _updateScene / fitCamera
    private _bbox = new THREE.Box3();
    private _center = new THREE.Vector3();
    private _sphere = new THREE.Sphere();
    private _lightOffset = new THREE.Vector3();

    constructor() {
        super();

        this._shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = STYLE;
        this._shadow.appendChild(style);

        // Scene
        this.scene = new THREE.Scene();

        this.ambientLight = new THREE.HemisphereLight('#8ea0a8', '#000', 0.5);
        this.ambientLight.groundColor.lerp(this.ambientLight.color, 0.5 * Math.PI);
        this.ambientLight.position.set(0, 1, 0);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, Math.PI);
        this.directionalLight.position.set(4, 10, 1);
        // Use a smaller shadow map on touch devices to save GPU memory
        const shadowMapSize = navigator.maxTouchPoints > 0 ? 1024 : 2048;
        this.directionalLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
        this.directionalLight.shadow.normalBias = 0.001;
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight, this.directionalLight.target);

        this.world = new THREE.Object3D();
        this.scene.add(this.world);

        this.shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(400, 400),
            new THREE.ShadowMaterial({ transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
        );
        this.shadowPlane.rotation.x = -Math.PI / 2;
        this.shadowPlane.receiveShadow = true;
        this.shadowPlane.raycast = () => {};  // purely visual — never block pointer events
        this.scene.add(this.shadowPlane);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearAlpha(0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.camera.position.set(-5.5, 3.5, 5.5);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 2;
        this.controls.zoomSpeed = 5;
        this.controls.panSpeed = 2;
        this.controls.maxDistance = 50;
        this.controls.minDistance = 0.25;
        this.controls.addEventListener('change', () => this.redraw());
        // Disable inertia/damping for users who have requested reduced motion (vestibular disorders)
        this.controls.enableDamping = !_reduceMotionMQ?.matches;
        _reduceMotionMQ?.addEventListener('change', e => {
            this.controls.enableDamping = !e.matches;
        });

        this._collisionMaterial = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 0.35,
            color: 0xffbe38,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1,
        });

        this._resizeObserver = new ResizeObserver(() => this._onResize());

        this._applyUp(this.up);
        this._startRenderLoop();
    }

    // ── Lifecycle ─────────────────────────────────────────────────────────

    connectedCallback() {
        this._shadow.appendChild(this.renderer.domElement);
        this._resizeObserver.observe(this);
        this._onResize();
    }

    disconnectedCallback() {
        cancelAnimationFrame(this._rafId);
        this._resizeObserver.disconnect();
    }

    attributeChangedCallback(attr: string, _old: string | null, _new: string | null) {
        switch (attr) {
            case 'urdf':
            case 'package':
                this._scheduleLoad();
                break;
            case 'up':
                this._applyUp(this.up);
                this.redraw();
                break;
            case 'ambient-color':
                this.ambientLight.color.set(this.ambientColor);
                this.ambientLight.groundColor.set('#000').lerp(this.ambientLight.color, 0.5);
                this.redraw();
                break;
            case 'ignore-limits':
                this._applyIgnoreLimits(this.ignoreLimits);
                break;
            case 'show-collision':
                this._updateCollision();
                this.redraw();
                break;
            case 'display-shadow':
                this.redraw();
                break;
        }
    }

    // ── Public API ────────────────────────────────────────────────────────

    /** Repositions the camera to frame the loaded robot. */
    fitCamera(): void {
        if (!this.robot) return;

        this.world.updateMatrixWorld();

        this._bbox.makeEmpty();
        this.robot.traverse(c => {
            if ((c as URDFVisual).isURDFVisual) this._bbox.expandByObject(c);
        });

        if (this._bbox.isEmpty()) return;

        this._bbox.getBoundingSphere(this._sphere);
        const fovRad = (this.camera.fov * Math.PI) / 180;
        const distance = (this._sphere.radius / Math.sin(fovRad / 2)) * 1.2;

        const dir = new THREE.Vector3(-1, 0.7, 1).normalize();
        this.camera.position.copy(this._sphere.center).addScaledVector(dir, distance);
        this.controls.target.copy(this._sphere.center);
        this.controls.maxDistance = distance * 5;
        this.controls.minDistance = this._sphere.radius * 0.1;
        this.controls.update();
        this.redraw();
    }

    redraw(): void {
        this._dirty = true;
    }

    setJointValue(name: string, ...values: number[]): void {
        if (!this.robot) return;
        if (this.robot.setJointValue(name, ...values)) {
            this.redraw();
            this.dispatchEvent(new CustomEvent('angle-change', { bubbles: true, detail: name }));
        }
    }

    setJointValues(values: Record<string, number | number[]>): void {
        for (const [name, v] of Object.entries(values)) {
            if (Array.isArray(v)) this.setJointValue(name, ...v);
            else this.setJointValue(name, v);
        }
    }

    // ── Private ───────────────────────────────────────────────────────────

    private _startRenderLoop(): void {
        const loop = () => {
            this._rafId = requestAnimationFrame(loop);

            const intro = this._introAnim;
            if (intro) {
                const t = Math.min((performance.now() - intro.t0) / intro.dur, 1);
                const ease = 1 - Math.pow(1 - t, 4); // quartic ease-out
                this.world.position.lerpVectors(intro.start, _ZERO_VEC, ease);
                this._dirty = true;
                if (t >= 1) {
                    this._introAnim = null;
                    this.world.position.setScalar(0);
                }
            }

            const out = this._outgoing;
            if (out) {
                const t = Math.min((performance.now() - out.t0) / out.dur, 1);
                const ease = t * t * t; // cubic ease-in — accelerates away
                out.obj.position.lerpVectors(out.from, out.to, ease);
                this._dirty = true;
                if (t >= 1) {
                    this.scene.remove(out.obj);
                    out.obj.traverse(c => {
                        const mesh = c as THREE.Mesh;
                        if (!mesh.geometry?.userData.shared) mesh.geometry?.dispose();
                        if (Array.isArray(mesh.material)) mesh.material.forEach(disposeMat);
                        else if (mesh.material) disposeMat(mesh.material);
                    });
                    this._outgoing = null;
                }
            }

            this.controls.update();
            if (this._dirty) {
                this._updateScene();
                this.renderer.render(this.scene, this.camera);
                this._dirty = false;
            }
        };
        loop();
    }

    private _onResize(): void {
        const w = this.clientWidth || 300;
        const h = this.clientHeight || 150;
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(w, h, false);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.redraw();
    }

    private _scheduleLoad(): void {
        const key = `${this.package}|${this.urdf}`;
        if ((this as unknown as { _lastKey?: string })._lastKey === key) return;
        (this as unknown as { _lastKey?: string })._lastKey = key;

        this._introAnim = null;
        this._startExit(); // slide current robot out before disposing
        this._disposeRobot(); // no-op if _startExit transferred the robot
        this.world.position.setScalar(0);
        this.world.visible = false;
        this.dispatchEvent(new CustomEvent('urdf-change', { bubbles: true }));

        if (!this.urdf) return;

        const id = ++this._loadId;
        const reveal = () => { if (id === this._loadId) this.world.visible = true; };

        const loader = new URDFLoader();
        loader.packages = this._resolvePackages(this.package);
        loader.parseCollision = true;
        const baseMeshLoader = (this.loadMesh ?? loader.loadMesh).bind(loader);
        let meshManagerHooked = false;
        loader.loadMesh = (path, mgr) => {
            if (!meshManagerHooked) {
                meshManagerHooked = true;
                mgr.onLoad = () => { if (id === this._loadId) { this.fitCamera(); this._exitRotation.copy(this.world.rotation); this._startIntro(); reveal(); } };
            }
            return baseMeshLoader(path, mgr).then(obj => { this.redraw(); return obj; });
        };

        loader.load(this.urdf).then(robot => {
            if (id !== this._loadId) {
                // Superseded by a newer load request
                robot.traverse(c => (c as THREE.Mesh).geometry?.dispose());
                return;
            }

            this.robot = robot;
            this.world.add(robot);
            this._prepareMeshes(robot);
            this._applyIgnoreLimits(this.ignoreLimits);
            this._updateCollision();
            // Only fit + reveal here when there are no mesh files; otherwise
            // mgr.onLoad handles both after all meshes have loaded.
            if (!meshManagerHooked) {
                this.fitCamera();
                this._exitRotation.copy(this.world.rotation);
                this._startIntro();
                reveal();
            }

            this.dispatchEvent(new CustomEvent('urdf-processed', { bubbles: true }));
        }).catch(err => {
            console.error('URDFViewer: load error', err);
            if (id === this._loadId) {
                reveal();
                this.dispatchEvent(new CustomEvent('urdf-error', {
                    bubbles: true,
                    detail: String((err as Error).message ?? err),
                }));
            }
        });
    }

    // Slides the world in from screen-right after fitCamera() has been called.
    private _startIntro(): void {
        this.world.visible = true;
        if (_reduceMotionMQ?.matches) {
            this.world.position.setScalar(0);
            return;
        }
        const start = _SLIDE_RIGHT.clone().multiplyScalar(this._sphere.radius * 5);
        this.world.position.copy(start);
        this._introAnim = { start, t0: performance.now(), dur: 450 };
    }

    // Slides the current robot out to screen-left, then disposes it.
    private _startExit(): void {
        if (!this.robot || this._sphere.radius === 0) return;

        // Rapid switching: drop any still-animating outgoing before starting a new one,
        // otherwise the orphaned scene object is never removed.
        if (this._outgoing) {
            this.scene.remove(this._outgoing.obj);
            this._outgoing.obj.traverse(c => {
                const mesh = c as THREE.Mesh;
                if (!mesh.geometry?.userData.shared) mesh.geometry?.dispose();
                if (Array.isArray(mesh.material)) mesh.material.forEach(disposeMat);
                else if (mesh.material) disposeMat(mesh.material);
            });
            this._outgoing = null;
        }

        if (_reduceMotionMQ?.matches) {
            this._disposeRobot();
            return;
        }

        const to = _SLIDE_LEFT.clone().multiplyScalar(this._sphere.radius * 5);

        const outgoing = new THREE.Object3D();
        outgoing.rotation.copy(this._exitRotation); // rotation saved at load time, not current world.rotation
        outgoing.position.copy(this.world.position); // preserve mid-intro offset if any
        this.world.remove(this.robot);
        outgoing.add(this.robot);
        this.robot = null;
        this.scene.add(outgoing);

        this._outgoing = { obj: outgoing, from: outgoing.position.clone(), to, t0: performance.now(), dur: 350 };
    }

    private _disposeRobot(): void {
        if (!this.robot) return;
        this.robot.traverse(c => {
            const mesh = c as THREE.Mesh;
            if (!mesh.geometry?.userData.shared) mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) mesh.material.forEach(disposeMat);
            else if (mesh.material) disposeMat(mesh.material);
        });
        this.robot.parent?.remove(this.robot);
        this.robot = null;
    }

    private _prepareMeshes(root: THREE.Object3D): void {
        root.traverse(c => {
            const mesh = c as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // STL files store per-face normals, causing visible shading seams on flat
            // surfaces rendered with transparency. Recompute vertex normals to smooth them.
            if (mesh.geometry && !mesh.geometry.userData.shared) {
                mesh.geometry = mergeVertices(mesh.geometry);
                mesh.geometry.computeVertexNormals();
            }
            if (mesh.material) {
                const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                for (const m of mats) {
                    if (m instanceof THREE.MeshBasicMaterial) {
                        // Upgrade to Phong so it reacts to lights; dispose the original shader
                        const phong = new THREE.MeshPhongMaterial();
                        phong.copy(m as unknown as THREE.MeshPhongMaterial);
                        mesh.material = phong;
                        m.dispose();
                    }
                    if ((m as THREE.MeshStandardMaterial).map) {
                        (m as THREE.MeshStandardMaterial).map!.colorSpace = THREE.SRGBColorSpace;
                    }
                }
            }
        });
    }

    private _updateScene(): void {
        const robot = this.robot;
        if (!robot) return;

        this.world.updateMatrixWorld();

        this._bbox.makeEmpty();
        robot.traverse(c => {
            if ((c as URDFVisual).isURDFVisual) this._bbox.expandByObject(c);
        });

        if (!this._bbox.isEmpty()) {
            this._bbox.getCenter(this._center);
            this.controls.target.y = this._center.y;
            this.shadowPlane.position.y = this._bbox.min.y - 1e-3;

            const dirLight = this.directionalLight;
            dirLight.castShadow = this.displayShadow;
            if (this.displayShadow) {
                this._bbox.getBoundingSphere(this._sphere);
                const r = this._sphere.radius;
                const cam = dirLight.shadow.camera;
                cam.left = cam.bottom = -r;
                cam.right = cam.top = r;
                this._lightOffset.copy(dirLight.position).sub(dirLight.target.position);
                dirLight.target.position.copy(this._center);
                dirLight.position.copy(this._center).add(this._lightOffset);
                cam.updateProjectionMatrix();
            }
        }
    }

    private _applyUp(up: string): void {
        const sign = (up.includes('-') ? -1 : 1);
        const axis = up.replace(/[^XYZxyz]/g, '')[0]?.toUpperCase() ?? 'Z';
        const PI = Math.PI;
        const H = PI / 2;
        if (axis === 'X') this.world.rotation.set(0, 0, sign > 0 ? H : -H);
        else if (axis === 'Z') this.world.rotation.set(sign > 0 ? -H : H, 0, 0);
        else this.world.rotation.set(sign > 0 ? 0 : PI, 0, 0);
    }

    private _applyIgnoreLimits(ignore: boolean): void {
        if (!this.robot) return;
        for (const joint of Object.values(this.robot.joints)) {
            joint.ignoreLimits = ignore;
            joint.setJointValue(...joint.jointValue);
        }
        this.dispatchEvent(new CustomEvent('ignore-limits-change', { bubbles: true }));
        this.redraw();
    }

    private _updateCollision(): void {
        const robot = this.robot;
        if (!robot) return;
        const show = this.showCollision;
        const mat = this._collisionMaterial;

        robot.traverse(c => {
            const col = c as URDFCollider;
            if (!col.isURDFCollider) return;
            col.visible = show;
            col.traverse(m => {
                const mesh = m as THREE.Mesh;
                if (mesh.isMesh) {
                    if (mesh.raycast !== EMPTY_RAYCAST) mesh.raycast = EMPTY_RAYCAST;
                    mesh.material = mat;
                    mesh.castShadow = false;
                }
            });
        });
    }

    private _resolvePackages(pkg: string): PackageMap {
        // Detect "name: path, name2: path2" format (colon not immediately preceded by "//")
        if (pkg.includes(':') && !pkg.trim().startsWith('http')) {
            return pkg.split(',').reduce<Record<string, string>>((map, entry) => {
                const [name, ...rest] = entry.split(':');
                if (name && rest.length) map[name.trim()] = rest.join(':').trim();
                return map;
            }, {});
        }
        return pkg;
    }
}
