import { useCallback } from 'react';
import * as Calendar from 'expo-calendar';
import type { Source, Event } from 'expo-calendar';

export const useNativeCalendar = () => {
  const getCalendars = useCallback(async () => {
    const { status } =
      await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();

      return calendars;
    }
  }, []);

  const createCalendarEvent = useCallback(
    async (event: Partial<Event>) => {
      let calendarSource = {
        isLocalAccount: true,
        name: 'Vida Health',
      } as Source;

      const calendars = await getCalendars();
      const defaultCalendar = calendars?.find(
        (cal) =>
          cal.accessLevel ===
          Calendar.CalendarAccessLevel.OWNER
      );

      if (!defaultCalendar) {
        const newCalendarId =
          await Calendar.createCalendarAsync({
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            color: '#FF9500',
            isVisible: true,
            name: calendarSource.name,
            ownerAccount: 'personal',
            source: calendarSource,
            title: 'Vida Health',
          });

        calendarSource.id = newCalendarId;
      } else {
        calendarSource.id = defaultCalendar.id;
      }

      event.calendarId = calendarSource.id;

      await Calendar.createEventInCalendarAsync(event);
    },
    []
  );

  return {
    createCalendarEvent,
  };
};
