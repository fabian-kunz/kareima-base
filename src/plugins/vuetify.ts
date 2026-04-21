import "vuetify/styles";
import { createVuetify } from "vuetify";
import { de } from "vuetify/locale";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  locale: {
    locale: "de",
    fallback: "de",
    messages: { de },
  },
  components,
  directives,
  theme: {
    defaultTheme: "kareima",
    themes: {
      kareima: {
        dark: false,
        colors: {
          primary: "#02A77F",
          secondary: "#0C6E5D",
          accent: "#127C67",
          background: "#F4F6F8",
          surface: "#FFFFFF",
          error: "#C62828",
          warning: "#F57C00",
          info: "#0288D1",
          success: "#2E7D32",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      rounded: "lg",
      variant: "elevated",
      color: "primary",
      class: "text-none",
    },
    VTextField: {
      variant: "solo-filled",
      bgColor: "grey-lighten-4",
      density: "comfortable",
      hideDetails: "auto",
      flat: true,
    },
    VSelect: {
      variant: "solo-filled",
      bgColor: "grey-lighten-4",
      density: "comfortable",
      hideDetails: "auto",
      flat: true,
    },
    VAutocomplete: {
      variant: "solo-filled",
      bgColor: "grey-lighten-4",
      density: "comfortable",
      hideDetails: "auto",
      flat: true,
    },
    VCard: {
      rounded: "lg",
      elevation: 1,
    },
  },
});

export default vuetify;
