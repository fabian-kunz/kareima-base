<template>
  <KContainer
    title="Tabellen-Showcase"
    subtitle="Sortierung, Aktionen, Zeilenklick, expandierte Detailzeilen und optionale Auto-Höhe mit KTable"
  >
    <template #header-actions>
      <KActionButton intent="secondary" @click="toggleDensity">
        {{ compactDensity ? "Dichte: Kompakt" : "Dichte: Normal" }}
      </KActionButton>
      <KActionButton intent="ghost" @click="toggleActionMode">
        {{ actionMode === "actions" ? "Aktionen: Buttons" : "Aktionen: Menü" }}
      </KActionButton>
    </template>

    <template #body>
      <div class="d-flex flex-column ga-4 view-body">
        <KAlert
          type="info"
          message="Klicke auf eine Zeile, nutze Aktionen oder öffne Detailzeilen über den Button ganz rechts. Die Tabellenhöhe wird hier optional über KTable selbst berechnet."
        />

        <KTable
          :headers="headers"
          :items="items"
          :auto-height-offset="{ mobile: 360, desktop: 600 }"
          :density="compactDensity ? 'compact' : 'normal'"
          :action-mode="actionMode"
          :row-actions="resolveRowActions"
          :clickable-rows="true"
          :row-class="resolveRowClass"
          :expandable-rows="true"
          :can-expand-row="canExpandRow"
          expand-column-position="end"
          expand-label="Historie"
          collapse-label="Schließen"
          empty-text="Keine Einträge vorhanden."
          @action="onAction"
          @row-click="onRowClick"
        >
          <template #expanded-row="{ item }">
            <div class="pa-4 bg-grey-lighten-5">
              <h3 class="text-subtitle-2 mb-2">Statusverlauf</h3>
              <KTable
                :headers="historyHeaders"
                :items="historyFor(item)"
                density="compact"
                empty-text="Keine Historie vorhanden."
              />
            </div>
          </template>
        </KTable>

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
import { ref } from "vue";
import KActionButton from "@/components/base/KActionButton.vue";
import KAlert from "@/components/base/KAlert.vue";
import KContainer from "@/components/base/KContainer.vue";
import KSnackbar from "@/components/base/KSnackbar.vue";
import KTable from "@/components/base/KTable.vue";
import type { KTableAction, KTableHeader } from "@/components/base/KTable.vue";
import { formatDateTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

type HistoryEntry = {
  changedAt: string;
  user: string;
  note: string;
};

type DemoRow = {
  id: number;
  name: string;
  ownerName: string;
  ownerEmail: string;
  status: "Aktiv" | "Entwurf" | "Archiviert";
  roles: string[];
  netValue: number;
  updatedAt: string;
  history: HistoryEntry[];
};

type DemoSeedRow = Omit<
  DemoRow,
  "id" | "name" | "ownerEmail" | "netValue" | "updatedAt"
>;

const compactDensity = ref(false);
const actionMode = ref<"actions" | "menu">("actions");
const snackbarVisible = ref(false);
const snackbarColor = ref<"success" | "warning" | "error">("success");
const snackbarMessage = ref("Aktion ausgeführt.");

const headers: KTableHeader[] = [
  {
    key: "name",
    title: "Eintrag",
    sortable: true,
    renderAs: "stacked",
    subtitleAccessor: (_value, item) => {
      const row = item as DemoRow;
      return `${row.ownerName} | ${row.ownerEmail}`;
    },
  },
  {
    key: "roles",
    title: "Rollen",
    renderAs: "chip-list",
    chipColorMap: {
      Admin: "primary",
      Vertrieb: "secondary",
      Service: "warning",
      Einkauf: "info",
    },
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    renderAs: "chip",
    chipColorMap: {
      Aktiv: "success",
      Entwurf: "warning",
      Archiviert: "error",
    },
  },
  {
    key: "netValue",
    title: "Nettowert",
    align: "end",
    sortable: true,
    formatter: (value) => formatPrice(Number(value)),
  },
  {
    key: "updatedAt",
    title: "Aktualisiert",
    align: "end",
    sortable: true,
    formatter: (value) =>
      formatDateTime(String(value), { dateStyle: "short", timeStyle: "short" }),
    sortAccessor: (value) => Date.parse(String(value)),
  },
];

const historyHeaders: KTableHeader[] = [
  {
    key: "changedAt",
    title: "Zeitpunkt",
    formatter: (value) =>
      formatDateTime(String(value), { dateStyle: "short", timeStyle: "short" }),
  },
  { key: "user", title: "Benutzer" },
  { key: "note", title: "Änderung" },
];

const demoSeeds: DemoSeedRow[] = [
  {
    ownerName: "Lea Winter",
    status: "Aktiv",
    roles: ["Vertrieb", "Service"],
    history: [
      {
        changedAt: "2026-04-21T10:12:00",
        user: "Lea Winter",
        note: "Preis aktualisiert",
      },
      {
        changedAt: "2026-04-20T09:33:00",
        user: "System",
        note: "Status auf Aktiv gesetzt",
      },
    ],
  },
  {
    ownerName: "Tom Weiss",
    status: "Entwurf",
    roles: ["Einkauf"],
    history: [
      {
        changedAt: "2026-04-20T14:05:00",
        user: "Tom Weiss",
        note: "Entwurf angelegt",
      },
    ],
  },
  {
    ownerName: "Nora Brandt",
    status: "Archiviert",
    roles: ["Admin"],
    history: [],
  },
];

const items = ref<DemoRow[]>(
  Array.from({ length: 18 }, (_, index) => {
    const seed = demoSeeds[index % demoSeeds.length]!;
    const cycle = Math.floor(index / demoSeeds.length) + 1;
    const day = 21 - (index % 12);
    const hour = 8 + (index % 9);
    const minute = (index * 7) % 60;

    return {
      id: index + 1,
      name: `${seed.status} Demo ${cycle}-${(index % demoSeeds.length) + 1}`,
      ownerName: seed.ownerName,
      ownerEmail: `${seed.ownerName.toLowerCase().replace(" ", ".")}@kareima.de`,
      status: seed.status,
      roles: [...seed.roles],
      netValue: 850 + cycle * 1750 + index * 320,
      updatedAt: `2026-04-${String(Math.max(day, 10)).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
      history: seed.history.map((entry, historyIndex) => ({
        ...entry,
        changedAt: `2026-04-${String(Math.max(day - historyIndex, 10)).padStart(2, "0")}T${String(Math.max(hour - historyIndex, 6)).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
      })),
    };
  }),
);

