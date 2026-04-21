import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { fetchExampleItems } from "../services/module.service";
import type { ExampleFilter, ExampleItem } from "../types/module.types";

export const useExampleModuleStore = defineStore("exampleModule", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const items = ref<ExampleItem[]>([]);

  const filter = ref<ExampleFilter>({
    search: "",
    showInactive: false,
  });

  const filteredItems = computed(() => {
    const query = filter.value.search.trim().toLowerCase();

    return items.value.filter((item) => {
      if (!filter.value.showInactive && !item.active) {
        return false;
      }

      if (!query) {
        return true;
      }

      return item.name.toLowerCase().includes(query);
    });
  });

  async function load() {
    loading.value = true;
    error.value = null;

    try {
      items.value = await fetchExampleItems();
    } catch {
      error.value = "Daten konnten nicht geladen werden.";
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    items,
    filter,
    filteredItems,
    load,
  };
});
