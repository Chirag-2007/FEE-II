import { useState, useContext } from 'react';
import { JobsContext } from '../../context/JobsContext';
import { AuthContext } from '../../context/AuthContext';
import './BrowseJobs.css';

export default function BrowseJobs() {
  const { jobs, applyToJob, hasApplied } = useContext(JobsContext);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingId, setApplyingId] = useState(null);

  // Students should only see postings recruiters have left open.
  const activeJobs = jobs.filter(job => job.status === 'Active');

  const filteredJobs = activeJobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.company.toLowerCase().includes(search.toLowerCase());
    const matchType = filter === 'All' || job.type === filter;
    return matchSearch && matchType;
  });

  const stats = {
    total: activeJobs.length,
    fullTime: activeJobs.filter(j => j.type === 'Full-time').length,
    internships: activeJobs.filter(j => j.type === 'Internship').length
  };

  // Saves a real application to JobsContext (shows up in MyApplications/ManageJobs).
  const handleApply = (job) => {
    setApplyingId(job.id);

    // Simulate async API call
    setTimeout(() => {
      applyToJob(job.id, { name: user?.name || user?.email, email: user?.email });
      setApplyingId(null);
      alert('Application submitted successfully! 🎉');
      setSelectedJob(null);
    }, 800);
  };

  return (
    <div className="browse-jobs">
      <div className="page-header">
        <div>
          <h1>Browse Jobs</h1>
          <p>Find your next opportunity</p>
        </div>
        <div className="header-stats">
          <span>{stats.total} Jobs</span>
          <span>{stats.fullTime} Full-time</span>
          <span>{stats.internships} Internships</span>
        </div>
      </div>

      <div className="filters">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Full-time">💼 Full-time</option>
          <option value="Internship">📚 Internship</option>
        </select>
      </div>

      <div className="results-count">
        Showing <strong>{filteredJobs.length}</strong> of {activeJobs.length} jobs
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => {
            return (
              <div key={job.id} className="job-card card">
                <div className="job-card-top">
                  <div className="job-logo">{job.logo}</div>
                  <div className="job-main">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <span className={`job-tag ${job.type === 'Full-time' ? 'job-tag-fulltime' : 'job-tag-internship'}`}>
                    {job.type}
                  </span>
                </div>

                <div className="job-info">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.stipend}</span>
                  <span>📅 Deadline: {job.deadline}</span>
                </div>

                <div className="job-actions">
                  <button className="btn btn-secondary" onClick={() => setSelectedJob(job)}>View Details</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApply(job)}
                    disabled={hasApplied(job.id, user?.email) || applyingId === job.id}
                  >
                    {applyingId === job.id ? 'Applying...' : 
                    hasApplied(job.id, user?.email) ? 'Applied ✓' : 'Apply Now →'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="browse-empty card">
            <span className="empty-icon">🔍</span>
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filter</p>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setFilter('All'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJob(null)}>✕</button>
            <div className="modal-logo">{selectedJob.logo}</div>
            <h2>{selectedJob.title}</h2>
            <p className="modal-company">{selectedJob.company}</p>
            <div className="modal-info">
              <span>📍 {selectedJob.location}</span>
              <span>💰 {selectedJob.stipend}</span>
              <span>📅 Deadline: {selectedJob.deadline}</span>
            </div>
            <span className={`job-tag ${selectedJob.type === 'Full-time' ? 'job-tag-fulltime' : 'job-tag-internship'}`}>
              {selectedJob.type}
            </span>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleApply(selectedJob)}
                disabled={hasApplied(selectedJob.id, user?.email)}
              >
                {hasApplied(selectedJob.id, user?.email) ? 'Applied ✓' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}