import iMouseOutput from './interface/iMouseOutput';

import * as EventEmitter from 'eventemitter3';
import * as Hammer from 'hammerjs';
import Point from '../math/Point';
import Screen from '../rendering/Screen';

export default class Mouse extends EventEmitter {

    private hammertime: HammerManager;

    constructor(screen: Screen) {
        super();
        this.hammertime = new Hammer(screen.canvas, Hammer.defaults);
        this.handleMouseEvents();
    }

    private proceed(event: string, data: any) {
        this.emit(event, this.translateEvent(data));
    }

    private translateEvent(data: any): iMouseOutput {
        //translate hammer event into my event
        var event: iMouseOutput = {
            position: new Point(data.center.x, data.center.y),
            velocity: new Point(data.velocityX, data.velocityY),
            delta: new Point(data.deltaX, data.deltaY),
            distance: data.distance,
            rotation: data.rotation,
            angle: data.angle,
            isFirst: data.isFirst,
            isFinal: data.isFinal
        }
        return event;
    }

    private handleMouseEvents() {
        Object.keys(Mouse.EVENTS)
            .map((event) => { return event.toLowerCase() })
            .forEach((event) => this.hammertime.on(event, (data) => this.proceed(event, data)));
    }

    static EVENTS = {
        TAP: 'tap',
        DOUBLETAP: 'doubletap',
        PAN: 'pan',
        SWIPE: 'swipe',
        PRESS: 'press',
        PINCH: 'pinch',
        ROTATE: 'rotate'
    }
}