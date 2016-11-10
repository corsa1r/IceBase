import Body from '../bodies/Body';
import Rect from '../bodies/Rect';
import Circle from '../bodies/Circle';
import Collision from '../collisions/Collision';

export default class Resolver {

    static STICKY_THRESHOLD = 0.1;

    resolve(AA: Body, BB: Body): Collision {
        if (AA instanceof Rect && BB instanceof Rect) {
            return this.resolveRect(AA, BB);
        } else if (AA instanceof Circle && BB instanceof Circle) {
            return this.resolveCircle(AA, BB);
        }
    }

    resolveRect(AA: Rect, BB: Rect): Collision {
        return new Collision(BB);
    }

    resolveCircle(AA: Circle, BB: Circle): Collision {
        return new Collision(BB);
    }
}