<template>
  <v-container fluid class="base-layout fill-height pa-0">
    <v-card class="fill-height w-100 d-flex flex-column" elevation="0">
      <slot name="header" />
      <v-card-text class="base-layout__content flex-grow-1 overflow-hidden">
        <slot name="body">
          <slot />
        </slot>
      </v-card-text>
      <slot name="footer" />
    </v-card>
  </v-container>
</template>

<style scoped>
.base-layout {
  height: 100%;
}

.base-layout__content {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding-top: 16px;
}
</style>
