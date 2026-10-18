import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, Code, Cpu, Shield, Network } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { personalInfo, stats } from '../config/portfolioData';

const interestPills = [
  { name: 'Full-Stack Development', icon: Code, color: '#3b82f6' },
  { name: 'Artificial Intelligence', icon: Cpu, color: '#8b5cf6' },
  { name: 'Machine Learning', icon: Award, color: '#06b6d4' },
  { name: 'Cybersecurity Telemetry', icon: Shield, color: '#10b981' },
  { name: 'Retrieval-Augmented Generation', icon: Network, color: '#f59e0b' },
];

const About = () => {
  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="About Me"
          title="Bridging Engineering Fundamentals & Modern Web Systems"
          subtitle="A dedicated Computer Science student committed to building dependable, scalable, and intelligent software."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Profile Card with Local Avatar Asset */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Replaceable Avatar Asset */}
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                position: 'relative',
                marginBottom: '1.75rem',
                padding: '6px',
                background: 'var(--gradient-brand)',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.35)',
              }}
            >
              <img
                src="/avatar.svg"
                alt={`${personalInfo.name} Profile`}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  background: 'var(--bg-secondary)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '3px solid var(--bg-secondary)',
                }}
                title="Active & Ready for Opportunities"
              />
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{personalInfo.name}</h3>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>
              {personalInfo.degree}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                width: '100%',
                textAlign: 'left',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1.25rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <GraduationCap size={16} color="var(--accent-blue)" />
                <span>{personalInfo.institution}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Calendar size={16} color="var(--accent-violet)" />
                <span>{personalInfo.programDuration} • {personalInfo.currentYear}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="var(--accent-cyan)" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Technical Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
              Passionate About <span className="gradient-text">Systems, Intelligence & Security</span>
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {personalInfo.bio}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              My academic work centers around hands-on software development: creating MERN web applications, conducting machine learning predictive modeling, and developing anomaly detection solutions for endpoint security.
            </p>

            {/* Interest Pills */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                Core Focus Areas
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {interestPills.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <Icon size={15} color={item.color} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--accent-blue)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
