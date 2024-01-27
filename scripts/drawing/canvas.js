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
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.moveTo(halfWidth + ((collider.position.x + collider.from.x) - this.camera.x), halfHeight + ((collider.position.y + collider.from.y) - this.camera.y));
        this.ctx.lineTo(halfWidth + ((collider.position.x + collider.to.x) - this.camera.x), halfHeight + ((collider.position.y + collider.to.y) - this.camera.y));
        this.ctx.stroke();

        let angle = collider.angle();
        let to = Vector2.fromAngle(angle + 90 / 180 * Math.PI).mul(50);

        let middle = collider.position.add(collider.from.add(collider.to).div(2));

        this.drawLine(middle, middle.add(to), 'red');


    }
    drawBall(ball, angle = 0) {
        let halfWidth = this.canvasEl.width / 2;
        let halfHeight = this.canvasEl.height / 2;

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(halfWidth + ((ball.position.x) - this.camera.x), halfHeight + ((ball.position.y) - this.camera.y), ball.radius, 0, 2 * Math.PI);
        this.ctx.fill();

      let to = ball.position.add(ball.velocity.normalize().mul(50));
        
        this.drawLine(ball.position, to, 'red');
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