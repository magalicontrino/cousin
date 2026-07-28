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

def inline(f):
    p = os.path.join('picto', f)
    if not os.path.exists(p): return '<span class="ko">manquant</span>'
    c = re.sub(r'<\?xml[^>]*\?>', '', open(p, encoding='utf-8').read())
    return re.sub(r'\s(width|height)="[^"]*"', '', c, count=2)

sections, cur, sub, buf = [], None, None, []
for it in man:
    if it['section'] != cur:
        if cur: sections.append((cur, sub, buf)); buf = []
        cur, sub = it['section'], it['sub']
    buf.append(it)
sections.append((cur, sub, buf))

corps = []
for titre, sub, items in sections:
    cartes = []
    for it in items:
        badge = {'design': '<span class="b design">TON DESSIN</span>',
                 'valide': '<span class="b valide">VALIDÉ</span>'}.get(
                     it['etat'], '<span class="b todo">À REDESSINER</span>')
        fond = (f' style="background:{PALETTE[len(cartes) % len(PALETTE)]}"'
                if it['etat'] == 'valide' else '')
        cartes.append(f'<div class="c">{badge}<div class="sq{" coul" if it["etat"]=="valide" else ""}"{fond}>{inline(it["nom"])}</div>'
                      f'<div class="l">{html.escape(it["label"])}</div>'
                      f'<div class="f">{html.escape(it["nom"])}</div></div>')
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
.sq{{width:62px;height:62px;border-radius:15px;background:#1b1b1b;display:flex;align-items:center;justify-content:center;margin-bottom:11px}}
.sq.alt{{background:#6cb392}} .sq svg{{width:32px;height:32px}} .sq svg *{{fill:#f2eee6!important;stroke:none!important}}
.sq.coul svg *{{fill:#1b1b1b!important}}
.l{{font-size:13.5px;font-weight:800;line-height:1.25}}
.f{{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a857c;margin-top:3px;word-break:break-all}}
.b{{position:absolute;top:11px;right:11px;font-size:9px;font-weight:900;letter-spacing:.05em;border-radius:9px;padding:3px 7px}}
.b.design{{background:#d8ecdf;color:#1f7a44}} .b.todo{{background:#fbf0c4;color:#8a6a00}}
.b.valide{{background:#e7e3f7;color:#5b3fa0}}
.ko{{color:#e63329;font-size:10px}}
footer{{margin-top:40px;font-size:12.5px;color:#6b675f;line-height:1.6;border-top:1px solid rgba(27,27,27,.14);padding-top:16px}}
</style>
<h1>Planche des pictos</h1>
<p class="intro"><b>TON DESSIN</b> = tu l'as dessiné, il est branché. <b>VALIDÉ</b> = ma version, que tu as approuvée — son SVG est dans le dossier. <b>À REDESSINER</b> = provisoire, elle attend la tienne.<br>
Pour en remplacer un : dessine-le, exporte en SVG, dépose-le dans <code>picto/</code> avec exactement le nom écrit sous le picto.</p>
<div class="jauge"><b>{faits} sur {len(man)} pictos réglés</b><div class="bar"><i style="width:{round(faits/len(man)*100)}%"></i></div></div>
{''.join(corps)}
<footer>Format : SVG, aplat plein d'une seule couleur, sans contour — l'app le recolore toute seule.<br>
Carré d'en-tête : 31 px, picto à 18 px. Pavés d'accueil : picto à 46 px.</footer>
</html>'''
open('pictos.html', 'w', encoding='utf-8').write(page)
print(f"planche regeneree : {faits}/{len(man)} pictos de Magali · {len(libres)} formes libres")
