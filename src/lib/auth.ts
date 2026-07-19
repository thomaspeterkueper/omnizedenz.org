// Dateipfad: src/lib/auth.ts
//
// Minimale, abhängigkeitsfreie Auth für den privaten Archiv-Bereich (/archiv/*).
// Kein Nutzerkonto, kein Drittanbieter — ein einzelnes Passwort für Thomas.
//
// Zwei Geheimnisse kommen ausschließlich aus Umgebungsvariablen (nie im Repo):
//   ARCHIV_PASSWORD_HASH  — Ausgabe von `npm run hash-password -- "<Passwort>"`
//   AUTH_SECRET            — beliebiger langer Zufallsstring, signiert die Session

import { scryptSync, timingSafeEqual, randomBytes, createHmac } from 'node:crypto';

const SESSION_COOKIE = 'archiv_session';
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 14; // 14 Tage

/** Erzeugt "salt:hash" für die Ablage in ARCHIV_PASSWORD_HASH. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/** Prüft ein eingegebenes Passwort gegen den gespeicherten "salt:hash"-Wert. */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const berechnet = scryptSync(password, salt, 64);
  const erwartet = Buffer.from(hash, 'hex');
  if (berechnet.length !== erwartet.length) return false;
  return timingSafeEqual(berechnet, erwartet);
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}

/** Erstellt einen signierten Session-Token (Ablaufzeit + HMAC). */
export function createSessionToken(secret: string): string {
  const payload = `${Date.now() + SESSION_MAX_AGE_S * 1000}`;
  const signatur = sign(payload, secret);
  return `${payload}.${signatur}`;
}

/** Verifiziert Signatur und Ablaufzeit eines Session-Tokens. */
export function verifySessionToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const [payload, signatur] = token.split('.');
  if (!payload || !signatur) return false;
  const erwartet = sign(payload, secret);
  const a = Buffer.from(signatur);
  const b = Buffer.from(erwartet);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(payload) > Date.now();
}

export const ARCHIV_SESSION_COOKIE = SESSION_COOKIE;
export const ARCHIV_SESSION_MAX_AGE_S = SESSION_MAX_AGE_S;
