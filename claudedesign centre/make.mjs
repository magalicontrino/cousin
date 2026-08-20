/* Canvas « Le centre — quatre façons de chercher ».
   Même méthode que les autres : la VRAIE feuille de style de index.html, les vraies
   tuiles capturées dans l'app, polices et pictos collés en data-URI.
   Relancer :  node make.mjs   puis re-semer le canvas. */
import { readFileSync, writeFileSync } from 'node:fs';

const APP = '/Users/magalicontrino/Projets/cousin';

let CSS = /<style>([\s\S]*?)<\/style>/.exec(readFileSync(`${APP}/index.html`, 'utf8'))[1];
const GARDEES = ['eastman-regular.woff2', 'eastman-demibold.woff2', 'eastman-bold.woff2'];
CSS = CSS.replace(/@font-face\{[^}]*\}/g, bloc => {
  const f = /font\/([a-z0-9-]+\.woff2)/.exec(bloc);
  if (!f) return bloc;
  if (GARDEES.indexOf(f[1]) < 0) return '';
  const b64 = readFileSync(`${APP}/font/${f[1]}`).toString('base64');
  return bloc.replace(/url\(['"]?font\/[^)'"]+['"]?\)/, `url(data:font/woff2;base64,${b64})`);
});

const cachePic = {};
const picUri = nom => {
  if (!cachePic[nom]) cachePic[nom] = 'data:image/svg+xml;base64,' +
    Buffer.from(readFileSync(`${APP}/picto/${nom}`, 'utf8'), 'utf8').toString('base64');
  return cachePic[nom];
};
CSS = CSS.replace(/picto\/([A-Za-z0-9_.-]+\.svg)/g, (t, f) => { try { return picUri(f); } catch (e) { return t; } });

/* ⚠ Un masque ne survit pas dans un `style=` d'artboard : une classe par dessin. */
let CSS_PIC = '';
const vues = [];
const picClasse = nom => {
  const cls = 'pic-' + nom.replace(/[^A-Za-z0-9]+/g, '-').replace(/-svg$/, '');
  if (vues.indexOf(cls) < 0) { vues.push(cls); const u = picUri(nom);
    CSS_PIC += `.${cls}{-webkit-mask-image:url(${u});mask-image:url(${u})}\n`; }
  return cls;
};
const pic = (nom, t) => `<span class="pico ${picClasse(nom)}"${t ? ` style="width:${t}px;height:${t}px"` : ''}></span>`;
const capt = h => h.replace(/<span class="pico" style="[^"]*picto\/([A-Za-z0-9_.-]+\.svg)[^"]*"><\/span>/g,
  (t, f) => `<span class="pico ${picClasse(f)}"></span>`);

/* ══════════ le vrai contenu du Centre, relevé dans l'app ══════════ */
const FAM = [
  { nom: 'Le travail avec la personne', c: '#A9C8E8', portes: [
    { t: 'Protocole',            s: '6 méthodes',                    p: 'conduite.svg',       bg: '#fd8fd0' },
    { t: 'Démarches',            s: 'Réquisitoire · AMU · RIS',       p: 'demarches.svg',      bg: '#A9C8E8' },
    { t: 'Mails et notes',       s: '17 modèles à copier',            p: 'mails.svg',          bg: '#f6e7a8' },
    { t: 'Les schémas à donner', s: 'Une feuille A4, dans sa langue', p: 'demarches.svg',      bg: '#A9C8E8' },
    { t: 'Le règlement',         s: 'Ce qu’on explique à l’arrivée',  p: 'conduite.svg',       bg: '#f6e7a8' } ] },
  { nom: 'Éduc / Activités', c: '#f8763f', portes: [
    { t: 'Éduc',        s: 'Sorties, culture, groupes de parole', p: 'accompagnement.svg', bg: '#f8763f' },
    { t: 'Activités',   s: 'Sorties · Article 27',                p: 'ticket.svg',         bg: '#1b1b1b', clair: 1 },
    { t: 'Autour d’ici', s: 'Le quartier',                        p: 'adresse.svg',        bg: '#fdfdfc' } ] },
  { nom: 'Apprendre', c: '#b28b7a', portes: [
    { t: 'Formations',      s: '19 modules',           p: 'formations.svg', bg: '#1b1b1b', clair: 1 },
    { t: 'Les jeux',        s: '8 façons de réviser',  p: 'favoris.svg',    bg: '#6cb392' },
    { t: 'Le dictionnaire', s: '49 mots de chez nous', p: 'formations.svg', bg: '#b28b7a' } ] }
];
const TOUTES = FAM.flatMap(f => f.portes.map(p => ({ ...p, fam: f.nom, fc: f.c })));

