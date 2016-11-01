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
        //console.log(AA.right, BB.left);
        let c1 = AA.position.x + AA.size.x > BB.position.x;
        let c2 = AA.position.x < BB.position.x + BB.size.x;
        let c3 = AA.position.y + AA.size.y > BB.position.y;
        let c4 = AA.position.y < BB.position.y + BB.size.y;
        return c1 && c2 && c3 && c4;
    }

    circleCollision(AA: Circle, BB: Circle): boolean {
        let eq1 = Math.pow(BB.position.x - AA.position.x, 2);
        let eq2 = Math.pow(BB.position.y - AA.position.y, 2)
        let distance = Math.sqrt(eq1 + eq2);
        return distance > (AA.radius + BB.radius);
    }
}