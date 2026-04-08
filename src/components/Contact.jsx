import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: 'logeshwaran102002@gmail.com',
    href: 'mailto:logeshwaran102002@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 96297 01566',
    href: 'tel:+919629701566',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/logeshwaran23',
    href: 'https://linkedin.com/in/logeshwaran23',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/logeshwaran23',
    href: 'https://github.com/logeshwaran23',
  },
];

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const Contact = () => {
  const [sectionRef, isVisible] = useScrollReveal(0.15);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const body    = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    window.open(`mailto:logeshwaran102002@gmail.com?subject=${subject}&body=${body}`);
    setStatus('✅ Your email client has been opened. Looking forward to hearing from you!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">
          Let&apos;s <span className="gradient-text">Connect</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind or just want to say hi? My inbox is always open!
        </p>
      </div>

      <div ref={sectionRef} className={`contact-content ${isVisible ? 'visible' : ''}`}>
        {/* Contact cards */}
        <div className="contact-info">
          {CONTACT_INFO.map((info, i) => (
            <a
              key={i}
              href={info.href}
              target={info.href.startsWith('mailto') || info.href.startsWith('tel') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-icon" role="img" aria-label={info.label}>{info.icon}</span>
              <div>
                <span className="contact-label">{info.label}</span>
                <span className="contact-value">{info.value}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Your Email</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or just say hi…"
              rows={5}
              required
            />
          </div>

          {status && <p className="form-status" role="status">{status}</p>}

          <button type="submit" className="btn btn-primary">
            <SendIcon />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
