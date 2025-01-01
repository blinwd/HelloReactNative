import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import StreamChatWrapper from '@/components/StreamChatWrapper';

import '@/global.css';
import '@/firebase/config';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={[styles.gestureHandlerRootView]}
    >
      <AppProvider>
        <AuthProvider>
          <ThemeProvider
            value={
              colorScheme === 'dark'
                ? DarkTheme
                : DefaultTheme
            }
          >
            <StreamChatWrapper>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    title: '',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="channel/[cid]"
                  options={{
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="+not-found"
                  options={{
                    title: 'Not Found',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    title: '',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
              <StatusBar style="auto" />
            </StreamChatWrapper>
          </ThemeProvider>
        </AuthProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
