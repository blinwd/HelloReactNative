import type { Components, Theme } from '@mui/material'

/**
 * Paper can be consumed by other MUI components:
 *  Alert,
 *  Card,
 *  Dialog, etc.
 *
 * These component automatically inherit Paper default styles.
 * But they can also override them. For example,
 *
 *  Alert borderRadius = 3 * 4
 *  Card borderRadius = 2 * 4
 *  Dialog borderRadius inherits Paper borderRadius
 */
const MuiPaper: Components<Theme>['MuiPaper'] = {
  defaultProps: {
    variant: 'elevation',
    elevation: 24,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius:
        typeof theme.shape.borderRadius === 'number'
          ? theme.shape.borderRadius * 4
          : 16, // 4 * 4
    }),
  },
}

export default MuiPaper
