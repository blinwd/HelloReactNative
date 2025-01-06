import React from 'react';

import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

export type InnerPageProps = GridProps & {
  // Inner page header (title & subtitle)
  pageTitle?: React.ReactNode;
  pageSubtitle?: React.ReactNode;
  pageTitleTypographyProps?: TypographyProps;
  pageSubtitleTypographyProps?: TypographyProps;
  pageHeaderProps?: Partial<GridProps>;

  // Inner page body (content)
  pageContentProps?: Partial<GridProps>;
};

const InnerPage = React.forwardRef<
  HTMLDivElement,
  InnerPageProps
>(
  (
    {
      pageTitle,
      pageTitleTypographyProps,
      pageSubtitle,
      pageSubtitleTypographyProps,
      pageHeaderProps,
      pageContentProps,
      spacing = 3,
      children,
      ...restProps
    },
    ref
  ) => (
    <Grid
      ref={ref}
      className="inner-page-layout"
      minWidth={320}
      maxWidth={600}
      alignSelf="center"
      p={spacing}
      {...restProps}
      container
    >
      {(pageTitle || pageSubtitle) && (
        <Grid {...pageHeaderProps} size={12}>
          <Stack spacing={2}>
            {typeof pageTitle === 'string' ? (
              <Typography
                variant="h5"
                color="#712DA7"
                data-testid="page-title"
                {...pageTitleTypographyProps}
              >
                {pageTitle}
              </Typography>
            ) : (
              pageTitle
            )}

            {typeof pageSubtitle === 'string' ? (
              <Typography
                mt={0}
                data-testid="page-subtitle"
                {...pageSubtitleTypographyProps}
              >
                {pageSubtitle}
              </Typography>
            ) : (
              pageSubtitle
            )}
          </Stack>
        </Grid>
      )}

      <Grid mt={spacing} {...pageContentProps} size={12}>
        {children}
      </Grid>
    </Grid>
  )
);

export default InnerPage;
