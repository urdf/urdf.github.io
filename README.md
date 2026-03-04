# urdf-loader

Parse and render URDF robot models in the browser using Three.js.

**[Live demo](https://urdf.github.io)**

---

## Features

- Load URDF files from a URL, string, or custom fetch handler
- Resolve ROS `package://` URIs via a package map or callback
- Interactive joint manipulation via drag controls
- Web component (`<urdf-viewer>`) for drop-in embedding
- Gesture control via MediaPipe hand tracking
- AI-assisted editing and robot building

## Installation

```bash
npm install @urdf/loader
```

Requires `three >= 0.160.0` as a peer dependency.

## Usage

```ts
import { URDFLoader } from '@urdf/loader';
import * as THREE from 'three';

const loader = new URDFLoader();
loader.packages = { my_robot: '/path/to/my_robot' };

loader.load('/path/to/robot.urdf', robot => {
    const scene = new THREE.Scene();
    scene.add(robot);
});
```

### Web component

```html
<script type="module" src="urdf-loader.js"></script>
<urdf-viewer src="/path/to/robot.urdf" package="/path/to/packages"></urdf-viewer>
```

### Joint manipulation

```ts
import { URDFManipulator } from '@urdf/loader';

const manipulator = new URDFManipulator();
// Set a joint angle (radians)
manipulator.setJointValue('shoulder_pan_joint', 0.5);
```

## Development

```bash
make dev          # Start Vite dev server
make build        # Build the npm library → dist/
make build-site   # Build the demo site → docs/
make preview      # Preview the built site locally
make lint         # Type-check with tsc
make clean        # Remove dist/, docs/, node_modules/
make hooks        # Install git hooks
make deploy       # robots-update → validate → lint → build-site
```

## Project structure

```
src/                  TypeScript library source
  URDFLoader.ts       URDF parser
  URDFViewer.ts       Web component
  URDFManipulator.ts  Joint control
  URDFDragControls.ts Pointer/touch drag controls
  generators/         Procedural geometry (chassis, wheels, components)
example/              Demo site
  main.ts             App entry point
  index.html
  public/robots/      Robot assets (git submodule)
docs/                 Built demo site (GitHub Pages)
```

## License

Apache 2.0
