import { Route, Routes, Link } from 'react-router-dom';

import AccountsComponent from './components/Accounts/AccountsComponent';
import ClientsComponent from './components/Clients/ClientsComponent';
import LogsComponent from './components/Logs/LogsComonent';
import UsersComponent from './components/Users/UsersComponent';
import { routes } from './config/routes';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogsComponent />} />
        <Route path="/users" element={<UsersComponent />} />
        <Route path="/accounts" element={<AccountsComponent />} />
        <Route path="/clients" element={<ClientsComponent />} />
        <Route path="/Profile" element={<></>} />
        <Route path="/Logout" element={<></>} />
      </Routes>
    </>
  );
};

export default Router;
