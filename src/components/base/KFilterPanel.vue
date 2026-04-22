<template>
  <v-card class="pa-4 kareima-surface" elevation="0">
    <v-row align="center" dense>
      <slot />

      <v-col class="d-flex align-center justify-end" cols="12" md="auto">
        <KActionButton intent="secondary" block @click="emit('reset')">
          Reset
        </KActionButton>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import KActionButton from "@/components/base/KActionButton.vue";

const emit = defineEmits<{
  (e: "reset"): void;
}>();
</script>
