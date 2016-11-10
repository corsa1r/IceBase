import Detector from './collisions/Detector';
import Point from '../math/Point';
import Stage from '../stage/Stage';
import GameObject from '../gameobject/GameObject';
import PhysicsGameObject from '../gameobject/PhysicsGameObject';
import Body from './bodies/Body';
import Resolver from './collisions/Resolver';
import Container from '../storage/Container';

export default class Physics {

    private detector: Detector = new Detector();
    private resolver: Resolver = new Resolver();
    private gravity: Point = new Point(0, 0);

    step(childs: Container) {
        childs.each((AA: PhysicsGameObject) => {
            childs.each((BB: PhysicsGameObject) => this.validateState(AA, BB));
        });
    }

    validateState(AA: PhysicsGameObject, BB: PhysicsGameObject) {
        if (AA === BB) return;
        if (AA.body.static) return;
        return this.detect(AA.body, BB.body);
    }

    detect(AA: Body, BB: Body) {
        if (!this.detector.isCollide(AA, BB)) return;
        AA.collisions.push(this.resolver.resolve(AA, BB));
    }
}