import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon = null
}) => {
  const variants = {
    primary: 'bg-electric-blue text-navy-dark hover:bg-electric-blue/90 btn-pulse ripple glow-hover',
    secondary: 'glass glass-hover text-electric-blue border-electric-blue/50 ripple border-neon',
    ghost: 'text-electric-blue hover:bg-electric-blue/10 ripple',
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-medium
        transition-all duration-300
        flex items-center space-x-2
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
