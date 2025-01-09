import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import {
  Channel,
  MessageList,
  MessageInput,
  useAttachmentPickerContext,
} from 'stream-chat-expo';
import { useHeaderHeight } from '@react-navigation/elements';

import { useAppContext } from '@/contexts';
import PageView from '@/components/PageView';

const ChannelScreen = () => {
  const { channel } = useAppContext();
  const { setTopInset } = useAttachmentPickerContext();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  if (!channel) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <PageView>
      <Stack.Screen
        options={{ title: channel?.data?.name }}
      />

      <Channel
        channel={channel as any}
        keyboardVerticalOffset={headerHeight}
      >
        <MessageList />
        <MessageInput />
      </Channel>
    </PageView>
  );
};

export default ChannelScreen;
