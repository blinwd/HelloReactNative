import type { Components, Theme } from '@mui/material'

const MuiAlert: Components<Theme>['MuiAlert'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius:
        typeof theme.shape.borderRadius === 'number'
          ? theme.shape.borderRadius * 3
          : 12, // 4 * 3
    }),
  },
}

export default MuiAlert
