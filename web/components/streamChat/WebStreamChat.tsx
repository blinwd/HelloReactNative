'use dom';

import 'stream-chat-react/dist/css/v2/index.css';

import { Chat } from 'stream-chat-react';

import { useAppContext } from '@/contexts';
import { useColorScheme } from '@/hooks/useColorScheme';

type WebStreamChatProps = {
  children: React.ReactNode;
  className?: string;
};

const WebStreamChat = ({
  children,
  className = '',
}: WebStreamChatProps) => {
  const { client } = useAppContext();
  const colorScheme = useColorScheme();

  if (!client) {
    return (
      <div
        className={`w-full h-full flex flex-row items-center justify-center ${className}`}
      >
        Loading stream chat client ...
      </div>
    );
  }

  return (
    <Chat
      client={client}
      theme={`str-chat__theme-${colorScheme}`}
    >
      {children}
    </Chat>
  );
};

export default WebStreamChat;
