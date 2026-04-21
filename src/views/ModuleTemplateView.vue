<template>
  <div class="d-flex flex-column ga-4">
    <BasePageHeader
      title="Feature Modul-Template"
      subtitle="Standardstruktur für neue Domänenmodule im Kareima-Projekt"
    />

    <v-card class="pa-4 kareima-surface" elevation="0">
      <h2 class="kareima-section-title mb-3">Empfohlene Modulstruktur</h2>
      <pre class="module-tree">{{ moduleTree }}</pre>
    </v-card>

    <v-card class="pa-4 kareima-surface" elevation="0">
      <h2 class="kareima-section-title mb-3">Vorgehen</h2>
      <ol class="pl-5">
        <li>Ordner aus templates/feature-module kopieren.</li>
        <li>Bezeichner von "Example" auf die Domäne ändern.</li>
        <li>Route in src/router/index.ts eintragen.</li>
        <li>Service-Endpunkte in module.service.ts anbinden.</li>
        <li>Store- und View-Logik mit echten Daten verbinden.</li>
      </ol>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BasePageHeader from "@/components/base/BasePageHeader.vue";

const moduleTree = `feature-module/
  components/
    ExampleList.vue
    ExampleToolbar.vue
  services/
    module.service.ts
  stores/
    module.store.ts
  types/
    module.types.ts
  views/
    ModuleOverviewView.vue`;
</script>

<style scoped>
.module-tree {
  background: #f7f9fb;
  border: 1px solid #d8dee4;
  border-radius: 12px;
  padding: 16px;
  margin: 0;
  font-family: Consolas, "Courier New", monospace;
  line-height: 1.5;
}
</style>
