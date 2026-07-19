// Dateipfad: src/content.config.ts
import { defineCollection, reference, z } from 'astro:content';

/**
 * Epistemische Statusmarker des KUEPER Knowledge Graph.
 * Kanonische Quelle: schemas/entity.schema.json im KG-Repo.
 */
const status = z.enum(['[R]', '[T]', '[H]', '[S]', '[F]', '[I]', '[W]', '[OFFEN]']);

/** Die drei Ebenen des Werks. */
const ebene = z.enum(['ontologie', 'ethik', 'symbolsprache']);

/** Thematische Gruppen der Symbolsprache (für Filter im Glossar). */
const gruppe = z.enum([
  'ursprung-quelle',
  'bewegung-wandlung',
  'form-struktur',
  'bewusstsein-wahrnehmung',
  'polaritaeten-balance',
  'kernprinzipien',
  'erweiterte-operatoren',
]);

/**
 * Symbole der Omnizedenz-Symbolsprache.
 * entity_id verankert den Eintrag im KG (z. B. CON:L0:avi).
 */
const symbole = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    zeichen: z.string(),
    entity_id: z.string().optional(),
    kurz: z.string(),
    farbe: z.enum(['avi', 'chrona', 'reso', 'ink']).default('ink'),
    ebene: ebene.default('symbolsprache'),
    status: status.default('[OFFEN]'),
    gruppe: gruppe.optional(),
    stufe: z.enum(['I', 'II', 'kernprinzip']).default('I'),
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * Kapitel, Essays und Werkstattberichte.
 * bautAuf / resoniertMit bilden den Textgraphen ab; daraus werden
 * automatisch Rueckverweise erzeugt (siehe components/Rueckverweise.astro).
 */
const texte = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    entity_id: z.string().optional(),
    ebene: ebene,
    typ: z.enum(['Kapitel', 'Essay', 'Werkstattbuch', 'Fragment']).default('Essay'),
    band: z.string().optional(),
    kapitel: z.number().optional(),
    status: status.default('[OFFEN]'),
    symbole: z.array(reference('symbole')).default([]),
    bautAuf: z.array(reference('texte')).default([]),
    resoniertMit: z.array(reference('texte')).default([]),
    date: z.string().optional(),
    author: z.string().default('Thomas Peter Küper'),
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * Privates Archiv: rohe Werkstattnotizen, Entwürfe, Gedankensplitter.
 * Nicht redigiert, nicht für die öffentliche Philosophie-Darstellung gedacht.
 * Wird ausschließlich unter /archiv/* gerendert, das per Middleware
 * passwortgeschützt ist (siehe src/middleware.ts).
 */
const archiv = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    reifegrad: z.enum(['rohidee', 'entwurf', 'reift', 'bereit-fuer-oeffentlich']).default('rohidee'),
    bezug: z.array(z.string()).default([]), // freie Stichworte, z. B. Bezug zu texte/-Slugs
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * Buchprojekte rund um die Omnizedenz — Übersicht mit Leseprobe.
 * Diese Seite ist ein Schaufenster, kein Volltext: die eigentlichen
 * Manuskripte liegen außerhalb des Repos. Wissenschaftliche Bezüge in den
 * Leseproben tragen konsequent Statusmarker, da sie philosophische Deutung
 * sind, keine belegte Wissenschaft.
 */
const buecher = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    untertitel: z.string().optional(),
    zielgruppe: z.string(),
    umfang: z.string().optional(),
    ton: z.string().optional(),
    status: z.enum(['geplant', 'in-arbeit', 'lektorat', 'erschienen']).default('geplant'),
    fortschritt: z.number().min(0).max(100).optional(),
    kernaussage: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { symbole, texte, archiv, buecher };
