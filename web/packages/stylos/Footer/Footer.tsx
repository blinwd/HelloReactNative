import React from 'react';

import { Platform } from 'react-native';
import classNames from 'classnames';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';

import type { SingleColumnPageLayoutProps } from '@/stylos/SingleColumnPageLayout';

import InnerPage from '@/stylos/InnerPage';

export type FooterProps = SingleColumnPageLayoutProps & {
  height?: number;
  sticky?: boolean;
  spacing?: number;
  innerPagePadding?: GridProps['spacing'];
  AdTrackingConsent?: React.ComponentType;
  platformOS?: Platform['OS'];
};

const Footer = React.forwardRef<
  HTMLDivElement,
  FooterProps
>(
  (
    {
      sticky,
      children,
      innerPagePadding = 3,
      AdTrackingConsent,
      platformOS = 'web',
      ...restProps
    },
    ref
  ) => {
    const cls = classNames({
      'single-column-page-sticky-footer': sticky,
      'single-column-page-footer': !sticky,
    });

    return (
      <Grid
        ref={ref}
        container
        className={cls}
        position={sticky ? 'fixed' : 'relative'}
        bottom={sticky ? 0 : undefined}
        data-testid={cls}
        mt={-3}
        {...restProps}
      >
        {sticky && (
          <Grid size={12}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 24,
                background:
                  platformOS === 'web'
                    ? 'linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0))'
                    : 'transparent',
              }}
            />
          </Grid>
        )}

        <Grid
          size={12}
          justifyContent="center"
          display="flex"
        >
          <InnerPage
            width={'100%'}
            spacing={0}
            p={innerPagePadding}
          >
            {children}

            {AdTrackingConsent && (
              <Grid container mt={innerPagePadding}>
                <Grid size={12}>
                  <AdTrackingConsent />
                </Grid>
              </Grid>
            )}
          </InnerPage>
        </Grid>
      </Grid>
    );
  }
);

export default Footer;
