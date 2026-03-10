# Local research projects

All directories live at `~/Github/robotics/` alongside this repo. They are not tracked here —
this document describes what each one is and why it exists.

## Cloned external repos

### `urdf-loaders/`
**gkjohnson/urdf-loaders** — URDF loading for Three.js (JS) and Unity (C#), with JPL ATHLETE
example models. The JS loader here is the direct upstream of `URDFLoader` in this project.
Clone kept for source reading and diffing.

### `threejs-examples/folio-2025/`
**Bruno Simon's folio-2025** — Three.js portfolio site source. Reference for scene setup,
baked lighting, and render loop quality. Kept for code study alongside the Journey course.

### `other-projects/mjswan/`
**ttktjmt/mjswan** — MuJoCo WASM + ONNX Runtime + Three.js framework for running trained
robot policies in the browser as static sites. Reference for the physics-in-browser approach
and how it layers on top of the same Three.js stack used here.

### `other-projects/mujoco/`
**google-deepmind/mujoco** — MuJoCo physics simulator source (C++ + WASM build). Kept for
reference on physics internals, model format, and the WASM compilation pipeline that mjswan
depends on.

### `other-projects/onnxruntime/`
**microsoft/onnxruntime** — ONNX Runtime source. Kept for reference on running ML inference
in the browser (WebAssembly / WebGPU backends). Used by mjswan for policy execution.

### `other-projects/reBot-DevArm/`
**Seeed Studio reBot-DevArm** — Fully open source robotic arm (ROS Noetic/Humble, LeRobot,
Isaac Sim). CC BY-NC-SA. Reference for printable arm hardware design, URDF authoring, and
the hardware-to-sim pipeline.

## Local experiments

### `artifact-experiment/`
ROS 2 package with `robot_car.urdf` and `robot_car.urdf.xacro`. Used to test the robot-car
model in Gazebo and validate joint positions independently of the browser viewer.
No upstream — local only.

### `components-design/`
- `components-list.txt` — bill of materials for the robot-car build (LAFVIN chassis kit)
- `components.png` — photo reference for component layout
- `stl-forge.html` — standalone HTML tool for generating simple STL shapes in the browser

No upstream — local only.
