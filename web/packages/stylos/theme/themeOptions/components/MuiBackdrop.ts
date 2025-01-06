import type { Components, Theme } from '@mui/material'

const MuiBackdrop: Components<Theme>['MuiBackdrop'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
  },
}

export default MuiBackdrop
