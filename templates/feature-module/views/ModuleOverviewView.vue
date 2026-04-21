<template>
  <v-container fluid class="fill-height pa-0">
    <v-card class="fill-height w-100 d-flex flex-column">
      <v-card-title>
        <v-row class="align-center mb-2">
          <v-col>
            <h1 class="text-h4">Example Übersicht</h1>
          </v-col>
          <v-col cols="auto" class="d-flex ga-2">
            <v-btn
              prepend-icon="mdi-refresh"
              variant="tonal"
              @click="store.load"
              >Aktualisieren</v-btn
            >
            <v-btn prepend-icon="mdi-plus" variant="elevated">Neu</v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="flex-grow-1 overflow-y-auto">
        <ExampleToolbar
          :search="store.filter.search"
          :show-inactive="store.filter.showInactive"
          @update:search="store.filter.search = $event"
          @update:show-inactive="store.filter.showInactive = $event"
        />

        <ExampleList
          :loading="store.loading"
          :error="store.error"
          :items="store.filteredItems"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import ExampleList from "../components/ExampleList.vue";
import ExampleToolbar from "../components/ExampleToolbar.vue";
import { useExampleModuleStore } from "../stores/module.store";

const store = useExampleModuleStore();

onMounted(store.load);
</script>
