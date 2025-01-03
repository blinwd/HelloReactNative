import { ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';
import { chatUserId } from '@/stream-chat';
import { useAppContext } from '@/contexts/AppContext';

const Chat = () => {
  const { setChannel } = useAppContext();

  if (!chatUserId) {
    return null;
  }

  return (
    <ChannelList
      filters={{
        members: {
          $in: [chatUserId as string],
        },
      }}
      options={{
        state: true,
        watch: true,
      }}
      sort={{
        last_message_at: -1,
      }}
      onSelect={(channel) => {
        setChannel(channel);

        router.push({
          pathname: '/channel/[cid]',
          params: {
            cid: channel.cid,
          },
        });
      }}
    />
  );
};

export default Chat;
