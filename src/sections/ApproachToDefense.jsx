import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const ApproachToDefense = () => {
  return (
    <Section
      id="approach"
      title="Approach to Defense"
      subtitle="Method Before Momentum"
      className="bg-navy-dark/20 relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-[0.02]"></div>

      <div className="relative max-w-3xl mx-auto">
        <Card
          variant="minimal"
          className="animate-fade-in-up backdrop-blur-sm"
        >
          <div className="space-y-6">
            <p className="text-base text-text-slate/80 leading-loose font-light text-justify indent-8">
              My approach to cybersecurity is shaped by curiosity more than certainty. I learn by building systems, testing defenses, and observing how attacks behave in controlled environments. I am especially drawn to blue team work because it values calm investigation, context, and learning from failure rather than quick conclusions.
            </p>
            <p className="text-base text-text-slate/80 leading-loose font-light text-justify">
              I spend a lot of time paying attention to what happens after something breaks. Alerts, logs, packet captures, and system behavior often tell a clearer story than assumptions do. Understanding that story is what interests me most. It is where technical skill meets judgment, and where good defense is built through patience and clarity.
            </p>
            <p className="text-base text-text-slate/80 leading-loose font-light text-justify">
              I am still early in my career, and I see that as an advantage. It allows me to stay open, methodical, and focused on strengthening fundamentals instead of chasing labels. I am intentional about learning why systems behave the way they do, how small misconfigurations turn into real incidents, and how defenders can respond thoughtfully under pressure.
            </p>
            <p className="text-base text-text-slate/80 leading-loose font-light text-justify">
              My goal is not to rush toward titles, but to grow into a defender who understands systems deeply, communicates clearly during incidents, and improves defenses based on evidence rather than instinct. I care about building security that holds up when things go wrong, not just when everything is quiet.
            </p>
          </div>
        </Card>

        {/* Closing quote with soft styling */}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-slate/60 leading-loose font-light italic max-w-2xl mx-auto">
            "Defense is more than just a method; it is the essence of strategy." – Carl von Clausewitz
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ApproachToDefense;
