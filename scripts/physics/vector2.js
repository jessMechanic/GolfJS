class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mul(s) {
        if (s instanceof Vector2) {
            return new Vector2(this.x * s.x, this.y * s.y);
        }
        return new Vector2(this.x * s, this.y * s);
    }


    div(s) {
        return new Vector2(this.x / s, this.y / s);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        return this.div(this.mag());
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    rotate(angle) {
        return new Vector2(Math.cos(angle) * this.x - Math.sin(angle) * this.y, Math.sin(angle) * this.x + Math.cos(angle) * this.y);
    }

    static fromAngle(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
    static rotateAround(center, point, angle) {
        let diff = point.sub(center);
        return center.add(diff.rotate(angle));
    }

    static random() {
        return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    static avg(x, y) {
        return new Vector2((x.x + y.x) / 2, (x.y + y.y) / 2);

    }
    static zero() {
        return new Vector2(0, 0);
    }

    static one() {
        return new Vector2(1, 1);
    }
}

export { Vector2 };