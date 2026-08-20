/* Fabrique le canvas « La fiche — on reprend l'affichage ».
   L'artboard « tel qu'il est » n'est PAS redessiné : c'est le vrai panneau, capturé
   dans l'app, avec la VRAIE feuille de style de index.html. Les quatre pistes
   réutilisent les mêmes classes — donc rien n'est inventé côté look.
   Relancer :  node make.mjs   puis re-semer le canvas. */
import { readFileSync, writeFileSync } from 'node:fs';

const APP = '/Users/magalicontrino/Projets/cousin';

/* ── la feuille de style de l'app, telle quelle ── */
let CSS = /<style>([\s\S]*?)<\/style>/.exec(readFileSync(`${APP}/index.html`, 'utf8'))[1];

/* Les six graisses Eastman pèsent 450 Ko : on ne garde que les trois qui servent
   ici (400 / 600 / 700) et on jette les @font-face des autres. Le unicode-range
   reste : sans lui, la police d'essai remplace chaque CHIFFRE par « TRIAL VERSION »
   — et une fiche, c'est surtout un numéro de téléphone. */
const GARDEES = ['eastman-regular.woff2', 'eastman-demibold.woff2', 'eastman-bold.woff2'];
CSS = CSS.replace(/@font-face\{[^}]*\}/g, bloc => {
  const f = /font\/([a-z0-9-]+\.woff2)/.exec(bloc);
  if (!f) return bloc;
  if (GARDEES.indexOf(f[1]) < 0) return '';
  const b64 = readFileSync(`${APP}/font/${f[1]}`).toString('base64');
  return bloc.replace(/url\(['"]?font\/[^)'"]+['"]?\)/, `url(data:font/woff2;base64,${b64})`);
});

/* ── les pictos : le canvas n'a pas accès au dossier picto/, on les colle dedans ── */
const cachePic = {};
const picUri = nom => {
  if (!cachePic[nom]) {
    const svg = readFileSync(`${APP}/picto/${nom}`, 'utf8');
    cachePic[nom] = 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64');
  }
  return cachePic[nom];
};
/* remplace picto/x.svg partout — dans la feuille de style ET dans le HTML capturé */
const colle = txt => txt.replace(/picto\/([A-Za-z0-9_.-]+\.svg)/g, (t, f) => {
  try { return picUri(f); } catch (e) { return t; }
});
CSS = colle(CSS);

/* ⚠ LE MASQUE NE PEUT PAS VIVRE DANS UN `style=` ICI. Le moteur des artboards
   relit les attributs `style` déclaration par déclaration, en coupant aux
   points-virgules — et une adresse `data:image/svg+xml;base64,…` en contient un.
   Le masque arrivait donc tronqué à `url("data:image/svg+xml")` et le picto
   restait invisible (vu à l'écran, pas en relisant le code).
   On passe donc par une CLASSE par dessin, posée dans la feuille de style, qui
   est lue par le navigateur et pas par ce parseur-là. */
const classesPic = [];
const picClasse = nom => {
  const cls = 'pic-' + nom.replace(/[^A-Za-z0-9]+/g, '-').replace(/-svg$/, '');
  if (classesPic.indexOf(cls) < 0) {
    classesPic.push(cls);
    const u = picUri(nom);
    CSS_PIC += `.${cls}{-webkit-mask-image:url(${u});mask-image:url(${u})}\n`;
  }
  return cls;
};
let CSS_PIC = '';

/* un picto posé à la main, avec le masque que l'app utilise partout */
const pic = (nom, taille) =>
  `<span class="pico ${picClasse(nom)}" style="width:${taille}px;height:${taille}px"></span>`;

/* ── le panneau réel, capturé dans l'app ──
   Ses pictos arrivent en `style="…mask-image:url('picto/x.svg')"` : on les
   convertit en classe, pour la raison expliquée plus haut. */
const PANNEAU = readFileSync('panneau-actuel.html', 'utf8').trim()
  .replace(/<span class="pico" style="[^"]*picto\/([A-Za-z0-9_.-]+\.svg)[^"]*"><\/span>/g,
           (t, f) => `<span class="pico ${picClasse(f)}"></span>`);

