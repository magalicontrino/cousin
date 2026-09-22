# -*- coding: utf-8 -*-
import re, base64, html as H

def svg(nom, klass='pic'):
    # ⚠ Les dessins que j'ai faits ne sont PAS dans picto/ : ils attendent son oeil
    # dans propositions/pictos-proposes/. On les lit la, on les colle dans la page.
    import os
    f='picto/%s.svg'%nom
    if not os.path.exists(f): f='propositions/pictos-proposes/%s.svg'%nom
    t=open(f,encoding='utf-8').read().strip()
    m=re.match(r'<svg[^>]*>', t); tag=re.sub(r'\s+(?:width|height)="[^"]*"','',m.group(0))
    tag=tag.replace('<svg','<svg class="%s" aria-hidden="true" focusable="false"'%klass,1)
    return re.sub(r'\s*\n\s*',' ',tag+t[m.end():])

COULEURS = {'GÉNÉRALITÉ': '#6FC7D9', 'VOTRE ACCUEIL': '#4fa06f', 'VOTRE DÉPART': '#8a7fa8', 'SERVICES COLLECTIFS': '#e0a52a', 'SERVICES PMS': '#d4568c', 'RÈGLES DE VIVRE-ENSEMBLE': '#e63329', 'SANCTIONS': '#f8763f', 'CONFIDENTIALITÉ': '#55707e', 'PROCÉDURE DE PLAINTES': '#8a9a3b', 'ACCÈS À L’ENSEMBLE DE VOS DROITS': '#9c6b3f'}

def rond(nom, couleur='turq'):
    # ⚠ UNE LIGNE PEUT PORTER PLUSIEURS PICTOS (Mag, 21/09/2026 : « PMS, c'est medical,
    #   psy et social. Donc fais trois pictos, l'un a cote de l'autre »). Le document
    #   d'origine le faisait deja : Services collectifs y portait deux dessins.
    if nom is None:
        return '<span class="rd vide" title="picto a choisir"></span>'
    st = (' style="border-color:%s"' % couleur) if str(couleur).startswith('#') else ''
    cl = 'rd rouge' if (isinstance(nom,str) and nom=='interdit') else 'rd'
    if isinstance(nom, (list, tuple)):
        return '<span class="rds">%s</span>'%''.join(
            '<span class="%s"%s>%s</span>'%('rd', st, svg(n)) for n in nom)
    return '<span class="%s"%s>%s</span>'%(cl, st, svg(nom))

