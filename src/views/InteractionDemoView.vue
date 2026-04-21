<template>
  <KContainer>
    <template #header>
      <KPageHeader
        title="Interaktions-Demo"
        subtitle="Alerts, ConfirmDialog, Snackbar und kombinierte Nutzerflüsse"
      />
    </template>

    <template #body>
      <div class="d-flex flex-column ga-4 view-body">
        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Alert-Varianten</h2>
          <KAlert
            type="success"
            title="Erfolg"
            message="Deine Änderung wurde dauerhaft gespeichert."
          />
          <KAlert
            type="info"
            title="Hinweis"
            message="Dieses Modul nutzt zentrale Base-Komponenten für konsistentes Verhalten."
          />
          <KAlert
            type="warning"
            title="Achtung"
            message="Offene Pflichtfelder verhindern die Freigabe."
          />
          <KAlert
            type="error"
            title="Fehler"
            message="Beim Laden ist ein API-Fehler aufgetreten."
          />
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-4">Aktionen und Feedback</h2>
          <div class="d-flex flex-wrap ga-2">
            <KActionButton intent="primary" @click="showSnack('success')">
              Erfolg anzeigen
            </KActionButton>
            <KActionButton intent="warning" @click="showSnack('warning')">
              Warnung anzeigen
            </KActionButton>
            <KActionButton intent="danger" @click="showSnack('error')">
              Fehler anzeigen
            </KActionButton>
            <KActionButton intent="secondary" @click="confirmOpen = true">
              Kritische Aktion starten
            </KActionButton>
          </div>
        </v-card>

        <v-card class="pa-4 kareima-surface" elevation="0">
          <h2 class="kareima-section-title mb-2">
            Kompletter Interaktionsfluss
          </h2>
          <p class="kareima-section-subtitle mb-4">
            1) Nutzer startet eine Aktion, 2) Dialog zur Bestätigung, 3)
            Ergebnis als Snackbar.
          </p>
          <KActionButton intent="primary" @click="runWorkflow">
            Demo-Workflow ausführen
          </KActionButton>
        </v-card>

        <KConfirmDialog
          v-model="confirmOpen"
          title="Löschung bestätigen"
          message="Möchtest du den Eintrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
          confirm-label="Jetzt löschen"
          confirm-intent="danger"
          @cancel="onCancel"
          @confirm="onConfirm"
        />

        <KSnackbar
          v-model="snackVisible"
          :color="snackColor"
          :message="snackMessage"
        >
          <template #actions>
            <KActionButton
              intent="ghost"
              size="small"
              @click="snackVisible = false"
            >
              Schließen
            </KActionButton>
          </template>
        </KSnackbar>
      </div>
    </template>
  </KContainer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import KActionButton from "@/components/base/KActionButton.vue";
import KAlert from "@/components/base/KAlert.vue";
import KContainer from "@/components/base/KContainer.vue";
import KConfirmDialog from "@/components/base/KConfirmDialog.vue";
import KPageHeader from "@/components/base/KPageHeader.vue";
import KSnackbar from "@/components/base/KSnackbar.vue";

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

<style scoped>
.view-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
</style>