/* ── ce qu'on ajoute pour les pistes seulement ── */
const CSS_PISTES = `
/* Le panneau est posé à plat : sur le canvas on veut voir la page ENTIÈRE d'un
   coup, pas un cadre qui défile. Dans l'app il monte du bas et défile — c'est la
   seule différence entre ces écrans et la vraie chose. */
html,body{width:375px;background:#e2e0dc;margin:0}
.actvoile{display:none}
.actpan{position:static !important;top:auto;width:375px;border-radius:0;
  box-shadow:none;overflow:visible;animation:none;min-height:100vh}
/* Le corps pousse le pied en bas du cadre : dans l'app, « Appeler » est collé au
   bas de l'écran, pas à la fin du texte. */
.actcorps{overflow:visible !important;flex:1 0 auto}
.actpied{position:static !important}

/* ── LE CARNET DE L'ÉQUIPE : titre clair, petite tache à droite, et ça se déploie
   (Mag, 20/08/2026 : « un titre plus compréhensible, avec une petite tache à
   droite, et ça doit pouvoir se déployer — sinon il y a trop d'informations »). ── */
.pz-carnet{border:1.5px solid var(--noir);border-radius:12px;background:#fdfdfc;margin-top:20px}
.pz-carnet .pz-ct{display:flex;align-items:center;gap:10px;width:100%;text-align:left;
  padding:15px;min-height:52px;color:var(--noir)}
.pz-carnet .pz-ct b{flex:1;font-family:ui-monospace,monospace;font-size:10px;font-weight:600;
  letter-spacing:.18em;text-transform:uppercase}
.pz-carnet .pz-ct .pz-tache{width:11px;height:11px;border-radius:50%;background:#c9940c;flex:none}
.pz-carnet .pz-ct .n{flex:none;font-family:ui-monospace,monospace;font-size:9.5px;color:var(--enc2)}
.pz-carnet .pz-ct .chv{flex:none;font-size:17px;line-height:1}
.pz-carnet .pz-cc{padding:2px 15px 15px;border-top:1px solid #eae6de}
.pz-carnet.vide .pz-ct .pz-tache{background:transparent;box-shadow:inset 0 0 0 1.5px #cfccc6}

/* Ce que l'équipe a constaté, écrit en toutes lettres — pas sept mots en capitales. */
.pz-constat{display:flex;align-items:center;gap:10px;border-radius:10px;
  background:#fdf6e3;border:1.5px solid #c9940c;padding:12px 13px;margin-top:14px}
.pz-constat .pz-pt{width:11px;height:11px;border-radius:50%;background:#c9940c;flex:none}
.pz-constat b{flex:1;font-size:15px;font-weight:600;line-height:1.25;color:#1b1b1b}

/* « À savoir » raccourci : une ligne, le reste replié (Mag : « en règle générale,
   c'est trop d'informations, il faut être beaucoup plus concis »). */
.pz-suite{display:inline-block;margin-top:8px;font-family:ui-monospace,monospace;
  font-size:9px;letter-spacing:.14em;text-transform:uppercase;
  border-bottom:1.5px solid currentColor;padding-bottom:2px}

/* Le numéro, quand c'est lui qu'on vient chercher. */
.pz-grostel{display:flex;align-items:center;gap:13px;width:100%;text-align:left;
  border:2px solid var(--noir);border-radius:14px;background:#f8763f;
  padding:14px 16px;margin-top:14px;color:var(--noir)}
.pz-grostel .pico{flex:none}
.pz-grostel .tx{flex:1;min-width:0}
.pz-grostel .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;
  font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(27,27,27,.66)}
.pz-grostel .tx b{display:block;font-size:24px;font-weight:700;letter-spacing:-.01em;line-height:1.1}

/* Une seule colonne, un seul rythme : plus de cadres, que des filets. */
.pz-plat{border-top:1px solid #eae6de;padding:13px 0}
.pz-plat em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--enc2)}
.pz-plat p{margin-top:5px;font-size:15.5px;line-height:1.4}
.pz-plat.fort p{font-weight:600}

/* Le repli du texte long. */
.pz-replie{display:flex;align-items:center;gap:10px;width:100%;text-align:left;
  border-top:1px solid #eae6de;padding:14px 0;color:var(--noir);
  font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.pz-replie .chv{margin-left:auto;font-size:16px}
`;

