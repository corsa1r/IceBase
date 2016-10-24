import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import * as PIXI from 'pixi.js';
import Point from './engine/math/Point';
import iInternalEvent from './engine/input/interface/iInternalEvent';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

class Ground extends GameObject {

    private view: PIXI.Graphics;

    constructor() {
        super();

        this.view = new PIXI.Graphics();
        this.view.beginFill(0x006800);
        this.view.drawRect(0, 0, 10000, 5);
        this.view.endFill();
        this.addChild(this.view);
        this.position.x = -5000;
        this.position.y = 440;
    }
}

class Player extends GameObject {

    private view: PIXI.Graphics;
    private ground: Ground;
    private velocity: Point = new Point();
    private grounded: boolean = false;

    constructor(ground: Ground) {
        super();
        this.ground = ground;
        this.view = new PIXI.Graphics();
        this.view.beginFill(0x686800);
        this.view.drawRect(0, 0, 68, 150);
        this.view.endFill();
        this.addChild(this.view);
    }

    update(delta: number) {
        this.velocity.sum(0, 0.2);
        this.position.y += this.velocity.y;
        this.grounded = false;

        if (this.position.y + this.height > this.ground.position.y) {
            this.position.y = this.ground.position.y - this.height;
            this.velocity.set(0, 0);
            this.grounded = true;
        }

        if(this.states['A']) {
            this.position.x -= 5;
        }

        if(this.states['D']) {
            this.position.x += 5;
        }

        return this;
    }

    key(event: iInternalEvent) {
        this.states[event.name] = event.state;
        return this;
    }

    keydown(event: iInternalEvent) {
        if(event.name === 'SPACE' && this.grounded) {
            this.velocity.y -= 10;
        }
        return this;
    }
}

let ground = new Ground();
let player = new Player(ground);

game.stage.addChild(ground);
game.stage.addChild(player);
game.camera.follow(player, 0.3);