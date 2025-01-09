import React from 'react';

import type { TooltipProps } from '@mui/material/Tooltip';
import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

import StackedTypographyTooltip from './StackedTypographyTooltip';

export type StackedTypographyProps = {
  /**
   * Primary typography.
   */
  primary: React.ReactNode;

  /**
   * Secondary typography.
   */
  secondary?: React.ReactNode;

  /**
   * Props applied on primary Typography.
   */
  primaryTypographyProps?: TypographyProps;

  /**
   * Props applied on secondary Typography.
   */
  secondaryTypographyProps?: TypographyProps;
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
} & StackProps;

const StackedTypography = React.forwardRef<
  HTMLDivElement,
  StackedTypographyProps
>(
  (
    {
      primary,
      secondary,
      primaryTypographyProps = {},
      secondaryTypographyProps = {},
      tooltip,
      showTooltip = true,
      tooltipProps,
      ...restProps
    },
    ref
  ) => {
    const {
      sx: primarySxProp,
      ...restPrimaryTypographyProps
    } = primaryTypographyProps || {};

    const {
      sx: secondarySxProp,
      ...restSecondaryTypographyProps
    } = secondaryTypographyProps || {};

    return (
      <Stack
        ref={ref}
        data-testid="stacked-typography"
        {...restProps}
      >
        <StackedTypographyTooltip
          showTooltip={showTooltip}
          tooltip={
            tooltip || (
              <>
                {primary}
                <br />
                {secondary}
              </>
            )
          }
          tooltipProps={tooltipProps}
        >
          <>
            {primary && (
              <Typography
                variant="h6"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                sx={{
                  color: ({ palette }) => palette.grey[900],
                  ...primarySxProp,
                }}
                {...restPrimaryTypographyProps}
                data-testid="primary-typography"
              >
                {primary}
              </Typography>
            )}

            {secondary && (
              <Typography
                variant="body2"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                sx={{
                  color: ({ palette }) =>
                    palette.text.secondary,
                  ...secondarySxProp,
                }}
                {...restSecondaryTypographyProps}
                data-testid="secondary-typography"
              >
                {secondary}
              </Typography>
            )}
          </>
        </StackedTypographyTooltip>
      </Stack>
    );
  }
);

export default StackedTypography;
