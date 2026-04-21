<template>
  <div class="d-flex flex-column ga-4">
    <BasePageHeader
      title="Formular-Demo"
      subtitle="Beispiel für ein Basis-Formular mit einfacher Validierung"
    />

    <v-card class="pa-4 kareima-surface" elevation="0">
      <v-form ref="formRef" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="Name"
              prepend-inner-icon="mdi-account-outline"
              variant="solo-filled"
              bg-color="grey-lighten-4"
              flat
              :rules="nameRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="E-Mail"
              prepend-inner-icon="mdi-email-outline"
              variant="solo-filled"
              bg-color="grey-lighten-4"
              flat
              :rules="emailRules"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model.number="form.price"
              type="number"
              label="Preis"
              prepend-inner-icon="mdi-currency-eur"
              variant="solo-filled"
              bg-color="grey-lighten-4"
              flat
              :rules="priceRules"
            />
          </v-col>

          <v-col cols="12" md="4">
            <BaseDatePicker
              v-model="form.deliveryDate"
              label="Lieferdatum"
              :rules="deliveryDateRules"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="form.category"
              :items="categories"
              label="Kategorie"
              prepend-inner-icon="mdi-shape-outline"
              variant="solo-filled"
              bg-color="grey-lighten-4"
              flat
              :rules="categoryRules"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.notes"
              label="Notizen"
              variant="solo-filled"
              bg-color="grey-lighten-4"
              flat
              auto-grow
              rows="2"
            />
          </v-col>
        </v-row>

        <div class="d-flex ga-2 mt-2">
          <BaseActionButton type="submit" intent="primary"
            >Speichern</BaseActionButton
          >
          <BaseActionButton type="button" intent="ghost" @click="reset"
            >Zurücksetzen</BaseActionButton
          >
        </div>
      </v-form>
    </v-card>

    <BaseAlert
      v-if="submitted"
      type="success"
      message="Formular wurde erfolgreich validiert und gespeichert."
    />

    <BaseSnackbar
      v-model="showErrorSnack"
      color="error"
      message="Bitte prüfe die Eingaben im Formular."
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseActionButton from "@/components/base/BaseActionButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseDatePicker from "@/components/base/BaseDatePicker.vue";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseSnackbar from "@/components/base/BaseSnackbar.vue";

type FormModel = {
  name: string;
  email: string;
  price: number | null;
  deliveryDate: string;
  category: string | null;
  notes: string;
};

type Rule = (value: unknown) => true | string;

type VFormRef = {
  validate: () => Promise<{ valid: boolean }>;
  reset: () => void;
};

const categories = ["Maschinen", "Angebote", "Akkus", "Services"];
const formRef = ref<VFormRef | null>(null);
const submitted = ref(false);
const showErrorSnack = ref(false);

const form = ref<FormModel>({
  name: "",
  email: "",
  price: null,
  deliveryDate: "",
  category: null,
  notes: "",
});

const required =
  (label: string): Rule =>
  (value) =>
    value !== null && String(value).trim().length > 0
      ? true
      : `${label} ist erforderlich.`;

const emailRule: Rule = (value) => {
  if (value === null || String(value).trim().length === 0) {
    return "E-Mail ist erforderlich.";
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
    ? true
    : "Bitte eine gültige E-Mail-Adresse eingeben.";
};

const positiveNumberRule: Rule = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "Bitte eine Zahl eingeben.";
  return num > 0 ? true : "Der Preis muss größer als 0 sein.";
};

const nameRules: Rule[] = [required("Name")];
const emailRules: Rule[] = [emailRule];
const priceRules: Rule[] = [required("Preis"), positiveNumberRule];
const deliveryDateRules: Rule[] = [required("Lieferdatum")];
const categoryRules: Rule[] = [required("Kategorie")];

async function submit() {
  const result = await formRef.value?.validate();
  const valid = result?.valid ?? false;

  if (!valid) {
    submitted.value = false;
    showErrorSnack.value = true;
    return;
  }

  submitted.value = true;
}

function reset() {
  formRef.value?.reset();
  submitted.value = false;
}
</script>
