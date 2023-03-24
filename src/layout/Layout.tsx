import Header from './Header/Header';
import { headerRoutes, profileRoutes } from '../config/routes';
import { Outlet } from 'react-router-dom';

const user = {
  name: 'Juan Miguel',
  email: 'jdelatorre@arkusnexus.com',
  imageUrl: '/public/profile-default.png',
};

const Layout = () => {
  return (
    <div className="min-h-full">
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />

      <main className="mx-auto max-w-7xl py-6 px-3 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