# ── PAGE 1 : les dix sections, DANS L'ORDRE DU RESUME, texte recopie ──
SECTIONS=[
 ('info','GÉNÉRALITÉ','turq',[
  "Ce document est un résumé du règlement d’ordre intérieur.",
  "Le ROI reprend vos droits et vos obligations pour bénéficier de nos services.",
  "Le centre Prince de Liège est un dispositif d’hébergement d’urgence et de soin temporaire pour personnes sans-abri.",
  "Les services proposés dans le cadre de ce dispositif sont gratuits.",
  "La porte du centre ferme à 21h30.",
  "Le numéro de contact pour joindre la structure en cas de besoin (retard, questions, ..) est le <b class=tel>02.329.05.94</b> (accueil) ou le <b class=tel>0800.99.340</b>. (Régulation téléphonique du Samusocial).",
  "Les déloges, c’est-à-dire, les nuits passées à l’extérieur du centre durant votre séjour, ne peuvent se faire qu’avec accord de l’équipe PMS et sous certaines conditions à retrouver dans le ROI général.",
  "En cas de non-respect de ces conditions, le Samusocial pourrait décider de mettre fin à votre hébergement."]),
 ('accueil','VOTRE ACCUEIL','turq',[
  "Lors de votre intégration au projet, il vous sera demandé de rencontrer un travailleur social, de remettre vos médicaments à l’infirmerie.",
  "Le centre et ses commodités vous seront présentés.",
  "Nous vous demandons de respecter les règles du centre (telles que reprises dans le ROI général) pour pouvoir bénéficier de nos services."]),
 ('depart-porte','VOTRE DÉPART','turq',[
  "Hormis situation exceptionnelle, vous serez informé une semaine à l’avance de la fin de votre séjour ici. Il vous sera demandé de remettre le matériel qui vous a été prêté par le Samusocial aux professionnels et de nettoyer votre chambre.",
  "Le Centre peut garder certaines de vos affaires pour une durée maximale de 14 jours suite à votre départ."]),
 (['hebergement','tv-antenne','ico-ondes','repas-cloche'],'SERVICES COLLECTIFS','vert',[
  "Plusieurs services sont mis à votre disposition. (Lit, repas, sanitaires, télévision …).",
  "Il est nécessaire de respecter les horaires d’ouverture de ces services pour y avoir accès.",
  "Une connexion WIFI est disponible (identifiant : Samusocial Guest). Le code de connexion est S@mUfree2020.",
  "Le centre peut mettre à votre disposition un téléphone et un ordinateur, dans le cadre de vos démarches administratives.",
  "Un casier est également mis à votre disposition pour y sécuriser certaines de vos affaires.",
  "Vous trouverez l’ensemble des services que nous vous proposons, dans le ROI général du centre."]),
 (['medical','sante-mentale','social'],'SERVICES PMS','vert',[
  "Une équipe psycho-médico-sociale est à votre disposition pour vous accompagner tout au long de votre séjour.",
  "Il est attendu que vous collaboriez avec cette dernière.",
  "Les refus de collaboration avec l’équipe sociale peuvent entraîner une fin d’accompagnement.",
  "Un refus d’orientation vers un lieu d’hébergement adapté à votre situation peut entraîner une décision de fin d’hébergement.",
  "En cas de risque de contamination, l’équipe médicale pourrait vous demander d’effectuer certaines démarches ou soins spécifiques.",
  "Les refus de soin, lorsqu’il y a un risque de contamination, peuvent entraîner une fin d’hébergement."]),
 ('interdit','RÈGLES DE VIVRE-ENSEMBLE','rouge',[
  "NON|Toute forme de violence est strictement interdite et sera automatiquement sanctionnée.",
  "NON|L’usage et le trafic de stupéfiants, le vol, le vandalisme sont interdits.",
  "NON|Il est interdit de consommer de l’alcool sur site.",
  "La consommation de cigarette n’est autorisée que dans l’espace prévu à cet effet.",
  "Il vous est demandé de respecter l’hygiène dans l’ensemble du bâtiment et dans ses abords directs.",
  "Il n’est autorisé de manger qu’au réfectoire et au salon, hormis fruits et aliments secs, sous maintien de l’hygiène.",
  "NON|Pour éviter tout risque incendie, la possession et l’utilisation de matériel à forte consommation d’électricité et de matériel inflammable est strictement interdite dans le centre.",
  "NON|Il est strictement interdit de cuisiner en chambre.",
  "NON|Les objets contondants (couteaux, marteaux, ...) sont interdits dans le centre.",
  "Par souci de sécurité et d’hygiène, les travailleurs font régulièrement des tours des chambres. Si les professionnels trouvent un objet dangereux, il sera enlevé et remis à son propriétaire sous condition stricte de sortie du centre de cet objet.",
  "NON|Les animaux de compagnie ne sont pas autorisés dans le centre.",
  "Par souci d’hygiène, le nombre de bagages par bénéficiaire est limité à 3 bacs par personne.",
  "Dans le respect de la pudeur de chacun, il vous est demandé de vous déplacer en tenue appropriée dans le centre et à ses abords.",
  "Par souci de tranquillité, il vous est demandé d’éviter les nuisances sonores à partir de 21h00, et notamment dans votre chambre."]),
 ('attention','SANCTIONS','rouge',[
  "Si vous commettez une infraction aux règles reprises dans le règlement d’ordre intérieur général, une sanction peut être prise à votre égard.",
  "La liste des sanctions encourues en cas de non-respect du ROI est reprise dans le ROI général du projet."]),
 ('confidentialite','CONFIDENTIALITÉ','mauve',[
  "Les travailleurs, tout comme les étudiants et bénévoles sont tenus de respecter le devoir de confidentialité.",
  "Cela signifie que les informations vous concernant ne seront divulguées vers des partenaires extérieurs qu’avec votre accord.",
  "L’équipe PMS est tenue au secret professionnel.",
  "Des caméras sont présentes dans le centre et filment les espaces communs.",
  "NON|Les visites de personnes extérieures sont interdites dans le centre et à ses abords.",
  "NON|Il est strictement interdit de prendre une photo ou une vidéo d’une autre personne dans le centre sans l’accord préalable de cette dernière."]),
 ('plainte','PROCÉDURE DE PLAINTES','mauve',[
  "En cas d’abus commis par l’un de nos professionnels, bénévoles ou étudiants à votre égard, le Samusocial vous encourage à déposer une plainte auprès de la coordination de votre projet.",
  "Vous pouvez également envoyer votre plainte à Vivalis via leur site web : https://www.vivalis.brussels/fr/plainte"]),
 ('livre','ACCÈS À L’ENSEMBLE DE VOS DROITS','turq',[
  "ROI général à retrouver aux valves d’affichage ou via le QR code suivant :"]),
]

