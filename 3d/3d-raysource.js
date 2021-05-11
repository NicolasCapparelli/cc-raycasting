class ThreeDRaySource {
    constructor(ctx, x, y) {
        this.fov = 60;
        this.rayAtAngle = 1;
        this.startAngle = -30;
        this.endAngle = 30;
        this.ctx = ctx;
        this.position = ctx.createVector(x, y);
        this.rays = [];
        this.setRays(1);
    }

    setRays() {
        this.rays = [];

        // Create one ray for every drawrayateveryangle degrees around this.position
        for (let angle = this.startAngle; angle < this.endAngle; angle += this.rayAtAngle) {
            this.rays.push(new Ray(this.ctx, this.position, this.ctx.radians(angle)));
        }
    }

    update(x, y) {
        this.position.set(x, y);
    }

    updateAngles(delta) {
        this.startAngle = this.startAngle + delta;
        this.endAngle = this.endAngle + delta;
        this.setRays();
    }

    updateFov(fov) {
        if (fov > 360 ||fov < 1) {
            return;
        }

        let midpoint = ( this.endAngle + this.startAngle ) / 2;
        this.startAngle = midpoint - ( fov / 2 );
        this.endAngle = midpoint + ( fov / 2 );
        this.fov = fov;
        this.setRays();
    }

    show() {
        this.ctx.fill(255);
        this.ctx.ellipse(this.position.x, this.position.y, 8);
        for (let ray of this.rays) {
            ray.show();
        }
    }

    cast(walls) {
        let scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            let ray = this.rays[i];
            let shortestDistance = Infinity;
            let closestMeetingPoint = null;
            for (let wall of walls) {

                const meetingPoint = ray.cast(wall);
                if (meetingPoint) {
                    let distance = p5.Vector.dist(this.position, meetingPoint);

                    // Calculate the distance projected on to the camera, as the raw Euclidean distance will give
                    // a fisheye effect
                    if (this.ctx.mouseIsPressed) {
                        const angle = ray.direction.heading() - ((this.startAngle + this.endAngle) / 2);
                        distance *= this.ctx.cos(angle);
                    }

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
            scene[i] = shortestDistance;
        }
        return scene;

    }

}