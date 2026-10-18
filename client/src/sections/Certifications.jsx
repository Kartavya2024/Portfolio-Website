import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Clock, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { certificationsData } from '../config/portfolioData';

const Certifications = () => {
  return (
    <section id="certifications" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="Credentials & Milestones"
          title="Certifications & Achievements"
          subtitle="Academic milestones, course completions, and modular placeholders ready for verified credentials."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header Row: Type & Verification Badge */}
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
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-sm)',
                      background: cert.isVerified ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      border: `1px solid ${cert.isVerified ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cert.isVerified ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                    }}
                  >
                    <Award size={22} />
                  </div>

                  {cert.isVerified ? (
                    <span className="badge badge-emerald" style={{ gap: '0.3rem' }}>
                      <CheckCircle2 size={12} />
                      <span>Verified Coursework</span>
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: 'var(--accent-amber)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                      }}
                    >
                      <Clock size={12} />
                      <span>Placeholder Entry</span>
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{cert.title}</h3>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 600,
                    marginBottom: '0.85rem',
                  }}
                >
                  {cert.issuer} • {cert.issueDate}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {cert.description}
                </p>
              </div>

              {/* Action / Link */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%' }}
                  >
                    <ExternalLink size={14} />
                    <span>View Credential</span>
                  </a>
                ) : (
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontStyle: 'italic',
                    }}
                  >
                    <HelpCircle size={14} />
                    <span>Configurable via portfolioData.js</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
