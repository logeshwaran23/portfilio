import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
];

const Navbar = () => {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 50);

      const ids = ['contact', 'projects', 'skills', 'about', 'home'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-text">Logesh<span className="accent">.</span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