# ── PAGE 2 : les horaires, DANS L'ORDRE, un picto par ligne ──
COLLECTIFS=[
 ('horaires','Accès au centre','Fermé entre 21h30 et 6h00'),
 ('telephone','Numéro de téléphone du centre','<b class=tel>02.329.05.94</b> (accueil) ou la régulation du Samusocial <b class=tel>(0800.99.340)</b>'),
 (['hebergement','coche'],'Présence en chambre','Présence en chambre attendue à partir de 21h40'),
 ('repas-couverts','Heures des repas','Petit déjeuner : 07h30 à 10h00 - Midi : 12h00 à 13h30 - Soir : 18h00 à 19h30'),
 ('ordi-ecran','Salle informatique','de 08h00 à 21h00, sur réservation.'),
 ('ico-ondes','Wifi','Identifiant : Samusocial Guest - Mot de passe : S@mUfree2020'),
 ('ticket','Tickets de transport','À partir de 17h la veille du RDV, sur présentation d’une preuve de RDV'),
 ('machine-laver','Machine à laver','Horaires pour déposer les effets personnels à l’accueil : 07h-12h (le jour correspondant à votre étage uniquement).'),
 ('tv-antenne','Télévision','de 8h00 à 00h00'),
 (['literie','calendrier'],'Literie','Les draps et le linge de maison sont renouvelés chaque samedi, tandis que les couvertures sont changées toutes les deux semaines.'),
 (['hyg-bouteille','hyg-brosse','hyg-dentifrice','hyg-rasoir'],'Kit hygiène','Il est possible de récupérer les articles d’hygiène manquants toutes les 2 semaines, le samedi et le dimanche. Les dates de retrait sont indiquées au niveau des espaces d’affichage du couloir principal situé à l’entrée du bâtiment.'),
 ('fumoir-cigarette','Fumoir','Il est demandé de ne plus faire de bruit dans cet espace à partir de 21h00.'),
 ('lune','Calme dans le centre','Aucune nuisance sonore n’est admise entre 21h et 8h'),
]
PMS=[
 ('educatif','Service éducatif','Les éducateurs sont disponibles 7j/7 de 7h00 à 18h00 (hors réunions en après-midi)'),
 ('social','Service social','Permanence 24h-24h hors réunions'),
 ('medical','Pôle médicalisé <em>(infirmerie du 2ème étage)</em>','24h/24 et 7j/7<br>Horaire de distribution des médicaments : <b>07h30-09h30</b> · <b>11H30-12h30</b> · <b>17H30-19h30</b> · <b>21h30-22h30</b><br>10h00-12h30 : soins de plaies<br>En dehors de ces heures, l’infirmerie du deuxième étage reste disponible pour toute autre demande'),
 ('handicap','Pôle fragile <em>(infirmerie du Rez-de-chaussée)</em>','9h00-20h00 – 7j/7'),
 ('sante-mentale','Service psychologique','En matinée : 09h-13h<br>En journée et soirée : 14h30-17h'),
]

