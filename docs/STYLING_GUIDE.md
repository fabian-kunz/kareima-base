# Styling Guide

## Design Tokens

Quelle: src/styles/tokens.css

- Primary: #02A77F
- Primary Dark: #0C6E5D
- Accent: #127C67
- Page Background: #F4F6F8
- Surface: #FFFFFF
- Border: #D8DEE4

## Spacing

- 4, 8, 12, 16, 24, 32 als Standardabstufungen
- Seitenabstand über .kareima-page
- Kartenflächen über .kareima-surface

## Theme Defaults (Vuetify)

- VTextField / VSelect / VAutocomplete:
  - variant solo-filled
  - bg-color grey-lighten-4
  - flat true

- VBtn:
  - rounded lg
  - Grundfarbe primary
  - Variant wird über BaseActionButton gesteuert

## Do and Don’t

- Do: Farben nur als Tokens oder Theme-Farben nutzen
- Do: Basis-Komponenten in Features wiederverwenden
- Don’t: Hex-Farben direkt in Views hart codieren
- Don’t: In jeder View eigene Feld-Defaults definieren
