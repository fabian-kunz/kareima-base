<template>
  <v-card class="pa-4 mb-4 kareima-surface" elevation="0">
    <div class="d-flex flex-wrap align-center justify-space-between ga-3">
      <div>
        <h1 class="kareima-section-title">{{ title }}</h1>
        <p v-if="subtitle" class="kareima-section-subtitle">{{ subtitle }}</p>
      </div>
      <div class="d-flex ga-2 align-center">
        <slot name="actions" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
