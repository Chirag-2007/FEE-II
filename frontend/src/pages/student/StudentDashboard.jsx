import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { JobsContext } from '../../context/JobsContext';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

// className maps to a status-* rule in StudentDashboard.css (which uses index.css tokens).
// No hex colors here — keeps status colors in one place (CSS), not duplicated in JS.
// Icons match MyApplications.jsx so status looks the same across the whole app.
const STATUS = {
  'Applied': { icon: '⏳', className: 'status-applied' },
  'Shortlisted': { icon: '⭐', className: 'status-shortlisted' },
  'Rejected': { icon: '❌', className: 'status-rejected' }
};

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const { applications, jobs } = useContext(JobsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  // Applications only store jobId — pull title/company/logo from the matching
  // job, same join used in MyApplications.jsx, so both pages agree.
  const APPLICATIONS = applications
    .filter(app => app.studentEmail === user?.email)
    .map(app => {
      const job = jobs.find(j => j.id === app.jobId) || {};
      return {
        id: app.id,
        title: job.title || 'Job no longer available',
        company: job.company || '—',
        date: app.appliedDate,
        status: app.status
      };
    });

  // Recommended jobs: just the open postings for now — actual ranking (4-tier
  // band system, per the master plan) comes later once the backend exists.
  const recommendedJobs = jobs.filter(j => j.status === 'Active').slice(0, 4);

  const filtered = APPLICATIONS.filter(app => filter === 'All' || app.status === filter);
  const active = APPLICATIONS.filter(a => a.status !== 'Rejected').length;
  const rejected = APPLICATIONS.filter(a => a.status === 'Rejected').length;
  const shortlisted = APPLICATIONS.filter(a => a.status === 'Shortlisted').length;

  const getStatus = (status) => STATUS[status] || { icon: '📌', className: 'status-default' };

  // variant maps to a .stat--* rule in the CSS — same idea as STATUS above.
  const stats = [
    { icon: '📋', label: 'Active Apps', value: active, variant: 'primary' },
    { icon: '⭐', label: 'Shortlisted', value: shortlisted, variant: 'warning' },
    { icon: '❌', label: 'Rejected', value: rejected, variant: 'danger' },
    { icon: '📈', label: 'Profile Strength', value: '85%', variant: 'muted' }
  ];

  return (
    <div className="student-dashboard">
      {/* Header */}
      <div className="header">
        <div className="greeting">
          <div className="avatar">👋</div>
          <div>
            <h1>Welcome back, {user?.name || 'Student'}!</h1>
            <p>Here&apos;s your placement readiness overview</p>
          </div>
        </div>
        <div className="tabs">
          {['overview', 'applications'].map(tab => (
            <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'overview' ? '📊 Overview' : `📋 Apps (${APPLICATIONS.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button className="action primary" onClick={() => navigate('/student/profile')}>📄 Update Profile</button>
        <button className="action" onClick={() => navigate('/student/profile')}>⚡ Edit Skills</button>
        <button className="action" onClick={() => setActiveTab('applications')}>📊 Track Status</button>
        <button className="action" onClick={() => alert('Coming soon!')}>💼 Find Jobs</button>
      </div>

      {/* Stats */}
      <div className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className={`stat stat--${stat.variant}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <>
          <div className="section">
            <div className="section-header">
              <h2>📌 Recent Applications</h2>
              <button className="view-all" onClick={() => setActiveTab('applications')}>View All →</button>
            </div>
            {APPLICATIONS.slice(0, 3).map(app => (
              <div key={app.id} className="item" onClick={() => setSelected(app)}>
                <div>
                  <h3>{app.title}</h3>
                  <span className="muted">{app.company} • {app.date}</span>
                </div>
                <div className="status-group">
                  <span className={`status ${getStatus(app.status).className}`}>
                    {getStatus(app.status).icon} {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="section">
            <div className="section-header">
              <h2>💼 Recommended Jobs</h2>
              <button className="view-all" onClick={() => alert('Coming soon!')}>See All →</button>
            </div>
            {/* Static list for now — real recommendation logic (4-tier band system,
                per the master plan) comes later once the backend exists. */}
            <div className="jobs">
              {recommendedJobs.map(job => (
                <div key={job.id} className="job">
                  <div className="job-logo">{job.logo}</div>
                  <div>
                    <h3>{job.title}</h3>
                    <span className="muted">{job.company}</span>
                    <div className="tags">
                      <span className="tag">{job.type}</span>
                      <span className="tag">📍 {job.location}</span>
                    </div>
                  </div>
                  <div className="job-stipend">{job.stipend}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'applications' && (
        <div className="section">
          <div className="section-header">
            <h2>📋 All Applications</h2>
            <div className="filters">
              {['All', 'Applied', 'Shortlisted', 'Rejected'].map(f => (
                <button key={f} className={`filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'All' ? 'All' : `${getStatus(f).icon} ${f}`}
                </button>
              ))}
            </div>
          </div>
          {filtered.length > 0 ? filtered.map(app => (
            <div key={app.id} className="item" onClick={() => setSelected(app)}>
              <div>
                <h3>{app.title}</h3>
                <span className="muted">{app.company} • {app.date}</span>
              </div>
              <div className="status-group">
                <span className={`status ${getStatus(app.status).className}`}>
                  {getStatus(app.status).icon} {app.status}
                </span>
              </div>
            </div>
          )) : <div className="empty">📭 No applications found for &quot;{filter}&quot;</div>}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selected.title}</h2>
                <span className="muted">{selected.company}</span>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div>
                  <div className="modal-label">Status</div>
                  <span className={`status ${getStatus(selected.status).className}`}>
                    {getStatus(selected.status).icon} {selected.status}
                  </span>
                </div>
                <div>
                  <div className="modal-label">Applied</div>
                  <div className="modal-value">{selected.date}</div>
                </div>
              </div>
              <div>
                <div className="modal-label">Notes</div>
                <p className="modal-feedback">Your application is currently being reviewed by the hiring team. We&apos;ll notify you of any updates.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}