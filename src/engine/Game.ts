import iInternalEvent from './input/interface/iInternalEvent';

import Screen from './rendering/Screen';
import Renderer from './rendering/Renderer';
import Ticker from './time/Ticker';
import Stage from './stage/Stage';
import Camera from './rendering/Camera';

import Keyboard from './input/Keyboard';

export default class Game {

    public screen: Screen;
    public renderer: Renderer;
    public ticker: Ticker;
    public stage: Stage;
    public camera: Camera;
    public keyboard: Keyboard;

    constructor(canvas: HTMLCanvasElement) {
        this.screen = new Screen(canvas);
        this.camera = new Camera(this.screen);
        this.renderer = new Renderer(this.screen);
        this.stage = new Stage(this.camera);
        this.keyboard = new Keyboard();
        this.keyboard.broadcast(this.stage);
        this.stage.addChild(this.camera);
        this.ticker = new Ticker();
        this.ticker.on(Ticker.EVENTS.TICK, (delta: number) => this.tick(delta));
    }

    private tick(delta: number) {
        this.stage.position = this.camera.position;
        this.stage.update(delta);
        this.renderer.draw(this.stage);
    }
}