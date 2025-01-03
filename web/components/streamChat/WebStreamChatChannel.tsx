'use dom';

import {
  Channel,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react';
import { useAppContext } from '@/contexts/AppContext';

const WebStreamChatChannel = () => {
  const { channel } = useAppContext();

  if (!channel) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-base">Select a channel ...</p>
      </div>
    );
  }

  return (
    <Channel channel={channel}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  );
};

export default WebStreamChatChannel;
