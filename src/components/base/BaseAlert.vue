<template>
  <v-alert
    :title="title"
    :text="message"
    :type="type"
    :variant="variant"
    :closable="closable"
    class="mb-3"
  >
    <slot />
  </v-alert>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
    message: string;
    type?: "success" | "info" | "warning" | "error";
    variant?: "tonal" | "flat" | "outlined" | "text" | "elevated";
    closable?: boolean;
  }>(),
  {
    type: "info",
    variant: "tonal",
    closable: false,
  },
);
</script>
