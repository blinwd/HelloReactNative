import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: Platform.OS !== 'web',
          title: '',
          presentation: 'modal',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText
                className="text-blue-500"
                style={{ fontWeight: 'semibold' }}
              >
                Cancel
              </ThemedText>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
