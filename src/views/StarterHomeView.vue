<template>
  <KContainer
    title="Kareima Basisprojekt und Komponenten"
    subtitle="Gemeinsame Start- und Showcase-Seite für Basis-Komponenten und Einsatzregeln"
  >
    <template #header-actions>
      <KActionButton intent="primary">Primary</KActionButton>
      <KActionButton intent="secondary">Secondary</KActionButton>
    </template>

    <template #body>
      <div class="d-flex flex-column ga-4 view-body">
        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Buttons (Intent-Varianten)</h2>
          <div class="d-flex flex-wrap ga-2">
            <KActionButton intent="primary">Speichern</KActionButton>
            <KActionButton intent="secondary">Aktualisieren</KActionButton>
            <KActionButton intent="ghost">Abbrechen</KActionButton>
            <KActionButton intent="danger">Löschen</KActionButton>
          </div>

          <div class="d-flex flex-wrap ga-2 mt-4">
            <KActionButton intent="primary" @click="showSnack('success')"
              >Snackbar Erfolg</KActionButton
            >
            <KActionButton intent="warning" @click="showSnack('warning')"
              >Snackbar Warnung</KActionButton
            >
            <KActionButton intent="danger" @click="showSnack('error')"
              >Snackbar Fehler</KActionButton
            >
          </div>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Form Controls</h2>
          <v-row>
            <v-col cols="12" md="6">
              <KTextField
                v-model="demoName"
                label="Name"
                prepend-inner-icon="mdi-tag-outline"
              />
            </v-col>
            <v-col cols="12" md="6">
              <KTextField
                v-model="demoPrice"
                label="Preis"
                type="number"
                prepend-inner-icon="mdi-currency-eur"
              />
            </v-col>
            <v-col cols="12" md="6">
              <KTextField
                :model-value="demoReadonlyPrice"
                label="UVP Maschine (readonly Beispiel)"
                prepend-inner-icon="mdi-cash"
                append-inner-icon="mdi-pencil-off-outline"
                readonly
              />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Filter</h2>
          <KFilterPanel class="mb-4" @reset="resetFilters">
            <v-col cols="12" md="4">
              <KAutocomplete
                v-model="filters.categories"
                :items="categories"
                chips
                clearable
                multiple
                label="Kategorien"
                prepend-inner-icon="mdi-shape-outline"
              />
            </v-col>

            <v-col cols="6" md="2">
              <KTextField
                v-model="filters.priceMin"
                label="Preis min"
                type="number"
                prepend-inner-icon="mdi-currency-eur"
              />
            </v-col>

            <v-col cols="6" md="2">
              <KTextField
                v-model="filters.priceMax"
                label="Preis max"
                type="number"
                prepend-inner-icon="mdi-currency-eur"
              />
            </v-col>

            <v-col cols="12" md="3">
              <KAutocomplete
                v-model="filters.sortBy"
                :items="sortItems"
                label="Sortierung"
                prepend-inner-icon="mdi-sort"
              />
            </v-col>
          </KFilterPanel>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <v-row class="align-center mb-2">
            <v-col cols="12" md="6">
              <h2 class="kareima-section-title">Tabelle</h2>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end">
              <div class="d-flex align-center ga-4">
                <v-btn-toggle
                  v-model="tableActionMode"
                  density="comfortable"
                  color="primary"
                  mandatory
                >
                  <v-btn value="actions">Actions</v-btn>
                  <v-btn value="menu">Menu</v-btn>
                </v-btn-toggle>

                <v-switch
                  v-model="isCompactDensity"
                  hide-details
                  inset
                  color="primary"
                  :label="
                    isCompactDensity ? 'Dichte: Kompakt' : 'Dichte: Normal'
                  "
                />
              </div>
            </v-col>
          </v-row>
          <KTable
            :density="tableDensity"
            :action-mode="tableActionMode"
            :headers="tableHeaders"
            :items="tableItems"
            :row-actions="tableRowActions"
            empty-text="Keine Maschinen vorhanden."
            @action="handleTableAction"
          />
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Alerts</h2>
          <KAlert
            type="info"
            message="Dies ist ein Info-Hinweis für den Benutzer."
          />
          <KAlert
            type="warning"
            message="Bitte überprüfe Pflichtfelder vor dem Speichern."
          />
          <KAlert
            type="error"
            message="Ein Eintrag konnte nicht geladen werden."
          />
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title">Beispiel-Daten</h2>
          <p class="kareima-section-subtitle mb-4">
            Diese Fläche zeigt, wie Listen oder Tabellen auf Basis der Filter
            eingebettet werden.
          </p>

          <v-chip-group column>
            <v-chip
              v-for="item in renderedFilterSummary"
              :key="item"
              color="primary"
              variant="tonal"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>

          <div class="d-flex ga-2 mt-6">
            <KActionButton intent="secondary" @click="dialog = true"
              >Dialog öffnen</KActionButton
            >
          </div>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-3">Weitere Showcase-Views</h2>
          <p class="kareima-section-subtitle mb-4">
            Die Demo ist jetzt in mehrere Seiten aufgeteilt, damit jede
            Komponente in einem klaren Kontext gezeigt wird.
          </p>

          <div class="d-flex flex-wrap ga-2">
            <KActionButton intent="ghost" @click="goTo('/inputs-showcase')">
              Input-Showcase
            </KActionButton>
            <KActionButton intent="primary" @click="goTo('/table-showcase')"
              >Tabellen-Showcase</KActionButton
            >
            <KActionButton
              intent="secondary"
              @click="goTo('/interaction-demo')"
            >
              Interaktions-Demo
            </KActionButton>
            <KActionButton intent="secondary" @click="goTo('/guide')">
              Projekt-Guide
            </KActionButton>
          </div>
        </v-card>

        <KConfirmDialog
          v-model="dialog"
          title="Aktion bestätigen"
          message="Dies ist der zentrale Showcase-Dialog für kritische Aktionen."
          confirm-label="Verstanden"
          @cancel="dialog = false"
          @confirm="dialog = false"
        />

        <KSnackbar
          v-model="snackbarVisible"
          :color="snackbarColor"
          :message="snackbarMessage"
        />
      </div>
    </template>
  </KContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import KActionButton from "@/components/base/KActionButton.vue";
