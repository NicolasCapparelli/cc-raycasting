
let walls = [];
let raySource;
function setup() {
    createCanvas(400, 400);

    //  Boundaries on all edges of the canvas
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    for (let i = 0; i < 5; i++) {

        let x1 = random(width);
        let y1 = random(height);

        let x2 = random(width);
        let y2 = random(height);
        walls.push(new Boundary(x1, y1, x2, y2));
    }

    raySource = new RaySource(100, 200);
}

function draw() {
    background(51);
    for (let wall of walls) {
        wall.show();
    }


    raySource.update(mouseX, mouseY);
    raySource.show();
    raySource.cast(walls);
}