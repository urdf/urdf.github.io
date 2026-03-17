import type { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';

export interface ToolsDeps {
    buildCtrl:      URDFBuildController;
    guide:          boolean;
    isGestureActive: () => boolean;
    getPartsList:   () => string[];
}

export interface JointInfo { type: string; lower: number; upper: number; }

export function buildJointTools(
    getJointLimits: () => Record<string, JointInfo>,
): object[] {
    const limits   = getJointLimits();
    const moveable = Object.entries(limits).filter(([, v]) => v.type !== 'fixed');
    if (moveable.length === 0) return [];

    const jointDesc = moveable
        .map(([name, v]) => {
            const range = v.type === 'continuous'
                ? 'continuous'
                : `${v.lower.toFixed(3)}..${v.upper.toFixed(3)} rad`;
            return `${name} (${range})`;
        })
        .join(', ');

    return [
        {
            name: 'set_joint_value',
            description: 'Animate a single joint to a specific angle in radians. Clamped to joint limits automatically.',
            input_schema: {
                type: 'object',
                properties: {
                    joint:       { type: 'string', description: `Joint name. Available: ${jointDesc}` },
                    angle:       { type: 'number', description: 'Target angle in radians.' },
                    duration_ms: { type: 'number', description: 'Animation duration in ms (default 600). Use 0 for instant.' },
                },
                required: ['joint', 'angle'],
            },
        },
        {
            name: 'set_pose',
            description: 'Animate multiple joints to express a pose ("fist", "peace sign", "point", etc.). All angles in radians.',
            input_schema: {
                type: 'object',
                properties: {
                    joints: {
                        type: 'object',
                        description: 'Map of joint name → target angle in radians. Only include joints to change.',
                        additionalProperties: { type: 'number' },
                    },
                    duration_ms: { type: 'number', description: 'Animation duration in ms (default 600). Use 0 for instant.' },
                },
                required: ['joints'],
            },
        },
    ];
}

export function buildTools(deps: ToolsDeps): object[] {
    const { buildCtrl, guide, isGestureActive, getPartsList } = deps;

    if (!buildCtrl.isCatalogActive) return [];

    const compTypes = Object.keys(
        // dynamically import the catalog at runtime to avoid circular deps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (buildCtrl as any)._catalog ?? {}
    );
    const libTypes = LIBRARY.map(e => e.id);
    const allTypes = [...new Set([...compTypes, ...libTypes])];

    const tools: object[] = [
        {
            name: 'get_robot_state',
            description: 'Returns current chassis dimensions, wheel params, and all added components.',
            input_schema: { type: 'object', properties: {} },
        },
        {
            name: 'add_component',
            description: 'Add a component to the robot. Use library types for 3D mesh components.',
            input_schema: {
                type: 'object',
                properties: {
                    type:   { type: 'string', description: `Component type. Library types: ${libTypes.join(', ')}` },
                    parent: { type: 'string', description: 'Parent link name (default: base_link)' },
                },
                required: ['type'],
            },
        },
        {
            name: 'remove_component',
            description: 'Remove a component by id.',
            input_schema: {
                type: 'object',
                properties: { id: { type: 'string', description: 'Component id, e.g. hcsr04_1' } },
                required: ['id'],
            },
        },
        {
            name: 'duplicate_component',
            description: 'Duplicate an existing component.',
            input_schema: {
                type: 'object',
                properties: { id: { type: 'string' } },
                required: ['id'],
            },
        },
        {
            name: 'update_component',
            description: 'Update position, rotation, size, or joint of a component. Positions in metres, angles in radians.',
            input_schema: {
                type: 'object',
                properties: {
                    id:   { type: 'string', description: 'Component id' },
                    x:    { type: 'number', description: 'URDF X position (m). −X = front' },
                    y:    { type: 'number', description: 'URDF Y position (m). +Y = right' },
                    z:    { type: 'number', description: 'URDF Z position (m). +Z = up' },
                    rx:   { type: 'number', description: 'Roll (rad)' },
                    ry:   { type: 'number', description: 'Pitch (rad)' },
                    rz:   { type: 'number', description: 'Yaw (rad)' },
                    jointType: { type: 'string', enum: ['fixed', 'continuous', 'revolute', 'prismatic'] },
                    parent: { type: 'string' },
                },
                required: ['id'],
            },
        },
        {
            name: 'undo',
            description: 'Undo the last build action.',
            input_schema: { type: 'object', properties: {} },
        },
        {
            name: 'redo',
            description: 'Redo the last undone build action.',
            input_schema: { type: 'object', properties: {} },
        },
        {
            name: 'update_chassis',
            description: 'Update chassis dimensions. All values in metres.',
            input_schema: {
                type: 'object',
                properties: {
                    thickness:     { type: 'number', description: 'Plate thickness (m)' },
                    bodyHalfWidth: { type: 'number', description: 'Half-width of the main body (m)' },
                    rearHalfWidth: { type: 'number', description: 'Half-width of the rear section (m)' },
                },
            },
        },
        {
            name: 'update_wheels',
            description: 'Update drive-wheel dimensions. All values in metres.',
            input_schema: {
                type: 'object',
                properties: {
                    radius: { type: 'number', description: 'Wheel radius (m)' },
                    width:  { type: 'number', description: 'Wheel width (m)' },
                },
            },
        },
        {
            name: 'update_caster',
            description: 'Update caster wheel dimensions. All values in metres.',
            input_schema: {
                type: 'object',
                properties: {
                    radius: { type: 'number', description: 'Caster sphere radius (m)' },
                    width:  { type: 'number', description: 'Caster width (m)' },
                },
            },
        },
        {
            name: 'update_battery_box',
            description: 'Update battery box dimensions (length, width, height in metres).',
            input_schema: {
                type: 'object',
                properties: {
                    l: { type: 'number', description: 'Length (m)' },
                    w: { type: 'number', description: 'Width (m)' },
                    h: { type: 'number', description: 'Height (m)' },
                },
            },
        },
        {
            name: 'update_powerbank',
            description: 'Update powerbank cylinder dimensions (radius and length in metres).',
            input_schema: {
                type: 'object',
                properties: {
                    radius: { type: 'number', description: 'Cylinder radius (m)' },
                    length: { type: 'number', description: 'Cylinder length (m)' },
                },
            },
        },
        {
            name: 'open_panel',
            description: 'Open a floating control panel over the 3D viewer so the user can fine-tune a specific section while watching the robot update live. Use this before calling pause to give the user something to interact with.',
            input_schema: {
                type: 'object',
                properties: {
                    section: {
                        type: 'string',
                        enum: ['chassis', 'wheels', 'caster', 'battery', 'powerbank'],
                        description: 'Which parametric section to open.',
                    },
                },
                required: ['section'],
            },
        },
    ];

    if (isGestureActive()) {
        tools.push({
            name: 'show_gesture_hint',
            description: 'Open a floating gesture reference card over the 3D viewer. Use this instead of writing a gesture list in chat. Call it once early in the conversation so the user has a persistent reference.',
            input_schema: { type: 'object', properties: {} },
        });
    }

    const parts = getPartsList();
    if (parts.length > 0) {
        tools.push(
            {
                name: 'read_part',
                description: 'Read the XML of a URDF part file. Use before editing to see current content.',
                input_schema: {
                    type: 'object',
                    properties: {
                        filename: { type: 'string', description: `Part filename. Available: ${parts.join(', ')}` },
                    },
                    required: ['filename'],
                },
            },
            {
                name: 'update_part',
                description:
                    'Write a URDF part file (link + joint elements only, no <robot> wrapper). ' +
                    'Use to change colors (<material><color rgba="r g b a"/>), geometry, or add new links.',
                input_schema: {
                    type: 'object',
                    properties: {
                        filename: { type: 'string', description: 'Part filename to write' },
                        xml:      { type: 'string', description: 'Complete content of this part file' },
                    },
                    required: ['filename', 'xml'],
                },
            },
        );
    }

    if (guide) {
        tools.push(
            {
                name: 'init_robot',
                description: 'Load a robot to work with. Call this before starting the guided tour/build when the workspace is empty.',
                input_schema: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', enum: ['robot-car', 'custom'], description: '"robot-car" loads the Robot Car; "custom" starts a blank chassis' },
                        name: { type: 'string', description: 'Name for a custom robot (only used when type is "custom")' },
                    },
                    required: ['type'],
                },
            },
            {
                name: 'highlight_part',
                description: 'Select and highlight a robot part in the 3D viewer.',
                input_schema: {
                    type: 'object',
                    properties: {
                        joint: { type: 'string', description: 'Joint name (e.g. "wheel_left_joint"), or empty string to clear.' },
                    },
                    required: ['joint'],
                },
            },
            {
                name: 'pause',
                description: 'Call at the END of each step (after your text explanation and highlight_part) to wait for the user to click Continue. Never call this before writing your step explanation.',
                input_schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', description: 'Optional context for the user.' },
                    },
                },
            },
            {
                name: 'propose_adjustment',
                description: 'Show an actionable suggestion card in the chat with an Open Panel button. Use after observing state_mm when a dimension is noteworthy — physically implausible, mechanically interesting, or very different from the real part. Do not call if the values are fine.',
                input_schema: {
                    type: 'object',
                    properties: {
                        section: {
                            type: 'string',
                            enum: ['chassis', 'wheels', 'caster', 'battery', 'powerbank'],
                            description: 'Which section to offer to open.',
                        },
                        message: {
                            type: 'string',
                            description: 'Brief educational observation (1–2 sentences). No preamble.',
                        },
                    },
                    required: ['section', 'message'],
                },
            },
        );
    }

    void allTypes; // suppress unused warning — types used in descriptions above
    return tools;
}
