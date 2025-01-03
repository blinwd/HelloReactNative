import { View, Text, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import { auth } from '@/firebase/config';
import { router } from 'expo-router';

import 'stream-chat-react/dist/css/v2/index.css';
import '@/global.css';

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
