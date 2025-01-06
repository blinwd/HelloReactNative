import type { Components, Theme } from '@mui/material'

const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: {
      height: 36,
      borderRadius: 18,
    },
    label: ({ theme }) => ({
      fontSize: theme.typography.buttonSmall.fontSize,
      fontWeight: theme.typography.buttonSmall.fontWeight,
      lineHeight: theme.typography.buttonSmall.lineHeight,
      letterSpacing: theme.typography.buttonSmall.letterSpacing,
    }),
    avatar: ({ theme }) => ({
      marginLeft: '6px',
      color: theme.palette.getContrastText(theme.palette.text.primary),
    }),
    outlined: ({ theme }) => ({
      borderColor: theme.palette.grey.A700,
    }),
    deleteIcon: ({ theme }) => ({
      color: theme.palette.grey.A700,
      fontSize: 24,
    }),
  },
}

export default MuiChip
