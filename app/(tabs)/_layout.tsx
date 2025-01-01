import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/contexts/AppContext';
import TabIcon from '@/components/TabIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isReady } = useAppContext();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: 72,
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
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon="house.fill"
              name="Home"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon="message.fill"
              name="Chat"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
