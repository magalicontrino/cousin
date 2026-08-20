/* Fabrique les artboards du canvas « Accueil COUSIN — on reprend ».
   Les valeurs (couleurs, tailles, graisses) sont recopiées de index.html,
   pas arrondies : le but est qu'on ne voie pas la différence avec l'app.
   Relancer :  node make.mjs   puis re-semer le canvas. */
import { readFileSync, writeFileSync } from 'node:fs';

const APP = '/Users/magalicontrino/Projets/cousin';
const b64 = f => readFileSync(`${APP}/font/${f}`).toString('base64');

/* ---- les polices (Eastman TRIAL : les CHIFFRES retombent sur Outfit,
   voir le unicode-range de l'app — sans lui, « TRIAL VERSION » à la place) ---- */
const FACES = [['eastman-regular.woff2', 400], ['eastman-demibold.woff2', 600], ['eastman-bold.woff2', 700]];
const FONTS = FACES.map(([f, w]) =>
  `@font-face{font-family:'Eastman';src:url(data:font/woff2;base64,${b64(f)}) format('woff2');` +
  `font-weight:${w};font-display:swap;unicode-range:U+0-2F, U+3A-10FFFF}`).join('\n');

/* ---- les pictos de Mag, posés en SVG dans la page ---- */
let nId = 0;
const svg = (nom, taille, couleur) => {
  let s = readFileSync(`${APP}/picto/${nom}`, 'utf8').trim();
  /* on ne nettoie QUE la balise <svg> — sinon on écrase les traits d'une forme
     (le piège corrigé dans outils-planche.py le 29/07) */
  s = s.replace(/<svg[^>]*>/, t => t.replace(/\s(width|height)="[^"]*"/g, ''));
  /* l'encre de Figma devient la couleur du texte, quel que soit le noir employé */
  for (const encre of ['#1D1C1D', '#1d1c1d', '#1C1C1C', '#1c1c1c', '#030303', '#000000', '#000'])
    s = s.split(`"${encre}"`).join('"currentColor"');
  s = s.split('"black"').join('"currentColor"');
  /* une forme sans aucune couleur hérite du fill="none" de la racine : elle serait
     invisible. On lui donne l'encre — mais seulement à elle, pour ne pas remplir
     les dessins au trait (le ticket) */
  if (!s.includes('currentColor'))
    s = s.replace(/<svg([^>]*)>/, (t, a) => `<svg${a.replace(/\sfill="none"/, '')} fill="currentColor">`);
  /* les identifiants de Figma (clip0_…) se répètent d'un dessin à l'autre : on les
     rend uniques, sinon deux pictos se coupent l'un l'autre */
  const n = ++nId;
  s = s.replace(/id="([^"]+)"/g, (t, v) => `id="${v}_${n}"`)
       .replace(/url\(#([^)]+)\)/g, (t, v) => `url(#${v}_${n})`);
  const t = (typeof taille === 'number') ? `${taille}px` : taille;
  const st = `width:${t};height:${t};display:block;flex:none` + (couleur ? `;color:${couleur}` : '');
  return s.replace('<svg', `<svg style="${st}"`);
};

/* ---- le bac à poubelles, dessiné par l'app (pictoPoubelle) ---- */
const app = readFileSync(`${APP}/index.html`, 'utf8');
const traces = /const POUB_TRACES\s*=\s*(['"`])([\s\S]*?)\1;/.exec(app);
const bac = (couleurBac, reserve, taille) => {
  const h = Math.round(taille * 18.339 / 15.22);
  const d = traces ? traces[2].split('%B%').join(couleurBac).split('%R%').join(reserve) : '';
  return `<svg viewBox="0 0 15.22 18.339" width="${taille}" height="${h}" style="flex:none;display:inline-block;vertical-align:middle">${d}</svg>`;
};

const logo = readFileSync(`${APP}/logo.png`).toString('base64');

/* Le soleil est dessiné DANS l'app (meteoPicto), pas dans picto/ : recopié tel quel. */
const soleil = t => `<svg viewBox="0 0 24 24" fill="currentColor" style="width:${t}px;height:${t}px;display:block">` +
  '<circle cx="12" cy="12" r="4.6"/><path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>';
/* Les trois barres du bouton « le reste ». */
const barres = t => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="width:${t}px;height:${t}px;display:block">` +
  '<path d="M4 7h16M4 12h16M4 17h16"/></svg>';

/* ══════════════════════ le style, recopié de l'app ══════════════════════ */
const CSS = `
${FONTS}
:root{
  --creme:#f0efed; --noir:#1b1b1b; --enc2:#73716b; --ligne:#d6d4d0;
  --rouge:#e63329; --jaune:#f5c542; --pad:16px;
}
*{margin:0;padding:0;box-sizing:border-box}
body{width:375px;font-family:'Eastman','Outfit',-apple-system,'Segoe UI',sans-serif;
  background:var(--creme);color:var(--noir);font-size:16px;line-height:1.45}
button{font:inherit;color:inherit;background:none;border:0;text-align:left}
a{color:var(--noir);text-decoration:none}
a:hover{color:var(--rouge)}
.ic{display:inline-block;line-height:0}
.ic svg{width:100%;height:100%;display:block}
.view{padding:0 var(--pad)}

/* la barre du haut */
.topbar{display:flex;align-items:center;gap:11px;padding:12px var(--pad);
  border-bottom:1px solid var(--ligne);background:var(--creme)}
.topbar img{height:26px;display:block}
.topbar .tb{width:42px;height:42px;border:1.5px solid var(--noir);background:var(--creme);
  display:flex;align-items:center;justify-content:center;flex:none}
.topbar .tb .ic{width:17px;height:17px}

/* la date et le bonjour */
.home-top{padding-top:14px}
.hdate{display:flex;align-items:center;gap:10px;
  font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#8b8984}
.hdate .hjour{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hbadges{display:inline-flex;align-items:center;gap:6px;margin-left:auto;flex:none}
.busL{display:inline-flex;align-items:center;gap:5px;flex:none;
  border:1px solid var(--ligne);border-radius:999px;background:#fdfdfc;padding:3px 9px 3px 3px;
  font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.06em;color:var(--enc2)}
.busL b{font-family:'Eastman',system-ui,sans-serif;font-size:9.5px;font-weight:700;letter-spacing:0;
  background:var(--noir);color:#f2eee6;border-radius:999px;padding:2px 6px}
.meteoL{display:inline-flex;align-items:center;gap:5px;flex:none;
  border:1px solid var(--ligne);border-radius:999px;background:#fdfdfc;padding:4px 9px;
  font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.06em;color:#73716b}
.meteoL .ic{width:14px;height:14px}
.meteoL b{font-weight:600;color:var(--noir)}
.hbonj{font-size:42px;font-weight:700;text-transform:uppercase;letter-spacing:-.035em;line-height:.84;
  margin-top:8px;display:flex;flex-direction:column;gap:1px;color:var(--noir)}
.hbonj span{display:block}
.hbonj .fm{display:inline-block;vertical-align:baseline}
.hbonj .dd{width:.72em;height:.72em;margin-left:.1em;margin-bottom:.06em;color:#6fb08e}
.hbonj .fl{width:.7em;height:.7em;margin-left:.12em;margin-bottom:-.1em;color:#f3cde5}

/* les titres de section */
.sect{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding-bottom:8px;
  border-bottom:2px solid var(--noir);margin-top:34px}
.sect b{font-family:ui-monospace,monospace;font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.sect em{font-style:normal;font-family:ui-monospace,monospace;font-size:9.5px;letter-spacing:.14em;
  text-transform:uppercase;color:#8b8984}

/* les boules */
.boules{display:flex;gap:6px;padding:16px 0 4px;justify-content:flex-start}
.boule{flex:1 1 0;max-width:96px;display:flex;flex-direction:column;align-items:center;gap:8px}
.boule .rond{width:64px;height:64px;border-radius:50%;background:var(--noir);
  display:flex;align-items:center;justify-content:center}
.boule .rond .ic{width:30px;height:30px}
.boule.dort .rond{background:transparent;border:1.5px solid var(--ligne)}
.boule.dort .rond .ic{color:#b4b2a9}
.boule.dort b{color:#8b8984;font-weight:600}
.boule.dort em{color:#b4b2a9}
.boule .rond.deg{border:8px solid #E8308A;background:var(--noir);
  background-clip:padding-box;box-shadow:0 0 0 4px rgba(232,48,138,.28)}
.boule b{font-family:ui-monospace,monospace;font-size:9px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;text-align:center;color:var(--noir)}
.boule em{font-style:normal;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.06em;
  text-align:center;color:var(--enc2);line-height:1.25;margin-top:-4px}
.boule em .br{display:block;height:0}

/* la bande noire des jeux */
.zjeux{background:#161616;color:#f0efed;margin:26px 0 0;padding:17px 16px 20px;border-radius:12px}
.zj-air{height:14px}
.zj-chif{display:flex;gap:8px;margin-top:14px}
.zj-chif span{flex:1;background:#262626;border-radius:8px;padding:10px 11px}
.zj-chif b{display:block;font-size:21px;font-weight:500;line-height:1;color:#F5D34F}
.zj-chif span:nth-child(2) b{color:#6FC7D9}
.zj-chif span:nth-child(3) b{color:#E8308A}
.zj-chif em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:8px;
  letter-spacing:.14em;text-transform:uppercase;color:#8b8984;margin-top:5px}
.pile{position:relative;height:250px;margin:34px auto 0;max-width:380px}
.pile .pc{position:absolute;left:50%;top:0;width:58%;aspect-ratio:3/4;border-radius:20px;
  background:#262626;transform:translateX(-50%)}
.pile .p1{transform:translateX(-58%) rotate(-6deg);box-shadow:0 0 0 1.5px rgba(240,239,237,.45)}
.pile .p2{transform:translateX(-42%) rotate(6deg);box-shadow:0 0 0 1.5px rgba(240,239,237,.45)}
.pile .pcarte{z-index:2;box-shadow:0 0 0 3.5px #f0efed;background:#1b1b1b;display:flex;
  flex-direction:column;align-items:center;justify-content:center;gap:12px}
.pile .pcarte .ic{width:44px;height:44px;color:#f0efed}
.pile .pcarte span{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(240,239,237,.75)}
.zj-pied{display:flex;gap:8px;margin-top:16px}
.zj-b{flex:1;border:1px solid #4a4a4a;border-radius:8px;padding:11px;color:#f0efed;text-align:center;
  font-family:ui-monospace,monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase}
.zj-b.plein{background:#E8308A;border-color:#E8308A;color:#fff;font-weight:600}

/* le rail des sorties */
.scrail{display:flex;gap:11px;overflow:hidden;margin:0 calc(-1 * var(--pad));padding:14px var(--pad) 6px}
.sc{flex:0 0 168px;display:flex;flex-direction:column;align-items:stretch;padding:0;overflow:hidden;
  border-radius:14px;border:1.5px solid var(--noir);background:#fdfdfc;color:var(--noir)}
.sc-v{position:relative;height:108px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:6px;padding:8px}
.sc-v .ic{width:46px;height:46px;color:var(--noir)}
.sc-v em{font-style:normal;font-family:ui-monospace,monospace;font-size:8.5px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;color:var(--noir);text-align:center;line-height:1.2}
.sc-j{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--enc2);padding:10px 12px 0}
.sc-t{font-size:14.5px;font-weight:600;line-height:1.22;padding:3px 12px 0}
.sc-p{margin-top:auto;font-family:ui-monospace,monospace;font-size:9px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;padding:10px 12px 12px}
.sc-p.insc{color:#c41f1f}
.sc-p.libre{color:#2f8f5b}

/* les barres du bas de page */
.lienbas{display:flex;align-items:center;gap:10px;width:100%;background:#fdfdfc;
  border:1.5px solid var(--noir);border-radius:6px;padding:13px 14px;margin-top:16px;
  font-family:ui-monospace,monospace;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.lienbas .ic{width:20px;height:20px;flex:none}
.lienbas.plein{background:var(--noir);color:#f2eee6;border-color:var(--noir);justify-content:center}
.lienbas.plein .ic{color:#f2eee6}
.etbar{display:flex;align-items:center;gap:12px;width:100%;background:#f3cde5;
  border:1.5px solid var(--noir);border-radius:10px;padding:13px 15px;margin-top:26px;color:var(--noir)}
.etbar .et{width:22px;height:22px;flex:none}
.etbar b{font-size:17px;font-weight:700;letter-spacing:-.01em}
.etbar .ap{margin-left:auto;display:flex;align-items:center;flex:none}
.etbar .ap i{width:22px;height:22px;border-radius:50%;border:2px solid #f3cde5;display:block;
  margin-left:-8px;box-shadow:inset 0 0 0 1.5px rgba(27,27,27,.22)}
.etbar .n{flex:none;font-family:ui-monospace,monospace;font-size:11px;color:#8b6f7c}
.etbar .ch{flex:none;font-size:18px;line-height:1;color:var(--noir)}

/* ma liste */
.avance{display:flex;align-items:center;gap:12px;background:#6FC7D9;border:1.5px solid var(--noir);
  border-radius:8px;padding:13px 15px;margin-top:14px}
.avance b{font-size:17px;font-weight:600;color:#0a3a44}
.avance .pts{margin-left:auto;display:flex;gap:7px;flex:none}
.avance .pts i{width:11px;height:11px;border-radius:50%;background:#cdecf3;display:block}
.avance .pts i.on{background:#0a3a44}
.tachl{padding-top:10px}
.tach-i{display:flex;align-items:center;gap:12px;width:100%;background:#fdfdfc;
  border:1.5px solid var(--noir);border-radius:8px;padding:12px 14px;margin-bottom:9px;color:var(--noir)}
.tach-i .cx{flex:none;width:24px;height:24px;border:1.5px solid var(--noir);border-radius:5px;
  display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}
.tach-i .tx b{display:block;font-size:15px;font-weight:600;line-height:1.25}
.tach-i .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9px;
  letter-spacing:.12em;text-transform:uppercase;color:#8b8984;margin-top:3px}

/* quoi de neuf */
.neufl{padding-top:14px}
.neuf-i{display:flex;align-items:flex-start;gap:11px;width:100%;border-top:1px solid #e2e0db;
  padding:11px 0;font-size:14px;line-height:1.45;color:var(--noir)}
.neuf-i:first-child{border-top:0;padding-top:2px}
.neuf-i .pt{flex:none;width:9px;height:9px;border-radius:50%;background:#f5c542;margin-top:6px}

/* le dock */
.tabbar{display:flex;justify-content:center;gap:14px;padding:10px;
  background:var(--creme);border-top:1px solid var(--ligne);margin-top:26px}
.tabbar .tbb{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:64px}
.tabbar .db{width:50px;height:50px;border-radius:50%;background:var(--noir);
  display:flex;align-items:center;justify-content:center}
.tabbar .tbb.on .db{background:var(--c)}
.tabbar .db .ic{width:21px;height:21px;color:var(--c)}
.tabbar .tbb.on .db .ic{color:var(--noir)}
.tabbar .lbl{font-family:ui-monospace,monospace;font-size:8px;letter-spacing:.16em;
  text-transform:uppercase;color:#8b8984}
.tabbar .tbb.on .lbl{color:var(--noir);font-weight:600}

/* ── ce qui n'existe QUE dans les pistes ── */
.tag{display:inline-flex;align-items:center;gap:7px;font-family:ui-monospace,monospace;
  font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--enc2);
  border:1px solid var(--ligne);border-radius:999px;padding:4px 10px;background:#fdfdfc}
.grosse{display:flex;align-items:center;gap:14px;width:100%;background:#fdfdfc;
  border:2px solid var(--noir);border-radius:14px;padding:16px;margin-bottom:10px}
.grosse .rd{width:62px;height:62px;border-radius:50%;background:var(--noir);flex:none;
  display:flex;align-items:center;justify-content:center}
.grosse .rd .ic{width:30px;height:30px}
.grosse .tx{flex:1;min-width:0}
.grosse .tx b{display:block;font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.1}
.grosse .tx em{font-style:normal;display:block;font-family:ui-monospace,monospace;font-size:9.5px;
  letter-spacing:.12em;text-transform:uppercase;color:var(--enc2);margin-top:5px}
.grosse .chv{flex:none;font-size:22px;color:var(--noir)}
.porte{display:flex;align-items:center;gap:12px;width:100%;background:#fdfdfc;
  border:1.5px solid var(--noir);border-radius:8px;padding:13px 14px;margin-bottom:8px}
.porte .ic{width:22px;height:22px;flex:none}
.porte b{flex:1;font-size:15.5px;font-weight:600}
.porte em{font-style:normal;font-family:ui-monospace,monospace;font-size:9px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--enc2)}
.porte .chv{font-size:18px;color:var(--noir)}
.dormeuses{display:flex;align-items:center;gap:10px;flex-wrap:wrap;
  border:1px solid var(--ligne);border-radius:8px;padding:11px 13px;background:#f6f5f3;margin-top:12px}
.dormeuses .dz{display:inline-flex;align-items:center;gap:7px;
  font-family:ui-monospace,monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--enc2)}
.dormeuses .dz .ic{width:17px;height:17px;color:#b4b2a9}
.tuiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}
.tuile{display:flex;flex-direction:column;justify-content:space-between;min-height:96px;
  border:1.5px solid var(--noir);border-radius:10px;padding:12px;background:#fdfdfc}
.tuile b{font-family:ui-monospace,monospace;font-size:9.5px;font-weight:500;letter-spacing:.18em;
  text-transform:uppercase;line-height:1.4}
.tuile .ic{width:34px;height:34px;margin:auto 0 0 auto}
.pli{display:flex;align-items:center;gap:10px;width:100%;border-top:1px solid var(--ligne);
  padding:14px 0;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.pli .n{margin-left:auto;color:var(--enc2);font-size:9px}
.pli .chv{font-size:16px}
`;

/* ══════════════════════ les morceaux communs ══════════════════════ */
const topbar = `
<div class="topbar">
  <img src="data:image/png;base64,${logo}" alt="COUSIN">
  <span style="flex:1"></span>
  <span class="tb"><span class="ic">${svg('listes.svg', 17)}</span></span>
  <span class="tb"><span class="ic">${barres(17)}</span></span>
</div>`;

const dock = `
<div class="tabbar">
  <span class="tbb on" style="--c:#f5c542"><span class="db"><span class="ic">${svg('centre.svg', 21)}</span></span><span class="lbl">Accueil</span></span>
  <span class="tbb" style="--c:#f3c6da"><span class="db"><span class="ic">${svg('ico-reseau.svg', 21)}</span></span><span class="lbl">Réseau</span></span>
  <span class="tbb" style="--c:#A9C8E8"><span class="db"><span class="ic">${svg('cible.svg', 21)}</span></span><span class="lbl">Centre</span></span>
  <span class="tbb" style="--c:#e63329"><span class="db"><span class="ic">${svg('urgences.svg', 21)}</span></span><span class="lbl">Urgences</span></span>
</div>`;

const enTete = `
<div class="home-top">
  <div class="hdate">
    <span class="hjour">Jeudi 20 août</span>
    <span class="hbadges">
      <span class="busL"><b>46</b>4 min</span>
      <span class="meteoL"><span class="ic">${soleil(14)}</span><b>21°</b></span>
    </span>
  </div>
  <div class="hbonj">
    <span>Bonjour<i class="fm dd ic">${svg('ico-demidisques.svg', '100%', '#6fb08e')}</i></span>
    <span>Mag<i class="fm fl ic">${svg('ico-fleur.svg', '100%', '#f3cde5')}</i></span>
  </div>
</div>`;

/* les quatre boules, telles qu'un jeudi les dessine */
const boules = `
<div class="boules">
  <span class="boule">
    <span class="rond" style="box-shadow:0 0 0 4px #fd8fd0"><span class="ic" style="color:#fd8fd0">${svg('linge.svg', 30)}</span></span>
    <b>Linge</b><em>4e et 5e étage</em>
  </span>
  <span class="boule">
    <span class="rond deg">${bac('#f0efed', '#1b1b1b', 30)}</span>
    <b>Poubelles</b><em>Noir<span class="br"></span>ce soir</em>
  </span>
  <span class="boule dort">
    <span class="rond"><span class="ic">${svg('cle.svg', 30)}</span></span>
    <b>Chambres</b><em>Rien en cours</em>
  </span>
  <span class="boule dort">
    <span class="rond"><span class="ic">${svg('colis.svg', 30)}</span></span>
    <b>Produits</b><em>samedi<span class="br"></span>22/8</em>
  </span>
</div>`;

const sortie = (jour, titre, quoi) => `
  <span class="sc">
    <span class="sc-v" style="background:#A9C8E8">
      <span class="ic">${svg('jeu-cartes.svg', 46)}</span>
      <em>${quoi}</em>
    </span>
    <span class="sc-j">${jour}</span>
    <span class="sc-t">${titre}</span>
    <span class="sc-p libre">Gratuit · sans inscription</span>
  </span>`;

const railSorties = `
<div class="scrail">
  ${sortie('Ven 21', 'Ludobox — jeux sur place', 'Ludothèque')}
  ${sortie('Sam 22', 'Ludobox — samedi matin', 'Ludothèque')}
  ${sortie('Mer 26', 'Musée BELvue — entrée gratuite', 'Musée')}
</div>`;

/* ══════════════════════ l'enveloppe d'un artboard ══════════════════════ */
const page = (titre, corps, hauteur) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap">
  <style>${CSS}</style>
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

/* La ligne de flottaison : sur un téléphone de 375 × 812, tout ce qui est
   sous ce trait demande de faire défiler. C'est la mesure, pas l'impression. */
const flottaison = `
<div style="position:absolute;left:0;right:0;top:812px;height:0;z-index:5;
  pointer-events:none;border-top:2px dashed #e63329">
  <span style="position:absolute;right:0;bottom:3px;background:#e63329;color:#f0efed;
    font-family:ui-monospace,monospace;font-size:8px;letter-spacing:.16em;
    text-transform:uppercase;padding:4px 8px;white-space:nowrap">Bas de l'écran · 375 × 812</span>
</div>`;

/* ══════════════════════ 1. L'ACCUEIL TEL QU'IL EST ══════════════════════ */
const MAIN = page('Accueil — tel qu il est', `
<div style="position:relative">
${flottaison}
${topbar}
<div class="view">
${enTete}

  <div class="sect"><b>À faire aujourd'hui</b><em>1 chose</em></div>
  ${boules}

  <div class="zjeux">
    <div class="zj-air"></div>
    <div class="zj-chif">
      <span><b>14</b><em>Record</em></span>
      <span><b>23</b><em>Bonnes</em></span>
      <span><b>5</b><em>À revoir</em></span>
    </div>
    <div class="pile">
      <span class="pc p1"></span>
      <span class="pc p2"></span>
      <span class="pc pcarte"><span class="ic">${svg('jeu-jour.svg', 44)}</span><span>Le jeu du jour</span></span>
    </div>
    <div class="zj-pied">
      <span class="zj-b">Les 8 jeux</span>
      <span class="zj-b plein">Rattrapage · 5</span>
    </div>
  </div>

  <div class="sect" style="margin-top:26px"><b>À venir</b><em>3 sorties</em></div>
  ${railSorties}
  <span class="lienbas plein"><span class="ic">${svg('ticket.svg', 20)}</span>Toutes les activités</span>

  <span class="etbar">
    <span class="et ic">${svg('ico-etoile.svg', 22)}</span>
    <b>Tes favoris</b>
    <span class="ap"><i style="background:#f3c6da;margin-left:0"></i><i style="background:#6cb392"></i><i style="background:#f5c542"></i></span>
    <span class="n">12</span>
    <span class="ch">›</span>
  </span>

  <div class="sect"><b>Ma liste</b><em>1 / 3 faites</em></div>
  <div class="avance">
    <b>1 sur 3 faites</b>
    <span class="pts"><i class="on"></i><i></i><i></i></span>
  </div>
  <div class="tachl">
    <span class="tach-i"><span class="cx"></span><span class="tx"><b>Rappeler la maison médicale</b><em>Aujourd'hui</em></span></span>
    <span class="tach-i"><span class="cx"></span><span class="tx"><b>Commander les produits d'entretien</b><em>Avant samedi</em></span></span>
  </div>
  <span class="lienbas plein"><span class="ic">${svg('listes.svg', 20)}</span>Ouvrir ma liste</span>

  <div class="sect"><b>Quoi de neuf</b><em>2 nouveautés</em></div>
  <div class="neufl">
    <span class="neuf-i"><i class="pt"></i><span>Bithume est entrée dans le Réseau — Logement et Maraude.</span></span>
    <span class="neuf-i"><i class="pt"></i><span>Le plan du quartier : les adresses à pied depuis le centre.</span></span>
  </div>
</div>
${dock}
</div>
`, 1980);

/* ══════ 2. PISTE A — on garde le haut, on allège le bas ══════ */
const A = page('Piste A', `
${topbar}
<div class="view">
${enTete}

  <div class="sect"><b>À faire aujourd'hui</b><em>1 chose</em></div>
  ${boules}

  <div class="sect"><b>Le reste</b><em>4 portes</em></div>
  <div style="padding-top:14px">
    <span class="pli"><span class="ic" style="width:20px;height:20px">${svg('listes.svg', 20)}</span>Ma liste<span class="n">2 à faire</span><span class="chv">›</span></span>
    <span class="pli"><span class="ic" style="width:20px;height:20px">${svg('ticket.svg', 20)}</span>Les activités<span class="n">3 cette semaine</span><span class="chv">›</span></span>
    <span class="pli"><span class="ic" style="width:20px;height:20px">${svg('ico-etoile.svg', 20)}</span>Tes favoris<span class="n">12</span><span class="chv">›</span></span>
    <span class="pli"><span class="ic" style="width:20px;height:20px">${svg('jeu-jour.svg', 20)}</span>Les jeux<span class="n">5 à revoir</span><span class="chv">›</span></span>
    <span class="pli" style="border-bottom:1px solid var(--ligne)"><span class="ic" style="width:20px;height:20px">${svg('astuce.svg', 20)}</span>Quoi de neuf<span class="n">2</span><span class="chv">›</span></span>
  </div>
</div>
${dock}
`, 850);

/* ══════ 3. PISTE B — ce qui réclame en grand, le reste replié ══════ */
const B = page('Piste B', `
${topbar}
<div class="view">
${enTete}

  <div class="sect"><b>Aujourd'hui</b><em>2 choses</em></div>
  <div style="padding-top:16px">
    <span class="grosse">
      <span class="rd"><span class="ic" style="color:#fd8fd0">${svg('linge.svg', 30)}</span></span>
      <span class="tx"><b>Le linge</b><em>4e et 5e étage</em></span>
      <span class="chv">›</span>
    </span>
    <span class="grosse" style="border-color:#E8308A">
      <span class="rd">${bac('#f0efed', '#1b1b1b', 30)}</span>
      <span class="tx"><b>Poubelles ce soir</b><em>Sacs noirs · passage vendredi matin</em></span>
      <span class="chv">›</span>
    </span>
  </div>
  <div class="dormeuses">
    <span class="dz"><span class="ic">${svg('cle.svg', 17)}</span>Chambres · rien en cours</span>
    <span class="dz"><span class="ic">${svg('colis.svg', 17)}</span>Produits · samedi 22/8</span>
  </div>

  <div class="sect"><b>Le reste</b><em>Quand tu as le temps</em></div>
  <div class="tuiles">
    <span class="tuile"><b>Ma liste<br><span style="color:var(--enc2)">2 à faire</span></b><span class="ic">${svg('listes.svg', 34)}</span></span>
    <span class="tuile"><b>Activités<br><span style="color:var(--enc2)">3 cette semaine</span></b><span class="ic">${svg('ticket.svg', 34)}</span></span>
    <span class="tuile"><b>Favoris<br><span style="color:var(--enc2)">12 fiches</span></b><span class="ic">${svg('ico-etoile.svg', 34)}</span></span>
    <span class="tuile"><b>Les jeux<br><span style="color:var(--enc2)">5 à revoir</span></b><span class="ic">${svg('jeu-jour.svg', 34)}</span></span>
  </div>
  <span class="lienbas"><span class="ic">${svg('astuce.svg', 20)}</span>Quoi de neuf · 2</span>
</div>
${dock}
`, 1020);

/* ══════ 4. PISTE C — tout dans l'écran, rien à faire défiler ══════ */
const C = page('Piste C', `
${topbar}
<div class="view">
  <div class="home-top">
    <div class="hdate">
      <span class="hjour">Jeudi 20 août</span>
      <span class="hbadges">
        <span class="busL"><b>46</b>4 min</span>
        <span class="meteoL"><span class="ic">${soleil(14)}</span><b>21°</b></span>
      </span>
    </div>
    <div class="hbonj" style="font-size:30px;margin-top:6px">
      <span>Bonjour Mag<i class="fm fl ic">${svg('ico-fleur.svg', '100%', '#f3cde5')}</i></span>
    </div>
  </div>

  <div class="sect" style="margin-top:20px"><b>À faire aujourd'hui</b><em>1 chose</em></div>
  ${boules}

  <div class="tuiles" style="margin-top:20px">
    <span class="tuile" style="min-height:82px"><b>Ma liste<br><span style="color:var(--enc2)">2 à faire</span></b><span class="ic" style="width:28px;height:28px">${svg('listes.svg', 28)}</span></span>
    <span class="tuile" style="min-height:82px"><b>Activités<br><span style="color:var(--enc2)">3 cette semaine</span></b><span class="ic" style="width:28px;height:28px">${svg('ticket.svg', 28)}</span></span>
    <span class="tuile" style="min-height:82px"><b>Favoris<br><span style="color:var(--enc2)">12 fiches</span></b><span class="ic" style="width:28px;height:28px">${svg('ico-etoile.svg', 28)}</span></span>
    <span class="tuile" style="min-height:82px"><b>Les jeux<br><span style="color:var(--enc2)">5 à revoir</span></b><span class="ic" style="width:28px;height:28px">${svg('jeu-jour.svg', 28)}</span></span>
  </div>

  <span class="lienbas" style="margin-top:12px"><span class="ic">${svg('astuce.svg', 20)}</span>Quoi de neuf · 2</span>
  <div style="height:14px"></div>
</div>
${dock}
`, 715);

writeFileSync('Main.dc.html', MAIN);
writeFileSync('PisteA.dc.html', A);
writeFileSync('PisteB.dc.html', B);
writeFileSync('PisteC.dc.html', C);

const canvas = {
  artboards: [
    { file: 'Main.dc.html', title: "Tel qu'il est aujourd'hui", x: 0, y: 0, w: 375, h: 1980 },
    { file: 'PisteA.dc.html', title: 'Piste A — on allège le bas', x: 475, y: 0, w: 375, h: 850 },
    { file: 'PisteB.dc.html', title: 'Piste B — ce qui réclame en grand', x: 950, y: 0, w: 375, h: 1020 },
    { file: 'PisteC.dc.html', title: 'Piste C — tout dans un écran', x: 1425, y: 0, w: 375, h: 715 }
  ],
  annotations: [
    { id: 'ce-qui-cloche', x: 0, y: -230, w: 375,
      text: "TEL QU'IL EST\n\nHuit blocs à la suite, et chacun demande quelque chose.\nLa bande noire des jeux coupe l'écran en deux : ce qui est\nen dessous (les sorties, ta liste, quoi de neuf), on ne\ndescend presque jamais jusque-là.\n\nLe trait rouge, c'est le bas d'un écran de téléphone.\nIl tombe au milieu de la bande noire des jeux : tout ce qui\nest en dessous (les sorties, ta liste, quoi de neuf) demande\nde faire défiler." },
    { id: 'piste-a', x: 475, y: -230, w: 375,
      text: "PISTE A — ON NE TOUCHE PAS AU HAUT\n\nLe haut ne bouge pas : date, bonjour, les quatre boules.\nTout ce qui vient après devient UNE LIGNE par endroit,\navec son compte à droite.\n\nCe qu'on gagne : la page tient, on voit tout d'un coup d'œil.\nCe qu'on perd : les sorties et le jeu du jour n'ont plus\nd'image — il faut ouvrir pour voir." },
    { id: 'piste-b', x: 950, y: -230, w: 375,
      text: "PISTE B — CE QUI RÉCLAME PASSE EN GRAND\n\nLes deux choses du jour deviennent deux grosses cartes\nqu'on lit de loin. Celles qui dorment (chambres, produits)\ndescendent dans une ligne grise.\n\nCe qu'on gagne : on sait en une seconde ce qui presse.\nCe qu'on perd : les quatre boules alignées disparaissent\n— et tu m'avais dit de ne pas y toucher." },
    { id: 'piste-c', x: 1425, y: -230, w: 375,
      text: "PISTE C — TOUT DANS L'ÉCRAN\n\nLe bonjour passe sur une ligne, les boules restent, et le\nreste devient quatre carrés. Plus rien à faire défiler.\n\nCe qu'on gagne : un accueil, pas une page.\nCe qu'on perd : le jeu du jour, les sorties et quoi de neuf\nne sont plus que des portes." },
    { id: 'la-question', x: 0, y: 2050, w: 800,
      text: "LA QUESTION À TRANCHER\n\nCe qui n'est pas clair, c'est quoi au juste ?\n\n  1. Il y a trop de choses sur la page (→ piste A ou C)\n  2. On ne voit pas ce qui presse aujourd'hui (→ piste B)\n  3. On ne sait pas où on va en cliquant (→ ce sont les noms\n     des blocs qu'il faut reprendre, pas la mise en page)\n\nDis-moi laquelle, et je construis celle-là pour de vrai." }
  ],
  launch: { view: 'canvas' }
};
writeFileSync('canvas.json', JSON.stringify(canvas, null, 2));
console.log('fait');
