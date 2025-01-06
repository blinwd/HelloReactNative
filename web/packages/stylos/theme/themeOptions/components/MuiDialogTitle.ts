import type { Components, Theme } from '@mui/material'

const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      '&.dialog-title-draggable': {
        cursor: 'grab',
      },
      '&.dialog-title-draggable:active': {
        cursor: 'grabbing',
      },
      '& span': {
        color: theme.palette.text.primary,
      },
    }),
  },
}

export default MuiDialogTitle