function resolveRowActions(item: object): KTableAction[] {
  const row = item as DemoRow;

  return [
    {
      key: "edit",
      label: "Bearbeiten",
      icon: "mdi-pencil",
      color: "primary",
    },
    {
      key: "toggle-status",
      label: row.status === "Aktiv" ? "Deaktivieren" : "Aktivieren",
      icon: row.status === "Aktiv" ? "mdi-pause-circle" : "mdi-play-circle",
      color: "warning",
      disabled: row.status === "Archiviert",
    },
    {
      key: "delete",
      label: "Löschen",
      icon: "mdi-delete",
      color: "error",
      disabled: row.status === "Aktiv",
    },
  ];
}

function resolveRowClass(item: object): string {
  const row = item as DemoRow;
  return row.status === "Archiviert" ? "text-medium-emphasis" : "";
}

function canExpandRow(item: object): boolean {
  const row = item as DemoRow;
  return row.history.length > 0;
}

function asHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value as HistoryEntry[];
}

function historyFor(item: object): HistoryEntry[] {
  const row = item as DemoRow;
  return asHistory(row.history);
}

function toggleDensity() {
  compactDensity.value = !compactDensity.value;
}

function toggleActionMode() {
  actionMode.value = actionMode.value === "actions" ? "menu" : "actions";
}

function onRowClick(item: object) {
  const row = item as DemoRow;
  snackbarColor.value = "success";
  snackbarMessage.value = `Zeile geöffnet: ${row.name}`;
  snackbarVisible.value = true;
}

function onAction(payload: { actionKey: string; item: object }) {
  const row = payload.item as DemoRow;

  if (payload.actionKey === "delete") {
    snackbarColor.value = "error";
    snackbarMessage.value = `${row.name} wurde zur Löschung markiert.`;
  } else if (payload.actionKey === "toggle-status") {
    snackbarColor.value = "warning";
    snackbarMessage.value = `Statuswechsel vorbereitet für ${row.name}.`;
  } else {
    snackbarColor.value = "success";
    snackbarMessage.value = `${row.name} wird bearbeitet.`;
  }

  snackbarVisible.value = true;
}
</script>

<style scoped>
.view-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
</style>