/* ══════════ ce qui n'existe que dans les pistes ══════════ */
const CSS_PZ = `
html,body{width:375px;background:var(--creme);margin:0}
.ecran{width:375px;min-height:100vh;padding:16px 16px 28px}
.lg{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);margin:0 0 16px}

/* ── A · LES TROIS FAMILLES SE DÉPLOIENT ──
   La page est TROIS LIGNES au repos. On touche une famille, elle s'ouvre vers le
   bas ; les autres restent fermées. C'est le geste du wiki de la fiche et du
   bouton « Où ? » : une seule façon d'ouvrir les choses dans l'app. */
.az{display:flex;align-items:center;gap:14px;width:100%;text-align:left;color:var(--noir);
  background:#fdfdfc;border:1.25px solid var(--trait);border-radius:16px;
  padding:14px;margin-bottom:10px;min-height:74px}
.az .rd{width:44px;height:44px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center}
.az .tx{flex:1;min-width:0}
.az .tx b{display:block;font-size:16.5px;font-weight:600;line-height:1.2}
.az .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--enc2);margin-top:4px}
.az .chv{flex:none;width:30px;height:30px;border-radius:50%;background:#f2f0ed;
  display:flex;align-items:center;justify-content:center;font-size:15px;color:#57554f}
.az.ouvert{margin-bottom:0;border-radius:16px 16px 0 0;border-bottom-color:transparent}
.adedans{border:1.25px solid var(--trait);border-top:0;border-radius:0 0 16px 16px;
  background:#fdfdfc;padding:0 14px 8px;margin-bottom:10px}
.adedans .li{display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid var(--ligne)}
.adedans .li i{width:10px;height:10px;border-radius:50%;flex:none}
.adedans .li b{flex:1;font-size:15.5px;font-weight:600}
.adedans .li em{font-style:normal;font-family:ui-monospace,monospace;font-size:8.5px;
  letter-spacing:.12em;text-transform:uppercase;color:var(--enc2)}

/* ── B · UN SEUL RAIL ──
   Plus de familles empilées : elles deviennent des pastilles de filtre, comme au
   Réseau, et dessous UNE seule liste, d'un seul rythme. */
.bz{display:flex;align-items:center;gap:12px;width:100%;text-align:left;color:var(--noir);
  padding:15px 2px;border-bottom:1px solid var(--ligne)}
.bz i{width:11px;height:11px;border-radius:50%;flex:none}
.bz .tx{flex:1;min-width:0}
.bz .tx b{display:block;font-size:16px;font-weight:600;line-height:1.2}
.bz .tx em{font-style:normal;display:block;font-size:13.5px;line-height:1.45;color:#57554f;margin-top:3px}
.bz .chv{flex:none;font-size:17px}

/* ── C · PAR LA QUESTION ──
   Le même contenu, nommé par ce qu'on est en train de FAIRE au lieu du rayon dans
   lequel il est rangé. « J'accompagne quelqu'un » n'est pas un titre de tiroir,
   c'est la phrase qu'on a en tête en sortant du bureau. */
.cz{display:block;width:100%;text-align:left;color:var(--noir);background:#fdfdfc;
  border:1.25px solid var(--trait);border-radius:16px;padding:16px;margin-bottom:12px}
.cz .q{display:flex;align-items:baseline;gap:10px}
.cz .q b{flex:1;font-size:19px;font-weight:600;line-height:1.25;letter-spacing:-.01em}
.cz .q .chv{flex:none;font-size:17px;color:var(--enc2)}
.cz .liste{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}
.cz .liste span{display:inline-flex;align-items:center;border-radius:999px;padding:6px 11px;
  font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--noir)}

/* ── D · TOUT À PLAT ──
   Ni familles, ni couleurs : onze lignes identiques, dans l'ordre où on s'en sert.
   Rien à apprendre — c'est un menu, pas une page. */
.dz{display:flex;align-items:center;gap:13px;width:100%;text-align:left;color:var(--noir);
  padding:16px 2px;border-bottom:1px solid var(--ligne)}
.dz .ic{width:21px;height:21px;flex:none}
.dz b{flex:1;font-size:16.5px;font-weight:500}
.dz .n{flex:none;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--enc2)}
.dz .chv{flex:none;font-size:16px;color:var(--enc2);margin-left:10px}
`;

