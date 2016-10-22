import GameObject from './engine/gameobject/GameObject';
import Game from './engine/Game';
import * as PIXI from 'pixi.js';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

class Node extends GameObject {

    constructor(color: number) {
        super();

        this.setDraggable();

        let rect = new PIXI.Graphics();
        rect.beginFill(color);
        rect.drawRect(0, 0, 200, 70);
        rect.endFill();
        this.addChild(rect);
    }

    dragstart() {
        this.alpha = 0.5;
    }

    dragend() {
        this.alpha = 1;
    }
}

let n1 = new Node(0x90EE90);
let n2 = new Node(0x007b90);

n2.position.x = 300;
n2.position.y = 100;

game.stage.addChild(n1, n2);
game.ticker.scale(50);