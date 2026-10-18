import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Network, BarChart3, Calendar } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { timelineData } from '../config/portfolioData';

const timelineIcons = {
  'btech-cs': GraduationCap,
  'systems-projects': Code2,
  'ai-rag-research': Network,
  'data-analytics': BarChart3,
};

const Timeline = () => {
  return (
    <section id="timeline" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="Academic Journey"
          title="Education & Experience Timeline"
          subtitle="Chronological milestones across university coursework, research initiatives, and laboratory projects."
        />

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
          {/* Central Vertical Timeline Rule */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-blue) 0%, var(--accent-violet) 50%, rgba(59, 130, 246, 0.1) 100%)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {timelineData.map((item, idx) => {
              const Icon = timelineIcons[item.id] || GraduationCap;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    position: 'relative',
                  }}
                >
                  {/* Timeline Node Icon Circle */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'var(--bg-secondary)',
                      border: '2px solid var(--accent-blue)',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                      flexShrink: 0,
                      zIndex: 2,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Content Card */}
                  <div
                    className="glass-card"
                    style={{
                      flex: 1,
                      padding: '1.75rem',
                      background: 'var(--bg-card)',
                    }}
                  >
                    {/* Header Row: Title & Duration */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <h3 style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          color: 'var(--accent-blue)',
                          background: 'rgba(59, 130, 246, 0.1)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        <Calendar size={13} />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Subtitle / Organization */}
                    <div
                      style={{
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        color: 'var(--accent-violet)',
                        marginBottom: '0.85rem',
                      }}
                    >
                      {item.organization}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {item.tags.map((tag) => (
                          <span key={tag} className="badge code-font">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
