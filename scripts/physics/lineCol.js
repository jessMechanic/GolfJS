import { Vector2 } from "./vector2.js";
import { canvas } from '../drawing/canvas.js';
import { physics } from "./physics.js";
import { colliderClass } from "./colliders.js";

class lineColClass extends colliderClass {
    constructor(position, from, to) {
        super(position);
        this.from = from;
        this.to = to;


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
        canvas.drawLine(this.position.add(this.from), this.position.add(this.to), 'white');
    }
    collide(ball) {
        let normalAngle = this.angle() - 90 / 180 * Math.PI;
        let diff = ball.position.sub(this.position.add(this.middle())).normalize();
        let normal = Vector2.fromAngle(normalAngle);
        let dotProd = diff.dot(normal);

        if (dotProd < 0) {
            normalAngle = normalAngle - Math.PI;
        }

        let angle = this.angle();
        if (diff.dot(Vector2.fromAngle(angle)) < 0) {
            angle = angle - Math.PI;
        }

        let p = ball.position;
        let pN = p.add(ball.velocity);


        canvas.drawLine(p, pN, 'white');
        let offset = Vector2.fromAngle(normalAngle).add(Vector2.fromAngle(angle)).mul(ball.radius);

        let fromAbs = this.position.add(this.from).add(offset);
        let toAbs = this.position.add(this.to).add(offset);

        canvas.drawLine(fromAbs, toAbs, 'gray');

        // return intersect(fromAbs, toAbs, p, pN)

        let intersection = intersectv2(fromAbs.x, fromAbs.y, toAbs.x, toAbs.y, p.x, p.y, pN.x, pN.y)
        if (!intersection) {
            return false;
        }

        let intersect = new Vector2(intersection.x, intersection.y);

        ball.position = intersect.sub(ball.velocity);
        console.log(ball.velocity);
        let ColAngle = this.angle();

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
        ball.velocity = Vector2.fromAngle(newAngle).mul(length).mul(new Vector2(1 - this.friction, this.bounce).rotate(ColAngle + Math.PI));
        ball.collided = true;
        return intersect;
    }



}

function intersectv2(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}

export { lineColClass };