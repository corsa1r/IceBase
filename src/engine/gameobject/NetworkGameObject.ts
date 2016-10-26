import GameObject from './GameObject';

export default class NetworkGameObject extends GameObject {
    public networkId: number;
    public networkOwnerId: number;
}