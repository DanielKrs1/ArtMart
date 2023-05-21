const CANVAS_SIZE = 400;
const RESOLUTION = 16;
const PIXEL_SIZE = CANVAS_SIZE / RESOLUTION;
const COLORS = [
    [0, 0, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 255]
]

let grid = [];
let selectedColorIndex;

function setup() {
    let canvasContainer = document.getElementById("canvasContainer");
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent(canvasContainer);

    initializeGrid();
    createColorButtons();
    setSelectedColorIndex(0);
    updateDraw();
}
  
function updateDraw() {
    strokeWeight(0);

    for (let x = 0; x < RESOLUTION; x++) {
        for (let y = 0; y < RESOLUTION; y++) {
            let colorIndex = grid[x][y];
            let color = COLORS[colorIndex];

            fill(color[0], color[1], color[2]);
            rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

function draw() {
    if (!mouseIsPressed)
        return;

    if (mouseX < 0 || mouseY < 0 || mouseX >= CANVAS_SIZE || mouseY >= CANVAS_SIZE)
        return;
    
    let x = floor(mouseX / PIXEL_SIZE);
    let y = floor(mouseY / PIXEL_SIZE);
    grid[x][y] = selectedColorIndex;

    updateDraw();
}

function setSelectedColorIndex(i) {
    selectedColorIndex = i;
}

function initializeGrid() {
    for (let x = 0; x < RESOLUTION; x++) {
        let column = [];

        for (let y = 0; y < RESOLUTION; y++)
            column.push(0);

        grid.push(column);        
    }
}

function createColorButtons() {
    for (let i = 0; i < COLORS.length; i++) { 
        let color = COLORS[i];
        let hex = colorToHex(color);

        let button = createButton("_");
        button.style("background-color", hex);
        button.style("color", hex);
        button.mouseClicked(() => setSelectedColorIndex(((x) => x)(i)));
    }
}

function colorToHex(color) {
    let hex = "#";
    color.forEach(value => hex += value.toString(16).padStart(2, "0"));
    return hex;
}