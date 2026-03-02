import {
    Euler,
    Matrix4,
    Object3D,
    Quaternion,
    Vector3,
} from 'three';

// ─── Shared temp objects ────────────────────────────────────────────────────

const _axis = new Vector3();
const _euler = new Euler();
const _mat = new Matrix4();
const _origMat = new Matrix4();
const _quat = new Quaternion();
const _pos = new Vector3();
const _scale = new Vector3(1, 1, 1);

// ─── Joint types ─────────────────────────────────────────────────────────────

export type JointType =
    | 'fixed'
    | 'continuous'
    | 'revolute'
    | 'prismatic'
    | 'planar'
    | 'floating';

// ─── Base ────────────────────────────────────────────────────────────────────

export class URDFBase extends Object3D {
    urdfNode: Element | null = null;
    urdfName = '';

    override copy(source: this, recursive?: boolean): this {
        super.copy(source, recursive);
        this.urdfNode = source.urdfNode;
        this.urdfName = source.urdfName;
        return this;
    }
}

// ─── Structural nodes ────────────────────────────────────────────────────────

export class URDFCollider extends URDFBase {
    readonly isURDFCollider = true;
    override type = 'URDFCollider';
}

export class URDFVisual extends URDFBase {
    readonly isURDFVisual = true;
    override type = 'URDFVisual';
}

export class URDFLink extends URDFBase {
    readonly isURDFLink = true;
    override type = 'URDFLink';
}

// ─── Joint ───────────────────────────────────────────────────────────────────

export class URDFJoint extends URDFBase {
    readonly isURDFJoint = true;
    override type = 'URDFJoint';

    jointValue: number[] = [];
    axis = new Vector3(1, 0, 0);
    limit = { lower: 0, upper: 0 };
    ignoreLimits = false;
    mimicJoints: URDFMimicJoint[] = [];

    origPosition: Vector3 | null = null;
    origQuaternion: Quaternion | null = null;

    private _jointType: JointType = 'fixed';

    get jointType(): JointType {
        return this._jointType;
    }

    set jointType(v: JointType) {
        if (this._jointType === v) return;
        this._jointType = v;
        this.matrixWorldNeedsUpdate = true;

        switch (v) {
            case 'fixed':
                this.jointValue = [];
                break;
            case 'continuous':
            case 'revolute':
            case 'prismatic':
                this.jointValue = [0];
                break;
            case 'planar':
                this.jointValue = [0, 0, 0];
                this.axis = new Vector3(0, 0, 1);
                break;
            case 'floating':
                this.jointValue = [0, 0, 0, 0, 0, 0];
                break;
        }
    }

    get angle(): number {
        return this.jointValue[0] ?? 0;
    }

    override copy(source: this, recursive?: boolean): this {
        super.copy(source, recursive);
        this.jointType = source.jointType;
        this.axis = source.axis.clone();
        this.limit = { ...source.limit };
        this.ignoreLimits = false;
        this.jointValue = [...source.jointValue];
        this.origPosition = source.origPosition?.clone() ?? null;
        this.origQuaternion = source.origQuaternion?.clone() ?? null;
        this.mimicJoints = [...source.mimicJoints];
        return this;
    }

