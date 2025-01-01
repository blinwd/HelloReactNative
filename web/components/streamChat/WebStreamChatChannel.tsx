'use dom';

import {
  Channel,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react';
import { useAppContext } from '@/contexts';

type WebStreamChatChannelProps = {
  className?: string;
};

const WebStreamChatChannel = ({
  className = '',
}: WebStreamChatChannelProps) => {
  const { channel } = useAppContext();

  return (
    <div
      className={`flex-1 h-full overflow-hidden ${className}`}
    >
      {channel ? (
        <Channel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-base">Loading channel ...</p>
        </div>
      )}
    </div>
  );
};

export default WebStreamChatChannel;