def ligne(t):
    non = t.startswith('NON|')
    return '<li%s>%s</li>'%(' class=non' if non else '', t[4:] if non else t)

# ⚠ LE VRAI QR CODE DU DOCUMENT (Mag, 21/09/2026 : « mais ou est le qr code ? »).
# La phrase « via le QR code suivant : » restait en l'air, sans rien derriere. Le QR est
# une IMAGE du PDF d'origine (pdfimages, num 22), reprise telle quelle : c'est lui qui
# mene au ROI general. On ne le redessine pas, on ne le remplace pas.
# ⚠ LE QR EST CELUI DU DOCUMENT D'ORIGINE, ET IL Y RESTE (Mag, 21/09/2026).
# J'avais fabrique un QR vers notre copie du ROI
# (cousin.magalicontrino.com/documents/roi/roi-complet-fr.pdf) — elle l'a ECARTE :
# « on ne peut pas faire aller vers l'adresse Cousin, laisse le QR code qu'il y avait
# avant ». Cette adresse est l'outil de l'equipe, ce n'est pas un lien qu'on met dans
# les mains d'un heberge. On reprend donc l'IMAGE du PDF (pdfimages, num 22), telle
# quelle, sans savoir ni changer ou elle mene. ⚠ NE PAS LA REMPLACER.
import base64 as _b64
QR = _b64.b64encode(open('/private/tmp/claude-501/-Users-magalicontrino-SAMU/34b0f6d0-5f97-4b3a-861a-6e57ec121a27/scratchpad/qr-roi.png','rb').read()).decode()

sect=''
for nom,titre,coul,lignes in SECTIONS:
    coul = COULEURS.get(titre, coul)
    apres = ('<div class="qr"><img src="data:image/png;base64,%s" alt="QR code du document">'
             '<em>Scannez pour ouvrir le ROI général</em></div>' % QR) if 'DROITS' in titre else ''
    sect+=('<section class="bl %s"><h2>%s<span>%s</span></h2><ul>%s</ul>%s</section>'
           %(coul, rond(nom,coul), H.escape(titre), ''.join(ligne(l) for l in lignes), apres))

def rang(nom,lib,val,coul):
    return ('<div class="rg">%s<div class="tx"><b>%s</b><span>%s</span></div></div>'%(rond(nom,coul),lib,val))

hor=('<div class="bl turq"><h2>%s<span>Services collectifs</span></h2><div class="rgs">%s</div></div>'
     %(rond(['hebergement','tv-antenne','ico-ondes','repas-cloche'],COULEURS['SERVICES COLLECTIFS']), ''.join(rang(*c,'turq') for c in COLLECTIFS)))
hor+=('<div class="bl vert"><h2>%s<span>Services PMS</span></h2><div class="rgs">%s</div></div>'
      %(rond(['medical','sante-mentale','social'],COULEURS['SERVICES PMS']), ''.join(rang(*c,'vert') for c in PMS)))

polices=''
for w,f in [('400','eastman-regular'),('600','eastman-demibold'),('800','eastman-extrabold')]:
    b=base64.b64encode(open('font/%s.woff2'%f,'rb').read()).decode()
    polices+=("@font-face{font-family:E;src:url(data:font/woff2;base64,%s) format('woff2');"
              "font-weight:%s;font-display:swap;unicode-range:U+0-2F, U+3A-10FFFF}\n"%(b,w))

