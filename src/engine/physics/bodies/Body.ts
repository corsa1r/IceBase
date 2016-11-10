import Point from '../../math/Point';
import Collision from '../collisions/Collision';

export default class Body {

    //position of the Body in the physics world
    public position: Point = new Point(0, 0);

    //velocity of the Body in the physics world
    public velocity: Point = new Point(0, 0);

    public restitution: number = 0.34;

    //static object cannot moves
    public static: boolean = false;

    //kinetic object cannot collides
    public kinetic: boolean = false;

    public collisions: Array<Collision>;

    step(): Body {
        return this;
    }

    beginOverlap(other: Body) { }
    overlap(other: Body) { }
    endOverlap(other: Body) { }
}