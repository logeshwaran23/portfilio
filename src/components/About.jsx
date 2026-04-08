import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STATS = [
  { value: 15, suffix: '+', label: 'Projects Completed' },
  { value: 8,  suffix: '+', label: 'Technologies Used' },
  { value: 1,  suffix: '+', label: 'Years of Experience' },
  { value: 200, suffix: '+', label: 'GitHub Commits' },
];

const CountUp = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const step  = Math.max(1, Math.ceil(target / 55));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
};

const About = () => {
  const [sectionRef, isVisible] = useScrollReveal(0.15);

  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <span className="section-tag">About Me</span>
        <h2 className="section-title">
          Who I <span className="gradient-text">Am</span>
        </h2>
      </div>

      <div ref={sectionRef} className={`about-content ${isVisible ? 'visible' : ''}`}>
        {/* Left – text */}
        <div className="about-text">
          <p className="about-intro">
            I&apos;m <strong>Logeshwaran</strong>, a passionate Full Stack Developer
            based in Tamil Nadu, India who loves building modern web applications
            that solve real problems and deliver exceptional user experiences.
          </p>
          <p>
            With hands-on experience in both frontend and backend technologies, I
            specialise in crafting scalable, performant applications using the
            latest tools and best practices. My journey in tech is driven by
            curiosity and a constant desire to learn and grow.
          </p>
          <p>
            When I&apos;m not coding you&apos;ll find me exploring open-source
            projects, contributing to developer communities, or brainstorming the
            next big idea.
          </p>

          <div className="about-details">
            <div className="detail-item">
              <span className="detail-label">📍 Location</span>
              <span className="detail-value">Tamil Nadu, India</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">📧 Email</span>
              <span className="detail-value">logeshwaran102002@gmail.com</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">🐙 GitHub</span>
              <span className="detail-value">github.com/logeshwaran23</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">💼 Status</span>
              <span className="detail-value available">Available for Opportunities</span>
            </div>
          </div>

          <a
            href="https://github.com/logeshwaran23"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', marginTop: '8px' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
            View GitHub Profile
          </a>
        </div>

        {/* Right – stats */}
        <div className="about-stats">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">
                <CountUp target={s.value} suffix={s.suffix} isVisible={isVisible} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
