import React from 'react';

import type { AvatarProps } from '@mui/material/Avatar';
import Avatar from '@mui/material/Avatar';
import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import type { StackedTypographyProps } from '@/stylos/StackedTypography';
import StackedTypography from '@/stylos/StackedTypography';

export type ProviderInfoStackProps = StackProps & {
  avatar?: Partial<{
    image?: string;
    title?: string;
  }>;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  showTooltip?: boolean;
  components?: Partial<{
    avatarProps: AvatarProps;
    stackedTypographyProps: Partial<
      Omit<StackedTypographyProps, 'primary' | 'secondary'>
    >;
  }>;
};

const ProviderInfoStack: React.FC<
  ProviderInfoStackProps
> = ({
  avatar,
  title,
  subtitle,
  compact = true,
  showTooltip = false,
  components,
  ...restStackProps
}) => (
  <Stack
    direction={compact ? 'row' : 'column'}
    spacing={2}
    alignItems="center"
    data-testid="provider-info-stack"
    {...restStackProps}
  >
    <Avatar
      // size={compact ? 'custom' : 'extralarge'}
      sx={{
        bgcolor: '#8D42C8',
      }}
      style={
        compact
          ? {
              width: '72px',
              height: '72px',
            }
          : undefined
      }
      src={avatar?.image}
      alt={avatar?.title || title}
      data-testid="provider-info-avatar"
      {...components?.avatarProps}
    />
    <StackedTypography
      primary={title as string}
      primaryTypographyProps={{
        variant: 'h6',
        fontSize: 18,
        lineHeight: '22px',
        whiteSpace: 'normal',
        sx: {
          color: 'text.primary',
        },
      }}
      secondary={subtitle as string}
      secondaryTypographyProps={{
        variant: 'body2',
        lineHeight: '18px',
        whiteSpace: 'normal',
      }}
      showTooltip={showTooltip}
      spacing={0.5}
      textAlign={!compact ? 'center' : undefined}
      alignItems={!compact ? 'center' : undefined}
      {...components?.stackedTypographyProps}
    />
  </Stack>
);

export default ProviderInfoStack;
