import Screen from './rendering/Screen';
import Renderer from './rendering/Renderer';
import Ticker from './time/Ticker';
import Stage from './stage/Stage';

export default class Game {

    public screen: Screen;
    public renderer: Renderer;
    public ticker: Ticker;
    public stage: Stage;

    constructor(canvas: HTMLCanvasElement) {
        this.screen = new Screen(canvas);
        this.renderer = new Renderer(this.screen);
        this.stage = new Stage();
        this.ticker = new Ticker(Ticker.DEFAULTS.FPS);
        this.ticker.on(Ticker.EVENTS.TICK, (delta: number) => this.tick(delta));
    }

    private tick(delta: number) {
        this.stage.update(delta);
        this.renderer.draw(this.stage);
    }
}