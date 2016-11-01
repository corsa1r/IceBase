import GameObject from './GameObject';
import Body from '../physics/bodies/Body';
import Point from '../math/Point';

export default class PhysicsGameObject extends GameObject {

    public body: Body;

    constructor() {
        super();
    }

    physicsUpdate(gravity: Point) {
        if (this.body.static) return;
        this.body.velocity.sum(gravity);
        this.body.position.sum(this.body.velocity);
        this.position.copy(this.body.position);
    }
}