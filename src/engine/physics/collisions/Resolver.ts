import Body from '../bodies/Body';
import Rect from '../bodies/Rect';

export default class Resolver {

    resolve(AA: Body, BB: Body) {
        if (AA instanceof Rect && BB instanceof Rect) {
            this.resolveRect(AA, BB);
        }
    }

    resolveRect(AA: Rect, BB: Rect) {
        console.warn('resolving rect collision');
    }
}