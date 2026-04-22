<template>
  <v-container fluid class="base-container pa-0">
    <v-card class="base-container__card w-100 d-flex flex-column" elevation="0">
      <slot name="header">
        <div
          v-if="hasIntegratedHeader"
          class="pa-4 mb-4 base-container__header"
          elevation="0"
        >
          <div
            v-if="hasHeaderTop"
            class="d-flex flex-wrap align-center justify-space-between ga-3"
          >
            <div v-if="hasTitleBlock">
              <h1 v-if="hasTitle" class="kareima-section-title">
                <slot name="header-title">{{ title }}</slot>
              </h1>
              <p v-if="hasSubtitle" class="kareima-section-subtitle">
                <slot name="header-subtitle">{{ subtitle }}</slot>
              </p>
            </div>

            <div class="d-flex ga-2 align-center">
              <slot name="header-actions" />
            </div>
          </div>

          <div
            v-if="hasHeaderContent"
            class="base-container__header-content"
            :class="{ 'mt-4': hasHeaderTop }"
          >
            <slot name="header-content" />
          </div>
        </div>
      </slot>
      <v-card-text class="base-container__content">
        <slot name="body">
          <slot />
        </slot>
      </v-card-text>
      <slot name="footer" />
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const slots = useSlots();

const hasTitle = computed(
  () => Boolean(props.title) || Boolean(slots["header-title"]),
);
const hasSubtitle = computed(
  () => Boolean(props.subtitle) || Boolean(slots["header-subtitle"]),
);
const hasHeaderActions = computed(() => Boolean(slots["header-actions"]));
const hasHeaderContent = computed(() => Boolean(slots["header-content"]));
const hasTitleBlock = computed(() => hasTitle.value || hasSubtitle.value);
const hasHeaderTop = computed(
  () => hasTitleBlock.value || hasHeaderActions.value,
);
const hasIntegratedHeader = computed(
  () => hasHeaderTop.value || hasHeaderContent.value,
);
</script>

<style scoped>
.base-container {
  height: 100%;
  min-height: 0;
}

.base-container__card {
  height: 100%;
  min-height: 0;
}

.base-container__content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-top: 16px;
}

.base-container__header {
  background: var(--kareima-color-surface);
  border-bottom: 1px solid var(--kareima-color-border);
  box-shadow: var(--kareima-shadow-soft);
}

.base-container__header-content {
  min-height: 0;
}

:deep(.view-body) {
  display: block;
  min-height: auto;
  overflow: visible;
}
</style>
