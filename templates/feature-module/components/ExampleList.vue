<template>
  <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{
    error
  }}</v-alert>

  <v-row v-if="loading" dense>
    <v-col v-for="i in 6" :key="i" cols="12" md="6" lg="4">
      <v-skeleton-loader type="article, actions" />
    </v-col>
  </v-row>

  <v-row v-else dense>
    <v-col v-for="item in items" :key="item.id" cols="12" md="6" lg="4">
      <v-card class="pa-4" variant="outlined">
        <div class="d-flex justify-space-between align-center">
          <span class="font-weight-medium">{{ item.name }}</span>
          <v-chip
            :color="item.active ? 'success' : 'default'"
            size="small"
            variant="tonal"
          >
            {{ item.active ? "Aktiv" : "Inaktiv" }}
          </v-chip>
        </div>
      </v-card>
    </v-col>

    <v-col v-if="!items.length" cols="12">
      <v-alert color="info" variant="tonal">Keine Einträge gefunden.</v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { ExampleItem } from "../types/module.types";

defineProps<{
  loading: boolean;
  error: string | null;
  items: ExampleItem[];
}>();
</script>
