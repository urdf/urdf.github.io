import * as THREE from 'three';
import { geometryToSTL } from './stl.js';

export interface ChassisParams {
    /** Plate thickness in metres (0.001–0.010). Default 0.003. */
    thickness:     number;
    /** Half-width of the front body section in metres (0.040–0.090). Default 0.062. */
    bodyHalfWidth: number;
    /** Half-width of the rear section in metres (0.085–0.130). Default 0.095.
     *  Must be > bodyHalfWidth. */
    rearHalfWidth: number;
}

export const CHASSIS_DEFAULTS: ChassisParams = {
    thickness:     0.003,
    bodyHalfWidth: 0.062,
    rearHalfWidth: 0.095,
};

export function generateChassis(p: ChassisParams): ArrayBuffer {
    const thick  = Math.max(0.001, Math.min(0.010, p.thickness));
    const bodyHW = Math.max(0.040, Math.min(0.090, p.bodyHalfWidth));
    // rearHW must exceed bodyHW to keep the step going outward
    const rearHW = Math.max(bodyHW + 0.010, Math.min(0.130, p.rearHalfWidth));

    const rearY = 0.115;
    const rearR = 0.010;
    const stepY = 0.080;
    const frontY = -0.145;
    const frontR = bodyHW;

    function rectH(cx: number, cy: number, w: number, h: number, cr = 0.0008): THREE.Path {
        const ph = new THREE.Path();
        ph.moveTo(cx - w/2 + cr, cy - h/2);
        ph.lineTo(cx + w/2 - cr, cy - h/2);
        ph.quadraticCurveTo(cx + w/2, cy - h/2, cx + w/2, cy - h/2 + cr);
        ph.lineTo(cx + w/2, cy + h/2 - cr);
        ph.quadraticCurveTo(cx + w/2, cy + h/2, cx + w/2 - cr, cy + h/2);
        ph.lineTo(cx - w/2 + cr, cy + h/2);
        ph.quadraticCurveTo(cx - w/2, cy + h/2, cx - w/2, cy + h/2 - cr);
        ph.lineTo(cx - w/2, cy - h/2 + cr);
        ph.quadraticCurveTo(cx - w/2, cy - h/2, cx - w/2 + cr, cy - h/2);
        return ph;
    }

    function circH(cx: number, cy: number, r: number): THREE.Path {
        const ph = new THREE.Path();
        ph.absarc(cx, cy, r, 0, Math.PI * 2, false);
        return ph;
    }

    const s = new THREE.Shape();
    s.moveTo(-rearHW + rearR, rearY);
    s.lineTo(rearHW - rearR, rearY);
    s.quadraticCurveTo(rearHW, rearY, rearHW, rearY - rearR);
    s.lineTo(rearHW, stepY);
    s.lineTo(bodyHW, stepY);
    s.lineTo(bodyHW, frontY + frontR);
    s.absarc(0, frontY + frontR, bodyHW, 0, -Math.PI, true);
    s.lineTo(-bodyHW, stepY);
    s.lineTo(-rearHW, stepY);
    s.lineTo(-rearHW, rearY - rearR);
    s.quadraticCurveTo(-rearHW, rearY, -rearHW + rearR, rearY);

    // Motor pass-through cutouts — in rear zone (y > stepY=0.080) where boundary=rearHW.
    // y=0.093, h=0.014 → spans y=0.086–0.100, clear of mounting holes at y=0.083.
    // DO NOT place holes at y<0.080: in the body zone boundary is bodyHW, and
    // motorX (rearHW-based) exceeds it, causing earcut phantom geometry.
    const motorX = rearHW - 0.020;
    s.holes.push(rectH(-motorX, 0.093, 0.012, 0.014, 0.001));
    s.holes.push(rectH( motorX, 0.093, 0.012, 0.014, 0.001));

    // Center cutout
    const pc = new THREE.Path();
    const cx = 0, cy = 0.050;
    pc.moveTo(cx - 0.025, cy - 0.035);
    pc.lineTo(cx - 0.025, cy - 0.018);
    pc.lineTo(cx - 0.033, cy - 0.018);
    pc.lineTo(cx - 0.033, cy + 0.002);
    pc.lineTo(cx - 0.025, cy + 0.002);
    pc.lineTo(cx - 0.025, cy + 0.018);
    pc.lineTo(cx - 0.015, cy + 0.028);
    pc.lineTo(cx + 0.015, cy + 0.028);
    pc.lineTo(cx + 0.025, cy + 0.018);
    pc.lineTo(cx + 0.025, cy + 0.002);
    pc.lineTo(cx + 0.033, cy + 0.002);
    pc.lineTo(cx + 0.033, cy - 0.018);
    pc.lineTo(cx + 0.025, cy - 0.018);
    pc.lineTo(cx + 0.025, cy - 0.035);
    pc.lineTo(cx - 0.025, cy - 0.035);
    s.holes.push(pc);

    // Wiring slots
    s.holes.push(rectH(-0.025, 0.098, 0.018, 0.006, 0.001));
    s.holes.push(rectH( 0.025, 0.098, 0.018, 0.006, 0.001));
    s.holes.push(rectH(0,      0.090, 0.014, 0.004, 0.001));

    // Front slots
    s.holes.push(rectH(-0.025, -0.085, 0.018, 0.004, 0.001));
    s.holes.push(rectH( 0.025, -0.085, 0.018, 0.004, 0.001));
    s.holes.push(circH(0, -0.098, 0.006));

    // Mounting holes
    const hr = 0.002;
    s.holes.push(circH(-0.080,  0.105, hr));
    s.holes.push(circH( 0.080,  0.105, hr));
    s.holes.push(circH(-0.080,  0.083, hr));
    s.holes.push(circH( 0.080,  0.083, hr));
    s.holes.push(circH(-0.020,  0.108, hr));
    s.holes.push(circH( 0.020,  0.108, hr));
    s.holes.push(circH(-0.048,  0.010, hr));
    s.holes.push(circH( 0.048,  0.010, hr));
    s.holes.push(circH(-0.048, -0.030, hr));
    s.holes.push(circH( 0.048, -0.030, hr));
    s.holes.push(circH( 0,     -0.020, hr));
    s.holes.push(circH(-0.014, -0.065, hr));
    s.holes.push(circH( 0.014, -0.065, hr));
    s.holes.push(circH(-0.014, -0.052, hr));
    s.holes.push(circH( 0.014, -0.052, hr));
    s.holes.push(circH(-0.040, -0.062, hr));
    s.holes.push(circH( 0.040, -0.062, hr));

    const geo = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: false, curveSegments: 48 });
    geo.rotateZ(-Math.PI / 2);
    return geometryToSTL(geo);
}
