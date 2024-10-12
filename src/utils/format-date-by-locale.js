import { DateTime } from 'luxon';

export default function formatDateByLocale(date, locale = 'ru') {
  if (!date) return '-';

  // Преобразуем дату из ISO формата
  const dt = DateTime.fromISO(date).setLocale(locale);

  // Форматируем дату в нужный стиль
  return dt.toFormat("dd MMMM yyyy 'г.' 'в' HH:mm", { locale });
}