<template>
  <v-textarea
    class="mb-2"
    v-bind="$attrs"
    :model-value="modelValue"
    auto-grow
    variant="solo-filled"
    bg-color="grey-lighten-4"
    flat
    @update:model-value="onUpdate"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | null | undefined;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null | undefined): void;
}>();

function onUpdate(value: string | null | undefined) {
  emit("update:modelValue", value);
}
</script>
