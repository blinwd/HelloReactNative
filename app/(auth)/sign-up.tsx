import { useEffect } from 'react';
import { Platform, Alert, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import Onboarding from '@/web/pages/onboarding';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';

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
    <View className="flex-1 bg-white overflow-y-auto">
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
    </View>
  );
};

export default SignUpScreen;
