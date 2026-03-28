import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export function ProtectedRoute({ children, allowedRoles, redirectTo }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const fallback = redirectTo ?? '/candidate/login';
    return <Navigate to={fallback} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const roleRedirect = user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard';
    return <Navigate to={redirectTo ?? roleRedirect} replace />;
  }

  return <>{children}</>;
}
