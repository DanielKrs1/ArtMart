const CANVAS_SIZE = 400;
const RESOLUTION = 16;
const PIXEL_SIZE = CANVAS_SIZE / RESOLUTION;

function setup() {
    let canvasContainer = document.getElementById("canvasContainer");
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent(canvasContainer);
}
  
function draw() {
    
}