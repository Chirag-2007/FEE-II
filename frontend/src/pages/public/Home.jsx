import { useContext } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const dashboardPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/student/dashboard';

  const stats = [
    { value: "500+", label: "Students Placed", icon: "🎓" },
    { value: "50+", label: "Partner Companies", icon: "🏢" },
    { value: "200+", label: "Job Openings", icon: "💼" },
    { value: "85%", label: "Placement Rate", icon: "📈" },
  ];

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">🚀 Next-Gen Placement Platform</div>
            <h1 className="hero-title">
              Placement season, <br />
              <span className="gradient-text">without the spreadsheets</span>
            </h1>
            <p className="hero-description">
              Placify replaces shared spreadsheets and WhatsApp forwards with
              one place where students and recruiters connect — profiles,
              postings, and applications, all tracked automatically.
            </p>
            <div className="hero-buttons">
              {user ? (
                <Link to={dashboardPath} className="btn-primary">Go to Dashboard →</Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary">Get Started →</Link>
                  <Link to="/login" className="btn-secondary">Log In</Link>
                </>
              )}
            </div>
            <div className="hero-trust">
              <span>⭐ 4.9/5</span>
              <span>•</span>
              <span>Trusted by 500+ students</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-badge">✨ New</div>
              <div className="card-icon">💻</div>
              <h4>Software Engineer</h4>
              <p>TechCorp • Bengaluru</p>
              <div className="card-tags">
                <span>Full-time</span>
                <span>Remote</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-badge">🔥 Trending</div>
              <div className="card-icon">📊</div>
              <h4>Data Analyst</h4>
              <p>DataFlow • Mumbai</p>
              <div className="card-tags">
                <span>Internship</span>
                <span>Hybrid</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-badge">⭐ Popular</div>
              <div className="card-icon">🎨</div>
              <h4>UX Designer</h4>
              <p>CreativeCo • Delhi</p>
              <div className="card-tags">
                <span>Contract</span>
                <span>Remote</span>
              </div>
            </div>
            <div className="hero-glow"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Simple Process</span>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Get started in three easy steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">📝</div>
              <h3>Sign up</h3>
              <p>Choose your role — student or recruiter — and create your account in seconds.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">📋</div>
              <h3>Build profile</h3>
              <p>Add your details once. Students: branch, CGPA, skills. Recruiters: company, roles.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">🚀</div>
              <h3>Start matching</h3>
              <p>Apply to jobs, review candidates, and track everything in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="roles-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">For Everyone</span>
            <h2 className="section-title">Built for students & recruiters</h2>
          </div>

          <div className="roles-grid">
            <div className="role-card student-role">
              <div className="role-icon">🎓</div>
              <h3>For Students</h3>
              <ul className="role-features">
                <li>✓ Build profile once — branch, CGPA, skills</li>
                <li>✓ Browse openings without digging through email</li>
                <li>✓ See exactly where each application stands</li>
              </ul>
              {user ? (
                <Link to={dashboardPath} className="role-btn">Go to Dashboard →</Link>
              ) : (
                <Link to="/register" className="role-btn">Join as Student →</Link>
              )}
            </div>

            <div className="role-card recruiter-role">
              <div className="role-icon">🏢</div>
              <h3>For Recruiters</h3>
              <ul className="role-features">
                <li>✓ Set up company profile in minutes</li>
                <li>✓ Post openings and reach the whole batch</li>
                <li>✓ Review applicants without shared spreadsheets</li>
              </ul>
              {user ? (
                <Link to={dashboardPath} className="role-btn">Go to Dashboard →</Link>
              ) : (
                <Link to="/register" className="role-btn">Join as Recruiter →</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to simplify placements?</h2>
            <p>Join thousands of students and recruiters already using Placify</p>
            {user ? (
              <Link to={dashboardPath} className="cta-btn">Go to Dashboard →</Link>
            ) : (
              <Link to="/register" className="cta-btn">Get Started Free →</Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">Placify<span>.</span></div>
              <p>Making placements simple for everyone.</p>
            </div>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Contact</a>
              {user ? (
                <Link to={dashboardPath}>Dashboard</Link>
              ) : (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Placify. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;