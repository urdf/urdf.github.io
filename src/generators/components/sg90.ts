import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateSg90(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // Body: 22×11.5×23 mm, bottom at Z=0
    const body = new THREE.BoxGeometry(0.022, 0.0115, 0.023);
    body.translate(0, 0, 0.0115);
    geos.push(body);

    // Left ear: 7×11.5×3 mm
    const leftEar = new THREE.BoxGeometry(0.007, 0.0115, 0.003);
    leftEar.translate(-(0.011 + 0.0035), 0, 0.014);
    geos.push(leftEar);

    // Right ear: 7×11.5×3 mm
    const rightEar = new THREE.BoxGeometry(0.007, 0.0115, 0.003);
    rightEar.translate(0.011 + 0.0035, 0, 0.014);
    geos.push(rightEar);

    // Horn cylinder: r=3mm h=4mm at top center
    const horn = new THREE.CylinderGeometry(0.003, 0.003, 0.004, 16);
    horn.rotateX(Math.PI / 2);
    horn.translate(0, 0, 0.023 + 0.002);
    geos.push(horn);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
