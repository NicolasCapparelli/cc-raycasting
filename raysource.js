class RaySource {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.rays = [];
        this.numRays = 1;

        // Create one ray for every 10 degrees around this.pos
        for (let angle = 0; angle < 360; angle += this.numRays) {
            this.rays.push(new Ray(this.position, radians(angle)));
        }
    }

    update(x, y) {
        this.position.set(x, y);
    }

    show() {
        fill(255);
        ellipse(this.position.x, this.position.y, 8);
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
                stroke(255, 100);
                line(this.position.x, this.position.y, closestMeetingPoint.x, closestMeetingPoint.y);
            }
        }

    }

}