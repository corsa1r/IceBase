export default class Point {

    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.set(x, y);
    }

    set(x: number = 0, y: number = 0): Point {
        return this.copy(new Point(x, y));
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    distance(b: Point): Number {
        return Math.sqrt(Math.pow((b.x - this.x), 2) + Math.pow((b.y - this.y), 2));
    }

    copy(b: Point): Point {
        this.x = b.x;
        this.y = b.y;
        return this;
    }
}