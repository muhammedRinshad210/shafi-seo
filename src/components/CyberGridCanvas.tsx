import React, { useEffect, useRef } from 'react';

interface ActiveCell {
  row: number;
  col: number;
  opacity: number;
}

export const CyberGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL_SIZE = 50;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let activeCells: ActiveCell[] = [];
    let currentRow = -2;
    let currentCol = -2;
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / CELL_SIZE);
      const row = Math.floor(e.clientY / CELL_SIZE);

      if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col;

        // Add target cell
        activeCells.push({ row, col, opacity: 180 });

        // Add random neighbors for authentic cyber trail feel
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            if (Math.random() < 0.45) {
              activeCells.push({
                row: row + dr,
                col: col + dc,
                opacity: 120
              });
            }
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle base grid lines
      ctx.strokeStyle = 'rgba(197, 182, 175, 0.04)';
      ctx.lineWidth = 1;

      const numCols = Math.ceil(width / CELL_SIZE);
      const numRows = Math.ceil(height / CELL_SIZE);

      ctx.beginPath();
      for (let c = 0; c <= numCols; c++) {
        const x = c * CELL_SIZE;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= numRows; r++) {
        const y = r * CELL_SIZE;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render active glowing lime cells
      const nextActiveCells: ActiveCell[] = [];

      for (const cell of activeCells) {
        if (cell.opacity > 0) {
          const x = cell.col * CELL_SIZE;
          const y = cell.row * CELL_SIZE;

          // Glowing border in #EBFB1D
          ctx.strokeStyle = `rgba(235, 251, 29, ${cell.opacity / 255})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

          // Subtle inner fill
          ctx.fillStyle = `rgba(235, 251, 29, ${(cell.opacity / 255) * 0.15})`;
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

          cell.opacity -= 4; // Fade per frame
          if (cell.opacity > 0) {
            nextActiveCells.push(cell);
          }
        }
      }

      activeCells = nextActiveCells;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-grid-canvas" aria-hidden="true" />;
};
