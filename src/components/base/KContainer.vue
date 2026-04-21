<template>
  <v-container fluid class="base-container pa-0">
    <v-card class="base-container__card w-100 d-flex flex-column" elevation="0">
      <slot name="header" />
      <v-card-text class="base-container__content">
        <slot name="body">
          <slot />
        </slot>
      </v-card-text>
      <slot name="footer" />
    </v-card>
  </v-container>
</template>

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

:deep(.view-body) {
  display: block;
  min-height: auto;
  overflow: visible;
}
</style>
