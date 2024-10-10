import { DateTime } from 'luxon';

export default function formatDateByLocale(date, locale = 'ru') {
  if (!date) return '-';

  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL, { locale });
}