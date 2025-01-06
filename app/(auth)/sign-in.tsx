import { useRouter } from 'expo-router';
import SignInPage from '@/pages/SignInPage';

const SignInScreen = () => {
  const router = useRouter();

  return (
    <SignInPage
      onSignUpClick={() => router.push('/sign-up')}
    />
  );
};

export default SignInScreen;
