import * as EventEmitter from 'eventemitter3';
import NetworkGameObject from '../gameobject/NetworkGameObject';
import * as sio from 'socket.io-client';

export default class Network extends EventEmitter {

    private socket: SocketIOClient.Socket;

    constructor() {
        super();

        this.socket = sio.connect('localhost:8877');
        this.socket.once('connect', () => this.connect());
        this.socket.once('disconnect', () => this.disconnect());
        this.socket.once('error', () => this.error());
    }

    connect() {
        console.warn('connect');
    }

    disconnect() {
        console.warn('disconnect');
    }

    error() {
        console.warn('error');
    }
}