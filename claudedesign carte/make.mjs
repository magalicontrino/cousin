/* Canvas « La carte du Réseau — l'aérer ».
   Même méthode que les autres : la VRAIE feuille de style de index.html, les vraies
   cartes capturées dans l'app, polices et pictos collés en data-URI.
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

/* ⚠ Un masque de picto ne survit pas dans un `style=` d'artboard (le moteur coupe
   l'attribut aux points-virgules, et data:…;base64,… en contient un). Une classe. */
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

/* ══════════ les quatre vraies cartes, capturées dans l'app ══════════ */
const M = [
  { nom: 'Accueil Montfort', com: 'Jette', pub: 'Femmes seules sans enfants',
    h: 'Présence 24h/24', etq: ['Réservé aux femmes', 'Sans enfants'] },
  { nom: 'Centre de prévention des violences conjugales et familiales', com: 'Bruxelles-Ville',
    pub: 'Femmes victimes de violences conjugales ou familiales, avec ou sans enfants',
    h: 'Permanence téléphonique 8h–21h (10h–17h le week-end)',
    etq: ['Réservé aux femmes', 'Violences conjugales', 'Avec enfants'] },
  { nom: 'Chèvrefeuille', com: 'Ixelles', pub: 'Femmes avec ou sans enfants (enfants de 6 ans maximum)',
    h: 'Accueil 24h/24 si place disponible · présence 24h/24',
    etq: ['Réservé aux femmes', 'Avec enfants'] },
  { nom: "Home Victor Du Pré (Œuvre de l'Hospitalité)", com: 'Bruxelles-Ville',
    pub: 'Femmes avec ou sans enfants', h: 'Accueil 24h/24 si place disponible · présence 24h/24',
    etq: ['Réservé aux femmes', 'Avec enfants'] }
];

const ACTUEL = M.map(x => capt(
  `<div class="frow2" role="button" style="margin-bottom:10px">
    <span class="rd" style="background:#f8763f"><span class="ic"><span class="pico" style="-webkit-mask-image:url('picto/logement.svg');mask-image:url('picto/logement.svg')"></span></span></span>
    <span class="tx"><b>${x.nom}</b><em>${x.com} · ${x.pub}</em><span class="fr2h">${x.h}</span></span>
    <button class="heart" aria-label="Favori"><span class="ic"><span class="pico" style="-webkit-mask-image:url('picto/favoris.svg');mask-image:url('picto/favoris.svg')"></span></span></button>
  </div>`)).join('');

