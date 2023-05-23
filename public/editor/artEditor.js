const CANVAS_SIZE = 16;
const COLORS = [
    [0, 0, 0],
    [128, 128, 128],
    [255, 255, 255],
    [255, 0, 0],
    [255, 128, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [0, 0, 255],
    [255, 0, 255],
    [128, 0, 255],
    [0, 128, 0],
    [128, 64, 0]
]
const TOOLS = {
    brush : 0,
    fill : 1
}
const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

let grid = [];
let selectedColorIndex;
let selectedTool;

function setup() {
    let canvasContainer = document.getElementById("canvas-container");
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent(canvasContainer);

    setSelectedColorIndex(2);
    setSelectedTool(TOOLS.brush);
    initializeGrid();
    createColorButtons();
    updateDraw();
}
  
function updateDraw() {
    strokeWeight(0);

    for (let x = 0; x < CANVAS_SIZE; x++) {
        for (let y = 0; y < CANVAS_SIZE; y++) {
            let colorIndex = grid[x][y];
            let color = COLORS[colorIndex];

            fill(color[0], color[1], color[2]);
            rect(x, y, 1, 1);
        }
    }
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
    return [floor(mouseX), floor(mouseY)];
}

function paintWithFill(startX, startY) {
    let frontier = [xyToIndex(startX, startY)];
    let extended = [];
    let colorToFill = grid[startX][startY];

    while (frontier.length > 0) {
        let current = frontier.pop();
        extended.push(current);
        current = indexToXY(current);
        grid[current[0]][current[1]] = selectedColorIndex;

        DIRECTIONS.forEach((direction) => {
            let neighbor = [current[0] + direction[0], current[1] + direction[1]];
            let neighborIndex = xyToIndex(neighbor[0], neighbor[1]);

            if (!isOffCanvas(neighbor[0], neighbor[1]) && !extended.includes(neighborIndex) && grid[neighbor[0]][neighbor[1]] == colorToFill)
                frontier.push(neighborIndex);
        });
    }
}

function xyToIndex(x, y) {
    return y * CANVAS_SIZE + x;
}

function indexToXY(i) {
    return [i % CANVAS_SIZE, floor(i / CANVAS_SIZE)];
}

function isOffCanvas(x, y) {
    return x < 0 || y < 0 || x >= CANVAS_SIZE || y >= CANVAS_SIZE;
}

function setSelectedColorIndex(i) {
    selectedColorIndex = i;
}

function setSelectedTool(tool) {
    selectedTool = tool;
}

function initializeGrid() {
    for (let x = 0; x < CANVAS_SIZE; x++) {
        let column = [];

        for (let y = 0; y < CANVAS_SIZE; y++)
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