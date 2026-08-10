/* ═══════════════════════════════════════════════════════════════════════════
   SAUVER LE CATALOGUE — à lancer depuis le dossier du projet :
       node outils/sauver-catalogue.js

   POURQUOI CE FICHIER EXISTE (ma suggestion, acceptée par Mag le 09/08/2026).
   Les fiches du réseau n'existent qu'à DEUX endroits, et les deux sont en ligne :
   dans index.html sur GitHub, et rien d'autre. Un dépôt supprimé par erreur, un
   compte perdu, et c'est un an de travail à réécrire à la main.

   Ce script écrit une copie DATÉE dans sauvegardes/. Il ne lit pas la base : il
   lit le fichier de l'app, là où le catalogue est réellement écrit.

   ⚠ RYTHME PROPOSÉ : une fois par mois, et AVANT chaque grosse modification du
   catalogue. Une ligne est déposée chaque mois dans le chantier pour le rappeler.
   ⚠ Ces copies sont versionnées avec le reste : une sauvegarde qui reste sur un
   seul ordinateur ne sauve de rien.
   ═══════════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');

/* Le catalogue est écrit dans le premier gros bloc <script>, sous forme d'appels
   d()/tags()/formation()… On ne cherche pas à l'exécuter : on compte et on copie
   le bloc tel quel. Une sauvegarde doit être BÊTE — plus elle est maligne, plus
   elle a de raisons de se tromper le jour où on en a besoin. */
/* ⚠ PAS « LE PLUS GROS BLOC » : LE BON. Premier essai, on prenait le script le
   plus long — c'est celui de la navigation, pas celui des données, et la
   sauvegarde annonçait fièrement « 0 fiche ». On choisit maintenant le bloc qui
   contient le plus d'appels d("…"), c'est-à-dire celui où vivent les fiches. */
const blocs = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
const gros  = blocs.slice().sort(
  (a, b) => (b.match(/\bd\(\s*"/g) || []).length - (a.match(/\bd\(\s*"/g) || []).length
)[0] || '';

const compte = (re) => (gros.match(re) || []).length;
const stats = {
  fiches:     compte(/\bd\(\s*"/g),
  formations: compte(/\bformation\(\s*"/g),
  mails:      compte(/\bmailtpl\(\s*"/g),
  centre:     compte(/\bcentre\(\s*"/g)
};

const jour = new Date().toISOString().slice(0, 10);
const dossier = path.join(racine, 'sauvegardes');
fs.mkdirSync(dossier, { recursive: true });

const nom = path.join(dossier, `catalogue-${jour}.js`);
fs.writeFileSync(nom,
  `/* Sauvegarde du catalogue COUSIN — ${jour}\n` +
  `   Copie du bloc de données de index.html, telle quelle.\n` +
  `   Repères ce jour-là : ${JSON.stringify(stats)}\n` +
  `   Pour restaurer : recoller ce bloc dans index.html à la place de l'ancien. */\n\n` +
  gros);

console.log(`Sauvegarde écrite : sauvegardes/catalogue-${jour}.js`);
console.log(`  ${(gros.length / 1024).toFixed(0)} Ko —`, stats);
