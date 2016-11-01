import Point from '../../math/Point';

export default class Body {

    //position of the Body in the physics world
    public position: Point = new Point(0, 0);

    //velocity of the Body in the physics world
    public velocity: Point = new Point(0, 0);

    //static object cannot moves
    public static: boolean = false;

    //kinetic object cannot collides
    public kinetic: boolean = false;

    step(): Body {
        return this;
    }
}