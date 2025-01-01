import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Channel, StreamChat, Thread } from 'stream-chat';

import { User } from 'firebase/auth';

import { auth } from '@/firebase/config';
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
  teamUuid,
} from '@/stream-chat/config';
import type { AppContextType } from './AppContextType';
import { Platform } from 'react-native';

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  client: null,
  channel: null,
  thread: null,
  setUser: () => {},
  setIsAuthenticated: () => {},
  setClient: () => {},
  setChannel: () => {},
  setThread: () => {},
  connectStreamChat: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [isReady, setIsReady] = useState(false);

  const [client, setClient] = useState<StreamChat>();
  const [channel, setChannel] = useState<Channel>();
  const [thread, setThread] = useState<Thread>();

  const connectStreamChat = useCallback(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    const newStreamChatClient = new StreamChat(chatApiKey);

    newStreamChatClient
      .connectUser(
        {
          id: chatUserId,
          name: chatUserName,
        },
        chatUserToken
      )
      .then(() => {
        setClient(newStreamChatClient);

        setChannel(
          newStreamChatClient.channel('care-team', teamUuid)
        );
      })
      .catch((err) => {
        console.error('>> connectStreamChat error:', err);
      });

    return () => {
      newStreamChatClient?.disconnectUser();
    };
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(Boolean(user));
      setIsReady(true);

      if (Boolean(user)) {
        connectStreamChat();
      }
    });
  }, [connectStreamChat]);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isReady,
        client,
        channel,
        thread,
        setUser,
        setIsAuthenticated,
        setClient,
        setChannel,
        setThread,
        connectStreamChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
