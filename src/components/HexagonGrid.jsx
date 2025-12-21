import React from 'react';

const HexagonGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div className="absolute top-10 left-10 w-20 h-20 hexagon bg-electric-blue animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 hexagon bg-electric-blue animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 hexagon bg-electric-blue animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 hexagon bg-electric-blue animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 hexagon bg-electric-blue animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default HexagonGrid;
