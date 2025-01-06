import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Href, router } from 'expo-router';
import { useAppContext } from './AppContext';

const AuthContext = createContext<{
  errors: Record<string, string | boolean>;
  signUp: (
    email: string,
    password: string,
    redirectUrl?: Href
  ) => void;
  signIn: (
    email: string,
    password: string,
    redirectUrl?: Href
  ) => void;
  signOut: (redirectUrl?: Href) => void;
}>({
  errors: {},
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setIsAuthenticated, setUser } = useAppContext();

  const [errors, setErrors] = useState<
    Record<string, string | boolean>
  >({});

  const signUp = useCallback(
    (
      email: string,
      password: string,
      redirectUrl = '/' as Href
    ) => {
      if (!email || !password) {
        setErrors((prev) => ({
          ...prev,
          signUp: 'Please enter an email and password',
        }));
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push(redirectUrl);
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            signUp: error.message,
          }));
        });
    },
    []
  );

  const signIn = useCallback(
    (
      email: string,
      password: string,
      redirectUrl = '/' as Href
    ) => {
      if (!email || !password) {
        setErrors((prev) => ({
          ...prev,
          signIn: 'Please enter an email and password',
        }));
        return;
      }

      setErrors(({ signIn, ...rest }) => rest);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsAuthenticated(true);
          setUser(userCredential.user);

          router.push(redirectUrl);
        })
        .catch((error) => {
          console.error(
            '>> signInWithEmailAndPassword error: ',
            error
          );
          setErrors((prev) => ({
            ...prev,
            signIn: error.message,
          }));
        });
    },
    []
  );

  const signOut = useCallback(
    async (redirectUrl?: Href) => {
      try {
        await auth.signOut();
        setIsAuthenticated(false);
        setUser(null);

        router.push(redirectUrl || '/sign-in');
      } catch (error) {
        console.error('>> sign out error:', error);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        errors,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
