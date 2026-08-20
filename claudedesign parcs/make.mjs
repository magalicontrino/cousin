/* Canvas « Le bouton des parcs — le rendre regardable ».
   Même méthode que les autres canvas : la VRAIE feuille de style de index.html,
   le vrai bouton, polices et pictos collés en data-URI.
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

const CSS_PZ = `
html,body{width:375px;background:var(--creme);margin:0}
.ecran{width:375px;padding:20px 16px}
.lg{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--enc2);margin:0 0 14px}
.actparcs .ic .pico{width:100%;height:100%}

/* ── A · LA MÊME LIGNE QUE LES AUTRES ──
   Le vert plein ne dit rien : ce n'est pas une alerte, c'est une porte de plus.
   Elle prend donc l'habit des autres portes — fond clair, trait fin — et la
   couleur se retire dans un rond derrière le dessin. */
.pz-a{display:flex;align-items:center;gap:13px;width:100%;text-align:left;color:var(--noir);
  background:#fdfdfc;border:1.25px solid var(--trait);border-radius:12px;padding:13px 15px}
.pz-a .rd{width:40px;height:40px;border-radius:50%;background:#a8d8c1;flex:none;
  display:flex;align-items:center;justify-content:center}
.pz-a .tx{flex:1;min-width:0}
.pz-a .tx b{display:block;font-size:16px;font-weight:600;line-height:1.2}
.pz-a .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--enc2);margin-top:4px}
.pz-a .chv{flex:none;font-size:18px;color:var(--noir)}

/* ── B · UNE LIGNE, PAS UNE CARTE ──
   Un filet au-dessus, rien autour. C'est le geste le plus discret de l'app, celui
   des « portes » de l'accueil. */
.pz-b{display:flex;align-items:center;gap:12px;width:100%;text-align:left;color:var(--noir);
  border-top:1px solid var(--ligne);border-bottom:1px solid var(--ligne);padding:16px 2px}
.pz-b .ic{width:22px;height:22px;flex:none;color:#4a8f6d}
.pz-b .tx{flex:1;min-width:0}
.pz-b .tx b{display:block;font-size:16px;font-weight:600;line-height:1.2}
.pz-b .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--enc2);margin-top:4px}
.pz-b .chv{flex:none;font-size:17px}

/* ── C · LE VERT RESTE, MAIS IL SE TIENT ──
   Elle aime la couleur : on la garde, en aplat pâle, avec le trait noir fin de
   l'app et un dessin à sa taille — pas une punaise de 32 px. */
