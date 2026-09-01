#!/usr/bin/env node
// Vérifie que tous les blocs <script> de index.html sont du JavaScript valide.
// Sort en erreur (code 1) au premier bloc cassé, en disant quelle ligne.
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const fichier = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(fichier, 'utf8');

const re = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let m, n = 0, casses = 0;
while ((m = re.exec(html)) !== null) {
  const attrs = m[1] || '';
  if (/\ssrc\s*=/i.test(attrs)) continue;                 // script externe : rien à lire
  const type = (attrs.match(/type\s*=\s*["']?([^"'\s>]+)/i) || [])[1] || '';
  if (type && !/javascript|module/i.test(type)) continue;  // json, template… : pas du JS
  n++;
  const ligne = html.slice(0, m.index).split('\n').length;
  try {
    new vm.Script(m[2], { filename: `${path.basename(fichier)} bloc ${n} (ligne ${ligne})` });
  } catch (e) {
    casses++;
    console.error(`\n✗ Bloc ${n}, qui commence ligne ${ligne} : ${e.message}`);
  }
}

if (casses) {
  console.error(`\n${casses} bloc(s) cassé(s) sur ${n}. Le fichier ferait planter l'app.\n`);
  process.exit(1);
}
console.log(`✓ ${n} blocs de code lus, tous corrects.`);
