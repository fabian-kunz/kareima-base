<template>
  <v-card class="kareima-surface base-table" elevation="0">
    <div class="table-scroll">
      <v-table :density="tableDensity" :height="resolvedHeight" fixed-header>
        <thead>
          <tr>
            <th v-if="hasExpandableRows && !expandAtEnd" class="text-start">
              {{ expandColumnTitle }}
            </th>
            <th
              v-for="header in headers"
              :key="header.key"
              :class="header.align ? `text-${header.align}` : ''"
              :style="header.sortable ? 'cursor: pointer;' : undefined"
              @click="toggleSort(header)"
            >
              <div
                class="d-flex align-center ga-1"
                :class="header.align ? `justify-${header.align}` : ''"
              >
                <span>{{ header.title }}</span>
                <v-icon
                  v-if="header.sortable"
                  size="16"
                  :icon="sortIcon(header.key)"
                  class="text-medium-emphasis"
                />
              </div>
            </th>
            <th v-if="hasActions" class="text-end">Aktionen</th>
            <th v-if="hasExpandableRows && expandAtEnd" class="text-end">
              {{ expandColumnTitle }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td
              :colspan="columnCount"
              class="text-center py-6 text-medium-emphasis"
            >
              Lade Daten...
            </td>
          </tr>

          <template
            v-for="(item, rowIndex) in sortedItems"
            :key="rowKey(item, rowIndex)"
          >
            <tr
              :class="[
                props.clickableRows ? 'base-table__row--clickable' : '',
                props.rowClass?.(item) ?? '',
              ]"
              @click="onRowClick(item)"
            >
              <td v-if="hasExpandableRows && !expandAtEnd" class="text-start">
                <v-btn
                  v-if="canExpand(item)"
                  size="small"
                  variant="text"
                  class="text-none"
                  :append-icon="
                    isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  "
                  @click.stop="toggleExpanded(item)"
                >
                  {{ isExpanded(item) ? collapseLabel : expandLabel }}
                </v-btn>
              </td>
              <td
                v-for="header in headers"
                :key="`${rowIndex}-${header.key}`"
                :class="header.align ? `text-${header.align}` : ''"
              >
                <v-chip
                  v-if="header.renderAs === 'chip'"
                  :color="
                    resolveChipColor(header, asRecord(item)[header.key], item)
                  "
                  variant="flat"
                  size="small"
                >
                  {{ formatCellValue(header, item) }}
                </v-chip>
                <div
                  v-else-if="header.renderAs === 'stacked'"
                  class="base-table__stacked"
                >
                  <div class="base-table__stacked-title">
                    {{ formatCellValue(header, item) }}
                  </div>
                  <div class="base-table__stacked-subtitle">
                    {{ formatCellSubtitle(header, item) }}
                  </div>
                </div>
                <div
                  v-else-if="header.renderAs === 'chip-list'"
                  class="d-flex flex-wrap ga-1"
                >
                  <v-chip
                    v-for="chipValue in resolveChipList(header, item)"
                    :key="`${rowIndex}-${header.key}-${chipValue}`"
                    :color="resolveChipColor(header, chipValue, item)"
                    variant="flat"
                    size="small"
                  >
                    {{ chipValue }}
                  </v-chip>
                </div>
                <template v-else>
                  {{ formatCellValue(header, item) }}
                </template>
              </td>

              <td v-if="hasActions" class="text-end">
                <div
                  v-if="actionMode === 'actions'"
                  class="d-flex justify-end ga-1"
                >
                  <v-btn
                    v-for="action in getRowActions(item)"
                    :key="action.key"
                    :icon="Boolean(action.icon)"
                    :color="action.color ?? 'primary'"
                    :variant="action.variant ?? 'tonal'"
                    size="small"
                    :loading="action.loading"
                    :disabled="action.disabled"
                    @click.stop="emitAction(action.key, item)"
                  >
                    <v-icon v-if="action.icon" :icon="action.icon" />
                    <template v-else>{{ action.label }}</template>
                  </v-btn>
                </div>

                <v-menu v-else>
                  <template #activator="{ props: menuProps }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      size="small"
                      v-bind="menuProps"
                    />
                  </template>

                  <v-list density="compact">
                    <v-list-item
                      v-for="action in getRowActions(item)"
                      :key="action.key"
                      :title="action.label"
                      @click.stop="emitAction(action.key, item)"
                    >
                      <template #prepend>
                        <v-icon :icon="action.icon ?? 'mdi-circle-small'" />
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>

              <td v-if="hasExpandableRows && expandAtEnd" class="text-end">
                <v-btn
                  v-if="canExpand(item)"
                  size="small"
                  variant="text"
                  class="text-none"
                  :append-icon="
                    isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  "
                  @click.stop="toggleExpanded(item)"
                >
                  {{ isExpanded(item) ? collapseLabel : expandLabel }}
                </v-btn>
              </td>
            </tr>

            <tr
              v-if="hasExpandableRows && isExpanded(item)"
              :key="`${rowKey(item, rowIndex)}-expanded`"
              class="base-table__expanded-row"
            >
              <td :colspan="columnCount" class="pa-0">
                <slot name="expanded-row" :item="item" :row-index="rowIndex" />
              </td>
            </tr>
          </template>

          <tr v-if="!loading && items.length === 0">
            <td
              :colspan="columnCount"
              class="text-center py-6 text-medium-emphasis"
            >
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, watch } from "vue";

