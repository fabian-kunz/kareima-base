<template>
  <v-app>
    <v-card class="layout-shell" elevation="0">
      <v-layout>
        <v-navigation-drawer expand-on-hover permanent rail>
          <template #prepend>
            <div class="app-logo">K</div>
          </template>

          <v-divider class="mt-2" />
          <NavigationItems />
          <v-divider />

          <template #append>
            <div class="pb-5">
              <v-list-item
                prepend-icon="mdi-book-open-variant"
                title="Dokumentation"
                @click="goDocs"
              />
            </div>
          </template>
        </v-navigation-drawer>

        <v-main
          class="loggedin-main"
          :class="display.mdAndDown ? 'pa-2' : 'pa-6'"
        >
          <div class="kareima-content-container">
            <div class="kareima-page">
              <slot />
            </div>
          </div>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import NavigationItems from "@/components/navigation/NavigationItems.vue";

const display = useDisplay();
const router = useRouter();

function goDocs() {
  router.push("/module-template");
}
</script>

<style scoped>
.layout-shell {
  height: 100vh;
}

.loggedin-main {
  margin-left: 55px;
  width: calc(100vw - 55px);
}

:deep(.v-main) {
  background-color: #dfe0eb;
  height: 100vh;
  overflow: hidden;
}

.app-logo {
  width: 45px;
  height: 45px;
  margin: 8px auto;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #065f4d;
  background: #bde8dd;
  font-weight: 700;
  transition:
    width 0.2s ease,
    margin 0.2s ease;
}

:deep(.v-navigation-drawer--rail.v-navigation-drawer--is-hovering .app-logo) {
  width: 125px;
  border-radius: 16px;
}

@media (max-width: 960px) {
  .loggedin-main {
    margin-left: 0;
    margin-top: 64px;
    width: 100vw;
    height: calc(100vh - 64px);
  }
}
</style>
