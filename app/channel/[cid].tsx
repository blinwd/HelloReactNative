import { useAppContext } from '@/contexts';
import { Text, SafeAreaView } from 'react-native';

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
