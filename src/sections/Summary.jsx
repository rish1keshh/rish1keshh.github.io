import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import ConnectionSnapshot from '../components/ConnectionSnapshot';

const Summary = ({ onTypingComplete, typingComplete }) => {
  const skillCategories = [
    {
      title: 'Security Operations',
      icon: '🔐',
      skills: ['Threat Detection', 'Incident Response', 'SIEM & Log Analysis', 'Alert Triage'],
    },
    {
      title: 'Network & Infrastructure',
      icon: '🌐',
      skills: ['Network Security', 'Network Traffic Analysis', 'DNS Security', 'TCP/IP & Routing', 'Firewall Fundamentals'],
    },
    {
      title: 'Systems & Engineering',
      icon: '⚙️',
      skills: ['Linux Administration', 'Security Monitoring', 'System Hardening', 'Infrastructure Troubleshooting'],
    },
    {
      title: 'Automation & Analysis',
      icon: '🤖',
      skills: ['Python & Automation', 'Log Parsing'],
    },
  ];

  // Typing animation state
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const phrases = ['$ whoami', 'Rishikesh Galande'];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterTyping = 1500; // Pause after typing complete phrase
    const pauseAfterDeleting = 500; // Pause after deleting

    const handleTyping = () => {
      if (!isDeleting && displayedText === currentPhrase) {
        // Finished typing current phrase
        if (phraseIndex === phrases.length - 1) {
          // Last phrase - keep it and stop, mark typing as complete after a brief pause
          setTimeout(() => onTypingComplete(true), 800);
          return;
        }
        // Start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        return;
      }

      if (isDeleting && displayedText === '') {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => prev + 1);
        setTimeout(() => {}, pauseAfterDeleting);
        return;
      }

      // Type or delete one character
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayedText, phraseIndex, isDeleting]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Section
      id="summary"
      className="min-h-screen flex items-center justify-center relative animated-gradient overflow-hidden"
    >
      {/* Connection Snapshot - Educational background element */}
      <ConnectionSnapshot />

      {/* Multiple layered backgrounds */}
      <div className="absolute inset-0 gradient-mesh"></div>

      {/* Technical wireframe elements - Hidden on mobile for cleaner look */}

      {/* Scrolling Security Logs - Corners */}
      {/* Top Left Corner */}
      <div className="hidden lg:block absolute top-0 left-0 w-64 h-full overflow-hidden opacity-10 pointer-events-none z-[5]">
        <div className="animate-scroll-slow font-mono text-xs text-electric-blue space-y-1 pt-32">
          <div>[ALLOW] SRC:192.168.1.105 DST:443</div>
          <div>[ESTABLISHED] TCP 10.0.2.15:8080</div>
          <div>[DNS] Query: api.github.com</div>
          <div>[AUTH] User: admin SUCCESS</div>
          <div>[BLOCK] Port scan 203.0.113.42</div>
          <div>[INFO] SSL/TLS handshake OK</div>
          <div>[ALLOW] HTTP/2 GET /api/data</div>
          <div>[DNS] Response: 93.184.216.34</div>
          <div>[ESTABLISHED] SSH 192.168.1.50</div>
          <div>[ALLOW] HTTPS 443 established</div>
          <div>[INFO] Firewall rule applied</div>
          <div>[DNS] NOERROR status</div>
          <div>[ALLOW] SRC:10.0.1.20 DST:8443</div>
          <div>[AUTH] 2FA verified SUCCESS</div>
          <div>[BLOCK] Malicious payload</div>
          <div>[INFO] IDS signature match</div>
          <div>[ESTABLISHED] WebSocket conn</div>
          <div>[ALLOW] API request /v1/auth</div>
        </div>
      </div>

      {/* Bottom Left Corner */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-64 h-96 overflow-hidden opacity-10 pointer-events-none z-[5]">
        <div className="animate-scroll-medium font-mono text-xs text-cyan-bright space-y-1">
          <div>[INFO] Packet inspection OK</div>
          <div>[ALLOW] UDP 53 DNS query</div>
          <div>[ESTABLISHED] TLS 1.3 cipher</div>
          <div>[DNS] Recursive lookup OK</div>
          <div>[ALLOW] WebSocket upgrade</div>
          <div>[INFO] Rate limit: 100/min</div>
          <div>[BLOCK] SQL injection attempt</div>
          <div>[AUTH] JWT token valid</div>
          <div>[ALLOW] CORS preflight OK</div>
          <div>[ESTABLISHED] gRPC stream</div>
          <div>[INFO] Certificate verified</div>
          <div>[ALLOW] GraphQL query</div>
          <div>[DNS] Cache hit .example.com</div>
          <div>[BLOCK] XSS attempt blocked</div>
          <div>[INFO] Session timeout 30m</div>
        </div>
      </div>

      {/* Bottom Right Corner */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-72 h-80 overflow-hidden opacity-10 pointer-events-none z-[5]">
        <div className="animate-scroll-fast font-mono text-xs text-electric-blue space-y-1 pr-4 text-right">
          <div>[MONITOR] CPU: 45% MEM: 62%</div>
          <div>[ALLOW] REST API /users/auth</div>
          <div>[INFO] Threat score: LOW</div>
          <div>[ESTABLISHED] Redis cache</div>
          <div>[ALLOW] OAuth2 grant flow</div>
          <div>[DNS] TTL: 300s cached</div>
          <div>[INFO] Load balancer: OK</div>
          <div>[BLOCK] Brute force detected</div>
          <div>[ALLOW] CDN request proxied</div>
          <div>[ESTABLISHED] DB pool conn</div>
          <div>[INFO] Backup completed</div>
          <div>[ALLOW] Webhook delivered</div>
          <div>[MONITOR] Disk: 78% Network: OK</div>
          <div>[INFO] Security scan complete</div>
        </div>
      </div>

      {/* Radar sweep - top right - Hidden on mobile */}
      <div className="hidden lg:block absolute top-20 right-20 w-80 h-80 opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            {/* Gradient for sweep effect */}
            <radialGradient id="sweepGradient">
              <stop offset="0%" stopColor="#4AA3DF" stopOpacity="0" />
              <stop offset="70%" stopColor="#4AA3DF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4AA3DF" stopOpacity="0.8" />
            </radialGradient>

            {/* Glow filter for targets */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Concentric circles */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="15" fill="none" stroke="#4AA3DF" strokeWidth="0.5" opacity="0.3" />

          {/* Radial lines (spokes) */}
          <line x1="100" y1="100" x2="100" y2="10" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="163.6" y2="36.4" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="190" y2="100" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="163.6" y2="163.6" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="100" y2="190" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="36.4" y2="163.6" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="10" y2="100" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />
          <line x1="100" y1="100" x2="36.4" y2="36.4" stroke="#4AA3DF" strokeWidth="0.3" opacity="0.3" />

          {/* Sweep wedge with gradient */}
          <path d="M 100 100 L 100 10 A 90 90 0 0 1 163.6 36.4 Z" fill="url(#sweepGradient)" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          {/* Bright sweep line */}
          <line x1="100" y1="100" x2="100" y2="10" stroke="#4AA3DF" strokeWidth="2" opacity="1" filter="url(#glow)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>

          {/* Target dots with glow - First set */}
          <circle cx="75" cy="65" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0.8;0.8;0.8;0;0;0;0;0;0"
              keyTimes="0;0.05;0.2;0.3;0.35;0.5;0.7;0.85;0.95;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="85" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0.8;0.8;0.8;0;0;0;0;0"
              keyTimes="0;0.05;0.1;0.25;0.4;0.45;0.6;0.75;0.9;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="130" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0;0.8;0.8;0.8;0;0;0;0"
              keyTimes="0;0.1;0.15;0.2;0.35;0.5;0.55;0.7;0.85;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="110" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0;0;0.8;0.8;0.8;0;0;0"
              keyTimes="0;0.15;0.2;0.25;0.3;0.45;0.6;0.65;0.8;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="155" cy="145" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0;0;0;0.8;0.8;0.8;0;0"
              keyTimes="0;0.2;0.25;0.3;0.35;0.4;0.55;0.7;0.75;1"
              dur="15s" repeatCount="indefinite" />
          </circle>

          {/* Target dots - Second set at different positions */}
          <circle cx="145" cy="60" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0;0;0;0;0.8;0.8;0.8;0"
              keyTimes="0;0.45;0.5;0.55;0.6;0.65;0.7;0.85;0.95;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="140" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0;0;0;0;0;0;0;0.8;0.8;0.8"
              keyTimes="0;0.5;0.55;0.6;0.65;0.7;0.75;0.8;0.9;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="170" cy="130" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0.8;0;0;0;0;0;0;0;0.8;0.8"
              keyTimes="0;0.05;0.55;0.6;0.65;0.7;0.75;0.85;0.9;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="45" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0.8;0.8;0;0;0;0;0;0;0;0.8"
              keyTimes="0;0.1;0.15;0.6;0.65;0.7;0.75;0.8;0.9;1"
              dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="135" cy="165" r="2" fill="#4AA3DF" filter="url(#glow)">
            <animate attributeName="opacity"
              values="0.8;0.8;0.8;0;0;0;0;0;0;0"
              keyTimes="0;0.15;0.2;0.25;0.65;0.7;0.75;0.8;0.9;1"
              dur="15s" repeatCount="indefinite" />
          </circle>

          {/* Center dot */}
          <circle cx="100" cy="100" r="2" fill="#4AA3DF" opacity="1" filter="url(#glow)" />
        </svg>
      </div>

      {/* Network topology diagram - bottom left - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-32 left-20 w-80 h-80 opacity-10">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* Connection lines */}
          <line x1="50" y1="50" x2="150" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" />
          <line x1="150" y1="100" x2="250" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-cyan-bright" />
          <line x1="150" y1="100" x2="120" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" />
          <line x1="150" y1="100" x2="220" y2="180" stroke="currentColor" strokeWidth="0.5" className="text-cyan-bright" />
          <line x1="220" y1="180" x2="250" y2="250" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" />
          <line x1="120" y1="200" x2="50" y2="250" stroke="currentColor" strokeWidth="0.5" className="text-cyan-bright" />

          {/* Nodes */}
          <circle cx="50" cy="50" r="3" fill="currentColor" className="text-electric-blue animate-pulse-slow" />
          <circle cx="150" cy="100" r="4" fill="currentColor" className="text-cyan-bright animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          <circle cx="250" cy="80" r="3" fill="currentColor" className="text-electric-blue animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <circle cx="120" cy="200" r="3" fill="currentColor" className="text-cyan-bright animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <circle cx="220" cy="180" r="3" fill="currentColor" className="text-electric-blue animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <circle cx="250" cy="250" r="3" fill="currentColor" className="text-cyan-bright animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
          <circle cx="50" cy="250" r="3" fill="currentColor" className="text-electric-blue animate-pulse-slow" style={{ animationDelay: '0.7s' }} />
        </svg>
      </div>

      {/* Data stream lines - right side - Hidden on mobile */}
      <div className="hidden lg:block absolute top-1/4 right-10 w-64 h-96 opacity-10">
        <svg viewBox="0 0 200 400" className="w-full h-full">
          <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="120" x2="200" y2="120" stroke="currentColor" strokeWidth="0.5" className="text-cyan-bright" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="190" x2="200" y2="190" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="260" x2="200" y2="260" stroke="currentColor" strokeWidth="0.5" className="text-cyan-bright" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="330" x2="200" y2="330" stroke="currentColor" strokeWidth="0.5" className="text-electric-blue" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.8s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* Scanning line effect - moving across - Hidden on mobile */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-electric-blue to-transparent animate-scan"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10 px-4 sm:px-6 pt-20 md:pt-24">
        <div className="text-center mb-8 animate-fade-in-up">
          {/* Profile image */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg bg-gradient-to-br from-electric-blue/30 to-cyan-bright/20 flex items-center justify-center glow-lg animate-pulse-slow overflow-hidden">
              <img
                src="/profile.jpeg"
                alt="Rishikesh Galande"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title with typing animation - Responsive text sizes */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 md:mb-4 text-glow animate-fade-in-down min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center px-2">
            <span>
              {displayedText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </span>
          </h1>

          {/* Subtitle with gradient text - Responsive and wrapping on mobile */}
          <p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 bg-gradient-to-r from-electric-blue via-cyan-bright to-electric-blue bg-clip-text text-transparent px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: typingComplete ? 1 : 0,
              transform: typingComplete ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.2s'
            }}
          >
            Network Security Engineer
            <span className="hidden sm:inline"> | </span>
            <span className="sm:hidden"><br /></span>
            Detection, Monitoring & Defense
          </p>

          {/* Certification Badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4 md:mb-6 px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: typingComplete ? 1 : 0,
              transform: typingComplete ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.35s'
            }}
          >
            <a
              href="https://www.credly.com/badges/5a125f3c-d389-4062-a648-3d0381a489de"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="CompTIA Security+"
            >
              <img
                src="/security-plus-logo.png"
                alt="CompTIA Security+ Certified"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </a>
            <a
              href="https://www.credly.com/badges/1a424e43-7d77-484b-be66-ec2b32137194/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="AWS Certified Cloud Practitioner"
            >
              <img
                src="/aws-cloud-practitioner-logo.png"
                alt="AWS Certified Cloud Practitioner"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </div>

          {/* Description */}
          <p
            className="text-sm sm:text-base md:text-lg text-text-slate max-w-2xl mx-auto mb-6 md:mb-8 px-4 text-justify transition-all duration-1000 ease-out"
            style={{
              opacity: typingComplete ? 1 : 0,
              transform: typingComplete ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.5s'
            }}
          >
            I am a cybersecurity graduate student graduating in May 2026, focused on network security, threat detection, and defensive operations. I build hands-on labs, analyze real network traffic, and design monitoring systems to understand how attacks unfold and how to prevent them. As an early-career professional, I am committed to developing strong technical foundations and contributing to security teams with clarity and discipline.
          </p>

          {/* Buttons with enhanced effects - Stack on mobile, side-by-side on larger screens */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: typingComplete ? 1 : 0,
              transform: typingComplete ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.8s'
            }}
          >
            <a
              href="/Rishikesh_Galande_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">Download Resume</Button>
            </a>
            <a
              href="https://linkedin.com/in/rish1kesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">
                <span className="flex items-center gap-2">
                  LinkedIn
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </span>
              </Button>
            </a>
          </div>
        </div>

        {/* Bento Box Skills Grid */}
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: typingComplete ? 1 : 0,
            transform: typingComplete ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1.1s'
          }}
        >
            <Card
              className="mt-12 backdrop-blur-2xl"
              glow
              variant="gradient"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse-slow"></span>
                Core Competencies
              </h3>

              {/* Skills by category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className="glass glass-hover p-5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-electric-blue/20"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-text-light text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
        </div>
      </div>
    </Section>
  );
};

export default Summary;
