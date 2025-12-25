import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HexagonGrid from './components/HexagonGrid';
import BinaryRain from './components/BinaryRain';
import ParticleNetwork from './components/ParticleNetwork';
import CyberGrid from './components/CyberGrid';
import Summary from './sections/Summary';
import Education from './sections/Education';
import WorkExperience from './sections/WorkExperience';
import Projects from './sections/Projects';
import ApproachToDefense from './sections/ApproachToDefense';
import Certifications from './sections/Certifications';
import ExtraCurriculars from './sections/ExtraCurriculars';
import Contact from './sections/Contact';

function App() {
  const [typingComplete, setTypingComplete] = useState(false);

  // Lock scroll until typing is complete
  useEffect(() => {
    if (!typingComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [typingComplete]);

  return (
    <div className="min-h-screen bg-navy-dark overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Animated background effects - Reduce on mobile for better performance */}
      <div className="hidden md:block">
        <BinaryRain />
        <ParticleNetwork />
        <HexagonGrid />
      </div>
      <CyberGrid />

      {/* Main content */}
      <main>
        <Summary onTypingComplete={setTypingComplete} typingComplete={typingComplete} />
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: typingComplete ? 1 : 0,
            transform: typingComplete ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '0.5s'
          }}
        >
          <Education />
          <WorkExperience />
          <Projects />
          <ApproachToDefense />
          <Certifications />
          <ExtraCurriculars />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-light border-t border-electric-blue/20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-slate text-xs sm:text-sm text-center md:text-left">
              compiled with ☕ & ⚡
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a
                href="https://linkedin.com/in/rish1kesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-slate hover:text-electric-blue transition-colors text-sm sm:text-base py-2"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="mailto:rishigalande23@icloud.com"
                className="text-text-slate hover:text-electric-blue transition-colors text-sm sm:text-base py-2"
                aria-label="Email"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
