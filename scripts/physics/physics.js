import { Vector2 } from "../physics/vector2.js";


class physicsClass {
    constructor() {
        this.gravity = new Vector2(0, 1);
        this.friction = 0.5;
    }
    physicsUpdate(storage) {

        let balls = storage.getBalls();
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            ball.collided = false;
            for (let j = 0; j < storage.getColliders().length; j++) {
                let collider = storage.getColliders()[j];
                let result = collider.collide(ball);
                if (result) {
                    console.log(j)
                    if (ball.position.sub(new Vector2(result.x, result.y)).mag() < 2) {
                        // ball.grounded = true;
                        // if (ball.velocity.mag() < 5) {
                        //     ball.velocity = Vector2.zero();
                        // }
                    }


                    ball.position = new Vector2(result.x, result.y);

                    let ColAngle = collider.angle();
                    let ballAngle = ball.velocity.angle();

                    let newAngle = ballAngle - ColAngle;
                    newAngle = ColAngle - newAngle;
                    let length = ball.velocity.mag();
                    ball.velocity = Vector2.fromAngle(newAngle).mul(length).mul(new Vector2(1 - collider.friction, collider.bounce).rotate(ColAngle + Math.PI));
                    ball.collided = true;
                }
            }
            ball.update();
        }
    }

}

const physics = new physicsClass();
export { physics };