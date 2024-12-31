import React from 'react';
import { ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';
import { chatUserId } from '@/stream-chat';
import { useAppContext } from '@/contexts/AppContext';
import { Stack } from 'expo-router';

const Chat = () => {
  const { setChannel } = useAppContext();

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: 'Chat' }}
      />
      <ChannelList
        filters={{
          members: { $in: [chatUserId] },
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
    </>
  );
};

export default Chat;
