import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

// Wraps every authenticated route (student and recruiter dashboards).
// The actual page content renders via <Outlet /> based on the matched route.
function DashboardLayout() {
  const { user, loading } = useContext(AuthContext);

  // AuthContext is still checking localStorage for an existing session —
  // wait rather than redirecting too early and bouncing a logged-in user.
  if (loading) return null;

  // No user (never logged in, or just logged out) — send to Login.
  // Since this check re-runs on every render, logging out from the Sidebar
  // while on any dashboard page redirects here automatically too.
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;