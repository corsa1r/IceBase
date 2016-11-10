import Body from './Body';
import Point from '../../math/Point';

export default class Rect extends Body {

    public size: Point = new Point(50, 50);

    constructor() {
        super();
    }

    step(): Rect {
        return this;
    }

    get top(): number {
        return this.position.y;
    }

    get bot(): number {
        return this.position.y + this.size.y;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.size.x;
    }

    get midX(): number {
        return this.left + (this.size.x / 2);
    }

    get midY(): number {
        return this.top + (this.size.y / 2);
    }
}