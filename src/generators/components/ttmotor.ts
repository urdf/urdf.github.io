import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateTtMotor(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // Gearbox: 36×18×22 mm, bottom at Z=0
    const gearbox = new THREE.BoxGeometry(0.036, 0.018, 0.022);
    gearbox.translate(0, 0, 0.011);
    geos.push(gearbox);

    // DC motor can: cylinder r=10mm h=28mm, axis along X
    const can = new THREE.CylinderGeometry(0.010, 0.010, 0.028, 24);
    can.rotateZ(Math.PI / 2);
    can.translate(-0.032, 0, 0.011);
    geos.push(can);

    // Output shaft: cylinder r=2mm h=6mm, along Y (positive side)
    const shaft = new THREE.CylinderGeometry(0.002, 0.002, 0.006, 12);
    shaft.translate(0, 0.012, 0.011);
    geos.push(shaft);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
