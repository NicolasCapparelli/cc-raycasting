let sketch = function (context) {
    context.numRays = 10;
    context.walls = [];
    context.raySource;

    context.updateNumRay = function (numRays) {
        context.raySource.setRays(numRays);
    }

    context.setup = function () {
        context.createCanvas(400, 400);

        //  Boundaries on all edges of the canvas
        context.walls.push(new Boundary(context, 0, 0, context.width, 0));
        context.walls.push(new Boundary(context, context.width, 0, context.width, context.height));
        context.walls.push(new Boundary(context, context.width, context.height, 0, context.height));
        context.walls.push(new Boundary(context,0, context.height, 0, 0));

        for (let i = 0; i < 5; i++) {

            let x1 = context.random(context.width);
            let y1 = context.random(context.height);

            let x2 = context.random(context.width);
            let y2 = context.random(context.height);
            context.walls.push(new Boundary(context, x1, y1, x2, y2));
        }

        context.raySource = new RaySource(context, 100, 200);
    }

    context.draw = function () {
        context.background(51);
        for (let wall of context.walls) {
            wall.show();
        }


        context.raySource.update(context.mouseX, context.mouseY);
        context.raySource.show();
        context.raySource.cast(context.walls);
    }
}

const raySlider = document.getElementById("ray-value-range");
const rayValueText = document.getElementById("ray-value");
const raycastingTwoDCanvas = document.getElementById('2d-raycasting');

let raycastingTwoD = new p5(sketch, raycastingTwoDCanvas);

raySlider.oninput = function () {

    let newRayValue = Math.abs(raySlider.value);
    raycastingTwoD.updateNumRay(newRayValue);
    rayValueText.innerText = (360 / newRayValue).toString();
}