CSS = polices + """
:root{--noir:#1b1b1b;--enc:#56544f;--ligne:#d8d6d2;
  --turq:#6FC7D9;--rouge:#e63329;--jaune:#f5c542;--vert:#6cb392;--mauve:#8a7fa8}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#e9e8e6}
body{font-family:E,system-ui,sans-serif;color:var(--noir);-webkit-font-smoothing:antialiased}
.f{width:210mm;margin:20px auto;background:#fff;padding:15mm 15mm;box-shadow:0 2px 18px rgba(0,0,0,.14)}
h1{font-size:28pt;font-weight:800;margin:0;line-height:1.02;letter-spacing:-.02em}
.lieu{font-size:12.5pt;font-weight:600;color:var(--enc);margin:8px 0 0;line-height:1.3}
.src-h{font-size:9.5pt;color:var(--enc);margin:6px 0 0}
.bar{height:6px;background:var(--noir);margin:14px 0 26px;border-radius:3px}
.pagen{font-size:9pt;font-weight:700;color:var(--enc);letter-spacing:.14em;text-transform:uppercase;margin:0 0 18px}
/* ⚠ PAS DE `padding` EN POURCENTAGE ICI. Un padding en % se calcule sur la LARGEUR DU
   PARENT, pas sur celle de l'element : un rond de 42px avec padding:20% heritait de
   136px de marge interieure du titre, et `border-box` ne peut pas descendre sous
   padding+bordure — le rond sortait a 278px, vide. On centre le dessin en flex et on
   le dimensionne en % DE LUI-MEME. */
.pic{width:58%;height:58%;display:block}
.rd{width:100%;height:100%;border-radius:50%;border:3px solid var(--turq);
    background:#fff;flex:none;display:flex;align-items:center;justify-content:center}
.rd.rouge{border-color:var(--rouge);color:var(--rouge)}
.rd.rouge .pic path,.rd.rouge .pic rect,.rd.rouge .pic circle{fill:currentColor}
.rd.vert{border-color:var(--vert)} .rd.mauve{border-color:var(--mauve)} .rd.turq{border-color:var(--turq)}
.rds{display:flex;gap:7px;flex:none}
.rds .rd{width:52px;height:52px}
.rg .rds{gap:6px}
.rg .rds .rd{width:44px;height:44px}
.rd.vide{border-style:dashed;border-color:#c3c1bd;background:repeating-linear-gradient(45deg,#fff,#fff 5px,#f4f3f1 5px,#f4f3f1 10px)}
.bl{margin:0 0 26px;break-inside:avoid}
.bl h2{display:flex;align-items:center;gap:14px;font-size:15pt;font-weight:800;margin:0 0 12px;
       border-bottom:2.5px solid var(--noir);padding-bottom:9px}
.bl h2 .rd{width:52px;height:52px}
ul{list-style:none;margin:0;padding:0}
li{font-size:11pt;line-height:1.5;padding:8px 0 8px 20px;position:relative;
   border-bottom:1px solid #edebe8;break-inside:avoid}
li:last-child{border-bottom:0}
li:before{content:"";position:absolute;left:0;top:15px;width:7px;height:7px;border-radius:50%;background:var(--noir)}
li.non{color:var(--rouge);font-weight:600}
li.non:before{background:var(--rouge)}
b.tel{font-size:12.5pt;font-weight:800;white-space:nowrap}
.rg b.tel{font-size:11.5pt}
.rgs{display:block}
.rg{display:flex;align-items:flex-start;gap:14px;padding:11px 0;border-bottom:1px solid #edebe8;
    break-inside:avoid}
.rg:last-child{border-bottom:0}
.rg .rd{width:48px;height:48px}
.rg .tx{flex:1;min-width:0}
.rg .tx > b{display:block;font-size:11.5pt;font-weight:800;line-height:1.3}
.rg .tx span b{font-weight:800}
.rg .tx b em{font-style:normal;font-weight:600;color:var(--enc);font-size:10pt}
.rg .tx span{display:block;font-size:11pt;line-height:1.5;margin-top:3px}
.qr{margin:16px 0 0;text-align:center;break-inside:avoid}
.qr img{width:38mm;height:38mm;display:block;margin:0 auto}
.qr em{display:block;font-style:normal;font-size:9.5pt;font-weight:600;color:var(--enc);margin-top:7px}
.pied{margin:26px 0 0;border-top:2.5px solid var(--noir);padding-top:14px;
      display:flex;gap:16px;break-inside:avoid}
.pied div{flex:1}
.pied em{display:block;font-style:normal;font-size:9.5pt;color:var(--enc);font-weight:600}
.pied b{font-size:12.5pt;font-weight:800}
.src-f{font-size:9.5pt;color:var(--enc);margin:24px 0 0;text-align:center;line-height:1.5;
       border-top:1.5px solid var(--ligne);padding-top:14px}
.manq{margin:26px 0 0;border:2.5px dashed #c3c1bd;border-radius:16px;padding:16px 18px;background:#faf9f7}
.manq b{display:block;font-size:11.5pt;margin:0 0 8px}
.manq p{font-size:10.5pt;line-height:1.55;margin:0}
@page{size:A4;margin:12mm 13mm}
@media print{
  html,body{background:#fff}
  .f{width:auto;margin:0;padding:0;box-shadow:none}
  .f + .f{margin-top:24px}
  .noprint,.manq{display:none}
}
.noprint{max-width:210mm;margin:18px auto 30px;text-align:center}
.noprint button{font-family:E,sans-serif;font-size:12pt;font-weight:600;padding:11px 22px;
  border:2px solid var(--noir);border-radius:999px;background:#fff;cursor:pointer}
"""

