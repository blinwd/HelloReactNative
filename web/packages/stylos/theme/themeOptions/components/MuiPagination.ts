import type { Components, Theme } from '@mui/material'

const MuiPagination: Components<Theme>['MuiPagination'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    }),
  },
}

export default MuiPagination
