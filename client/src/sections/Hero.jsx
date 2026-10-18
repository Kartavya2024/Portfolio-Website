import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, FileText, Send, Github, Linkedin, Sparkles, Terminal } from 'lucide-react';
import { personalInfo } from '../config/portfolioData';
import { getResumePdfUrl, getResumeDocxUrl, triggerDownload } from '../services/api';

const Hero = () => {
  // Typewriter effect state
  const roles = personalInfo.rolesToRotate;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const currentFullText = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText === currentFullText) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 60 : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles, typingSpeed]);

  const handleDownload = (format) => {
    const url = format === 'pdf' ? getResumePdfUrl() : getResumeDocxUrl();
    const filename = `Kartavya_Garhwal_Resume.${format}`;
    triggerDownload(url, filename);
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--header-height) + 2rem)',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Abstract Glowing Accent Circles */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '400px',
          background: 'var(--gradient-glow)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          {/* Greeting Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', marginBottom: '1.25rem' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                fontSize: '0.85rem',
                color: 'var(--accent-blue)',
                fontWeight: 600,
              }}
            >
              <Terminal size={15} />
              <span>Hello, I am {personalInfo.name}</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
            }}
          >
            Building Scalable Web Systems & <span className="gradient-text">Intelligent Applications</span>
          </motion.h1>

          {/* Animated Typewriter Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              minHeight: '2.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <span>I'm a</span>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>
              {displayedText}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1.3em',
                background: 'var(--accent-cyan)',
                animation: 'blink 1s infinite',
              }}
            />
          </motion.div>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Third-year Computer Science Engineering student at{' '}
            <strong style={{ color: 'var(--text-primary)' }}>JK Lakshmipat University</strong>. Specialized in the{' '}
            <strong style={{ color: 'var(--accent-blue)' }}>MERN Stack</strong>, Python, Machine Learning architectures, and Cybersecurity telemetry.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowDown size={17} />
            </a>

            <a href="#contact" className="btn btn-outline">
              <Send size={17} />
              <span>Contact Me</span>
            </a>

            {/* Resume Downloads */}
            <button
              onClick={() => handleDownload('pdf')}
              className="btn btn-secondary"
              title="Download Resume in PDF Format from Backend"
            >
              <Download size={17} color="#ef4444" />
              <span>Download CV (PDF)</span>
            </button>

            <button
              onClick={() => handleDownload('docx')}
              className="btn btn-secondary"
              title="Download Resume in Word (.docx) Format from Backend"
            >
              <Download size={17} color="#2563eb" />
              <span>Download CV (Word)</span>
            </button>
          </motion.div>

          {/* Social Links & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            {personalInfo.socialLinks.github && (
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Github size={17} />
                <span>GitHub</span>
              </a>
            )}

            {personalInfo.socialLinks.linkedin && (
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
            )}

            <span>•</span>
            <span>📍 {personalInfo.location}</span>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
