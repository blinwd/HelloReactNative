import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppContext } from '@/contexts';

const ChannelScreen = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { channel } = useAppContext();

  if (!channel) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
};

export default ChannelScreen;
