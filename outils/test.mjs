import { pipeline } from '@xenova/transformers';
import fs from 'fs';
const V = JSON.parse(fs.readFileSync('../vecteurs.json', 'utf8'));
const embed = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small', { quantized: true });
const cos = (a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
for (const q of ["une femme enceinte sans papiers","quelqu'un qui dort dehors","il a mal aux dents","apprendre le français","une dame qui fuit son mari violent","activités gratuites pour les enfants"]) {
  const e = await embed('query: '+q, { pooling:'mean', normalize:true });
  const qv = Array.from(e.data);
  const top = V.fiches.map(f=>({nom:f.nom, s:cos(qv,f.v)})).sort((a,b)=>b.s-a.s).slice(0,4);
  console.log('\n«', q, '»');
  top.forEach(t=>console.log('  ', t.s.toFixed(3), t.nom));
}
