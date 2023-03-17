import Header from './Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { headerRoutes, profileRoutes } from '../../config/routes';

// Eventually user information will come from context @Todo refactor once session is included
const user = {
  name: 'Juan Miguel',
  email: 'jdelatorre@arkusnexus.com',
  imageUrl: '/public/profile-default.png',
};

describe('Header', () => {
  test('it should render', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByTestId('header-wrapper')).toBeDefined();
  });

  test('it should render the icon', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByAltText('ArkusNexus')).toBeDefined();
  });
  test('it should render the links for desktop', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    headerRoutes.forEach((e) => expect(screen.getByText(e.name)).toBeDefined());
  });
  test('it should collapse and retract', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId('header-profile-dropdown-options')).toBeNull();

    const button = screen.getByTestId('header-profile-dropdown-button');
    expect(button).toBeDefined();
    fireEvent.click(button);

    profileRoutes.forEach((e) =>
      expect(screen.getByText(e.name)).toBeDefined(),
    );
    expect(
      screen.queryByTestId('header-profile-dropdown-options'),
    ).toBeDefined();

    fireEvent.click(button);

    expect(screen.queryByTestId('header-profile-dropdown-options')).toBeNull();
  });

  test('it should render user options for desktop', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId('header-profile-dropdown-options')).toBeNull();

    const button = screen.getByTestId('header-profile-dropdown-button');
    expect(button).toBeDefined();
    fireEvent.click(button);

    profileRoutes.forEach((e) =>
      expect(screen.getByText(e.name)).toBeDefined(),
    );
  });

  test('it should render the mobile links, and user options', () => {
    render(
      <Header
        links={headerRoutes}
        userInfo={user}
        userOptions={profileRoutes}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByTestId('header-mobile-collapsable-menu')).toBeNull();

    const button = screen.getByTestId('header-mobile-collapse-button');
    expect(button).toBeDefined();
    fireEvent.click(button);

    const mobileMenu = screen.queryByTestId('header-mobile-collapsable-menu');
    expect(mobileMenu).toBeDefined();

    profileRoutes.forEach((e) =>
      expect(screen.getByText(e.name)).toBeDefined(),
    );
    headerRoutes.forEach((e) =>
      expect(screen.getAllByText(e.name)).toBeDefined(),
    );
  });
});
