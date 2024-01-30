import { Vector2 } from "../physics/vector2.js";

class JMath {

    static intersect(one, two, three, four) {

        // Check if none of the lines are of length 0
        if ((one.x === two.x && one.y === two.y) || (three.x === four.x && three.y === four.y)) {
            return false
        }

        let denominator = ((four.y - three.y) * (two.x - one.x) - (four.x - three.x) * (two.y - one.y))

        // Lines are parallel
        if (denominator === 0) {
            return false
        }

        let ua = ((four.x - three.x) * (one.y - three.y) - (four.y - three.y) * (one.x - three.x)) / denominator
        let ub = ((two.x - one.x) * (one.y - three.y) - (two.y - one.y) * (one.x - three.x)) / denominator

        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false
        }

        // Return a object with the x and y coordinates of the intersection
        let x = one.x + ua * (two.x - one.x)
        let y = one.y + ua * (two.y - one.y)

        return new Vector2(x, y)
    }
}
export { JMath };