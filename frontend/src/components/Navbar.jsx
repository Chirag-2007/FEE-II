import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const dashboardPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/student/dashboard';

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Placify<span className="logo-dot">.</span>
        </Link>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              <span className="navbar-greeting nav-btn">👋 {user.name || user.email}</span>
              <Link to={dashboardPath} className="btn btn-primary nav-btn">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary nav-btn">Log In</Link>
              <Link to="/register" className="btn btn-primary nav-btn">Get Started</Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - click outside to close */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="container">
          {user ? (
            <>
              <span className="mobile-greeting">👋 {user.name || user.email}</span>
              <Link to={dashboardPath} onClick={closeMenu} className="mobile-link mobile-link-primary">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="mobile-link">Log In</Link>
              <Link to="/register" onClick={closeMenu} className="mobile-link mobile-link-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;