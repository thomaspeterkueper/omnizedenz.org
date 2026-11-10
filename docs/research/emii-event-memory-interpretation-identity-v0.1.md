# Ereignis – Erinnerung – Interpretation – Identität (EMII v0.1)

**Status:** Entwurf / gemeinsame konzeptionelle Spezifikation  
**Datum:** 2026-11-10  
**Kontext:** Omnizedenz, noχ¹ᐃ, Living Legacy  
**Anschluss:** [Erinnerung, Zeit und ko-kreativer Wille](./erinnerung-zeit-und-ko-kreativer-wille.md)

## Grundsatz

Ein Ereignis ist nicht dasselbe wie eine Erinnerung an dieses Ereignis. Die Bedeutung einer Erinnerung kann wechseln, ohne dass die ursprüngliche Ereignisbehauptung überschrieben wird. Identität bezeichnet ein über die Zeit entstehendes, veränderbares Selbstmodell und darf nicht als unveränderliches Attribut oder als Beweis einer metaphysischen Seele modelliert werden.

```mermaid
flowchart LR
 E[Ereignisbehauptung] --> M[Erinnerung / Zeugenbericht]
 M --> I[Interpretation / Bedeutung]
 I --> S[Identitätszustand zur Zeit t]
 S --> F[Neue Fragen / Erfahrungen]
 F --> M
```

## Vier Entitäten und ihre getrennten Zeitachsen

### Ereignis (`event`)
- `id`, `event_type`, `occurred_at_start`, `occurred_at_end`, `time_precision`, `location_ref`
- `claim_text` (faktenartige Behauptung; **keine** ungeprüfte objektive Wahrheit)
- `source_refs[]`, `evidence_class` (direct_observation/document/recollection/inference/fictional_simulation), `confidence`
- `visibility`, `subject_ids[]`, `created_at`, `recorded_by`
- Zwei Ereignisversionen dürfen einander widersprechen. Widerspruch ist ein Datenzustand, kein automatischer Fehler.

### Erinnerung (`memory`)
- `id`, `rememberer_id`, `event_ids[]`, `recorded_at`, `recalled_at`, `text`
- `memory_type` (autobiographical/hearsay/learned/synthetic_npc), `source_refs[]`
- `confidence`, `affect_tags[]`, `sensory_cues[]`, `visibility`, `consent_ref`
- Neue Fassungen als **Append-only** revisions; ursprüngliche Fassung erhalten, sofern datenschutzrechtlich zulässig; Lösch-, Berichtigungs- und Zugriffssperren haben Vorrang.

### Interpretation (`interpretation`)
- `id`, `memory_ids[]`, `author_id`, `interpreted_at`, `meaning_text`
- `perspective`, `confidence`, `supersedes_id`, `reason_for_change`, `visibility`
- Eine geänderte Interpretation verändert nicht stillschweigend das Ereignis.

### Identitätszustand (`identity_state`)
- `id`, `subject_id`, `valid_from`, `valid_to`, `self_description`, `value_tags[]`
- `derived_from_interpretation_ids[]`, `agency_notes`, `uncertainty`, `visibility`
- Identitätszustände sind **Snapshot-Hypothesen**, keine Diagnosen und keine Behauptungen bewusster KI.

## Durchgängige Metadaten

- `provenance`: wer behauptet/erinnert/interpretiert, Quelltyp, Beleg und Übernahmezeit.
- `occurred_at` versus `recorded_at`: Ereigniszeit und Archivzeit dürfen nie verwechselt werden.
- `scope`: human_private / npc_simulation / public_historical; keine automatischen Übernahmen aus privaten Tagebüchern in die Simulation oder zwischen Personen.
- `epistemic_status`: corroborated / single_source / disputed / inferred / fictional.
- `subject_access`: Zugriff, Widerruf, Korrektur, Löschung und Export für reale Personen; keine pauschale unbegrenzte Forensik-Speicherung realer privater Inhalte.
- `relationships`: Begegnungen und gemeinsame Erinnerungen nur mit Autorisierung aller betroffenen realen Personen verknüpfen.

## Beispiel (vollständig fiktiv)

