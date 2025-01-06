import React from 'react';

import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';

export type SingleColumnPageLayoutProps = GridProps & {
  header?: JSX.Element | boolean | null;
  footer?: JSX.Element | boolean | null;
};

const SingleColumnPageLayout = React.forwardRef<
  HTMLDivElement,
  SingleColumnPageLayoutProps
>(({ header, footer, children, ...rest }, ref) => (
  <Grid
    ref={ref}
    container
    justifyContent="center"
    {...rest}
  >
    {React.isValidElement(header) && (
      <Grid size={12}>{header}</Grid>
    )}
    <Grid size={12} display="flex" flexDirection="column">
      {children}
    </Grid>
    {React.isValidElement(footer) && (
      <Grid size={12}>{footer}</Grid>
    )}
  </Grid>
));

export default SingleColumnPageLayout;