const page = (corps, h) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>${CSS}
${CSS_PIC}
${CSS_PZ}</style>
</helmet>
${corps}
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":375,"height":${h}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`;

/* ══════════ 0. TEL QUEL — les vraies tuiles ══════════ */
const tuile = p => capt(
  `<button class="otile${p.clair ? ' noir' : ''}"${p.clair ? '' : ` style="background:${p.bg}"`}>
     <b>${p.t}</b><em>${p.s}</em>
     <span class="ic" style="color:${p.clair ? '#f5c542' : '#1b1b1b'}">${pic(p.p)}</span>
   </button>`);
const MAIN = page(`<div class="ecran"><p class="lg">Le centre · tel qu'il est</p>` +
  FAM.map(f => `<div class="sectc"><b><i style="background:${f.c}"></i>${f.nom}</b><em></em></div>` +
    `<div class="ogrid">${f.portes.map(tuile).join('')}</div>`).join('') +
  `</div>`, 1180);

/* ══════════ A · LES TROIS FAMILLES SE DÉPLOIENT ══════════ */
const ligneA = (f, ouvert) => `<div class="az${ouvert ? ' ouvert' : ''}">
  <span class="rd" style="background:${f.c}">${pic(f.portes[0].p, 21)}</span>
  <span class="tx"><b>${f.nom}</b><em>${f.portes.length} portes</em></span>
  <span class="chv">${ouvert ? '⌃' : '›'}</span></div>` +
  (ouvert ? `<div class="adedans">${f.portes.map(p =>
    `<span class="li"><i style="background:${p.bg === '#1b1b1b' ? f.c : p.bg}"></i><b>${p.t}</b><em>${p.s.length > 22 ? '' : p.s}</em></span>`).join('')}</div>` : '');
const A = page(`<div class="ecran"><p class="lg">A · les familles se déploient</p>` +
  ligneA(FAM[0], true) + ligneA(FAM[1], false) + ligneA(FAM[2], false) + `</div>`, 700);

/* ══════════ B · UN SEUL RAIL ══════════ */
const B = page(`<div class="ecran"><p class="lg">B · un seul rail</p>
<div class="chips" style="margin-bottom:6px">
  <button class="chip neutre on" style="--c:var(--ligne)">Tout</button>
  ${FAM.map(f => `<button class="chip" style="--c:${f.c}">${f.nom.replace('Le travail avec la personne', 'Avec la personne')}</button>`).join('')}
</div>` +
  TOUTES.map(p => `<div class="bz"><i style="background:${p.bg === '#1b1b1b' ? p.fc : p.bg}"></i>
    <span class="tx"><b>${p.t}</b><em>${p.s}</em></span><span class="chv">›</span></div>`).join('') +
  `</div>`, 900);

/* ══════════ C · PAR LA QUESTION ══════════ */
const QUESTIONS = [
  { q: 'J’accompagne quelqu’un', portes: ['Protocole', 'Démarches', 'Mails et notes', 'Les schémas à donner', 'Le règlement'], c: '#A9C8E8' },
  { q: 'J’organise quelque chose', portes: ['Éduc', 'Activités', 'Autour d’ici'], c: '#f8763f' },
  { q: 'J’apprends le métier', portes: ['Formations', 'Les jeux', 'Le dictionnaire'], c: '#b28b7a' }
];
const C = page(`<div class="ecran"><p class="lg">C · par la question</p>` +
  QUESTIONS.map(q => `<div class="cz">
    <span class="q"><b>${q.q}</b><span class="chv">›</span></span>
    <span class="liste">${q.portes.map(t => {
      const p = TOUTES.find(x => x.t === t);
      return `<span style="background:${p.bg === '#1b1b1b' ? q.c : p.bg}">${t}</span>`;
    }).join('')}</span>
  </div>`).join('') + `</div>`, 620);

/* ══════════ D · TOUT À PLAT ══════════ */
const D = page(`<div class="ecran"><p class="lg">D · tout à plat</p>` +
  TOUTES.map(p => `<div class="dz"><span class="ic">${pic(p.p, 21)}</span>
    <b>${p.t}</b><span class="n">${p.s.length > 22 ? '' : p.s}</span><span class="chv">›</span></div>`).join('') +
  `</div>`, 800);

writeFileSync('Main.dc.html', MAIN);
writeFileSync('PisteA.dc.html', A);
writeFileSync('PisteB.dc.html', B);
writeFileSync('PisteC.dc.html', C);
writeFileSync('PisteD.dc.html', D);

