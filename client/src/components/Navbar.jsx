import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="nav-logo-img">PX</div>
          <span className="nav-brand">PortfolioX</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <Link to="/admin" className="nav-cta">
          + Add Project
        </Link>
      </nav>
    </header>
  );
}
