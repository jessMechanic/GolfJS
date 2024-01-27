import { Vector2 } from "./vector2.js";
import { physics } from "./physics.js";

class PhysObj {
    constructor(x, y) {
        this.position = new Vector2(x, y);
    }
    draw() {

    }
    collide() {

    }
}

class BallClass extends PhysObj {
    constructor(x, y, radius, mass) {
        super(x, y);
        this.radius = radius;
        this.mass = mass;
        this.velocity = new Vector2(0, 0);
        this.collided = false;
    }
    update() {

        this.position = this.position.add(this.velocity);

        if (!this.grounded) {
            this.velocity = this.velocity.add(physics.gravity);
        }
    }
}

export { BallClass };