import { useState, useContext } from 'react';
import { JobsContext } from '../../context/JobsContext';
import './ManageJobs.css';

const STATUS_FILTERS = ['All', 'Active', 'Closed'];

function ManageJobs() {
  const { jobs, applications, toggleJobStatus, updateApplicationStatus } = useContext(JobsContext);
  const [filter, setFilter] = useState('All');
  const [selectedJobId, setSelectedJobId] = useState(null);

  const filteredJobs = jobs.filter(job => filter === 'All' || job.status === filter);
  const selectedJob = jobs.find(job => job.id === selectedJobId) || null;

  // Applicants for a job live in JobsContext's `applications` array, linked
  // by jobId — not nested on the job itself, since one job can have many.
  const applicantsFor = (jobId) => applications.filter(a => a.jobId === jobId);

  return (
    <div className="manage-jobs">
      <div className="manage-jobs-header">
        <div>
          <h1>Manage Jobs</h1>
          <p>Review your postings and their applicants</p>
        </div>
        <div className="manage-jobs-filters">
          {STATUS_FILTERS.map(f => (
            <button
              key={f}
              className={`mj-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mj-list">
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <div key={job.id} className="mj-card card">
            <div className="mj-card-top">
              <div>
                <h3>{job.title}</h3>
                <span className="mj-meta">{job.type} • {job.location} • Deadline: {job.deadline}</span>
              </div>
              <span className={`mj-status ${job.status === 'Active' ? 'mj-status-active' : 'mj-status-closed'}`}>
                {job.status === 'Active' ? '🟢 Active' : '🔴 Closed'}
              </span>
            </div>

            <div className="mj-card-bottom">
              <span className="mj-applicant-count">👥 {applicantsFor(job.id).length} applicant{applicantsFor(job.id).length !== 1 ? 's' : ''}</span>
              <div className="mj-actions">
                <button className="btn btn-secondary" onClick={() => setSelectedJobId(job.id)}>
                  View Applicants
                </button>
                <button className="btn btn-secondary" onClick={() => toggleJobStatus(job.id)}>
                  {job.status === 'Active' ? 'Close Job' : 'Reopen Job'}
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="mj-empty card">📭 No jobs found for &quot;{filter}&quot;</div>
        )}
      </div>

      {selectedJob && (
        <div className="mj-modal-overlay" onClick={() => setSelectedJobId(null)}>
          <div className="mj-modal card" onClick={e => e.stopPropagation()}>
            <div className="mj-modal-header">
              <div>
                <h2>{selectedJob.title}</h2>
                <span className="mj-meta">{applicantsFor(selectedJob.id).length} applicant{applicantsFor(selectedJob.id).length !== 1 ? 's' : ''}</span>
              </div>
              <button className="mj-modal-close" onClick={() => setSelectedJobId(null)}>✕</button>
            </div>

            <div className="mj-applicant-list">
              {applicantsFor(selectedJob.id).length > 0 ? applicantsFor(selectedJob.id).map(applicant => (
                <div key={applicant.id} className="mj-applicant">
                  <div>
                    <h4>{applicant.studentName}</h4>
                    <span className="mj-meta">Applied {applicant.appliedDate}</span>
                  </div>
                  <div className="mj-applicant-actions">
                    <span className={`mj-status mj-status-${applicant.status.toLowerCase()}`}>
                      {applicant.status}
                    </span>
                    <button
                      className="btn btn-secondary mj-small-btn"
                      onClick={() => updateApplicationStatus(applicant.id, 'Shortlisted')}
                      disabled={applicant.status === 'Shortlisted'}
                    >
                      Shortlist
                    </button>
                    <button
                      className="btn btn-secondary mj-small-btn"
                      onClick={() => updateApplicationStatus(applicant.id, 'Rejected')}
                      disabled={applicant.status === 'Rejected'}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )) : (
                <div className="mj-empty-applicants">No applicants yet for this job.</div>
              )}
            </div>

            <div className="mj-modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedJobId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageJobs;