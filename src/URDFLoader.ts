import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import {
    URDFCollider,
    URDFJoint,
    URDFLink,
    URDFMimicJoint,
    URDFRobot,
    URDFVisual,
} from './URDFClasses.js';

export type PackageMap = string | Record<string, string> | ((pkg: string) => string);

export interface LoaderOptions {
    packages?: PackageMap;
    workingPath?: string;
    parseVisual?: boolean;
    parseCollision?: boolean;
    fetchOptions?: RequestInit;
    loadMesh?: (path: string, manager: THREE.LoadingManager) => Promise<THREE.Object3D | null>;
}

// Shared unit geometries. Sized via mesh.scale; marked so _disposeRobot skips them.
const _sharedBoxGeom = new THREE.BoxGeometry(1, 1, 1);
_sharedBoxGeom.userData.shared = true;

const _sharedSphereGeom = new THREE.SphereGeometry(1, 32, 32);
_sharedSphereGeom.userData.shared = true;

const _sharedCylinderGeom = new THREE.CylinderGeometry(1, 1, 1, 32);
_sharedCylinderGeom.userData.shared = true;

const _tempQuat = new THREE.Quaternion();
const _tempEuler = new THREE.Euler();

function parseTuple(val: string | null): [number, number, number] {
    if (!val) return [0, 0, 0];
    const parts = val.trim().split(/\s+/).map(Number);
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

function applyRPY(obj: THREE.Object3D, rpy: [number, number, number]): void {
    _tempEuler.set(rpy[0], rpy[1], rpy[2], 'ZYX');
    _tempQuat.setFromEuler(_tempEuler).premultiply(obj.quaternion);
    obj.quaternion.copy(_tempQuat);
}

export class URDFLoader {
    packages: PackageMap = '';
    workingPath = '';
    parseVisual = true;
    parseCollision = false;
    fetchOptions: RequestInit = {};
    loadMesh: (path: string, manager: THREE.LoadingManager) => Promise<THREE.Object3D | null>;

    constructor() {
        this.loadMesh = URDFLoader.defaultMeshLoader;
    }

    async load(url: string, options?: LoaderOptions): Promise<URDFRobot> {
        const opts = { ...options };
        const workingPath = opts.workingPath ?? THREE.LoaderUtils.extractUrlBase(url);
        const fetchOptions = opts.fetchOptions ?? this.fetchOptions;

        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
            throw new Error(`URDFLoader: failed to fetch "${url}" (${res.status} ${res.statusText})`);
        }
        const xml = await res.text();
        return this.parse(xml, { ...opts, workingPath });
    }

    parse(content: string | Document | Element, options?: LoaderOptions): URDFRobot {
        const packages = options?.packages ?? this.packages;
        const workingPath = options?.workingPath ?? this.workingPath;
        const parseVisual = options?.parseVisual ?? this.parseVisual;
        const parseCollision = options?.parseCollision ?? this.parseCollision;
        const loadMesh = options?.loadMesh ?? this.loadMesh;
        const manager = new THREE.LoadingManager();

        const resolvePath = makeResolver(packages, workingPath);

        const materialMap: Record<string, THREE.Material> = {};
        const linkMap: Record<string, URDFLink> = {};
        const jointMap: Record<string, URDFJoint> = {};

        let robotEl: Element;
        if (content instanceof Document) {
            robotEl = content.querySelector('robot')!;
        } else if (content instanceof Element) {
            robotEl = content;
        } else {
            const doc = new DOMParser().parseFromString(content, 'text/xml');
            robotEl = doc.querySelector('robot')!;
        }

        if (!robotEl) throw new Error('URDFLoader: no <robot> element found');

        for (const m of robotEl.querySelectorAll(':scope > material')) {
            const name = m.getAttribute('name') ?? '';
            materialMap[name] = parseMaterial(m);
        }

        const visualMap: Record<string, URDFVisual> = {};
        const colliderMap: Record<string, URDFCollider> = {};

        for (const linkEl of robotEl.querySelectorAll(':scope > link')) {
            const name = linkEl.getAttribute('name') ?? '';
            const isRoot = !robotEl.querySelector(`child[link="${name}"]`);
            linkMap[name] = parseLink(linkEl, isRoot ? new URDFRobot() : new URDFLink());
        }

        for (const jointEl of robotEl.querySelectorAll(':scope > joint')) {
            const name = jointEl.getAttribute('name') ?? '';
            jointMap[name] = parseJoint(jointEl);
        }

        const robot = Object.values(linkMap).find(l => l instanceof URDFRobot) as URDFRobot;
        robot.robotName = robotEl.getAttribute('name') ?? '';
        robot.urdfRobotNode = robotEl;
        robot.joints = jointMap;
        robot.links = linkMap;
        robot.colliders = colliderMap;
        robot.visual = visualMap;

        for (const joint of Object.values(jointMap)) {
            if (joint instanceof URDFMimicJoint) {
                jointMap[joint.mimicJoint]?.mimicJoints.push(joint);
            }
        }

        detectMimicLoop(Object.values(jointMap));

        robot.frames = { ...colliderMap, ...visualMap, ...linkMap, ...jointMap };

        return robot;

        // ── Nested helpers — all share closure over linkMap, jointMap, materialMap ──

        function parseLink(el: Element, target: URDFLink): URDFLink {
            target.name = el.getAttribute('name') ?? '';
            target.urdfName = target.name;
            target.urdfNode = el;

            if (parseVisual) {
                for (const vn of el.querySelectorAll(':scope > visual')) {
                    const v = parseLinkElement(vn, false);
                    target.add(v);
                    const vName = vn.getAttribute('name');
                    if (vName) {
                        v.name = vName;
                        v.urdfName = vName;
                        visualMap[vName] = v as URDFVisual;
                    }
                }
            }

            if (parseCollision) {
                for (const cn of el.querySelectorAll(':scope > collision')) {
                    const c = parseLinkElement(cn, true);
                    target.add(c);
                    const cName = cn.getAttribute('name');
                    if (cName) {
                        c.name = cName;
                        c.urdfName = cName;
                        colliderMap[cName] = c as URDFCollider;
                    }
                }
            }

            return target;
        }

        function parseJoint(el: Element): URDFJoint {
            const mimicEl = el.querySelector(':scope > mimic');
            const joint = mimicEl ? new URDFMimicJoint() : new URDFJoint();

            if (joint instanceof URDFMimicJoint) {
                joint.mimicJoint = mimicEl!.getAttribute('joint') ?? '';
                joint.multiplier = parseFloat(mimicEl!.getAttribute('multiplier') ?? '1');
                joint.offset = parseFloat(mimicEl!.getAttribute('offset') ?? '0');
            }

            joint.urdfNode = el;
            joint.name = el.getAttribute('name') ?? '';
            joint.urdfName = joint.name;
            joint.jointType = (el.getAttribute('type') ?? 'fixed') as URDFJoint['jointType'];

            let parentLink: URDFLink | null = null;
            let childLink: URDFLink | null = null;
            let xyz: [number, number, number] = [0, 0, 0];
            let rpy: [number, number, number] = [0, 0, 0];

            for (const n of el.children) {
                switch (n.nodeName.toLowerCase()) {
                    case 'origin':
                        xyz = parseTuple(n.getAttribute('xyz'));
                        rpy = parseTuple(n.getAttribute('rpy'));
                        break;
                    case 'parent':
                        parentLink = linkMap[n.getAttribute('link') ?? ''] ?? null;
                        break;
                    case 'child':
                        childLink = linkMap[n.getAttribute('link') ?? ''] ?? null;
                        break;
                    case 'limit':
                        joint.limit.lower = parseFloat(n.getAttribute('lower') ?? String(joint.limit.lower));
                        joint.limit.upper = parseFloat(n.getAttribute('upper') ?? String(joint.limit.upper));
                        break;
                    case 'axis': {
                        const [ax, ay, az] = parseTuple(n.getAttribute('xyz'));
                        joint.axis.set(ax, ay, az).normalize();
                        break;
                    }
                }
            }

            if (!parentLink || !childLink) {
                throw new Error(`URDFLoader: joint "${joint.name}" missing parent or child link`);
            }

            parentLink.add(joint);
            joint.add(childLink);
            joint.rotation.set(0, 0, 0);
            applyRPY(joint, rpy);
            joint.position.set(xyz[0], xyz[1], xyz[2]);

            return joint;
        }

        function parseLinkElement(el: Element, isCollision: boolean): URDFVisual | URDFCollider {
            const group = isCollision ? new URDFCollider() : new URDFVisual();
            group.urdfNode = el;

            let material: THREE.Material | null = null;
            const matEl = el.querySelector(':scope > material');
            if (matEl) {
                const name = matEl.getAttribute('name') ?? '';
                material = (name && materialMap[name]) ? materialMap[name] : parseMaterial(matEl);
            }

            const geoEl = el.querySelector(':scope > geometry');
            if (geoEl) {
                const geo = geoEl.firstElementChild;
                if (geo) buildGeometry(geo, group, material ?? new THREE.MeshPhongMaterial());
            }

            const originEl = el.querySelector(':scope > origin');
            if (originEl) {
                const xyz = parseTuple(originEl.getAttribute('xyz'));
                const rpy = parseTuple(originEl.getAttribute('rpy'));
                group.position.set(xyz[0], xyz[1], xyz[2]);
                group.rotation.set(0, 0, 0);
                applyRPY(group, rpy);
            }

            return group;
        }

        function buildGeometry(
            geo: Element,
            parent: THREE.Object3D,
            material: THREE.Material,
        ): void {
            switch (geo.nodeName.toLowerCase()) {
                case 'mesh': {
                    const filename = geo.getAttribute('filename');
                    if (!filename) return;
                    const path = resolvePath(filename);
                    if (!path) return;

                    const scaleAttr = geo.getAttribute('scale');
                    if (scaleAttr) {
                        const [sx, sy, sz] = parseTuple(scaleAttr);
                        parent.scale.set(sx, sy, sz);
                    }

                    manager.itemStart(path);
                    loadMesh(path, manager)
                        .then(obj => {
                            if (!obj) return;
                            if (obj instanceof THREE.Mesh) obj.material = material;
                            obj.position.set(0, 0, 0);
                            obj.quaternion.identity();
                            parent.add(obj);
                        })
                        .catch(err => console.error(`URDFLoader: failed to load mesh "${path}"`, err))
                        .finally(() => manager.itemEnd(path));
                    break;
                }

                case 'box': {
                    const size = parseTuple(geo.getAttribute('size'));
                    const mesh = new THREE.Mesh(_sharedBoxGeom, material);
                    mesh.scale.set(size[0], size[1], size[2]);
                    parent.add(mesh);
                    break;
                }

                case 'sphere': {
                    const radius = parseFloat(geo.getAttribute('radius') ?? '0');
                    const mesh = new THREE.Mesh(_sharedSphereGeom, material);
                    mesh.scale.setScalar(radius);
                    parent.add(mesh);
                    break;
                }

                case 'cylinder': {
                    const radius = parseFloat(geo.getAttribute('radius') ?? '0');
                    const length = parseFloat(geo.getAttribute('length') ?? '0');
                    const mesh = new THREE.Mesh(_sharedCylinderGeom, material);
                    mesh.scale.set(radius, length, radius);
                    mesh.rotation.set(Math.PI / 2, 0, 0); // URDF cylinders are Z-axis; Three.js cylinders are Y-axis
                    parent.add(mesh);
                    break;
                }
            }
        }

        function parseMaterial(el: Element): THREE.Material {
            const mat = new THREE.MeshPhongMaterial();
            mat.name = el.getAttribute('name') ?? '';

            const colorEl = el.querySelector(':scope > color');
            if (colorEl) {
                const rgba = (colorEl.getAttribute('rgba') ?? '1 1 1 1')
                    .trim()
                    .split(/\s+/)
                    .map(Number);
                mat.color.setRGB(rgba[0] ?? 1, rgba[1] ?? 1, rgba[2] ?? 1);
                mat.opacity = rgba[3] ?? 1;
                mat.transparent = mat.opacity < 1;
                mat.depthWrite = !mat.transparent;
            }

            const texEl = el.querySelector(':scope > texture');
            if (texEl) {
                const filename = texEl.getAttribute('filename');
                if (filename) {
                    const path = resolvePath(filename);
                    if (path) {
                        const loader = new THREE.TextureLoader(manager);
                        mat.map = loader.load(path);
                        mat.map.colorSpace = THREE.SRGBColorSpace;
                    }
                }
            }

            return mat;
        }
    }

    static async defaultMeshLoader(
        path: string,
        manager: THREE.LoadingManager,
    ): Promise<THREE.Object3D | null> {
        const ext = path.split('.').pop()?.toLowerCase() ?? '';

        switch (ext) {
            case 'stl':
                return new Promise((resolve, reject) => {
                    new STLLoader(manager).load(
                        path,
                        geom => resolve(new THREE.Mesh(geom, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide }))),
                        undefined,
                        reject,
                    );
                });

            case 'dae':
                return new Promise((resolve, reject) => {
                    new ColladaLoader(manager).load(
                        path,
                        result => resolve(result.scene),
                        undefined,
                        reject,
                    );
                });

            case 'glb':
            case 'gltf':
                return new Promise((resolve, reject) => {
                    new GLTFLoader(manager).load(
                        path,
                        result => resolve(result.scene),
                        undefined,
                        reject,
                    );
                });

            default:
                console.warn(`URDFLoader: no loader for "${path}"`);
                return null;
        }
    }
}

