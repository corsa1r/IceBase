import * as EventEmitter from 'eventemitter3';

export default class Ticker extends EventEmitter {

    private lastTime: number | null;
    private delta: number = 0;
    private running: boolean = false;


    constructor() {
        super();
        this.start();
        requestAnimationFrame(this.tick.bind(this));
    }

    toggle(): Ticker {
        if (this.isRunning()) {
            return this.stop();
        }
        return this.start();
    }

    start(): Ticker {
        if (!this.running) {
            this.running = true;
            this.lastTime = Date.now();
        }
        return this;
    }

    stop(): Ticker {
        if (this.running) {
            this.running = false;
        }
        return this;
    }

    isRunning(): boolean {
        return this.running;
    }

    private tick() {
        requestAnimationFrame(this.tick.bind(this));
        if (!this.isRunning()) return this;
        let now = Date.now();
        let delta = (now - this.lastTime) / 1000;
        this.lastTime = now;
        this.emit(Ticker.EVENTS.TICK, delta);
    }

    static EVENTS = {
        TICK: 'tick'
    }
}