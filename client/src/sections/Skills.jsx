import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Code2, Database, BrainCircuit, Wrench, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { skillsCategories } from '../config/portfolioData';

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  languages: Code2,
  databases: Database,
  'data-science': BrainCircuit,
  tools: Wrench,
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories =
    activeTab === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="Skills & Technologies"
          title="Technical Competencies & Stack"
          subtitle="Organized across core engineering domains with realistic academic proficiency indicators."
        />

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-card)',
              background: activeTab === 'all' ? 'var(--gradient-brand)' : 'var(--bg-card)',
              color: activeTab === 'all' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All Categories
          </button>
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
                background: activeTab === cat.id ? 'var(--gradient-brand)' : 'var(--bg-card)',
                color: activeTab === cat.id ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Category Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredCategories.map((category, idx) => {
            const Icon = categoryIcons[category.id] || Code2;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(59, 130, 246, 0.12)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.15rem' }}>{category.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{category.description}</p>
                  </div>
                </div>

                {/* Skill Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.15rem 0.45rem',
                              borderRadius: '4px',
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {skill.level}
                          </span>
                          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--accent-blue)' }}>
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div
                        role="progressbar"
                        aria-valuenow={skill.proficiency}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${skill.name} proficiency level ${skill.proficiency}%`}
                        style={{
                          width: '100%',
                          height: '7px',
                          borderRadius: '4px',
                          background: 'var(--bg-tertiary)',
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                          style={{
                            height: '100%',
                            background: 'var(--gradient-brand)',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
