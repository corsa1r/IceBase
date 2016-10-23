import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import * as PIXI from 'pixi.js';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

window['camera'] = game.camera;

class Box extends GameObject {
    private ground: boolean;
    constructor(c: number, w: number, h: number, ground: boolean = false) {
        super();
        this.ground = ground;
        let box = new PIXI.Graphics();
        box.beginFill(c);
        box.drawRect(0, 0, w, h);
        box.endFill();

        this.addChild(box);
        this.setDraggable(true);
    }

    update(delta: number) {
        if (!this.ground) {
            if (!this.draggableData.dragging) {
                this.position.y += 1;
            }
            if (this.position.y > 300) {
                this.position.y = 300;
            }
        }
        return this;
    }
}

let box = new Box(0x007b90, 100, 100);
let ground = new Box(0x997b10, 500, 10, true);
ground.position.y = 400;
game.stage.addChild(box);
game.stage.addChild(ground);

game.camera.follow(box);

setInterval(() => {
    game.camera.sees(ground);
}, 100)