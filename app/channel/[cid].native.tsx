import PageView from '@/components/PageView';
import { useAppContext } from '@/contexts';
import { Stack } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import {
  Channel,
  MessageList,
  MessageInput,
  useAttachmentPickerContext,
} from 'stream-chat-expo';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect } from 'react';

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
