import { Vector2 } from "./vector2.js";
import { canvas } from '../drawing/canvas.js';
import { physics } from "./physics.js";


class colliderClass {
    constructor(position) {
        this.position = position;
        this.friction = 0.1;//bw 0 and 1
        this.bounce = 0.8;//bw 0 and 1

    }
    collide(ball) {
        console.error("collide not implemented");
        return false;
    }
    draw() {
        console.error("draw not implemented");
    }



}

export { colliderClass };