import tailwindColors from 'tailwindcss/colors';
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = tailwindColors['purple'][900];
const tintColorDark = tailwindColors['purple'][600];

const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: tailwindColors['slate'][500],
    tabIconSelected: tintColorLight,
    divider: tailwindColors['gray'][200],
    blue: tailwindColors['blue'][500],
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    divider: tailwindColors['gray'][700],
    blue: tailwindColors['blue'][300],
  },
};

export default Colors;
