import { Vector2 } from "./vector2.js";
import { canvas } from '../drawing/canvas.js';
import { physics } from "./physics.js";
import { colliderClass } from "./colliders.js";
import { JMath } from "../helpClasses/JMath.js";

class lineColClass extends colliderClass {
    constructor(position, from, to) {
        super(position);
        this.from = from;
        this.to = to;


    }
    fromAbs() {
        return this.from.add(this.position);
    }
    toAbs() {
        return this.to.add(this.position);
    }
    middle() {
        return this.from.add(this.to).div(2);
    }
    angle() {
        var dy = this.to.y - this.from.y;
        var dx = this.to.x - this.from.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        return theta;
    }
    draw() {
        canvas.drawLine(this.position.add(this.from), this.position.add(this.to), 'red');
    }
    Unit() {
        return this.to.sub(this.from).normalize();
    }

    collide(ball) {

        let point = closesPointBW(ball, this, ball.velocity);
        let dist = point.sub(ball.position.add(ball.velocity)).mag();
        if (dist < ball.radius) {
            this.updateCol(ball, point);
            return;
        }
        let altInt = JMath.intersect(ball.position, ball.position.add(ball.velocity), this.from.add(this.position), this.to.add(this.position));
        if (altInt) {
            this.updateCol(ball, point);
            console.log("altInt");
            return;
        }


    }
    updateCol(ball, point) {
        moveBall(ball, point, this);
        bounceVector(ball, this);
        console.log("collider");
    }



}

function closesPointBW(ball, line, addVec = Vector2.zero()) {
    let balltoLineStart = line.fromAbs().sub(ball.position.add(addVec));
    let lineUnit = line.Unit();
    if (Vector2.dot(lineUnit, balltoLineStart) > 0) {
        return line.fromAbs();
    }

    let lineEndtoBall = ball.position.add(addVec).sub(line.toAbs());
    if (Vector2.dot(lineUnit, lineEndtoBall) > 0) {
        return line.to;
    }

    let closestDist = Vector2.dot(lineUnit, balltoLineStart);
    let closestPoint = lineUnit.mul(closestDist);
    return line.fromAbs().sub(closestPoint);

}

function moveBall(ball, point, line) {
    let penVect = ball.position.sub(point);
    let ballLineDiff = ball.position.sub(closesPointBW(ball, line)).mag();
    ball.position = ball.position.add(penVect.normalize().mul(ball.radius - ballLineDiff));
}
function bounceVector(ball, line) {

    let normal = line.fromAbs().sub(line.toAbs()).normalize().rotate(Math.PI / 2);
    let sepVel = Vector2.dot(ball.velocity, normal);
    let newVel = -sepVel * line.bounce;
    let vSepDiff = sepVel - newVel;
    ball.velocity = ball.velocity.add(normal.mul(-vSepDiff));

}


export { lineColClass };