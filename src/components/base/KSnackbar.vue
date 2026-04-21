<template>
  <v-snackbar
    :model-value="modelValue"
    :color="color"
    :timeout="timeout"
    location="bottom center"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="d-flex align-center justify-space-between ga-3">
      <span>{{ message }}</span>
      <slot name="actions" />
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: boolean;
    message: string;
    color?: "success" | "info" | "warning" | "error" | "primary";
    timeout?: number;
  }>(),
  {
    color: "success",
    timeout: 2500,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>
