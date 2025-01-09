import React from 'react';
import { Platform } from 'react-native';

import classNames from 'classnames';
import Stack from '@mui/material/Stack';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import InnerPage from '@/stylos/InnerPage';
import type { SingleColumnPageLayoutProps } from '@/stylos/SingleColumnPageLayout';

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
    const theme = useTheme();
    const cls = classNames({
      'single-column-page-sticky-footer': sticky,
      'single-column-page-footer': !sticky,
    });

    if (sticky) {
      return (
        <Stack
          width="100%"
          position={'fixed'}
          bottom={0}
          ref={ref}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 24,
              background:
                platformOS === 'web'
                  ? `linear-gradient(to top, ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(21, 23, 24)'
                        : 'rgb(255, 255, 255)'
                    }, ${
                      theme.palette.mode === 'dark'
                        ? 'rgba(21, 23, 24, 0)'
                        : 'rgba(255, 255, 255, 0)'
                    })`
                  : 'transparent',
            }}
          />
          <Grid
            size={12}
            justifyContent="center"
            display="flex"
            className={classNames({
              'bg-white': theme.palette.mode === 'light',
              'bg-zinc-900': theme.palette.mode === 'dark',
            })}
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
        </Stack>
      );
    }

    return (
      <Grid
        ref={ref}
        container
        className={cls}
        width="100%"
        mt={-3}
        {...restProps}
      >
        <Grid
          size={12}
          justifyContent="center"
          display="flex"
          className={classNames({
            'bg-zinc-900': theme.palette.mode === 'dark',
          })}
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
