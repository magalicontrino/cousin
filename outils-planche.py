#!/usr/bin/env python3
"""Régénère pictos.html à partir de picto/manifeste.json et des SVG du dossier.
   À relancer après chaque picto validé, pour que la planche reste juste."""
import json, os, html, re

man = json.load(open('picto/manifeste.json', encoding='utf-8'))
util = set()
s = open('index.html', encoding='utf-8').read()
bloc = s[s.index('const PICTOS='):]; bloc = bloc[:bloc.index('};')]
util = set(re.findall(r"'(ico-[a-z-]+\.svg)'", bloc))

def lire(f):
    p = os.path.join('picto', f)
    return open(p, encoding='utf-8').read() if os.path.exists(p) else None

# Une forme brute de Figma (ico-…) qui a déjà été recopiée sous son nom de fonction
# (formations.svg, avis.svg…) n'est plus « libre » : on la reconnaît à son contenu.
places = {lire(it['nom']) for it in man}
libres = [f for f in sorted(os.listdir('picto'))
          if f.startswith('ico-') and f not in util and lire(f) not in places]

PALETTE = ['#f3c6da', '#b28b7a', '#6cb392', '#f5c542', '#fd8fd0', '#f8763f', '#5b8fd4']

def inline(f, coul='#1b1b1b'):
    """Le picto tel qu'il est vraiment. On ne retire la taille que sur la balise <svg>,
    et on ne remplace que `currentColor` : les dessins de Magali arrivent avec des encres
    variées (black, #1D1C1D, #1D1D1D…) et certains sont multicolores — on ne touche donc
    à aucune couleur écrite dans le fichier, et on les affiche sur un carré clair."""
    p = os.path.join('picto', f)
    if not os.path.exists(p): return '<span class="ko">manquant</span>'
    c = re.sub(r'<\?xml[^>]*\?>', '', open(p, encoding='utf-8').read())
    def _svg(m):
        return re.sub(r'\s(width|height)="[^"]*"', '', m.group(0))
    c = re.sub(r'<svg[^>]*>', _svg, c, count=1)
    return c.replace('currentColor', coul)

sections, cur, sub, buf = [], None, None, []
for it in man:
    if it['section'] != cur:
        if cur: sections.append((cur, sub, buf)); buf = []
        cur, sub = it['section'], it['sub']
    buf.append(it)
sections.append((cur, sub, buf))

BADGES = {'design': '<span class="b design">TON DESSIN</span>',
          'valide': '<span class="b valide">VALIDÉ</span>',
          'a-definir': '<span class="b vide">À DÉFINIR</span>'}

def carte(it, i=0):
    """Une carte de la planche. « À définir » = aucun dessin encore choisi : carré vide
    en pointillés, sinon on affiche le fichier tel qu'il est."""
    badge = BADGES.get(it['etat'], '<span class="b todo">À REDESSINER</span>')
    if it['etat'] == 'a-definir':
        dedans, classe, fond = '<span class="tiret">?</span>', ' vide', ''
    else:
        dedans = inline(it['nom'])
        classe = ' coul' if it['etat'] == 'valide' else ''
        fond = (f' style="background:{PALETTE[i % len(PALETTE)]}"'
                if it['etat'] == 'valide' else '')
    return (f'<div class="c">{badge}<div class="sq{classe}"{fond}>{dedans}</div>'
            f'<div class="l">{html.escape(it["label"])}</div>'
            f'<div class="f">{html.escape(it["nom"])}</div></div>')

# ═══ En haut de la page : ce qui reste à faire, pour ne pas devoir le chercher ═══
adef = [it for it in man if it['etat'] == 'a-definir']
ared = [it for it in man if it['etat'] == 'a-redessiner']
tete = []
if adef or ared:
    lignes = []
    if adef:
        lignes.append('<h3>À définir — aucun dessin encore choisi</h3><div class="g">'
                      + ''.join(carte(it) for it in adef) + '</div>')
        # Certains ont déjà une page de pistes : on le dit, sinon on cherche pour rien.
        pages = sorted({it['piste'] for it in adef if it.get('piste')})
        for pg in pages:
            qui = ', '.join(it['label'] for it in adef if it.get('piste') == pg)
            lignes.append(f'<p class="renvoi">Des pistes t\'attendent pour <b>{html.escape(qui)}</b> : '
                          f'<a href="{html.escape(pg)}">{html.escape(pg)}</a> — donne-moi un numéro.</p>')
    if ared:
        lignes.append('<h3>À redessiner — ma version provisoire attend la tienne</h3><div class="g">'
                      + ''.join(carte(it) for it in ared) + '</div>')
    if libres:
        lignes.append(f'<p class="renvoi">Et <b>{len(libres)} de tes formes</b> ne sont affectées à '
                      'aucune fonction : elles sont tout en bas de la page.</p>')
    tete.append('<div class="reste"><h2 class="plat">Ce qui reste à faire '
                f'<em>{len(adef) + len(ared)} pictos</em></h2>' + ''.join(lignes) + '</div>')

