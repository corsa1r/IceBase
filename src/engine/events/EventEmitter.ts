import Container from '../storage/Container';

export default class EventEmitter extends Container<Container<Function>> {

    constructor() {
        super();
    }

    on(name: string, listener: Function): EventEmitter {
        if (!this.get(name)) this.add(new Container<Function>(), name);
        this.get(name).add(listener);
        return this;
    }

    emit(name: string, a1: any, a2: any, a3: Object): EventEmitter {
        if (!this.get(name)) return this;
        this.get(name).each((listener: Function) => listener(a1, a2, a3));
        return this;
    }

    off(name: string): EventEmitter {
        this.remove(name);
        return this;
    }
}