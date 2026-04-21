import { defineStore } from "pinia";

const NAV_DRAWER_EXPANDED_KEY = "kareima.base.navDrawerExpanded";

function readStoredExpandedState(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(NAV_DRAWER_EXPANDED_KEY);
  return stored === "true";
}

function writeStoredExpandedState(value: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NAV_DRAWER_EXPANDED_KEY, String(value));
}

export const useUiShellStore = defineStore("uiShell", {
  state: () => ({
    navDrawerExpanded: false as boolean,
    initialized: false as boolean,
  }),

  actions: {
    initialize() {
      if (this.initialized) return;
      this.navDrawerExpanded = readStoredExpandedState();
      this.initialized = true;
    },

    setNavDrawerExpanded(value: boolean) {
      this.navDrawerExpanded = value;
      writeStoredExpandedState(value);
    },

    toggleNavDrawerExpanded() {
      this.setNavDrawerExpanded(!this.navDrawerExpanded);
    },
  },
});