DOC = ("""<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<title>Résumé ROI — proposition de mise en page</title>
<!--
  PROPOSITION du 21/09/2026 — Mag :
  « Sur la feuille il y a des pictos presque a chaque truc. Je veux qu'on fasse
    ensemble tous les pictos, un par un s'il faut, mais il ne faut pas que tu
    retires des pictos. Sauf que cette feuille elle n'est pas claire, elle n'est
    pas aeree, elle n'est pas schematisee. Je ne veux pas que tu changes non plus
    l'ordre et tout. Je veux juste que tu refasses une mise en page et qu'on
    refasse tous les pictos. »

  ⚠ C'EST UNE MISE EN PAGE, PAS UNE REECRITURE. Le document refait ici est
    l'ACCUEIL BENEFICIAIRE - RESUME ROI - PDL, MAJ 24-02-25
    (documents/roi/resume-fr.pdf). Meme ordre, memes sections, meme texte :
    les phrases sont recopiees, seulement decoupees une par ligne. Aucune phrase
    ajoutee, aucune retiree, aucun picto retire.
  ⚠ HUIT PICTOS MANQUENT dans picto/ : leur rond est vide et hachure sur la
    feuille. La liste est au bas de la page 2 (elle ne s'imprime pas).
  ⚠ FICHIER AUTONOME : pictos colles en SVG, polices en base64, zero `src="../"`.
-->
<style>""" + CSS + """</style></head><body>

<div class="f">
  <h1>Accueil bénéficiaire</h1>
  <p class="lieu">Résumé ROI — PDL</p>
  <p class="src-h">MAJ : 24-02-25</p>
  <div class="bar"></div>
""" + sect + """
</div>

<div class="f">
  <p class="pagen">Horaires des services</p>
""" + hor + """
  <div class="pied">
    <!-- ⚠ LE SEUL ENDROIT OU CETTE FEUILLE S'ECARTE DU DOCUMENT D'ORIGINE, et c'est
         Mag qui le dicte (21/09/2026 : « le responsable du centre, maintenant, c'est
         Marc »). Le resume PDF du 24-02-25 dit encore « Joan » : c'est le PDF officiel
         qui est perime, pas la feuille. A faire corriger a la source. -->
    <div><em>Responsable de Centre</em><b>Marc</b></div>
    <div><em>Coordinateur médical</em><b>Claude</b></div>
    <div><em>Coordinatrice sociale</em><b>Laura</b></div>
  </div>

</div>

<div class="noprint"><button onclick="window.print()">Imprimer</button></div>
</body></html>""")

