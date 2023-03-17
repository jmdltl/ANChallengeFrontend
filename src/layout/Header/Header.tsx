import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

import { HeaderLink } from '../../config/routes';
import { joinClassNames } from '../../utils/utils';

type HeaderProps = {
  links: HeaderLink[];
  userOptions: HeaderLink[];
  userInfo: {
    name: string;
    email: string;
    imageUrl: string;
  };
};

const Header = (props: HeaderProps) => {
  return (
    <Disclosure as="nav" className="bg-gray-800" data-testid="header-wrapper">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://uploads-ssl.webflow.com/5e589a8b7bb9af87ad968338/613f82a2bceafc58516997ab_ArkusNexus_iso.png"
                    alt="ArkusNexus"
                  />
                </div>

                <div className="hidden md:block">
                  {/* Menu for Larger screens */}
                  <div className="ml-10 flex items-baseline space-x-4">
                    {props.links.map((item) => (
                      <NavLink
                        to={item.path}
                        key={item.name}
                        className={({ isActive, isPending }) => {
                          return joinClassNames(
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          );
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collapsable Menu */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        data-testid="header-profile-dropdown-button"
                        className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={props.userInfo.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        data-testid="header-profile-dropdown-options"
                        className="absolute right-0 z-10  mt-2  w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {props.userOptions.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <NavLink
                                to={item.path}
                                key={item.name}
                                className={joinClassNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {item.name}
                              </NavLink>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="inline-flex items-center 
                  justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  data-testid="header-mobile-collapse-button"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile Menus + Profile */}
          <Disclosure.Panel
            className="md:hidden"
            data-testid="header-mobile-collapsable-menu"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {props.links.map((item) => (
                <Disclosure.Button key={item.name} className="block w-full">
                  <NavLink
                    to={item.path}
                    onClick={() => close()}
                    className={({ isActive, isPending }) => {
                      return joinClassNames(
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-left text-base font-medium',
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={props.userInfo.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {props.userInfo.name}
                  </div>
                  <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                    {props.userInfo.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {props.userOptions.map((item) => (
                  <Disclosure.Button key={item.name} className="block w-full">
                    <NavLink
                      to={item.path}
                      onClick={() => close()}
                      className={({ isActive, isPending }) => {
                        return joinClassNames(
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-left text-base font-medium',
                        );
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
