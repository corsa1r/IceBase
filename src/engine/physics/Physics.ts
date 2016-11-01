import Detector from './collisions/Detector';
import Point from '../math/Point';
import Stage from '../stage/Stage';
import GameObject from '../gameobject/GameObject';
import PhysicsGameObject from '../gameobject/PhysicsGameObject';
import Body from './bodies/Body';
import Resolver from './collisions/Resolver';

export default class Physics {

    private detector: Detector = new Detector();
    private resolver: Resolver = new Resolver();
    private gravity: Point = new Point(0, 0.009);

    step(stage: Stage) {
        stage.each((AA: GameObject) => {
            stage.each((BB: GameObject) => {
                this.validState(AA, BB);
            });
        });
    }

    private validState(GAA: GameObject, GBB: GameObject) {
        if (GAA instanceof PhysicsGameObject && GBB instanceof PhysicsGameObject) {
            if (GAA !== GBB && !GAA.body.static) {
                GAA.physicsUpdate(this.gravity);
                this.detection(GAA.body, GBB.body);
            }
        }
    }

    private detection(AA: Body, BB: Body) {
        if (this.detector.isCollide(AA, BB)) {
            this.resolve(AA, BB);
        }
    }

    private resolve(AA: Body, BB: Body) {
        this.resolver.resolve(AA, BB);
    }
}