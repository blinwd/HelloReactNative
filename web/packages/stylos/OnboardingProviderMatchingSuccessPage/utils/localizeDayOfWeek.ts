import { t } from '@transifex/native';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const localizeDayOfWeek = (
  day: Dayjs,
  useShortName?: boolean
): string => {
  if (!day || !day.isValid()) {
    return '';
  }

  if (day.isSame(dayjs(), 'day')) {
    return t('Today');
  }

  if (day.isSame(dayjs().add(1, 'day'), 'day')) {
    return t('Tomorrow');
  }

  const lookup: Record<
    string,
    { short: string; long: string }
  > = {
    Sunday: { short: t('Sun'), long: t('Sunday') },
    Monday: { short: t('Mon'), long: t('Monday') },
    Tuesday: { short: t('Tue'), long: t('Tuesday') },
    Wednesday: { short: t('Wed'), long: t('Wednesday') },
    Thursday: { short: t('Thu'), long: t('Thursday') },
    Friday: { short: t('Fri'), long: t('Friday') },
    Saturday: { short: t('Sat'), long: t('Saturday') },
  };

  const dayOfWeek = day.format('dddd');

  if (dayOfWeek in lookup) {
    return useShortName
      ? lookup[dayOfWeek].short
      : lookup[dayOfWeek].long;
  }

  return dayOfWeek;
};
