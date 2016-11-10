import Body from '../bodies/Body';
import CollidedBody from './CollidedBody';

export default class Collision {

    public others: Array<CollidedBody>;

    constructor(other: Body) {
        this.others.push(new CollidedBody(other));
    }
}