/* ══════════ ce qui n'existe que dans les pistes ══════════ */
const CSS_PZ = `
html,body{width:375px;background:var(--creme);margin:0}
.ecran{width:375px;min-height:100vh;padding:16px}
.lg{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);margin:0 0 14px}

/* ── A · LA MÊME CARTE, RESPIRÉE ──
   Rien ne change de place. Ce qui change : la ligne du public quitte l'écriture
   machine en capitales pour la police de lecture, en minuscules ; les interlignes
   s'ouvrent ; les horaires n'ont plus le même gris que le reste. */
.cz-a{border-radius:10px;background:#fdfdfc;border:1.25px solid var(--trait);
  padding:15px 15px;display:flex;align-items:flex-start;gap:13px;width:100%;
  text-align:left;color:var(--noir);margin-bottom:12px}
.cz-a .rd{width:34px;height:34px;border-radius:50%;background:#f8763f;flex:none;
  display:flex;align-items:center;justify-content:center;margin-top:2px}
.cz-a .rd .pico{width:17px;height:17px}
.cz-a .tx{flex:1;min-width:0}
.cz-a .tx b{display:block;font-size:16px;font-weight:600;line-height:1.25}
.cz-a .tx .qui{display:block;font-size:14px;line-height:1.5;color:#57554f;margin-top:5px}
.cz-a .tx .hh{display:block;font-size:12.5px;line-height:1.45;color:#8b8984;margin-top:6px}
.cz-a .et{flex:none;width:20px;height:20px;color:#cfccc6;margin-top:3px}

/* ── B · LE REGISTRE ──
   Plus de cadre du tout : des lignes séparées par un filet, comme un annuaire.
   L'air vient des marges, pas des boîtes. Deux fois plus d'adresses à l'écran. */
.cz-b{display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;
  color:var(--noir);padding:16px 2px;border-bottom:1px solid var(--ligne)}
.cz-b:first-child{border-top:1px solid var(--ligne)}
.cz-b .cz-pt{width:9px;height:9px;border-radius:50%;background:#f8763f;flex:none;margin-top:7px}
.cz-b .tx{flex:1;min-width:0}
.cz-b .tx b{display:block;font-size:16.5px;font-weight:600;line-height:1.25}
.cz-b .tx .qui{display:block;font-size:14px;line-height:1.5;color:#57554f;margin-top:4px}
.cz-b .ou{display:block;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.16em;
  text-transform:uppercase;color:#8b8984;margin-top:7px}

/* ── C · LE NOM D'ABORD ──
   Le nom prend toute la largeur, seul sur sa ligne : plus de retour à la ligne au
   milieu d'un nom long. Dessous, une ligne de lecture et les étiquettes déjà posées
   par l'équipe — ce sont elles qui disent « réservé aux femmes », pas une phrase. */
.cz-c{border-radius:12px;background:#fdfdfc;border:1.25px solid var(--trait);
  padding:16px;width:100%;text-align:left;color:var(--noir);margin-bottom:12px;display:block}
.cz-c .haut{display:flex;align-items:flex-start;gap:10px}
.cz-c .haut b{flex:1;font-size:17px;font-weight:600;line-height:1.25;letter-spacing:-.005em}
.cz-c .haut .et{flex:none;width:20px;height:20px;color:#cfccc6}
.cz-c .qui{display:block;font-size:14px;line-height:1.55;color:#57554f;margin-top:8px}
.cz-c .pastilles{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.cz-c .pz{display:inline-flex;align-items:center;gap:6px;border-radius:999px;
  padding:5px 10px;font-family:ui-monospace,monospace;font-size:8.5px;
  letter-spacing:.12em;text-transform:uppercase;color:var(--noir)}
.cz-c .ou{display:block;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.16em;
  text-transform:uppercase;color:#8b8984;margin-top:10px}

/* ── D · GROUPÉ PAR COMMUNE ──
   La commune quitte chaque ligne et devient un intertitre. On cesse de la relire
   quinze fois, et on voit d'un coup ce qu'il y a près d'ici. */
.cz-tete{display:flex;align-items:baseline;gap:10px;margin:22px 0 4px}
.cz-tete b{font-family:ui-monospace,monospace;font-size:10px;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase}
.cz-tete em{font-style:normal;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:#8b8984}
.cz-tete .fil{flex:1;height:1px;background:var(--ligne)}
.cz-d{display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;
  color:var(--noir);padding:15px 2px;border-bottom:1px solid var(--ligne)}
.cz-d .tx{flex:1;min-width:0}
.cz-d .tx b{display:block;font-size:16px;font-weight:600;line-height:1.25}
.cz-d .tx .qui{display:block;font-size:14px;line-height:1.5;color:#57554f;margin-top:4px}
.cz-d .et{flex:none;width:20px;height:20px;color:#cfccc6;margin-top:2px}

/* ── E · LA VUE D'ENSEMBLE (son idée, 20/08/2026 : « et pourquoi pas une vue
   d'ensemble avec des boutons qui se déploient ? ») ──
   On n'ouvre plus sur trente adresses : on ouvre sur SIX QUESTIONS. « Réservé aux
   femmes · 8 » se lit en une seconde, et les huit adresses n'arrivent que si on le
   demande. C'est le même geste que le carnet de la fiche et que le bouton « Où ? » :
   une seule façon d'ouvrir les choses dans toute l'app.
   Le rond pastel porte la couleur du groupe, pas celle du domaine — c'est lui qui
   distingue les lignes les unes des autres, puisqu'elles ont toutes la même forme. */
.cz-e{display:flex;align-items:center;gap:14px;width:100%;text-align:left;color:var(--noir);
  background:#fdfdfc;border:1.25px solid var(--trait);border-radius:14px;
  padding:13px 15px;margin-bottom:10px;min-height:66px}
.cz-e .rd{width:42px;height:42px;border-radius:50%;flex:none;
  display:flex;align-items:center;justify-content:center}
.cz-e .rd .pico{width:21px;height:21px}
.cz-e .tx{flex:1;min-width:0}
.cz-e .tx b{display:block;font-size:16px;font-weight:600;line-height:1.25}
.cz-e .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:#8b8984;margin-top:4px}
.cz-e .chv{flex:none;width:30px;height:30px;border-radius:50%;background:#f2f0ed;
  display:flex;align-items:center;justify-content:center;font-size:15px;color:#57554f}
.cz-e.ouvert{margin-bottom:0;border-radius:14px 14px 0 0;border-bottom-color:transparent}
.cz-dedans{border:1.25px solid var(--trait);border-top:0;border-radius:0 0 14px 14px;
  background:#fdfdfc;padding:2px 15px 8px;margin-bottom:10px}
.cz-dedans .li{display:flex;align-items:flex-start;gap:11px;padding:13px 0;
  border-top:1px solid var(--ligne)}
.cz-dedans .li b{display:block;font-size:15.5px;font-weight:600;line-height:1.25}
.cz-dedans .li .qui{display:block;font-size:13.5px;line-height:1.5;color:#57554f;margin-top:3px}
.cz-dedans .li .ou{display:block;font-family:ui-monospace,monospace;font-size:8.5px;
  letter-spacing:.16em;text-transform:uppercase;color:#8b8984;margin-top:5px}
.cz-dedans .tout{display:block;width:100%;text-align:left;padding:12px 0 6px;
  border-top:1px solid var(--ligne);color:var(--noir);
  font-family:ui-monospace,monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase}
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

/* la couleur d'une étiquette, reprise de la palette validée */
const COUL = { 'Réservé aux femmes': '#f3c6da', 'Réservé aux hommes': '#a9c8e8',
  'Violences conjugales': '#fd8fd0', 'Avec enfants': '#6cb392', 'Sans enfants': '#6fc7d9',
  'Sans rendez-vous': '#f5c542' };

/* ══════════ 0. TEL QUEL ══════════ */
const MAIN = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 21 fiches</p>${ACTUEL}</div>`, 812);

