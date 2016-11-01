import Body from './Body';

export default class Circle extends Body {

    public radius: number;

    constructor(x: number, y: number, radius: number) {
        super();
        this.position.set(x, y);
        this.radius = radius;
    }

    step(): Circle {
        return this;
    }
}