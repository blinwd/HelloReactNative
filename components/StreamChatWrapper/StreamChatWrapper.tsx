import React from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { WebStreamChat } from '@/web/components/streamChat';

type StreamChatWrapperProps = {
  children: React.ReactNode;
};

const StreamChatWrapper = ({
  children,
}: StreamChatWrapperProps) => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return <WebStreamChat>{children}</WebStreamChat>;
};

export default StreamChatWrapper;
