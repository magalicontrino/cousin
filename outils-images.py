#!/usr/bin/env python3
"""Génère les images de partage et les icônes de l'app, aux couleurs du design.
   À relancer si le logo ou la palette changent : python3 outils-images.py"""
from PIL import Image, ImageDraw

CREME  = (242, 238, 230)
ARC = ['#f3c6da', '#b28b7a', '#6cb392', '#f5c542', '#5b8fd4', '#fd8fd0', '#f8763f']

def arc_en_ciel(d, cx, cy, r_ext, largeur):
    """Arche pastel : 7 bandes, du plus grand au plus petit rayon."""
    for i, c in enumerate(ARC):
        r = r_ext - i * largeur
        d.arc([cx - r + largeur // 2, cy - r + largeur // 2,
               cx + r - largeur // 2, cy + r - largeur // 2],
              180, 360, fill=c, width=largeur)

def coller_logo(im, largeur, cx, cy):
    logo = Image.open('logo.png').convert('RGBA')
    h = round(logo.size[1] * largeur / logo.size[0])
    logo = logo.resize((largeur, h), Image.LANCZOS)
    im.paste(logo, (cx - largeur // 2, cy - h // 2), logo)

# --- Image de partage (WhatsApp, Messenger, mail…) : 1200 x 630 ---
og = Image.new('RGB', (1200, 630), CREME)
d = ImageDraw.Draw(og)
arc_en_ciel(d, 600, 372, 190, 22)
coller_logo(og, 300, 600, 470)
og.save('og-cousin.png', optimize=True)

# --- Icônes de l'app (écran d'accueil du téléphone) ---
for taille, nom in [(192, 'icon-192.png'), (512, 'icon-512.png'), (180, 'icon-180.png')]:
    ic = Image.new('RGB', (taille, taille), CREME)
    d = ImageDraw.Draw(ic)
    # zone sûre : l'icône peut être rognée en cercle par le téléphone
    arc_en_ciel(d, taille // 2, round(taille * .50), round(taille * .27), max(3, round(taille * .031)))
    coller_logo(ic, round(taille * .58), taille // 2, round(taille * .655))
    ic.save(nom, optimize=True)

print("og-cousin.png + icon-192/512/180.png regenerees aux couleurs du design")
