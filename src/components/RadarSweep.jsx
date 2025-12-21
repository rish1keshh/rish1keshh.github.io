import React from 'react';

const RadarSweep = () => {
  return (
    <div className="fixed top-20 right-20 w-64 h-64 pointer-events-none opacity-20 z-0">
      <div className="relative w-full h-full">
        {/* Radar circles */}
        <div className="absolute inset-0 border-2 border-electric-blue rounded-full opacity-30"></div>
        <div className="absolute inset-8 border border-electric-blue rounded-full opacity-20"></div>
        <div className="absolute inset-16 border border-electric-blue rounded-full opacity-10"></div>

        {/* Radar sweep line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-electric-blue to-transparent origin-left animate-radar-sweep"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-electric-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
    </div>
  );
};

export default RadarSweep;
