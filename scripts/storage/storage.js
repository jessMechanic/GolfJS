class storageClass {
    constructor() {
        this.colliders = [];
        this.balls = [];
    }

    addCollider(object) {
        this.colliders.push(object);
    }
    addBall(object) {
        this.balls.push(object);
    }
    getColliders() {
        return this.colliders;
    }
    getCollidersWithIn(position, radius) {
        let objects = [];

        return objects;
    }
    getBalls() {
        return this.balls;
    }

}
const storage = new storageClass();
export { storage };