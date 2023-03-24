import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import Layout from '../layout/Layout';

export const ProtectRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