open('propositions/resume-roi.html','w',encoding='utf-8').write(DOC)

# ═══════════════════════════════════════════════════════════════════════════
#  LA VERSION MINIMALE (Mag, 21/09/2026 : « une version minimal, c'est-a-dire
#  avec TOUT, mais qui rentre sur un recto verso »)
#  ⚠ MEME TEXTE, MEMES PICTOS, MEME ORDRE. On ne coupe RIEN : on serre.
#     - les dix sections passent en DEUX COLONNES
#     - les horaires aussi
#     - le corps descend a 8,4 pt et les interlignes a 1,25
#     - les ronds retrecissent (c'est le prix : elle les voulait gros)
#  L'autre fichier, resume-roi.html, reste « la version normale » : on n'y touche pas.
# ═══════════════════════════════════════════════════════════════════════════
MINI = """
.f{width:210mm;padding:9mm 10mm}
h1{font-size:19pt}
.lieu{font-size:10.5pt;margin-top:5px}
.src-h{font-size:8.5pt;margin-top:4px}
.bar{height:4px;margin:8px 0 13px}
.pagen{font-size:8.5pt;margin:0 0 11px}
.cols{column-count:2;column-gap:6mm}
.bl,section.bl{margin:0 0 11px;break-inside:avoid;-webkit-column-break-inside:avoid}
.bl h2{font-size:11pt;gap:8px;padding-bottom:5px;margin:0 0 7px;border-bottom-width:1.8px}
.bl h2 .rd{width:32px;height:32px;border-width:2.4px}
.rds{gap:5px}.rds .rd{width:32px;height:32px;border-width:2.4px}
li{font-size:9pt;line-height:1.36;padding:3px 0 3px 12px;border-bottom:0}
li:before{width:4.6px;height:4.6px;top:9px}
b.tel{font-size:10.5pt}
.rg{padding:5px 0;gap:9px;border-bottom:1px solid #eeecea}
.rg .rd{width:34px;height:34px;border-width:2.4px}
.rg .rds{gap:4px}.rg .rds .rd{width:30px;height:30px;border-width:2.2px}
.rg .tx > b{font-size:9.6pt;line-height:1.3}
.rg .tx > b em{font-size:8.4pt}
.rg .tx span{font-size:9pt;line-height:1.36;margin-top:2px}
.rg b.tel{font-size:9.6pt}
.qr{margin:9px 0 0}
.qr img{width:24mm;height:24mm}
.qr em{font-size:8.6pt;margin-top:5px}
.pied{margin:10px 0 0;padding-top:8px;border-top-width:1.8px;gap:10px}
.pied em{font-size:8.4pt}
.pied b{font-size:11.5pt}
@page{size:A4;margin:9mm 10mm}
"""
DOC_MINI = DOC.replace('</style>', MINI + '</style>', 1)
DOC_MINI = DOC_MINI.replace('<title>Résumé ROI — proposition de mise en page</title>',
                            '<title>Résumé ROI — version courte, 3 pages</title>', 1)
# les sections en deux colonnes
import re as _re
DOC_MINI = DOC_MINI.replace('<div class="bar"></div>\n', '<div class="bar"></div>\n<div class="cols">', 1)
DOC_MINI = DOC_MINI.replace('\n</div>\n\n<div class="f">\n  <p class="pagen">',
                            '</div>\n</div>\n\n<div class="f">\n  <p class="pagen">', 1)
# les horaires aussi
DOC_MINI = DOC_MINI.replace('<p class="pagen">Horaires des services</p>\n',
                            '<p class="pagen">Horaires des services</p>\n<div class="cols">', 1)
DOC_MINI = DOC_MINI.replace('  <div class="pied">', '  </div>\n  <div class="pied">', 1)
open('propositions/resume-roi-minimal.html','w',encoding='utf-8').write(DOC_MINI)
print("normal :", len(DOC), "| minimal :", len(DOC_MINI))
