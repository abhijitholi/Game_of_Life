import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Grid from '../components/Grid';
import { createGrid, getNextState } from '../lib/gameOfLife';

const Home: React.FC = () => {
  const rows = 30;
  const cols = 30;
  const [grid, setGrid] = useState(createGrid(rows, cols));
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      const id = setInterval(() => {
        setGrid(prevGrid => getNextState(prevGrid));
      }, 500);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [running]);

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const randomizeGrid = () => {
    const newGrid = grid.map(row => row.map(() => Math.random() > 0.5));
    setGrid(newGrid);
  };

  const writeName = () => {
    const newGrid = createGrid(rows, cols);
    const namePattern = [
      "0110", "1001", "1001", "1111", // A
      "0000",
      "1110", "1001", "1110", "1001", "1110", // B
    ];
    let startRow = 1, startCol = 1;
    namePattern.forEach((row, i) => {
      if (row === "0000") {
        startRow++;
        startCol = 1;
      } else {
        row.split('').forEach((cell, j) => {
          newGrid[startRow + i][startCol + j] = cell === '1';
        });
        startCol += row.length + 1;
      }
    });
    setGrid(newGrid);
  };

  const toggleGame = () => {
    setRunning(!running);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <meta name="description" content="Conway's Game of Life implemented with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold mb-4">Conway&apos;s Game of Life</h1>
        <Grid grid={grid} toggleCell={toggleCell} />
        <div className="mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={randomizeGrid}
          >
            Randomize
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={writeName}
          >
            Write Name
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={toggleGame}
          >
            {running ? 'Stop' : 'Start'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
