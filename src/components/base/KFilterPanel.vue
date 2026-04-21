<template>
  <v-card class="pa-4 kareima-surface" elevation="0">
    <v-row align="center" dense>
      <v-col cols="12" md="4">
        <KAutocomplete
          :model-value="props.modelValue.categories"
          :items="categories"
          chips
          clearable
          multiple
          label="Kategorien"
          prepend-inner-icon="mdi-shape-outline"
          @update:model-value="updateCategories"
        />
      </v-col>

      <v-col cols="6" md="2">
        <KTextField
          :model-value="props.modelValue.priceMin"
          label="Preis min (EUR)"
          prepend-inner-icon="mdi-currency-eur"
          type="number"
          @update:model-value="updatePriceMin"
        />
      </v-col>

      <v-col cols="6" md="2">
        <KTextField
          :model-value="props.modelValue.priceMax"
          label="Preis max (EUR)"
          prepend-inner-icon="mdi-currency-eur"
          type="number"
          @update:model-value="updatePriceMax"
        />
      </v-col>

      <v-col cols="12" md="3">
        <KAutocomplete
          :model-value="props.modelValue.sortBy"
          :items="sortItems"
          label="Sortieren nach"
          prepend-inner-icon="mdi-sort"
          @update:model-value="updateSort"
        />
      </v-col>

      <v-col class="d-flex align-center" cols="12" md="1">
        <KActionButton intent="secondary" block @click="reset"
          >Reset</KActionButton
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import KActionButton from "@/components/base/KActionButton.vue";
import KAutocomplete from "@/components/base/KAutocomplete.vue";
import KTextField from "@/components/base/KTextField.vue";
import type { BaseFilterModel, SortOption } from "@/types/filters";

const props = defineProps<{
  modelValue: BaseFilterModel;
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: BaseFilterModel): void;
}>();

const sortItems: Array<{ title: string; value: SortOption }> = [
  { title: "Empfohlen", value: "top" },
  { title: "Preis aufsteigend", value: "price-asc" },
  { title: "Preis absteigend", value: "price-desc" },
  { title: "Name A bis Z", value: "name-asc" },
  { title: "Name Z bis A", value: "name-desc" },
];

function emitModel(next: Partial<BaseFilterModel>) {
  emit("update:modelValue", {
    categories: [...(next.categories ?? props.modelValue.categories)],
    priceMin:
      next.priceMin === undefined
        ? (props.modelValue.priceMin ?? null)
        : next.priceMin,
    priceMax:
      next.priceMax === undefined
        ? (props.modelValue.priceMax ?? null)
        : next.priceMax,
    sortBy: next.sortBy ?? props.modelValue.sortBy,
  });
}

function toNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function updateCategories(value: unknown) {
  emitModel({ categories: Array.isArray(value) ? (value as string[]) : [] });
}

function updatePriceMin(value: string | number | null | undefined) {
  emitModel({ priceMin: toNumber(value) ?? null });
}

function updatePriceMax(value: string | number | null | undefined) {
  emitModel({ priceMax: toNumber(value) ?? null });
}

function updateSort(value: unknown) {
  emitModel({ sortBy: (value as SortOption) ?? "top" });
}

function reset() {
  emit("update:modelValue", {
    categories: [],
    priceMin: null,
    priceMax: null,
    sortBy: "top",
  });
}
</script>
