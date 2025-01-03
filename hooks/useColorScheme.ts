/**
 * Learn more about light and dark modes:
 * https://www.nativewind.dev/core-concepts/dark-mode
 */
import { useColorScheme as useNativeColorScheme } from 'nativewind';

import Colors from '@/constants/Colors';

export function useColorScheme(
  props?: { light?: string; dark?: string },
  colorName?: keyof typeof Colors.light &
    keyof typeof Colors.dark
) {
  const { colorScheme } = useNativeColorScheme();

  return colorScheme === 'dark' ? 'dark' : 'light';
}
