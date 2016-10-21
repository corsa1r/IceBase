import EventEmitter from '../events/EventEmitter';

export default class Ticker extends EventEmitter {

    private clockId: number | null;
    private lastTime: number | null;
    private delta: number = 0;

    constructor(private fps: number = 1000 / 60) {
        super();
    }

    start(): Ticker {
        if (this.clockId) return this;
        this.delta = 0;
        this.lastTime = Date.now();
        this.clockId = setInterval(() => this.tick(), this.fps);
        this.emit(Ticker.EVENTS.START, this.lastTime);
        return this;
    }

    stop(): Ticker {
        if (!this.clockId) return this;
        clearInterval(this.clockId);
        this.clockId = null;
        this.emit(Ticker.EVENTS.STOP, this.lastTime);
        return this;
    }

    private tick() {
        let now: number = Date.now();
        let delta = (now - this.lastTime) / 1000;
        this.lastTime = now;
        this.emit(Ticker.EVENTS.TICK, delta);
    }

    static EVENTS = {
        TICK: 'tick',
        START: 'start',
        STOP: 'stop'
    };
}