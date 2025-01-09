import { Stack } from 'expo-router';
import { Platform } from 'react-native';

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="provider-matching-success-page"
        options={{
          title: '',
          headerShown: Platform.OS === 'android',
        }}
      />
    </Stack>
  );
};

export default OnboardingLayout;
