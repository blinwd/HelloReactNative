import type { Components, Theme } from '@mui/material'
import { darken } from '@mui/material'

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    color: 'primary',
    disableElevation: true,
  },
  variants: [
    {
      props: {
        variant: 'contained',
        color: 'default',
      },
      style: ({ theme }) => {
        return {
          '&:hover': {
            color: theme.palette.default.contrastText,
            backgroundColor: darken(theme.palette.primary.main, 0.125),
          },
        }
      },
    },
    {
      props: {
        variant: 'outlined',
        color: 'default',
      },
      style: ({ theme }) => {
        const greyColor = theme.palette.grey[300]

        return {
          borderColor: greyColor,
          color: theme.palette.text.primary,
          '&:hover': {
            border: `1px solid ${greyColor}`,
            background: greyColor,
          },
        }
      },
    },
    {
      props: {
        variant: 'outlined',
        color: 'primary',
      },
      style: ({ theme }) => {
        return {
          color: 'theme.palette.text.primary',
          backgroundColor: theme.palette.background.paper,
        }
      },
    },
    {
      props: {
        variant: 'text',
        color: 'default',
      },
      style: ({ theme }) => {
        return {
          color: theme.palette.text.primary,
        }
      },
    },
  ],
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      borderRadius: 64,
      ...(ownerState.size === 'small' && {
        fontSize: theme.typography.buttonSmall.fontSize,
        fontWeight: theme.typography.buttonSmall.fontWeight,
        lineHeight: theme.typography.buttonSmall.lineHeight,
        letterSpacing: theme.typography.buttonSmall.letterSpacing,
      }),
      ...(ownerState.size === 'medium' && {
        fontSize: theme.typography.buttonMedium.fontSize,
        fontWeight: theme.typography.buttonMedium.fontWeight,
        lineHeight: theme.typography.buttonMedium.lineHeight,
        letterSpacing: theme.typography.buttonMedium.letterSpacing,
      }),
      ...(ownerState.size === 'large' && {
        fontSize: theme.typography.buttonLarge.fontSize,
        fontWeight: theme.typography.buttonLarge.fontWeight,
        lineHeight: '20px',
        letterSpacing: theme.typography.buttonLarge.letterSpacing,
        padding: '16px',
        paddingTop: ownerState.variant === 'outlined' ? '13px' : '14px',
        paddingBottom: ownerState.variant === 'outlined' ? '13px' : '14px',
      }),
    }),
  },
}

export default MuiButton
