import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Typing animation state for location
  const [displayedLocation, setDisplayedLocation] = useState('');
  const [locationPhraseIndex, setLocationPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasViewed, setHasViewed] = useState(false);

  const locationPhrases = ['127.0.0.1', 'kidding', 'State College, PA'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
          }
        });
      },
      { threshold: 0.8 } // Trigger when 80% of section is visible
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [hasViewed]);

  // Typing effect for location (only starts when section is viewed)
  useEffect(() => {
    if (!hasViewed) return; // Don't run animation until section is viewed
    const currentPhrase = locationPhrases[locationPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterTyping = 1500; // Pause after typing complete phrase
    const pauseAfterDeleting = 500; // Pause after deleting

    const handleTyping = () => {
      if (!isDeleting && displayedLocation === currentPhrase) {
        // Finished typing current phrase
        if (locationPhraseIndex === locationPhrases.length - 1) {
          // Last phrase - keep it and stop
          return;
        }
        // Start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        return;
      }

      if (isDeleting && displayedLocation === '') {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setLocationPhraseIndex((prev) => prev + 1);
        setTimeout(() => {}, pauseAfterDeleting);
        return;
      }

      // Type or delete one character
      if (isDeleting) {
        setDisplayedLocation(currentPhrase.substring(0, displayedLocation.length - 1));
      } else {
        setDisplayedLocation(currentPhrase.substring(0, displayedLocation.length + 1));
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayedLocation, locationPhraseIndex, isDeleting, hasViewed]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just create a mailto link with the form data
    const mailtoLink = `mailto:rishigalande23@icloud.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      label: 'Email',
      value: 'rishigalande23@icloud.com',
      href: 'mailto:rishigalande23@icloud.com',
      ariaLabel: 'Send email'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'linkedin.com/in/rish1kesh',
      href: 'https://linkedin.com/in/rish1kesh',
      ariaLabel: 'Visit LinkedIn profile'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Location',
      value: displayedLocation,
      showCursor: true,
      href: null,
      ariaLabel: 'Location information'
    }
  ];

  return (
    <Section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-electric-blue to-cyan-bright mx-auto mb-6"></div>
          <p className="text-text-slate text-lg max-w-2xl mx-auto">
            Interested in collaborating or have a security opportunity? Feel free to reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact information */}
          <div className="space-y-6 animate-fade-in-left">
            <Card variant="gradient" glow>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse-slow"></span>
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="glass glass-hover p-4 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.label !== 'Email' ? '_blank' : undefined}
                        rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        aria-label={method.ariaLabel}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue/20 transition-colors">
                          {method.icon}
                        </div>
                        <div>
                          <p className="text-text-light font-semibold text-sm">{method.label}</p>
                          <p className="text-electric-blue group-hover:text-cyan-bright transition-colors">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                          {method.icon}
                        </div>
                        <div>
                          <p className="text-text-light font-semibold text-sm">{method.label}</p>
                          <p className="text-electric-blue">
                            {method.value}
                            {method.showCursor && (
                              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-400 font-medium">Available for opportunities</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact form */}
          <div className="animate-fade-in-right">
            <Card variant="gradient" glow>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse-slow"></span>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-text-light font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-dark/50 border border-electric-blue/20 text-white placeholder-text-slate/50 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text-light font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-dark/50 border border-electric-blue/20 text-white placeholder-text-slate/50 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-text-light font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-dark/50 border border-electric-blue/20 text-white placeholder-text-slate/50 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-light font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-navy-dark/50 border border-electric-blue/20 text-white placeholder-text-slate/50 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-bright text-navy-dark font-bold rounded-lg hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>

                <p className="text-text-slate text-sm text-center mt-2">
                  Your default email client will open with the message
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Additional call to action */}
        <div className="mt-12 text-center animate-fade-in-up">
          <Card variant="glass" className="inline-block">
            <p className="text-text-light">
              Looking for my resume?{' '}
              <a
                href="#"
                className="text-electric-blue hover:text-cyan-bright transition-colors font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle resume download
                  alert('Add your resume download link here');
                }}
              >
                Download it here
              </a>
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
