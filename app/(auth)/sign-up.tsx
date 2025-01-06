import { Platform, Alert } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import PageView from '@/components/PageView';
import Onboarding from '@/web/pages/onboarding';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';

const SignUpScreen = () => {
  const colorScheme = useColorScheme();
  const { errors, setErrors } = useAppContext();
  const { signUp } = useAuthContext();

  useEffect(() => {
    if (errors?.signUp) {
      Alert.alert('Sign Up Error', errors.signUp as string);
    }
  }, [errors]);

  return (
    <PageView>
      <Onboarding
        error={errors?.signUp as string}
        colorScheme={colorScheme}
        platformOS={Platform.OS}
        onContinueClick={({ email, password }) => {
          setErrors((prev) => {
            return {
              ...prev,
              signUp: '',
            };
          });

          signUp(email, password, '/');
        }}
      />
    </PageView>
  );
};

export default SignUpScreen;
