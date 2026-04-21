<template>
  <div class="d-flex flex-column ga-4">
    <BasePageHeader
      title="Input-Showcase"
      subtitle="Text, Zahl, Datum, Auswahl, Filterpanel und Validierung mit Base-Komponenten"
    />

    <v-card class="pa-4 kareima-surface" elevation="0">
      <v-form ref="formRef" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <BaseTextField
              v-model="form.title"
              label="Titel"
              prepend-inner-icon="mdi-format-title"
              :rules="[required('Titel')]"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseAutocomplete
              v-model="form.category"
              :items="categories"
              label="Kategorie"
              prepend-inner-icon="mdi-shape-outline"
              :rules="[required('Kategorie')]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <BaseNumberField
              v-model="form.amount"
              label="Menge"
              :min="1"
              :rules="[positiveNumber]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <BaseDatePicker
              v-model="form.deliveryDate"
              label="Lieferdatum"
              :rules="[required('Lieferdatum')]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <BaseTextField
              v-model="form.reference"
              label="Referenznummer"
              prepend-inner-icon="mdi-pound"
            />
          </v-col>

          <v-col cols="12">
            <BaseTextArea
              v-model="form.notes"
              label="Notizen"
              rows="2"
            />
          </v-col>
        </v-row>

        <div class="d-flex flex-wrap ga-2 mt-2">
          <BaseActionButton type="submit" intent="primary">
            Validieren und Speichern
          </BaseActionButton>
          <BaseActionButton type="button" intent="ghost" @click="resetForm">
            Zurücksetzen
          </BaseActionButton>
        </div>
      </v-form>
    </v-card>

    <BaseFilterPanel
      v-model="filters"
      :categories="categories"
    />

    <v-card class="pa-4 kareima-surface" elevation="0">
      <h2 class="kareima-section-title mb-2">Live-Output</h2>
      <p class="kareima-section-subtitle mb-4">
        Diese Daten zeigen die Kombination aus Formular und Filterpanel in einem realistischen Zustand.
      </p>
      <v-row>
        <v-col cols="12" md="6">
          <v-list density="compact">
            <v-list-item title="Titel" :subtitle="form.title || '-'" />
            <v-list-item title="Kategorie" :subtitle="String(form.category ?? '-')" />
            <v-list-item title="Menge" :subtitle="String(form.amount ?? '-')" />
            <v-list-item title="Lieferdatum" :subtitle="form.deliveryDate || '-'" />
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list density="compact">
            <v-list-item
              title="Filter Kategorien"
              :subtitle="filters.categories.length ? filters.categories.join(', ') : 'alle'"
            />
            <v-list-item title="Preis min" :subtitle="String(filters.priceMin ?? '-')" />
            <v-list-item title="Preis max" :subtitle="String(filters.priceMax ?? '-')" />
            <v-list-item title="Sortierung" :subtitle="filters.sortBy" />
          </v-list>
        </v-col>
      </v-row>
    </v-card>

    <BaseAlert
      v-if="saved"
      type="success"
      message="Formular ist valide und wurde als Demo gespeichert."
    />

    <BaseSnackbar
      v-model="showErrorSnack"
      color="error"
      message="Bitte alle Pflichtfelder korrekt ausfüllen."
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseActionButton from "@/components/base/BaseActionButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseAutocomplete from "@/components/base/BaseAutocomplete.vue";
import BaseDatePicker from "@/components/base/BaseDatePicker.vue";
import BaseFilterPanel from "@/components/base/BaseFilterPanel.vue";
import BaseNumberField from "@/components/base/BaseNumberField.vue";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseSnackbar from "@/components/base/BaseSnackbar.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseTextField from "@/components/base/BaseTextField.vue";
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

const required =
  (label: string): Rule =>
  (value) => {
    if (value === null || value === undefined) return `${label} ist erforderlich.`;
    return String(value).trim().length > 0 ? true : `${label} ist erforderlich.`;
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
</script>
