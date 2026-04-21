<template>
  <div class="d-flex flex-column ga-4">
    <BasePageHeader
      title="Tabellen-Showcase"
      subtitle="Sortierung, Aktionen, Zeilenklick und expandierte Detailzeilen mit BaseTable"
    >
      <template #actions>
        <BaseActionButton intent="secondary" @click="toggleDensity">
          {{ compactDensity ? "Dichte: Kompakt" : "Dichte: Normal" }}
        </BaseActionButton>
        <BaseActionButton intent="ghost" @click="toggleActionMode">
          {{ actionMode === "actions" ? "Aktionen: Buttons" : "Aktionen: Menü" }}
        </BaseActionButton>
      </template>
    </BasePageHeader>

    <BaseAlert
      type="info"
      message="Klicke auf eine Zeile, nutze Aktionen oder öffne Detailzeilen über den Button ganz rechts."
    />

    <BaseTable
      :headers="headers"
      :items="items"
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
          <BaseTable
            :headers="historyHeaders"
            :items="historyFor(item)"
            density="compact"
            empty-text="Keine Historie vorhanden."
          />
        </div>
      </template>
    </BaseTable>

    <BaseSnackbar
      v-model="snackbarVisible"
      :color="snackbarColor"
      :message="snackbarMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseActionButton from "@/components/base/BaseActionButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseSnackbar from "@/components/base/BaseSnackbar.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import type {
  BaseTableAction,
  BaseTableHeader,
} from "@/components/base/BaseTable.vue";
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

const compactDensity = ref(false);
const actionMode = ref<"actions" | "menu">("actions");
const snackbarVisible = ref(false);
const snackbarColor = ref<"success" | "warning" | "error">("success");
const snackbarMessage = ref("Aktion ausgeführt.");

const headers: BaseTableHeader[] = [
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

const historyHeaders: BaseTableHeader[] = [
  {
    key: "changedAt",
    title: "Zeitpunkt",
    formatter: (value) =>
      formatDateTime(String(value), { dateStyle: "short", timeStyle: "short" }),
  },
  { key: "user", title: "Benutzer" },
  { key: "note", title: "Änderung" },
];

const items = ref<DemoRow[]>([
  {
    id: 1,
    name: "Rahmenvertrag Nord",
    ownerName: "Lea Winter",
    ownerEmail: "lea.winter@kareima.de",
    status: "Aktiv",
    roles: ["Vertrieb", "Service"],
    netValue: 12900,
    updatedAt: "2026-04-21T10:12:00",
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
    id: 2,
    name: "Servicepaket Süd",
    ownerName: "Tom Weiss",
    ownerEmail: "tom.weiss@kareima.de",
    status: "Entwurf",
    roles: ["Einkauf"],
    netValue: 4200,
    updatedAt: "2026-04-20T14:05:00",
    history: [
      {
        changedAt: "2026-04-20T14:05:00",
        user: "Tom Weiss",
        note: "Entwurf angelegt",
      },
    ],
  },
  {
    id: 3,
    name: "Legacy-Angebot West",
    ownerName: "Nora Brandt",
    ownerEmail: "nora.brandt@kareima.de",
    status: "Archiviert",
    roles: ["Admin"],
    netValue: 860,
    updatedAt: "2026-04-18T07:10:00",
    history: [],
  },
]);

function resolveRowActions(item: object): BaseTableAction[] {
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
