// Dateipfad: src/middleware.ts
//
// Läuft nur für serverseitig gerenderte Routen (alle Seiten mit
// `export const prerender = false;`, also /archiv/* und /api/*).
// Öffentliche, statisch gebaute Seiten durchlaufen diese Middleware nicht.

import { defineMiddleware } from 'astro:middleware';
import { ARCHIV_SESSION_COOKIE, verifySessionToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const istArchivRoute = pathname.startsWith('/archiv');
  const istLoginRoute = pathname === '/archiv/login' || pathname === '/archiv/login/';
  const istLoginApi = pathname === '/api/archiv-login';

  if (!istArchivRoute || istLoginRoute || istLoginApi) {
    return next();
  }

  const secret = import.meta.env.AUTH_SECRET;
  if (!secret) {
    // Fehlkonfiguration auf dem Server — im Zweifel sperren, nicht öffnen.
    return new Response('Archiv ist nicht konfiguriert (AUTH_SECRET fehlt).', { status: 500 });
  }

  const token = context.cookies.get(ARCHIV_SESSION_COOKIE)?.value;
  const authentifiziert = verifySessionToken(token, secret);

  if (!authentifiziert) {
    const ziel = encodeURIComponent(pathname);
    return context.redirect(`/archiv/login?weiter=${ziel}`);
  }

  return next();
});
