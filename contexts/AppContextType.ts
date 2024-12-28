import type { User } from 'firebase/auth';

export type AppContextType = {
  user: User | null | undefined;
  isAuthenticated: boolean;
  isReady: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};
