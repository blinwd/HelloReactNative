import type { Components } from '@mui/material'

const MuiTextField: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
  },
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      style: ({ theme }) => {
        return {
          '& fieldset': {
            borderRadius: 8,
            borderColor: theme.palette.grey[200],
          },
          '& input': {
            color: theme.palette.text.primary,
          },
          '& label': {
            color: theme.palette.text.secondary,
          },
          '& label.MuiFormLabel-filled': {
            color: theme.palette.text.secondary,
          },
        }
      },
    },
  ],
}

export default MuiTextField
