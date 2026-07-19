# Omnizedenz

Website zur Vertiefung des philosophischen Konzepts **Omnizedenz** — ein
Arbeitsmodell für Resonanz, Verantwortung und das Verhältnis von Welt,
Bewusstsein und Zeit im Werk von Thomas Peter Küper.

## Rolle im Ökosystem

Omnizedenz ist Teil des KUEPER-Ökosystems (Ökosystem-Code `OMNI`) und Source of
Truth für die vertiefte Ausarbeitung des Kernbegriffs. Dieses Projekt steht
bewusst **unabhängig** neben `thomas-kueper.de`: keine Migration, keine
Abhängigkeit — beide Orte dürfen eigenständig über Omnizedenz schreiben.
Themenverwandte Einzelessays (z. B. zu Faust, Machiavelli,
Wirtschaftspsychologie) bleiben ausschließlich bei `thomas-kueper.de` und sind
nicht Teil des Scopes hier. Details:
[`decisions/ECO-ARC-0010-2026-DE.md`](https://github.com/thomaspeterkueper/kueper-ecosystem/blob/main/decisions/ECO-ARC-0010-2026-DE.md)
im Repository `kueper-ecosystem`.

## Verbindliche Ökosystem-Regeln

Die vollständigen, aktuell gültigen Regeln für alle KUEPER-Projekte stehen
zentral hier:

**[`kueper-ecosystem/docs/onboarding-template.md`](https://github.com/thomaspeterkueper/kueper-ecosystem/blob/main/docs/onboarding-template.md)**

Bitte auf diesen Link verweisen statt den Inhalt zu kopieren.

## Cross-Repository-Anforderungen

Änderungswünsche an andere Projekte werden nicht direkt committet, sondern als
External Task in `external-tasks/open/` des jeweiligen Ziel-Repositories
abgelegt. Anforderungen an Omnizedenz liegen entsprechend hier unter
`external-tasks/open/`. Format:
[`ECO-ARC-0006`](https://github.com/thomaspeterkueper/kueper-ecosystem/blob/main/decisions/ECO-ARC-0006-2026-DE.md).

## Privates Archiv (`/archiv/*`)

Neben der öffentlichen Philosophie-Darstellung gibt es einen passwortgeschützten
Bereich für unredigierte Werkstattnotizen (`src/content/archiv/`). Technisch:
die Seite bleibt größtenteils statisch (`output: 'static'`), nur `/archiv/*`
und `/api/archiv-*` sind über den `@astrojs/vercel`-Adapter server-seitig
gerendert (`export const prerender = false;`), damit das Passwort dort geprüft
werden kann. Middleware: `src/middleware.ts`. Auth-Logik: `src/lib/auth.ts`.

**Für den Betrieb notwendige Umgebungsvariablen** (lokal in `.env`, produktiv
in den Vercel-Projekteinstellungen — niemals ins Repo committen):

```
ARCHIV_PASSWORD_HASH=<erzeugt mit: npm run hash-password -- "DeinPasswort">
AUTH_SECRET=<beliebiger langer Zufallsstring, signiert die Session-Cookies>
```

Reifegrad-Stufen eines Archiveintrags: `rohidee → entwurf → reift →
bereit-fuer-oeffentlich`. Wird ein Gedanke reif genug, wandert er redigiert
nach `src/content/texte/` und wird damit Teil der öffentlichen Seite.
