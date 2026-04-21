<template>
  <v-text-field
    class="mb-2"
    v-bind="$attrs"
    :model-value="modelValue"
    flat
    variant="solo-filled"
    bg-color="grey-lighten-4"
    @update:model-value="onUpdate"
  >
    <template
      v-for="slotName in slotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";

const slots = useSlots();
const slotNames = computed(() => Object.keys(slots));

const props = defineProps<{
  modelValue: string | number | null | undefined;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null | undefined): void;
}>();

function onUpdate(value: string | number | null | undefined) {
  emit("update:modelValue", value);
}
</script>