/* ══════════ A · LA MÊME CARTE, RESPIRÉE ══════════ */
const A = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 21 fiches</p>` +
  M.map(x => `<div class="cz-a">
    <span class="rd">${pic('logement.svg', 17)}</span>
    <span class="tx"><b>${x.nom}</b><span class="qui">${x.pub}</span><span class="hh">${x.h}</span></span>
    <span class="et">${pic('favoris.svg', 20)}</span>
  </div>`).join('') + `</div>`, 812);

/* ══════════ B · LE REGISTRE ══════════ */
const B = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 21 fiches</p>` +
  M.map(x => `<div class="cz-b">
    <span class="cz-pt"></span>
    <span class="tx"><b>${x.nom}</b><span class="qui">${x.pub}</span><span class="ou">${x.com}</span></span>
  </div>`).join('') + `</div>`, 812);

/* ══════════ C · LE NOM D'ABORD ══════════ */
const C = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 21 fiches</p>` +
  M.map(x => `<div class="cz-c">
    <span class="haut"><b>${x.nom}</b><span class="et">${pic('favoris.svg', 20)}</span></span>
    <span class="qui">${x.pub}</span>
    <span class="pastilles">${x.etq.map(e =>
      `<span class="pz" style="background:${COUL[e] || '#e8e6e2'}">${e}</span>`).join('')}</span>
    <span class="ou">${x.com}</span>
  </div>`).join('') + `</div>`, 900);

/* ══════════ D · GROUPÉ PAR COMMUNE ══════════ */
const parCommune = {};
M.forEach(x => { (parCommune[x.com] = parCommune[x.com] || []).push(x); });
const D = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 21 fiches</p>` +
  Object.keys(parCommune).map(com => `<div class="cz-tete"><b>${com}</b><span class="fil"></span><em>${parCommune[com].length}</em></div>` +
    parCommune[com].map(x => `<div class="cz-d">
      <span class="tx"><b>${x.nom}</b><span class="qui">${x.pub}</span></span>
      <span class="et">${pic('favoris.svg', 20)}</span>
    </div>`).join('')).join('') + `</div>`, 812);

