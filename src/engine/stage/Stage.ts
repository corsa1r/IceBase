import iInternalEvent from '../input/interface/iInternalEvent';
import Keyboard from '../input/Keyboard';
import Container from '../storage/Container';
import GameObject from '../gameobject/GameObject';
import Camera from '../rendering/Camera';

export default class Stage extends Container {

    private camera: Camera;

    constructor(camera: Camera) {
        super();
        this.camera = camera;
        this.interactive = false;

        this.on(Keyboard.EVENTS.KEY, (event: iInternalEvent) => this.keyboard(event));
    }

    private keyboard(event: iInternalEvent) {
        this.each((child: GameObject) => {
            if (child.interactive) {
                if (event.state) child.keydown(event);
                if (!event.state) child.keyup(event);
                child.key(event);
            }
        });
    }

    addChild(...childs: Array<GameObject>): Stage {
        super.addChild(...childs);
        return this;
    }

    update(delta: number) {
        this.each((child: GameObject, index: number) => {
            //skip rendering if camera doesn't sees the child
            child.visible = this.camera.sees(child);
            //finally update the child
            child.update(delta);
        });
    }
}