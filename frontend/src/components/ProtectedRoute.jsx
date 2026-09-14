import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // Simple fallback
  }

  // If not logged in, kick them back to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in but have the wrong role (e.g. Student trying to access Recruiter page)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Send them to their own dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // If everything checks out, render the page
  return children;
}

export default ProtectedRoute;