import KAlert from "@/components/base/KAlert.vue";
import KAutocomplete from "@/components/base/KAutocomplete.vue";
import KContainer from "@/components/base/KContainer.vue";
import KConfirmDialog from "@/components/base/KConfirmDialog.vue";
import KFilterPanel from "@/components/base/KFilterPanel.vue";
import KSnackbar from "@/components/base/KSnackbar.vue";
import KTable from "@/components/base/KTable.vue";
import KTextField from "@/components/base/KTextField.vue";
import type { BaseFilterModel } from "@/types/filters";
import type { KTableAction, KTableHeader } from "@/components/base/KTable.vue";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

const categories = ["Maschinen", "Angebote", "Akkus", "Services"];
const router = useRouter();
const dialog = ref(false);
const demoName = ref<string | number | null>("");
const demoPrice = ref<string | number | null>(null);
const demoReadonlyPrice = computed(() => formatPrice(12900));
const snackbarVisible = ref(false);
const snackbarColor = ref<"success" | "warning" | "error">("success");
const snackbarMessage = ref("Erfolgreich gespeichert.");
const isCompactDensity = ref(false);
const tableDensity = computed<"compact" | "normal">(() =>
  isCompactDensity.value ? "compact" : "normal",
);
const tableActionMode = ref<"actions" | "menu">("menu");

const tableHeaders: KTableHeader[] = [
  { key: "name", title: "Name", sortable: true },
  {
    key: "kategorie",
    title: "Kategorie",
    align: "center",
    renderAs: "chip",
    sortable: true,
    chipColorMap: {
      Maschinen: "primary",
      Angebote: "info",
      Akkus: "warning",
      Services: "secondary",
    },
  },
  {
    key: "preis",
    title: "Preis",
    align: "end",
    sortable: true,
    formatter: (value) => formatPrice(Number(value)),
  },
  {
    key: "lieferdatum",
    title: "Lieferdatum",
    align: "end",
    sortable: true,
    formatter: (value) => formatDate(String(value), { dateStyle: "short" }),
    sortAccessor: (value) => Date.parse(String(value)),
  },
  {
    key: "aktualisiertAm",
    title: "Aktualisiert am",
    align: "end",
    sortable: true,
    formatter: (value) =>
      formatDateTime(String(value), {
        dateStyle: "short",
        timeStyle: "short",
      }),
    sortAccessor: (value) => Date.parse(String(value)),
  },
  {
    key: "status",
    title: "Status",
    align: "end",
    renderAs: "chip",
    sortable: true,
    formatter: (value, item) =>
      (item as { aktiv?: boolean }).aktiv ? "Aktiv" : "Inaktiv",
    sortAccessor: (_value, item) =>
      (item as { aktiv?: boolean }).aktiv ? 1 : 0,
    chipColorMap: {
      Aktiv: "success",
      Inaktiv: "error",
    },
  },
];

