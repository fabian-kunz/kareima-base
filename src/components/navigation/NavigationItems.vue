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

    <v-list-item title="Formular-Demo" @click="router.push('/form-demo')">
      <template #prepend>
        <v-icon
          :class="currentRoute === '/form-demo' ? 'active' : ''"
          icon="mdi-form-select"
        />
      </template>
    </v-list-item>

    <v-list-item
      title="Modul-Template"
      @click="router.push('/module-template')"
    >
      <template #prepend>
        <v-icon
          :class="currentRoute === '/module-template' ? 'active' : ''"
          icon="mdi-file-code-outline"
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
