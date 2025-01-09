import { useCallback } from 'react';
import * as Calendar from 'expo-calendar';
import type { Source, Event } from 'expo-calendar';

export const useNativeCalendar = () => {
  const getDefaultCalendar = useCallback(async () => {
    const { status } =
      await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const defaultCalendar =
        await Calendar.getDefaultCalendarAsync();

      return defaultCalendar;
    }
  }, []);

  const createCalendarEvent = useCallback(
    async (event: Partial<Event>) => {
      let calendarSource = {
        isLocalAccount: true,
        name: 'Vida Health',
      } as Source;

      const defaultCalendar = await getDefaultCalendar();

      if (!defaultCalendar) {
        const newCalendarId =
          await Calendar.createCalendarAsync({
            title: 'Vida Health',
            color: '#FF9500',
            entityType: Calendar.EntityTypes.EVENT,
            source: calendarSource,
            sourceId: calendarSource.id,
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
