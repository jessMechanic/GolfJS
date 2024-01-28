import { colliderClass } from "./colliders.js";
import { canvas } from "../drawing/canvas.js";
import { Vector2 } from "./vector2.js";
import { physics } from "./physics.js";

class triangleColliderClass extends colliderClass {
    constructor(position, point1, point2, point3) {
        super(position);
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.middle = point1.add(point2).add(point3).div(3);
        this.rotation = 0;


    }
    collide(ball) {
        let p = ball.position;
        let pN = p.add(ball.velocity);

        let p1 = Vector2.rotateAround(Vector2.zero(), this.point1, this.rotation);
        let p2 = Vector2.rotateAround(Vector2.zero(), this.point2, this.rotation);
        let p3 = Vector2.rotateAround(Vector2.zero(), this.point3, this.rotation);

        let l1 = Vector2.avg(p1, p2).sub(this.middle).normalize().rotate(this.rotation);
        let l2 = Vector2.avg(p2, p3).sub(this.middle).normalize().rotate(this.rotation);
        let l3 = Vector2.avg(p3, p1).sub(this.middle).normalize().rotate(this.rotation);



        // let offset = this.middle.sub(ball.position).normalize().mul(ball.radius);

        let offset = Vector2.zero();

        this.drawWtOfset(offset.mul(-1));

        p1 = p1.sub(this.middle.sub(p1).normalize().mul(ball.radius* 2 ));
        p2 = p2.sub(this.middle.sub(p2).normalize().mul(ball.radius));
        p3 = p3.sub(this.middle.sub(p3).normalize().mul(ball.radius));

        let point1Abs = this.position.add(p1).sub(offset);
        let point2Abs = this.position.add(p2).sub(offset);
        let point3Abs = this.position.add(p3).sub(offset);





        let intersection = Intersecting(p, pN, point1Abs, point2Abs, point3Abs);
        if (intersection) {
            console.log(intersection);

            if (intersection == true) {
                ball.velocity = ball.velocity.add(physics.gravity.mul(-1));

                return;
            }

            canvas.drawLine(this.middle, this.middle.add(l1.mul(100)), 'red');
            canvas.drawLine(this.middle, this.middle.add(l2.mul(100)), 'green');
            canvas.drawLine(this.middle, this.middle.add(l3.mul(100)), 'blue');

            let ballAngle = ball.velocity.angle();

            let normal = { 1: l1, 2: l2, 3: l3 }[intersection.normal];


            let ColAngle = normal.rotate(- Math.PI / 2).angle();
            let newAngle = ballAngle - ColAngle;
            newAngle = ColAngle - newAngle;
            let length = ball.velocity.mag();
            if (length < 0.1) {
                length = 0;
            }
            ball.position = intersection.point.sub(ball.velocity);
            ball.velocity = Vector2.fromAngle(newAngle).mul(length).mul(new Vector2(1 - this.friction, this.bounce).rotate(ColAngle + Math.PI));
        }



    }
    drawWtOfset(offset) {
        let p1 = Vector2.rotateAround(Vector2.zero(), this.point1, this.rotation);
        let p2 = Vector2.rotateAround(Vector2.zero(), this.point2, this.rotation);
        let p3 = Vector2.rotateAround(Vector2.zero(), this.point3, this.rotation);

        canvas.drawLine(this.position.add(p1).add(offset), this.position.add(p2).add(offset), 'red');
        canvas.drawLine(this.position.add(p2).add(offset), this.position.add(p3).add(offset), 'green');
        canvas.drawLine(this.position.add(p3).add(offset), this.position.add(p1).add(offset), 'blue');
    }
    draw() {
        this.drawWtOfset(Vector2.zero());
    }
}



/* Check whether P and Q lie on the same side of line AB */
function Side(p, q, a, b) {
    let z1 = (b.x - a.x) * (p.y - a.y) - (p.x - a.x) * (b.y - a.y);
    let z2 = (b.x - a.x) * (q.y - a.y) - (q.x - a.x) * (b.y - a.y);
    return z1 * z2;
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

    return new Vector2(x, y)
}

/* Check whether segment P0P1 intersects with triangle t0t1t2 */
function Intersecting(p0, p1, t0, t1, t2) {
    /* Check whether segment is outside one of the three half-planes
     * delimited by the triangle. */
    let f1 = Side(p0, t2, t0, t1), f2 = Side(p1, t2, t0, t1);
    let f3 = Side(p0, t0, t1, t2), f4 = Side(p1, t0, t1, t2);
    let f5 = Side(p0, t1, t2, t0), f6 = Side(p1, t1, t2, t0);
    /* Check whether triangle is totally inside one of the two half-planes
     * delimited by the segment. */
    let f7 = Side(t0, t1, p0, p1);
    let f8 = Side(t1, t2, p0, p1);

    /* If segment is strictly outside triangle, or triangle is strictly
     * apart from the line, we're not intersecting */
    if ((f1 < 0 && f2 < 0) || (f3 < 0 && f4 < 0) || (f5 < 0 && f6 < 0)
        || (f7 > 0 && f8 > 0))
        return false;

    /* If both segment points are strictly inside the triangle, we
        * are not intersecting either */
    if (f1 > 0 && f2 > 0 && f3 > 0 && f4 > 0 && f5 > 0 && f6 > 0)
        return true;

    let result = intersectv2(p0.x, p0.y, p1.x, p1.y, t0.x, t0.y, t1.x, t1.y);
    if (result) {
        return { point: result, normal: 1 };
    }
    result = intersectv2(p0.x, p0.y, p1.x, p1.y, t1.x, t1.y, t2.x, t2.y);
    if (result) {
        return { point: result, normal: 2 };
    }
    result = intersectv2(p0.x, p0.y, p1.x, p1.y, t2.x, t2.y, t0.x, t0.y);
    if (result) {
        return { point: result, normal: 3 };
    }



    /* Otherwise we're intersecting with at least one edge */
    return true;
}

export { triangleColliderClass };