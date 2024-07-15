export type Grid = boolean[][];

export function createGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

export function getNextState(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
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

function countAliveNeighbours(grid: Grid, row: number, col: number): number {
  const neighbours = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  let count = 0;

  neighbours.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;

    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      if (grid[newRow][newCol]) {
        count++;
      }
    }
  });

  return count;
}