/* ── l'enveloppe d'un artboard ── */
const page = (corps, hauteur, extra) => `<!doctype html>
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
${CSS_PISTES}
${extra || ''}</style>
</helmet>
${corps}
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":375,"height":${hauteur}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`;

/* ══════════ 0. TEL QUEL — le vrai panneau, capturé dans l'app ══════════ */
const MAIN = page(PANNEAU, 812);

/* les morceaux communs aux pistes */
const entete = `
<div class="actpoi"></div>
<div class="actpt">
  <span class="rd" style="background:#f8763f;flex:none"><span class="ic">${pic('logement.svg', 22)}</span></span>
  <span class="t"><em>Maisons d'accueil</em><b>Albatros</b></span>
  <button class="actx" aria-label="Fermer">✕</button>
</div>`;

const pied = `
<div class="actpied fpied">
  <a class="fpb tel">${pic('telephone.svg', 16)}Appeler</a>
</div>`;

/* le carnet replié — le même dans les quatre pistes, c'est elle qui l'a tranché */
const carnetReplie = (n) => `
<div class="pz-carnet">
  <button class="pz-ct"><b>Le carnet de l'équipe</b><span class="pz-tache"></span><span class="n">${n}</span><span class="chv">›</span></button>
</div>`;

/* ══════════ 1. PISTE A — on ne change que ce qu'elle a demandé ══════════ */
const A = page(`
<div class="actpan fpan">
${entete}
<div class="actcorps">
  <p class="fpdesc">Hébergement d'urgence : personnes seules (18+), couples, familles monoparentales (max. 2 enfants de moins de 8 ans).</p>
  <div class="fpl"><em>Pour qui</em><span>Hommes · Femmes · Familles</span></div>
  <div class="fpl"><em>Téléphone</em><span>02 511 53 30</span></div>
  <div class="fsavoir" style="margin-top:16px">
    <b><span class="ic">${pic('astuce.svg', 15)}</span>À savoir</b>
    <p>Vérifier la disponibilité par téléphone.</p>
  </div>
  ${carnetReplie('1 étiquette · 1 mot')}
  <div style="height:14px"></div>
</div>
${pied}
</div>
`, 812);

/* ══════════ 2. PISTE B — ce que l'équipe sait passe en haut ══════════ */
const B = page(`
<div class="actpan fpan">
${entete}
<div class="actcorps">
  <div class="pz-constat"><span class="pz-pt"></span><b>On n'y dort pas</b></div>
  <p class="fpdesc" style="margin-top:14px">Hébergement d'urgence : personnes seules (18+), couples, familles monoparentales (max. 2 enfants de moins de 8 ans).</p>
  <div class="fpl"><em>Pour qui</em><span>Hommes · Femmes · Familles</span></div>
  <div class="fpl"><em>Téléphone</em><span>02 511 53 30</span></div>
  <div class="fsavoir" style="margin-top:16px">
    <b><span class="ic">${pic('astuce.svg', 15)}</span>À savoir</b>
    <p>Vérifier la disponibilité par téléphone.</p>
  </div>
  ${carnetReplie('1 mot de Mag')}
  <div style="height:14px"></div>
</div>
${pied}
</div>
`, 812);

