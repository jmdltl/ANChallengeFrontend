import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { removeLocalStorageToken } from '../../utils/sessionStorage';

const LogOutComponent = () => {
  const { setIsAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(false);
    setUserData(null);
    removeLocalStorageToken();
    navigate('/login');
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogOutComponent;
