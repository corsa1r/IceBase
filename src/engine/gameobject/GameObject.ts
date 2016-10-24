import iComponentsDescribe from './interface/iComponentsDescribe';
import iInternalEvent from '../input/interface/iInternalEvent';

import Container from '../storage/Container';
import Point from '../math/Point';
import Component from './Component';
import { DraggableData, iDragMove } from '../input/DraggableData';

export default class GameObject extends Container {

    protected draggableData: DraggableData = new DraggableData();
    protected states: { [key: string]: boolean } = {};

    public components: Array<iComponentsDescribe> = [];

    constructor() {
        super();
        this.interactive = true;
    }

    addComponent(component: Component): Component {
        component.parent = this;
        this.components.push(Component.describe(component));
        this.addChild(component);
        return component;
    }

    removeComponent(component: Component): Component {
        let index = this.components.indexOf(Component.describe(component));
        this.components.splice(index, 1);
        this.removeChild(component);
        return component;
    }

    update(delta: number): GameObject {
        return this;
    }

    setDraggable(state: boolean = true): GameObject {
        if (state && !this.draggableData.eventsOnce) this.initDragEvents();
        if (!state) this.onDragEnd();
        this.draggableData.enabled = state;
        return this;
    }

    private initDragEvents() {
        this.draggableData.eventsOnce = true;
        // events for drag start
        this.on(GameObject.EVENTS.MOUSEDOWN, (e) => this.onDragStart(e));
        this.on(GameObject.EVENTS.TOUCHSTART, (e) => this.onDragStart(e));

        // events for drag end
        this.on(GameObject.EVENTS.MOUSEUP, () => this.onDragEnd());
        this.on(GameObject.EVENTS.MOUSEUPOUTSIDE, () => this.onDragEnd());
        this.on(GameObject.EVENTS.TOUCHEND, () => this.onDragEnd());
        this.on(GameObject.EVENTS.TOUCHENDOUTSIDE, () => this.onDragEnd());

        // events for drag move
        this.on(GameObject.EVENTS.MOUSEMOVE, (e) => this.onDragMove(e));
        this.on(GameObject.EVENTS.TOUCHMOVE, (e) => this.onDragMove(e));
    }

    private onDragStart(event: iDragMove) {
        if (!this.draggableData.enabled) return;
        this.draggableData.dragStart = this.draggableData.get(event)
            .clone().sub(this.position.x, this.position.y);
        this.draggableData.dragging = true;
        if (this.draggableData.index) this.dragstart();
    }

    private onDragMove(event: iDragMove) {
        if (!this.draggableData.enabled) return;
        if (!this.draggableData.dragging) return;
        this.position.copy(this.draggableData.getGap(event));
        this.drag();
        this.draggableData.index++;
        if (this.draggableData.index === 1) this.dragstart();
    }

    private onDragEnd() {
        if (!this.draggableData.enabled) return;
        this.draggableData.dragging = false;
        this.dragend();
        this.draggableData.index = 0;
    }

    //@abstract methods
    public dragstart(): GameObject { return this; }
    public drag(): GameObject { return this; }
    public dragend(): GameObject { return this; }
    public keyup(event: iInternalEvent): GameObject { return this; }
    public key(event: iInternalEvent): GameObject { return this; }
    public keydown(event: iInternalEvent): GameObject { return this; }

    static EVENTS = {
        DRAGSTART: 'dragstart',
        DRAG: 'drag',
        DRAGEND: 'dragend',
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
        MOUSEUP: 'mouseup',
        MOUSEUPOUTSIDE: 'mouseupoutside',
        TOUCHEND: 'touchend',
        TOUCHENDOUTSIDE: 'touchendoutside',
        MOUSEMOVE: 'mousemove',
        TOUCHMOVE: 'touchmove',
        CLICK: 'click',
        TAP: 'tap'
    }
}