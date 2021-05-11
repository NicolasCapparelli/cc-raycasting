let threeDRaycastSketch = function (context) {
    context.fovDelta = 5;
    context.turnDelta = 5;
    context.numRays = 10;
    context.walls = [];
    context.raySource;

    context.sceneWidth = 400;
    context.sceneHeight = 400;

    context.updateNumRay = function (numRays) {
        context.raySource.setRays(numRays);
    }

    context.setup = function () {
        context.createCanvas(800, 400);

        //  Boundaries on all edges of the canvas
        context.walls.push(new Boundary(context, 0, 0, context.sceneWidth, 0));
        context.walls.push(new Boundary(context, context.sceneWidth, 0, context.sceneWidth, context.sceneHeight));
        context.walls.push(new Boundary(context, context.sceneWidth, context.sceneHeight, 0, context.sceneHeight));
        context.walls.push(new Boundary(context,0, context.sceneHeight, 0, 0));

        for (let i = 0; i < 5; i++) {

            let x1 = context.random(context.sceneWidth);
            let y1 = context.random(context.sceneHeight);

            let x2 = context.random(context.sceneWidth);
            let y2 = context.random(context.sceneWidth);
            context.walls.push(new Boundary(context, x1, y1, x2, y2));
        }

        context.raySource = new ThreeDRaySource(context, 100, 200);
    }

    context.draw = function () {
        if (context.keyIsDown(context.LEFT_ARROW)){
            context.raySource.updateAngles(context.turnDelta);
        } else if (context.keyIsDown(context.RIGHT_ARROW)){
            context.raySource.updateAngles(-context.turnDelta);
        } else if (context.keyIsDown(context.UP_ARROW)){
            context.raySource.updateFov(context.raySource.fov + context.fovDelta);
        } else if (context.keyIsDown(context.DOWN_ARROW)){
            context.raySource.updateFov(context.raySource.fov - context.fovDelta)
        }
        context.background(51);
        for (let wall of context.walls) {
            wall.show();
        }


        context.raySource.update(context.mouseX, context.mouseY);
        context.raySource.show();

        // Get distance values from raycast
        const scene = context.raySource.cast(context.walls);

        // Draw one vertical slice of the right hand canvas according to the distance value for that
        // column in the scene array
        context.push();
        context.translate(context.sceneWidth, 0 );
        const sliceWidth = context.sceneWidth / scene.length;
        for (let i = 0; i < scene.length; i++) {
            context.noStroke();

            // Using the square values gives us a wider range of brightness
            const squareDistance = scene[i] * scene[i];
            const squareWidth = context.sceneWidth * context.sceneWidth;

            const sliceColor = context.map(squareDistance, 0, squareWidth, 255, 0);
            const sliceHeight = context.map(scene[i], 0, context.sceneWidth, context.sceneHeight, 0);

            context.fill(sliceColor);
            context.rectMode(context.CENTER);

            context.rect(i * sliceWidth + sliceWidth / 2, context.sceneHeight / 2, sliceWidth + 1, sliceHeight);
        }
        context.pop();

    }
}


const raycastingThreeDCanvas = document.getElementById('3d-raycasting');

let raycastingThreeD = new p5(threeDRaycastSketch, raycastingThreeDCanvas);

raySlider.oninput = function () {

    let newRayValue = Math.abs(raySlider.value);
    raycastingThreeD.updateNumRay(newRayValue);
    rayValueText.innerText = (360 / newRayValue).toString();
}

