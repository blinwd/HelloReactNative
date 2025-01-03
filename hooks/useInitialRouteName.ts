import { usePathname } from 'expo-router';

export const useInitialRouteName = () => {
  const pathname = usePathname();

  /**
   * If the user is authenticated and wants to go to the /chat screen,
   * 'chat' should be used as the initial route name in TabsLayout,
   * otherwise expo-router redirects user to /home screen.
   *
   * This is important for deep-linking to the chat screen.
   */
  if (pathname === '/chat') {
    return 'chat';
  }

  return 'home';
};
