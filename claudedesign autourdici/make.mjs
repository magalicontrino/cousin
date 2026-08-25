/* Canvas « Autour d'ici — le plan ».
   4 pistes pour poser un PLAN sur la page, avec un moyen de basculer liste ↔ plan.
   Même méthode que les autres canvas : la VRAIE feuille de style de index.html,
   les vraies données (QUARTIER, QUARTIER_PLAN), polices et pictos en data-URI.
   Relancer :  node make.mjs   puis re-semer le canvas. */
import { readFileSync, writeFileSync } from 'node:fs';
import { schemaRues, LIEUX } from './rues.mjs';

const APP = '/Users/magalicontrino/Projets/cousin';
const SRC = readFileSync(`${APP}/index.html`, 'utf8');

/* ---------- la feuille de style de l'app, polices collées ---------- */
let CSS = /<style>([\s\S]*?)<\/style>/.exec(SRC)[1];
const GARDEES = ['eastman-regular.woff2', 'eastman-demibold.woff2', 'eastman-bold.woff2',
                 'eastman-grotesque-heavy.woff2'];
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

/* Les dessins qui n'ont pas de fichier : on va chercher le tracé dans ICONS. */
const traceIcon = nom => {
  const m = new RegExp("\\n\\s*" + nom + ":\\s*'([\\s\\S]*?)',\\n").exec(SRC);
  if (!m) throw new Error('tracé introuvable : ' + nom);
  return m[1];
};
const svgIcon = (nom, t) =>
  `<svg viewBox="0 0 24 24" fill="currentColor" style="width:${t}px;height:${t}px;display:block">${traceIcon(nom)}</svg>`;

/* Un dessin, quel que soit d'où il vient. */
const FICH = { cible:'cible.svg', linge:'linge.svg', colis:'colis.svg',
               pin:'adresse.svg', fil:'fil.svg', imprimer:'imprimer.svg',
               fleur:'fleur.svg' };
const dessin = (nom, t) => FICH[nom] ? pic(FICH[nom], t) : svgIcon(nom, t);

/* ════════════════════════════════════════════════════════════════════
   LES VRAIES DONNÉES DE LA PAGE (recopiées de index.html)
   ════════════════════════════════════════════════════════════════════ */
const QUARTIER = [
  { grp:"Au centre", lignes:[
    { t:"Les toilettes",  d:"Au centre, accessibles." },
    { t:"Le linge",       d:"La buanderie du centre." },
    { t:"Les produits",   d:"Distribution à l'accueil, le 1er samedi du mois." }
  ]},
  { grp:"Courses pas chères", lignes:[
    { t:"Aldi", d:"Le supermarché le plus proche.", adr:1 }
  ]},
  { grp:"Dépannage, tard le soir", lignes:[
    { t:"Night shops", d:"Au carrefour, juste en bas du centre. Ouverts tard — dépannage et cigarettes." }
  ]},
  { grp:"Se laver, laver son linge", lignes:[
    { t:"DoucheFLUX", d:"Douches et buanderie. Carte de membre nécessaire.", adr:1 }
  ]},
  { grp:"Prendre l'air — les parcs", lignes:[
    { t:"Parc Astrid",      d:"15 hectares, près du stade. Le plus grand du coin.", adr:1 },
    { t:"Parc du Peterbos", d:"Grand parc de quartier.", adr:1 },
    { t:"Parc Crickx",      d:"À Cureghem, plus petit.", adr:1 },
    { t:"Parc de la Pede",  d:"Campagne et étangs, à Neerpede. Plus loin, mais dépaysant.", adr:1 }
  ]}
];

/* Le rond pastel + le dessin de chaque lieu — le mapping exact de l'app. */
const Q_IC = { 'Les toilettes':['cible','#cfe6f5'], 'Le linge':['linge','#f7d9c6'],
  'Les produits':['colis','#f6e7a8'], 'Aldi':['panier','#d6ecdf'],
  'Night shops':['fil','#d8d3ef'], 'DoucheFLUX':['douche','#d6ecdf'],
  'Parc Astrid':['fleur','#dcefe4'], 'Parc du Peterbos':['fleur','#dcefe4'],
  'Parc Crickx':['fleur','#dcefe4'], 'Parc de la Pede':['fleur','#dcefe4'] };

/* Le plan : a = l'angle (0 = nord), r = l'éloignement (1 à 4), min = la marche.
   ⚠ Repris de QUARTIER_PLAN, avec DEUX écarts signalés dans la note du canvas :
     · l'arrêt Marius Renard a quitté la page le 25/08, il quitte le plan ici ;
     · « Night shops » n'a JAMAIS eu de repère — la ligne ci-dessous est une
       SUPPOSITION à partir de « au carrefour, juste en bas du centre ». */
