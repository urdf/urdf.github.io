import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateMpu6050(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    const pcb = new THREE.BoxGeometry(0.020, 0.020, 0.0015);
    pcb.translate(0, 0, 0.00075);
    geos.push(pcb);

    const chip = new THREE.BoxGeometry(0.004, 0.004, 0.001);
    chip.translate(0, 0, 0.0015 + 0.0005);
    geos.push(chip);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
