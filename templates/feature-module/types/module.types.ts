export interface ExampleItem {
  id: string;
  name: string;
  active: boolean;
}

export interface ExampleFilter {
  search: string;
  showInactive: boolean;
}