/* ══════════ 3. PISTE C — une seule colonne, plus aucun cadre ══════════ */
const C = page(`
<div class="actpan fpan">
${entete}
<div class="actcorps" style="padding-top:10px">
  <p class="fpdesc" style="margin-bottom:6px">Hébergement d'urgence : personnes seules (18+), couples, familles monoparentales (max. 2 enfants de moins de 8 ans).</p>
  <div class="pz-plat"><em>Pour qui</em><p>Hommes · Femmes · Familles</p></div>
  <div class="pz-plat fort"><em>Téléphone</em><p>02 511 53 30</p></div>
  <div class="pz-plat fort"><em>À savoir</em><p>Vérifier la disponibilité par téléphone.</p></div>
  <div class="pz-plat"><em>L'équipe a constaté</em><p>On n'y dort pas</p></div>
  <button class="pz-replie"><b style="font-weight:600">Le carnet de l'équipe</b><span class="pz-tache" style="width:11px;height:11px;border-radius:50%;background:#c9940c;display:inline-block"></span><span class="chv">›</span></button>
  <div style="height:14px"></div>
</div>
${pied}
</div>
`, 812);

/* ══════════ 4. PISTE D — la fiche sert à appeler ══════════ */
const D = page(`
<div class="actpan fpan">
${entete}
<div class="actcorps">
  <div class="pz-constat"><span class="pz-pt"></span><b>On n'y dort pas</b></div>
  <a class="pz-grostel">${pic('telephone.svg', 26)}<span class="tx"><em>Vérifier la place avant d'envoyer</em><b>02 511 53 30</b></span></a>
  <div class="fpl" style="margin-top:6px"><em>Pour qui</em><span>Hommes · Femmes · Familles</span></div>
  <button class="pz-replie">Ce que c'est<span class="chv">›</span></button>
  ${carnetReplie('1 mot de Mag')}
  <div style="height:14px"></div>
</div>
</div>
`, 812);

/* ══════════ 5. LE CARNET, OUVERT (l'état, pas une proposition) ══════════ */
const OUVERT = page(`
<div class="actpan fpan">
${entete}
<div class="actcorps">
  <div class="fpl"><em>Pour qui</em><span>Hommes · Femmes · Familles</span></div>
  <div class="fpl"><em>Téléphone</em><span>02 511 53 30</span></div>
  <div class="pz-carnet" style="margin-top:20px">
    <button class="pz-ct"><b>Le carnet de l'équipe</b><span class="pz-tache"></span><span class="n">1 mot de Mag</span><span class="chv" style="transform:rotate(90deg);display:inline-block">›</span></button>
    <div class="pz-cc">
      <div class="pz-constat" style="margin-top:12px"><span class="pz-pt"></span><b>On n'y dort pas</b></div>
      <div class="avisl mien" style="margin-top:14px"><b>Toi</b><p>kjenfejkzfnl</p></div>
      <button class="pz-replie" style="border-top:1px solid #eae6de;margin-top:10px">Corriger · compléter<span class="chv">›</span></button>
    </div>
  </div>
  <div style="height:14px"></div>
</div>
${pied}
</div>
`, 812);

writeFileSync('Main.dc.html', MAIN);
writeFileSync('PisteA.dc.html', A);
writeFileSync('PisteB.dc.html', B);
writeFileSync('PisteC.dc.html', C);
writeFileSync('PisteD.dc.html', D);
writeFileSync('CarnetOuvert.dc.html', OUVERT);

