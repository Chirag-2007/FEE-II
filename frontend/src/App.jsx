import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { JobsProvider } from './context/JobsContext';
import { StudentProfileProvider } from './context/StudentProfileContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import BrowseJobs from './pages/student/BrowseJobs';
import MyApplications from './pages/student/MyApplications';

// Recruiter pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import CompanyProfile from './pages/recruiter/CompanyProfile';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <JobsProvider>
          <StudentProfileProvider>
            <ThemeProvider>
              <BrowserRouter>
                <div className="App">
                  <Routes>
                    {/* Public routes — no authentication required */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Protected routes with DashboardLayout (Sidebar) */}
                    <Route element={<DashboardLayout />}>
                      {/* Student routes — only accessible by students */}
                      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
                      <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />
                      <Route path="/student/browse-jobs" element={<ProtectedRoute allowedRoles={['student']}><BrowseJobs /></ProtectedRoute>} />
                      <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><MyApplications /></ProtectedRoute>} />
                      {/* Recruiter routes — only accessible by recruiters */}
                      <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
                      <Route path="/recruiter/company-profile" element={<ProtectedRoute allowedRoles={['recruiter']}><CompanyProfile /></ProtectedRoute>} />
                      <Route path="/recruiter/post-job" element={<ProtectedRoute allowedRoles={['recruiter']}><PostJob /></ProtectedRoute>} />
                      <Route path="/recruiter/manage-jobs" element={<ProtectedRoute allowedRoles={['recruiter']}><ManageJobs /></ProtectedRoute>} />
                    </Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </ThemeProvider>
          </StudentProfileProvider>
        </JobsProvider>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
