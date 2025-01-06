import { createTheme } from '@mui/material';
import type { CSSProperties } from 'react';

// https://mui.com/x/react-data-grid/getting-started/#typescript
import type {} from '@mui/x-data-grid/themeAugmentation';

import { typography, components } from './themeOptions';

declare module '@mui/material/styles' {
  interface Palette {
    default: Palette['primary'];
    inverted: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    default?: PaletteOptions['primary'];
    inverted?: PaletteOptions['primary'];
  }

  interface TypographyFontStyleOptions
    extends CSSProperties {
    fontSize?: string | number;
    fontWeight?: number;
    textTransform?:
      | '-moz-initial'
      | 'inherit'
      | 'initial'
      | 'revert'
      | 'unset'
      | 'capitalize'
      | 'full-size-kana'
      | 'full-width'
      | 'lowercase'
      | 'none'
      | 'uppercase';
    lineHeight?: number;
    letterSpacing?: string | number;
    fontFamily?: string;
  }

  interface TypographyVariants {
    body1Bold: TypographyFontStyleOptions;
    buttonLarge: TypographyFontStyleOptions;
    buttonMedium: TypographyFontStyleOptions;
    buttonSmall: TypographyFontStyleOptions;
    avatarLetter: TypographyFontStyleOptions;
    inputLabel: TypographyFontStyleOptions;
    inputText: TypographyFontStyleOptions;
    helperText: TypographyFontStyleOptions;
    tooltip: TypographyFontStyleOptions;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body1Bold?: TypographyFontStyleOptions;
    buttonLarge?: TypographyFontStyleOptions;
    buttonMedium?: TypographyFontStyleOptions;
    buttonSmall?: TypographyFontStyleOptions;
    avatarLetter?: TypographyFontStyleOptions;
    inputLabel?: TypographyFontStyleOptions;
    inputText?: TypographyFontStyleOptions;
    helperText?: TypographyFontStyleOptions;
    tooltip?: TypographyFontStyleOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true;
    inverted: true;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    online: true;
    offline: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1Bold: true;
    buttonLarge: true;
    buttonMedium: true;
    buttonSmall: true;
    avatarLetter: true;
    inputLabel: true;
    inputText: true;
    helperText: true;
    tooltip: true;
  }
}

/*
 * The list of theme configuration variables can be found here:
 * https://mui.com/material-ui/customization/theming/#theme-configuration-variables
 */
const designSystemTheme = createTheme({
  typography,
  components,
});

export default designSystemTheme;