const canvas = {
  artboards: [
    { file: 'Main.dc.html',  title: "Tel qu'il est",                x: 0,    y: 0,   w: 375, h: 812 },
    { file: 'PisteA.dc.html', title: 'Piste A — juste replier',     x: 455,  y: 0,   w: 375, h: 812 },
    { file: 'PisteB.dc.html', title: "Piste B — le constat en haut", x: 910, y: 0,   w: 375, h: 812 },
    { file: 'PisteC.dc.html', title: 'Piste C — une seule colonne',  x: 1365, y: 0,  w: 375, h: 812 },
    { file: 'PisteD.dc.html', title: "Piste D — la fiche = un appel", x: 1820, y: 0, w: 375, h: 812 },
    { file: 'CarnetOuvert.dc.html', title: "Le carnet, ouvert",      x: 455,  y: 760, w: 375, h: 812 }
  ],
  annotations: [
    { id: 'actuel', x: 0, y: -300, w: 375,
      text: "TEL QU'IL EST\n\nCe n'est pas un dessin : c'est le vrai panneau de l'app,\nposé à plat pour qu'on le voie en entier.\n\nCe qui charge l'écran :\n· quatre habillages différents empilés (lignes grises,\n  cadre noir, titre à filet, cadre blanc) ;\n· sept mots en capitales qui ressemblent à des filtres\n  alors que ce sont des réponses ;\n· un formulaire (champ + bouton) au milieu d'une page\n  qu'on ouvre pour LIRE ;\n· le numéro écrit deux fois." },
    { id: 'regle', x: 0, y: 960, w: 800,
      text: "TES TROIS RÈGLES, APPLIQUÉES DANS LES QUATRE\n\n1. Le Wiki devient LE CARNET DE L'ÉQUIPE : un titre qui dit\n   que c'est écrit à plusieurs, une petite tache à droite qui\n   dit qu'il y a quelque chose dedans, et ça se déploie.\n2. « À savoir » reste COURT. Long, il se replie derrière\n   « lire la suite ». Le cadre noir est réservé à ce qui est\n   vraiment important — sinon c'est une ligne comme les autres.\n3. Le reste : moins de cadres, moins de mots.\n\nLE NOM DU CARNET est à choisir, j'ai mis le même partout :\n   · Le carnet de l'équipe\n   · Ce que l'équipe sait\n   · Écrit par l'équipe\n   · Les notes de l'équipe\n(Tu m'avais dit « nomme-le Wiki » le 18/08 — c'est toi qui\nrouvres, je te le signale juste.)" },
    { id: 'pisteA', x: 455, y: -300, w: 375,
      text: "PISTE A — ON NE TOUCHE QU'AU CARNET\n\nLa page ne bouge pas. Seul le Wiki se replie, avec son\nnouveau nom et sa tache.\n\nCe qu'on gagne : la fiche tient dans l'écran, et rien\nd'autre n'est à réapprendre.\nCe qu'on perd : les quatre habillages différents sont\ntoujours là." },
    { id: 'pisteB', x: 910, y: -300, w: 375,
      text: "PISTE B — CE QUE L'ÉQUIPE A CONSTATÉ, EN HAUT\n\nLes étiquettes ne s'affichent plus en mots-clés : elles\ndeviennent UNE PHRASE, juste sous le nom. « On n'y dort\npas » se lit avant tout le reste.\n\nCe qu'on gagne : le travail de l'équipe est la première\nchose qu'on lit, pas la dernière.\nCe qu'on perd : il faut ouvrir le carnet pour poser une\nétiquette — un geste de plus quand on écrit." },
    { id: 'pisteC', x: 1365, y: -300, w: 375,
      text: "PISTE C — UNE SEULE COLONNE\n\nPlus aucun cadre : tout devient des lignes du même rythme,\nséparées par un filet. Le cadre noir disparaît.\n\nCe qu'on gagne : plus rien ne se dispute l'attention,\nl'œil descend tout droit.\nCe qu'on perd : « À savoir » n'a plus son bloc noir — il\nfaudra le rendre à celles qui portent un vrai danger." },
    { id: 'pisteD', x: 1820, y: -300, w: 375,
      text: "PISTE D — LA FICHE SERT À APPELER\n\nOn part de ce qu'on fait vraiment avec une fiche : on\nappelle. Le numéro passe en grand, tout de suite. La\ndescription se replie derrière « Ce que c'est ».\n\nCe qu'on gagne : deux secondes, et un numéro impossible à\nrater.\nCe qu'on perd : la description n'est plus lue en arrivant\n— gênant pour quelqu'un qui découvre l'adresse." },
    { id: 'ouvert', x: 455, y: 1420, w: 375,
      text: "LE CARNET QUAND ON L'OUVRE\n\nCe n'est pas une cinquième piste, c'est l'autre moitié des\nquatre : ce qu'on voit après avoir touché la ligne.\n\nDedans : la phrase de l'équipe, les mots signés, et les\noutils pour écrire (les sept étiquettes + le champ) rangés\nencore un cran plus loin, derrière « Corriger · compléter ».\nÉcrire est plus rare que lire." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait');
