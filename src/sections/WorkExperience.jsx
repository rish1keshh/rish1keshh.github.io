import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const WorkExperience = () => {
  const experiences = [
    {
      title: 'Instructional Assistant',
      course: 'CYBER 362: Cybersecurity Analytics',
      company: 'Pennsylvania State University',
      location: 'State College, PA, USA',
      logo: '/psu-logo.png',
      period: 'Aug 2025 - Present',
      type: 'Part-time',
      achievements: [
        'Led hands-on security operations and network forensics labs using Splunk, Wireshark, and packet analysis tools',
        'Guided students in identifying suspicious traffic, anomalies, and intrusion patterns in real-world datasets',
        'Helped improve incident detection speed by 30% through structured investigation workflows',
        'Mentored 50+ students in Python scripting for automation, log parsing, and security analytics',
        'Supported fault isolation and root-cause analysis for network and system failures',
        'Reviewed and graded 100+ cybersecurity and networking labs to improve detection logic and configurations',
        'Reduced repeated misconfigurations by 20% through targeted technical feedback',
        'Assisted in developing lab documentation and troubleshooting guides',
      ],
      technologies: ['Splunk', 'Wireshark', 'Python', 'Canvas LMS', 'Microsoft 365'],
    },
  ];

  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="Building Skills That Matter"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-cyan-bright to-electric-blue opacity-30 hidden md:block"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-0 md:pl-20">
              {/* Timeline node */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-electric-blue border-4 border-navy-dark animate-pulse-slow hidden md:block"></div>

              {/* Timeline connector */}
              <div className="absolute left-8 top-12 w-12 h-0.5 bg-electric-blue/30 hidden md:block"></div>

              <Card
                glow
                variant="elevated"
                className="hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b border-electric-blue/20">
              <div className="flex-1 flex gap-4 items-start">
                {exp.logo && (
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  {exp.course && (
                    <p className="text-lg text-text-light mb-3">
                      <span className="text-electric-blue/80">Course:</span> {exp.course}
                    </p>
                  )}
                  <p className="text-xl text-electric-blue mb-1">{exp.company}</p>
                  <p className="text-text-slate">{exp.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-text-light font-semibold mb-1">{exp.period}</p>
                <span className="inline-block px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-full text-sm">
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
              <ul className="space-y-3">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-slate">
                    <svg
                      className="w-5 h-5 text-electric-blue mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            {exp.technologies && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 glass glass-hover rounded text-electric-blue text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