.pz-c{display:flex;align-items:center;gap:13px;width:100%;text-align:left;color:var(--noir);
  background:#dcefe4;border:1.25px solid var(--trait);border-radius:12px;padding:14px 15px}
.pz-c .ic{width:20px;height:20px;flex:none}
.pz-c .tx{flex:1;min-width:0}
.pz-c .tx b{display:block;font-size:16px;font-weight:600;line-height:1.2}
.pz-c .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:#55705f;margin-top:4px}
.pz-c .chv{flex:none;font-size:18px}

/* ── D · LA LIGNE DE TA CAPTURE ──
   Celle que tu m'as montrée ce matin : rangée blanche arrondie, rond pastel,
   chevron dans son propre rond gris. C'est aussi la forme de la vue d'ensemble. */
.pz-d{display:flex;align-items:center;gap:14px;width:100%;text-align:left;color:var(--noir);
  background:#fdfdfc;border:1.25px solid var(--trait);border-radius:16px;padding:12px 14px;min-height:70px}
.pz-d .rd{width:44px;height:44px;border-radius:50%;background:#dcefe4;flex:none;
  display:flex;align-items:center;justify-content:center}
.pz-d .tx{flex:1;min-width:0}
.pz-d .tx b{display:block;font-size:16.5px;font-weight:600;line-height:1.2}
.pz-d .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--enc2);margin-top:4px}
.pz-d .chv{flex:none;width:30px;height:30px;border-radius:50%;background:#f2f0ed;
  display:flex;align-items:center;justify-content:center;font-size:15px;color:#57554f}
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

const T = 'Les parcs aux alentours';
const S = '4 parcs · à pied · gratuit';

/* ══════════ 0. TEL QUEL — le vrai bouton ══════════ */
const MAIN = page(`<div class="ecran"><p class="lg">Activités · aujourd'hui</p>
<button class="actparcs">
  <span class="ic">${pic('adresse.svg')}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span>
  <span class="ch">›</span>
</button></div>`, 200);

const A = page(`<div class="ecran"><p class="lg">Piste A</p>
<button class="pz-a"><span class="rd">${pic('adresse.svg', 20)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button></div>`, 200);

const B = page(`<div class="ecran"><p class="lg">Piste B</p>
<button class="pz-b"><span class="ic">${pic('adresse.svg', 22)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button></div>`, 200);

const C = page(`<div class="ecran"><p class="lg">Piste C</p>
<button class="pz-c"><span class="ic">${pic('adresse.svg', 20)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button></div>`, 200);

const D = page(`<div class="ecran"><p class="lg">Piste D</p>
<button class="pz-d"><span class="rd">${pic('adresse.svg', 21)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button></div>`, 200);

/* Les cinq l'un sous l'autre, pour comparer d'un coup d'œil. */
const TOUS = page(`<div class="ecran"><p class="lg">Les cinq, l'un sous l'autre</p>
<p class="lg" style="margin:18px 0 6px">Tel qu'il est</p>
<button class="actparcs" style="margin-top:0"><span class="ic">${pic('adresse.svg')}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="ch">›</span></button>
<p class="lg" style="margin:22px 0 6px">A · la même ligne que les autres</p>
<button class="pz-a"><span class="rd">${pic('adresse.svg', 20)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button>
<p class="lg" style="margin:22px 0 0">B · une ligne, pas une carte</p>
<button class="pz-b"><span class="ic">${pic('adresse.svg', 22)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button>
<p class="lg" style="margin:22px 0 6px">C · le vert reste, mais il se tient</p>
<button class="pz-c"><span class="ic">${pic('adresse.svg', 20)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button>
<p class="lg" style="margin:22px 0 6px">D · la ligne de ta capture</p>
<button class="pz-d"><span class="rd">${pic('adresse.svg', 21)}</span>
  <span class="tx"><b>${T}</b><em>${S}</em></span><span class="chv">›</span></button>
</div>`, 720);

writeFileSync('Main.dc.html', TOUS);
writeFileSync('TelQuel.dc.html', MAIN);
writeFileSync('PisteA.dc.html', A);
writeFileSync('PisteB.dc.html', B);
writeFileSync('PisteC.dc.html', C);
writeFileSync('PisteD.dc.html', D);

const canvas = {
  artboards: [
    { file: 'Main.dc.html',    title: "Les cinq, l'un sous l'autre", x: 0,    y: 0, w: 375, h: 720 },
    { file: 'TelQuel.dc.html', title: "Tel qu'il est",               x: 455,  y: 0, w: 375, h: 200 },
    { file: 'PisteA.dc.html',  title: 'A — comme les autres',        x: 455,  y: 250, w: 375, h: 200 },
    { file: 'PisteB.dc.html',  title: 'B — une ligne',               x: 455,  y: 500, w: 375, h: 200 },
    { file: 'PisteC.dc.html',  title: 'C — le vert se tient',        x: 910,  y: 0, w: 375, h: 200 },
    { file: 'PisteD.dc.html',  title: 'D — la ligne de ta capture',  x: 910,  y: 250, w: 375, h: 200 }
  ],
  annotations: [
    { id: 'pourquoi', x: 0, y: -330, w: 375,
      text: "CE QUI NE VA PAS\n\nTrois choses, et elles se cumulent :\n\n· LE VERT PLEIN dit « attention » alors que ce n'est qu'une\n  porte de plus. Aucun autre bouton de la page n'est rempli\n  d'une couleur — ils sont tous clairs, avec un trait fin.\n· LA PUNAISE FAIT 32 PX, presque la taille du titre. Elle\n  écrase la ligne au lieu de l'accompagner.\n· LE CHEVRON EST MINUSCULE à côté d'elle : les deux bouts de\n  la ligne ne se répondent pas.\n\nOn ne change ni le mot, ni ce qu'il y a derrière." },
    { id: 'comparer', x: 455, y: -330, w: 830,
      text: "LES QUATRE PISTES\n\nA · Elle prend l'habit des autres portes — fond clair, trait\n    fin — et le vert se retire dans un rond derrière le dessin.\nB · Plus de carte du tout : un filet au-dessus, un en dessous.\n    C'est le geste le plus discret de l'app.\nC · Tu aimes cette couleur : on la garde, en aplat PÂLE, avec\n    le trait fin et un dessin à sa taille.\nD · La ligne que tu m'as montrée ce matin : rangée blanche\n    arrondie, rond pastel, chevron dans son propre rond gris.\n    C'est aussi la forme de la vue d'ensemble.\n\nÀ GAUCHE, les cinq l'un sous l'autre : c'est là qu'on choisit,\npas en les regardant séparément.\n\nSi tu prends D, on gagne autre chose : cette forme devient LA\nligne de l'app — les parcs, les familles du Réseau, le carnet\nde la fiche. Un seul dessin partout." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait');
