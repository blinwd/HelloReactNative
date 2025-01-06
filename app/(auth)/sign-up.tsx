import { router } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import SignUpPage from '@/pages/SignUpPage';

const SignUpScreen = () => {
  return (
    <AuthProvider key="sign-up">
      <SignUpPage
        onSignInClick={() => router.push('/sign-in')}
      />
    </AuthProvider>
  );
};

export default SignUpScreen;
