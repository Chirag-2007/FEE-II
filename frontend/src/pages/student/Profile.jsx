import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { StudentProfileContext } from '../../context/StudentProfileContext';
import './Profile.css';

const BRANCHES = [
  'Computer Science & Engineering (CSE)', 'Information Technology (IT)',
  'Electronics & Communication (ECE)', 'Electrical Engineering (EE)',
  'Mechanical Engineering (ME)', 'Civil Engineering (CE)',
  'Chemical Engineering (ChE)', 'Aerospace Engineering', 'Biotechnology',
  'Data Science & Artificial Intelligence', 'Cybersecurity',
  'Robotics & Automation', 'Software Engineering',
  'Telecommunication Engineering', 'Instrumentation & Control'
];

function Profile() {
  const { user } = useContext(AuthContext);
  const { profile, updateProfile } = useContext(StudentProfileContext);

  const [formData, setFormData] = useState({
    fullName: profile.fullName || user?.name || '',
    phone: profile.phone, enrollmentNo: profile.enrollmentNo,
    branch: profile.branch, batch: profile.batch,
    cgpa: profile.cgpa, skills: profile.skills, portfolio: profile.portfolio
  });

  const [skillInput, setSkillInput] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Cap the CGPA at 10 while typing
    if (name === 'cgpa' && value !== '' && parseFloat(value) > 10) {
      value = '10';
    }
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        ...formData,
        // Keep whichever resume name we have — a freshly picked file this
        // session, or the name already saved from a previous visit.
        resumeFileName: resumeFile ? resumeFile.name : profile.resumeFileName
      });
      setIsSaving(false);
    }, 1000);
  };

  // Accurately calculates progress including the resume file
  const filledFields = Object.keys(formData).filter(key =>
    Array.isArray(formData[key]) ? formData[key].length > 0 : formData[key]?.toString().trim()
  ).length + (resumeFile || profile.resumeFileName ? 1 : 0);

  const progress = Math.round((filledFields / (Object.keys(formData).length + 1)) * 100);

  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal and academic details</p>
      </div>

      <div className="profile-layout">
        {/* Left Column: Summary Card */}
        <div className="soft-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              <span className="avatar-emoji">🎓</span>
            </div>
            <h2>{formData.fullName || 'Student'}</h2>
            <span className="role-badge">Student Account</span>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div className="stat-text">
                <div className="stat-label">Branch</div>
                <div className="stat-value">{formData.branch || 'Not set'}</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <div className="stat-text">
                <div className="stat-label">CGPA</div>
                <div className="stat-value">{formData.cgpa || '0.0'}</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📅</span>
              <div className="stat-text">
                <div className="stat-label">Batch</div>
                <div className="stat-value">{formData.batch || 'Not set'}</div>
              </div>
            </div>
          </div>

          <div className="profile-progress">
            <div className="progress-header">
              <span>Profile Strength</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit} className="profile-form-stack">
          {/* Personal Details */}
          <div className="soft-card">
            <h3 className="section-title">Personal Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">📱</span>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="soft-card">
            <h3 className="section-title">Academic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="enrollmentNo">Enrollment No.</label>
                <div className="input-wrapper">
                  <span className="input-icon">📝</span>
                  <input type="text" id="enrollmentNo" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder="e.g. 0827CS211000" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏛️</span>
                  <select id="branch" name="branch" value={formData.branch} onChange={handleChange}>
                    <option value="">Select your branch</option>
                    {BRANCHES.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="batch">Batch (Graduation)</label>
                <div className="input-wrapper">
                  <span className="input-icon">🎓</span>
                  <input type="number" id="batch" name="batch" value={formData.batch} onChange={handleChange} placeholder="2025" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cgpa">Current CGPA</label>
                <div className="input-wrapper">
                  <span className="input-icon">📊</span>
                  <input type="number" step="0.01" min="1" max="10" id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="8.50" />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Setup */}
          <div className="soft-card">
            <h3 className="section-title">Professional Setup</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="skills">Key Skills (Press Enter to add)</label>
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
                      placeholder={formData.skills.length === 0 ? "React, Node, Python..." : ""}
                      className="skill-borderless-input"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="portfolio">Portfolio / LinkedIn URL</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔗</span>
                  <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </div>

            <div className="form-group upload-group">
              <label>Resume / CV</label>
              <label className="file-upload-zone">
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => e.target.files?.[0] && setResumeFile(e.target.files[0])} hidden />
                <span className="upload-icon">📄</span>
                <span className="upload-text">{resumeFile ? resumeFile.name : profile.resumeFileName || 'Click to upload your resume (PDF, DOCX)'}</span>
                <span className="upload-hint">Maximum file size: 5MB</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;