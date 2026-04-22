<template>
  <v-app>
    <v-card class="layout-shell" elevation="0">
      <v-layout>
        <v-navigation-drawer
          :expand-on-hover="!isDrawerExpanded"
          :rail="!isDrawerExpanded"
          :rail-width="56"
          permanent
        >
          <template #prepend>
            <div class="app-logo">K</div>
          </template>

          <v-divider class="mt-2" />
          <NavigationItems />
          <v-divider />

          <template #append>
            <div class="pb-5 drawer-append-actions">
              <v-list-item
                :prepend-icon="
                  isDrawerExpanded
                    ? 'mdi-arrow-collapse-left'
                    : 'mdi-arrow-expand-right'
                "
                :title="
                  isDrawerExpanded
                    ? 'Navigation einklappen'
                    : 'Navigation anheften'
                "
                @click="uiShellStore.toggleNavDrawerExpanded()"
              />

              <v-divider class="mx-3 my-2" />

              <v-list-item
                prepend-icon="mdi-logout"
                title="Logout"
                class="text-error"
              />
            </div>
          </template>
        </v-navigation-drawer>

        <v-main
          class="loggedin-main"
          :class="display.mdAndDown ? 'pa-2' : 'pa-6'"
          :style="mainStyle"
        >
          <div class="kareima-content-container">
            <div class="kareima-content-slot">
              <slot />
            </div>
          </div>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import type { CSSProperties } from "vue";
import { useDisplay } from "vuetify";
import NavigationItems from "@/components/navigation/NavigationItems.vue";
import { useUiShellStore } from "@/stores/uiShell";

const display = useDisplay();
const uiShellStore = useUiShellStore();

const isDrawerExpanded = computed(() => uiShellStore.navDrawerExpanded);

const mainStyle = computed<CSSProperties>(() => {
  if (display.mdAndDown.value) return {};

  const drawerWidth = isDrawerExpanded.value ? 256 : 56;
  return {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100vw - ${drawerWidth}px)`,
  };
});

onMounted(() => {
  uiShellStore.initialize();
});
</script>

<style scoped>
.layout-shell {
  height: 100vh;
}

.loggedin-main {
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition:
    margin-left 0.2s ease,
    width 0.2s ease;
}

.kareima-content-container,
.kareima-content-slot {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
}

:deep(.v-main) {
  background-color: #dfe0eb;
  height: 100vh;
  overflow: hidden;
}

:deep(.v-main__wrap) {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
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

.drawer-append-actions {
  padding-top: 6px;
}

:deep(.v-navigation-drawer--rail.v-navigation-drawer--is-hovering .app-logo),
:deep(.v-navigation-drawer:not(.v-navigation-drawer--rail) .app-logo) {
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
