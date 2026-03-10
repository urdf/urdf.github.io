/**
 * Placeholder STL and default script source for the Script component.
 * The Worker re-evaluates the script immediately after the card renders,
 * so the placeholder STL is only visible for a frame or two.
 */

export function makeDefaultCubeSTL(): ArrayBuffer {
    const h = 0.005; // half of 10 mm
    const faces: [number,number,number][][] = [
        [[-h,-h,h],[h,-h,h],[h,h,h]], [[-h,-h,h],[h,h,h],[-h,h,h]],
        [[h,-h,-h],[-h,-h,-h],[-h,h,-h]], [[h,-h,-h],[-h,h,-h],[h,h,-h]],
        [[h,-h,-h],[h,-h,h],[h,h,h]], [[h,-h,-h],[h,h,h],[h,h,-h]],
        [[-h,-h,h],[-h,-h,-h],[-h,h,-h]], [[-h,-h,h],[-h,h,-h],[-h,h,h]],
        [[-h,h,-h],[h,h,-h],[h,h,h]], [[-h,h,-h],[h,h,h],[-h,h,h]],
        [[h,-h,-h],[-h,-h,-h],[-h,-h,h]], [[h,-h,-h],[-h,-h,h],[h,-h,h]],
    ];
    const buf = new ArrayBuffer(84 + faces.length * 50);
    const dv  = new DataView(buf);
    dv.setUint32(80, faces.length, true);
    let off = 84;
    for (const [a, b, c] of faces) {
        const ex=b[0]-a[0], ey=b[1]-a[1], ez=b[2]-a[2];
        const fx=c[0]-a[0], fy=c[1]-a[1], fz=c[2]-a[2];
        const nx=ey*fz-ez*fy, ny=ez*fx-ex*fz, nz=ex*fy-ey*fx;
        const L = Math.sqrt(nx*nx+ny*ny+nz*nz) || 1;
        for (const v of [nx/L,ny/L,nz/L,...a,...b,...c])
            { dv.setFloat32(off,v,true); off+=4; }
        dv.setUint16(off,0,true); off+=2;
    }
    return buf;
}

// Default script shown in the editor when a Script component is first added.
// Returns binary STL (ArrayBuffer). Format: 84-byte header + N×50-byte triangles
// (12-byte normal + 3×12-byte vertices + 2-byte attribute = 50 bytes each, float32 LE).
export const DEFAULT_SCRIPT = `(function () {
  const h = 0.005; // half-size → 10 mm cube
  const t = [
    [[-h,-h,h],[h,-h,h],[h,h,h]], [[-h,-h,h],[h,h,h],[-h,h,h]],
    [[h,-h,-h],[-h,-h,-h],[-h,h,-h]], [[h,-h,-h],[-h,h,-h],[h,h,-h]],
    [[h,-h,-h],[h,-h,h],[h,h,h]], [[h,-h,-h],[h,h,h],[h,h,-h]],
    [[-h,-h,h],[-h,-h,-h],[-h,h,-h]], [[-h,-h,h],[-h,h,-h],[-h,h,h]],
    [[-h,h,-h],[h,h,-h],[h,h,h]], [[-h,h,-h],[h,h,h],[-h,h,h]],
    [[h,-h,-h],[-h,-h,-h],[-h,-h,h]], [[h,-h,-h],[-h,-h,h],[h,-h,h]],
  ];
  const buf = new ArrayBuffer(84 + t.length * 50);
  const dv  = new DataView(buf);
  dv.setUint32(80, t.length, true);
  let off = 84;
  for (const [a, b, c] of t) {
    const ex=b[0]-a[0],ey=b[1]-a[1],ez=b[2]-a[2];
    const fx=c[0]-a[0],fy=c[1]-a[1],fz=c[2]-a[2];
    const nx=ey*fz-ez*fy, ny=ez*fx-ex*fz, nz=ex*fy-ey*fx;
    const L=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
    for (const v of [nx/L,ny/L,nz/L,...a,...b,...c])
      { dv.setFloat32(off,v,true); off+=4; }
    dv.setUint16(off,0,true); off+=2;
  }
  return buf;
})`;
