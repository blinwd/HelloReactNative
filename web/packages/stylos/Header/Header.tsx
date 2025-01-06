import React from 'react';
import { Image } from 'expo-image';
import { Platform } from 'react-native';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';

export type HeaderProps = GridProps & {
  height?: number;
  /**
   * Pass `true` to render the back button in native app.
   *
   * @defaultValue `false`
   */
  allowBackButtonInNativeApp?: boolean;
  platformOS?: Platform['OS'];
  onBackClick?: (() => void) | null;
};

const Header: React.FC<HeaderProps> = ({
  height = 72,
  allowBackButtonInNativeApp,
  platformOS = 'web',
  onBackClick,
  ...restProps
}) => {
  if (platformOS === 'web') {
    return (
      <Grid
        className="onboarding-header"
        container
        height={height}
        pl={2}
        pr={2}
        sx={(theme) => ({
          borderBottom: `4px solid ${
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : theme.palette.grey.A100
          }`,
        })}
        data-testid="onboardingHeaderContainer"
        {...restProps}
      >
        <Grid
          size={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {onBackClick && (
            <IconButton
              sx={{
                position: 'absolute',
                left: 0,
              }}
              onClick={onBackClick}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          <Image
            source={require('@/assets/images/vida-name-logo.svg')}
            alt="Vida Name Logo"
            style={{
              width: 140,
              height: 36,
            }}
            contentFit="contain"
          />
        </Grid>
      </Grid>
    );
  }

  if (allowBackButtonInNativeApp && onBackClick) {
    return (
      <Grid
        className="onboarding-header"
        container
        pl={2}
        pr={2}
        data-testid="onboardingHeaderContainer"
        {...restProps}
      >
        <Grid size={12}>
          <IconButton onClick={onBackClick}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default Header;
