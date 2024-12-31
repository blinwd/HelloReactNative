import type { User } from 'firebase/auth';
import type {
  StreamChat,
  Channel,
  Thread,
} from 'stream-chat';

export type AppContextType = {
  user: User | null | undefined;
  isAuthenticated: boolean;
  isReady: boolean;
  client: StreamChat | null | undefined;
  channel: Channel | null | undefined;
  thread: Thread | null | undefined;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setClient: (client: StreamChat) => void;
  setChannel: (channel: Channel | any) => void;
  setThread: (thread: Thread | any) => void;
  connectStreamChat: () => void;
};
