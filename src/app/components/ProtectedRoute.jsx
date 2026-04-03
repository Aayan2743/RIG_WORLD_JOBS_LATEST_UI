import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function ProtectedRoute({ children, allowedRoles, redirectTo, requireCompany, requireNoCompany }) {
  const { token, user } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute check:", { token, user, allowedRoles });

  // ── 1. Not logged in → go to login ──
  if (!token) {
    const fallback = redirectTo ?? '/candidate/login';
    return <Navigate to={fallback} replace state={{ from: location.pathname }} />;
  }

  // ── 2. Wrong role → redirect to correct dashboard ──
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin')    return <Navigate to="/admin" replace />;
    if (user.role === 'employer') {
      // ✅ Employer with companyName → company dashboard
      // ✅ Employer without companyName → employer dashboard
      return user.companyName
        ? <Navigate to="/company/dashboard" replace />
        : <Navigate to="/employer/dashboard" replace />;
    }
    return <Navigate to="/candidate/dashboard" replace />;
  }

  // ── 3. Company user trying to access /employer/* → redirect to /company/* ──
  if (requireNoCompany && user?.companyName) {
    return <Navigate to="/company/dashboard" replace />;
  }

  // ── 4. Pure employer trying to access /company/* → redirect to /employer/* ──
  if (requireCompany && !user?.companyName) {
    return <Navigate to="/employer/dashboard" replace />;
  }

  return <>{children}</>;
}