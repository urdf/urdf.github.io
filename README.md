# @urdf/loader

Visualize, interact with, and build URDF robots in the browser.

**[Try the live demo →](https://urdf.github.io)**

---

## Demo app — urdf.github.io

A full robot development environment that runs entirely in the browser.

**AI robot builder** — describe what you want and the AI assembles the URDF for you, using tool calls to add components, set joint types, adjust positions, and configure limits. No XML required.

**URDF editor** — edit raw URDF XML with an AI pair programmer. Ask it to move a joint, add a link, or explain what a part does. Changes reflect live in the viewer.

**Gesture control** — control the viewer with your hands via MediaPipe: closed fist to orbit, point to select a joint, open palm to reset all joints, two hands to zoom.

**Component library** — drag in pre-built components: HC-SR04 ultrasonic sensor, L298N motor driver, ESP32-CAM, TT Motor, SG90 servo, Arduino Nano, MPU-6050 IMU.

**Parametric builder** — generate a robot chassis, wheels, and caster from sliders. Export as a complete URDF zip.

---

## Library — `@urdf/loader`

Load and render any ROS URDF in your own Three.js app.

```sh
npm install @urdf/loader three
```

- All joint types: fixed, revolute, prismatic, continuous, planar, floating
- Mesh formats: STL, Collada (DAE), GLTF/GLB
- Web component — drop `<urdf-viewer>` into any page, no framework needed
- Drag joints directly in the viewport with `URDFManipulator`
- Full TypeScript types, tree-shakeable

### Loader

```ts
import { URDFLoader } from '@urdf/loader';

const loader = new URDFLoader();
loader.packages = '/path/to/ros/packages'; // or { name: path } map

const robot = await loader.load('/path/to/robot.urdf');
scene.add(robot);

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

<!-- Same attributes as URDFViewer; adds mouse/touch drag to move joints -->
<urdf-viewer urdf="/robot.urdf" style="width:100%;height:600px;"></urdf-viewer>
```

---

## API

### `URDFLoader`

```ts
const loader = new URDFLoader();

loader.packages       = '';     // string | { pkg: path } | (pkg) => path
loader.workingPath    = '';     // prepended to relative mesh paths
loader.parseVisual    = true;
loader.parseCollision = false;
loader.fetchOptions   = {};     // passed to fetch()

loader.loadMesh = async (path, manager) => { ... }; // override mesh loading

const robot = await loader.load(url, options?);
const robot = loader.parse(xmlString, options?);
```

### `URDFRobot`

Extends `THREE.Object3D`. Returned by `loader.load()`.

```ts
robot.robotName                   // string
robot.joints                      // Record<string, URDFJoint>
robot.links                       // Record<string, URDFLink>
robot.frames                      // all named frames
robot.setJointValue(name, value)  // → boolean (changed?)
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

### `URDFViewer` attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `urdf` | string | `''` | URL of the URDF file |
| `package` | string | `''` | Package path or `"name: path, ..."` map |
| `up` | string | `'+Z'` | Up axis: `+Z`, `-Z`, `+Y`, `-Y`, `+X`, `-X` |
| `ignore-limits` | boolean | false | Ignore joint limits |
| `show-collision` | boolean | false | Show collision geometry |
| `display-shadow` | boolean | false | Cast shadows |
| `ambient-color` | string | `'#8ea0a8'` | Ambient light color |

| Event | Detail | Description |
|---|---|---|
| `urdf-change` | — | New URDF started loading |
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

Adds mouse/touch drag to rotate or slide joints in the viewport.

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
make dev          # start dev server (localhost:5173)
make build        # build the npm library → dist/
make build-site   # build the demo site → docs/
make lint         # type-check
make clean        # remove dist/, docs/, node_modules/
```

---

## License

Apache-2.0
