<template>
  <v-dialog
    :model-value="modelValue"
    max-width="520"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="pa-3">
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="justify-space-between ga-2">
        <BaseActionButton intent="ghost" @click="emit('cancel')"
          >Abbrechen</BaseActionButton
        >
        <BaseActionButton :intent="confirmIntent" @click="emit('confirm')">
          {{ confirmLabel }}
        </BaseActionButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import BaseActionButton from "@/components/base/BaseActionButton.vue";

withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    confirmIntent?: "primary" | "secondary" | "danger" | "ghost";
  }>(),
  {
    confirmLabel: "Bestätigen",
    confirmIntent: "primary",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>
