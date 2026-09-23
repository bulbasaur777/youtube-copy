export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${minutes}:${pad(seconds)}`;
}

type TimeTranslations = {
  ago: string;
  time: {
    minutes: Record<string, string>;
    hours: Record<string, string>;
    days: Record<string, string>;
    months: Record<string, string>;
    years: Record<string, string>;
  };
};
export function formatTimeAgo(
  createdTime: Date,
  locale: string,
  translations: TimeTranslations,
): string {
  const now = new Date();
  const diffMs = now.getTime() - createdTime.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;

  const getUnit = (value: number, unit: Record<string, string>) => {
    const category = new Intl.PluralRules(locale).select(value);

    return unit[category] ?? unit.other;
  };

  if (diffMs < hour) {
    const value = Math.floor(diffMs / minute);

    return `${value} ${getUnit(value, translations.time.minutes)} ${translations.ago}`;
  }

  if (diffMs < day) {
    const value = Math.floor(diffMs / hour);

    return `${value} ${getUnit(value, translations.time.hours)} ${translations.ago}`;
  }

  if (diffMs < month) {
    const value = Math.floor(diffMs / day);

    return `${value} ${getUnit(value, translations.time.days)} ${translations.ago}`;
  }

  if (diffMs < year) {
    const value = Math.floor(diffMs / month);

    return `${value} ${getUnit(value, translations.time.months)} ${translations.ago}`;
  }

  const value = Math.floor(diffMs / year);

  return `${value} ${getUnit(value, translations.time.years)} ${translations.ago}`;
}

export function formatViews(
  views: number,
  locale: string,
  translations: Record<string, string>,
): string {
  const category = new Intl.PluralRules(locale).select(views);

  const unit = translations[category] ?? translations.other;

  return `${views} ${unit}`;
}
