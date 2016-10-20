export default class Container<T> extends Object {

    private items: Array<T>;
    private names: Array<string>;

    constructor() {
        super();
    }

    each(iterator: Function): Container<T> {
        for (let i = 0, len = this.items.length; i < len; i++) {
            if (iterator(this.items[i], this.names[i], i) === false) break;
        }
        return this;
    }

    select(iterator: Function): Container<T> {
        let found = new Container<T>();
        this.each((item: T, name: string) => {
            if (iterator(item, name) === true) found.add(item, name);
        });
        return found;
    }

    add(item: T, name?: string): Container<T> {
        this.items.push(item);
        this.names.push(name);
        return this;
    }

    get(item: T | string): T | undefined {
        let index = this.indexOf(item);
        return this.items[index];
    }

    has(what: T | string): Boolean {
        return this.indexOf(what) !== -1;
    }

    remove(item: T | string): Container<T> {
        let index = this.indexOf(item);
        this.items.splice(index, 1);
        this.names.splice(index, 1);
        return this;
    }

    indexOf(what: T | string): number {
        if (typeof what === 'string') {
            return this.names.indexOf(what);
        } else {
            return this.items.indexOf(what);
        }
    }

    len(): Number {
        return this.items.length;
    }
}