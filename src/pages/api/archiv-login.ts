// Dateipfad: src/pages/api/archiv-login.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { ARCHIV_SESSION_COOKIE, ARCHIV_SESSION_MAX_AGE_S, createSessionToken, verifyPassword } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const passwort = String(form.get('passwort') ?? '');
  const weiter = String(form.get('weiter') ?? '/archiv/');

  const hash = import.meta.env.ARCHIV_PASSWORD_HASH;
  const secret = import.meta.env.AUTH_SECRET;

  if (!hash || !secret) {
    return new Response('Archiv ist nicht konfiguriert.', { status: 500 });
  }

  if (!verifyPassword(passwort, hash)) {
    const ziel = `/archiv/login?fehler=1&weiter=${encodeURIComponent(weiter)}`;
    return redirect(ziel, 303);
  }

  const token = createSessionToken(secret);
  cookies.set(ARCHIV_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: ARCHIV_SESSION_MAX_AGE_S,
  });

  const zielIntern = weiter.startsWith('/') ? weiter : '/archiv/';
  return redirect(zielIntern, 303);
};
