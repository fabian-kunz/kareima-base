<template>
  <v-data-table
    :model-value="modelValue"
    :headers="headers"
    :items="items"
    :item-value="itemValue"
    :return-object="returnObject"
    :show-select="showSelect"
    :hide-default-footer="hideDefaultFooter"
    :items-per-page="itemsPerPage"
    :density="density"
    @update:model-value="onUpdate"
  >
    <template
      v-for="slotName in slotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";

const slots = useSlots();

withDefaults(
  defineProps<{
    modelValue: any[];
    headers: any[];
    items: any[];
    itemValue?: string;
    returnObject?: boolean;
    showSelect?: boolean;
    hideDefaultFooter?: boolean;
    itemsPerPage?: number;
    density?: "compact" | "comfortable" | "default";
  }>(),
  {
    itemValue: "id",
    returnObject: false,
    showSelect: true,
    hideDefaultFooter: true,
    itemsPerPage: -1,
    density: "comfortable",
  },
);

const slotNames = computed(() => Object.keys(slots));

const emit = defineEmits<{
  (e: "update:modelValue", value: any[]): void;
}>();

function onUpdate(value: any[] | undefined) {
  emit("update:modelValue", value ?? []);
}
</script>
