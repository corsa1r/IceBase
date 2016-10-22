import * as PIXI from 'pixi.js';

export default class Point extends PIXI.Point {

    constructor(x?: number, y?: number) {
        super(x, y);
    }

    distance(b: Point): Number {
        return Math.sqrt(Math.pow((b.x - this.x), 2) + Math.pow((b.y - this.y), 2));
    }

    sub(x: number, y: number): Point {
        this.x -= x;
        this.y -= y;
        return this;
    }

    sum(x: number, y: number): Point {
        this.x += x;
        this.y += y;
        return this;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}