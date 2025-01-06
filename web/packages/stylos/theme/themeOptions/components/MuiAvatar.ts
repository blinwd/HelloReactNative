import type { Components, Theme } from '@mui/material'

const MuiAvatar: Components<Theme>['MuiAvatar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: 36,
      height: 36,
      fontWeight: theme.typography.avatarLetter.fontWeight,
      textTransform: theme.typography.avatarLetter.textTransform,
      '&.avatar-extrasmall': {
        width: 24,
        height: 24,
        fontSize: '8px',
      },
      '&.avatar-small': {
        width: 36,
        height: 36,
        fontSize: '12px',
      },
      '&.avatar-medium': {
        width: 48,
        height: 48,
        fontSize: '18px',
      },
      '&.avatar-large': {
        width: 64,
        height: 64,
        fontSize: '24px',
      },
      '&.avatar-extralarge': {
        width: 96,
        height: 96,
        fontSize: '32px',
      },
      '&.avatar-jumbo': {
        width: 120,
        height: 120,
        fontSize: '40px',
      },
    }),
  },
}

export default MuiAvatar
