<template>
  <KContainer
    title="Projekt-Guide"
    subtitle="Verbindliche Leitlinien für Struktur, Komponenten und Erweiterungen im Kareima Base-Projekt"
  >
    <template #body>
      <div class="d-flex flex-column ga-4 view-body">
        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">1) Architekturprinzip</h2>
          <p class="kareima-section-subtitle mb-3">
            Views orchestrieren Datenfluss und Routing. UI-Details bleiben in
            wiederverwendbaren K-Komponenten. Fachlogik gehört in Stores und
            Utils, nicht in Präsentationskomponenten.
          </p>

          <v-list density="comfortable">
            <v-list-item
              title="Views: Daten laden, States halten, Events verdrahten"
            />
            <v-list-item
              title="K-Komponenten: Styling + konsistente Interaktion"
            />
            <v-list-item
              title="Stores: API-Aufrufe und domänenspezifische Regeln"
            />
            <v-list-item title="Utils: pure Mapping-/Formatierungsfunktionen" />
          </v-list>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">
            2) Pflichtbausteine je View
          </h2>
          <div class="d-flex flex-column ga-2">
            <div class="guide-row">
              <strong>Seitenlayout:</strong> KContainer mit
              `#header`/`#body`/`#footer`-Slots
            </div>
            <div class="guide-row">
              <strong>Header:</strong> KContainer Header-API
              (title/subtitle/header-actions/header-content)
            </div>
            <div class="guide-row">
              <strong>Tabellen:</strong> KTable statt direkter v-data-table
              Nutzung
            </div>
            <div class="guide-row">
              <strong>Feedback:</strong> KAlert/KSnackbar statt lokaler
              Sonderlösungen
            </div>
            <div class="guide-row">
              <strong>Bestätigung:</strong> KConfirmDialog für destruktive
              Aktionen
            </div>
          </div>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">
            3) Referenzstruktur für neue Module
          </h2>
          <pre class="module-tree">{{ moduleTree }}</pre>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">
            4) Beispielablauf für neue Features
          </h2>
          <ol class="pl-5">
            <li>Store anlegen oder erweitern und API-Daten kapseln.</li>
            <li>View mit KContainer und integrierter Header-API aufsetzen.</li>
            <li>
              Formfelder mit KTextField/KAutocomplete aufbauen und Filter über
              KFilterPanel-Slots strukturieren.
            </li>
            <li>
              Listenansicht mit KTable aufbauen (Sortierung/Actions definieren,
              bei Bedarf Auto-Höhe aktivieren).
            </li>
            <li>KConfirmDialog für Lösch-/Abbruchflüsse ergänzen.</li>
            <li>Typecheck und Demo-Seite aktualisieren.</li>
          </ol>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">
            5) Qualitätscheck vor Merge
          </h2>
          <v-list density="compact">
            <v-list-item
              title="K-Komponenten statt direkter Vuetify-Mischformen"
            />
            <v-list-item
              title="Keine EventBus-Sonderwege für Snackbar/Dialoge"
            />
            <v-list-item title="Responsive geprüft: Desktop + mdAndDown" />
            <v-list-item title="Typisierung sauber (vue-tsc ohne Fehler)" />
          </v-list>
        </v-card>
      </div>
    </template>
  </KContainer>
</template>

<script lang="ts" setup>
import KContainer from "@/components/base/KContainer.vue";

const moduleTree = `feature-module/
  components/
    ModuleToolbar.vue
    ModuleTable.vue
    ModuleDialog.vue
  composables/
    useModuleFilters.ts
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
.view-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}

.module-tree {
  background: #f7f9fb;
  border: 1px solid #d8dee4;
  border-radius: 12px;
  padding: 16px;
  margin: 0;
  font-family: Consolas, "Courier New", monospace;
  line-height: 1.5;
}

.guide-row {
  padding: 8px 10px;
  border: 1px solid #d8dee4;
  border-radius: 10px;
  background: #f9fbfd;
}
</style>
