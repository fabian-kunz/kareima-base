# Kareima Basisprojekt

Dieses Projekt ist ein wiederverwendbarer Starter für neue Kareima-Frontends.

## Ziel

- Einheitliche UI-Bausteine für Formulare, Header, Dialoge und Filter
- Zentrale Design-Tokens statt verteilter Hex-Farben
- Dokumentierte Regeln, wann welche Komponente und Variante zu nutzen ist

## Enthalten

- Vue 3 + TypeScript + Vite
- Vuetify mit zentralem Theme
- Supplier-ähnliches Layout mit seitlicher Navigation
- Seitenhintergrund #dfe0eb mit weißem Inhalts-Container
- Basis-Komponenten in src/components/base
- Globale Tokens und Styles in src/styles
- Dokumentation in docs

## Start

```bash
npm install
npm run dev
```

## Struktur

- src/components/base: Wiederverwendbare Basis-Komponenten
- src/components/layout: Layout-Rahmen für alle Seiten
- src/plugins/vuetify.ts: Theme + Component Defaults
- src/styles/tokens.css: Farb- und Spacing-Tokens
- docs/COMPONENT_USAGE.md: Regeln für Komponenten und Varianten
- templates/feature-module: Vorlage für neue Fachmodule

## Routen im Starter

- /: Startseite mit Basisbeispiel
- /module-template: Modulstruktur und Onboarding

## Hinweis

Das Projekt ist als Startschablone gedacht. Business-spezifische Views, Stores und API-Clients werden pro Folgeprojekt ergänzt.
