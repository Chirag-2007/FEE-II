import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { JobsContext } from '../../context/JobsContext';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';

export default function RecruiterDashboard() {
  const { user } = useContext(AuthContext);
  const { jobs, applications } = useContext(JobsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('All');

  // Applicant counts live in JobsContext's `applications` array, linked by
  // jobId — same helper pattern as ManageJobs.jsx.
  const applicantsFor = (jobId) => applications.filter(a => a.jobId === jobId).length;

  const filteredJobs = jobs.filter(job => filter === 'All' || job.status === filter);
  const activeCount = jobs.filter(j => j.status === 'Active').length;
  const totalApplicants = applications.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;

  // variant maps to a .stat--* rule in the CSS — no hex colors in JS.
  const stats = [
    { icon: '📋', label: 'Active Jobs', value: activeCount, variant: 'primary' },
    { icon: '👥', label: 'Total Applicants', value: totalApplicants, variant: 'success' },
    { icon: '⭐', label: 'Shortlisted', value: shortlistedCount, variant: 'warning' },
    { icon: '📈', label: 'Hiring Rate', value: '92%', variant: 'muted' }
  ];

  return (
    <div className="recruiter-dashboard">
      {/* Header */}
      <div className="header">
        <div className="greeting">
          <div className="avatar">🏢</div>
          <div>
            <h1>Welcome back, {user?.name || 'Recruiter'}!</h1>
            <p>Manage your corporate job openings and review candidate pipelines.</p>
          </div>
        </div>
        <div className="tabs">
          {['overview', 'jobs'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' ? '📊 Overview' : `📋 Posted Jobs (${jobs.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button className="action primary" onClick={() => navigate('/recruiter/post-job')}>➕ Post New Job</button>
        <button className="action" onClick={() => navigate('/recruiter/company-profile')}>🏢 Edit Company Profile</button>
        <button className="action" onClick={() => setActiveTab('jobs')}>👥 View All Applicants</button>
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
        <div className="section">
          <div className="section-header">
            <h2>📌 Active Openings Overview</h2>
            <button className="view-all" onClick={() => setActiveTab('jobs')}>View All →</button>
          </div>
          {jobs.filter(j => j.status === 'Active').map(job => (
            <div key={job.id} className="item" onClick={() => navigate('/recruiter/manage-jobs')}>
              <div>
                <h3>{job.title}</h3>
                <span className="muted">{job.type} • Deadline: {job.deadline}</span>
              </div>
              <div className="status-group">
                <span className="status status-active">
                  👥 {applicantsFor(job.id)} Applicants
                </span>
                <span className="muted small">{job.stipend}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="section">
          <div className="section-header">
            <h2>📋 All Corporate Openings</h2>
            <div className="filters">
              {['All', 'Active', 'Closed'].map(f => (
                <button key={f} className={`filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {filteredJobs.length > 0 ? filteredJobs.map(job => (
            <div key={job.id} className="item">
              <div>
                <h3>{job.title}</h3>
                <span className="muted">{job.type} • Deadline: {job.deadline}</span>
              </div>
              <div className="status-group">
                <span className={`status ${job.status === 'Active' ? 'status-active' : 'status-closed'}`}>
                  {job.status === 'Active' ? '🟢 Active' : '🔴 Closed'}
                </span>
                <span className="muted small">{applicantsFor(job.id)} Candidates</span>
              </div>
            </div>
          )) : <div className="empty">📭 No openings found for status &quot;{filter}&quot;</div>}
        </div>
      )}
    </div>
  );
}