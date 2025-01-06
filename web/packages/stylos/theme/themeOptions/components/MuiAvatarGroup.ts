import type { Components } from '@mui/material'

const MuiAvatarGroup: Components['MuiAvatarGroup'] = {
  styleOverrides: {
    root: {
      '& .avatar-badge-root:last-child .MuiAvatar-root': {
        marginLeft: 0,
      },
    },
  },
}

export default MuiAvatarGroup
