/* ═══════════════════════════════════════════════════════════════════════════
   LE SCHÉMA DES VRAIES RUES (Mag, 25/08/2026 : « fais un plan avec les vraies
   rues quand même, comme un schéma tu vois ? »).

   D'OÙ VIENNENT LES DONNÉES. Elles ne sont pas inventées : les tracés des rues
   viennent d'OpenStreetMap (relevé le 25/08/2026, 750 m autour du centre), et
   les lieux sont géocodés à leur adresse. `quartier-rues.json` contient les
   tracés déjà convertis en MÈTRES autour du centre — x vers l'est, y vers le
   sud, (0,0) = Bd Prince de Liège 38.

   POURQUOI 750 M ET PAS TOUT. Sur 375 px de large, un plan de 3 km ne montre
   plus une rue : il montre une bouillie grise. Le schéma tient donc le champ
   qu'on FAIT À PIED sans réfléchir ; tout ce qui est plus loin sort par une
   FLÈCHE au bord, avec sa direction et son temps. C'est la même idée que les
   anneaux de l'ancien plan, en plus honnête : ici, ce qui est dessiné est vrai.
   ═══════════════════════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';

const RUES  = JSON.parse(readFileSync(new URL('./quartier-rues.json',  import.meta.url), 'utf8'));
const VERTS = JSON.parse(readFileSync(new URL('./quartier-verts.json', import.meta.url), 'utf8'));

/* Les lieux, à leur vraie place (mètres depuis le centre : +x est, +y sud). */
export const LIEUX = {
  'Parc du Peterbos': { x: -280, y:  456, m:  536, cap: 212, min:  9 },
  'Delhaize':         { x: -527, y:   -9, m:  529, cap: 271, min:  9 },
  'Aldi':             { x:  190, y: 1073, m: 1089, cap: 170, min: 18 },
  'Parc Astrid':      { x: -102, y: 1443, m: 1446, cap: 184, min: 24 },
  'Parc Crickx':      { x: 1580, y: 1061, m: 1903, cap: 124, min: 31 },
  'DoucheFLUX':       { x: 2101, y: 1400, m: 2524, cap: 124, min: 41 },
  'Parc de la Pede':  { x:-1558, y: 2403, m: 2864, cap: 213, min: 47 }
};

/* Le trait de chaque sorte de rue. Un plan se lit à la HIÉRARCHIE : les
   boulevards larges et clairs, les rues du quartier fines. */
const TRAIT = {
  primary:      { l: 8,   c: '#ffffff', b: '#c2bcae' }, secondary:    { l: 6.4, c: '#ffffff', b: '#c6c0b3' },
  tertiary:     { l: 5.2, c: '#ffffff', b: '#c9c3b6' }, unclassified: { l: 3.8, c: '#fbfaf7', b: '#cfc9bc' },
  residential:  { l: 3.4, c: '#fbfaf7', b: '#d2ccc0' }, living_street:{ l: 2.8, c: '#fbfaf7', b: '#d4cec2' },
  pedestrian:   { l: 2.2, c: '#f0eee7', b: '#d6d0c4' }
};
const FOND = '#e4e1d8';
const ORDRE = ['pedestrian','living_street','residential','unclassified','tertiary','secondary','primary'];
const NOMMABLE = ['primary','secondary','tertiary','unclassified'];
/* Découpe une chaîne pour ne garder que ce qui se voit : on la parcourt pas à pas
   et on retient le plus long morceau continu qui reste dans le cadre. */
function portionVisible(q, W, H, marge) {
  marge = marge || 10;
  const dans = p => p[0] > marge && p[0] < W - marge && p[1] > marge && p[1] < H - marge;
  const fin = [];
  for (let i = 0; i < q.length - 1; i++) {
    const a = q[i], b = q[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.max(1, Math.ceil(L / 5));
    for (let j = 0; j < n; j++) fin.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]);
  }
  fin.push(q[q.length - 1]);
  let best = [], cur = [];
  fin.forEach(p => {
    if (dans(p)) { cur.push(p); if (cur.length > best.length) best = cur; }
    else cur = [];
  });
  return best.length > 1 ? best : null;
}

/* Recolle les tronçons d'une même rue : deux morceaux qui se touchent (moins d'un
   mètre entre les bouts) n'en font plus qu'un. Renvoie les chaînes, la plus longue
   d'abord. */