const PLAN = [
  { t:'Aldi',                a: 20, r:1, min:5,  dir:'vers le nord' },
  { t:'Night shops',         a:180, r:1, min:2,  dir:'en bas du centre', suppose:true },
  { t:'Parc du Peterbos',    a:215, r:2, min:12, dir:'vers le sud-ouest' },
  { t:'Parc Astrid',         a:325, r:2, min:15, dir:'vers le nord-ouest' },
  { t:'Parc Crickx',         a: 40, r:3, min:28, dir:'vers le nord-est', da:-15 },
  { t:'DoucheFLUX',          a: 50, r:3, min:30, dir:'vers le nord-est', da: 15 },
  { t:'Parc de la Pede',     a:275, r:4, min:35, dir:'vers l’ouest' }
];

/* ════════════════════════════════════════════════════════════════════
   LE PLAN-BOUSSOLE, dessiné pour l'ÉCRAN (l'app n'en a un que pour le papier)
   Les ronds du plan portent le MÊME rond pastel et le MÊME dessin que les
   rangées de la liste : c'est ça qui fait que les deux vues se répondent
   sans qu'on ait besoin de numéros à mettre en correspondance.
   ════════════════════════════════════════════════════════════════════ */
function planSVG(W, H, opt) {
  opt = opt || {};
  const cx = W / 2, cy = H / 2 + (opt.dy || 0);
  const R = opt.anneaux || [40, 68, 94, 118];
  let g = '';
  R.forEach(rr => { g += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#d6d4d0" stroke-width="1" stroke-dasharray="3 5"/>`; });
  /* La flèche du nord : sans elle, un schéma de directions ne dit rien. */
  g += `<g transform="translate(${W - 22},22)">` +
       `<path d="M0 13 L0 -11 M0 -11 L-4.4 -4.4 M0 -11 L4.4 -4.4" stroke="#1b1b1b" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
       `<text x="0" y="25" text-anchor="middle" font-family="ui-monospace,monospace" font-size="8.5" letter-spacing="1" fill="#1b1b1b">N</text></g>`;
  const pts = PLAN.map(p => {
    const rad = (p.a + (p.da || 0) - 90) * Math.PI / 180, rr = R[p.r - 1];
    return { p, rad, x: cx + Math.cos(rad) * rr, y: cy + Math.sin(rad) * rr };
  });
  pts.forEach(q => { g += `<line x1="${cx}" y1="${cy}" x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" stroke="#1b1b1b" stroke-width="0.8" opacity="0.22"/>`; });
  let ronds = '';
  pts.forEach(q => {
    const ic = Q_IC[q.p.t], d = 30;
    ronds += `<div class="pdot" style="left:${(q.x - d / 2).toFixed(1)}px;top:${(q.y - d / 2).toFixed(1)}px;background:${ic[1]}${q.p.suppose ? ';border-style:dashed' : ''}">${dessin(ic[0], 16)}</div>`;
    /* le temps de marche, collé sous le rond : c'est la seule chose qu'on lit sur un plan à pied */
    const lo = rr => ({ x: cx + Math.cos(q.rad) * rr, y: cy + Math.sin(q.rad) * rr });
    const L = lo(R[q.p.r - 1] + 22);
    ronds += `<div class="pmin" style="left:${(L.x - 22).toFixed(1)}px;top:${(L.y - 6).toFixed(1)}px">${q.p.min}′</div>`;
  });
  return `<div class="plan" style="height:${H}px">` +
    `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${g}</svg>` +
    `<div class="pici" style="left:${(cx - 21)}px;top:${(cy - 21)}px">ICI</div>` + ronds + `</div>`;
}

/* Le plan de rues de la piste C — un DESSIN D'EXEMPLE, pas la vraie carte :
   les rues sont schématiques, seuls les angles et les distances sont ceux du plan. */
function ruesSVG(W, H) {
  const cx = W / 2, cy = H / 2;
  let g = `<rect width="${W}" height="${H}" fill="#eceae5"/>`;
  /* Les îlots : posés sur une trame, pour que le dessin tienne quelle que soit
     la hauteur de la scène (la piste C en demande 560, la vignette 300). */
  const cols = [0, .26, .46, .70, 1], rows = [0, .17, .34, .52, .70, .86, 1];
  for (let i = 0; i < cols.length - 1; i++) {
    for (let j = 0; j < rows.length - 1; j++) {
      if ((i + j) % 5 === 3) continue;                    /* des trous : des places, des carrefours */
      const x = cols[i] * W + 7, y = rows[j] * H + 7;
      const w = (cols[i + 1] - cols[i]) * W - 14, h = (rows[j + 1] - rows[j]) * H - 14;
      const vert = (i === 0 && j === 4) || (i === 3 && j === 0);   /* les deux parcs */
      g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${vert ? '#d9e8dc' : '#e0ddd6'}"/>`;
    }
  }
  /* Le boulevard, en biais : c'est lui qu'on reconnaît sur un plan. */
  const by1 = cy + H * .08, by2 = cy - H * .12;
  g += `<path d="M-10 ${by1.toFixed(1)} L${W + 10} ${by2.toFixed(1)}" stroke="#f7f6f3" stroke-width="18" fill="none"/>`;
  g += `<path d="M-10 ${by1.toFixed(1)} L${W + 10} ${by2.toFixed(1)}" stroke="#d8d4cb" stroke-width="1" fill="none"/>`;
  /* Les punaises : mêmes angles et mêmes distances que le plan-boussole. */
  const m = Math.min(W / 2, H / 2) - 26;
  const R = [m * .30, m * .53, m * .76, m];
  let pins = '';
  PLAN.forEach(p => {
    const rad = (p.a + (p.da || 0) - 90) * Math.PI / 180, rr = R[p.r - 1];
    const x = cx + Math.cos(rad) * rr, y = cy + Math.sin(rad) * rr, ic = Q_IC[p.t];
    pins += `<div class="pdot pin" style="left:${(x - 15).toFixed(1)}px;top:${(y - 15).toFixed(1)}px;background:${ic[1]}">${dessin(ic[0], 16)}</div>`;
  });
  return `<div class="plan rues" style="height:${H}px">` +
    `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${g}</svg>` +
    `<div class="pici" style="left:${cx - 21}px;top:${cy - 21}px">ICI</div>${pins}` +
    `<div class="exemple">Plan de rues · dessin d’exemple</div></div>`;
}

/* ---------- les morceaux de page ---------- */
const hero = (droite) => `<div class="hero">
  <button class="cbtn" aria-label="Retour"><span class="ic">${pic('chevron.svg', 18)}</span></button>
  <span class="htx"><h1>Autour d’ici</h1></span>
  ${droite || `<span class="hpic" style="color:#b28b7a"><span class="ic">${pic('adresse.svg', 26)}</span></span>`}
</div>`;

const imprimer = `<div class="imprligne"><button class="bimp">${pic('imprimer.svg', 14)}<span>Imprimer</span></button></div>`;

const rangee = (l) => {
  const ic = Q_IC[l.t] || ['pin', '#ecebe8'];
  return `<div class="frow2">
    <span class="rd" style="background:${ic[1]}"><span class="ic">${dessin(ic[0], 20)}</span></span>
    <span class="tx"><b>${l.t}</b><em>${l.d}</em></span>
    ${l.adr ? '<span class="chv">›</span>' : ''}
  </div>`;
};

const liste = () => QUARTIER.map(g =>
  `<div class="sectl">${g.grp}</div><div class="rlist">${g.lignes.map(rangee).join('')}</div>`).join('');

/* La légende du plan quand la liste n'est pas à l'écran (piste A). */
const legende = () => `<div class="lgd">` + PLAN.map(p => {
  const ic = Q_IC[p.t];
  return `<div class="lgl"><span class="rd sm" style="background:${ic[1]}"><span class="ic">${dessin(ic[0], 14)}</span></span>` +
    `<b>${p.t}</b><em>${p.min} min · ${p.dir}</em></div>`;
}).join('') + `</div>`;

/* ---------- l'habillage propre au canvas ---------- */
const CSS_AD = `
html,body{width:375px;background:var(--creme);margin:0;padding:0}
body{padding:0}
.ec{width:375px;background:var(--creme);overflow:hidden}
.tbar{height:56px;background:#fdfdfc;border-bottom:1px solid var(--ligne);display:flex;align-items:center;
  padding:0 14px;gap:8px}
.tbar .mot{font-family:'Eastman Grotesque','Eastman',sans-serif;font-weight:900;font-size:19px;letter-spacing:-.01em;flex:1}
.tbar .sq{width:34px;height:34px;border:1.25px solid var(--trait);border-radius:6px;display:flex;
  align-items:center;justify-content:center}
.pastille{position:absolute;top:-4px;right:-4px;width:9px;height:9px;border-radius:50%;background:var(--rouge)}
.hero{display:flex;align-items:center;gap:12px;background:var(--noir);color:var(--creme);padding:16px 16px}
.hero .cbtn{width:34px;height:34px;flex:none;border:1.5px solid rgba(240,239,237,.55);border-radius:50%;
  display:flex;align-items:center;justify-content:center;color:var(--creme)}
.hero .htx{flex:1;min-width:0}
.hero h1{font-family:'Eastman Grotesque','Eastman',sans-serif;font-weight:900;font-size:28px;line-height:1;
  letter-spacing:-.015em;text-transform:uppercase;margin:0;color:var(--creme)}
.hero .hpic{flex:none;display:flex;align-items:center}
.hero .hpic .pico{width:26px;height:26px}
.cbtn .pico,.hero .cbtn .ic{display:flex}
.imprligne{display:flex;justify-content:flex-end;padding:14px 16px 0}
.bimp{display:inline-flex;align-items:center;gap:8px;background:#fdfdfc;border:1.25px solid var(--trait);
  border-radius:8px;padding:10px 14px;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--noir)}
.sectl{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);padding:22px 16px 8px;border-bottom:1.5px solid var(--noir);margin:0 16px 12px;
  padding-left:0;padding-right:0}
.rlist{display:flex;flex-direction:column;gap:9px;padding:0 16px}
.frow2{display:flex;align-items:center;gap:13px;background:#fdfdfc;border:1.25px solid var(--trait);
  border-radius:12px;padding:12px 14px}
.frow2 .rd{width:40px;height:40px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center}
.frow2 .rd .ic,.frow2 .rd .pico{display:flex}
.frow2 .tx{flex:1;min-width:0}
.frow2 .tx b{display:block;font-family:'Eastman',sans-serif;text-transform:none;letter-spacing:0;
  font-size:16px;font-weight:600;line-height:1.22}
.frow2 .tx em{font-style:normal;display:block;font-family:'Eastman',sans-serif;text-transform:none;
  letter-spacing:0;font-size:13px;font-weight:400;color:#4a4844;margin-top:3px;line-height:1.35}
.frow2 .chv{flex:none;font-size:19px;opacity:.45}

/* ── LE PLAN ── */
.plan{position:relative;width:343px;margin:0 16px;background:#fdfdfc;border:1.25px solid var(--trait);
  border-radius:12px;overflow:hidden}
.plan svg{display:block}
.plan.rues{border-radius:0;margin:0;width:375px;border-left:0;border-right:0}
.pici{position:absolute;width:42px;height:42px;border-radius:50%;background:var(--noir);color:var(--creme);
  display:flex;align-items:center;justify-content:center;font-family:ui-monospace,monospace;font-size:10px;
  letter-spacing:.1em;font-weight:700}
.pdot{position:absolute;width:30px;height:30px;border-radius:50%;border:1.25px solid var(--trait);
  display:flex;align-items:center;justify-content:center;background:#fff}
.pdot.pin{width:30px;height:30px;box-shadow:0 1px 4px rgba(0,0,0,.16)}
.pdot .pico,.pdot svg{display:block}
.pmin{position:absolute;width:44px;text-align:center;font-family:ui-monospace,monospace;font-size:9px;
  color:#4a4844;letter-spacing:.04em}
.exemple{position:absolute;left:10px;top:10px;font-family:ui-monospace,monospace;font-size:8.5px;
  letter-spacing:.12em;text-transform:uppercase;color:#6a675f;background:rgba(253,253,252,.86);
  padding:4px 7px;border-radius:4px}
.psous{font-family:ui-monospace,monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--enc2);padding:8px 16px 0;text-align:center}

/* ── la légende (piste A, quand la liste n'est pas là) ── */
.lgd{display:flex;flex-direction:column;gap:2px;padding:16px 16px 0}
.lgl{display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid var(--ligne)}
.lgl b{font-family:'Eastman',sans-serif;text-transform:none;letter-spacing:0;font-size:14.5px;font-weight:600;flex:none}
.lgl em{font-style:normal;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--enc2);margin-left:auto;text-align:right}
.rd.sm{width:26px;height:26px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center}

/* ── A · LES DEUX ONGLETS ──
   Le choix est écrit, en toutes lettres, au même endroit à chaque visite. */
.seg{display:flex;gap:0;margin:14px 16px 0;border:1.25px solid var(--trait);border-radius:9px;overflow:hidden}
.segb{flex:1;padding:13px 0;font-family:ui-monospace,monospace;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;text-align:center;background:#fdfdfc;color:var(--noir)}
.segb + .segb{border-left:1.25px solid var(--trait)}
.segb.on{background:var(--noir);color:var(--creme)}

/* ── B · LE PLAN EN TÊTE, LA LISTE DESSOUS ──
   Pas d'onglet du tout : les deux sont là. Le plan se replie si on ne veut que lire. */
.replier{display:flex;align-items:center;justify-content:space-between;margin:0 16px;padding:11px 0 0}
.replier .t{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);white-space:nowrap}
.replier button{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--noir);border-bottom:1.25px solid var(--noir);padding-bottom:2px}

/* ── C · LA CARTE D'ABORD, LA FEUILLE MONTE ── */
.scene{position:relative;height:560px;overflow:hidden;background:#eceae5}
.feuille{position:absolute;left:0;right:0;background:var(--creme);border-top:1.5px solid var(--trait-fort);
  border-radius:16px 16px 0 0;box-shadow:0 -3px 18px rgba(0,0,0,.13);transition:top .28s cubic-bezier(.22,1,.36,1);
  overflow:hidden;bottom:0}
.poignee{display:flex;flex-direction:column;align-items:center;gap:9px;padding:10px 0 4px}
.poignee .barre{width:44px;height:4px;border-radius:2px;background:#c9c6c0}
.poignee .t{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--enc2);white-space:nowrap}
.fondu{position:absolute;left:0;right:0;bottom:0;height:46px;pointer-events:none;
  background:linear-gradient(to bottom,rgba(240,239,237,0),var(--creme))}

/* ── D · UNE PORTE DANS LA LISTE ── */
.porte{display:flex;align-items:center;gap:13px;margin:14px 16px 0;background:var(--noir);color:var(--creme);
  border-radius:12px;padding:14px 15px}
.porte .rd{width:40px;height:40px;border-radius:50%;flex:none;background:#b28b7a;display:flex;
  align-items:center;justify-content:center;color:var(--noir)}
.porte .tx{flex:1;min-width:0}
.porte .tx b{display:block;font-family:'Eastman',sans-serif;text-transform:none;letter-spacing:0;
  font-size:16px;font-weight:600;line-height:1.2}
.porte .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:rgba(240,239,237,.72);margin-top:4px}
.porte .chv{flex:none;font-size:19px;opacity:.6}
.fin{height:22px}

/* la fausse coupe des vignettes de comparaison */
.coupe{width:375px;overflow:hidden;border:1.25px solid var(--ligne);border-radius:10px;background:var(--creme)}
.etiq{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);margin:0 0 8px}
.etiq b{color:var(--noir);font-weight:600}
.pileq{display:flex;flex-direction:column;gap:26px;padding:20px 0 24px;width:375px}
.pileq > div{padding:0 0 0 0}
`;

let CSS_PLUS = '';

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
${CSS_AD}
${CSS_PLUS}</style>
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

/* Une page dont l'interrupteur MARCHE : on peut cliquer pour voir l'autre vue. */
const pageVive = (corps, h, logique) => `<!doctype html>
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
${CSS_AD}
${CSS_PLUS}</style>
</helmet>
${corps}
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":375,"height":${h}}}'>
${logique}
</script>
</body>
</html>
`;

const TBAR = `<div class="tbar"><span class="mot">COUSIN</span>
  <span class="sq" style="position:relative">${pic('listes.svg', 17)}<i class="pastille"></i></span>
  <span class="sq">${pic('roue.svg', 16)}</span></div>`;

/* ═══════════════════════════════════════════════════════════════════════════
   PISTE A RETENUE (Mag, 25/08/2026), avec ce qu'elle a demandé en plus :
     · le plan devient un SCHÉMA DES VRAIES RUES (OpenStreetMap, relevé le 25/08) ;
     · un bouton qui ouvre la vraie carte — « comme ça en cas de mauvaise
       connexion il y aura la map » : le schéma est dessiné par l'app, il
       s'affiche toujours ; le bouton, lui, a besoin du réseau.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Les 8 aires de la rose des vents, en toutes lettres : « sud-est » se lit,
   « 124° » ne se lit pas. */
const AIRES = ['nord','nord-est','est','sud-est','sud','sud-ouest','ouest','nord-ouest'];
const enMots = cap => AIRES[Math.round(cap / 45) % 8];

/* La flèche d'un lieu lointain, tournée à son VRAI cap. */
const flecheCap = (cap, t) => `<svg viewBox="0 0 24 24" style="width:${t}px;height:${t}px;display:block;` +
  `transform:rotate(${cap}deg)" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" ` +
  `stroke-linejoin="round"><path d="M12 20V4M12 4l-6 6M12 4l6 6"/></svg>`;

/* ---- LE SCHÉMA DES RUES, monté en HTML (le SVG pour les rues, des ronds
        posés par-dessus pour les lieux — comme les rangées de la liste) ---- */
function carteRues(W, H) {
  const S = schemaRues(W, H, { lieux: [{ nom: 'Parc du Peterbos' }] });
  let sur = '';
  S.dedans.forEach(({ L, p }) => {
    const ic = Q_IC[L.nom] || ['pin', '#ecebe8'];
    sur += `<div class="pdot pin" style="left:${(p[0] - 16).toFixed(1)}px;top:${(p[1] - 16).toFixed(1)}px;background:${ic[1]}">${dessin(ic[0], 17)}</div>`;
    sur += `<div class="pnom" style="left:${(p[0] - 60).toFixed(1)}px;top:${(p[1] + 18).toFixed(1)}px">${L.nom.replace('Parc du ', '')}</div>`;
  });
  /* L'échelle : sans elle, « c'est loin » ne veut rien dire. 200 m ≈ 2 min à pied. */
  const px200 = 200 * S.k;
  const ech = `<div class="ech"><span class="bar" style="width:${px200.toFixed(0)}px"></span><span>200 m · 2 min</span></div>`;
  return `<div class="plan rues" style="height:${H}px">` +
    `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${S.svg}</svg>` +
    `<div class="pici" style="left:${(S.cx - 22).toFixed(1)}px;top:${(S.cy - 22).toFixed(1)}px">ICI</div>` +
    sur + ech + `<div class="nord">N</div></div>`;
}

/* ---- « PLUS LOIN » : ce qui ne tient pas dans 750 m. Une flèche à son vrai
        cap, la direction en toutes lettres, le temps de marche. ---- */
const plusLoin = () => {
  const L = ['Aldi', 'Parc Astrid', 'Parc Crickx', 'DoucheFLUX', 'Parc de la Pede'];
  return `<div class="sectl">Plus loin — à pied</div><div class="loinl">` +
    L.map(n => {
      const d = LIEUX[n], ic = Q_IC[n] || ['pin', '#ecebe8'];
      return `<div class="loin"><span class="rd sm" style="background:${ic[1]}">${dessin(ic[0], 14)}</span>` +
        `<b>${n}</b><span class="cap">${flecheCap(d.cap, 15)}</span>` +
        `<em>${enMots(d.cap)} · ${d.min} min</em></div>`;
    }).join('') + `</div>`;
};

/* ---- LE BOUTON MAPS ----
   ⚠ CE BOUTON A BESOIN DU RÉSEAU, et c'est exactement pourquoi le schéma
   au-dessus est dessiné par l'app : quand ça ne passe pas, il reste le plan. */
const boutonMaps = `<div class="mapsligne">
  <button class="bmaps">${dessin('pin', 15)}<span>Ouvrir dans Maps</span></button>
</div>`;

CSS_PLUS = `
.plan.rues{width:343px;margin:0 16px;border-radius:12px}
.pnom{position:absolute;width:120px;text-align:center;font-family:'Eastman',sans-serif;font-size:11px;
  font-weight:600;color:var(--noir);text-shadow:0 0 3px #eceae5,0 0 3px #eceae5,0 0 3px #eceae5}
.ech{position:absolute;left:10px;bottom:9px;display:flex;align-items:center;gap:7px;
  font-family:ui-monospace,monospace;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:#5d5a54;
  background:rgba(236,234,229,.9);padding:4px 7px;border-radius:4px}
.ech .bar{height:5px;border-left:1.5px solid #5d5a54;border-right:1.5px solid #5d5a54;border-bottom:1.5px solid #5d5a54}
.nord{position:absolute;right:9px;top:8px;width:22px;height:22px;border-radius:50%;background:rgba(236,234,229,.9);
  display:flex;align-items:center;justify-content:center;font-family:ui-monospace,monospace;font-size:9px;
  font-weight:700;color:var(--noir)}
.pdot.pin{width:32px;height:32px;box-shadow:0 1px 5px rgba(0,0,0,.18)}

.mapsligne{display:flex;justify-content:flex-end;padding:12px 16px 0}
.mapsdit{flex:1;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--enc2);line-height:1.4}
.bmaps{flex:none;display:inline-flex;align-items:center;gap:8px;background:var(--noir);color:var(--creme);
  border-radius:8px;padding:11px 14px;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.12em;
  text-transform:uppercase}
.bmaps .pico{background:var(--creme)}

.loinl{display:flex;flex-direction:column;gap:0;padding:0 16px}
.loin{display:flex;align-items:center;gap:11px;padding:11px 0;border-bottom:1px solid var(--ligne)}
.loin b{font-family:'Eastman',sans-serif;font-size:15px;font-weight:600;flex:1;min-width:0}
.loin .cap{flex:none;color:var(--noir);display:flex}
.loin em{font-style:normal;flex:none;width:124px;text-align:right;font-family:ui-monospace,monospace;
  font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--enc2)}

/* la planche des écarts */
.cmp{padding:18px 16px}
.cmp h2{font-family:'Eastman Grotesque','Eastman',sans-serif;font-weight:900;font-size:20px;
  text-transform:uppercase;letter-spacing:-.01em;margin:0 0 4px}
.cmp table{width:100%;border-collapse:collapse;margin-top:14px}
.cmp th{font-family:ui-monospace,monospace;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--enc2);text-align:left;padding:0 6px 7px 0;border-bottom:1.5px solid var(--noir);font-weight:400}
.cmp td{font-size:12px;padding:9px 6px 9px 0;border-bottom:1px solid var(--ligne);vertical-align:top}
.cmp td.n{font-weight:600}
.cmp td.faux{font-family:ui-monospace,monospace;font-size:10px;color:#a8332b;text-transform:uppercase;letter-spacing:.06em}
.cmp td.vrai{font-family:ui-monospace,monospace;font-size:10px;color:#1b1b1b;text-transform:uppercase;letter-spacing:.06em}
.cmp .src{font-size:11px;color:#4a4844;line-height:1.5;margin-top:14px}
`;

/* ---- la page, avec l'onglet ouvert en paramètre (Liste ou Plan) ---- */
const pageA = (depart) => pageVive(`<div class="ec">
${TBAR}
${hero()}
<div class="seg">
  <button class="segb" onClick="{{ voirListe }}" style="{{ sListe }}">Liste</button>
  <button class="segb" onClick="{{ voirPlan }}" style="{{ sPlan }}">Plan</button>
</div>
<sc-if value="{{ estListe }}" hint-placeholder-val="{{ ${depart === 'liste'} }}">
  ${imprimer}
  ${liste()}
</sc-if>
<sc-if value="{{ estPlan }}" hint-placeholder-val="{{ ${depart === 'plan'} }}">
  ${boutonMaps}
  <div style="height:11px"></div>
  ${carteRues(343, 340)}
  ${plusLoin()}
  <div style="height:12px"></div>
  ${imprimer}
</sc-if>
<div class="fin"></div>
</div>`, depart === 'plan' ? 1020 : 1410, `
class Component extends DCLogic {
  renderVals() {
    const on = 'background:#1b1b1b;color:#f0efed';
    const off = 'background:#fdfdfc;color:#1b1b1b';
    const l = (this.state && this.state.vue ? this.state.vue : '${depart}') !== 'plan';
    return {
      estListe: l, estPlan: !l,
      sListe: l ? on : off, sPlan: l ? off : on,
      voirListe: () => this.setState({ vue: 'liste' }),
      voirPlan: () => this.setState({ vue: 'plan' })
    };
  }
}`);

/* ---- le schéma seul, en grand : c'est le dessin qu'on juge ---- */
const SCHEMA = page(`<div class="ec" style="padding:18px 0">
<p class="etiq" style="padding:0 16px">Le schéma, en grand</p>
${carteRues(343, 420)}
<div class="fin"></div>
</div>`, 480);

/* ---- ⚠ LA PLANCHE DES ÉCARTS ----
   Ce n'est pas du design : c'est ce que les vraies adresses disent, mis en face
   de ce que la page dit aujourd'hui. Le commentaire de `QUARTIER_PLAN` prévenait
   déjà (« à faire vérifier par quelqu'un qui connaît le quartier ») — voilà ce
   que la vérification donne. */
const ECARTS = [
  ['Aldi',             'nord · 5 min',       'sud · 18 min',      'Et ce n’est pas « le plus proche » : un Delhaize est à 9 min, chée de Ninove 1024.'],
  ['Parc Astrid',      'nord-ouest · 15 min','sud · 24 min',      'Il est près du stade, en dessous du centre — pas au-dessus.'],
  ['Parc Crickx',      'nord-est · 28 min',  'sud-est · 31 min',  'Cureghem est à l’est, en descendant vers le canal.'],
  ['DoucheFLUX',       'nord-est · 30 min',  'sud-est · 41 min',  'Rue des Vétérinaires, à 2,5 km : ce n’est pas une marche de 30 min.'],
  ['Parc de la Pede',  'ouest · 35 min',     'sud-ouest · 47 min','Neerpede est en bas à gauche, pas plein ouest.'],
  ['Parc du Peterbos', 'sud-ouest · 12 min', 'sud-ouest · 9 min', 'Le seul qui était juste.']
];
const CORR = page(`<div class="ec"><div class="cmp">
<h2>Ce que le plan dit,<br>et ce que disent les adresses</h2>
<p class="etiq" style="margin-top:10px">Relevé le 25/08/2026</p>
<table>
  <tr><th style="width:31%">Lieu</th><th style="width:24%">La page dit</th><th style="width:24%">Les adresses disent</th></tr>
  ${ECARTS.map(e => `<tr><td class="n">${e[0]}</td><td class="faux">${e[1]}</td><td class="vrai">${e[2]}</td></tr>
  <tr><td colspan="3" style="border:0;padding:0 0 12px;font-size:11px;color:#4a4844;line-height:1.45">${e[3]}</td></tr>`).join('')}
</table>
<p class="src"><b>D’où ça vient.</b> Chaque lieu a été repris à SON ADRESSE, celle de sa fiche,
et replacé par rapport au centre (Bd Prince de Liège 38). Les tracés de rues et les
positions viennent d’OpenStreetMap, relevés le 25/08/2026.</p>
<p class="src"><b>Ce qui reste à vérifier par quelqu’un du quartier.</b> Les temps sont calculés
(distance à vol d’oiseau × 1,3, à 5 km/h) : ils disent l’ordre de grandeur, pas l’itinéraire.
Et « Night shops » n’a toujours pas d’adresse — il n’est donc sur aucun plan.</p>
<div class="fin"></div>
</div></div>`, 820);

writeFileSync('Main.dc.html', pageA('liste'));
writeFileSync('Plan.dc.html', pageA('plan'));
writeFileSync('Schema.dc.html', SCHEMA);
writeFileSync('Corrections.dc.html', CORR);

const canvas = {
  artboards: [
    { file: 'Main.dc.html',        title: 'A — l’onglet Liste',       x: 0,    y: 0, w: 375, h: 1410 },
    { file: 'Plan.dc.html',        title: 'A — l’onglet Plan',        x: 455,  y: 0, w: 375, h: 1020 },
    { file: 'Schema.dc.html',      title: 'Le schéma, en grand',      x: 910,  y: 0, w: 375, h: 480 },
    { file: 'Corrections.dc.html', title: '⚠ Ce qui ne colle pas',    x: 910,  y: 560, w: 375, h: 820 }
  ],
  annotations: [
    { id: 'ce-qui-change', x: 455, y: -430, w: 830,
      text: "TU AS PRIS A — LES DEUX ONGLETS. VOILÀ CE QUI A CHANGÉ DEPUIS.\n\n1 · LE PLAN EST MAINTENANT UN SCHÉMA DES VRAIES RUES.\n    Plus de cercles abstraits : les boulevards Mettewie, Prince de Liège, la chaussée de Ninove, la Grande Ceinture\n    sont là où ils sont vraiment. Les tracés viennent d'OpenStreetMap, relevés le 25/08/2026.\n    Il tient 750 m autour du centre — au-delà, sur 375 px, une rue n'est plus une rue, c'est un trait gris.\n\n2 · LE BOUTON « OUVRIR DANS MAPS ».\n    C'est bien dans ce sens-là que ça marche : le schéma est DESSINÉ PAR L'APP, il s'affiche toujours, même sans\n    réseau. Le bouton, lui, demande du réseau — c'est le supplément quand ça passe, pas l'inverse.\n\n3 · « PLUS LOIN », SOUS LE PLAN.\n    Les cinq lieux qui ne tiennent pas dans 750 m : chacun garde sa flèche, tournée à sa VRAIE direction,\n    avec son temps de marche. C'est le plan d'ensemble que tu voulais garder, mais sans redire deux fois\n    la même chose.\n\n4 · L'ÉCHELLE, EN BAS À GAUCHE. 200 m ≈ 2 min à pied. Sans elle, « c'est loin » ne veut rien dire." },
    { id: 'attention', x: 910, y: -430, w: 375,
      text: "⚠ LIS D'ABORD LA PLANCHE ROUGE\n\nEn allant chercher les vraies rues, j'ai comparé\nchaque lieu à SON ADRESSE.\n\nCINQ DIRECTIONS SUR SIX SONT FAUSSES dans la page\nd'aujourd'hui — pas de quelques degrés : Parc\nAstrid est annoncé au nord-ouest et il est plein\nsud, l'Aldi au nord et il est au sud.\n\nCe n'est pas une erreur de dessin, c'est la donnée\nqui n'avait jamais été vérifiée (le code le disait\ndéjà, en avertissement).\n\nJe n'ai RIEN changé dans l'app. C'est à toi de\ndire ce qu'on corrige." },
    { id: 'aldi', x: 0, y: -430, w: 375,
      text: "LA FICHE ALDI\n\nElle dit « le supermarché le plus proche », avenue\nMarius Renard 27.\n\nCette avenue est à 2 km au sud du centre. L'Aldi\nqui s'y trouve (place Martin Luther King) est à\n~37 min à pied.\n\nLe supermarché VRAIMENT le plus proche est un\nDelhaize, chaussée de Ninove 1024, à 9 min plein\nouest.\n\nJe ne l'ai pas ajouté à la liste : ce n'est pas à\nmoi de créer une fiche. Dis-moi si on la fait." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait — 4 artboards');
