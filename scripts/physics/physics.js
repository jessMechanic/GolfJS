import { Vector2 } from "../physics/vector2.js";
import { storage } from '../storage/storage.js';
import { mouseControls } from '../input/mouseControls.js';

class physicsClass {
    constructor() {
        this.gravity = new Vector2(0, 0.5);
        this.friction = 0.5;
    }
    physicsUpdate(elapsed) {

        let balls = storage.getBalls();
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            ball.collided = false;
            for (let j = 0; j < storage.getColliders().length; j++) {
                let collider = storage.getColliders()[j];
                let result = collider.collide(ball);
                if (result) {
                    if (ball.position.sub(new Vector2(result.x, result.y)).mag() < 2) {
                        // ball.grounded = true;
                        // if (ball.velocity.mag() < 5) {
                        //     ball.velocity = Vector2.zero();
                        // }
                    }
                
                }
            }
            ball.update(elapsed);
        }
    }
    sendBall() {
        storage.getBalls()[0].velocity = mouseControls.begin.sub(mouseControls.end).mul(0.1);
    }

}

const physics = new physicsClass();
export { physics };