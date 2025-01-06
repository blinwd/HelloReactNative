import type { Components, Theme } from '@mui/material'

const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  defaultProps: {
    arrow: true,
  },
  styleOverrides: {
    arrow: ({ theme: { palette } }) => ({
      color:
        palette.mode === 'dark'
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(0, 0, 0, 0.7)',
    }),
    tooltip: ({ theme }) => {
      const { palette, typography } = theme
      const { tooltip } = typography

      return {
        color: palette.getContrastText(palette.text.primary),
        backgroundColor:
          palette.mode === 'dark'
            ? 'rgba(255,255,255,0.7)'
            : 'rgba(0, 0, 0, 0.7)',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        fontSize: tooltip.fontSize,
        fontWeight: tooltip.fontWeight,
        lineHeight: tooltip.lineHeight,
        '@media (min-width:600px)': {
          fontSize: tooltip.fontSize,
          lineHeight: tooltip.lineHeight,
        },
      }
    },
  },
}

export default MuiTooltip
