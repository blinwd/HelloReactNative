import type { Components, Theme } from '@mui/material'

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 8,
      '& fieldset': {
        borderColor: theme.palette.grey['200'],
      },
      '& .MuiSelect-outlined': {
        color: theme.palette.text.secondary,
      },
    }),
  },
}

export default MuiOutlinedInput
