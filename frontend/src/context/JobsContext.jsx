import { createContext, useState, useEffect } from 'react';

export const JobsContext = createContext();

// Seed data — same jobs a recruiter would see if they'd posted them, so the
// app has something to show before anyone actually uses Post Job.
const SEED_JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', type: 'Full-time', location: 'Bengaluru', stipend: '₹1,50,000/mo', logo: '💻', description: 'Build and maintain user-facing features using React.', status: 'Active', deadline: 'Oct 15, 2026' },
  { id: 2, title: 'UI/UX Design Intern', company: 'DesignHub', type: 'Internship', location: 'Remote', stipend: '₹80,000/mo', logo: '🎨', description: 'Assist in designing wireframes, prototypes, and user flows.', status: 'Active', deadline: 'Oct 20, 2026' },
  { id: 3, title: 'Backend Engineer', company: 'CloudScale', type: 'Full-time', location: 'Hyderabad', stipend: '₹1,70,000/mo', logo: '⚙️', description: 'Design and maintain REST APIs and database schemas.', status: 'Closed', deadline: 'Sept 01, 2026' },
  { id: 4, title: 'Data Analyst', company: 'DataMetrics', type: 'Full-time', location: 'Remote', stipend: '₹1,30,000/mo', logo: '📊', description: 'Analyze placement trends and build reporting dashboards.', status: 'Active', deadline: 'Oct 25, 2026' }
];

// Applications link a student to a job by jobId — status lives here, not on
// the job itself, since one job can have many applicants with different statuses.
const SEED_APPLICATIONS = [
  { id: 1, jobId: 1, studentName: 'Aisha Khan', studentEmail: 'aisha@example.com', appliedDate: 'Sept 20, 2026', status: 'Applied' },
  { id: 2, jobId: 1, studentName: 'Rohan Mehta', studentEmail: 'rohan@example.com', appliedDate: 'Sept 22, 2026', status: 'Shortlisted' },
  { id: 3, jobId: 2, studentName: 'Priya Sharma', studentEmail: 'priya@example.com', appliedDate: 'Sept 23, 2026', status: 'Applied' },
  { id: 4, jobId: 4, studentName: 'Devansh Rao', studentEmail: 'devansh@example.com', appliedDate: 'Sept 18, 2026', status: 'Rejected' }
];

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs');
    return saved ? JSON.parse(saved) : SEED_JOBS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('applications');
    return saved ? JSON.parse(saved) : SEED_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  // Called from PostJob.jsx — new postings start Active and show up
  // immediately in BrowseJobs and ManageJobs.
  const postJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      status: 'Active'
    };
    setJobs(prev => [newJob, ...prev]);
  };

  // Called from ManageJobs.jsx to open/close a posting.
  const toggleJobStatus = (jobId) => {
    setJobs(prev => prev.map(job =>
      job.id === jobId ? { ...job, status: job.status === 'Active' ? 'Closed' : 'Active' } : job
    ));
  };

  // Called from BrowseJobs.jsx when a student applies.
  const applyToJob = (jobId, student) => {
    const newApplication = {
      id: Date.now(),
      jobId,
      studentName: student.name,
      studentEmail: student.email,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Applied'
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  // Used by BrowseJobs.jsx to disable "Apply" on jobs the student already applied to.
  const hasApplied = (jobId, studentEmail) => {
    return applications.some(a => a.jobId === jobId && a.studentEmail === studentEmail);
  };

  // Called from ManageJobs.jsx — Shortlist/Reject buttons.
  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(prev => prev.map(a =>
      a.id === applicationId ? { ...a, status: newStatus } : a
    ));
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      applications,
      postJob,
      toggleJobStatus,
      applyToJob,
      hasApplied,
      updateApplicationStatus
    }}>
      {children}
    </JobsContext.Provider>
  );
}
