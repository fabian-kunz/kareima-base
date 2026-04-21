<template>
  <v-card class="pa-4 kareima-surface" elevation="0">
    <v-row align="center" dense>
      <v-col cols="12" md="4">
        <BaseAutocomplete
          :model-value="local.categories"
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
        <BaseTextField
          :model-value="local.priceMin"
          label="Preis min (EUR)"
          prepend-inner-icon="mdi-currency-eur"
          type="number"
          @update:model-value="updatePriceMin"
        />
      </v-col>

      <v-col cols="6" md="2">
        <BaseTextField
          :model-value="local.priceMax"
          label="Preis max (EUR)"
          prepend-inner-icon="mdi-currency-eur"
          type="number"
          @update:model-value="updatePriceMax"
        />
      </v-col>

      <v-col cols="12" md="3">
        <BaseAutocomplete
          :model-value="local.sortBy"
          :items="sortItems"
          label="Sortieren nach"
          prepend-inner-icon="mdi-sort"
          @update:model-value="updateSort"
        />
      </v-col>

      <v-col class="d-flex align-center" cols="12" md="1">
        <BaseActionButton intent="secondary" block @click="reset"
          >Reset</BaseActionButton
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import BaseActionButton from "@/components/base/BaseActionButton.vue";
import BaseAutocomplete from "@/components/base/BaseAutocomplete.vue";
import BaseTextField from "@/components/base/BaseTextField.vue";
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

const local = reactive<BaseFilterModel>({
  categories: [...props.modelValue.categories],
  priceMin: props.modelValue.priceMin ?? null,
  priceMax: props.modelValue.priceMax ?? null,
  sortBy: props.modelValue.sortBy,
});

watch(
  () => props.modelValue,
  (next) => {
    local.categories = [...next.categories];
    local.priceMin = next.priceMin ?? null;
    local.priceMax = next.priceMax ?? null;
    local.sortBy = next.sortBy;
  },
  { deep: true },
);

watch(
  local,
  () => {
    emit("update:modelValue", {
      categories: [...local.categories],
      priceMin: local.priceMin,
      priceMax: local.priceMax,
      sortBy: local.sortBy,
    });
  },
  { deep: true },
);

function toNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function updateCategories(value: unknown) {
  local.categories = Array.isArray(value) ? (value as string[]) : [];
}

function updatePriceMin(value: string | number | null | undefined) {
  local.priceMin = toNumber(value) ?? null;
}

function updatePriceMax(value: string | number | null | undefined) {
  local.priceMax = toNumber(value) ?? null;
}

function updateSort(value: unknown) {
  local.sortBy = (value as SortOption) ?? "top";
}

function reset() {
  local.categories = [];
  local.priceMin = null;
  local.priceMax = null;
  local.sortBy = "top";
}
</script>