corps = []
for titre, sub, items in sections:
    cartes = [carte(it, i) for i, it in enumerate(items)]
    corps.append(f'<h2>{html.escape(titre)} <em>{html.escape(sub)}</em></h2>'
                 f'<div class="g">{"".join(cartes)}</div>')

if libres:
    corps.append('<h2>7 · TES FORMES PAS ENCORE AFFECTÉES <em>dis-moi à quoi elles servent</em></h2><div class="g">'
                 + ''.join(f'<div class="c"><div class="sq alt">{inline(f)}</div>'
                           f'<div class="f">{html.escape(f)}</div></div>' for f in libres) + '</div>')

faits = sum(1 for it in man if it['etat'] in ('design', 'valide'))
page = f'''<!doctype html><html lang="fr"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>COUSIN — planche des pictos</title>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box}}
body{{background:#f2eee6;color:#1b1b1b;font-family:'Outfit',system-ui,sans-serif;padding:22px 18px 60px;max-width:900px;margin:0 auto}}
h1{{font-size:30px;font-weight:900;letter-spacing:-.02em;margin:0 0 4px}}
.intro{{font-size:13.5px;color:#6b675f;line-height:1.55;margin:0 0 18px}}
.jauge{{background:#fff;border-radius:12px;padding:13px 15px;margin-bottom:26px}}
.jauge b{{font-size:14px}} .jauge .bar{{height:9px;border-radius:5px;background:rgba(27,27,27,.09);margin-top:8px;overflow:hidden}}
.jauge .bar i{{display:block;height:100%;background:#6cb392;border-radius:5px}}
h2{{font-size:17px;font-weight:900;letter-spacing:-.01em;margin:34px 0 12px;padding-bottom:9px;border-bottom:2px solid #1b1b1b;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}}
h2 em{{font-style:normal;font-size:12.5px;font-weight:600;color:#6b675f}}
.g{{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}}
.c{{position:relative;background:#fff;border-radius:14px;padding:15px 14px 13px}}
.sq{{width:62px;height:62px;border-radius:15px;background:#f0eee9;display:flex;align-items:center;justify-content:center;margin-bottom:11px}}
.sq.alt{{background:#dff0e5}} .sq svg{{width:32px;height:32px}}
.l{{font-size:13.5px;font-weight:800;line-height:1.25}}
.f{{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a857c;margin-top:3px;word-break:break-all}}
.b{{position:absolute;top:11px;right:11px;font-size:9px;font-weight:900;letter-spacing:.05em;border-radius:9px;padding:3px 7px}}
.b.design{{background:#d8ecdf;color:#1f7a44}} .b.todo{{background:#fbf0c4;color:#8a6a00}}
.b.valide{{background:#e7e3f7;color:#5b3fa0}}
.b.vide{{background:#f7dcd6;color:#b8442f}}
/* Ce qui reste à faire, en tête de page : le même dessin de cartes, sur fond crème foncé. */
.reste{{background:#e9e3d7;border-radius:18px;padding:16px 16px 18px;margin-bottom:30px}}
h2.plat{{margin:2px 0 4px;border-bottom:0;padding-bottom:0}}
.reste h3{{font-size:12.5px;font-weight:900;text-transform:uppercase;letter-spacing:.5px;color:#6b675f;margin:16px 0 9px}}
.sq.vide{{background:transparent;border:2px dashed rgba(27,27,27,.28)}}
.sq .tiret{{font-size:26px;font-weight:900;color:rgba(27,27,27,.3)}}
.renvoi{{font-size:12.5px;color:#6b675f;margin:16px 0 0;line-height:1.5}}
.renvoi b{{color:#1b1b1b}}
.ko{{color:#e63329;font-size:10px}}
footer{{margin-top:40px;font-size:12.5px;color:#6b675f;line-height:1.6;border-top:1px solid rgba(27,27,27,.14);padding-top:16px}}
</style>
<h1>Planche des pictos</h1>
<p class="intro"><b>TON DESSIN</b> = tu l'as dessiné, il est branché. <b>VALIDÉ</b> = ma version, que tu as approuvée — son SVG est dans le dossier. <b>À REDESSINER</b> = provisoire, elle attend la tienne. <b>À DÉFINIR</b> = rien de choisi encore, même pas une piste.<br>
Pour en remplacer un : dessine-le, exporte en SVG, dépose-le dans <code>picto/</code> avec exactement le nom écrit sous le picto.</p>
<div class="jauge"><b>{faits} sur {len(man)} pictos réglés</b><div class="bar"><i style="width:{round(faits/len(man)*100)}%"></i></div></div>
{''.join(tete)}
{''.join(corps)}
<footer>Format : SVG, aplat plein d'une seule couleur, sans contour — l'app le recolore toute seule.<br>
Carré d'en-tête : 31 px, picto à 18 px. Pavés d'accueil : picto à 46 px.</footer>
</html>'''
open('pictos.html', 'w', encoding='utf-8').write(page)
print(f"planche regeneree : {faits}/{len(man)} pictos de Magali · {len(libres)} formes libres")
