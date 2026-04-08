import { useScrollReveal } from '../hooks/useScrollReveal';

const PROJECTS = [
  {
    icon: '🛒',
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce web app with product listings, cart management, user authentication, and a streamlined checkout experience.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/logeshwaran23',
    live: 'https://github.com/logeshwaran23',
  },
  {
    icon: '✅',
    title: 'Task Management App',
    description:
      'A productivity tool with drag-and-drop boards, real-time updates, priority labels, and team collaboration features.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/logeshwaran23',
    live: 'https://github.com/logeshwaran23',
  },
  {
    icon: '🌤️',
    title: 'Weather Dashboard',
    description:
      'Real-time weather app with location-based forecasts, interactive maps, hourly and weekly predictions, and a clean dark mode UI.',
    tech: ['JavaScript', 'REST API', 'CSS3'],
    github: 'https://github.com/logeshwaran23',
    live: 'https://github.com/logeshwaran23',
  },
  {
    icon: '💼',
    title: 'Developer Portfolio',
    description:
      'This modern animated personal portfolio — showcasing projects, skills, and contact information with smooth scroll-reveal animations.',
    tech: ['React', 'Vite', 'CSS3'],
    github: 'https://github.com/logeshwaran23',
    live: 'https://github.com/logeshwaran23',
  },
];

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ProjectCard = ({ project, index, isVisible }) => (
  <div
    className={`project-card ${isVisible ? 'visible' : ''}`}
    style={{ transitionDelay: `${index * 0.12}s` }}
  >
    <div className="project-header">
      <span className="project-icon" role="img" aria-label={project.title}>{project.icon}</span>
      <div className="project-links">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`${project.title} GitHub`}
        >
          <GitHubIcon />
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`${project.title} live demo`}
        >
          <ExternalIcon />
        </a>
      </div>
    </div>
    <h3 className="project-title">{project.title}</h3>
    <p className="project-desc">{project.description}</p>
    <div className="project-tech">
      {project.tech.map((t, i) => (
        <span key={i} className="tech-tag">{t}</span>
      ))}
    </div>
  </div>
);

const Projects = () => {
  const [sectionRef, isVisible] = useScrollReveal(0.08);

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <span className="section-tag">My Work</span>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          A selection of projects I&apos;ve built — each one a chance to learn,
          create, and ship something meaningful.
        </p>
      </div>

      <div ref={sectionRef} className="projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
        ))}
      </div>

      <div className="projects-cta">
        <a
          href="https://github.com/logeshwaran23"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <GitHubIcon />
          View All Projects on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
