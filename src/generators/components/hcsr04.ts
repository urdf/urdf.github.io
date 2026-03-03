import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateHcsr04(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    const pcb = new THREE.BoxGeometry(0.045, 0.020, 0.002);
    pcb.translate(0, 0, 0.001);
    geos.push(pcb);

    // Two transducer cylinders — CylinderGeometry default axis is Y; rotateX(PI/2) → Z-axis
    for (const y of [-0.014, 0.014]) {
        const cyl = new THREE.CylinderGeometry(0.008, 0.008, 0.012, 24);
        cyl.rotateX(Math.PI / 2);
        cyl.translate(0, y, 0.002 + 0.006);
        geos.push(cyl);
    }

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
