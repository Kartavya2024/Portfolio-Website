import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ShieldAlert, Network, Wind, GraduationCap, Info, X } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { projectsData } from '../config/portfolioData';

const projectIcons = {
  'device-monitoring': ShieldAlert,
  'graphrag-system': Network,
  'aqi-analysis': Wind,
  'academic-recovery': GraduationCap,
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [placeholderModal, setPlaceholderModal] = useState(null);

  const categories = ['All', 'Cybersecurity & Systems', 'AI / ML & RAG', 'Data Science & ML'];

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const handleLinkClick = (e, url, title, type) => {
    e.preventDefault();
    if (!url) {
      setPlaceholderModal({
        title,
        type,
        message: `The ${type} link for "${title}" is currently configured as a placeholder. You can update this in 'client/src/config/portfolioData.js' prior to final submission.`,
      });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="Academic & Technical Work"
          title="Featured Projects"
          subtitle="Real projects from my Computer Science coursework, combining systems engineering, AI/ML models, and data pipelines."
        />

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
                background: filter === cat ? 'var(--gradient-brand)' : 'var(--bg-card)',
                color: filter === cat ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const Icon = projectIcons[project.id] || Network;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2rem',
                    position: 'relative',
                  }}
                >
                  {/* Top Badge & Icon */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(59, 130, 246, 0.12)',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-blue)',
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span className="badge badge-violet">{project.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>{project.title}</h3>
                    <h4
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--accent-cyan)',
                        fontWeight: 600,
                        marginBottom: '1rem',
                      }}
                    >
                      {project.subtitle}
                    </h4>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.45rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {project.highlights.map((h, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Badges & Action Buttons */}
                  <div>
                    {/* Tech Badges */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '1rem',
                      }}
                    >
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge code-font">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions: GitHub & Live Demo */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        onClick={(e) => handleLinkClick(e, project.githubUrl, project.title, 'GitHub Repository')}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%' }}
                        title={project.githubUrl ? 'View GitHub Repository' : 'Placeholder (Click for details)'}
                      >
                        <Github size={15} />
                        <span>{project.githubUrl ? 'GitHub' : 'Repo (Config)'}</span>
                      </button>

                      <button
                        onClick={(e) => handleLinkClick(e, project.liveUrl, project.title, 'Live Demo')}
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%' }}
                        title={project.liveUrl ? 'Open Live Demo' : 'Placeholder (Click for details)'}
                      >
                        <ExternalLink size={15} />
                        <span>{project.liveUrl ? 'Live Demo' : 'Demo (Config)'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal for Placeholder Notifications */}
        <AnimatePresence>
          {placeholderModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(6px)',
                padding: '1rem',
              }}
              onClick={() => setPlaceholderModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                  maxWidth: '480px',
                  width: '100%',
                  padding: '2rem',
                  background: 'var(--bg-secondary)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Info size={20} color="var(--accent-blue)" />
                    <h3 style={{ fontSize: '1.15rem' }}>Configurable Link Notice</h3>
                  </div>
                  <button
                    onClick={() => setPlaceholderModal(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {placeholderModal.message}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setPlaceholderModal(null)} className="btn btn-primary btn-sm">
                    Understood
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
