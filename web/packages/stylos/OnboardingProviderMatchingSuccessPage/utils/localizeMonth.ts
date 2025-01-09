import { t } from '@transifex/native'
import type { Dayjs } from 'dayjs'

export const localizeMonth = (day: Dayjs, useShortName = true): string => {
  if (!day || !day.isValid()) {
    return ''
  }

  const lookup: Record<string, { short: string; long: string }> = {
    Jan: { short: t('Jan'), long: t('January') },
    Feb: { short: t('Feb'), long: t('February') },
    Mar: { short: t('Mar'), long: t('March') },
    Apr: { short: t('Apr'), long: t('April') },
    May: { short: t('May'), long: t('May') },
    Jun: { short: t('Jun'), long: t('June') },
    Jul: { short: t('Jul'), long: t('July') },
    Aug: { short: t('Aug'), long: t('August') },
    Sep: { short: t('Sep'), long: t('September') },
    Oct: { short: t('Oct'), long: t('October') },
    Nov: { short: t('Nov'), long: t('November') },
    Dec: { short: t('Dec'), long: t('December') },
  }

  const month = day.format('MMM')

  if (month in lookup) {
    return useShortName ? lookup[month].short : lookup[month].long
  }

  return month
}
