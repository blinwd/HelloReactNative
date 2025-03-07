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
  teamType,
  teamUuid,
} from '@/stream-chat/config';
import type { AppContextType } from './AppContextType';
import { AuthProvider } from './AuthContext';

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  client: null,
  channel: null,
  thread: null,
  errors: {},
  setUser: () => {},
  setIsAuthenticated: () => {},
  setClient: () => {},
  setChannel: () => {},
  setThread: () => {},
  setErrors: () => {},
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

  const [errors, setErrors] = useState<
    Record<string, string | boolean>
  >({});

  const connectStreamChat = useCallback(() => {
    if (!chatApiKey || !chatUserToken) {
      setErrors((prev) => ({
        ...prev,
        streamChat:
          'Miss Stream Chat API key or token in environment variables.',
      }));
      return;
    }

    const newStreamChatClient = new StreamChat(chatApiKey);

    newStreamChatClient
      .connectUser(
        {
          id: chatUserId as string,
          name: chatUserName,
        },
        chatUserToken
      )
      .then(() => {
        setClient(newStreamChatClient);
      })
      .catch((err) => {
        console.error('>> connectStreamChat error:', err);
      });

    return () => {
      newStreamChatClient?.disconnectUser();
    };
  }, []);

  useEffect(() => {
    /**
     * Dev note:
     * team type and team uuid are hardcoded in the environment variables for now.
     */
    const initialWatchChannel = client?.channel(
      teamType as string,
      teamUuid
    );

    initialWatchChannel?.watch().then((result) => {
      if (result.channel) {
        setChannel(initialWatchChannel);
      }
    });
  }, [client]);

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
        errors,
        setUser,
        setIsAuthenticated,
        setClient,
        setChannel,
        setThread,
        setErrors,
        connectStreamChat,
      }}
    >
      <AuthProvider
        value={{
          errors,
          setErrors,
          setIsAuthenticated,
          setUser,
        }}
      >
        {children}
      </AuthProvider>
    </AppContext.Provider>
  );
};

export default AppContext;
