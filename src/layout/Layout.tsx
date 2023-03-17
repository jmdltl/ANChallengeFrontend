import React from 'react';

import Header from './Header/Header';
import { headerRoutes, profileRoutes } from '../config/routes';

const user = {
  name: 'Juan Miguel',
  email: 'jdelatorre@arkusnexus.com',
  imageUrl: '/public/profile-default.png',
};

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div className="min-h-full">
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
