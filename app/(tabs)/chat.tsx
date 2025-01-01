import PageView from '@/components/PageView';
import TopNavBar from '@/templates/TopNavBar';
import {
  WebStreamChatChannel,
  WebStreamChatList,
} from '@/web/components/streamChat';

const Chat = () => {
  return (
    <PageView topNavBar={<TopNavBar />}>
      <div
        className={`w-full h-full flex flex-row gap-2 border-t border-gray-200`}
      >
        <WebStreamChatList className="w-[56px]" />
        <WebStreamChatChannel className="py-2" />
      </div>
    </PageView>
  );
};

export default Chat;
