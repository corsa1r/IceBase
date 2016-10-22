import * as PIXI from 'pixi.js';

export default class Container extends PIXI.Container {

    constructor() {
        super();
    }

    each(iterator: Function): Container {
        for (let i = 0, len = this.children.length; i < len; i++) {
            if (iterator(this.children[i], i) === false) break;
        }
        return this;
    }

    len(): number {
        return this.children.length;
    }
}