1. Ereignisbehauptung E1: „Eine Figur hörte 2047 in einer Stadtbibliothek ein Klavierstück.“ Quelle: NPC-Simulationsereignis, fiktiv.
2. Erinnerung M1, am nächsten Tag: „Die Melodie erinnerte mich an eine frühere Begegnung.“ Sicherheit: mittel.
3. Interpretation I1: „Die Bibliothek ist ein Ort der Geborgenheit.“
4. Neuer Erfahrungsbericht M2, zwei Monate später; Interpretation I2: „Ich mochte das Stück, aber nicht die Situation.“ I2 referenziert I1 als revidiert.
5. Identität S1 → S2: Die Figur beschreibt sich zunächst als „musikbegeistert“, später als „musikbegeistert, aber vorsichtig mit großen Gruppen“. Beide zeitbezogenen Selbstbeschreibungen bleiben als Verlauf nachvollziehbar.

## Invarianten (konzeptioneller Akzeptanzvertrag)

- A1: Neue Interpretation darf die gespeicherte Ereignisbehauptung nicht mutieren.
- A2: Ein Erinnerungseintrag muss Quelle und erinnernde Identität besitzen.
- A3: Jede Projektion der Identität ist auf einen Zeitpunkt bezogen und enthält Verweise auf Evidenz.
- A4: Zwei Aussagen über dasselbe Ereignis dürfen widersprechen und ihre unabhängige Provenienz behalten.
- A5: Unbelegte Rekonstruktionen dürfen nicht durch KI-Ausgabe als gesicherte Erinnerung ausgegeben werden.
- A6: Menschliche Inhalte dürfen nicht ohne Einwilligung in NPC-Training, öffentliche Profile oder geteilte Geschichten gelangen.
- A7: DSGVO-gerechte Lösch- und Korrekturprozesse gehen über ein generelles Append-only-Prinzip.
- A8: Aus den Daten wird kein Nachweis von Bewusstsein abgeleitet.

## Systemgrenzen

- **Omnizedenz:** Begriffliche Definition, philosophische Fragen und Wissenschaftsabgrenzung (dieses Dokument).
- **Living Legacy:** Biografische Erinnerungen, Quellen, Einwilligung, historische vs. fortentwickelnde digitale Gesprächspersönlichkeit. Zuerst Sicherheits- und Auth-Prüfung.
- **noχ¹ᐃ:** Nur NPC-/Simulationsereignisse als Runtime-Source-of-Truth, mit projektinterner Speicher- und Lernlogik. Kein Schattenweltzustand und keine automatische Übernahme personenbezogener Living-Legacy-Daten.
- **OTA/KG:** übergreifende Begriffe/Beziehungen mit eigener Kanonpflege; keine erfundenen OTA-/KG-IDs.

## Konkrete Tests

1. Event E1 + Memory M1 + Interpretation I1 + Snapshot S1 erzeugen, I2 anfügen: E1 und I1 unverändert.
2. Zwei widersprechende Erinnerungen zum selben Ereignis speichern: beide mit separater Quelle abrufbar.
3. Abgeleitete Identität ohne zulässige Quelle ablehnen.
4. Widerruf von Einwilligung: unzulässige Verknüpfungen und Zugriff wirksam entfernen, Löschpolicy prüfen.
5. NPC-Simulation vollständig vom privaten Living-Legacy-Datenraum isolieren.
6. Zeitabfragen: Was galt am Ereignistag, was war zu einem späteren Zeitpunkt bekannt und was wurde danach uminterpretiert?

## Offene Entscheidungen

- Soll Identität im Spiel als erklärbare Projektion aus autobiografischen Einträgen, Bedürfnissen, Beziehungen und kultureller Prägung berechnet werden?
- Welche Relevanz- und Vergessensregeln gelten für NPCs, ohne das historisch nachvollziehbare Simulationsprotokoll mit der jederzeit abrufbaren individuellen Erinnerung zu verwechseln?
- Wie wird bei realen Personen die Aussage „weiß ich nicht mehr“ ausdrücklich gespeichert, statt als Halluzination aufgefüllt?
- Wann dürfen zwei zuvor getrennte menschliche Lebensgeschichten miteinander in Beziehung gesetzt werden? **Nur nach granularer Einwilligung und unter Berücksichtigung der Rechte Dritter.**
