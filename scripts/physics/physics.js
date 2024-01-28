import { Vector2 } from "../physics/vector2.js";
import { storage } from '../storage/storage.js';
import { mouseControls } from '../input/mouseControls.js';

class physicsClass {
    constructor() {
        this.gravity = new Vector2(0, 1);
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
                    let intersect = new Vector2(result.x, result.y);

                    ball.position = intersect.sub(ball.velocity);

                    let ColAngle = collider.angle();

                    //for later : figure out why the F this works

                    if (ColAngle < -Math.PI / 2) {
                        ColAngle = ColAngle + Math.PI * 2;

                    } else if (ColAngle < 0) {
                        ColAngle = ColAngle + Math.PI;
                    }



                    let ballAngle = ball.velocity.angle();

                    let newAngle = ballAngle - ColAngle;
                    newAngle = ColAngle - newAngle;
                    let length = ball.velocity.mag();
                    if (length < 0.1) {
                        length = 0;
                    }
                    ball.velocity = Vector2.fromAngle(newAngle).mul(length).mul(new Vector2(1 - collider.friction, collider.bounce).rotate(ColAngle + Math.PI));
                    ball.collided = true;
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