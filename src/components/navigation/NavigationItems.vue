<template>
  <v-list density="compact" nav>
    <v-list-item title="Start" @click="router.push('/')">
      <template #prepend>
        <v-icon
          :class="currentRoute === '/' ? 'active' : ''"
          icon="mdi-view-dashboard-outline"
        />
      </template>
    </v-list-item>

    <v-list-item
      title="Input-Showcase"
      @click="router.push('/inputs-showcase')"
    >
      <template #prepend>
        <v-icon
          :class="currentRoute === '/inputs-showcase' ? 'active' : ''"
          icon="mdi-form-dropdown"
        />
      </template>
    </v-list-item>

    <v-list-item
      title="Tabellen-Showcase"
      @click="router.push('/table-showcase')"
    >
      <template #prepend>
        <v-icon
          :class="currentRoute === '/table-showcase' ? 'active' : ''"
          icon="mdi-table-large"
        />
      </template>
    </v-list-item>

    <v-list-item
      title="Interaktions-Demo"
      @click="router.push('/interaction-demo')"
    >
      <template #prepend>
        <v-icon
          :class="currentRoute === '/interaction-demo' ? 'active' : ''"
          icon="mdi-message-badge-outline"
        />
      </template>
    </v-list-item>

    <v-list-item title="Projekt-Guide" @click="router.push('/guide')">
      <template #prepend>
        <v-icon
          :class="currentRoute === '/guide' ? 'active' : ''"
          icon="mdi-book-open-page-variant-outline"
        />
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const currentRoute = computed(() => route.path);
</script>

<style scoped>
.active {
  color: #02a77f;
}
</style>
