import GameObject from './GameObject';
import iComponentsDescribe from './interface/iComponentsDescribe';
import Container from '../storage/Container';

export default class Component extends Container {

    public name: string;
    public parent: GameObject;

    constructor(name: string) {
        super();
        this.name = name;
    }

    update(delta: number): Component {
        return this;
    }

    static describe(component: Component): iComponentsDescribe {
        let describe: iComponentsDescribe = {
            name: component.name,
            component: component
        };

        return describe;
    }
}