<template>
  <v-btn :color="resolvedColor" :variant="resolvedVariant" v-bind="$attrs">
    <slot />
  </v-btn>
</template>

<script lang="ts" setup>
import { computed } from "vue";

type Intent = "primary" | "secondary" | "danger" | "ghost" | "warning";

const props = withDefaults(
  defineProps<{
    intent?: Intent;
  }>(),
  {
    intent: "primary",
  },
);

const resolvedColor = computed(() => {
  if (props.intent === "danger") return "error";
  if (props.intent === "ghost") return "default";
  if (props.intent === "warning") return "warning";
  return "primary";
});

const resolvedVariant = computed(() => {
  if (props.intent === "primary") return "elevated";
  return "tonal";
});
</script>