type BaseTableRow = object;

export interface BaseTableHeader {
  key: string;
  title: string;
  align?: "start" | "center" | "end";
  formatter?: (value: unknown, item: BaseTableRow) => string;
  renderAs?: "text" | "chip" | "chip-list" | "stacked";
  subtitleAccessor?: (value: unknown, item: BaseTableRow) => string;
  chipColorMap?: Record<string, string>;
  chipColorResolver?: (value: unknown, item: BaseTableRow) => string;
  sortable?: boolean;
  sortAccessor?: (value: unknown, item: BaseTableRow) => string | number;
}

export interface BaseTableAction {
  key: string;
  label: string;
  icon?: string;
  color?: string;
  variant?: "text" | "tonal" | "flat" | "elevated" | "outlined";
  loading?: boolean;
  disabled?: boolean;
}

type BaseTableActionsSource =
  | BaseTableAction[]
  | ((item: BaseTableRow) => BaseTableAction[]);

const props = withDefaults(
  defineProps<{
    headers: BaseTableHeader[];
    items: BaseTableRow[];
    loading?: boolean;
    emptyText?: string;
    itemKey?: string;
    density?: "compact" | "normal";
    height?: string | number;
    initialSortKey?: string;
    initialSortDirection?: "asc" | "desc";
    actionMode?: "actions" | "menu";
    rowActions?: BaseTableActionsSource;
    clickableRows?: boolean;
    rowClass?: (item: BaseTableRow) => string;
    expandableRows?: boolean;
    canExpandRow?: (item: BaseTableRow) => boolean;
    expandColumnTitle?: string;
    expandColumnPosition?: "start" | "end";
    expandLabel?: string;
    collapseLabel?: string;
  }>(),
  {
    loading: false,
    emptyText: "Keine Daten vorhanden.",
    itemKey: "id",
    density: "normal",
    initialSortDirection: "asc",
    actionMode: "actions",
    clickableRows: false,
    expandableRows: false,
    expandColumnTitle: "Details",
    expandColumnPosition: "start",
    expandLabel: "Details",
    collapseLabel: "Ausblenden",
  },
);

const slots = useSlots();

const emit = defineEmits<{
  (e: "action", payload: { actionKey: string; item: BaseTableRow }): void;
  (e: "row-click", item: BaseTableRow): void;
}>();

const sortKey = ref<string | null>(props.initialSortKey ?? null);
const sortDirection = ref<"asc" | "desc">(props.initialSortDirection);
const expandedRowKeys = ref<Set<string>>(new Set());

const tableDensity = computed(() =>
  props.density === "compact" ? "compact" : "comfortable",
);

const resolvedHeight = computed(() => props.height);

const hasExpandableRows = computed(
  () => props.expandableRows && Boolean(slots["expanded-row"]),
);

const expandColumnTitle = computed(() => props.expandColumnTitle);
const expandAtEnd = computed(() => props.expandColumnPosition === "end");
const expandLabel = computed(() => props.expandLabel);
const collapseLabel = computed(() => props.collapseLabel);

const hasActions = computed(() => {
  const actionsSource = props.rowActions;
  if (!actionsSource) return false;
  if (Array.isArray(actionsSource)) return actionsSource.length > 0;

  return props.items.some((item) => actionsSource(item).length > 0);
});

const columnCount = computed(
  () =>
    props.headers.length +
    (hasActions.value ? 1 : 0) +
    (hasExpandableRows.value ? 1 : 0),
);

watch(
  () => [props.initialSortKey, props.initialSortDirection] as const,
  ([newKey, newDirection]) => {
    sortKey.value = newKey ?? null;
    sortDirection.value = newDirection;
  },
);

