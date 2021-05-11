class Ray {
    constructor(ctx, position, angle) {
        this.ctx = ctx;
        this.position = position;

        // Creates a vector pointing in the direction of an angle
        this.direction = p5.Vector.fromAngle(angle);
    }

    show() {
        this.ctx.stroke(255);

        this.ctx.push()
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.line(0, 0, this.direction.x * 10, this.direction.y * 10);
        this.ctx.pop()
    }


    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    cast(boundary) {

        // Renaming boundary variables to fit the formula

        // Boundary start point
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;

        // Boundary end point
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        // Ray position
        const x3 = this.position.x;
        const y3 = this.position.y;

        // "End" position of the ray
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        // According to the formula, when denom is 0, it means that the first line and the second line
        // are perfectly parallel, so they would never intersect.
        if (denominator === 0) {
            return
        }

        // Calculate u & t
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        // Check for intersection based on the formula.
        if (t > 0 && t < 1 && u > 0) {

            // Since point exists, calculate and return it
            const intersectionPoint = this.ctx.createVector();
            intersectionPoint.x = x1 + t * (x2 - x1);
            intersectionPoint.y = y1 + t * (y2 - y1);

            return intersectionPoint;
        } else {
            return;
        }
    }



}