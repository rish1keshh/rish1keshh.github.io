import React from 'react';

const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  tilt = false,
  variant = 'default'
}) => {
  const variants = {
    default: 'glass',
    elevated: 'glass shadow-2xl',
    bordered: 'glass border-2 border-electric-blue/30',
    gradient: 'bg-gradient-to-br from-navy-light/50 to-navy-lighter/50 backdrop-blur-lg border border-white/10',
  };

  return (
    <div
      className={`
        ${variants[variant]} rounded-lg p-6
        ${hover ? 'glass-hover transform transition-all duration-300' : ''}
        ${glow ? 'glow-hover' : ''}
        ${tilt ? 'hover:scale-[1.02] hover:rotate-1' : ''}
        ${className}
      `}
      style={tilt ? {
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      } : {}}
    >
      {children}
    </div>
  );
};

export default Card;
