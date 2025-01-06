import {
  SafeAreaView,
  Text,
  View,
  Alert,
} from 'react-native';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';

type StreamChatWrapperProps = {
  children: React.ReactNode;
};

const StreamChatWrapper = ({
  children,
}: StreamChatWrapperProps) => {
  const colorScheme = useColorScheme();
  const { isAuthenticated, errors, client } =
    useAppContext();

  useEffect(() => {
    if (errors?.streamChat) {
      Alert.alert(
        'Stream Chat Error',
        errors.streamChat as string
      );
    }
  }, [errors]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

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
              color: Colors[colorScheme].gray,
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
                Colors[colorScheme].background,
            },
          },
          emptyStateIndicator: {
            messageContainer: {
              backgroundColor:
                Colors[colorScheme].background,
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
