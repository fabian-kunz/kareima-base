export type SortOption =
  | "top"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface BaseFilterModel {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  sortBy: SortOption;
}
