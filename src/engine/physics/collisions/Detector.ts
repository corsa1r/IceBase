import Body from '../bodies/Body';
import Rect from '../bodies/Rect';
import Circle from '../bodies/Circle';

export default class Detector {

    isCollide(AA: Body, BB: Body): boolean {
        if (AA instanceof Circle && BB instanceof Circle) {
            return this.circleCollision(AA, BB);
        } else if (AA instanceof Rect && BB instanceof Rect) {
            return this.rectCollision(AA, BB);
        }
        return false;
    }

    rectCollision(AA: Rect, BB: Rect): boolean {
        let c1 = AA.right > BB.left;
        let c2 = AA.left < BB.right;
        let c3 = AA.bot > BB.top;
        let c4 = AA.top < BB.bot;
        return c1 && c2 && c3 && c4;
    }

    circleCollision(AA: Circle, BB: Circle): boolean {
        return AA.position.distance(BB.position) > (AA.radius + BB.radius);
    }
}