import type { Components, Theme } from '@mui/material'

const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    }),
  },
}

export default MuiDialogActions
