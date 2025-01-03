'use dom';

import { Avatar, ChannelList } from 'stream-chat-react';
import { useAppContext } from '@/contexts/AppContext';

import { chatUserId } from '@/stream-chat/config';

type WebStreamChatProps = {
  className?: string;
};

const WebStreamChatList = ({
  className = '',
}: WebStreamChatProps) => {
  const {
    client,
    channel: activeChannel,
    setChannel,
  } = useAppContext();

  if (!client) {
    return null;
  }

  return (
    <div
      className={`overflow-x-hidden overflow-y-auto ${className}`}
    >
      <ChannelList
        filters={{
          members: {
            $in: [chatUserId as string],
          },
        }}
        sort={{
          last_message_at: -1,
        }}
        options={{
          limit: 10,
        }}
        Preview={({
          displayTitle,
          displayImage,
          channel,
        }) => (
          <div
            className={`flex w-full justify-center mt-2 ${
              activeChannel === channel
                ? 'border-r-2 border-blue-500'
                : ''
            }`}
          >
            <button
              className={`my-2`}
              onClick={() => {
                setChannel(channel);
              }}
            >
              <Avatar
                image={displayImage}
                name={displayTitle}
                size={32}
              />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default WebStreamChatList;
