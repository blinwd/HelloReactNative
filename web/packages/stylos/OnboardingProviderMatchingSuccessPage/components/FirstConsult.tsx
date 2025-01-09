import React, { useMemo, useRef } from 'react';

import { T, useT } from '@transifex/react';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideocamIcon from '@mui/icons-material/Videocam';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import { localizeDayOfWeek } from '../utils/localizeDayOfWeek';
import { localizeMonth } from '../utils/localizeMonth';
import { AddToCalendarButton } from './AddToCalendarButton';
import type { CalendarListItem } from './AddToCalendarMenu';

type FirstConsultProps = {
  timeslot?: string;
  duration?: number;
  calendarOptions?: CalendarListItem[];
  supportAddToCalendar?: boolean;
  onCalendarClick?: (
    calendar: CalendarListItem['value']
  ) => void;
};

export const FirstConsult: React.FC<FirstConsultProps> = ({
  timeslot,
  duration,
  calendarOptions,
  supportAddToCalendar,
  onCalendarClick,
}) => {
  const t = useT();

  const anchorElRef = useRef<HTMLDivElement>(null);

  const consult = useMemo(() => {
    if (typeof timeslot === 'string') {
      const dayjsInstance = dayjs(timeslot);
      const dayOfWeek = localizeDayOfWeek(dayjsInstance);
      const month = localizeMonth(dayjsInstance, false);
      const time = dayjsInstance.format('h:mm A');
      const endAt = duration
        ? dayjsInstance.add(duration, 'm').format('h:mm A')
        : null;

      return {
        date: `${dayOfWeek}, ${month} ${dayjsInstance.format(
          'D, YYYY'
        )}`,
        time: endAt ? `${time} - ${endAt}` : time,
        duration: duration
          ? `${duration} ${t('min', {
              describe: 'minutes',
            })}`
          : null,
      };
    }

    return null;
  }, [duration, timeslot, t]);

  return (
    <Alert
      severity="info"
      icon={false}
      sx={{
        p: 0,
        '& .MuiAlert-message': {
          flex: 1,
          p: 0,
        },
      }}
    >
      <AddToCalendarButton
        id="consultation-alert"
        calendarOptions={calendarOptions}
        onCalendarClick={onCalendarClick}
        variant="text"
        sx={{
          p: 0,
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          borderRadius: '12px',
          color: (theme) => theme.palette.text.primary,
        }}
        fullWidth
        disableRipple
        enabled={supportAddToCalendar}
      >
        <Stack
          direction="column"
          spacing={1.5}
          p={4}
          bgcolor="transparent"
        >
          <Stack
            ref={anchorElRef}
            direction="row"
            spacing={2}
            alignItems="flex-start"
          >
            <CalendarTodayIcon
              sx={{
                fill: (theme) => theme.palette.text.primary,
              }}
            />

            {consult ? (
              <Stack direction="column">
                <Typography variant="body1Bold">
                  {consult.date}
                </Typography>
                <Typography>{consult.time}</Typography>
              </Stack>
            ) : (
              <Typography variant="body1">
                <T _str="Schedule your first appointment in the app" />
              </Typography>
            )}
          </Stack>

          {consult?.duration && (
            <Stack direction="row" spacing={2}>
              <WatchLaterIcon
                sx={{
                  fill: (theme) =>
                    theme.palette.text.primary,
                }}
              />
              <Typography variant="body1">
                {consult?.duration}
              </Typography>
            </Stack>
          )}

          {consult && (
            <Stack direction="row" spacing={2}>
              <VideocamIcon
                sx={{
                  fill: (theme) =>
                    theme.palette.text.primary,
                }}
              />
              <Typography variant="body1">
                <T _str="Video call in Vida app" />
              </Typography>
            </Stack>
          )}
        </Stack>
      </AddToCalendarButton>
    </Alert>
  );
};
