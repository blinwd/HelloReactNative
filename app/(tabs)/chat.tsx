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
        className={`w-full h-full flex flex-row border-t border-gray-200 dark:border-gray-700`}
      >
        <WebStreamChatList className="w-[56px]" />

        <div className="flex-1 h-full overflow-hidden ${className}">
          <WebStreamChatChannel />
        </div>
      </div>
    </PageView>
  );
};

export default Chat;