const sortedItems = computed(() => {
  if (!sortKey.value) {
    return props.items;
  }

  const activeHeader = props.headers.find(
    (header) => header.key === sortKey.value,
  );
  const direction = sortDirection.value === "asc" ? 1 : -1;

  return [...props.items].sort((a, b) => {
    const left = sortValue(activeHeader, a);
    const right = sortValue(activeHeader, b);

    if (left === right) return 0;
    if (left > right) return 1 * direction;
    return -1 * direction;
  });
});

function rowKey(item: BaseTableRow, index: number): string {
  const keyValue = asRecord(item)[props.itemKey];
  return String(keyValue ?? index);
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  return String(value);
}

function toggleSort(header: BaseTableHeader) {
  if (!header.sortable) return;

  if (sortKey.value === header.key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    return;
  }

  sortKey.value = header.key;
  sortDirection.value = "asc";
}

function sortIcon(headerKey: string): string {
  if (sortKey.value !== headerKey) return "mdi-swap-vertical";
  return sortDirection.value === "asc" ? "mdi-arrow-up" : "mdi-arrow-down";
}

function normalizeSortValue(value: unknown): string | number {
  if (value === null || value === undefined) return "";

  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;

  if (typeof value === "string") {
    const timestamp = Date.parse(value);
    if (!Number.isNaN(timestamp)) return timestamp;

    const numeric = Number(value.replace(/[^0-9,.-]/g, "").replace(",", "."));
    if (!Number.isNaN(numeric) && value.match(/[0-9]/)) return numeric;

    return value.toLocaleLowerCase();
  }

  return String(value).toLocaleLowerCase();
}

function sortValue(
  header: BaseTableHeader | undefined,
  item: BaseTableRow,
): string | number {
  if (!header) return "";

  const value = asRecord(item)[header.key];
  if (header.sortAccessor) {
    return header.sortAccessor(value, item);
  }

  return normalizeSortValue(value);
}

function formatCellValue(header: BaseTableHeader, item: BaseTableRow): string {
  const value = asRecord(item)[header.key];
  if (header.formatter) {
    return header.formatter(value, item);
  }
  return formatCell(value);
}

function formatCellSubtitle(
  header: BaseTableHeader,
  item: BaseTableRow,
): string {
  if (!header.subtitleAccessor) return "";
  const value = asRecord(item)[header.key];
  return header.subtitleAccessor(value, item);
}

function resolveChipList(
  header: BaseTableHeader,
  item: BaseTableRow,
): string[] {
  const value = asRecord(item)[header.key];
  if (!Array.isArray(value)) {
    return value ? [String(value)] : [];
  }

  return value
    .map((entry) => String(entry))
    .filter((entry) => entry.length > 0);
}

function resolveChipColor(
  header: BaseTableHeader,
  value: unknown,
  item: BaseTableRow,
): string {
  if (header.chipColorResolver) return header.chipColorResolver(value, item);
  if (!header.chipColorMap) return "primary";
  return header.chipColorMap[String(value)] ?? "primary";
}

function asRecord(item: BaseTableRow): Record<string, unknown> {
  return item as Record<string, unknown>;
}

function getRowActions(item: BaseTableRow): BaseTableAction[] {
  if (!props.rowActions) return [];
  if (Array.isArray(props.rowActions)) return props.rowActions;
  return props.rowActions(item);
}

function emitAction(actionKey: string, item: BaseTableRow) {
  emit("action", { actionKey, item });
}

function canExpand(item: BaseTableRow): boolean {
  if (!hasExpandableRows.value) return false;
  if (!props.canExpandRow) return true;
  return props.canExpandRow(item);
}

function toggleExpanded(item: BaseTableRow) {
  const key = rowKey(item, -1);
  const updated = new Set(expandedRowKeys.value);
  if (updated.has(key)) {
    updated.delete(key);
  } else {
    updated.add(key);
  }
  expandedRowKeys.value = updated;
}

function isExpanded(item: BaseTableRow): boolean {
  return expandedRowKeys.value.has(rowKey(item, -1));
}

function onRowClick(item: BaseTableRow) {
  if (!props.clickableRows) return;
  emit("row-click", item);
}
</script>

<style scoped>
.table-scroll {
  overflow: auto;
}

.base-table__row--clickable {
  cursor: pointer;
}

.base-table__expanded-row {
  background-color: rgba(0, 0, 0, 0.02);
}

.base-table__stacked-title {
  line-height: 1.2;
}

.base-table__stacked-subtitle {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.62);
  line-height: 1.2;
}
</style>
