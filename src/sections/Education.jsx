import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const Education = () => {
  const educationData = [
    {
      degree: 'Master of Science in Cybersecurity and Analytics',
      school: 'Pennsylvania State University',
      location: 'State College, PA, USA',
      period: 'Aug 2024 - May 2026',
      gpa: '4.0 / 4.0',
      logo: '/psu-logo.png',
      coursework: [
        'Network Management & Security',
        'Software Security',
        'Web & E-Comm Security',
        'Information Security',
        'Cloud Security',
        'Cybersecurity Analytics',
      ],
    },
    {
      degree: 'Bachelor of Technology in Information Technology',
      minor: 'Cybersecurity and Digital Forensics',
      school: 'Ramrao Adik Institute of Technology',
      location: 'Navi Mumbai, India',
      period: 'Nov 2020 - May 2024',
      gpa: '7.9 / 10',
      logo: '/rait-logo.png',
      logoBg: true,
      coursework: [
        'Ethical Hacking',
        'Digital Forensics',
        'Database Management',
        'Cloud Infrastructure & Security',
        'Data Structures & Algorithms',
      ],
    },
  ];

  return (
    <Section
      id="education"
      title="Education"
      subtitle="Where I Learned to Break (and Fix) Things"
      className="bg-navy-light/30 relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>

      <div className="relative grid gap-8">
        {educationData.map((edu, index) => (
          <Card
            key={index}
            glow
            variant="elevated"
            className="hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex gap-4 items-start">
                {edu.logo && (
                  <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center ${edu.logoBg ? 'bg-white rounded-lg p-2' : ''}`}>
                    <img
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  {edu.minor && (
                    <p className="text-lg text-text-light mb-3">
                      <span className="text-electric-blue/80">Minor:</span> {edu.minor}
                    </p>
                  )}
                  <p className="text-xl text-electric-blue mb-1">{edu.school}</p>
                  <p className="text-text-slate">{edu.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-text-light font-semibold">{edu.period}</p>
                <p className="text-electric-blue">GPA: {edu.gpa}</p>
              </div>
            </div>

            {edu.coursework && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Relevant Coursework</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {edu.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-text-slate"
                    >
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Education;
