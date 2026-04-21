# Analyse des bestehenden Supplier-Projekts

## Technischer Stand

- Stack: Vue 3, TypeScript, Vuetify, Pinia, Vue Router
- API: swagger-typescript-api mit zentralem API-Wrapper
- Rollen und Auth: Router-Guards und Auth-Store

## Wiederkehrende Muster

- Sehr viele Formfelder mit identischem Pattern: solo-filled, grey-lighten-4, flat
- Buttons mit wiederkehrender Farbgebung (#02A77F) in vielen Dateien
- Mehrere bestätigende Dialoge mit ähnlicher Struktur
- Filterleisten als Kombination aus Kategorie, Preisbereich und Sortierung

## Hauptprobleme

- Hardcodierte Farben statt zentralem Theme-Token
- UI-Duplikate (Dialoge, Action-Zeilen, Formfelder)
- Unterschiedliche Verwendung von Button-Varianten ohne Leitlinie

## Ableitung für das Basisprojekt

- Theme/Tokens als Single Source of Truth
- Basis-Komponenten statt Copy-and-Paste
- Dokumentation mit klaren Einsatzregeln für Varianten
