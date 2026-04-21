<template>
  <div class="d-flex flex-column ga-4">
    <v-card class="pa-4 kareima-surface" elevation="0">
      <h2 class="kareima-section-title mb-4">Alert-Varianten</h2>
      <BaseAlert
        type="success"
        title="Erfolg"
        message="Deine Änderung wurde dauerhaft gespeichert."
      />
      <BaseAlert
        type="success"
        message="Deine Änderung wurde dauerhaft gespeichert."
      />
      <BaseAlert
        type="info"
        title="Hinweis"
        message="Dieses Modul nutzt zentrale Base-Komponenten für konsistentes Verhalten."
      />
      <BaseAlert
        type="info"
        message="Dieses Modul nutzt zentrale Base-Komponenten für konsistentes Verhalten."
      />
      <BaseAlert
        type="warning"
        title="Achtung"
        message="Offene Pflichtfelder verhindern die Freigabe."
      />
      <BaseAlert
        type="warning"
        message="Offene Pflichtfelder verhindern die Freigabe."
      />
      <BaseAlert
        type="error"
        title="Fehler"
        message="Beim Laden ist ein API-Fehler aufgetreten."
      />
      <BaseAlert
        type="error"
        message="Beim Laden ist ein API-Fehler aufgetreten."
      />
    </v-card>

    <v-card class="pa-4 kareima-surface" elevation="0">
      <h2 class="kareima-section-title mb-4">Aktionen und Feedback</h2>
      <div class="d-flex flex-wrap ga-2">
        <BaseActionButton intent="primary" @click="showSnack('success')">
          Erfolg anzeigen
        </BaseActionButton>
        <BaseActionButton intent="warning" @click="showSnack('warning')">
          Warnung anzeigen
        </BaseActionButton>
        <BaseActionButton intent="danger" @click="showSnack('error')">
          Fehler anzeigen
        </BaseActionButton>
        <BaseActionButton intent="secondary" @click="confirmOpen = true">
          Kritische Aktion starten
        </BaseActionButton>
      </div>
    </v-card>

    <BaseConfirmDialog
      v-model="confirmOpen"
      title="Löschung bestätigen"
      message="Möchtest du den Eintrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
      confirm-label="Jetzt löschen"
      confirm-intent="danger"
      @cancel="onCancel"
      @confirm="onConfirm"
    />

    <BaseSnackbar
      v-model="snackVisible"
      :color="snackColor"
      :message="snackMessage"
    >
      <template #actions>
        <BaseActionButton
          intent="ghost"
          size="small"
          @click="snackVisible = false"
        >
          Schließen
        </BaseActionButton>
      </template>
    </BaseSnackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseActionButton from "@/components/base/BaseActionButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseConfirmDialog from "@/components/base/BaseConfirmDialog.vue";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseSnackbar from "@/components/base/BaseSnackbar.vue";

const confirmOpen = ref(false);
const snackVisible = ref(false);
const snackColor = ref<"success" | "warning" | "error">("success");
const snackMessage = ref("Aktion erfolgreich ausgeführt.");

function showSnack(type: "success" | "warning" | "error") {
  snackColor.value = type;
  snackMessage.value =
    type === "success"
      ? "Alles erfolgreich abgeschlossen."
      : type === "warning"
        ? "Bitte prüfe die nächsten Schritte sorgfältig."
        : "Die Aktion konnte nicht abgeschlossen werden.";
  snackVisible.value = true;
}

function onCancel() {
  confirmOpen.value = false;
  snackColor.value = "warning";
  snackMessage.value = "Aktion wurde abgebrochen.";
  snackVisible.value = true;
}

function onConfirm() {
  confirmOpen.value = false;
  snackColor.value = "success";
  snackMessage.value = "Eintrag wurde gelöscht.";
  snackVisible.value = true;
}

function runWorkflow() {
  confirmOpen.value = true;
}
</script>
