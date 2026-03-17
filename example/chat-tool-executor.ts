import type { URDFBuildController } from './build.js';
import { LIBRARY } from '../src/generators/components/index.js';
import type { ChatCallbacks } from './chat.js';

export interface ExecutorDeps {
    buildCtrl:          URDFBuildController;
    cb:                 ChatCallbacks;
    appendChat:         (el: HTMLElement) => void;
    inputEl:            HTMLTextAreaElement;
    sendBtn:            HTMLButtonElement;
    setPauseResolve:    (fn: ((aborted: boolean) => void) | null) => void;
    hideContinueButton: () => void;
    appendActionCard:   (section: string, message: string) => void;
    animateJoints:      (joints: Record<string, number>, durationMs: number) => void;
}

export async function executeTool(
    name: string,
    args: Record<string, unknown>,
    deps: ExecutorDeps,
): Promise<unknown> {
    const { buildCtrl, cb, appendChat, inputEl, sendBtn, setPauseResolve, hideContinueButton, appendActionCard } = deps;

    switch (name) {
        case 'get_robot_state': {
            const cp = buildCtrl.chassisParams;
            const wp = buildCtrl.wheelParams;
            const components = buildCtrl.getComponentEntries().map(({ id, type }) => ({
                id, type, ...buildCtrl.getComponentData(id),
            }));
            return {
                chassis: cp,
                wheels:  wp,
                casterRadius: buildCtrl.casterRadius,
                casterWidth:  buildCtrl.casterWidth,
                batteryBox:   buildCtrl.batteryBox,
                powerbank:    buildCtrl.powerbank,
                components,
            };
        }
        case 'add_component': {
            const type = args.type as string;
            if (!buildCtrl.isCatalogActive) return { error: 'No robot loaded' };
            const libEntry = LIBRARY.find(e => e.id === type);
            if (libEntry) {
                const { generate } = await libEntry.factory();
                const id = buildCtrl.addMeshComponent(libEntry.id, generate());
                cb.onComponentAdded(id, libEntry.id);
                cb.syncSlidersFromController();
                cb.refreshPaletteCounts();
                const total = buildCtrl.getComponentEntries().length;
                return { ok: true, id, total_components: total };
            }
            // Primitive component
            const id = buildCtrl.addComponent(type);
            if (!id) return { error: `Unknown component type: ${type}` };
            cb.onComponentAdded(id, type);
            cb.syncSlidersFromController();
            cb.refreshPaletteCounts();
            const total = buildCtrl.getComponentEntries().length;
            return { ok: true, id, total_components: total };
        }
        case 'remove_component': {
            const id = args.id as string;
            buildCtrl.removeComponent(id);
            cb.onComponentRemoved(id);
            cb.refreshPaletteCounts();
            return { ok: true };
        }
        case 'duplicate_component': {
            const id = args.id as string;
            const newId = buildCtrl.duplicateComponent(id);
            if (!newId) return { error: 'Could not duplicate' };
            const data = buildCtrl.getComponentData(newId);
            cb.onComponentAdded(newId, data?.type ?? '');
            cb.refreshPaletteCounts();
            return { ok: true, id: newId };
        }
        case 'update_component': {
            const { id, ...rest } = args as { id: string } & Record<string, unknown>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            buildCtrl.updateComponent(id, rest as any);
            cb.syncSlidersFromController();
            return { ok: true };
        }
        case 'undo':
            buildCtrl.undo();
            cb.syncSlidersFromController();
            return { ok: true };
        case 'redo':
            buildCtrl.redo();
            cb.syncSlidersFromController();
            return { ok: true };
        case 'update_chassis': {
            const merged = { ...buildCtrl.chassisParams, ...(args as Record<string, number>) };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            buildCtrl.updateChassis(merged as any);
            cb.syncSlidersFromController();
            const cp = buildCtrl.chassisParams;
            return { ok: true, chassis_m: cp };
        }
        case 'update_wheels': {
            const merged = { ...buildCtrl.wheelParams, ...(args as Record<string, number>) };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            buildCtrl.updateWheel(merged as any);
            cb.syncSlidersFromController();
            const wp = buildCtrl.wheelParams;
            return { ok: true, wheels_m: wp };
        }
        case 'update_caster': {
            const { radius, width } = args as { radius?: number; width?: number };
            const cur = { radius: buildCtrl.casterRadius, width: buildCtrl.casterWidth };
            buildCtrl.updateCaster(radius ?? cur.radius, width ?? cur.width);
            cb.syncSlidersFromController();
            const casterPos = buildCtrl.getJointXYZ('caster_wheel_joint');
            return { ok: true, ...(casterPos ? { joint_xyz_m: casterPos, where: casterPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
        }
        case 'update_battery_box': {
            const { l, w, h } = args as { l?: number; w?: number; h?: number };
            const cur = buildCtrl.batteryBox;
            buildCtrl.updateBatteryBox(l ?? cur.l, w ?? cur.w, h ?? cur.h);
            cb.syncSlidersFromController();
            const battPos = buildCtrl.getJointXYZ('battery_box_joint');
            return { ok: true, ...(battPos ? { joint_xyz_m: battPos, where: battPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
        }
        case 'update_powerbank': {
            const { radius, length } = args as { radius?: number; length?: number };
            const cur = buildCtrl.powerbank;
            buildCtrl.updatePowerbank(radius ?? cur.radius, length ?? cur.length);
            cb.syncSlidersFromController();
            const pbPos = buildCtrl.getJointXYZ('powerbank_joint');
            return { ok: true, ...(pbPos ? { joint_xyz_m: pbPos, where: pbPos.z < 0 ? 'under chassis' : 'above chassis' } : {}) };
        }
        case 'open_panel': {
            cb.openPanel(args.section as string);
            return { ok: true };
        }
        case 'show_gesture_hint': {
            cb.openGestureHint();
            return { ok: true };
        }
        case 'propose_adjustment': {
            appendActionCard(args.section as string, args.message as string);
            return { ok: true };
        }
        case 'read_part': {
            const filename = args.filename as string;
            const xml = await cb.readPart(filename);
            if (xml === null) return { error: `could not read ${filename}` };
            return { ok: true, xml };
        }
        case 'update_part': {
            const { filename, xml } = args as { filename: string; xml: string };
            const ok = await cb.updatePart(filename, xml);
            if (!ok) return { error: 'invalid filename or no source URL' };
            return { ok: true };
        }
        case 'init_robot': {
            const type = args.type as 'robot-car' | 'custom';
            const name = (args.name as string | undefined);
            cb.initRobot(type, name);
            return { ok: true, note: type === 'robot-car' ? 'Robot Car is loading — call pause next to let it finish.' : 'Custom robot initialized.' };
        }
        case 'highlight_part': {
            const raw = (args.joint as string) || null;
            // Accept link names too (e.g. "chassis" → "chassis_joint")
            const joints = cb.getJointNames();
            const resolved = raw && !joints.includes(raw) && joints.includes(raw + '_joint')
                ? raw + '_joint'
                : raw;
            cb.highlightPart(resolved);
            return { ok: true };
        }
        case 'pause': {
            const continueBtn = document.createElement('button');
            continueBtn.type = 'button';
            continueBtn.className = 'chat-continue-bubble';
            continueBtn.textContent = 'Continue →';
            appendChat(continueBtn);
            inputEl.disabled = true;
            sendBtn.hidden   = true;
            await new Promise<void>((resolve, reject) => {
                const handler = (aborted: boolean) => {
                    continueBtn.remove();
                    if (aborted) reject(Object.assign(new Error('AbortError'), { name: 'AbortError' }));
                    else resolve();
                };
                setPauseResolve(handler);
                continueBtn.addEventListener('click', () => handler(false));
            });
            hideContinueButton();
            const cp2 = buildCtrl.chassisParams;
            const wp2 = buildCtrl.wheelParams;
            const bb2 = buildCtrl.batteryBox;
            const pb2 = buildCtrl.powerbank;
            return {
                ok: true,
                state_mm: {
                    chassis:   { thickness: +(cp2.thickness * 1000).toFixed(2), bodyHalfWidth: +(cp2.bodyHalfWidth * 1000).toFixed(2), rearHalfWidth: +(cp2.rearHalfWidth * 1000).toFixed(2) },
                    wheels:    { radius: +(wp2.radius * 1000).toFixed(2), width: +(wp2.width * 1000).toFixed(2) },
                    caster:    { radius: +(buildCtrl.casterRadius * 1000).toFixed(2), width: +(buildCtrl.casterWidth * 1000).toFixed(2) },
                    battery:   { l: +(bb2.l * 1000).toFixed(2), w: +(bb2.w * 1000).toFixed(2), h: +(bb2.h * 1000).toFixed(2) },
                    powerbank: { radius: +(pb2.radius * 1000).toFixed(2), length: +(pb2.length * 1000).toFixed(2) },
                },
            };
        }
        case 'set_joint_value': {
            const { joint, angle, duration_ms } = args as { joint: string; angle: number; duration_ms?: number };
            deps.animateJoints({ [joint]: angle }, duration_ms ?? 600);
            return { ok: true, joint, angle };
        }
        case 'set_pose': {
            const joints = args.joints as Record<string, number>;
            const duration_ms = args.duration_ms as number | undefined;
            deps.animateJoints(joints, duration_ms ?? 600);
            return { ok: true, joints_set: Object.keys(joints).length };
        }
        default:
            return { error: `Unknown tool: ${name}` };
    }
}
