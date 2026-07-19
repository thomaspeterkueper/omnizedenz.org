// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://omnizedenz.org',
  // 'static' bleibt der Default für alle öffentlichen Seiten (schnell, cachebar).
  // Nur Seiten mit `export const prerender = false;` (das Archiv unter /archiv/*
  // und die zugehörigen API-Routen) werden zur Laufzeit auf Vercel gerendert,
  // damit das Passwort serverseitig geprüft werden kann.
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
});
