import Container from '../storage/Container';
import GameObject from '../gameobject/GameObject';
import iComponentsDescribe from '../gameobject/interface/iComponentsDescribe';
import Camera from '../rendering/Camera';

export default class Stage extends Container {

    private camera: Camera;

    constructor(camera: Camera) {
        super();
        this.camera = camera;
        this.interactive = true;
    }

    addChild(...childs: Array<GameObject>): Stage {
        super.addChild(...childs);
        return this;
    }

    update(delta: number) {
        this.each((child: GameObject, index: number) => {
            //skip rendering if camera doesn't sees the child
            child.visible = this.camera.sees(child);
            //update their components first
            child.components.forEach((describe: iComponentsDescribe) => {
                describe.component.update(delta);
            });
            //finally update the child
            child.update(delta);
        });
    }
}