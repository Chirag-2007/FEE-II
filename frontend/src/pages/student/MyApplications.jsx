import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobsContext } from '../../context/JobsContext';
import { AuthContext } from '../../context/AuthContext';
import './MyApplications.css';

export default function MyApplications() {
  const navigate = useNavigate();
  const { applications, jobs } = useContext(JobsContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isContacting, setIsContacting] = useState(false);

  // Applications only store jobId — pull title/company/logo from the matching
  // job so this page always reflects the job's current details, not a stale copy.
  const myApplications = applications
    .filter(app => app.studentEmail === user?.email)
    .map(app => {
      const job = jobs.find(j => j.id === app.jobId) || {};
      return {
        id: app.id,
        title: job.title || 'Job no longer available',
        company: job.company || '—',
        logo: job.logo || '📌',
        appliedDate: app.appliedDate,
        status: app.status
      };
    });

  const filteredApps = myApplications.filter(app =>
    filter === 'All' || app.status === filter
  );

  // Mapped to your global index.css color tokens
  const getStatusInfo = (status) => {
    const map = {
      'Applied': { class: 'status-pending', icon: '⏳', label: 'Applied' },
      'Shortlisted': { class: 'status-accent', icon: '⭐', label: 'Shortlisted' },
      'Rejected': { class: 'status-danger', icon: '❌', label: 'Rejected' }
    };
    return map[status] || { class: 'status-pending', icon: '📌', label: status };
  };

  const handleContactHR = () => {
    setIsContacting(true);
    setTimeout(() => {
      setIsContacting(false);
      alert('Coming soon!');
    }, 500);
  };

  const stats = {
    total: myApplications.length,
    applied: myApplications.filter(a => a.status === 'Applied').length,
    shortlisted: myApplications.filter(a => a.status === 'Shortlisted').length,
    rejected: myApplications.filter(a => a.status === 'Rejected').length
  };

  return (
    <div className="my-applications">
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p>Track and manage your job applications</p>
        </div>
        <div className="header-stats card">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.applied}</span>
            <span className="stat-label">Applied</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.shortlisted}</span>
            <span className="stat-label">Shortlisted</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.rejected}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-buttons">
          {['All', 'Applied', 'Shortlisted', 'Rejected'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status === 'All' ? 'All' : getStatusInfo(status).icon + ' ' + status}
            </button>
          ))}
        </div>
        <div className="results-count">
          {filteredApps.length} application{filteredApps.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="applications-grid">
        {filteredApps.length > 0 ? (
          filteredApps.map(app => {
            const status = getStatusInfo(app.status);
            return (
              <div key={app.id} className="application-card card">
                <div className="app-header">
                  <div className="app-logo">{app.logo}</div>
                  <div className="app-title">
                    <h3>{app.title}</h3>
                    <p className="company">{app.company}</p>
                  </div>
                  <span className={`status-badge ${status.class}`}>
                    {status.icon} {status.label}
                  </span>
                </div>

                <div className="app-body">
                  <div className="app-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>Applied {app.appliedDate}</span>
                    </div>
                  </div>
                  <div className="app-progress">
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${status.class}`}
                        style={{
                          width: app.status === 'Shortlisted' ? '100%' :
                                 app.status === 'Applied' ? '50%' : '0%'
                        }}
                      ></div>
                    </div>
                    <span className="progress-label">
                      {app.status === 'Shortlisted' ? 'Shortlisted' :
                       app.status === 'Applied' ? 'Applied' : 'Closed'}
                    </span>
                  </div>
                </div>

                <div className="app-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedApp(app)}>
                    View Details
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/student/browse-jobs')}>
                    View Job →
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state card">
            <div className="empty-icon">📭</div>
            <h3>No applications found</h3>
            <p>Try adjusting your filter or browse jobs to apply</p>
            <button className="btn btn-primary" onClick={() => setFilter('All')}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedApp(null)}>✕</button>
            <div className="modal-logo">{selectedApp.logo}</div>
            <h2>{selectedApp.title}</h2>
            <p className="modal-company">{selectedApp.company}</p>

            <div className="modal-grid">
              <div>
                <div className="modal-label">Status</div>
                <span className={`status-badge ${getStatusInfo(selectedApp.status).class}`}>
                  {getStatusInfo(selectedApp.status).icon} {selectedApp.status}
                </span>
              </div>
              <div>
                <div className="modal-label">Applied On</div>
                <div className="modal-value">{selectedApp.appliedDate}</div>
              </div>
            </div>

            <div className="modal-notes">
              <div className="modal-label">Notes</div>
              <p>Your application is currently being reviewed by the hiring team. We&apos;ll notify you of any updates.</p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              <button className="btn btn-primary" onClick={handleContactHR} disabled={isContacting}>
                {isContacting ? 'Contacting...' : 'Contact HR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}