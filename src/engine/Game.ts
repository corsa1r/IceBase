import Screen from './rendering/Screen';
import Renderer from './rendering/Renderer';
import Ticker from './time/Ticker';
import Stage from './stage/Stage';
import Camera from './rendering/Camera';

export default class Game {

    public screen: Screen;
    public renderer: Renderer;
    public ticker: Ticker;
    public stage: Stage;
    public camera: Camera;

    constructor(canvas: HTMLCanvasElement) {
        this.screen = new Screen(canvas);
        this.camera = new Camera(this.screen);
        this.renderer = new Renderer(this.screen);
        this.stage = new Stage(this.camera);
        this.stage.addChild(this.camera);
        this.ticker = new Ticker(Ticker.DEFAULTS.FPS);
        this.ticker.on(Ticker.EVENTS.TICK, (delta: number) => this.tick(delta));
    }

    private tick(delta: number) {
        this.stage.position = this.camera.position;
        this.stage.update(delta);
        this.renderer.draw(this.stage);
    }
}