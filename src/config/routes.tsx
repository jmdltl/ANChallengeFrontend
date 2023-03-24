export type HeaderLink = {
  name: string;
  path: string;
};

export const routes: HeaderLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Accounts', path: '/accounts' },
  { name: 'Clients', path: '/clients' },
  { name: 'Profile', path: '/profile' },
  { name: 'Logout', path: '/logout' },
];

export const headerRoutes: HeaderLink[] = [
  { name: 'Assignations', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Accounts', path: '/accounts' },
  { name: 'Clients', path: '/clients' },
];

export const profileRoutes: HeaderLink[] = [
  { name: 'Profile', path: '/profile' },
  { name: 'Logout', path: '/logout' },
];