/* ══════════ E · LA VUE D'ENSEMBLE ══════════ */
/* Les comptes sont les VRAIS comptes des maisons d'accueil (relevés le 20/08/2026). */
const GROUPES = [
  ['Réservé aux femmes', 8,  '#f3c6da', 'femme.svg'],
  ['Réservé aux hommes', 5,  '#a9c8e8', 'homme.svg'],
  ['Familles',           13, '#6cb392', 'educatif.svg'],
  ['Urgence',            7,  '#e63329', 'urgences.svg'],
  ['Sans rendez-vous',   4,  '#f5c542', 'horaires.svg'],
  ['Insertion',          7,  '#b28b7a', 'accompagnement.svg']
];
const ligneE = (g, ouvert) => `<div class="cz-e${ouvert ? ' ouvert' : ''}">
  <span class="rd" style="background:${g[2]}">${pic(g[3], 21)}</span>
  <span class="tx"><b>${g[0]}</b><em>${g[1]} adresse${g[1] > 1 ? 's' : ''}</em></span>
  <span class="chv">${ouvert ? '\u2303' : '\u203A'}</span>
</div>`;
const E = page(`<div class="ecran"><p class="lg">Maisons d'accueil · 30 fiches</p>` +
  ligneE(GROUPES[0], true) +
  `<div class="cz-dedans">` +
    M.slice(0, 3).map(x => `<span class="li"><span class="tx"><b>${x.nom}</b>` +
      `<span class="qui">${x.pub}</span><span class="ou">${x.com}</span></span></span>`).join('') +
    `<button class="tout">Les 8 adresses \u203A</button>` +
  `</div>` +
  GROUPES.slice(1).map(g => ligneE(g, false)).join('') +
  `</div>`, 980);
writeFileSync('PisteE.dc.html', E);

writeFileSync('Main.dc.html', MAIN);
writeFileSync('PisteA.dc.html', A);
writeFileSync('PisteB.dc.html', B);
writeFileSync('PisteC.dc.html', C);
writeFileSync('PisteD.dc.html', D);

