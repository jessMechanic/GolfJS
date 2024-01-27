import { canvas } from './drawing/canvas.js';
import { storage } from './storage/storage.js';
import { physics } from './physics/physics.js';
import { BallClass } from './physics/physObj.js';

import { colliderClass } from './physics/colliders.js';
import { Vector2 } from './physics/vector2.js';



storage.addCollider(new colliderClass(new Vector2(200, 200), new Vector2(0, 10), new Vector2(0, -50)));

storage.addCollider(new colliderClass(new Vector2(-200, 250), new Vector2(0, 10), new Vector2(0, -50)));

storage.addCollider(new colliderClass(new Vector2(0, 0), new Vector2(200, 200), new Vector2(-200, 250)));
let ball = new BallClass(0, 100, 10, 10);
// let ball2 = new BallClass(50, 0, 10, 10);


storage.addBall(ball);
// storage.addBall(ball2);

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


function update() {
    canvas.clear();
    drawAllColliders();
    drawAllBalls();
    physics.physicsUpdate(storage);
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
// window.setInterval(update, 1000 / 6);