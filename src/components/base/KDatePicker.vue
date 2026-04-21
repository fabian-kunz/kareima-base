<template>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    location="bottom start"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        v-bind="{ ...$attrs, ...activatorProps }"
        :model-value="displayValue"
        :label="label"
        :rules="rules"
        prepend-inner-icon="mdi-calendar-month-outline"
        append-inner-icon="mdi-menu-down"
        variant="solo-filled"
        bg-color="grey-lighten-4"
        flat
        readonly
        clearable
        @click="menuOpen = true"
        @click:clear="onClear"
      />
    </template>

    <v-date-picker
      :model-value="internalValue"
      color="primary"
      show-adjacent-months
      @update:model-value="onDatePick"
    />
  </v-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { formatDate } from "@/utils/baseFormatDate";

type Rule = (value: unknown) => true | string;

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue: string | null | undefined;
    label?: string;
    rules?: Rule[];
  }>(),
  {
    label: "Datum",
    rules: () => [],
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null | undefined): void;
}>();

const menuOpen = ref(false);

const internalValue = computed(() => props.modelValue ?? null);

const displayValue = computed(() => {
  if (!props.modelValue) return "";
  return formatDate(props.modelValue, { dateStyle: "short" });
});

function toLocalDateString(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeDate(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  if (value instanceof Date) {
    return toLocalDateString(value);
  }

  if (Array.isArray(value) && value.length > 0) {
    const first = value[0];
    if (typeof first === "string") return first;
    if (first instanceof Date) return toLocalDateString(first);
  }

  return null;
}

function onDatePick(value: unknown) {
  const normalized = normalizeDate(value);
  emit("update:modelValue", normalized);
  if (normalized) {
    menuOpen.value = false;
  }
}

function onClear() {
  emit("update:modelValue", null);
}
</script>