const canvas = {
  artboards: [
    { file: 'Main.dc.html',   title: "Tel qu'il est",              x: 0,    y: 0, w: 375, h: 1180 },
    { file: 'PisteA.dc.html', title: 'A — les familles se déploient', x: 455, y: 0, w: 375, h: 700 },
    { file: 'PisteB.dc.html', title: 'B — un seul rail',            x: 910,  y: 0, w: 375, h: 900 },
    { file: 'PisteC.dc.html', title: 'C — par la question',         x: 1365, y: 0, w: 375, h: 620 },
    { file: 'PisteD.dc.html', title: 'D — tout à plat',             x: 1820, y: 0, w: 375, h: 800 }
  ],
  annotations: [
    { id: 'actuel', x: 0, y: -320, w: 375,
      text: "TEL QU'IL EST\n\nOnze portes, trois familles, huit couleurs de fond\ndifférentes, deux tailles de tuile.\n\nCe qui se passe à l'œil : on ne lit pas les mots, on trie\ndes rectangles colorés. La couleur ne veut rien dire ici —\nelle ne dit ni la famille (les cinq de la première ne\npartagent aucune teinte), ni l'urgence, ni la fréquence.\nC'est de la décoration, et elle occupe toute la place.\n\nEt il faut faire défiler deux écrans pour voir les onze." },
    { id: 'a', x: 455, y: -320, w: 375,
      text: "A — LES FAMILLES SE DÉPLOIENT\n\nLa page est TROIS LIGNES au repos. On touche une famille,\nelle s'ouvre vers le bas ; les autres restent fermées.\n\nC'est le geste que tu as choisi partout ailleurs\naujourd'hui : le wiki de la fiche, le bouton « Où ? ». Une\nseule façon d'ouvrir les choses dans l'app.\n\nCe qu'on gagne : tout tient dans l'écran, et on voit la\nstructure avant le contenu.\nCe qu'on perd : deux gestes pour atteindre une porte au lieu\nd'un." },
    { id: 'b', x: 910, y: -320, w: 375,
      text: "B — UN SEUL RAIL\n\nLes familles deviennent des pastilles de filtre, comme au\nRéseau, et dessous UNE seule liste d'un seul rythme.\n\nCe qu'on gagne : la même mécanique que le Réseau — rien de\nnouveau à apprendre — et une porte reste à un seul geste.\nCe qu'on perd : la liste fait onze lignes, il faut défiler\nou filtrer." },
    { id: 'c', x: 1365, y: -320, w: 375,
      text: "C — PAR LA QUESTION\n\nLe même contenu, nommé par ce qu'on est en train de FAIRE au\nlieu du rayon dans lequel c'est rangé. « J'accompagne\nquelqu'un » n'est pas un titre de tiroir, c'est la phrase\nqu'on a en tête en sortant du bureau.\n\nCe qu'on gagne : on n'a plus besoin de connaître le rangement\npour trouver.\nCe qu'on perd : une porte peut servir à deux questions — il\nfaudra accepter qu'elle apparaisse deux fois." },
    { id: 'd', x: 1820, y: -320, w: 375,
      text: "D — TOUT À PLAT\n\nNi familles, ni couleurs : onze lignes identiques, dans\nl'ordre où l'équipe s'en sert. Rien à apprendre — c'est un\nmenu, pas une page.\n\nCe qu'on gagne : le plus rapide de tous, et le plus calme.\nCe qu'on perd : onze lignes sans relief, on relit la liste\nchaque fois au lieu de viser une zone." },
    { id: 'question', x: 0, y: 1240, w: 830,
      text: "CE QUE JE TE PROPOSE DE REGARDER\n\nElles ne répondent pas à la même question :\n· A et D changent la QUANTITÉ à l'écran ;\n· B change la MÉCANIQUE (le filtre du Réseau) ;\n· C change les MOTS (le besoin au lieu du rayon).\n\nC est la seule qui touche au fond. Les trois autres rangent\nmieux ce qui existe ; celle-là demande de décider ce que\nl'équipe cherche vraiment quand elle ouvre cette page. Si\ntu hésites, c'est la question à trancher en premier — les\nformes suivront.\n\nElles se combinent aussi : les questions de C posées dans\nles lignes dépliantes de A, par exemple.\n\n⚠ Une chose vaut pour les quatre : LES COULEURS DE FOND\nPARTENT. Aujourd'hui huit teintes se disputent l'écran sans\nrien signifier. Dans les quatre pistes, la couleur ne sert\nplus qu'à repérer la famille — une pastille, pas un aplat." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait');
