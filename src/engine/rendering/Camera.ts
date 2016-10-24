import Point from '../math/Point';
import Screen from './Screen';
import GameObject from '../gameobject/GameObject';

export default class Camera extends GameObject {

    public position: Point = new Point();
    private followTarget: GameObject | null;
    private followSpeed: number = 1;
    private screen: Screen;

    constructor(screen: Screen) {
        super();
        this.screen = screen;
    }

    sees(target: GameObject): boolean {
        //followed object is always visible
        if (target === this.followTarget) true;

        //translate camera position to normal canvas viewport
        let selfPosition = this.position.clone().mul(-1);
        let targetPosition = target.position.clone();
        let camRelPosition = targetPosition.sub(selfPosition);

        //if detects square collision the target is visible
        let c1 = camRelPosition.y < this.screen.canvas.height;
        let c2 = camRelPosition.y + target.height > 0;
        let c3 = camRelPosition.x + target.width > 0;
        let c4 = camRelPosition.x < this.screen.canvas.width;
        return c1 && c2 && c3 && c4;
    }

    follow(target: GameObject, speed: number = 1): Camera {
        this.followTarget = target;
        this.followSpeed = speed;
        return this;
    }

    stopFollow(): Camera {
        this.followTarget = null;
        return this;
    }

    update(delta: number) {
        if (!this.followTarget) return this;
        let lerpTo = this.followTarget.position
            .clone().sub(this.screen.halfSize).mul(-1)
            .sub(this.followTarget.width >> 1, this.followTarget.height >> 1);
        this.position.lerp(lerpTo, this.followSpeed);
        return this;
    }

}