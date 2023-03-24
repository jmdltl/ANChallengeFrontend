import { Route, Routes, Link, Navigate } from 'react-router-dom';

import LoginComponent from './components/Login/LoginComponent';
import AccountsComponent from './components/Accounts/AccountsComponent';
import ClientsComponent from './components/Clients/ClientsComponent';
import LogsComponent from './components/Logs/LogsComonent';
import UsersComponent from './components/Users/UsersComponent';

import LogOutComponent from './components/Logout/LogoutComponent';

import Layout from './layout/Layout';
import './App.css';
import { AuthProvider, useAuth } from './hooks/auth';
import { ProtectRoutes } from './routes/ProtectedRoutes';
import {
  decodeJwtToken,
  getLocalStorageToken,
  setLocalStorageToken,
} from './utils/sessionStorage';

import { DecodedToken } from './types/decodedToken';
import { useEffect } from 'react';
import CreateUserComponent from './components/Users/CreateUserComponent';
import EditUserComponent from './components/Users/EditUserComponent';
import CreateClientComponent from './components/Clients/CreateClientComponent';
import EditClientComponent from './components/Clients/EditClientComponent';
import CreateAccountsComponent from './components/Accounts/CreateAccountsComponent';
import EditAccountComponent from './components/Accounts/EditAccountsComponent';
import AssignationsComponent from './components/Assignations/AssignationsComponent';
import CreateAssignationComponent from './components/Assignations/CreateAssignation';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } =
    useAuth();

  useEffect(() => {
    const token = getLocalStorageToken();

    if (token && !userData) {
      const decoded: DecodedToken = decodeJwtToken(token) as DecodedToken;
      if (decoded.jwt.user) {
        setUserData(decoded.jwt.user);
      }
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* <Route path='/' element={ <Navigate to='home' exact /> } /> */}
      <Route
        path="/login"
        element={<LoginComponent setToken={setLocalStorageToken} />}
      />
      <Route element={<ProtectRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<AssignationsComponent />} />

          <Route path="/users" element={<UsersComponent />} />
          <Route path="/users/create" element={<CreateUserComponent />} />
          <Route path="/users/:id" element={<EditUserComponent />} />

          <Route path="/clients" element={<ClientsComponent />} />
          <Route path="/clients/create" element={<CreateClientComponent />} />
          <Route path="/clients/:id" element={<EditClientComponent />} />

          <Route path="/accounts" element={<AccountsComponent />} />
          <Route
            path="/accounts/create"
            element={<CreateAccountsComponent />}
          />
          <Route path="/accounts/:id" element={<EditAccountComponent />} />

          <Route path="/assignations" element={<AssignationsComponent />} />
          <Route
            path="/assignations/create"
            element={<CreateAssignationComponent />}
          />

          {/* <Route path="/Profile" element={<></>} /> */}
          <Route path="/Logout" element={<LogOutComponent />} />
        </Route>
      </Route>
    </Routes>
  );
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
