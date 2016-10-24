import iInternalEvent from './interface/iInternalEvent';
import iKeyMap from './interface/iKeyMap';

import * as EventEmitter from 'eventemitter3';

export default class InputSwitch extends EventEmitter {

    private states: { [key: string]: boolean } = {};
    private map: iKeyMap = {};

    constructor(map: iKeyMap) {
        super();
        this.map = map;
    }

    private inputSwitch(event: iInternalEvent): boolean {
        if (this.states[event.name] !== event.state || this.states[event.name] === undefined) {
            this.states[event.name] = event.state;
            return true
        }
        return false;
    }

    private getKeyName(code: number): string {
        return this.map[code] || 'unknown';
    }

    private getKeyCode(name: string): number {
        for (let code in this.map) {
            if (this.map[code] === name) return parseInt(code, 10);
        }

        return - 1;
    }

    private createEvent(which: number, state: boolean): iInternalEvent {
        let name = this.getKeyName(which);
        let code = this.getKeyCode(name);

        let event: iInternalEvent = {
            name: name,
            code: code,
            state: state,
            time: Date.now()
        }

        return event;
    }

    protected proceed(which: number, state: boolean) {
        let event = this.createEvent(which, state);
        if (this.inputSwitch(event)) this.input(event);
    }

    protected input(event: iInternalEvent) {
        
    }
}