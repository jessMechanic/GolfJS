import { canvas } from './drawing/canvas.js';
import { storage } from './storage/storage.js';
import { physics } from './physics/physics.js';
import { BallClass } from './physics/physObj.js';
import { mouseControls } from './input/mouseControls.js';
import { mouseIndicator } from './input/mouseIndicator.js';

import { colliderClass } from './physics/colliders.js';
import { Vector2 } from './physics/vector2.js';


storage.addCollider(new colliderClass(new Vector2(800, 250), new Vector2(0, 10), new Vector2(0, -50)));

storage.addCollider(new colliderClass(new Vector2(-250, 250), new Vector2(0, 10), new Vector2(0, -50)));

storage.addCollider(new colliderClass(new Vector2(0, 0), new Vector2(200, 200), new Vector2(-200, 250)));
storage.addCollider(new colliderClass(new Vector2(0, 0), new Vector2(800, 250), new Vector2(200, 200)));

storage.addCollider(new colliderClass(new Vector2(0, 0), new Vector2(-200, 251), new Vector2(-250, 251)));

let ball = new BallClass(10, -300, 10, 10);
ball.velocity = new Vector2(0, 0);

storage.addBall(ball);

mouseControls.attach();
mouseControls.onLetGo = physics.sendBall;


function drawAllColliders() {
    let colliders = storage.getColliders();
    for (let i = 0; i < colliders.length; i++) {
        canvas.drawCollider(colliders[i]);
    }
}

function drawAllBalls() {
    let balls = storage.getBalls();
    for (let i = 0; i < balls.length; i++) {
        canvas.drawBall(balls[i]);
    }
}

let start = Date.now();
function update() {
    let current = Date.now(),
        elapsed = (current - start) / 16;
    start = current;
    canvas.clear();
    drawAllColliders();
    drawAllBalls();
    physics.physicsUpdate(1);
    mouseIndicator.draw();
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
// window.setInterval(update, 1000 / 6);