const tableRawItems = ref([
  {
    id: 1,
    name: "Hydraulikpresse X1",
    kategorie: "Maschinen",
    preis: 12900,
    lieferdatum: "2026-06-10",
    aktualisiertAm: "2026-04-21T08:15:00",
    aktiv: true,
  },
  {
    id: 2,
    name: "Angebot Frühjahr",
    kategorie: "Angebote",
    preis: 3500,
    lieferdatum: "2026-05-03",
    aktualisiertAm: "2026-04-20T14:45:00",
    aktiv: true,
  },
  {
    id: 3,
    name: "Akku Pack 24V",
    kategorie: "Akkus",
    preis: 890,
    lieferdatum: "2026-04-28",
    aktualisiertAm: "2026-04-19T11:05:00",
    aktiv: false,
  },
]);

const tableRowActions: KTableAction[] = [
  { key: "edit", label: "Bearbeiten", icon: "mdi-pencil", color: "primary" },
  {
    key: "copy",
    label: "Duplizieren",
    icon: "mdi-content-copy",
    color: "info",
  },
  { key: "delete", label: "Löschen", icon: "mdi-delete", color: "error" },
];

const tableItems = computed(() =>
  tableRawItems.value.map((item) => ({
    ...item,
    status: item.aktiv ? "Aktiv" : "Inaktiv",
  })),
);

const filters = ref<BaseFilterModel>({
  categories: [],
  priceMin: null,
  priceMax: null,
  sortBy: "top",
});

const sortItems = [
  { title: "Empfohlen", value: "top" },
  { title: "Preis aufsteigend", value: "price-asc" },
  { title: "Preis absteigend", value: "price-desc" },
  { title: "Name A bis Z", value: "name-asc" },
  { title: "Name Z bis A", value: "name-desc" },
] as const;

const renderedFilterSummary = computed(() => {
  const output: string[] = [];

  output.push(`Sortierung: ${filters.value.sortBy}`);
  output.push(
    `Kategorien: ${filters.value.categories.length > 0 ? filters.value.categories.join(", ") : "alle"}`,
  );

  if (filters.value.priceMin !== null) {
    output.push(`Preis min: ${filters.value.priceMin} EUR`);
  }

  if (filters.value.priceMax !== null) {
    output.push(`Preis max: ${filters.value.priceMax} EUR`);
  }

  return output;
});

function showSnack(type: "success" | "warning" | "error") {
  snackbarColor.value = type;
  snackbarMessage.value =
    type === "success"
      ? "Aktion wurde erfolgreich ausgeführt."
      : type === "warning"
        ? "Bitte Eingaben noch einmal prüfen."
        : "Die Aktion ist fehlgeschlagen.";
  snackbarVisible.value = true;
}

function handleTableAction(payload: { actionKey: string; item: object }) {
  const itemRecord = payload.item as Record<string, unknown>;
  const itemName = String(itemRecord.name ?? "Eintrag");

  if (payload.actionKey === "delete") {
    snackbarColor.value = "error";
    snackbarMessage.value = `${itemName} wird gelöscht.`;
  } else if (payload.actionKey === "copy") {
    snackbarColor.value = "warning";
    snackbarMessage.value = `${itemName} wurde dupliziert.`;
  } else {
    snackbarColor.value = "success";
    snackbarMessage.value = `${itemName} wird bearbeitet.`;
  }

  snackbarVisible.value = true;
}

function goTo(path: string) {
  router.push(path);
}

function resetFilters() {
  filters.value = {
    categories: [],
    priceMin: null,
    priceMax: null,
    sortBy: "top",
  };
}
</script>

<style scoped>
.view-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
</style>
