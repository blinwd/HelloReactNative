import type { Components } from '@mui/material'

const MuiTypography: Components['MuiTypography'] = {
  defaultProps: {
    variantMapping: {
      // Map the new variants to render a <p> by default
      body1Bold: 'p',
      avatarLetter: 'p',
      helperText: 'p',
      tooltip: 'p',
    },
  },
}

export default MuiTypography
