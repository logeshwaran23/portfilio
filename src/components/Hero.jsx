import { useState, useEffect, useRef } from 'react';

const TYPING_TEXTS = [
  'Full Stack Developer',
  'React.js Enthusiast',
  'Problem Solver',
  'UI/UX Lover',
];

const FLOATING_TAGS = [
  { label: 'React',      color: '#61dafb', angle: -30,  r: 52 },
  { label: 'Node.js',    color: '#339933', angle: 60,   r: 52 },
  { label: 'MongoDB',    color: '#47a248', angle: 150,  r: 52 },
  { label: 'JavaScript', color: '#f7df1e', angle: 210,  r: 52 },
  { label: 'Python',     color: '#3776ab', angle: -110, r: 52 },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Hero = () => {
  const [charIndex,  setCharIndex]  = useState(0);
  const [textIndex,  setTextIndex]  = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const canvasRef = useRef(null);

  /* ── Typing animation ── */
  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 120);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 60);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex(i => (i + 1) % TYPING_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor(window.innerWidth / 14));
    const particles = Array.from({ length: count }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 1.8 + 0.5,
      speedX:  (Math.random() - 0.5) * 0.45,
      speedY:  (Math.random() - 0.5) * 0.45,
      opacity: Math.random() * 0.45 + 0.08,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`;
        ctx.fill();
      });

      /* draw connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />

      <div className="hero-layout">
        {/* ── LEFT: Text ── */}
        <div className="hero-content">
          <div className="hero-tag animate-fadeInDown">
            <span className="tag-dot" aria-hidden="true" />
            Available for Opportunities
          </div>

          <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            Hi, I&apos;m{' '}
            <span className="gradient-text">Logeshwaran</span>
          </h1>

          <div className="hero-role animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <span className="role-prefix">I&apos;m a&nbsp;</span>
            <span className="typing-text" aria-live="polite">
              {displayText}
              <span className="cursor" aria-hidden="true">|</span>
            </span>
          </div>

          <p className="hero-desc animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            Passionate about crafting elegant, performant, and user-friendly digital
            experiences — turning ideas into reality through clean, purposeful code.
          </p>

          <div className="hero-cta animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Let&apos;s Connect
            </button>
          </div>

          <div className="hero-socials animate-fadeInUp" style={{ animationDelay: '0.75s' }}>
            <a
              href="https://github.com/logeshwaran23"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/logeshwaran23"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:logeshwaran102002@gmail.com"
              className="social-link"
              aria-label="Send email"
            >
              <EmailIcon />
            </a>
          </div>
        </div>

        {/* ── RIGHT: Interactive profile photo ── */}
        <div className="hero-photo-wrap animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Orbiting tech tags */}
          {FLOATING_TAGS.map((tag, i) => {
            const rad = (tag.angle * Math.PI) / 180;
            return (
              <span
                key={i}
                className="orbit-tag"
                style={{
                  '--tx': `${Math.cos(rad) * 100}%`,
                  '--ty': `${Math.sin(rad) * 100}%`,
                  background: `${tag.color}18`,
                  border: `1px solid ${tag.color}55`,
                  color: tag.color,
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                {tag.label}
              </span>
            );
          })}

          {/* Rotating gradient rings */}
          <div className="photo-ring photo-ring-1" aria-hidden="true" />
          <div className="photo-ring photo-ring-2" aria-hidden="true" />
          <div className="photo-ring photo-ring-3" aria-hidden="true" />

          {/* The photo itself */}
          <div className="photo-frame">
            <img
              src="/profile.jpg"
              alt="Logeshwaran — Full Stack Developer"
              className="profile-img"
              loading="eager"
            />
            {/* Hover overlay */}
            <div className="photo-overlay" aria-hidden="true">
              <span className="photo-overlay-text">Logeshwaran</span>
              <span className="photo-overlay-sub">Full Stack Developer</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="photo-badge">
            <span className="badge-dot" aria-hidden="true" />
            <span>Open to Work</span>
          </div>

          {/* Experience chip */}
          <div className="photo-chip">
            <span className="chip-num">1+</span>
            <span className="chip-label">Yrs Exp</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => scrollTo('about')} role="button" tabIndex={0} aria-label="Scroll to about section">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
