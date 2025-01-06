import type { Components, Theme } from '@mui/material'

const MuiDivider: Components<Theme>['MuiDivider'] = {
  styleOverrides: {
    wrapper: {
      fontFamily: "'Inter', sans-serif",
    },
  },
}

export default MuiDivider
