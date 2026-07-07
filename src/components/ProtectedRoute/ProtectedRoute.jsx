import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
