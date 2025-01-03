/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { useColorScheme as useNativeColorScheme } from 'nativewind';

import Colors from '@/constants/Colors';

export function useColorScheme(
  props?: { light?: string; dark?: string },
  colorName?: keyof typeof Colors.light &
    keyof typeof Colors.dark
) {
  const { setColorScheme } = useNativeColorScheme();
  const darkThemeMq = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );
  const colorTheme = darkThemeMq.matches ? 'dark' : 'light';

  setColorScheme(colorTheme);

  return colorTheme;
}
