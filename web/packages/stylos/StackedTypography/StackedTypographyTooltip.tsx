import React from 'react';

import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';

export type StackedTypographyTooltipProps = {
  /**
   * By default, tooltip content is the concatenation of primary and secondary text.
   * Use this prop to override it if you wish to show a custom message.
   *
   * @defaultValue `${primary} ${secondary}`
   */
  tooltip?: React.ReactNode;

  /**
   * Pass `true` to show tooltip.
   *
   * @defaultValue `true`
   */
  showTooltip?: boolean;

  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  children: React.ReactNode;
};

const StackedTypographyTooltip: React.FC<
  StackedTypographyTooltipProps
> = ({
  tooltip,
  children,
  showTooltip,
  tooltipProps,
  ...restProps
}) => {
  if (!showTooltip) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      placement="top"
      title={tooltip}
      {...tooltipProps}
      {...restProps}
    >
      <span
        style={{
          maxWidth: '100%',
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default StackedTypographyTooltip;
