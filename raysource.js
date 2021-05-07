class RaySource {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.position = ctx.createVector(x, y);
        this.rays = [];
        this.setRays(1);
    }

    setRays(drawRayAtEveryAngle) {
        this.rays = [];

        // Create one ray for every drawRayAtEveryAngle degrees around this.position
        for (let angle = 0; angle < 360; angle += drawRayAtEveryAngle) {
            this.rays.push(new Ray(this.ctx, this.position, this.ctx.radians(angle)));
        }
    }

    update(x, y) {
        this.position.set(x, y);
    }

    show() {
        this.ctx.fill(255);
        this.ctx.ellipse(this.position.x, this.position.y, 8);
        for (let ray of this.rays) {
            ray.show();
        }
    }

    cast(walls) {

        for (let ray of this.rays) {
            let shortestDistance = Infinity;
            let closestMeetingPoint = null;
            for (let wall of walls) {

                const meetingPoint = ray.cast(wall);
                if (meetingPoint) {
                    const distance = p5.Vector.dist(this.position, meetingPoint);
                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        closestMeetingPoint = meetingPoint;
                    }
                }
            }

            if (closestMeetingPoint) {
                this.ctx.stroke(255, 100);
                this.ctx.line(this.position.x, this.position.y, closestMeetingPoint.x, closestMeetingPoint.y);
            }
        }

    }

}