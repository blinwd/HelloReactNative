import { t } from '@transifex/native';
import dayjs from 'dayjs';

import { appendToUrl } from './url';
import { uuidFromUrn } from './urn';

type GenerateAtcbConfigParams = {
  calendar:
    | 'Apple'
    | 'Google'
    | 'iCal'
    | 'Microsoft365'
    | 'MicrosoftTeams'
    | 'Outlook.com'
    | 'Yahoo';
  startDate?: string;
  endDate?: string;
  scheduledConsultUrn?: string;
  selectedCoachName: string;
  timeZone?: string;
};

// Return add-to-calendar-button config
// https://add-to-calendar-button.com/configuration
export const generateAtcbConfig = ({
  calendar,
  startDate,
  endDate,
  selectedCoachName,
  scheduledConsultUrn,
  timeZone,
}: GenerateAtcbConfigParams) => {
  const joinRoomLink = scheduledConsultUrn
    ? appendToUrl(`https://get.vida.co/join-room`, {
        uuid: uuidFromUrn(scheduledConsultUrn),
      })
    : undefined;

  const description =
    calendar === 'Apple'
      ? [
          joinRoomLink || '',
          '',

          t(
            'Join Vida for a live video session with {selectedCoachName}',
            {
              selectedCoachName: selectedCoachName || '',
            }
          ),
          '',

          `${t("What you'll experience")}:`,
          `- ${t(
            'Review your health history and "Medical Visit Check-In" survey'
          )}`,
          `- ${t(
            'Discuss your medicines, symptoms, and daily habits'
          )}`,
          `- ${t(
            'Create a personalized daily condition care routine'
          )}`,
          `- ${t('Set achievable health goals')}`,
          '',

          `${t('How to prepare')}: `,
          `- ${t(
            'Find a quiet, private space for your call'
          )}`,
          `- ${t(
            'Have your current medications and supplements list ready'
          )}`,
          `- ${t(
            'Prepare any health-related questions you want to ask'
          )}`,
          `- ${t(
            'Ensure you have a stable internet connection'
          )}`,
          `- ${t(
            'Open the Vida app 5 minutes before your scheduled time'
          )}`,
          '',

          `${t('What to expect')}: `,
          `- ${t('A warm, judgment-free conversation')}`,
          `- ${t(
            'Personalized strategies to manage your health'
          )}`,
          `- ${t(
            'Collaborative planning for your wellness journey'
          )}`,
          `- ${t(
            'Opportunity to schedule follow-up sessions'
          )}`,
          '',

          `${t('Remember')}: `,
          `- ${t(
            'You can check in up to 24 hours before your session'
          )}`,
          `- ${t(
            'Calls may be recorded to improve your Vida experience (based on your privacy settings)'
          )}`,
          `- ${t(
            'If you need to cancel or reschedule, please do so at least 24 hours in advance'
          )}`,
        ]
          .map((str) => `${str} [br]`)
          .join('')
      : [
          joinRoomLink
            ? `[url]${joinRoomLink}|${joinRoomLink}[/url] [br][br]`
            : undefined,

          t(
            'Join Vida for a live video session with {selectedCoachName}',
            {
              selectedCoachName: selectedCoachName || '',
            }
          ),
          `[br][br]`,

          `[strong]${t(
            "What you'll experience"
          )}:[/strong] [br]`,
          `[ul]`,
          `[li]${t(
            'Review your health history and "Medical Visit Check-In" survey'
          )}[/li]`,
          `[li]${t(
            'Discuss your medicines, symptoms, and daily habits'
          )}[/li]`,
          `[li]${t(
            'Create a personalized daily condition care routine'
          )}[/li]`,
          `[li]${t('Set achievable health goals')}[/li]`,
          `[/ul]`,

          `[strong]${t('How to prepare')}:[/strong] [br]`,
          `[ul]`,
          `[li]${t(
            'Find a quiet, private space for your call'
          )}[/li]`,
          `[li]${t(
            'Have your current medications and supplements list ready'
          )}[/li]`,
          `[li]${t(
            'Prepare any health-related questions you want to ask'
          )}[/li]`,
          `[li]${t(
            'Ensure you have a stable internet connection'
          )}[/li]`,
          `[li]${t(
            'Open the Vida app 5 minutes before your scheduled time'
          )}[/li]`,
          `[/ul]`,

          `[strong]${t('What to expect')}:[/strong] [br]`,
          `[ul]`,
          `[li]${t(
            'A warm, judgment-free conversation'
          )}[/li]`,
          `[li]${t(
            'Personalized strategies to manage your health'
          )}[/li]`,
          `[li]${t(
            'Collaborative planning for your wellness journey'
          )}[/li]`,
          `[li]${t(
            'Opportunity to schedule follow-up sessions'
          )}[/li]`,
          `[/ul]`,

          `[strong]${t('Remember')}:[/strong] [br]`,
          `[ul]`,
          `[li]${t(
            'You can check in up to 24 hours before your session'
          )}[/li]`,
          `[li]${t(
            'Calls may be recorded to improve your Vida experience (based on your privacy settings)'
          )}[/li]`,
          `[li]${t(
            'If you need to cancel or reschedule, please do so at least 24 hours in advance'
          )}[/li]`,
          `[/ul]`,
        ].join('');

  return {
    // title of the event (required)
    name: t(
      `Vida Personalized Health Session with {selectedCoachName}`,
      {
        selectedCoachName,
      }
    ),

    // A date needs to be formatted as YYYY-MM-DD (required)
    startDate: startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : undefined,
    startTime: startDate
      ? dayjs(startDate).format('HH:mm')
      : undefined,
    endTime: endDate
      ? dayjs(endDate).format('HH:mm')
      : undefined,

    location: joinRoomLink,

    timeZone: timeZone || 'America/Los_Angeles',

    description,

    options: [calendar],
  };
};
