# Komponenten- und Variantenleitfaden

Dieser Leitfaden definiert, wann welche Basis-Komponente und welche Variante genutzt wird.

## KActionButton

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

## KTextField

- Immer für normale Texteingaben verwenden
- Standard: solo-filled, grey-lighten-4, flat
- Nicht direkt v-text-field in Fach-Views verwenden, wenn kein Sonderfall vorliegt

## KFilterPanel

- Nutzen für Listen/Tabellen-Ansichten mit Suche/Filter
- Enthalten: Layout-Wrapper für Filterzeilen plus Reset-Aktion
- Eingabefelder werden je View per Slot eingebettet
- Keine fachliche Default-Struktur in der Basis-Komponente hinterlegen

## KConfirmDialog

- Immer für kritische oder irreversible Aktionen verwenden
- Titel und Nachricht müssen explizit sein
- `confirm-intent="danger"` nur für echte Lösch- oder irreversible Aktionen

## KAlert

- Für sichtbare Statusmeldungen im Seiteninhalt nutzen
- Typen: `info`, `success`, `warning`, `error`
- Standard: `variant="tonal"`

## KSnackbar

- Für kurze, temporäre Rückmeldungen nach Aktionen nutzen
- Position: unten rechts
- Typische Dauer: 2 bis 3 Sekunden

## KTable

- Für einfache tabellarische Übersichten nutzen
- Übergabe über `headers` und `items`
- Enthält bereits Lade- und Empty-State
- Optional: `autoHeightOffset`, wenn die Tabellenhöhe aus dem Viewport berechnet werden soll

## KContainer

- Jede Hauptseite startet mit `KContainer`
- Header über `title`, `subtitle`, `header-actions` und `header-content` aufbauen
- `#body` für den scrollbaren Seiteninhalt nutzen

## Layout-Regeln

- Das Seitenlayout erfolgt über `AppShellLayout` mit seitlicher Navigation
- Hintergrund der Applikationsfläche: #dfe0eb
- Fachliche Inhalte liegen immer im weißen Inhaltscontainer
- Scrollverhalten läuft über `KContainer` und den Layout-Flex-Pfad, nicht über individuelle Overflow-Hacks in jeder View

## Variantenregeln insgesamt

- Elevated nur für die eine wichtigste Aktion
- Tonal für sekundäre Hauptaktionen
- Text für Hilfs- oder Kontextaktionen
- Flat nur in begründeten Einzelfällen (z. B. dichte Tabellenaktionen)
