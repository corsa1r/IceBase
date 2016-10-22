import Point from '../math/Point';

export interface iDragMove {
    data: {
        global: Point
    };
}

export class DraggableData extends Object {

    public enabled: boolean = false;
    public eventsOnce: boolean = false;
    public dragStart: Point;
    public dragMove: Point;
    public dragging: boolean = false;
    public index: number = 0;

    constructor() {
        super();
    }

    get(event: iDragMove): Point {
        return new Point(event.data.global.x, event.data.global.y);
    }

    getGap(event: iDragMove): Point {
        return this.get(event).sub(this.dragStart.x, this.dragStart.y);
    }
}