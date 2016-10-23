import * as PIXI from 'pixi.js';

export default class Point extends PIXI.Point {

    constructor(x?: number, y?: number) {
        super(x, y);
    }

    distance(b: Point): Number {
        return Math.sqrt(Math.pow((b.x - this.x), 2) + Math.pow((b.y - this.y), 2));
    }

    sub(x: number | Point, y?: number): Point {
        if (x instanceof Point) {
            return this.sub(x.x, x.y);
        } else {
            this.x -= x;
            this.y -= isNaN(y) ? 0 : y;
        }
        return this;
    }

    sum(x: number | Point, y?: number): Point {
        if (x instanceof Point) {
            return this.sum(x.x, x.y);
        } else {
            this.x += x;
            this.y += isNaN(y) ? 0 : y;
        }
        return this;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    dev(by: number): Point {
        this.x /= by;
        this.y /= by;
        return this;
    }

    mul(by: number): Point {
        this.x *= by;
        this.y *= by;
        return this;
    }

    toInt(): Point {
        this.x = this.x >> 0;
        this.y = this.x >> 0;
        return this;
    }

    lerpX(to: number, mul: number = 1): number {
        mul = mul < 0 ? 0 : mul;
        mul = mul > 1 ? 1 : mul;
        return this.x + (to - this.x) * mul;
    }

    lerpY(to: number, mul: number = 1): number {
        mul = mul < 0 ? 0 : mul;
        mul = mul > 1 ? 1 : mul;
        return this.y + (to - this.y) * mul;
    }

    lerp(to: Point, mul: number = 1): Point {
        this.lerpX(to.x, mul);
        this.lerpY(to.y, mul);
        return this;
    }
}