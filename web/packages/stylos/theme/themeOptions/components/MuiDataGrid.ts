import type { Components } from '@mui/material'

const MuiDataGrid: Components['MuiDataGrid'] = {
  styleOverrides: {
    root: {
      borderColor: 'transparent',
      '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':
        {
          outline: 'none',
          outlineWidth: 0,
        },
      '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
        padding: 16,
      },
      '& .MuiSvgIcon-root.MuiDataGrid-iconSeparator': {
        width: 0,
      },
    },
  },
}

export default MuiDataGrid
