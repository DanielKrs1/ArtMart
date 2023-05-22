const CANVAS_SIZE = 16;
const RESOLUTION = 16;
const PIXEL_SIZE = CANVAS_SIZE / RESOLUTION;
const COLORS = [
    [0, 0, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 255],
]
const TOOLS = {
    brush : 0,
    fill : 1
}

let grid = [];
let selectedColorIndex;
let selectedTool;

function setup() {
    let canvasContainer = document.getElementById("canvas-container");
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent(canvasContainer);

    setSelectedColorIndex(4);
    setSelectedTool(TOOLS.brush);
    initializeGrid();
    createColorButtons();
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

    // stroke(0);
    // strokeWeight(2);
    // let border = CANVAS_SIZE - 1;
    // line(0, 0, 0, border);
    // line(border, 0, border, border);
    // line(0, 0, border, 0);
    // line(0, border, border, border);
}

function draw() {
    if (selectedTool != TOOLS.brush || !mouseIsPressed || isMouseOffCanvas())
        return;
    
    let xy = getMouseGridXY();
    grid[xy[0]][xy[1]] = selectedColorIndex;

    updateDraw();
}

function mouseClicked() {
    if (selectedTool != TOOLS.fill || isMouseOffCanvas())
        return;
    
    let xy = getMouseGridXY();
    paintWithFill(xy[0], xy[1]);    
    updateDraw();
}

function isMouseOffCanvas() {
    return mouseX < 0 || mouseY < 0 || mouseX >= CANVAS_SIZE || mouseY >= CANVAS_SIZE;
}

function getMouseGridXY() {
    return [floor(mouseX / PIXEL_SIZE), floor(mouseY / PIXEL_SIZE)];
}

function paintWithFill(startX, startY) {
    throw new Error("Implement fill tool!");
}

function setSelectedColorIndex(i) {
    selectedColorIndex = i;
}

function setSelectedTool(tool) {
    selectedTool = tool;
}

function initializeGrid() {
    for (let x = 0; x < RESOLUTION; x++) {
        let column = [];

        for (let y = 0; y < RESOLUTION; y++)
            column.push(selectedColorIndex);

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

    createButton("Brush").mouseClicked(() => setSelectedTool(TOOLS.brush));
    createButton("Fill").mouseClicked(() => setSelectedTool(TOOLS.fill));
}

function colorToHex(color) {
    let hex = "#";
    color.forEach(value => hex += value.toString(16).padStart(2, "0"));
    return hex;
}