import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['summary', 'education', 'experience', 'projects', 'approach', 'certifications', 'extracurriculars', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'approach', label: 'Approach' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'extracurriculars', label: 'Extra-Curriculars' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'glass py-3 md:py-4 shadow-lg' : 'bg-transparent py-4 md:py-6'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/rg_logo.png" alt="RG Logo" className="w-10 h-10 md:w-12 md:h-12" />
            {/* Responsive logo text */}
            <span className="text-base md:text-xl font-bold text-white">
              <span className="hidden sm:inline">Rishikesh Galande's Portfolio</span>
              <span className="sm:hidden">RG Portfolio</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-sm font-medium transition-colors duration-300
                  ${activeSection === item.id
                    ? 'text-electric-blue'
                    : 'text-text-slate hover:text-electric-blue'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-electric-blue p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 z-50 md:hidden
          glass border-l border-electric-blue/20
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-electric-blue p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeSection === item.id
                    ? 'bg-electric-blue/20 text-electric-blue'
                    : 'text-text-slate hover:bg-white/5 hover:text-electric-blue'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
