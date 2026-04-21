<template>
  <v-container fluid class="base-layout fill-height pa-0">
    <v-card class="fill-height w-100 d-flex flex-column" elevation="0">
      <slot name="header" />
      <v-card-text class="base-layout__content flex-grow-1 overflow-hidden">
        <slot />
      </v-card-text>
      <slot name="footer" />
    </v-card>
  </v-container>
</template>

<style scoped>
.base-layout__content {
  padding-top: 16px;
}
</style>