    /**
     * Sets the joint value(s). Pass `null` for a component to leave it unchanged.
     * Returns `true` if the joint actually moved.
     */
    setJointValue(...values: (number | null)[]): boolean {
        const nums = values.map(v => (v === null ? null : Number(v)));

        if (!this.origPosition || !this.origQuaternion) {
            this.origPosition = this.position.clone();
            this.origQuaternion = this.quaternion.clone();
        }

        let changed = false;
        for (const mimic of this.mimicJoints) {
            changed = mimic.updateFromMimicked(...nums) || changed;
        }

        switch (this.jointType) {
            case 'fixed':
                return changed;

            case 'continuous':
            case 'revolute': {
                let angle = nums[0];
                if (angle === null) return changed;
                if (!this.ignoreLimits && this.jointType === 'revolute') {
                    angle = Math.min(this.limit.upper, Math.max(this.limit.lower, angle));
                }
                if (angle === this.jointValue[0]) return changed;
                this.quaternion
                    .setFromAxisAngle(this.axis, angle)
                    .premultiply(this.origQuaternion);
                this.jointValue[0] = angle;
                this.matrixWorldNeedsUpdate = true;
                return true;
            }

            case 'prismatic': {
                let pos = nums[0];
                if (pos === null) return changed;
                if (!this.ignoreLimits) {
                    pos = Math.min(this.limit.upper, Math.max(this.limit.lower, pos));
                }
                if (pos === this.jointValue[0]) return changed;
                this.position.copy(this.origPosition);
                _axis.copy(this.axis).applyEuler(this.rotation);
                this.position.addScaledVector(_axis, pos);
                this.jointValue[0] = pos;
                this.matrixWorldNeedsUpdate = true;
                return true;
            }

            case 'floating': {
                const same = this.jointValue.every(
                    (v, i) => nums[i] === v || nums[i] === null,
                );
                if (same) return changed;
                for (let i = 0; i < 6; i++) {
                    if (nums[i] !== null) this.jointValue[i] = nums[i]!;
                }
                _origMat.compose(this.origPosition, this.origQuaternion, _scale);
                _quat.setFromEuler(
                    _euler.set(this.jointValue[3], this.jointValue[4], this.jointValue[5], 'XYZ'),
                );
                _pos.set(this.jointValue[0], this.jointValue[1], this.jointValue[2]);
                _mat.compose(_pos, _quat, _scale);
                _origMat.premultiply(_mat);
                this.position.setFromMatrixPosition(_origMat);
                this.rotation.setFromRotationMatrix(_origMat);
                this.matrixWorldNeedsUpdate = true;
                return true;
            }

            case 'planar': {
                const same = this.jointValue.every(
                    (v, i) => nums[i] === v || nums[i] === null,
                );
                if (same) return changed;
                for (let i = 0; i < 3; i++) {
                    if (nums[i] !== null) this.jointValue[i] = nums[i]!;
                }
                _origMat.compose(this.origPosition, this.origQuaternion, _scale);
                _quat.setFromAxisAngle(this.axis, this.jointValue[2]);
                _pos.set(this.jointValue[0], this.jointValue[1], 0);
                _mat.compose(_pos, _quat, _scale);
                _origMat.premultiply(_mat);
                this.position.setFromMatrixPosition(_origMat);
                this.rotation.setFromRotationMatrix(_origMat);
                this.matrixWorldNeedsUpdate = true;
                return true;
            }
        }

        return changed;
    }
}

// ─── Mimic joint ─────────────────────────────────────────────────────────────

export class URDFMimicJoint extends URDFJoint {
    override type = 'URDFMimicJoint';

    mimicJoint = '';
    multiplier = 1;
    offset = 0;

    updateFromMimicked(...values: (number | null)[]): boolean {
        return super.setJointValue(
            ...values.map(v => (v === null ? null : v * this.multiplier + this.offset)),
        );
    }

    override copy(source: this, recursive?: boolean): this {
        super.copy(source, recursive);
        this.mimicJoint = source.mimicJoint;
        this.multiplier = source.multiplier;
        this.offset = source.offset;
        return this;
    }
}

// ─── Robot ───────────────────────────────────────────────────────────────────

export class URDFRobot extends URDFLink {
    readonly isURDFRobot = true;
    override type = 'URDFRobot';

    robotName = '';
    urdfRobotNode: Element | null = null;

    links: Record<string, URDFLink> = {};
    joints: Record<string, URDFJoint> = {};
    colliders: Record<string, URDFCollider> = {};
    visual: Record<string, URDFVisual> = {};
    frames: Record<string, URDFBase> = {};

    override copy(source: this, recursive?: boolean): this {
        super.copy(source, recursive);
        this.robotName = source.robotName;
        this.urdfRobotNode = source.urdfRobotNode;

        this.links = {};
        this.joints = {};
        this.colliders = {};
        this.visual = {};

        this.traverse(c => {
            const node = c as URDFBase;
            if ((node as URDFJoint).isURDFJoint && node.urdfName in source.joints) {
                this.joints[node.urdfName] = node as URDFJoint;
            }
            if ((node as URDFLink).isURDFLink && node.urdfName in source.links) {
                this.links[node.urdfName] = node as URDFLink;
            }
            if ((node as URDFCollider).isURDFCollider && node.urdfName in source.colliders) {
                this.colliders[node.urdfName] = node as URDFCollider;
            }
            if ((node as URDFVisual).isURDFVisual && node.urdfName in source.visual) {
                this.visual[node.urdfName] = node as URDFVisual;
            }
        });

        // Repair mimic joint references after copying
        for (const joint of Object.values(this.joints)) {
            joint.mimicJoints = joint.mimicJoints.map(m => this.joints[m.name] as URDFMimicJoint);
        }

        this.frames = { ...this.colliders, ...this.visual, ...this.links, ...this.joints };
        return this;
    }

    getFrame(name: string): URDFBase | undefined {
        return this.frames[name];
    }

    setJointValue(name: string, ...values: (number | null)[]): boolean {
        return this.joints[name]?.setJointValue(...values) ?? false;
    }

    setJointValues(values: Record<string, number | number[]>): boolean {
        let changed = false;
        for (const [name, value] of Object.entries(values)) {
            const result = Array.isArray(value)
                ? this.setJointValue(name, ...value)
                : this.setJointValue(name, value);
            changed = result || changed;
        }
        return changed;
    }
}
