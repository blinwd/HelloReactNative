import type { Components } from '@mui/material'

const MuiBadge: Components['MuiBadge'] = {
  variants: [
    {
      props: {
        variant: 'online',
      },
      style: ({ theme }) => {
        return {
          '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            width: '12px',
            height: '12px',
            minWidth: 'auto',
            minHeight: 'auto',
            padding: 0,
          },
        }
      },
    },
    {
      props: {
        variant: 'offline',
      },
      style: ({ theme }) => {
        return {
          '& .MuiBadge-badge': {
            backgroundColor: '#eeeeee',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            width: '12px',
            height: '12px',
            minWidth: 'auto',
            minHeight: 'auto',
            padding: 0,
          },
        }
      },
    },
  ],
}

export default MuiBadge
