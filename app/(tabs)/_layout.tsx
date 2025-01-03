import { Redirect, Tabs } from 'expo-router';
import { Platform } from 'react-native';

import Colors from '@/constants/Colors';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/contexts/AppContext';
import IconSymbol from '@/components/IconSymbol';
import { useInitialRouteName } from '@/hooks/useInitialRouteName';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const initialRouteName = useInitialRouteName();
  const { isAuthenticated, isReady } = useAppContext();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme ?? 'light'].tabIconSelected,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          web: {
            display: 'none',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol
              size={size ?? 24}
              name={'house.fill'}
              color={color}
            />
          ),
          tabBarIconStyle: {
            marginBottom: 3,
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown:
            Platform.OS === 'ios' ||
            Platform.OS === 'android',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol
              size={size ?? 24}
              name={'message.fill'}
              color={color}
            />
          ),
          tabBarIconStyle: {
            marginBottom: 3,
          },
        }}
      />
    </Tabs>
  );
}
