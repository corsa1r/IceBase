import Game from './engine/Game';
import GameObject from './engine/gameobject/GameObject';
import * as PIXI from 'pixi.js';
import Point from './engine/math/Point';
import iInternalEvent from './engine/input/interface/iInternalEvent';
import Container from './engine/storage/Container';
import Network from './engine/network/Network';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let game = new Game(canvas);

console.warn(new Network());