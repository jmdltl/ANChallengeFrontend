import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface TokenUserData {
  id: number;
  email: string;
  role: string;
}

interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  userData: TokenUserData | null;
  setUserData: Function;
}

const initialAuthState: AuthContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userData: {} as TokenUserData,
  setUserData: () => {},
};

const AuthContext = createContext<AuthContext>(initialAuthState);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const token = sessionStorage.getItem('jwtToken');
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  const [userData, setUserData] = useState<TokenUserData | null>();
  // const [roles, setRoles] = useState<string[]>([]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
