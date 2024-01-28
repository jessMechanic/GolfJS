import { Vector2 } from "../physics/vector2.js";
import { mouseControls } from "./mouseControls.js";
import { canvas } from '../drawing/canvas.js';
import { storage } from "../storage/storage.js";

class mouseIndicatorClass {
    constructor() {

    }
    draw() {
        if (mouseControls.active) {
            let ballPos = storage.getBalls()[0].position;
            canvas.drawLine(ballPos, mouseControls.begin.sub(mouseControls.end).add(ballPos), 'yellow');
        }
    }
}

const mouseIndicator = new mouseIndicatorClass();
export { mouseIndicator };