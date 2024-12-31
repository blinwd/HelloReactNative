import { SafeAreaView, Text, View } from 'react-native';
import { useEffect } from 'react';
import {
  Chat,
  OverlayProvider,
  useCreateChatClient,
} from 'stream-chat-expo';
import {
  chatApiKey,
  chatUserToken,
  chatUserId,
  chatUserName,
} from '@/stream-chat';

type StreamChatWrapperProps = {
  children: React.ReactNode;
};

const StreamChatWrapper = ({
  children,
}: StreamChatWrapperProps) => {
  const client = useCreateChatClient({
    apiKey: chatApiKey,
    userData: {
      id: chatUserId,
      name: chatUserName,
    },
    tokenOrProvider: chatUserToken,
  });

  useEffect(() => {
    console.log('>> StreamChatWrapper is rendered');
  }, []);

  if (!client) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="flex-1 items-center justify-center">
          <Text>Loading stream chat client ...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default StreamChatWrapper;
