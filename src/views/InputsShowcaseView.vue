<template>
  <KContainer
    title="Input-Showcase"
    subtitle="Text, Zahl, Datum, Auswahl und Validierung mit Base-Komponenten"
  >
    <template #body>
      <div class="d-flex flex-column ga-4 view-body">
        <v-card class="pa-4 kareima-surface" elevation="0">
          <v-form ref="formRef" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="6">
                <KTextField
                  v-model="form.title"
                  label="Titel"
                  prepend-inner-icon="mdi-format-title"
                  :rules="[required('Titel')]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <KAutocomplete
                  v-model="form.category"
                  :items="categories"
                  label="Kategorie"
                  prepend-inner-icon="mdi-shape-outline"
                  :rules="[required('Kategorie')]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <KNumberField
                  v-model="form.amount"
                  label="Menge"
                  :min="1"
                  :rules="[positiveNumber]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <KDatePicker
                  v-model="form.deliveryDate"
                  label="Lieferdatum"
                  :rules="[required('Lieferdatum')]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <KTextField
                  v-model="form.reference"
                  label="Referenznummer"
                  prepend-inner-icon="mdi-pound"
                />
              </v-col>

              <v-col cols="12">
                <KTextArea v-model="form.notes" label="Notizen" rows="2" />
              </v-col>
            </v-row>

            <div class="d-flex flex-wrap ga-2 mt-2">
              <KActionButton type="submit" intent="primary">
                Validieren und Speichern
              </KActionButton>
              <KActionButton type="button" intent="ghost" @click="resetForm">
                Zurücksetzen
              </KActionButton>
            </div>
          </v-form>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-2">Live-Output</h2>
          <p class="kareima-section-subtitle mb-4">
            Diese Daten zeigen die Kombination aus Formular und Filterpanel in
            einem realistischen Zustand.
          </p>
          <v-row>
            <v-col cols="12" md="6">
              <v-list density="compact">
                <v-list-item title="Titel" :subtitle="form.title || '-'" />
                <v-list-item
                  title="Kategorie"
                  :subtitle="String(form.category ?? '-')"
                />
                <v-list-item
                  title="Menge"
                  :subtitle="String(form.amount ?? '-')"
                />
                <v-list-item
                  title="Lieferdatum"
                  :subtitle="form.deliveryDate || '-'"
                />
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <v-list density="compact">
                <v-list-item
                  title="Filter Kategorien"
                  :subtitle="
                    filters.categories.length
                      ? filters.categories.join(', ')
                      : 'alle'
                  "
                />
                <v-list-item
                  title="Preis min"
                  :subtitle="String(filters.priceMin ?? '-')"
                />
                <v-list-item
                  title="Preis max"
                  :subtitle="String(filters.priceMax ?? '-')"
                />
                <v-list-item title="Sortierung" :subtitle="filters.sortBy" />
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <KAlert
          v-if="saved"
          type="success"
          message="Formular ist valide und wurde als Demo gespeichert."
        />

        <KSnackbar
          v-model="showErrorSnack"
          color="error"
          message="Bitte alle Pflichtfelder korrekt ausfüllen."
        />
      </div>
    </template>
  </KContainer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import KActionButton from "@/components/base/KActionButton.vue";
import KAlert from "@/components/base/KAlert.vue";
import KAutocomplete from "@/components/base/KAutocomplete.vue";
import KContainer from "@/components/base/KContainer.vue";
import KDatePicker from "@/components/base/KDatePicker.vue";
import KFilterPanel from "@/components/base/KFilterPanel.vue";
import KNumberField from "@/components/base/KNumberField.vue";
import KSnackbar from "@/components/base/KSnackbar.vue";
import KTextArea from "@/components/base/KTextArea.vue";
import KTextField from "@/components/base/KTextField.vue";
import type { BaseFilterModel } from "@/types/filters";

type Rule = (value: unknown) => true | string;

type VFormRef = {
  validate: () => Promise<{ valid: boolean }>;
  reset: () => void;
};

type InputForm = {
  title: string;
  category: string | null;
  amount: number | null;
  deliveryDate: string | null | undefined;
  reference: string;
  notes: string | null | undefined;
};

const categories = ["Maschinen", "Angebote", "Akkus", "Services"];

const formRef = ref<VFormRef | null>(null);
const saved = ref(false);
const showErrorSnack = ref(false);

const form = ref<InputForm>({
  title: "",
  category: null,
  amount: null,
  deliveryDate: null,
  reference: "",
  notes: "",
});

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

const required =
  (label: string): Rule =>
  (value) => {
    if (value === null || value === undefined)
      return `${label} ist erforderlich.`;
    return String(value).trim().length > 0
      ? true
      : `${label} ist erforderlich.`;
  };

const positiveNumber: Rule = (value) => {
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) return "Bitte eine Zahl eingeben.";
  return asNumber > 0 ? true : "Der Wert muss größer als 0 sein.";
};

async function submit() {
  const result = await formRef.value?.validate();
  const valid = result?.valid ?? false;

  if (!valid) {
    saved.value = false;
    showErrorSnack.value = true;
    return;
  }

  saved.value = true;
}

function resetForm() {
  formRef.value?.reset();
  saved.value = false;
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
