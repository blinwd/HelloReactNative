import React, { useMemo } from 'react';
import { Image } from 'expo-image';

import ListItemIcon from '@mui/material/ListItemIcon';
import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { T, useT } from '@transifex/react';

export type CalendarListItem = {
  value?:
    | 'Apple'
    | 'Google'
    | 'iCal'
    | 'Microsoft365'
    | 'MicrosoftTeams'
    | 'Outlook.com'
    | 'Yahoo';
  text: string;
  icon?: React.ReactNode;
};

type AddToCalendarMenuProps = Omit<MenuProps, 'onClick'> & {
  calendarOptions?: CalendarListItem[];
  anchorEl: MenuProps['anchorEl'];
  onClick: (calendar?: CalendarListItem['value']) => void;
};

export const AddToCalendarMenu: React.FC<
  AddToCalendarMenuProps
> = ({
  id,
  calendarOptions,
  anchorEl,
  onClick,
  ...restMenuProps
}) => {
  const t = useT();

  const calendarListItems: CalendarListItem[] =
    useMemo(() => {
      if (
        Array.isArray(calendarOptions) &&
        calendarOptions.length > 0
      ) {
        return calendarOptions;
      }

      return [
        {
          value: 'Apple',
          text: t('Apple'),
          icon: (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('@/assets/images/apple-icon.svg')}
            />
          ),
        },
        {
          value: 'Google',
          text: t('Google'),
          icon: (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('@/assets/images/google-calendar.svg')}
            />
          ),
        },
        {
          value: 'Microsoft365',
          text: t('Microsoft Outlook'),
          icon: (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('@/assets/images/outlook-calendar.svg')}
            />
          ),
        },
      ];
    }, [calendarOptions, t]);

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      MenuListProps={{
        'aria-labelledby': 'add-to-calendar-menu',
        ['data-testid' as string]: 'calendar-menu',
      }}
      {...restMenuProps}
    >
      <Typography p={1} ml={1}>
        <T _str="Select to add to calendar" />
      </Typography>

      {calendarListItems.map(({ text, icon, value }) => (
        <MenuItem
          key={value}
          sx={{
            width: (anchorEl as HTMLButtonElement)
              ?.offsetWidth,
          }}
          onClick={() => onClick(value)}
          data-testid={`calendar-menu-item-${value}`}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}

          <Typography
            variant="body1Bold"
            p={1}
            data-testid={`calendar-menu-item-text-${value}`}
          >
            {text}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
