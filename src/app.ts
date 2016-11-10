import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import PhysicsGameObject from './engine/gameobject/PhysicsGameObject';
import * as PIXI from 'pixi.js';
import Rect from './engine/physics/bodies/Rect';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

class Box extends PhysicsGameObject {

    public body: Rect;
    public view: PIXI.Graphics = new PIXI.Graphics();

    constructor(x: number, y: number, st: boolean = false) {
        super();
        this.position.x = x;
        this.position.y = y;
        this.body = new Rect();
        this.body.static = st;
        this.body.position.copy(this.position);
        this.body.size.x = 100;
        this.body.size.y = 100;
        this.view.beginFill(0x007b90);
        this.view.drawRect(0, 0, this.body.size.x, this.body.size.y);
        this.addChild(this.view);
    }
}

function getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let box = new Box(100, 100, false);
let box2 = new Box(200, 200, false);

game.stage.addChild(box, box2);