/**
 * Parametric wheel generator — port of gen_wheel_stl.py.
 * Axis: Z  (URDF joint rpy handles orientation in the robot).
 * Center: origin, spanning −width/2 to +width/2 along Z.
 */

export interface WheelParams {
    /** Outer radius in metres (0.020–0.050). Default 0.0325. */
    radius: number;
    /** Wheel width in metres (0.008–0.030). Default 0.026. */
    width:  number;
}

export const WHEEL_DEFAULTS: WheelParams = {
    radius: 0.0325,
    width:  0.026,
};

export function generateWheel(p: WheelParams): ArrayBuffer {
    const R_OUTER = Math.max(0.020, Math.min(0.050, p.radius));
    const R_BASE  = R_OUTER * (31 / 32.5);  // base cylinder ≈ 95.4 % of outer radius
    const W       = Math.max(0.008, Math.min(0.030, p.width));

    const N_SEG          = 64;
    const N_CIRC         = 16;
    const N_WIDE         = 4;
    const BLOCK_ARC_FRAC = 0.58;
    const BLOCK_Z_FRAC   = 0.62;

    // Flat triangle buffer: groups of 9 floats [v0x,v0y,v0z, v1x,…, v2z]
    const tv: number[] = [];

    const tri = (a: number[], b: number[], c: number[]) => tv.push(...a, ...b, ...c);
    const quad = (a: number[], b: number[], c: number[], d: number[]) => {
        tri(a, b, c);
        tri(a, c, d);
    };

    // Base cylinder
    for (let i = 0; i < N_SEG; i++) {
        const a0 = 2 * Math.PI * i / N_SEG;
        const a1 = 2 * Math.PI * (i + 1) / N_SEG;
        const c0 = Math.cos(a0), s0 = Math.sin(a0);
        const c1 = Math.cos(a1), s1 = Math.sin(a1);

        const b00 = [R_BASE * c0, R_BASE * s0, -W/2];
        const b10 = [R_BASE * c1, R_BASE * s1, -W/2];
        const b01 = [R_BASE * c0, R_BASE * s0,  W/2];
        const b11 = [R_BASE * c1, R_BASE * s1,  W/2];

        quad(b00, b10, b11, b01);       // side
        tri([0, 0, -W/2], b10, b00);   // −Z cap
        tri([0, 0,  W/2], b01, b11);   // +Z cap
    }

    // Tread blocks
    const arcSlot = 2 * Math.PI / N_CIRC;
    const zSlot   = W / N_WIDE;

    for (let ci = 0; ci < N_CIRC; ci++) {
        const aMid = arcSlot * (ci + 0.5);
        const a0   = aMid - arcSlot * BLOCK_ARC_FRAC / 2;
        const a1   = aMid + arcSlot * BLOCK_ARC_FRAC / 2;

        for (let wi = 0; wi < N_WIDE; wi++) {
            const zMid = -W/2 + zSlot * (wi + 0.5);
            const z0   = zMid - zSlot * BLOCK_Z_FRAC / 2;
            const z1   = zMid + zSlot * BLOCK_Z_FRAC / 2;

            const [ca0, sa0, ca1, sa1] = [Math.cos(a0), Math.sin(a0), Math.cos(a1), Math.sin(a1)];

            const c0a0 = [R_BASE  * ca0, R_BASE  * sa0, z0];
            const c1a0 = [R_BASE  * ca1, R_BASE  * sa1, z0];
            const c0a1 = [R_BASE  * ca0, R_BASE  * sa0, z1];
            const c1a1 = [R_BASE  * ca1, R_BASE  * sa1, z1];
            const t0a0 = [R_OUTER * ca0, R_OUTER * sa0, z0];
            const t1a0 = [R_OUTER * ca1, R_OUTER * sa1, z0];
            const t0a1 = [R_OUTER * ca0, R_OUTER * sa0, z1];
            const t1a1 = [R_OUTER * ca1, R_OUTER * sa1, z1];

            quad(t0a0, t1a0, t1a1, t0a1);  // outer face
            quad(c0a0, t0a0, t0a1, c0a1);  // a0 side
            quad(c1a0, c1a1, t1a1, t1a0);  // a1 side
            quad(c0a0, c1a0, t1a0, t0a0);  // z0 face
            quad(t0a1, t1a1, c1a1, c0a1);  // z1 face
        }
    }

    // Write binary STL
    const triCount = tv.length / 9;
    const buf = new ArrayBuffer(84 + triCount * 50);
    const dv  = new DataView(buf);
    dv.setUint32(80, triCount, true);

    let off = 84;
    for (let i = 0; i < triCount; i++) {
        const b = i * 9;
        const e1x = tv[b+3] - tv[b],   e1y = tv[b+4] - tv[b+1], e1z = tv[b+5] - tv[b+2];
        const e2x = tv[b+6] - tv[b],   e2y = tv[b+7] - tv[b+1], e2z = tv[b+8] - tv[b+2];
        const nx = e1y * e2z - e1z * e2y;
        const ny = e1z * e2x - e1x * e2z;
        const nz = e1x * e2y - e1y * e2x;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        dv.setFloat32(off, nx / len, true); off += 4;
        dv.setFloat32(off, ny / len, true); off += 4;
        dv.setFloat32(off, nz / len, true); off += 4;
        for (let j = 0; j < 9; j++) { dv.setFloat32(off, tv[b + j], true); off += 4; }
        dv.setUint16(off, 0, true); off += 2;
    }

    return buf;
}
