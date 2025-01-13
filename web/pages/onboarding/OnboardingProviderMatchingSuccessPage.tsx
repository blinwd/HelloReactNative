'use dom';

import { Platform } from 'react-native';

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { atcb_action } from 'add-to-calendar-button';

import '@/global.css';
import designSystemTheme from '@/stylos/theme';
import type { OnboardingProviderMatchingSuccessPageProps } from '@/stylos/OnboardingProviderMatchingSuccessPage';
import StylosOnboardingProviderMatchingSuccessPage from '@/stylos/OnboardingProviderMatchingSuccessPage';
import { useCallback } from 'react';
import { generateAtcbConfig } from '@/stylos/OnboardingProviderMatchingSuccessPage/utils/generateAtcbConfig';

const OnboardingProviderMatchingSuccessPage: React.FC<
  OnboardingProviderMatchingSuccessPageProps & {
    colorScheme?: 'light' | 'dark';
    platformOS?: Platform['OS'];
    onCalendarClick?: (
      config: ReturnType<typeof generateAtcbConfig>,
      calendar?:
        | 'Apple'
        | 'Google'
        | 'iCal'
        | 'Microsoft365'
        | 'MicrosoftTeams'
        | 'Outlook.com'
        | 'Yahoo'
    ) => void;
    onContinue?: () => void;
    onBack?: () => void;
  }
> = ({
  colorScheme,
  platformOS = 'web',
  provider,
  providerDisplayName,
  providerDescription,
  scheduledConsult,
  showAddToCalendar,
  pageFooterProps,
  calendarOptions,
  onCalendarClick,
  onContinue,
  onBack,
}) => {
  const darkTheme = createTheme({
    ...designSystemTheme,
    palette: {
      mode: colorScheme === 'dark' ? 'dark' : 'light',
    },
  });

  const handleCalendarClick = useCallback(
    (
      calendar?:
        | 'Apple'
        | 'Google'
        | 'iCal'
        | 'Microsoft365'
        | 'MicrosoftTeams'
        | 'Outlook.com'
        | 'Yahoo'
    ) => {
      if (calendar) {
        const config = generateAtcbConfig({
          calendar,
          startDate: scheduledConsult,
          endDate: scheduledConsult,
          selectedCoachName: providerDisplayName || '',
        });

        if (onCalendarClick) {
          onCalendarClick(config, calendar);
        } else if (platformOS === 'web') {
          atcb_action(config);
        }
      }
    },
    [platformOS]
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StylosOnboardingProviderMatchingSuccessPage
        provider={provider}
        providerDisplayName={providerDisplayName}
        providerDescription={providerDescription}
        scheduledConsult={scheduledConsult}
        showAddToCalendar={showAddToCalendar}
        platformOS={platformOS}
        pageFooterProps={pageFooterProps}
        calendarOptions={calendarOptions}
        sx={{
          bgcolor: 'background.default',
        }}
        onCalendarClick={handleCalendarClick}
        onContinue={onContinue}
        onBack={onBack}
      />
    </ThemeProvider>
  );
};

export default OnboardingProviderMatchingSuccessPage;
