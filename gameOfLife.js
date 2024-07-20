const rows = 30;
const cols = 30;
let grid = createGrid(rows, cols);
let interval;
let running = false;

const gridElement = document.getElementById('grid');
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => toggleCell(row, col));
        gridElement.appendChild(cell);
    }
}

function createGrid(rows, cols) {
    return new Array(rows).fill(null).map(() => new Array(cols).fill(false));
}

function toggleCell(row, col) {
    grid[row][col] = !grid[row][col];
    drawGrid();
}

function drawGrid() {
    const cells = gridElement.children;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = cells[i * cols + j];
            cell.classList.toggle('alive', grid[i][j]);
        }
    }
}

function randomizeGrid() {
    grid = grid.map(row => row.map(() => Math.random() > 0.5));
    drawGrid();
}

function writeName() {
    grid = createGrid(rows, cols);
    const name = [
        "0110", "1001", "1001", "1111", // A
        "0000",
        "1110", "1001", "1110", "1001", "1110", // B
    ];
    let startRow = 1, startCol = 1;
    name.forEach((row, i) => {
        if (row === "0000") {
            startRow++;
            startCol = 1;
        } else {
            row.split('').forEach((cell, j) => {
                grid[startRow + i][startCol + j] = cell === '1';
            });
            startCol += row.length + 1;
        }
    });
    drawGrid();
}

function getNextState(grid) {
    const nextGrid = createGrid(rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbours = countAliveNeighbours(grid, row, col);
            if (grid[row][col]) {
                nextGrid[row][col] = aliveNeighbours === 2 || aliveNeighbours === 3;
            } else {
                nextGrid[row][col] = aliveNeighbours === 3;
            }
        }
    }
    return nextGrid;
}

function countAliveNeighbours(grid, row, col) {
    const neighbours = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    return neighbours.reduce((aliveCount, [dx, dy]) => {
        const x = row + dx, y = col + dy;
        if (x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y]) {
            aliveCount++;
        }
        return aliveCount;
    }, 0);
}

function gameLoop() {
    grid = getNextState(grid);
    drawGrid();
}

function toggleGame() {
    if (running) {
        clearInterval(interval);
    } else {
        interval = setInterval(gameLoop, 500);
    }
    running = !running;
}

drawGrid();
