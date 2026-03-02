# @urdf/loader

Parse and render URDF robot models in the browser.

**[Live demo →](https://urdf.github.io)**

---

## Features

- **Full URDF support** — links, joints (fixed, revolute, prismatic, continuous, planar, floating), mimic joints, materials, and primitives
- **Mesh formats** — STL, Collada (DAE), and GLTF/GLB out of the box
- **Web component** — drop `<urdf-viewer>` into any page, no framework required
- **Interactive** — drag joints directly in the viewport; joint sliders included in the viewer element
- **TypeScript** — full types, no separate `.d.ts` files
- **Tree-shakeable** — import only what you need

---

## Install

```sh
npm install @urdf/loader three
```

---

## Usage

### Loader (headless)

```ts
import { URDFLoader } from '@urdf/loader';

const loader = new URDFLoader();
loader.packages = '/path/to/ros/packages'; // or a { name: path } map

const robot = await loader.load('/path/to/robot.urdf');
scene.add(robot);

// Move a joint
robot.setJointValue('shoulder_pan_joint', Math.PI / 4);
```

### Web component viewer

```html
<script type="module">
  import { URDFViewer } from '@urdf/loader';
  customElements.define('urdf-viewer', URDFViewer);
</script>

<urdf-viewer
  urdf="/robots/my_robot.urdf"
  package="my_pkg: /robots/my_pkg"
  up="+Z"
  display-shadow
  style="width: 100%; height: 600px;"
></urdf-viewer>
```

### Interactive manipulator

```html
<script type="module">
  import { URDFManipulator } from '@urdf/loader';
  customElements.define('urdf-viewer', URDFManipulator);
</script>

<!-- Same attributes as URDFViewer; adds mouse drag to move joints -->
<urdf-viewer urdf="/robot.urdf" style="width:100%;height:600px;"></urdf-viewer>
```

---

## API

### `URDFLoader`

```ts
const loader = new URDFLoader();

// Options (set on the instance or passed per-call)
loader.packages      = '';        // string | { pkg: path } | (pkg) => path
loader.workingPath   = '';        // prepended to relative mesh paths
loader.parseVisual   = true;
loader.parseCollision = false;
loader.fetchOptions  = {};        // passed to fetch()

// Override mesh loading (return null to skip)
loader.loadMesh = async (path, manager) => { ... };

// Load from URL
const robot = await loader.load(url, options?);

// Parse from string/Document
const robot = loader.parse(xmlString, options?);
```

### `URDFRobot`

Extends `THREE.Object3D`. Returned by `loader.load()`.

```ts
robot.robotName                        // string
robot.joints                           // Record<string, URDFJoint>
robot.links                            // Record<string, URDFLink>
robot.frames                           // all named frames

robot.setJointValue(name, value)       // → boolean (changed?)
```

### `URDFJoint`

```ts
joint.jointType    // 'fixed' | 'revolute' | 'prismatic' | 'continuous' | 'planar' | 'floating'
joint.angle        // current value (first component)
joint.jointValue   // all components
joint.limit        // { lower, upper }
joint.ignoreLimits // boolean
joint.axis         // THREE.Vector3
joint.mimicJoints  // URDFMimicJoint[]

joint.setJointValue(...values)  // → boolean
```

### `URDFViewer` (web component)

| Attribute | Type | Default | Description |
|---|---|---|---|
| `urdf` | string | `''` | URL of the URDF file |
| `package` | string | `''` | Package path or `"name: path, ..."` map |
| `up` | string | `'+Z'` | Up axis (`+Z`, `-Z`, `+Y`, `-Y`, `+X`, `-X`) |
| `ignore-limits` | boolean | false | Ignore joint limits |
| `show-collision` | boolean | false | Show collision geometry |
| `display-shadow` | boolean | false | Cast shadows |
| `ambient-color` | string | `'#8ea0a8'` | Ambient light color |

| Event | Detail | Description |
|---|---|---|
| `urdf-change` | — | A new URDF started loading |
| `urdf-processed` | — | Robot fully loaded |
| `angle-change` | joint name | A joint value changed |
| `ignore-limits-change` | — | `ignore-limits` toggled |

```ts
viewer.robot        // URDFRobot | null
viewer.loadMesh     // override mesh loader
viewer.fitCamera()  // reframe camera to robot bounds
viewer.setJointValue(name, value)
```

### `URDFManipulator` (extends `URDFViewer`)

Adds mouse/touch drag to rotate or slide joints directly in the viewport.

| Attribute | Default | Description |
|---|---|---|
| `highlight-color` | `'#ffffff'` | Hover highlight color |
| `disable-dragging` | false | Disable joint dragging |

| Event | Detail | Description |
|---|---|---|
| `joint-mouseover` | joint name | Cursor entered a joint |
| `joint-mouseout` | joint name | Cursor left a joint |
| `manipulate-start` | joint name | Drag began |
| `manipulate-end` | joint name | Drag ended |

---

## Development

```sh
make dev          # start dev server (example app at localhost:5173)
make build        # build the npm library → dist/
make build-site   # build the demo site → docs/
make lint         # type-check
make clean        # remove dist/, docs/, node_modules/
```

---

## License

Apache-2.0
