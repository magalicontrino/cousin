/* Fabrique l'empreinte de sens (embedding) de chaque fiche COUSIN.
   Modèle : multilingual-e5-small (quantisé) — le même que celui que le téléphone
   chargera. E5 exige les préfixes « passage: » (fiches) et « query: » (question). */
import { pipeline } from '@xenova/transformers';
import fs from 'fs';

const fiches = JSON.parse(fs.readFileSync('fiches.json', 'utf8'));
const embed = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small', { quantized: true });

const vecteurs = [];
for (const f of fiches) {
  const texte = `passage: ${f.nom}. ${f.desc} ${f.tags||''} ${f.commune||''}`.slice(0, 512);
  const sortie = await embed(texte, { pooling: 'mean', normalize: true });
  // arrondi à 3 décimales : 4× plus léger, perte de précision négligeable
  vecteurs.push(Array.from(sortie.data).map(x => Math.round(x * 1000) / 1000));
  if (vecteurs.length % 50 === 0) console.log(vecteurs.length, '/', fiches.length);
}
fs.writeFileSync('../vecteurs.json', JSON.stringify({
  modele: 'Xenova/multilingual-e5-small',
  dims: vecteurs[0].length,
  fiches: fiches.map((f, i) => ({ nom: f.nom, domaine: f.domaine, v: vecteurs[i] }))
}));
console.log('vecteurs.json écrit :', vecteurs.length, 'fiches,', vecteurs[0].length, 'dimensions');
