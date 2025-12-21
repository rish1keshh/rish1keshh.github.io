import React, { useState } from 'react';

const PuzzleGrid = () => {
  const [activeCell, setActiveCell] = useState(null);

  const cells = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="grid grid-cols-3 gap-2 w-32 h-32">
      {cells.map((cell) => (
        <div
          key={cell}
          onMouseEnter={() => setActiveCell(cell)}
          onMouseLeave={() => setActiveCell(null)}
          className={`
            border border-electric-blue/30 rounded
            transition-all duration-300
            ${activeCell === cell
              ? 'bg-electric-blue/20 scale-110 rotate-12'
              : 'bg-electric-blue/5'
            }
            hover:cursor-pointer
          `}
        />
      ))}
    </div>
  );
};

export default PuzzleGrid;
