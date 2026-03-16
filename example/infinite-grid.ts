// Shader-based infinite grid on the XZ plane.
// Replaces GridHelper with perspective-correct lines that fade with distance.
// Reference: https://asliceofrendering.com/scene%20helper/2020/01/05/InfiniteGrid/

import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec3 vWorldPos;

void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vWorldPos;
uniform float uMajorSpacing;
uniform float uMinorSpacing;
uniform vec3  uMajorColor;
uniform vec3  uMinorColor;
uniform float uFadeRadius;

float gridLine(float coord, float spacing) {
    float derivative = fwidth(coord);
    float halfLine = 0.5 * derivative;
    float wrapped = abs(mod(coord + spacing * 0.5, spacing) - spacing * 0.5);
    return 1.0 - smoothstep(0.0, halfLine * 1.5, wrapped);
}

void main() {
    float dist = length(vWorldPos.xz);
    float fade = 1.0 - smoothstep(uFadeRadius * 0.3, uFadeRadius, dist);
    if (fade < 0.001) discard;

    float minor = max(
        gridLine(vWorldPos.x, uMinorSpacing),
        gridLine(vWorldPos.z, uMinorSpacing)
    );
    float major = max(
        gridLine(vWorldPos.x, uMajorSpacing),
        gridLine(vWorldPos.z, uMajorSpacing)
    );

    vec3 color = mix(uMinorColor, uMajorColor, major);
    float alpha = max(minor, major) * fade * 0.6;
    if (alpha < 0.001) discard;

    gl_FragColor = vec4(color, alpha);
}
`;

export interface InfiniteGridOptions {
    majorSpacing?: number;
    minorSpacing?: number;
    majorColor?: THREE.Color;
    minorColor?: THREE.Color;
    fadeRadius?: number;
    size?: number;
}

export class InfiniteGrid extends THREE.Mesh {
    declare material: THREE.ShaderMaterial;

    constructor(opts: InfiniteGridOptions = {}) {
        const {
            majorSpacing = 0.1,
            minorSpacing = 0.02,
            majorColor = new THREE.Color(0x888888),
            minorColor = new THREE.Color(0x444444),
            fadeRadius = 1.5,
            size = 20,
        } = opts;

        const geometry = new THREE.PlaneGeometry(size, size);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uMajorSpacing: { value: majorSpacing },
                uMinorSpacing: { value: minorSpacing },
                uMajorColor:   { value: majorColor },
                uMinorColor:   { value: minorColor },
                uFadeRadius:   { value: fadeRadius },
            },
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            extensions: { derivatives: true },
        });

        super(geometry, material);
        this.frustumCulled = false;
        this.renderOrder = -1;   // draw before shadow plane
        this.raycast = () => {};
    }

    get groundY(): number { return this.position.y; }
    set groundY(v: number) { this.position.y = v - 0.0005; }  // slight offset below shadow plane to avoid Z-fight

    setSpacing(major: number, minor: number): void {
        this.material.uniforms.uMajorSpacing.value = major;
        this.material.uniforms.uMinorSpacing.value = minor;
    }

    setColors(major: THREE.Color, minor: THREE.Color): void {
        this.material.uniforms.uMajorColor.value.copy(major);
        this.material.uniforms.uMinorColor.value.copy(minor);
    }

    setFadeRadius(r: number): void {
        this.material.uniforms.uFadeRadius.value = r;
    }
}
