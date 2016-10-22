import Point from '../../math/Point';

interface iMouseOutput {
    position: Point;
    velocity: Point;
    delta: Point;
    distance: number;
    rotation: number;
    angle: number;
    isFirst: boolean;
    isFinal: boolean;
}

export default iMouseOutput;