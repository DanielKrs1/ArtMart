let COLORS = null; // set at the bttom
const CANVAS_SIZE = 16;
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

    setUpButtons();
    setSelectedColorIndex(2);
    setSelectedTool(TOOLS.brush);
    initializeGrid();
    updateDraw();
}
  
function updateDraw() {
    strokeWeight(0);
    if (!COLORS) {
        fill("white");
        return rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

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

<<<<<<< HEAD
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
    createButton("Test Save").mouseClicked(() => getArtDataString());
}

=======
>>>>>>> 103c743c216da06805f01387677040e02e4a7c28
function colorToHex(color) {
    let hex = "#";
    color.forEach(value => hex += value.toString(16).padStart(2, "0"));
    return hex;
}
function hexToColor(hex) {
    return hex.slice(1).match(/../g).map(e => parseInt(e, 16));
}


function setUpButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');

    COLORS = []
    for (let i = 0; i < colorButtons.length; i++) { 
        const colorIdx = i;
        const button = colorButtons[i];
        const color = hexToColor(button.getAttribute('x-hex'));
        COLORS[i] = color;
        button.addEventListener('click', () => {
            setSelectedColorIndex(colorIdx);
        });
    }

    // const fillBtn = document.querySelector('.fill-btn');
    // const brushBtn = document.querySelector('.brush-btn');
    // fillBtn.addEventListener('click', () => setSelectedTool(TOOLS.brush));
    // brushBtn.addEventListener('click', () => setSelectedTool(TOOLS.brush));
}

function getArtDataString() {
    let data = "";

    grid.forEach((row) =>
        row.forEach((colorIndex) => {
            data += colorIndex.toString(36);
        })
    );

    console.log(data);
    return data;
}

function createArtFromDataString() {
    
}
