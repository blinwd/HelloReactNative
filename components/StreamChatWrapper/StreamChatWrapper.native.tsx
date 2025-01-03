import { SafeAreaView, Text, View } from 'react-native';
import tailwindColors from 'tailwindcss/colors';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/contexts/AppContext';

type StreamChatWrapperProps = {
  children: React.ReactNode;
};

const StreamChatWrapper = ({
  children,
}: StreamChatWrapperProps) => {
  const colorScheme = useColorScheme();
  const { client } = useAppContext();

  if (!client) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center">
          <Text className="dark:text-white">
            Loading stream chat client ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider
      value={{
        style: {
          channelPreview: {
            container: {
              backgroundColor:
                Colors[colorScheme].background,
              borderBlockColor: Colors[colorScheme].divider,
            },
            title: {
              color: Colors[colorScheme].text,
            },
            message: {
              color: tailwindColors.slate[400],
            },
          },
          channelListMessenger: {
            flatListContent: {
              backgroundColor:
                Colors[colorScheme].background,
            },
          },
          messageInput: {
            container: {
              backgroundColor:
                Colors[colorScheme].background,
            },
            inputBoxContainer: {
              borderColor: Colors[colorScheme].divider,
            },
          },
          messageList: {
            container: {
              backgroundColor:
                colorScheme === 'dark'
                  ? tailwindColors.zinc[800]
                  : tailwindColors.white,
            },
          },
          emptyStateIndicator: {
            messageContainer: {
              backgroundColor:
                colorScheme === 'dark'
                  ? tailwindColors.zinc[800]
                  : tailwindColors.white,
            },
          },
        },
      }}
    >
      <Chat client={client as any}>{children}</Chat>
    </OverlayProvider>
  );
};

export default StreamChatWrapper;
