import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeader from '../components/SectionHeader';
import { personalInfo } from '../config/portfolioData';
import { submitContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '', // Honeypot field: invisible to real users
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  // Validate form client-side before dispatching
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Bot honeypot check
    if (formData._hp) {
      console.warn('Bot detected via honeypot.');
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const result = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _hp: formData._hp,
      });

      // Successful persistence verified by backend response
      setStatusMessage({
        type: 'success',
        text: result.message || 'Message sent and stored in MongoDB successfully!',
      });

      // Confetti burst for delight
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });

      // Clear form inputs
      setFormData({
        name: '',
        email: '',
        message: '',
        _hp: '',
      });
    } catch (error) {
      console.error('Contact submission failed:', error.message);
      setStatusMessage({
        type: 'error',
        text: error.message || 'Failed to send message. Please ensure the backend and MongoDB are configured.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          pill="Get In Touch"
          title="Contact Me"
          subtitle="Have a question, internship inquiry, or project collaboration? Drop a message below."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {/* Left Column: Direct Contact Info & Academic Context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Let's Connect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                I am actively seeking internship opportunities, technical discussions, and full-stack software collaborations. Messages submitted through this form are validated and persisted in MongoDB via our Node.js/Express REST API.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Location Card */}
              <div
                className="glass-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(59, 130, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{personalInfo.location}</div>
                </div>
              </div>

              {/* Institution Card */}
              <div
                className="glass-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(139, 92, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-violet)',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Academic Affiliation</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{personalInfo.institution}</div>
                </div>
              </div>

              {/* Social Connect */}
              <div
                className="glass-card"
                style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <Linkedin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Professional Network</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {personalInfo.socialLinks.linkedin ? (
                      <a
                        href={personalInfo.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}
                      >
                        LinkedIn Profile
                      </a>
                    ) : (
                      'Available on Request'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{ padding: '2.25rem', background: 'var(--bg-card)' }}
          >
            {/* Status Notifications */}
            {statusMessage && (
              <div
                role="alert"
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  background:
                    statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: `1px solid ${statusMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                  color: statusMessage.type === 'success' ? '#10b981' : '#f87171',
                  fontSize: '0.9rem',
                }}
              >
                {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <div style={{ flex: 1, lineHeight: 1.5 }}>{statusMessage.text}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Anti-spam Honeypot (hidden from view) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="contact-hp">Do not fill this</label>
                <input
                  id="contact-hp"
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              {/* Name Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Full Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Kartavya Garhwal or Recruiter"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.name ? 'var(--accent-rose)' : 'var(--border-card)'}`,
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                {errors.name && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', marginTop: '0.3rem', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Email Address <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. recruiter@company.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.email ? 'var(--accent-rose)' : 'var(--border-card)'}`,
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                {errors.email && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', marginTop: '0.3rem', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Message <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding your opportunity or inquiry..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.message ? 'var(--accent-rose)' : 'var(--border-card)'}`,
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                {errors.message && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', marginTop: '0.3rem', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
