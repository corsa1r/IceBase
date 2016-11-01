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
        this.y = this.y >> 0;
        return this;
    }

    lerpX(to: number, mul: number = 1): Point {
        mul = mul < 0 ? 0 : mul;
        mul = mul > 1 ? 1 : mul;
        this.x += (to - this.x) * mul;
        return this;
    }

    lerpY(to: number, mul: number = 1): Point {
        mul = mul < 0 ? 0 : mul;
        mul = mul > 1 ? 1 : mul;
        this.y += (to - this.y) * mul;
        return this;
    }

    lerp(to: Point, mulx: number = 1, muly?: number): Point {
        return this.lerpX(to.x, mulx).lerpY(to.y, muly || mulx);
    }
}