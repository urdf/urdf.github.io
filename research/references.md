# References

## Three.js — technical viewers

**Three.js Editor** (`three/editor/` in the three.js repo)
The canonical reference for transform gizmos, scene graph panel, property inspector, and
raycast-based picking. Open source, plain Three.js. Study before implementing any gizmo or
object-selection UI.

**Online-3d-viewer** (kovacsv/Online3DViewer on GitHub)
Open source multi-format 3D viewer. Good reference for panel layout, model loading UX, fit-to-
selection, and mobile handling. Code maps directly to this stack.

**IFC.js / web-ifc-viewer** (IFCjs/web-ifc-viewer on GitHub)
BIM/CAD viewer on Three.js. Reference for outline-based selection highlight (OutlinePass),
section planes, and performance under large assemblies.

**model-viewer** (google/model-viewer on GitHub)
Web component wrapping Three.js. Reference for camera orbit UX, AR mode, and graceful loading
states. Well-tested on mobile.

## Three.js — performance

**Three.js official examples** (threejs.org/examples)
Source for instancing, LOD, and buffergeometry patterns. The authoritative reference for
renderer capabilities and edge cases.

**Sketchfab viewer**
Not open source. Benchmark for load performance, progressive rendering, and mobile UX.
Study behavior, not code.

## Three.js — visual quality / shaders

**Bruno Simon — portfolio / Threejs Journey**
Baked lighting, custom shaders, tight render loop. The Journey course dissects it in full.
The driving game is the clearest example of visual quality at minimal geometry cost.

**Yuri Artiukh (akella) — YouTube**
Live-coded shader effects. Best source for pushing visual quality with minimal geometry.
High signal-to-noise on technique.

**Maxime Heckel's blog**
Written deep-dives: volumetrics, portal effects, custom materials. High signal-to-noise for
understanding specific Three.js rendering techniques.

## Three.js — interaction / UI

**Spline**
Commercial 3D design tool in the browser. Reference for transform handle UX and how to
integrate 3D controls with a dense sidebar without them fighting each other.

**Needle Engine examples** (needle-tools/needle-engine-samples on GitHub)
Game-engine-on-Three.js. Reference for component inspector UI alongside a 3D viewport.

## URDF / robot simulation in the browser

**urdf-visualizer** (MorningFrog/urdf-visualizer on GitHub)
Another browser-based URDF viewer. Reference for alternative approach to joint control UI.

**viser** (viser.studio)
Python-based 3D visualization server with a URDF viewer example. Reference for how a
server-side approach handles robot state vs. the static-site approach here.

**asimov-v0** (asimovinc/asimov-v0 on GitHub)
Browser robot viewer from Asimov. Reference for production-grade URDF viewer UI.

## Robot hardware

**openarm_hardware** (enactic/openarm_hardware on GitHub)
Open source robotic arm hardware. Reference for printable arm design and URDF authoring.

## Simulation tools

**Isaac Sim — ingesting robot assets**
https://docs.nvidia.com/learning/physical-ai/getting-started-with-isaac-sim/latest/ingesting-robot-assets-and-simulating-your-robot-in-isaac-sim/index.html
Reference for the asset pipeline from URDF to GPU-accelerated sim.

## Quick lookup by concern

| Concern | Reference |
|---|---|
| Transform gizmo | Three.js Editor |
| Outline selection highlight | Three.js Editor, IFC.js |
| Fit-to-selection / camera framing | Online-3d-viewer |
| Render quality on low-end hardware | Sketchfab (behavior), model-viewer |
| Shader / material polish | Yuri Artiukh, Maxime Heckel |
| Panel + viewport layout | Online-3d-viewer, Spline |
| Instancing / LOD / performance | Three.js official examples |
| Alternative URDF viewers | urdf-visualizer, asimov-v0, viser |
| Robot hardware + URDF authoring | openarm_hardware, reBot-DevArm |
| Physics sim pipeline | Isaac Sim docs, mjswan |
