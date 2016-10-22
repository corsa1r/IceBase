import * as PIXI from 'pixi.js';
import Screen from './Screen';
import Stage from '../stage/Stage';

export default class Renderer {

    private engine: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    constructor(screen: Screen) {
        this.engine = PIXI.autoDetectRenderer(
            screen.canvas.width,
            screen.canvas.height, { view: screen.canvas }
        )
    }

    draw(stage: Stage) {
        this.engine.render(stage);
    }
}