import type { Components, Theme } from '@mui/material'

const MuiCard: Components<Theme>['MuiCard'] = {
  defaultProps: {
    variant: 'outlined',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius:
        typeof theme.shape.borderRadius === 'number'
          ? theme.shape.borderRadius * 2
          : 8, // 4 * 2
      '&.MuiPaper-outlined.hoverable': {
        cursor: 'pointer',
      },
      '&.MuiPaper-outlined.hoverable:hover': {
        boxShadow: theme.shadows['6'],
      },
    }),
  },
}

export default MuiCard
