// Generates TT motor STL parts for the 2WD Robot Car.
// Run from the repo root:  node example/public/robots/robot-car/gen_motor.cjs
//
// Outputs three separate STL files (different colors in URDF):
//   tt_gearbox.stl  — yellow plastic gearbox body
//   tt_can.stl      — silver DC motor can + rear end cap
//   tt_shaft.stl    — dark metallic output shaft nub
//
// Orientation: gearbox centered at origin, shaft exits at -X, DC can extends +X

const THREE = require('three');
const path  = require('path');
const fs    = require('fs');

function writeSTL(pairs, label, filename) {
    let totalVerts = 0, totalIdx = 0;
    for (const [g] of pairs) {
        totalVerts += g.getAttribute('position').count;
        totalIdx   += g.getIndex().count;
    }

    const mergedPos = new Float32Array(totalVerts * 3);
    const mergedIdx = [];
    let vertOffset = 0;

    for (const [g, m] of pairs) {
        const pos = g.getAttribute('position');
        const idx = g.getIndex();
        for (let j = 0; j < pos.count; j++) {
            const v = new THREE.Vector3(pos.getX(j), pos.getY(j), pos.getZ(j));
            v.applyMatrix4(m);
            mergedPos[(vertOffset + j) * 3 + 0] = v.x;
            mergedPos[(vertOffset + j) * 3 + 1] = v.y;
            mergedPos[(vertOffset + j) * 3 + 2] = v.z;
        }
        for (let j = 0; j < idx.count; j++) mergedIdx.push(idx.getX(j) + vertOffset);
        vertOffset += pos.count;
    }

    const verts = [];
    for (let i = 0; i < mergedPos.length; i += 3)
        verts.push([mergedPos[i], mergedPos[i + 1], mergedPos[i + 2]]);
    const tris = [];
    for (let i = 0; i < mergedIdx.length; i += 3)
        tris.push([mergedIdx[i], mergedIdx[i + 1], mergedIdx[i + 2]]);

    const buf = Buffer.alloc(84 + tris.length * 50);
    buf.write(`Binary STL — ${label}`, 0);
    buf.writeUInt32LE(tris.length, 80);

    let off = 84;
    for (const [a, b, c] of tris) {
        const v0 = verts[a], v1 = verts[b], v2 = verts[c];
        const e1 = [v1[0]-v0[0], v1[1]-v0[1], v1[2]-v0[2]];
        const e2 = [v2[0]-v0[0], v2[1]-v0[1], v2[2]-v0[2]];
        const nx = e1[1]*e2[2] - e1[2]*e2[1];
        const ny = e1[2]*e2[0] - e1[0]*e2[2];
        const nz = e1[0]*e2[1] - e1[1]*e2[0];
        const len = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
        buf.writeFloatLE(nx / len, off); off += 4;
        buf.writeFloatLE(ny / len, off); off += 4;
        buf.writeFloatLE(nz / len, off); off += 4;
        for (const v of [v0, v1, v2]) {
            buf.writeFloatLE(v[0], off); off += 4;
            buf.writeFloatLE(v[1], off); off += 4;
            buf.writeFloatLE(v[2], off); off += 4;
        }
        buf.writeUInt16LE(0, off); off += 2;
    }

    const out = path.join(__dirname, filename);
    fs.writeFileSync(out, buf);
    console.log(`Wrote ${out}  (${tris.length} triangles)`);
}

const identity = new THREE.Matrix4();

// ── Gearbox (yellow) ──────────────────────────────────────────────────────────
writeSTL(
    [[new THREE.BoxGeometry(0.036, 0.018, 0.022), identity]],
    'TT Gearbox', 'tt_gearbox.stl'
);

// ── DC can + end cap (silver) ─────────────────────────────────────────────────
const canMat = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
canMat.setPosition(0.032, 0, 0);

const capMat = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
capMat.setPosition(0.047, 0, 0);

writeSTL(
    [
        [new THREE.CylinderGeometry(0.010, 0.010, 0.028, 24), canMat],
        [new THREE.CylinderGeometry(0.007, 0.010, 0.003, 24), capMat],
    ],
    'TT DC Can', 'tt_can.stl'
);

// ── Shaft nub (dark metallic) ─────────────────────────────────────────────────
const nubMat = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
nubMat.setPosition(-0.021, 0, 0);

writeSTL(
    [[new THREE.CylinderGeometry(0.004, 0.004, 0.006, 16), nubMat]],
    'TT Shaft Nub', 'tt_shaft.stl'
);
