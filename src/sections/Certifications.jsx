import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';
import ShieldIcon from '../components/ShieldIcon';

const Certifications = () => {
  const certifications = [
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      date: 'July 2025',
      credentialId: 'T7KH80E58FEE2612',
      credentialUrl: 'https://www.credly.com/badges/5a125f3c-d389-4062-a648-3d0381a489de',
      status: 'Active',
      description: 'Industry-standard certification covering core security concepts, risk management, cryptography, and network security.',
      logo: '/security-plus-logo.png',
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: 'August 2025',
      credentialId: 'AWS05318847',
      credentialUrl: 'https://www.credly.com/badges/1a424e43-7d77-484b-be66-ec2b32137194/public_url',
      status: 'Active',
      description: 'Foundational certification demonstrating cloud computing knowledge and AWS platform expertise.',
      logo: '/aws-cloud-practitioner-logo.png',
    },
  ];

  const inProgress = [
    'CompTIA CySA+ (Cybersecurity Analyst)',
  ];

  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Certified. Verified. Ready."
    >
      {/* Active Certifications */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ShieldIcon className="text-electric-blue" size={28} />
          Active Certifications
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              glow
              variant="gradient"
              className="hover:scale-[1.02] transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {cert.logo ? (
                  <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                    <img src={cert.logo} alt={`${cert.name} logo`} className="w-20 h-20 object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 hexagon bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
                    <ShieldIcon className="text-electric-blue" size={32} />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">{cert.name}</h4>
                  <p className="text-electric-blue mb-2">{cert.issuer}</p>
                  <p className="text-text-slate text-sm mb-3">{cert.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <span className="text-text-slate">
                      <span className="text-white">Issued:</span> {cert.date}
                    </span>
                    <span className="text-text-slate">
                      <span className="text-white">ID:</span> {cert.credentialId}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      {cert.status}
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-full text-xs transition-colors"
                      >
                        <span>View Credential</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* In Progress / Planned */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse-slow"></div>
          In Progress
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {inProgress.map((cert, index) => (
            <Card
              key={index}
              variant="bordered"
              className="hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${(certifications.length + index) * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">⏳</span>
                <p className="text-text-light">{cert}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certifications;
