import Container from '../storage/Container';

export interface iEventSet {
    listener: Function;
    handler: any;
}

export default class EventEmitter extends Container<Container<iEventSet>> {

    constructor() {
        super();
    }

    on(name: string, listener: Function, handler?: any): EventEmitter {
        if (!this.has(name)) this.add(new Container<iEventSet>(), name);
        this.get(name).add(this.createEventSet(listener, handler));
        return this;
    }

    emit(name: string, a1?: any, a2?: any, a3?: Object): EventEmitter {
        if (!this.has(name)) return this;
        this.get(name).each((listener: Function) => listener(a1, a2, a3));
        return this;
    }

    off(name: string, handler?: any): EventEmitter {
        //stop if not exists
        if (!this.has(name)) return this;

        //remove all by name if handler is not spevified
        if (handler === undefined) {
            this.remove(name);
            return this;
        }

        //return all with this handler
        this.get(name).select((item: iEventSet) => {
            if(item.handler === handler) return true;
        }).each((item: iEventSet) => this.get(name).remove(item));
        
        return this;
    }

    private createEventSet(listener: Function, handler: any): iEventSet {
        var eventSet: iEventSet;
        eventSet.listener = listener;
        eventSet.handler = handler;
        return eventSet;
    }
}

/*

//Example usage
let events = new EventEmitter();
    events.on('click', console.warn, 'hbbvjgvgvg');
    events.emit('click', 'first', 'click', 68);
    events.remove('hbbvjgvgvg');
    events.emit('click', '2', 3, 4.5);//should never happens

*/