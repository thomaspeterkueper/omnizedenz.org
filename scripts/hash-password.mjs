#!/usr/bin/env node
// Dateipfad: scripts/hash-password.mjs
//
// Nutzung:  npm run hash-password -- "MeinGeheimesPasswort"
// Ausgabe:  ein "salt:hash"-String für ARCHIV_PASSWORD_HASH in .env
//
// Läuft rein lokal, sendet nichts irgendwohin. Das Passwort selbst wird
// nirgends gespeichert — nur der Hash landet in .env (das per .gitignore
// nie ins Repo gelangt).

import { scryptSync, randomBytes } from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Bitte Passwort als Argument übergeben:');
  console.error('  npm run hash-password -- "MeinGeheimesPasswort"');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('\nFüge das in deine .env ein:\n');
console.log(`ARCHIV_PASSWORD_HASH=${salt}:${hash}`);
console.log('\n(und ergänze zusätzlich AUTH_SECRET=<beliebiger langer Zufallsstring>)\n');
