import { pipeline } from '@xenova/transformers';
import fs from 'fs';
const V = JSON.parse(fs.readFileSync('../vecteurs.json', 'utf8'));
const embed = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small', { quantized: true });
const cos = (a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const cas = [
  ["une femme enceinte sans papiers", true], ["quelqu'un qui dort dehors", true],
  ["une dame qui fuit son mari violent", true], ["activités gratuites pour les enfants", true],
  ["il a mal aux dents", false], ["apprendre le français", false],
  ["réparer ma voiture", false], ["aide alimentaire colis", true],
  ["se doucher et laver son linge", true], ["avocat gratuit", true]
];
for (const [q, attendu] of cas) {
  const e = await embed('query: '+q, { pooling:'mean', normalize:true });
  const qv = Array.from(e.data);
  const scores = V.fiches.map(f=>cos(qv,f.v)).sort((a,b)=>b-a);
  const mediane = scores[Math.floor(scores.length/2)];
  const marge = scores[0]-mediane;
  console.log((attendu?'DOIT trouver ':'PAS de fiche '), q.padEnd(38), 'top', scores[0].toFixed(3), 'marge', marge.toFixed(3));
}
