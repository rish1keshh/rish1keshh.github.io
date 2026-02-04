import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const Projects = () => {
  const projects = [
    {
      title: 'Network Intrusion Detection Lab',
      description: 'Designed a SHA-256–driven polymorphic incident response lab that generates unique attack scenarios and trains students in real-world IDS detection and analysis.',
      technologies: ['Docker', 'Docker Compose', 'Snort', 'Python', 'tcpdump', 'Linux', 'YAML', 'hping3', 'SHA-256'],
      highlights: [
        'Designed a cryptographically deterministic polymorphic attack system using SHA-256 to generate per-student IPs, ports, payloads, and attack types, achieving 100% parameter uniqueness and preventing answer sharing across cohorts',
        'Built an automated orchestration framework in Python to dynamically configure Docker networking, container hostnames, and IDS settings for 6-node lab environments, enabling fully personalized deployments in under 60 seconds',
        'Implemented hash-based parameter extraction to derive attacker IPs, ports, and payloads from student credentials, ensuring reproducibility while maintaining collision resistance across 50+ users',
        'Engineered a simulated attacker using hping3 to execute TCP SYN, UDP flood, XMAS scan, and null scan attacks every 15 seconds with randomized jitter, increasing realism and resistance to pattern memorization',
        'Developed weighted traffic generators across 4 workstation containers to produce human-like background noise, masking attacks with 100+ concurrent HTTP, DNS, download, and probe events per session',
        'Modeled realistic user behavior using probabilistic timing distributions (0.5–20s delays), improving traffic realism by 40% compared to static generators',
        'Configured a Snort-based IDS gateway with NAT, packet capture, and filtering capabilities to support hands-on forensic analysis and intrusion detection training',
        'Created an adaptive flag validation system with dynamic penalties that increased attack intervals by 10 seconds per failed attempt, reducing brute-force success rates by over 90%',
        'Designed a multi-stage learning workflow requiring students to identify attack patterns, extract indicators of compromise, and author custom Snort rules with 5-point automated verification',
        'Achieved 91% overall system quality by integrating automated validation pipelines and real-time feedback mechanisms',
        'Developed a comprehensive test suite with 19 unit tests to verify hash determinism, parameter bounds, reserved IP avoidance, and cryptographic integrity, ensuring 94% test coverage',
        'Ensured long-term reproducibility by enforcing deterministic hash outputs, allowing students to recreate identical environments while maintaining complete isolation between users',
        'Automated attacker termination through shared-volume signaling, enabling controlled shutdowns upon successful IDS detection and reducing manual intervention to zero',
      ],
      date: 'May 2025',
      association: 'Penn State University',
      links: {
        github: 'https://github.com/trigerman/IncidentResponseLab',
      },
    },
    {
      title: 'ZeroShield: Defensive DNS Infrastructure',
      description: 'Privacy-hardened Raspberry Pi Zero 2 W DNS resolver combining Pi-hole, Unbound, and Cloudflared for network-wide ad-blocking and malware protection without relying on third-party DNS providers. Features recursive DNS resolution querying root servers directly.',
      technologies: ['Linux Networking', 'TCP/IP', 'DNS Architecture', 'NAT', 'Raspberry Pi', 'Unbound', 'DNSSEC', 'Cloudflared'],
      highlights: [
        'Designed a privacy-first DNS architecture integrating Pi-hole, Unbound, and Cloudflared to secure all network traffic, achieving 100% ad and malware filtering coverage across connected devices',
        'Built a recursive DNS resolution pipeline using Unbound to eliminate third-party resolvers, ensuring 100% query privacy through direct root-server resolution',
        'Implemented DNSSEC validation with hardened security settings to cryptographically authenticate all responses, reducing spoofing and cache-poisoning risk to near zero',
        'Optimized DNS performance on a 512MB RAM Raspberry Pi Zero 2 W by tuning cache sizes (4MB message, 8MB RRset) and socket buffers, maintaining stable resolution under peak loads',
        'Configured a 1GB swap file to prevent memory exhaustion during traffic spikes, eliminating out-of-memory crashes and improving system uptime by over 90%',
        'Engineered a strict-order DNS resolution workflow to force sequential upstream processing, ensuring Unbound handled 100% of queries before DoH fallback activation',
        'Eliminated DNS race conditions between recursive and encrypted resolvers, preventing privacy bypass in 100% of observed query paths',
        'Integrated Cloudflared as an encrypted DNS-over-HTTPS failover to maintain secure resolution during upstream failures',
        'Enhanced threat protection by supplementing default blocklists with phishing and malware feeds, increasing malicious domain blocking effectiveness by over 30%',
        'Implemented 7-day log retention policies to reduce storage usage, lowering disk consumption by approximately 60%',
        'Deployed the system as a centralized gateway serving multiple devices, providing network-wide protection with zero client-side configuration',
        'Achieved continuous, low-latency DNS resolution on constrained hardware through single-threaded resolver optimization',
      ],
      date: 'Aug 2025',
      links: {
        github: 'https://github.com/rish1keshh/ZeroShield',
      },
    },
    {
      title: 'Two-Step Graphical Authentication System',
      description: 'Graphical authentication system using cued click points and image-based OTP generation for two-factor authentication. Users select points on images during registration and generate OTPs from grid values for secure login.',
      technologies: ['Python', 'Tkinter', 'MySQL', '2FA'],
      highlights: [
        'Designed graphical authentication using cued click points on four images for user registration',
        'Integrated OTP generation from grid values of a fifth image, implementing two-factor authentication',
        'Achieved 80%+ authentication accuracy using Python, Tkinter GUI, and MySQL backend',
      ],
      date: 'Jan 2024 - May 2024',
      association: 'DY Patil University',
      links: {},
    },
    {
      title: 'Data Leakage Detection',
      description: 'Data leakage detection platform using watermarking and K-anonymity techniques to identify and prevent unauthorized data sharing. Includes proactive breach detection and user awareness campaigns for organizational data privacy.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'K-Anonymity'],
      highlights: [
        'Built detection platform using watermarking and K-anonymity, achieving 92% detection rate in internal test scenarios',
        'Reduced system response time by 20% through backend optimization with PHP and MySQL',
        'Improved data privacy awareness among 50+ users through simulated data breach campaigns',
      ],
      date: 'Aug 2023 - Nov 2023',
      association: 'DY Patil University',
      links: {},
    },
  ];

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Where Curiosity Meets Controlled Destruction"
      className="bg-navy-light/30 relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>

      <div className="relative flex flex-col gap-6 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <Card
            key={index}
            glow
            variant="elevated"
            className="transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-text-slate text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Key Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-baseline gap-2 text-text-slate text-sm">
                    <span className="text-electric-blue shrink-0">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            {(project.links.github || project.links.demo) && (
              <div className="flex gap-2 pt-4 border-t border-electric-blue/20">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-electric-blue hover:bg-electric-blue/10"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 glass glass-hover text-electric-blue"
                  >
                    Live Demo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
