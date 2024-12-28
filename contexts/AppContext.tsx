import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase/auth';

import { auth } from '@/firebase/config';

import type { AppContextType } from './AppContextType';

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(Boolean(user));
      setIsReady(true);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isReady,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
