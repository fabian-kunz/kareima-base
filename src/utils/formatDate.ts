export interface FormatDateOptions {
  locale?: string;
  dateStyle?: "full" | "long" | "medium" | "short";
}

export interface FormatDateTimeOptions extends FormatDateOptions {
  timeStyle?: "full" | "long" | "medium" | "short";
}

function dateFormatOptions(
  style: "full" | "long" | "medium" | "short",
): Intl.DateTimeFormatOptions {
  if (style === "full") {
    return {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
  }

  if (style === "long") {
    return {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
  }

  if (style === "short") {
    return {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  }

  return {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
}

function timeFormatOptions(
  style: "full" | "long" | "medium" | "short",
): Intl.DateTimeFormatOptions {
  if (style === "full") {
    return {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "long",
    };
  }

  if (style === "long") {
    return {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
  }

  if (style === "medium") {
    return {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  }

  return {
    hour: "2-digit",
    minute: "2-digit",
  };
}

function toValidDate(value: Date | string | number): Date | null {
  if (typeof value === "string") {
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]) - 1;
      const day = Number(dateOnlyMatch[3]);
      const localDate = new Date(year, month, day);
      return Number.isNaN(localDate.getTime()) ? null : localDate;
    }
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(
  value: Date | string | number | null | undefined,
  options: FormatDateOptions = {},
): string {
  if (value === null || value === undefined) return "-";

  const date = toValidDate(value);
  if (!date) return "-";

  const { locale = "de-DE", dateStyle = "medium" } = options;

  return new Intl.DateTimeFormat(locale, dateFormatOptions(dateStyle)).format(
    date,
  );
}

export function formatDateTime(
  value: Date | string | number | null | undefined,
  options: FormatDateTimeOptions = {},
): string {
  if (value === null || value === undefined) return "-";

  const date = toValidDate(value);
  if (!date) return "-";

  const {
    locale = "de-DE",
    dateStyle = "short",
    timeStyle = "short",
  } = options;

  return new Intl.DateTimeFormat(locale, {
    ...dateFormatOptions(dateStyle),
    ...timeFormatOptions(timeStyle),
  }).format(date);
}
