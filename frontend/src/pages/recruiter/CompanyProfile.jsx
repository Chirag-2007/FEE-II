import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CompanyContext } from '../../context/CompanyContext';
import './CompanyProfile.css';

const INDUSTRIES = [
  'Information Technology & Services', 'Software Development',
  'Fintech & Financial Services', 'E-Commerce & Retail',
  'Artificial Intelligence & Machine Learning', 'Cybersecurity',
  'Telecommunications', 'Healthcare & Life Sciences',
  'Automotive & Manufacturing', 'EdTech & E-Learning',
  'Consulting & Business Services', 'Consumer Electronics'
];

function CompanyProfile() {
  const { user, loading } = useContext(AuthContext);
  const { company, updateCompany } = useContext(CompanyContext);

  const [formData, setFormData] = useState({
    companyName: company.companyName,
    industry: company.industry,
    companySize: company.companySize,
    website: company.website,
    location: company.location,
    // AuthContext loads `user` synchronously (from a lazy useState initializer,
    // not an effect), so it's already available here on the very first render —
    // no separate effect needed to sync these in after the fact.
    hrContactName: user?.name || '',
    hrEmail: user?.email || '',
    about: company.about
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateCompany({
        companyName: formData.companyName,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website,
        location: formData.location,
        about: formData.about
      });
      setIsSaving(false);
      alert('Company profile updated successfully!');
    }, 1000);
  };

  // Calculate profile strength dynamically based on form fields
  const fields = Object.keys(formData);
  const filledCount = fields.filter(k => Boolean(formData[k]?.toString().trim())).length;
  const progress = Math.round((filledCount / fields.length) * 100);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="profile-dashboard">
        <div className="profile-header">
          <h1>Company Profile</h1>
          <p>Loading your profile...</p>
        </div>
        <div className="profile-layout">
          <div className="soft-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '2rem' }}>⏳</span>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Loading profile information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <h1>Company Profile</h1>
        <p>Manage your corporate identity and recruiter contact information</p>
      </div>

      <div className="profile-layout">
        {/* Left Column: Summary Card */}
        <div className="soft-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              <span className="avatar-emoji">🏢</span>
            </div>
            <h2>{formData.companyName || 'Company Name'}</h2>
            <span className="role-badge">Recruiter Account</span>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-icon">🏭</span>
              <div className="stat-text">
                <span className="stat-label">Industry</span>
                <span className="stat-value">{formData.industry || 'Not set'}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <div className="stat-text">
                <span className="stat-label">Company Size</span>
                <span className="stat-value">{formData.companySize || 'Not set'}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📍</span>
              <div className="stat-text">
                <span className="stat-label">Location</span>
                <span className="stat-value">{formData.location || 'Not set'}</span>
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

        {/* Right Column: Form Stack */}
        <form onSubmit={handleSubmit} className="profile-form-stack">
          {/* Section 1: Corporate Details */}
          <div className="soft-card">
            <h3 className="section-title">Corporate Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏢</span>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Google, Infosys" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏭</span>
                  <select id="industry" name="industry" value={formData.industry} onChange={handleChange} required>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="companySize">Company Size</label>
                <div className="input-wrapper">
                  <span className="input-icon">👥</span>
                  <select id="companySize" name="companySize" value={formData.companySize} onChange={handleChange} required>
                    <option value="">Select company size</option>
                    <option value="1-50 employees">1-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="website">Official Website</label>
                <div className="input-wrapper">
                  <span className="input-icon">🌐</span>
                  <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://company.com" required />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Location */}
          <div className="soft-card">
            <h3 className="section-title">Contact & Location</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="location">Headquarters Location</label>
                <div className="input-wrapper">
                  <span className="input-icon">📍</span>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangalore, India" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="hrContactName">HR Contact Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input type="text" id="hrContactName" name="hrContactName" value={formData.hrContactName} onChange={handleChange} placeholder="Your full name" required />
                </div>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="hrEmail">HR Contact Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input type="email" id="hrEmail" name="hrEmail" value={formData.hrEmail} onChange={handleChange} placeholder="hr@company.com" required />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: About Company */}
          <div className="soft-card">
            <h3 className="section-title">About Company</h3>
            <div className="form-group">
              <label htmlFor="about">Company Overview</label>
              <div className="input-wrapper">
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Briefly describe what your company does..."
                  rows="4"
                  className="textarea-input"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? 'Saving Changes...' : 'Save Company Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyProfile;