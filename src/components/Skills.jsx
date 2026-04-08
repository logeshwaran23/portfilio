import { useScrollReveal } from '../hooks/useScrollReveal';

const SKILLS = [
  { name: 'JavaScript',  level: 85, color: '#f7df1e' },
  { name: 'React.js',    level: 82, color: '#61dafb' },
  { name: 'HTML & CSS',  level: 90, color: '#e34c26' },
  { name: 'Node.js',     level: 75, color: '#339933' },
  { name: 'Python',      level: 70, color: '#3776ab' },
  { name: 'MongoDB',     level: 72, color: '#47a248' },
  { name: 'MySQL',       level: 68, color: '#4479a1' },
  { name: 'Git & GitHub',level: 85, color: '#f05032' },
];

const TECH = [
  { icon: '⚛️',  name: 'React',      bg: 'rgba(97,218,251,0.08)'  },
  { icon: '🟩',  name: 'Node.js',    bg: 'rgba(51,153,51,0.08)'   },
  { icon: '🟨',  name: 'JavaScript', bg: 'rgba(247,223,30,0.08)'  },
  { icon: '🐍',  name: 'Python',     bg: 'rgba(55,118,171,0.08)'  },
  { icon: '🍃',  name: 'MongoDB',    bg: 'rgba(71,162,72,0.08)'   },
  { icon: '🐬',  name: 'MySQL',      bg: 'rgba(68,121,161,0.08)'  },
  { icon: '🔧',  name: 'Git',        bg: 'rgba(240,80,50,0.08)'   },
  { icon: '💨',  name: 'Tailwind',   bg: 'rgba(6,182,212,0.08)'   },
  { icon: '🚀',  name: 'Vite',       bg: 'rgba(100,108,255,0.08)' },
  { icon: '🌐',  name: 'Express',    bg: 'rgba(255,255,255,0.05)' },
];

const SkillBar = ({ skill, isVisible }) => (
  <div className="skill-item">
    <div className="skill-header">
      <span className="skill-name">{skill.name}</span>
      <span className="skill-percent">{skill.level}%</span>
    </div>
    <div className="skill-bar-bg">
      <div
        className="skill-bar-fill"
        style={{
          width:      isVisible ? `${skill.level}%` : '0%',
          background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
          boxShadow:  isVisible ? `0 0 10px ${skill.color}60` : 'none',
        }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [sectionRef, isVisible] = useScrollReveal(0.15);

  return (
    <section id="skills" className="section skills-section">
      <div className="section-header">
        <span className="section-tag">My Expertise</span>
        <h2 className="section-title">
          Skills &amp; <span className="gradient-text">Technologies</span>
        </h2>
      </div>

      <div ref={sectionRef} className={`skills-content ${isVisible ? 'visible' : ''}`}>
        {/* Left – animated progress bars */}
        <div className="skills-bars">
          {SKILLS.map((skill, i) => (
            <SkillBar key={i} skill={skill} isVisible={isVisible} />
          ))}
        </div>

        {/* Right – tech icon grid */}
        <div className="tech-grid">
          <h3 className="tech-grid-title">Tech Stack</h3>
          <div className="tech-icons">
            {TECH.map((t, i) => (
              <div
                key={i}
                className="tech-icon-card"
                style={{ background: t.bg }}
              >
                <span className="tech-icon" role="img" aria-label={t.name}>{t.icon}</span>
                <span className="tech-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
