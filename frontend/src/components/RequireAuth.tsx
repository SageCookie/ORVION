import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Role } from '../types';

interface RequireAuthProps {
  allowedRoles?: Role[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasRole(...allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
