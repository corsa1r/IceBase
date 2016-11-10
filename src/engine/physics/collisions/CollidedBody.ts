import Body from '../bodies/Body';

export default class CollidedBody {

    public other: Body;
    public once: boolean = false;

    constructor(other: Body) {
        this.other = other;
    }
}