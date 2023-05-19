function setup() {
    canvasContainer = document.getElementById("canvasContainer");
    canvas = createCanvas(400, 400);
    canvas.parent(canvasContainer);
}
  
function draw() {
    background(200);
    ellipse(mouseX, mouseY, 40, 40);
}