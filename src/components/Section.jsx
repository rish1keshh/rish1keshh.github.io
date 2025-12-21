import React from 'react';

const Section = ({ id, title, subtitle, children, className = '' }) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
              <span className="w-12 h-1 bg-electric-blue"></span>
              {title}
            </h2>
            {subtitle && (
              <p className="text-text-slate text-lg ml-16">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
