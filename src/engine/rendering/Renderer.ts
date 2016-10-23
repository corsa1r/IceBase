import * as PIXI from 'pixi.js';
import Screen from './Screen';
import Stage from '../stage/Stage';

export default class Renderer {

    private engine: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private screen: Screen;

    constructor(screen: Screen) {
        this.screen = screen;
        this.engine = PIXI.autoDetectRenderer(
            this.screen.canvas.width,
            this.screen.canvas.height, {
                view: this.screen.canvas,
                antialias: true
            }
        )
        this.resize(this.screen.canvas.width, this.screen.canvas.height);
    }

    draw(stage: Stage): Renderer {
        this.engine.render(stage);
        return this;
    }

    resize(width: number, height: number): Renderer {
        this.screen.resize(width, height);
        this.engine.resize(this.screen.size.x, this.screen.size.y);
        return this;
    }
}