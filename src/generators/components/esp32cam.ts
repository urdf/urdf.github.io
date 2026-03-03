import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geometryToSTL } from '../stl.js';

export function generateEsp32Cam(): ArrayBuffer {
    const geos: THREE.BufferGeometry[] = [];

    // Main board: 40.5×27×4 mm, bottom at Z=0
    const board = new THREE.BoxGeometry(0.0405, 0.027, 0.004);
    board.translate(0, 0, 0.002);
    geos.push(board);

    // Camera bump: 25×24×9 mm, centered on top of board
    const camera = new THREE.BoxGeometry(0.025, 0.024, 0.009);
    camera.translate(0, 0, 0.004 + 0.0045);
    geos.push(camera);

    // Antenna strip: 40.5×4×2 mm at rear (+X side)
    const antenna = new THREE.BoxGeometry(0.0405, 0.004, 0.002);
    antenna.translate(0, -0.0155, 0.001);
    geos.push(antenna);

    const merged = mergeGeometries(geos);
    merged.computeVertexNormals();
    return geometryToSTL(merged);
}
