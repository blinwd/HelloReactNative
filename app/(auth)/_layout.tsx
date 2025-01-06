import { router, Stack } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';

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
                lightColor={Colors.light.blue}
                darkColor={Colors.dark.blue}
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
