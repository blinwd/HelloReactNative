import React, { useMemo } from 'react';
import { Platform } from 'react-native';

import { T, useT } from '@transifex/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import type { ProviderInfoStackProps } from '@/stylos/ProviderInfoStack';
import ProviderInfoStack from '@/stylos/ProviderInfoStack';
import type { PageProps } from '@/stylos/Page';
import Page from '@/stylos/Page';

import { AddToCalendarButton } from './components/AddToCalendarButton';
import type { AboutCoachProps } from './components/AboutCoach';
import { AboutCoach } from './components/AboutCoach';
import type { CalendarListItem } from './components/AddToCalendarMenu';
import { FirstConsult } from './components/FirstConsult';

export type OnboardingProviderMatchingSuccessPageProps =
  PageProps & {
    provider?: ProviderInfoStackProps;
    scheduledConsult?: string;
    consultDuration?: number;
    calendarOptions?: CalendarListItem[];
    showAddToCalendar?: boolean;
    platformOS?: Platform['OS'];
    onContinue?: () => void;
    onCalendarClick?: (
      calendar: CalendarListItem['value']
    ) => void;
  } & AboutCoachProps;

const OnboardingProviderMatchingSuccessPage: React.FC<
  OnboardingProviderMatchingSuccessPageProps
> = ({
  provider,
  scheduledConsult,
  consultDuration,
  providerDisplayName,
  providerDescription,
  providerDetails,
  calendarOptions,
  showAddToCalendar = false,
  platformOS = 'web',
  onContinue,
  onCalendarClick,
  ...restPageProps
}) => {
  const t = useT();

  const shouldRenderAddToCalendarBtn = useMemo(() => {
    if (
      !showAddToCalendar ||
      (Array.isArray(calendarOptions) &&
        calendarOptions.length === 0)
    ) {
      return false;
    }

    return true;
  }, [showAddToCalendar, calendarOptions]);

  return (
    <Page
      className="complete-page"
      pageTitle={t("Congrats! You're all set")}
      pageSubtitle={
        scheduledConsult
          ? t(
              'You and your health expert will create a care plan personalized to you and discuss your challenges.'
            )
          : t(
              "You'll create a care plan personalized to you and talk through your challenges."
            )
      }
      pageTitleTypographyProps={{
        sx: {
          textAlign: 'center',
        },
      }}
      pageSubtitleTypographyProps={{
        sx: {
          textAlign: 'center',
        },
      }}
      pageFooter={
        <Grid container spacing={2}>
          <Grid size={12}>
            <Button
              size="large"
              fullWidth
              onClick={onContinue}
            >
              <T _str="Continue" />
            </Button>
          </Grid>
          {shouldRenderAddToCalendarBtn && (
            <Grid size={12}>
              <AddToCalendarButton
                id="add-to-calendar-footer-button"
                calendarOptions={calendarOptions}
                onCalendarClick={onCalendarClick}
                enabled
              >
                <T _str="Add To Calendar" />
              </AddToCalendarButton>
            </Grid>
          )}
        </Grid>
      }
      pageFooterProps={{
        sticky: true,
      }}
      platformOS={platformOS}
      {...restPageProps}
    >
      <Grid container spacing={4}>
        {/* Coach details */}
        {provider && (
          <Grid size={12}>
            <ProviderInfoStack
              avatar={provider.avatar}
              title={provider.title}
              subtitle={provider.subtitle}
              showTooltip={false}
              compact={false}
            />
          </Grid>
        )}

        {/* First consult */}
        <Grid size={12}>
          <FirstConsult
            timeslot={scheduledConsult}
            duration={consultDuration}
            supportAddToCalendar={
              shouldRenderAddToCalendarBtn
            }
            calendarOptions={calendarOptions}
            onCalendarClick={onCalendarClick}
          />
        </Grid>

        {/* About the coach */}
        {providerDisplayName && (
          <Grid size={12}>
            <AboutCoach
              providerDisplayName={providerDisplayName}
              providerDescription={providerDescription}
              providerDetails={providerDetails}
            />
          </Grid>
        )}
      </Grid>
    </Page>
  );
};

export default OnboardingProviderMatchingSuccessPage;
