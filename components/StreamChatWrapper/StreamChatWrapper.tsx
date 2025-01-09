import React from 'react';

import { WebStreamChat } from '@/web/components/streamChat';

type StreamChatWrapperProps = {
  children: React.ReactNode;
};

const StreamChatWrapper = ({
  children,
}: StreamChatWrapperProps) => {
  return <WebStreamChat>{children}</WebStreamChat>;
};

export default StreamChatWrapper;
