<template>
  <v-number-input
    class="mb-2"
    v-bind="$attrs"
    :model-value="modelValue"
    variant="solo-filled"
    bg-color="grey-lighten-4"
    flat
    @update:model-value="onUpdate"
    density="comfortable"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: number | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

function onUpdate(value: number | null) {
  emit("update:modelValue", value);
}
</script>