function recolle(seg) {
  const restes = seg.map(s => s.slice());
  const proche = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1.2;
  const out = [];
  while (restes.length) {
    let ch = restes.shift(), bouge = true;
    while (bouge) {
      bouge = false;
      for (let i = 0; i < restes.length; i++) {
        const r = restes[i];
        if      (proche(ch[ch.length - 1], r[0]))              { ch = ch.concat(r.slice(1)); }
        else if (proche(ch[ch.length - 1], r[r.length - 1]))   { ch = ch.concat(r.slice().reverse().slice(1)); }
        else if (proche(ch[0], r[r.length - 1]))               { ch = r.slice(0, -1).concat(ch); }
        else if (proche(ch[0], r[0]))                          { ch = r.slice().reverse().slice(0, -1).concat(ch); }
        else continue;
        restes.splice(i, 1); bouge = true; break;
      }
    }
    out.push(ch);
  }
  return out;
}

const longueur = q => { let t = 0; for (let i = 0; i < q.length - 1; i++) t += Math.hypot(q[i+1][0]-q[i][0], q[i+1][1]-q[i][1]); return t; };

/* Les noms d'axes, RACCOURCIS comme sur un vrai plan : « Boulevard Louis Mettewie »
   ne rentre nulle part, « Bd L. Mettewie » se lit et tient sur le trait. */
const COURT = {
  'Boulevard Louis Mettewie':'Bd L. Mettewie', 'Chaussée de Ninove':'Chée de Ninove',
  'Boulevard Prince de Liège':'Bd Prince de Liège', 'Boulevard Maria Groeninckx-De May':'Bd Groeninckx-De May',
  'Boulevard Edmond Machtens':'Bd E. Machtens', 'Boulevard Maurice Herbette':'Bd M. Herbette',
  'Boulevard de la Grande Ceinture':'Grande Ceinture', 'Boulevard Félix Paulsen':'Bd F. Paulsen',
  'Rue Van Soust':'R. Van Soust', 'Rue du Potaerdenberg':'R. du Potaerdenberg'
};

/* Douglas-Peucker : un schéma garde la FORME de la rue, pas ses 40 points. */
function simplifie(pts, tol) {
  if (pts.length < 3) return pts;
  let imax = 0, dmax = 0;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const L = Math.hypot(bx - ax, by - ay);
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i];
    const d = L < 1e-6 ? Math.hypot(px - ax, py - ay)
      : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / L;
    if (d > dmax) { dmax = d; imax = i; }
  }
  if (dmax <= tol) return [pts[0], pts[pts.length - 1]];
  return simplifie(pts.slice(0, imax + 1), tol).slice(0, -1).concat(simplifie(pts.slice(imax), tol));
}

/* ⚠ LE NOM DE LA RUE SE POSE LE LONG DE LA RUE, PAS À CÔTÉ. Posé horizontalement,
   « Boulevard Louis Mettewie » traversait quatre autres rues et on ne savait plus
   à laquelle il appartenait. On le fait donc tourner avec le tronçon — et on le
   remet à l'endroit s'il se retrouve la tête en bas. */
function nomsDesAxes(chemins, garder) {
  const parNom = {};
  chemins.forEach(c => { if (!parNom[c.nom] || c.L > parNom[c.nom].L) parNom[c.nom] = c; });
  let out = '';
  let voies = '', poses = [];
  /* Le milieu de la portion visible : c'est là que le nom va s'écrire. */
  const milieu = q => {
    const tot = longueur(q); let d = 0;
    for (let i = 0; i < q.length - 1; i++) {
      const l = Math.hypot(q[i+1][0]-q[i][0], q[i+1][1]-q[i][1]);
      if (d + l >= tot / 2) { const t = (tot/2 - d) / (l || 1);
        return [q[i][0] + (q[i+1][0]-q[i][0])*t, q[i][1] + (q[i+1][1]-q[i][1])*t]; }
      d += l;
    }
    return q[0];
  };
  garder.forEach(n => {
    const c = parNom[n]; if (!c) return;
    const txt = (COURT[n] || n).toUpperCase();
    if (c.L < txt.length * 5.4) return;      /* le nom ne tient pas : on ne l'écrit pas */
    const mi = milieu(c.q);
    if (poses.some(p => Math.hypot(p[0] - mi[0], p[1] - mi[1]) < 62)) return;  /* déjà un nom ici */
    poses.push(mi);
    /* Le tracé remis à l'endroit, invisible, rien que pour porter le texte. */
    const q = (c.q[c.q.length - 1][0] < c.q[0][0]) ? c.q.slice().reverse() : c.q;
    const id = c.id + '-t';
    voies += `<path id="${id}" d="${q.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')}" fill="none" stroke="none"/>`;
    /* Deux passes : le halo couleur du fond, puis le texte. Sans le halo, le nom
       se pose sur le trait blanc de la rue et devient illisible. */
    const t = (fill, extra) => `<text font-family="ui-monospace,monospace" font-size="7.8" ` +
      `letter-spacing=".05em" fill="${fill}" ${extra}><textPath href="#${id}" startOffset="50%" ` +
      `text-anchor="middle">${txt}</textPath></text>`;
    out += t('none', 'stroke="' + FOND + '" stroke-width="3.2" paint-order="stroke"');
    out += t('#4f4c46', 'dy="-0.5"');
  });
  return voies + out;
}

