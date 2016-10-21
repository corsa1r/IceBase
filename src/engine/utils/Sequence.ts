import Container from '../storage/Container';

export default class Sequence<T> extends Container<T> {

    private current: number;

    constructor(values: Container<T>) {
        super();
        this.constructValues(values);
    }

    private constructValues(values: Container<T>) {
        values.each((value: T, name: string, index: number) => {
            this.add(value, index.toString());
        });
        this.current = -1;
    }

    next(): T {
        if (++this.current >= this.length) {
            this.current = 0;
        }
        return this.get(this.current.toString());
    }
}


//example usage
/*
let orderedItems = new Container<string>();
orderedItems.add('blink1');
orderedItems.add('blink2');
orderedItems.add('blink3');

let order = new Sequence<string>(orderedItems);
order.next();// => blink1
order.next();// => blink2
order.next();// => blink3
order.next();// => blink1
etc...

*/