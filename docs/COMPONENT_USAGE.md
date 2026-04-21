# Komponenten- und Variantenleitfaden

Dieser Leitfaden definiert, wann welche Basis-Komponente und welche Variante genutzt wird.

## BaseActionButton

- `intent="primary"`
  - Zweck: Primäre Abschlussaktion auf einer Seite oder in einem Dialog
  - Beispiel: Speichern, Erstellen, Weiter
  - Mapping: color primary, variant elevated

- `intent="secondary"`
  - Zweck: Sekundäre, aber sichtbare Aktion
  - Beispiel: Zurücksetzen, Aktualisieren, Vorschau
  - Mapping: color primary, variant tonal

- `intent="danger"`
  - Zweck: Destruktive Aktion
  - Beispiel: Löschen, Entfernen
  - Mapping: color error, variant text

- `intent="ghost"`
  - Zweck: Unaufdringliche Hilfsaktion
  - Beispiel: Abbrechen, Schließen, Später
  - Mapping: color default, variant text

## BaseTextField

- Immer für normale Texteingaben verwenden
- Standard: solo-filled, grey-lighten-4, flat
- Nicht direkt v-text-field in Fach-Views verwenden, wenn kein Sonderfall vorliegt

## BaseFilterPanel

- Nutzen für Listen/Tabellen-Ansichten mit Suche/Filter
- Enthalten: Kategorien, Preis min/max, Sortierung, Reset
- Nutze ein einheitliches Filtermodell für alle Domains

## BaseConfirmDialog

- Immer für kritische oder irreversible Aktionen verwenden
- Titel und Nachricht müssen explizit sein
- `confirm-intent="danger"` nur für echte Lösch- oder irreversible Aktionen

## BaseAlert

- Für sichtbare Statusmeldungen im Seiteninhalt nutzen
- Typen: `info`, `success`, `warning`, `error`
- Standard: `variant="tonal"`

## BaseSnackbar

- Für kurze, temporäre Rückmeldungen nach Aktionen nutzen
- Position: unten rechts
- Typische Dauer: 2 bis 3 Sekunden

## BaseTable

- Für einfache tabellarische Übersichten nutzen
- Übergabe über `headers` und `items`
- Enthält bereits Lade- und Empty-State

## BasePageHeader

- Jede Hauptseite startet mit einem Header
- Enthält Titel, optional Untertitel und Action-Slot
- Maximal 1 primäre und 1-2 sekundäre Aktionen

## Layout-Regeln

- Das Seitenlayout erfolgt über BaseLayout mit seitlicher Navigation
- Hintergrund der Applikationsfläche: #dfe0eb
- Fachliche Inhalte liegen immer im weißen Inhaltscontainer
- Für klassische Overview-Seiten ist der Container-Block mit
  v-container fluid class="fill-height pa-0" im Inhaltsbereich erlaubt

## Variantenregeln insgesamt

- Elevated nur für die eine wichtigste Aktion
- Tonal für sekundäre Hauptaktionen
- Text für Hilfs- oder Kontextaktionen
- Flat nur in begründeten Einzelfällen (z. B. dichte Tabellenaktionen)
