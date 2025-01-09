import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';

import type { CalendarListItem } from './AddToCalendarMenu';
import { AddToCalendarMenu } from './AddToCalendarMenu';

type RegularButton = ButtonProps & {
  useIconButton?: false;
};

type IconButtonType = IconButtonProps & {
  useIconButton?: true;
};

type AddToCalendarButtonProps = {
  /**
   * Pass `false` to not render AddToCalendarMenu and the button that triggers the menu.
   * When it not enabled, it returns the children node.
   *
   * @defaultValue `true`
   */
  enabled?: boolean;
  useParentElementForAnchor?: boolean;
  useIconButton?: boolean;
  calendarOptions?: CalendarListItem[];
  ariaControls?: string;
  onCalendarClick?: (
    calendar?: CalendarListItem['value']
  ) => void;
} & (RegularButton | IconButtonType);

export const AddToCalendarButton = ({
  useIconButton,
  useParentElementForAnchor,
  enabled = true,
  id,
  children,
  calendarOptions,
  onCalendarClick,
  color = 'primary',
  ...props
}: AddToCalendarButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const [openMenu, setOpenMenu] = useState(false);

  const handleCalendarClick = useCallback(
    (calendar: CalendarListItem['value']) => {
      if (onCalendarClick) {
        onCalendarClick(calendar);
      }

      setOpenMenu(false);
    },
    [onCalendarClick]
  );

  const handleButtonClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.stopPropagation();

      debugger;
      if (
        Array.isArray(calendarOptions) &&
        calendarOptions.length === 1
      ) {
        handleCalendarClick(calendarOptions[0].value);
      } else {
        setOpenMenu(true);
      }
    },
    [calendarOptions, handleCalendarClick]
  );

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      {useIconButton === true && (
        <IconButton
          ref={btnRef}
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={openMenu ? 'true' : 'false'}
          onClick={handleButtonClick}
          {...props}
        >
          {children}
        </IconButton>
      )}

      {useIconButton !== true && (
        <Button
          ref={btnRef}
          color={color}
          variant="outlined"
          size="large"
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={openMenu ? 'true' : 'false'}
          onClick={handleButtonClick}
          fullWidth
          {...props}
        >
          {children}
        </Button>
      )}

      <AddToCalendarMenu
        id={id}
        anchorEl={
          useParentElementForAnchor
            ? btnRef.current?.parentElement
            : btnRef.current
        }
        calendarOptions={calendarOptions}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onClick={handleCalendarClick}
      />
    </>
  );
};
