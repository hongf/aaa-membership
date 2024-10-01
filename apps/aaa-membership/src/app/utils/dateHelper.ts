import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const displayDateFormat = 'DD MMM YYYY';

const auDateFormat = 'DD/MM/YYYY';
const auDateTimeFormat = 'DD/MM/YYYY hh:mm A';
const auDateTimeFormatWithWeekday = 'ddd DD/MM/YYYY hh:mm A';

const auUTCDateForm = 'YYYY/MM/DD HH:mm:ss [UTC]Z'; // eg +10

export const utcDateFormat = (
  formatStr: string,
  dateStr?: string | Date
): string =>
  dateStr ? dayjs.utc(dateStr).tz(dayjs.tz.guess()).format(formatStr) : '';

export const utcDateToauUTcTimezone = (date: string | Date): string =>
  utcDateFormat(auUTCDateForm, date);

export const utcDateToDateForDisplay = (dateStr?: string | Date): string =>
  utcDateFormat(displayDateFormat, dateStr);

export const utcDateToAuDateTime = (dateStr?: string | Date): string =>
  utcDateFormat(auDateTimeFormat, dateStr);

export const utcDateToAuDate = (dateStr?: string | Date): string =>
  utcDateFormat(auDateFormat, dateStr);

export const utcDateToAuDateTimeWithWeekday = (
  dateStr?: string | Date
): string => utcDateFormat(auDateTimeFormatWithWeekday, dateStr);
export const utcDateToAuDateWithWeekday = (dateStr?: string | Date): string =>
  utcDateFormat(auDateTimeFormatWithWeekday, dateStr);

export const utcDateToDateWithFormat = (
  dateStr: string | Date,
  format: string
): string => utcDateFormat(format, dateStr);

/*get a random date by range provided */
export const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const isExpireDateRequireRenewal = (
  expiryDate?: string,
  currentDate?: Date
): boolean => {
  if (!expiryDate) return false;

  return (
    dayjs(expiryDate).diff(dayjs(currentDate) || dayjs(new Date()), 'day') <= 90
  );
};
