import { Vector2 } from "../physics/vector2.js";
import { canvas } from '../drawing/canvas.js';

class mouseControlsClass {
    constructor() {
        this.begin = new Vector2(0, 0);
        this.end = new Vector2(0, 0);
        this.active = false;
        this.onLetGo = undefined;
        this.onDrag = undefined;

       

    }
    attach() {
        canvas.canvasEl.addEventListener('mousedown', this.mouseDown.bind(this));
        canvas.canvasEl.addEventListener('mouseup', this.mouseUp.bind(this));
        canvas.canvasEl.addEventListener('mousemove', this.mouseMove.bind(this));
    }
    mouseDown(e) {
        this.active = true;
        this.begin = new Vector2(e.clientX, e.clientY);
        this.end = new Vector2(e.clientX, e.clientY);

    }
    mouseUp(e) {
        this.active = false;
        if (this.onLetGo) {
            this.onLetGo();
        }
    }
    mouseMove(e) {
        if (this.active) {
            this.end = new Vector2(e.clientX, e.clientY);
        }
    }
}
const mouseControls = new mouseControlsClass();
export { mouseControls };