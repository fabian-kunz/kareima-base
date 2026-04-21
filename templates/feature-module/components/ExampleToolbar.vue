<template>
  <v-row align="center" class="mb-2">
    <v-col cols="12" md="8">
      <v-text-field
        :model-value="search"
        label="Suche"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        bg-color="grey-lighten-4"
        flat
        @update:model-value="emit('update:search', String($event ?? ''))"
      />
    </v-col>

    <v-col cols="12" md="4" class="d-flex justify-end">
      <v-switch
        :model-value="showInactive"
        inset
        hide-details
        density="comfortable"
        label="Inaktive anzeigen"
        color="primary"
        @update:model-value="emit('update:showInactive', Boolean($event))"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
defineProps<{
  search: string;
  showInactive: boolean;
}>();

const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:showInactive", value: boolean): void;
}>();
</script>
