import type { ExampleItem } from "../types/module.types";

export async function fetchExampleItems(): Promise<ExampleItem[]> {
  // Replace with real API integration.
  return Promise.resolve([
    { id: "1", name: "Beispiel A", active: true },
    { id: "2", name: "Beispiel B", active: false },
  ]);
}
