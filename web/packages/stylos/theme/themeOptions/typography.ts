import type { ThemeOptions } from '@mui/material'

const themeOption: ThemeOptions['typography'] = {
  // set "Inter" as the default font
  fontFamily: "'Inter', sans-serif",

  // default 13 variants
  h1: {
    fontSize: '6rem',
    fontWeight: 700,
    lineHeight: 1.167,
    letterSpacing: '-5px',
  },
  h2: {
    fontSize: '3.75rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-2px',
  },
  h3: {
    fontSize: '3rem',
    fontWeight: 600,
    lineHeight: 1.167,
    letterSpacing: '-1px',
  },
  h4: {
    fontSize: '2.125rem',
    fontWeight: 600,
    lineHeight: 1.235,
    letterSpacing: '-1px',
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '-0.8px',
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '-0.6px',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '-0.37px',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.286,
    letterSpacing: '-0.2px',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '-0.374px',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.2px',
  },
  // equivalent to custom 'buttonSmall' variant
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.571,
    letterSpacing: '0px',
    textTransform: 'initial',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 2.66,
    letterSpacing: '-0.2px',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'initial',
    letterSpacing: '-0.2px',
  },

  // custom variants
  body1Bold: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.43,
    letterSpacing: '0.2px',
    fontFamily: "'Inter', sans-serif",
  },
  buttonLarge: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.625,
    letterSpacing: '0px',
    fontFamily: "'Inter', sans-serif",
  },
  buttonMedium: {
    fontWeight: 600,
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    letterSpacing: '0px',
    fontFamily: "'Inter', sans-serif",
  },
  // equivalent to default 'button' variant
  buttonSmall: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.571,
    letterSpacing: '0px',
    fontFamily: "'Inter', sans-serif",
  },
  avatarLetter: {
    fontWeight: 700,
    textTransform: 'uppercase',
    fontFamily: "'Inter', sans-serif",
  },
  inputLabel: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1,
    fontFamily: "'Inter', sans-serif",
  },
  inputText: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: "'Inter', sans-serif",
  },
  helperText: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.667,
    fontFamily: "'Inter', sans-serif",
  },
  tooltip: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.3,
    fontFamily: "'Inter', sans-serif",
  },
}

export default themeOption
