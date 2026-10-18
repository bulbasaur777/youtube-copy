import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

const translations = { ru, ua, en } as const;

const compactViewUnits: Record<
  Lang,
  { thousand: string; million: string; billion: string; trillion: string }
> = {
  ru: { thousand: "тыс.", million: "млн", billion: "млрд", trillion: "трлн" },
  ua: { thousand: "тис.", million: "млн", billion: "млрд", trillion: "трлн" },
  en: { thousand: "K", million: "M", billion: "B", trillion: "T" },
};

export function formatViewCount(views: number, language: Lang): string {
  const units = compactViewUnits[language];
  const thresholds = [
    { value: 1_000_000_000_000, suffix: units.trillion },
    { value: 1_000_000_000, suffix: units.billion },
    { value: 1_000_000, suffix: units.million },
    { value: 1_000, suffix: units.thousand },
  ];
  const unitIndex = thresholds.findIndex(({ value }) => views >= value);
  const unit = thresholds[unitIndex];

  if (!unit) {
    return new Intl.NumberFormat(language).format(views);
  }

  const compactValue = views / unit.value;
  const maximumFractionDigits =
    unit.value === 1_000 && compactValue >= 10 ? 0 : 1;
  const roundedValue = Number(compactValue.toFixed(maximumFractionDigits));
  const higherUnit = thresholds[unitIndex - 1];

  if (roundedValue >= 1000 && higherUnit) {
    return `${new Intl.NumberFormat(language, {
      maximumFractionDigits: 1,
    }).format(views / higherUnit.value)} ${higherUnit.suffix}`;
  }

  return `${new Intl.NumberFormat(language, { maximumFractionDigits }).format(
    compactValue,
  )} ${unit.suffix}`;
}

export function formatCompactTimeAgo(
  createdTime: Date,
  language: Lang,
): string {
  const diffMs = Date.now() - createdTime.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 12 * month;

  let value: number;
  let unit: keyof (typeof translations)[Lang]["Time and Views"]["time"]["compact"];

  if (diffMs < hour) {
    value = Math.floor(diffMs / minute);
    unit = "minute";
  } else if (diffMs < day) {
    value = Math.floor(diffMs / hour);
    unit = "hour";
  } else if (diffMs < week) {
    value = Math.floor(diffMs / day);
    unit = "day";
  } else if (diffMs < month) {
    value = Math.floor(diffMs / week);
    unit = "week";
  } else if (diffMs < year) {
    value = Math.floor(diffMs / month);
    unit = "month";
  } else {
    value = Math.floor(diffMs / year);
    unit = "year";
  }

  const ago = translations[language]["Time and Views"].ago;
  const compactUnit =
    translations[language]["Time and Views"].time.compact[unit];
  return `${new Intl.NumberFormat(language).format(value)} ${compactUnit} ${ago}`;
}
