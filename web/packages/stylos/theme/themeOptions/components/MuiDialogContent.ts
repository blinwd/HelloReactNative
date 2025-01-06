import type { Components, Theme } from '@mui/material'

const MuiDialogContent: Components<Theme>['MuiDialogContent'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    }),
  },
}

export default MuiDialogContent
