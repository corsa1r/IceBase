import Point from '../math/Point';

export default class Screen {

    public canvas: HTMLCanvasElement;
    public size: Point;
    public halfSize: Point;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public resize(width: number, height: number): Screen {
        this.size = new Point(width, height).toInt();
        this.halfSize = this.size.clone().dev(2).toInt();
        return this;
    }
}