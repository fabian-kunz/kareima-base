<template>
  <v-autocomplete
    class="mb-2"
    v-bind="$attrs"
    :model-value="modelValue"
    variant="solo-filled"
    bg-color="grey-lighten-4"
    flat
    density="comfortable"
    @update:model-value="onUpdate"
  >
    <template
      v-for="slotName in slotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";

defineProps<{
  modelValue: unknown;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: unknown): void;
}>();

const slots = useSlots();
const slotNames = computed(() => Object.keys(slots));

function onUpdate(value: unknown) {
  emit("update:modelValue", value);
}
</script>
