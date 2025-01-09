import type { ListItemProps } from '@mui/material';
import { ListItem, Typography } from '@mui/material';
import React from 'react';

export const ListItemOverride: React.FC<ListItemProps> = ({
  children,
  ...rest
}) => (
  <ListItem {...rest}>
    <Typography variant="body1Bold">{children}</Typography>
  </ListItem>
);
