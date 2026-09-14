import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import './Sidebar.css';

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If no user is found, don't render the sidebar (failsafe)
  if (!user) return null;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <a href="/" className="sidebar-logo">
            Placify<span className="logo-dot">.</span>
          </a>
        )}
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {user.role === 'student' ? (
          <>
            <NavLink to="/student/dashboard" className="sidebar-link">
              <span className="link-icon">📊</span>
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/student/profile" className="sidebar-link">
              <span className="link-icon">👤</span>
              {!isCollapsed && <span>My Profile</span>}
            </NavLink>
            <NavLink to="/student/browse-jobs" className="sidebar-link">
              <span className="link-icon">💼</span>
              {!isCollapsed && <span>Browse Jobs</span>}
            </NavLink>
            <NavLink to="/student/applications" className="sidebar-link">
              <span className="link-icon">📝</span>
              {!isCollapsed && <span>My Applications</span>}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/recruiter/dashboard" className="sidebar-link">
              <span className="link-icon">📊</span>
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/recruiter/company-profile" className="sidebar-link">
              <span className="link-icon">🏢</span>
              {!isCollapsed && <span>Company Profile</span>}
            </NavLink>
            <NavLink to="/recruiter/post-job" className="sidebar-link">
              <span className="link-icon">➕</span>
              {!isCollapsed && <span>Post a Job</span>}
            </NavLink>
            <NavLink to="/recruiter/manage-jobs" className="sidebar-link">
              <span className="link-icon">📋</span>
              {!isCollapsed && <span>Manage Jobs</span>}
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link theme-toggle-btn" onClick={toggleTheme}>
          <span className="link-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button className="sidebar-link logout-btn" onClick={logout}>
          <span className="link-icon">🚪</span>
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;