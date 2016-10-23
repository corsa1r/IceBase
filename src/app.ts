import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import * as PIXI from 'pixi.js';
import Point from './engine/math/Point';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

class Ball extends GameObject {

    private graphics: PIXI.Graphics;
    private canvas: HTMLCanvasElement;
    private velocity: Point;
    private directions: Point;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.position.x = 100;
        this.position.y = 100;
        this.velocity = new Point(2, 3);
        this.directions = new Point(1, 1);
        this.canvas = canvas;
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x007b90);
        this.graphics.drawCircle(0, 0, 50);
        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    update(delta: number) {
        this.position.x += this.velocity.x * this.directions.x;
        this.position.y += this.velocity.y * this.directions.y;

        if (this.position.x + this.width / 2 > this.canvas.width) {
            this.directions.x *= -1;
            this.velocity.x += 1;
        }
        if (this.position.x - this.width / 2 < 0) {
            this.directions.x *= -1;
            this.velocity.x += 1;
        }
        if (this.position.y + this.height / 2 > this.canvas.height) {
            this.directions.y *= -1;
            this.velocity.y += 1;
        }
        if (this.position.y - this.height / 2 < 0) {
            this.directions.y *= -1;
            this.velocity.y += 1;
        }
        return this;
    }

}

game.stage.addChild(new Ball(game.screen.canvas));