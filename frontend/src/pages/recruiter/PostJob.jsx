import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyContext } from '../../context/CompanyContext';
import { JobsContext } from '../../context/JobsContext';
import './PostJob.css';

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship'];

function PostJob() {
  const { company } = useContext(CompanyContext);
  const { postJob } = useContext(JobsContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    openings: '1',
    stipend: '',
    deadline: '',
    skills: [],
    description: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => setFormData(prev => ({
    ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove)
  }));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.type) newErrors.type = 'Select a job type';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';
    if (!formData.description.trim()) newErrors.description = 'Add a short description';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
    // Save the job to JobsContext so it shows up in ManageJobs/BrowseJobs
    postJob({
      ...formData,
      company: company.companyName || 'Your Company',
      logo: '🏢'
    });

    // ✅ Reset form to initial state for new job posting
    setFormData({
      title: '',
      type: '',
      location: '',
      openings: '1',
      stipend: '',
      deadline: '',
      skills: [],
      description: ''
    });
    setSkillInput('');
    setErrors({});
    
    setIsSubmitting(false);
    alert('Job posted successfully! 🎉');
    navigate('/recruiter/dashboard');
  }, 800);
  };

  return (
    <div className="post-job">
      <div className="post-job-header">
        <h1>Post a Job</h1>
        <p>Fill in the details below to publish a new opening</p>
      </div>

      <div className="post-job-layout">
        {/* Left: Live Preview */}
        <div className="soft-card preview-card">
          <span className="preview-label">Live Preview</span>
          <div className="preview-job">
            <div className="preview-logo">🏢</div>
            <div>
              <h3>{formData.title || 'Job Title'}</h3>
              <span className="preview-company">{company.companyName || 'Your Company'}</span>
            </div>
          </div>

          <div className="preview-tags">
            {formData.type && <span className="preview-tag preview-tag-accent">{formData.type}</span>}
            {formData.location && <span className="preview-tag">📍 {formData.location}</span>}
          </div>

          {formData.skills.length > 0 && (
            <div className="preview-tags">
              {formData.skills.map(skill => (
                <span key={skill} className="preview-tag">{skill}</span>
              ))}
            </div>
          )}

          <div className="preview-footer">
            <span className="preview-stipend">{formData.stipend || 'Stipend not set'}</span>
            <span className="preview-openings">{formData.openings || '0'} opening{formData.openings === '1' ? '' : 's'}</span>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="post-job-form-stack">
          <div className="soft-card">
            <h3 className="section-title">Job Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <div className="input-wrapper">
                  <span className="input-icon">💼</span>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Frontend Developer" className={errors.title ? 'error' : ''} />
                </div>
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="type">Job Type</label>
                <div className="input-wrapper">
                  <span className="input-icon">🗂️</span>
                  <select id="type" name="type" value={formData.type} onChange={handleChange} className={errors.type ? 'error' : ''}>
                    <option value="">Select type</option>
                    {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {errors.type && <span className="error-text">{errors.type}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <div className="input-wrapper">
                  <span className="input-icon">📍</span>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bengaluru or Remote" className={errors.location ? 'error' : ''} />
                </div>
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="openings">Number of Openings</label>
                <div className="input-wrapper">
                  <span className="input-icon">👥</span>
                  <input type="number" id="openings" name="openings" min="1" value={formData.openings} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="stipend">Stipend / Salary</label>
                <div className="input-wrapper">
                  <span className="input-icon">💰</span>
                  <input type="text" id="stipend" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="e.g. ₹90,000/mo" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Application Deadline</label>
                <div className="input-wrapper">
                  <span className="input-icon">📅</span>
                  <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className={errors.deadline ? 'error' : ''} />
                </div>
                {errors.deadline && <span className="error-text">{errors.deadline}</span>}
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h3 className="section-title">Skills & Description</h3>
            <div className="form-group">
              <label htmlFor="skills">Required Skills (Press Enter to add)</label>
              <div className="skills-container input-wrapper">
                <span className="input-icon">⚡</span>
                <div className="skills-chip-area">
                  {formData.skills.map(skill => (
                    <span key={skill} className="skill-chip">
                      {skill}
                      <button type="button" className="chip-remove" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder={formData.skills.length === 0 ? 'React, SQL, Communication...' : ''}
                    className="skill-borderless-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '18px' }}>
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Responsibilities, requirements, and anything candidates should know..."
                className={`textarea-input ${errors.description ? 'error' : ''}`}
              ></textarea>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary post-job-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;