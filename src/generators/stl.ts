import * as THREE from 'three';

/** Convert a Three.js BufferGeometry to a binary STL ArrayBuffer. */
export function geometryToSTL(geo: THREE.BufferGeometry): ArrayBuffer {
    const pos = geo.getAttribute('position') as THREE.BufferAttribute;
    const idx = geo.getIndex();

    const verts: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
        verts.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
    }

    const tris: [number, number, number][] = [];
    if (idx) {
        for (let i = 0; i < idx.count; i += 3) {
            tris.push([idx.getX(i), idx.getX(i + 1), idx.getX(i + 2)]);
        }
    } else {
        for (let i = 0; i < pos.count; i += 3) {
            tris.push([i, i + 1, i + 2]);
        }
    }

    const buf = new ArrayBuffer(84 + tris.length * 50);
    const dv  = new DataView(buf);
    dv.setUint32(80, tris.length, true);

    let off = 84;
    for (const [a, b, c] of tris) {
        const v0 = verts[a], v1 = verts[b], v2 = verts[c];
        const e1x = v1[0] - v0[0], e1y = v1[1] - v0[1], e1z = v1[2] - v0[2];
        const e2x = v2[0] - v0[0], e2y = v2[1] - v0[1], e2z = v2[2] - v0[2];
        const nx = e1y * e2z - e1z * e2y;
        const ny = e1z * e2x - e1x * e2z;
        const nz = e1x * e2y - e1y * e2x;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        dv.setFloat32(off, nx / len, true); off += 4;
        dv.setFloat32(off, ny / len, true); off += 4;
        dv.setFloat32(off, nz / len, true); off += 4;
        for (const v of [v0, v1, v2]) {
            dv.setFloat32(off, v[0], true); off += 4;
            dv.setFloat32(off, v[1], true); off += 4;
            dv.setFloat32(off, v[2], true); off += 4;
        }
        dv.setUint16(off, 0, true); off += 2;
    }

    return buf;
}
