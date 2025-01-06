import type { Components, Theme } from '@mui/material'

const MuiCardHeader: Components<Theme>['MuiCardHeader'] = {
  defaultProps: {
    titleTypographyProps: {
      variant: 'body1Bold',
    },
    subheaderTypographyProps: {
      variant: 'body2',
    },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider,
    }),
  },
}

export default MuiCardHeader
