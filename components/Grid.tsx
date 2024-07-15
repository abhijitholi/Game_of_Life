import React from 'react';

interface GridProps {
  grid: boolean[][];
  toggleCell: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell ? 'alive' : 'dead'}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Grid;
