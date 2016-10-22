import Container from '../storage/Container';
import GameObject from '../gameobject/GameObject';
import iComponentsDescribe from '../gameobject/interface/iComponentsDescribe';

export default class Stage extends Container {

    constructor() {
        super();

        this.interactive = true;
    }

    addChild(...childs: Array<GameObject>): Stage {
        super.addChild(...childs);
        return this;
    }

    update(delta: number) {
        //update all childs and their components first
        this.each((child: GameObject) => {
            child.components.forEach((describe: iComponentsDescribe) => {
                describe.component.update(delta);
            });
            child.update(delta);
        });
    }
}