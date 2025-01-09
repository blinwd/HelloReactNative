import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { auth } from '@/firebase/config';

const AppScreen = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (Boolean(user)) {
        router.replace('/home');
      } else {
        router.replace('/sign-in');
      }
    });
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 items-center justify-center">
        <Text className="text-black dark:text-white">
          Hello world
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AppScreen;
