import { useCallback } from 'react';
import { Platform, View } from 'react-native';
import { router } from 'expo-router';
import type { Event } from 'expo-calendar';
import dayjs from 'dayjs';

import { useColorScheme } from '@/hooks/useColorScheme';
import { OnboardingProviderMatchingSuccessPage } from '@/web/pages/onboarding';
import { useNativeCalendar } from '@/hooks/useNativeCalendar';

const ProviderMatchingSuccessPage = () => {
  const colorScheme = useColorScheme();

  const { createCalendarEvent } = useNativeCalendar();

  const handleCalendarClick = useCallback(
    async (config: any) => {
      const calendarEvent: Partial<Event> = {
        startDate: dayjs(
          `${config.startDate} T${config.startTime}`,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        title: config.name,
        timeZone: config.timeZone,
        notes: config.description,
      };

      if (config.endTime) {
        calendarEvent.endDate = dayjs(
          `${config.startDate} T${config.endTime}`,
          'YYYY-MM-DD HH:mm'
        )
          .add(
            !config.endTime ||
              config.startTime === config.endTime
              ? 1
              : 0,
            'hour'
          )
          .toISOString();
      }

      await createCalendarEvent(calendarEvent);
    },
    []
  );

  return (
    <OnboardingProviderMatchingSuccessPage
      colorScheme={colorScheme}
      provider={{
        title: 'Coach Simone',
        subtitle:
          'I have an interest in mindfulness-based practices, cognitive',
        avatar: {
          image:
            'https://storage.googleapis.com/vidahealth/user-images/a4e303e7-17a5-4c3c-9612-1f3d9030c585.jpeg',
        },
      }}
      providerDisplayName={'Coach Simon'}
      providerDescription={`Hi, I'm Coach Simone.  I have a background in nutrition and am certified in adult weight management. I am here to help you reach your weight management and wellness goals through an individualized, non-diet approach, with an emphasis on mindful eating principles.`}
      scheduledConsult={dayjs(dayjs().format('YYYY/MM/DD'))
        .hour(7)
        .toISOString()}
      showAddToCalendar={true}
      platformOS={Platform.OS}
      pageFooterProps={{
        sticky: true,
      }}
      calendarOptions={
        Platform.OS === 'ios'
          ? [
              {
                value: 'Apple',
                text: 'Apple',
              },
            ]
          : Platform.OS === 'android'
          ? [
              {
                value: 'Google',
                text: 'Google',
              },
            ]
          : undefined
      }
      onBack={() => router.back()}
      onCalendarClick={
        Platform.OS === 'ios' || Platform.OS === 'android'
          ? handleCalendarClick
          : undefined
      }
    />
  );
};

export default ProviderMatchingSuccessPage;
