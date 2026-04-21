export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatPrice(
  value: number | null | undefined,
  options: FormatPriceOptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  const {
    currency = "EUR",
    locale = "de-DE",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatPriceRange(
  min: number | null | undefined,
  max: number | null | undefined,
  options: FormatPriceOptions = {},
): string {
  if (min == null && max == null) return "-";
  if (min != null && max != null) {
    return `${formatPrice(min, options)} - ${formatPrice(max, options)}`;
  }
  if (min != null) {
    return `ab ${formatPrice(min, options)}`;
  }
  return `bis ${formatPrice(max, options)}`;
}
