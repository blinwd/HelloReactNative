import { useRouter } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import SignInPage from '@/pages/SignInPage';

const SignInScreen = () => {
  const router = useRouter();

  return (
    <AuthProvider key="sign-in">
      <SignInPage
        onSignUpClick={() => router.push('/sign-up')}
      />
    </AuthProvider>
  );
};

export default SignInScreen;
