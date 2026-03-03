import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateL298n(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // PCB: 43×43×2 mm, bottom at Z=0
    const pcb = new THREE.BoxGeometry(0.043, 0.043, 0.002);
    pcb.translate(0, 0, 0.001);
    geos.push(pcb);

    // Heatsink block: 30×43×18 mm, sitting on PCB
    const heatsink = new THREE.BoxGeometry(0.030, 0.043, 0.018);
    heatsink.translate(0, 0, 0.002 + 0.009);
    geos.push(heatsink);

    // 4 fins: 2mm wide, 43mm deep, 4mm tall, spaced 6mm apart
    for (let i = 0; i < 4; i++) {
        const finX = -0.009 + i * 0.006;
        const fin = new THREE.BoxGeometry(0.002, 0.043, 0.004);
        fin.translate(finX, 0, 0.020 + 0.002);
        geos.push(fin);
    }

    // 2 electrolytic capacitors: cylinder r=4mm h=10mm
    for (const x of [-0.015, 0.015]) {
        const cap = new THREE.CylinderGeometry(0.004, 0.004, 0.010, 16);
        cap.rotateX(Math.PI / 2);
        cap.translate(x, -0.018, 0.002 + 0.005);
        geos.push(cap);
    }

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
