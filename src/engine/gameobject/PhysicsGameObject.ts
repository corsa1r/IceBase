import GameObject from './GameObject';
import Body from '../physics/bodies/Body';
import Point from '../math/Point';

export default class PhysicsGameObject extends GameObject {

    public body: Body;

    constructor() {
        super();
        
        this.body.beginOverlap = (BB: Body) => this.beginOverlap(BB);
        this.body.overlap = (BB: Body) => this.overlap(BB);
        this.body.endOverlap = (BB: Body) => this.endOverlap(BB);
    }

    beginOverlap(other: Body) {

    }

    endOverlap(other: Body) {

    }

    overlap(other: Body) {

    }
}