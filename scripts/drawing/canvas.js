import { Vector2 } from '../physics/vector2.js';

// single use class
class canvasClass {
    constructor() {
        this.canvasEl = document.getElementById('canvas');
        this.ctx = this.canvasEl.getContext('2d');

        this.canvasEl.width = window.innerWidth;
        this.canvasEl.height = window.innerHeight
        this.canvasEl.style.backgroundColor = 'black';

        this.camera = new Vector2(0, 0);
        this.cameraScale = 1;

        this.drawColliderOffset = false;
        this.drawBallVelocity = false;
    }
    toWorldSpace(position) {

    }
    toCanvasSpace(position) {
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;
        return position.mul(this.cameraScale).sub(this.camera).add(new Vector2(halfWidth, halfHeight));
    }

    setResolution(width, height) {
        ctx.width = width;
        ctx.height = height;
    }

    setSizes(width, height) {
        canvasEl.width = width;
        canvasEl.height = height;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }
    drawCollider(collider) {


        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.moveTo(this.toCanvasSpace(collider.position.add(collider.from)).x, this.toCanvasSpace(collider.position.add(collider.from)).y);
        this.ctx.lineTo(this.toCanvasSpace(collider.position.add(collider.to)).x, this.toCanvasSpace(collider.position.add(collider.to)).y);
        this.ctx.stroke();

        if (this.drawColliderOffset) {
            let angle = collider.angle();
            let to = Vector2.fromAngle(angle + 90 / 180 * Math.PI).mul(50);

            let middle = collider.position.add(collider.from.add(collider.to).div(2));

            this.drawLine(middle, middle.add(to), 'red');
        }

    }
    drawBall(ball, angle = 0) {
        this.camera = this.camera.mul(5).add(ball.position).mul(1 / 6);
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(halfWidth + ((ball.position.x) - this.camera.x), halfHeight + ((ball.position.y) - this.camera.y), ball.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.drawBallVelocity) {
            let to = ball.position.add(ball.velocity.normalize().mul(50));

            this.drawLine(ball.position, to, 'red');
        }
    }
    drawLineAbs(from, to, style = 'white') {
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = style;
        this.ctx.beginPath();
        this.ctx.moveTo(halfWidth + from.x, halfHeight + from.y);
        this.ctx.lineTo(halfWidth + to.x, halfHeight + to.y);
        this.ctx.stroke();
    }
    drawLine(from, to, style = 'white') {
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = style;
        this.ctx.beginPath();
        this.ctx.moveTo(halfWidth + from.x - this.camera.x, halfHeight + from.y - this.camera.y);
        this.ctx.lineTo(halfWidth + to.x - this.camera.x, halfHeight + to.y - this.camera.y);
        this.ctx.stroke();

    }

}

const canvas = new canvasClass();

export { canvas };