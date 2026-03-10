import type { URDFManipulator } from '../src/index.js';
import type { MuJoCoSimulator } from './simulator.js';
import type { SimSource } from './robot-loader.js';

export interface SimControllerOptions {
    simulator:    MuJoCoSimulator;
    viewer:       URDFManipulator;
    playBtn:      HTMLButtonElement;
    stopBtn:      HTMLButtonElement;
    resetBtn:     HTMLButtonElement;
    statusEl:     HTMLElement;
    floatBaseEl:  HTMLInputElement;
    speedEl:      HTMLInputElement;
}

type SimState = 'idle' | 'loading' | 'running' | 'stopped' | 'error';

/**
 * SimController wires the MuJoCoSimulator to the simulation toolbar in the
 * Inspect tab. It owns play / stop / reset state and keeps the toolbar UI in
 * sync with the simulator lifecycle.
 */
export class SimController {
    private readonly _sim:       MuJoCoSimulator;
    private readonly _viewer:    URDFManipulator;
    private readonly _playBtn:   HTMLButtonElement;
    private readonly _stopBtn:   HTMLButtonElement;
    private readonly _resetBtn:  HTMLButtonElement;
    private readonly _statusEl:  HTMLElement;
    private readonly _floatBase: HTMLInputElement;
    private readonly _speedEl:   HTMLInputElement;

    private _source:    SimSource | null = null;
    private _state:     SimState = 'idle';

    constructor(opts: SimControllerOptions) {
        this._sim       = opts.simulator;
        this._viewer    = opts.viewer;
        this._playBtn   = opts.playBtn;
        this._stopBtn   = opts.stopBtn;
        this._resetBtn  = opts.resetBtn;
        this._statusEl  = opts.statusEl;
        this._floatBase = opts.floatBaseEl;
        this._speedEl   = opts.speedEl;

        this._playBtn.addEventListener('click',  () => void this.play());
        this._stopBtn.addEventListener('click',  () => this.stop());
        this._resetBtn.addEventListener('click', () => void this.reset());
    }

    /** Call when a new robot is loaded. Stops any running simulation. */
    setSource(source: SimSource | null): void {
        this._sim.stop();
        document.body.classList.remove('simulating');
        this._viewer.disableDragging = false;
        this._source = source;
        this._setState('idle');
    }

    async play(): Promise<void> {
        if (this._state === 'running') return;
        if (!this._source) return;

        this._setState('loading');
        try {
            const floatBase = this._floatBase.checked;
            const src = this._source;
            if (src.kind === 'xml') {
                await this._sim.loadFromXML(src.xml, src.base, '', floatBase);
            } else {
                await this._sim.load(src.urdfUrl, src.pkgStr, floatBase);
            }
            if (!this._viewer.robot) {
                this._setState('error', 'No robot loaded');
                return;
            }
            this._sim.start(this._viewer.robot, () => this._viewer.redraw());
            this._viewer.disableDragging = true;
            document.body.classList.add('simulating');
            this._setState('running');
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this._setState('error', msg);
            console.error('[SimController]', err);
        }
    }

    stop(): void {
        this._sim.stop();
        document.body.classList.remove('simulating');
        this._viewer.disableDragging = false;
        this._setState('stopped');
    }

    async reset(): Promise<void> {
        this.stop();
        this._setState('idle');
    }

    private _setState(state: SimState, errorMsg?: string): void {
        this._state = state;

        // Update button visibility
        const running = state === 'running';
        this._playBtn.hidden = running;
        this._stopBtn.hidden = !running;

        // Update status label
        this._statusEl.className = 'sim-status';
        switch (state) {
            case 'idle':
                this._statusEl.textContent = 'Ready';
                break;
            case 'loading':
                this._statusEl.textContent = 'Loading…';
                break;
            case 'running':
                this._statusEl.textContent = 'Running';
                this._statusEl.classList.add('running');
                break;
            case 'stopped':
                this._statusEl.textContent = 'Stopped';
                break;
            case 'error':
                this._statusEl.textContent = errorMsg ?? 'Error';
                this._statusEl.classList.add('error');
                break;
        }
    }
}