function makeResolver(packages: PackageMap, workingPath: string): (path: string) => string | null {
    return function resolvePath(path: string): string | null {
        if (!path.startsWith('package://')) {
            if (!workingPath || path.startsWith('/') || path.startsWith('http') || path.startsWith('blob:')) return path;
            return workingPath + path;
        }

        const [targetPkg, relPath] = path.slice('package://'.length).split(/\/(.+)/);

        if (typeof packages === 'string') {
            return packages.endsWith(targetPkg)
                ? `${packages}/${relPath}`
                : `${packages}/${targetPkg}/${relPath}`;
        }

        if (typeof packages === 'function') {
            return `${packages(targetPkg)}/${relPath}`;
        }

        if (targetPkg in packages) {
            return `${packages[targetPkg]}/${relPath}`;
        }

        console.error(`URDFLoader: package "${targetPkg}" not in package map`);
        return null;
    };
}

function detectMimicLoop(joints: URDFJoint[]): void {
    for (const joint of joints) {
        const seen = new Set<URDFJoint>();
        const stack = [joint];
        while (stack.length > 0) {
            const j = stack.pop()!;
            if (seen.has(j)) throw new Error('URDFLoader: infinite mimic joint loop detected');
            seen.add(j);
            for (const m of j.mimicJoints) stack.push(m);
        }
    }
}
