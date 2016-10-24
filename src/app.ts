import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import * as PIXI from 'pixi.js';
import Point from './engine/math/Point';
import iInternalEvent from './engine/input/interface/iInternalEvent';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

class Player extends GameObject {

    private view: PIXI.Graphics;
    private ms: number = 3;

    constructor() {
        super();

        this.view = new PIXI.Graphics();
        this.view.beginFill(0x007b90);
        this.view.drawRect(0, 0, 50, 50);
        this.view.endFill();
        this.addChild(this.view);
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
        this.position.x = 100;
        this.position.y = 100;
    }

    key(event: iInternalEvent): Player {
        this.states[event.name] = event.state;
        return this;
    }

    update(delta: number): GameObject {
        if (this.states['A']) {
            this.rotation -= 0.1;
            this.position.x -= this.ms;
        }

        if (this.states['D']) {
            this.rotation += 0.1;
            this.position.x += this.ms;
        }

        if (this.states['W']) {
            this.rotation -= 0.1;
            this.position.y -= this.ms;
        }

        if (this.states['S']) {
            this.rotation += 0.1;
            this.position.y += this.ms;
        }

        return this;
    }
}

game.stage.addChild(new Player());