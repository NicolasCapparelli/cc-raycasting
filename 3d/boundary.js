class Boundary {
    constructor(p, x1, y1, x2, y2) {
        this.p = p;
        this.a = p.createVector(x1, y1);
        this.b = p.createVector(x2, y2);
    }

    show() {
        this.p.stroke(255);
        this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

}