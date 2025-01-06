import {
  createContext,
  useCallback,
  useContext,
} from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { Href, router } from 'expo-router';

import { auth } from '@/firebase/config';
import { Platform } from 'react-native';

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
  value,
}: {
  children: React.ReactNode;
  value: {
    errors: Record<string, string | boolean>;
    setUser: React.Dispatch<
      React.SetStateAction<User | null | undefined>
    >;
    setIsAuthenticated: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    setErrors: React.Dispatch<
      React.SetStateAction<Record<string, string | boolean>>
    >;
  };
}) => {
  const { errors, setErrors, setIsAuthenticated, setUser } =
    value;

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

          if (Platform.OS === 'web') {
            router.push(redirectUrl);
          }
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

        if (Platform.OS === 'web') {
          router.push(redirectUrl || '/sign-in');
        }
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
