import type { Components, Theme } from '@mui/material'

const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  styleOverrides: {
    tag: ({ theme }) => ({
      margin: theme.spacing(0.5),
    }),
  },
}

export default MuiAutocomplete
