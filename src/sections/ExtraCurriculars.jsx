import React, { useState } from 'react';
import Section from '../components/Section';
import Card from '../components/Card';
import PuzzleGrid from '../components/PuzzleGrid';

const ExtraCurriculars = () => {
  const [hoveredActivity, setHoveredActivity] = useState(null);

  const activities = [
    {
      title: 'TryHackMe',
      logo: '/tryhackme-logo.svg',
      description: 'Active on TryHackMe platform focusing on blue team operations and defensive security. Completed hands-on labs in threat detection, incident response, and security monitoring.',
      stats: [
        { label: 'Global Rank', value: 'Top 4%' },
        { label: 'Rooms Completed', value: '90' },
        { label: 'Focus Area', value: 'Blue Team' },
      ],
      skills: ['Threat Detection & Analysis', 'SIEM Operations', 'Network Traffic Analysis', 'Incident Response', 'Log Analysis', 'Security Monitoring'],
      link: 'https://tryhackme.com/p/overwrittxn',
    },
    {
      title: 'Football (Soccer)',
      icon: '⚽',
      description: 'Former captain and centre back for my school and high school team. Led defensive strategies and coordinated team operations on the field. As Sir Alex Ferguson said, "Attack wins you games, defence wins you titles."',
      stats: [
        { label: 'Position', value: 'Centre Back' },
        { label: 'Role', value: 'Captain' },
        { label: 'Teams', value: 'School & HS' },
      ],
      skills: ['Leadership', 'Strategic Defense', 'Team Coordination', 'Communication', 'Situational Awareness', 'Decision Making'],
    },
    {
      title: 'Sudoku & Logic Puzzles',
      icon: '🔢',
      description: 'Casual solver of Sudoku and various logic puzzles. A relaxing hobby that keeps the mind sharp and provides a satisfying mental challenge.',
      stats: [
        { label: 'Activity Type', value: 'Leisure' },
        { label: 'Difficulty', value: 'Medium-Hard' },
        { label: 'Frequency', value: 'Weekly' },
      ],
      skills: ['Logical Reasoning', 'Pattern Analysis', 'Focus'],
    },
  ];

  const interests = [
    'Capture The Flag (CTF) Challenges',
    'Cybersecurity Podcasts & Documentaries',
    'Video Games & Strategic Thinking',
    'Reading Technical & Non-Fiction Books',
    'Home Lab Projects & Experimentation',
    'Staying Current with Security Research',
  ];

  return (
    <Section
      id="extracurriculars"
      title="Extra-Curriculars"
      subtitle="Beyond the Keyboard"
      className="bg-navy-light/30 relative"
    >
      {/* Decorative puzzle grids */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <PuzzleGrid />
      </div>
      <div className="absolute bottom-20 left-10 opacity-15 hidden lg:block">
        <PuzzleGrid />
      </div>

      {/* Main Activities */}
      <div className="relative grid md:grid-cols-2 gap-8 mb-12">
        {activities.map((activity, index) => (
          <Card
            key={index}
            glow
            variant="elevated"
            className="hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredActivity(index)}
            onMouseLeave={() => setHoveredActivity(null)}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              {activity.logo ? (
                <div className={`w-14 h-14 flex items-center justify-center transform transition-transform duration-300 ${hoveredActivity === index ? 'scale-110' : ''}`}>
                  <img src={activity.logo} alt={`${activity.title} logo`} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className={`text-5xl transform transition-transform duration-300 ${hoveredActivity === index ? 'scale-125 rotate-12' : ''}`}>
                  {activity.icon}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{activity.title}</h3>
                <p className="text-text-slate text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 glass rounded">
              {activity.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-electric-blue font-bold text-lg">{stat.value}</p>
                  <p className="text-text-slate text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Transferable Skills</h4>
              <div className="flex flex-wrap gap-2">
                {activity.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            {activity.link && (
              <div className="mt-4 pt-4 border-t border-electric-blue/20">
                <a
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-sm py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-electric-blue hover:bg-electric-blue/10 ripple"
                >
                  View Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Other Interests */}
      <Card
        glow
        variant="gradient"
        className="animate-fade-in-up"
        style={{ animationDelay: `${activities.length * 0.1}s` }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">✨</span>
          Other Interests
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center gap-3 glass glass-hover p-3 rounded"
            >
              <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
              <p className="text-text-light">{interest}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
};

export default ExtraCurriculars;