const canvas = {
  artboards: [
    { file: 'Main.dc.html',   title: "Tel qu'il est",                x: 0,    y: 0, w: 375, h: 812 },
    { file: 'PisteA.dc.html', title: 'A — la même carte, respirée',   x: 455,  y: 0, w: 375, h: 812 },
    { file: 'PisteB.dc.html', title: 'B — le registre',               x: 910,  y: 0, w: 375, h: 812 },
    { file: 'PisteC.dc.html', title: "C — le nom d'abord",            x: 1365, y: 0, w: 375, h: 900 },
    { file: 'PisteD.dc.html', title: 'D — groupé par commune',        x: 1820, y: 0, w: 375, h: 812 },
    { file: 'PisteE.dc.html', title: "E — la vue d'ensemble",          x: 2275, y: 0, w: 375, h: 980 }
  ],
  annotations: [
    { id: 'actuel', x: 0, y: -300, w: 375,
      text: "TEL QU'IL EST\n\nCe sont les vraies cartes de l'app.\n\nCe qui empêche de lire :\n· la ligne du public est en ÉCRITURE MACHINE, EN CAPITALES,\n  9 px, grise — c'est la ligne la plus longue de la carte et\n  la plus dure à lire des quatre ;\n· le rond orange est LE MÊME sur les vingt et une fiches :\n  il prend la place d'un mot et n'apprend rien ;\n· trois blocs de gris différents se suivent sans respirer ;\n· quatre cartes remplissent déjà l'écran." },
    { id: 'a', x: 455, y: -300, w: 375,
      text: "A — LA MÊME CARTE, RESPIRÉE\n\nRien ne bouge de place. Le public passe en écriture de\nlecture, en minuscules, 14 px, avec de l'interligne. Les\nhoraires reculent d'un ton. Les marges s'ouvrent.\n\nCe qu'on gagne : ça se lit, sans rien réapprendre.\nCe qu'on perd : rien — mais les cartes restent hautes, on\nen voit toujours quatre." },
    { id: 'b', x: 910, y: -300, w: 375,
      text: "B — LE REGISTRE\n\nPlus de cadre : des lignes séparées par un filet, comme un\nannuaire. L'air vient des marges, pas des boîtes. La\ncommune passe en dessous, en petit.\n\nCe qu'on gagne : deux fois plus d'adresses à l'écran, et\nune page beaucoup plus calme.\nCe qu'on perd : les cartes ne se détachent plus une à une —\nc'est une liste, pas un jeu de fiches." },
    { id: 'c', x: 1365, y: -300, w: 375,
      text: "C — LE NOM D'ABORD\n\nLe nom prend toute la largeur, seul : plus de nom coupé en\ntrois. Dessous une ligne de lecture, puis les étiquettes que\nl'équipe a posées — ce sont elles qui disent « réservé aux\nfemmes », en couleur, au lieu d'une phrase grise.\n\nCe qu'on gagne : on repère une maison de femmes sans lire.\nCe qu'on perd : la carte est plus haute, on en voit trois." },
    { id: 'd', x: 1820, y: -300, w: 375,
      text: "D — GROUPÉ PAR COMMUNE\n\nLa commune quitte chaque ligne et devient un intertitre. On\ncesse de la relire quinze fois, et on voit d'un coup ce\nqu'il y a près d'ici.\n\nCe qu'on gagne : la question « c'est où ? » est répondue\navant d'être posée.\nCe qu'on perd : l'ordre n'est plus celui des favoris ni de\nla proximité — il faut choisir lequel commande." },
    { id: 'e', x: 2275, y: -300, w: 375,
      text: "E — LA VUE D'ENSEMBLE (ton idée)\n\nOn n'ouvre plus sur trente adresses : on ouvre sur SIX\nQUESTIONS. « Réservé aux femmes · 8 » se lit en une seconde,\net les huit adresses n'arrivent que si on le demande.\n\nC'est le même geste que le carnet de la fiche et que le\nbouton « Où ? » : une seule façon d'ouvrir les choses dans\ntoute l'app.\n\nCe qu'on gagne : la page tient dans l'écran, et elle pose la\nbonne question au lieu d'aligner des noms.\nCe qu'on perd : une adresse peut être dans deux groupes (une\nmaison de femmes AVEC enfants) — il faut choisir si elle\napparaît deux fois, ou une seule et laquelle.\n⚠ Et il reste à trancher : est-ce que ces six groupes\nREMPLACENT la rangée d'étiquettes, ou est-ce qu'ils font\ndoublon avec elle ?" },
    { id: 'question', x: 0, y: 1060, w: 800,
      text: "CE QUE JE TE PROPOSE\n\nA et B répondent à « pas aéré » ; C et D répondent à « pas\nagréable à lire » d'une autre façon — en changeant ce qu'on\nlit, pas seulement comment.\n\nElles se combinent : on peut prendre l'aération de A, les\nétiquettes de C et le groupement de D. Dis-moi ce que tu\ngardes de chacune, je monte le mélange.\n\nUne chose vaut pour les quatre : LA LIGNE DU PUBLIC QUITTE\nLES CAPITALES. C'est elle qui fatigue — 9 px d'écriture\nmachine en majuscules sur trois lignes, personne ne lit ça\njusqu'au bout." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait');
