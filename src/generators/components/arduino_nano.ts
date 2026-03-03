import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateArduinoNano(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // PCB: 43×18×2 mm, bottom at Z=0
    const pcb = new THREE.BoxGeometry(0.043, 0.018, 0.002);
    pcb.translate(0, 0, 0.001);
    geos.push(pcb);

    // USB mini-B connector box: 12×10×7 mm at one end
    const usb = new THREE.BoxGeometry(0.012, 0.010, 0.007);
    usb.translate(-0.016, 0, 0.002 + 0.0035);
    geos.push(usb);

    // Pin rails: 43×1×8 mm at each long side
    for (const y of [-0.0085, 0.0085]) {
        const rail = new THREE.BoxGeometry(0.043, 0.001, 0.008);
        rail.translate(0, y, 0.002 + 0.004);
        geos.push(rail);
    }

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
