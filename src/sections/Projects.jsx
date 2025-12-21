import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

const Projects = () => {
  const projects = [
    {
      title: 'ZeroShield',
      description: 'Privacy-hardened Raspberry Pi Zero 2 W DNS resolver combining Pi-hole, Unbound, and Cloudflared for network-wide ad-blocking and malware protection without relying on third-party DNS providers. Features recursive DNS resolution querying root servers directly.',
      technologies: ['Pi-hole', 'Unbound', 'DNSSEC', 'Cloudflared', 'Raspberry Pi'],
      highlights: [
        'Recursive DNS resolver with DNSSEC validation bypassing commercial providers for enhanced privacy',
        'Strict-order DNS architecture with DoH failover preventing resolver race conditions',
        'Optimized for 512MB RAM with 1GB swap and database tuning for low-resource hardware',
      ],
      status: 'Completed',
      date: 'Aug 2025',
      links: {
        github: 'https://github.com/rish1keshh/ZeroShield',
      },
    },
    {
      title: 'Incident Response Lab',
      description: 'Containerized SOC lab simulating randomized network attacks for blue team training. Users investigate Snort alerts and packet captures to identify attack types, attacker IPs, and targeted ports in a realistic incident response scenario.',
      technologies: ['Docker', 'Snort', 'Python', 'TCPDump', 'Docker Compose', 'YAML'],
      highlights: [
        'Built containerized SOC lab simulating TCP SYN flood, UDP flood, Xmas scan, and Null scan attacks with randomized IPs and ports',
        'Automated attack traffic generation using Python scripts with Docker Compose orchestration for scalable deployment',
        'Implemented Snort for real-time intrusion detection and TCPDump for packet capture and network forensics analysis',
      ],
      status: 'Completed',
      date: 'May 2025',
      association: 'Penn State University',
      links: {
        github: 'https://github.com/trigerman/IncidentResponseLab',
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
      status: 'Completed',
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
      status: 'Completed',
      date: 'Aug 2023 - Nov 2023',
      association: 'DY Patil University',
      links: {},
    },
  ];

  const getStatusColor = (status) => {
    return status === 'Completed'
      ? 'bg-green-500/20 text-green-400'
      : status === 'In Progress'
      ? 'bg-yellow-500/20 text-yellow-400'
      : 'bg-blue-500/20 text-blue-400';
  };

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Cybersecurity projects and hands-on security implementations"
      className="bg-navy-light/30 relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>

      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
        {projects.map((project, index) => (
          <Card
            key={index}
            glow
            variant="elevated"
            className={`
              flex flex-col
              hover:scale-[1.02] transition-all duration-300
              animate-fade-in-up
              ${index % 3 === 0 ? 'lg:row-span-2' : ''}
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-text-slate text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-4 flex-1">
              <h4 className="text-sm font-semibold text-white mb-2">Key Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-text-slate text-sm">
                    <span className="text-electric-blue mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-4">
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

            {/* Links */}
            <div className="flex gap-2 mt-auto pt-4 border-t border-electric-blue/20">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-electric-blue hover:bg-electric-blue/10 ripple"
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
                  className="flex-1 text-sm py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 glass glass-hover text-electric-blue border-electric-blue/50 ripple border-neon"
                >
                  Live Demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