/* Le schéma. `W`,`H` en px ; `port` = le rayon montré, en mètres. */
export function schemaRues(W, H, opt) {
  opt = opt || {};
  const port = opt.port || 760;
  const cx = W / 2, cy = H / 2;
  const k = (Math.min(W, H) / 2 - 6) / port;          /* px par mètre */
  const P = ([x, y]) => [cx + x * k, cy + y * k];
  const dedans = ([x, y]) => x > -12 && x < W + 12 && y > -12 && y < H + 12;

  let sol = '', traits = '', noms = '', chemins = [], nId = 0;
  /* Les parcs et les pelouses : sur un plan de quartier, c'est ce qu'on reconnaît
     avant les noms de rues. Ils passent DESSOUS les rues. */
  VERTS.forEach(v => {
    const q = v.pts.map(P);
    if (!q.some(dedans)) return;
    sol += `<path d="${q.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')}Z" fill="#d3e2d5"/>`;
  });
  /* Les parcs et l'eau d'abord : ce sont des surfaces, elles passent dessous. */
  ORDRE.forEach(type => {
    Object.keys(RUES).forEach(nom => {
      const r = RUES[nom];
      if (r.hw !== type) return;
      const t = TRAIT[type]; if (!t) return;
      r.seg.forEach(s => {
        const q = simplifie(s, 7).map(P);
        if (!q.some(dedans)) return;
        const d = q.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
        /* Le liseré : c'est lui qui fait qu'un carrefour se lit comme un carrefour. */
        traits += `<path d="${d}" fill="none" stroke="${t.b}" stroke-width="${(t.l + 1.7).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
        traits += `<path id="v-${(++nId)}" d="${d}" fill="none" stroke="${t.c}" stroke-width="${t.l}" stroke-linecap="round" stroke-linejoin="round"/>`;

      });
    });
  });
  /* Les noms : seulement les axes, sinon le plan se remplit de texte. */
  /* Une chaîne par rue nommable, la plus longue retenue. */
  Object.keys(RUES).forEach(nom => {
    const r = RUES[nom];
    if (NOMMABLE.indexOf(r.hw) < 0) return;
    recolle(r.seg).forEach(ch => {
      const vu = portionVisible(simplifie(ch, 7).map(P), W, H);
      if (!vu) return;
      /* On resimplifie la portion visible : 200 points échantillonnés feraient un
         `d=` de 4 Ko par rue, pour un trait qui est droit. */
      const q = simplifie(vu, 1.5);
      chemins.push({ nom, id: 'v-' + (++nId), L: longueur(q), q });
    });
  });
  noms = nomsDesAxes(chemins, opt.nommees || [
    'Boulevard Prince de Liège',            /* la rue du centre : elle passe avant tout */
    'Chaussée de Ninove', 'Boulevard Louis Mettewie', 'Boulevard de la Grande Ceinture',
    'Boulevard Edmond Machtens', 'Boulevard Maurice Herbette',
    'Boulevard Maria Groeninckx-De May', 'Boulevard Félix Paulsen', 'Rue Van Soust'
  ]);
  const g = `<rect width="${W}" height="${H}" fill="${FOND}"/>` + sol + traits + noms;

  /* Les lieux qui TIENNENT dans le cadre : à leur vraie place.
     Ceux qui n'y tiennent pas : une flèche au bord, dans leur vraie direction. */
  let dedansL = [], flechesL = [];
  (opt.lieux || []).forEach(L => {
    const d = LIEUX[L.nom]; if (!d) return;
    if (d.m <= port * 0.94) dedansL.push({ L, d, p: P([d.x, d.y]) });
    else flechesL.push({ L, d });
  });
  return { W, H, cx, cy, k, svg: g, dedans: dedansL, fleches: flechesL };
}
