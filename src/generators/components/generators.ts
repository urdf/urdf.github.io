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

export function generateL298n(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    const pcb = new THREE.BoxGeometry(0.043, 0.043, 0.002);
    pcb.translate(0, 0, 0.001);
    geos.push(pcb);

    // Heatsink block sitting on PCB
    const heatsink = new THREE.BoxGeometry(0.030, 0.043, 0.018);
    heatsink.translate(0, 0, 0.002 + 0.009);
    geos.push(heatsink);

    // 4 fins: 2mm wide, 43mm deep, 4mm tall, spaced 6mm apart
    for (let i = 0; i < 4; i++) {
        const fin = new THREE.BoxGeometry(0.002, 0.043, 0.004);
        fin.translate(-0.009 + i * 0.006, 0, 0.020 + 0.002);
        geos.push(fin);
    }

    // 2 electrolytic capacitors
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

export function generateEsp32Cam(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    const board = new THREE.BoxGeometry(0.0405, 0.027, 0.004);
    board.translate(0, 0, 0.002);
    geos.push(board);

    const camera = new THREE.BoxGeometry(0.025, 0.024, 0.009);
    camera.translate(0, 0, 0.004 + 0.0045);
    geos.push(camera);

    // Antenna strip at rear
    const antenna = new THREE.BoxGeometry(0.0405, 0.004, 0.002);
    antenna.translate(0, -0.0155, 0.001);
    geos.push(antenna);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}

export function generateTtMotor(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // Gearbox: 36×18×22 mm, bottom at Z=0
    const gearbox = new THREE.BoxGeometry(0.036, 0.018, 0.022);
    gearbox.translate(0, 0, 0.011);
    geos.push(gearbox);

    // DC motor can: cylinder along X, attached to rear of gearbox
    const can = new THREE.CylinderGeometry(0.010, 0.010, 0.028, 24);
    can.rotateZ(Math.PI / 2);
    can.translate(-0.032, 0, 0.011);
    geos.push(can);

    // Output shaft along +Y
    const shaft = new THREE.CylinderGeometry(0.002, 0.002, 0.006, 12);
    shaft.translate(0, 0.012, 0.011);
    geos.push(shaft);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}

export function generateSg90(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // Body: 22×11.5×23 mm, bottom at Z=0
    const body = new THREE.BoxGeometry(0.022, 0.0115, 0.023);
    body.translate(0, 0, 0.0115);
    geos.push(body);

    // Mounting ears
    for (const sx of [-1, 1]) {
        const ear = new THREE.BoxGeometry(0.007, 0.0115, 0.003);
        ear.translate(sx * (0.011 + 0.0035), 0, 0.014);
        geos.push(ear);
    }

    // Horn cylinder at top center
    const horn = new THREE.CylinderGeometry(0.003, 0.003, 0.004, 16);
    horn.rotateX(Math.PI / 2);
    horn.translate(0, 0, 0.023 + 0.002);
    geos.push(horn);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}

export function generateArduinoNano(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    const pcb = new THREE.BoxGeometry(0.043, 0.018, 0.002);
    pcb.translate(0, 0, 0.001);
    geos.push(pcb);

    // USB mini-B connector at one end
    const usb = new THREE.BoxGeometry(0.012, 0.010, 0.007);
    usb.translate(-0.016, 0, 0.002 + 0.0035);
    geos.push(usb);

    // Pin rails along each long side
    for (const y of [-0.0085, 0.0085]) {
        const rail = new THREE.BoxGeometry(0.043, 0.001, 0.008);
        rail.translate(0, y, 0.002 + 0.004);
        geos.push(rail);
    }

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}

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
