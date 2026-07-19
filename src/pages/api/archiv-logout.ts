// Dateipfad: src/pages/api/archiv-logout.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { ARCHIV_SESSION_COOKIE } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(ARCHIV_SESSION_COOKIE, { path: '/' });
  return redirect('/archiv/login', 303);
};
