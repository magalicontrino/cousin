# Handoff : COUSIN · Lux — refonte des écrans

## Vue d'ensemble
Refonte visuelle complète de l'app interne COUSIN (outil d'équipe pour un centre d'hébergement à Bruxelles).
16 écrans validés, dessinés à partir du code réel de `lux.html` : mêmes données, mêmes pictos, mêmes couleurs de marque.
La structure fonctionnelle de l'app existante ne change pas (header, dock à 4 boutons, contenus du réseau).

## À propos des fichiers de design
Les fichiers HTML de ce dossier sont des **références de design** : des prototypes qui montrent l'aspect
et le comportement attendus. Ce n'est pas du code de production à copier tel quel.
Le travail consiste à **recréer ces écrans dans l'environnement existant du projet** (`lux.html` est
aujourd'hui une app JS mono-fichier avec du HTML généré par des fonctions et une feuille `design-peau.css`)
en suivant ses conventions. Les valeurs exactes (hex, tailles, graisses) sont à reprendre littéralement.

## Fidélité
**Haute fidélité.** Couleurs, typographie, espacements et états sont définitifs. Recréer au pixel.

## Écrans (dans l'ordre du parcours)
| # | Écran | Entrée | Rôle |
|---|-------|--------|------|
| 01 | Accueil | dock · Accueil | pile de cartes du quiz, sorties du jour, boules « à faire aujourd'hui », slide des étoiles |
| 02 | Réseau | dock · Réseau | titre « Vous cherchez qui ? » + 14 cartes de domaines, bande de couleur en haut de carte |
| 03 | Domaine | carte de domaine | fiches groupées par commune, un seul filtre « Commune » (Toutes + 19 communes) |
| 04 | Fiche | ligne de fiche | adresse, téléphone, horaires, notes, étoile |
| 05 | Le centre | dock · Centre | outils de l'équipe d'abord, puis le quotidien |
| 06 | Ma liste | tuile « Ma liste » | check-list du rôle du jour, anneau de progression, autres rôles repliés |
| 07 | Le linge | boule « Linge », tuile du centre | comment faire une machine + tour de la semaine par étage |
| 08 | Formations | tuile « Formations » | modules, chapitres, bouton « Se tester » vers le quiz |
| 09 | Quiz | pile de l'accueil, « Se tester » | 5 questions, 5 boules d'état + décompte |
| 10 | Urgences | dock · Urgences | 112 / 101 en évidence, catégories dépliables, numéros en cases |
| 11 | Le fil | cloche du header (via profil) | messages d'équipe, carte épinglée noire, réactions |
| 12 | Écrire | bouton « Écrire » du fil | zone de texte, ton du message, épingler, photo |
| 13 | Quoi de neuf | cloche du header | dernière minute, journal des nouveautés daté |
| 14 | Autour d'ici | tuile « Autour d'ici » | le quartier groupé par besoin, itinéraire + téléphone |
| 15 | Profil | silhouette du header | identité, étoiles, ma liste, déconnexion |
| 16 | Admin | roue du header | demandes d'accès en tête, le chantier, équipe et vues (sections dépliables) |

Chaque écran fait **390 px** de large, header et dock inclus.

## Structure commune
**Header** (haut de chaque écran) : logo COUSIN (26 px de haut), espace flexible, puis 4 boutons carrés
38×38 px, filet 1,5 px #1b1b1b, picto 16 px centré : roue → Admin, silhouette → Profil,
cloche (badge rouge #e63329, 12 px) → Quoi de neuf, étoile (#c9940c) → Réseau.
Séparé par `border-bottom:1px solid #d6d4d0`.

**Dock** (bas) : 4 colonnes centrées, gap 14 px, `border-top:1px solid #d6d4d0`.
Chaque bouton : rond 50 px + libellé mono 8 px, lettrage .16em, majuscules.
Actif = rond de couleur avec picto noir et libellé en gras ; inactif = rond noir avec picto de couleur et libellé #8b8984.
Accueil #f5c542 · Réseau #f3c6da · Centre #A9C8E8 · Urgences #e63329.

**Bandeau de titre d'écran** : bloc noir #1b1b1b pleine largeur, texte #f2eee6, titre 34–40 px, 800,
majuscules, `letter-spacing:-.035em`, `line-height:.9` ; surtitre mono 9,5 px en couleur d'accent.
Retour = rond 36 px, filet 1,5 px crème, chevron 13 px.
La première carte de contenu remonte de 12 px (`margin-top:-12px`) pour chevaucher le bandeau.

## Interactions
- Navigation : dock (4 écrans), header (4 destinations), retour (pile d'historique), liens de contenu.
- Sections dépliables (Urgences, Admin) : fermée = carte blanche filet noir + « + » ; ouverte = carte noire + « − », enfants indentés de 14 px.
- Cartes à cocher (Ma liste) : faite = fond #f6f5f3, filet #dcdad5, titre #8b8984 barré, case noire avec coche verte.
- Carrousels (sorties, étoiles, chapitres) : défilement horizontal, dernière carte volontairement coupée (70 px) pour signaler la suite ; 3 barres de pagination sous le rail.
- Pas de recherche dans l'app : aucune barre de recherche sur aucun écran.

## Jetons de design
**Couleurs** — encre #1b1b1b · fond d'écran #f0efed · fond de page #e2e0dc · carte blanche #fdfdfc ·
carte grise #f6f5f3 · filets #d6d4d0 et #dcdad5 · texte secondaire #8b8984, #73716b, #a3a19c · crème #f2eee6.
Accents : jaune #f5c542, jaune vif #F5EE5E, rose #f3c6da, rose vif #fd8fd0, vert #6cb392, vert vif #3ec98b,
orange #f8763f, corail #F9855C, bleu #A9C8E8, bleu foncé #5b8fd4, brun #b28b7a / #B77F6E, rouge #e63329.
**Typo** — Eastman (400/500/600/700/800), `font-family:'Eastman',-apple-system,'Segoe UI',sans-serif`.
Titres 800 majuscules ; libellés machine en `ui-monospace` 8–11 px, lettrage .12–.24em, majuscules.
**Rayons** — planche couleur : 16 px (cartes), 24 px (grandes cartes), 999 px (pastilles), 50 % (ronds).
Variante mixte retenue : 6 px / 8 px, sans ombres, filets noirs 1,5 px.
**Espacements** — gouttière d'écran 16 px, gap entre cartes 10–12 px, section 18–22 px.

## Assets
- Polices : `font/eastman-*.woff2` (déjà dans le projet).
- Pictos : `picto/*.svg` du projet, appliqués en `-webkit-mask`/`mask` sur un `<i>` coloré en `background`.
  Exception : `lgbtqi.svg` est en couleur, à poser en `<img>`.
- Logo : `logo.png`.

## Fichiers
- `Planche COUSIN.dc.html` — les 16 écrans validés, en couleur.
- `Planche COUSIN mixte.dc.html` — même planche, angles resserrés et sans ombres (direction retenue).
- `Planche COUSIN plate.dc.html` — variante monochrome, pour référence.
- `Prototype COUSIN.dc.html` — les 16 écrans dans un téléphone cliquable (navigation réelle).
- `Accueil COUSIN.dc.html` — la planche de travail avec toutes les variantes explorées (historique des décisions).
- `picto/`, `font/`, `logo.png` — les assets utilisés.

## Grands écrans (1440 px)
Voir `Bureau COUSIN.dc.html` — les 16 écrans déclinés pour le bureau (B1 à B16, même ordre que le tableau ci-dessus).

**Règles de mise en page**
- Cadre 1440 px, contenu bridé à **1204 px** (`max-width`), gouttières 44 px, padding vertical 36/48 px.
- Le dock du téléphone devient un **rail fixe de 236 px à gauche**, fond #1b1b1b, hauteur pleine :
  logo (56 px de large, inversé), les 4 destinations principales (rond de couleur 34 px + libellé mono 10 px),
  puis en bas, séparées d'un filet `rgba(242,238,230,.2)`, les 4 secondaires (Le fil, Quoi de neuf, Profil, Admin).
  Actif = ligne crème #f2eee6 à texte noir, rayon 6 px.
- Le bandeau noir du téléphone devient un **titre 60 px** (800, majuscules, `letter-spacing:-.04em`, `line-height:.9`)
  posé sur un filet `1.5px solid #1b1b1b`, avec le surtitre mono 10 px en couleur d'accent au-dessus.
- Les listes verticales deviennent des grilles : domaines 5 colonnes · étoiles 4 · sorties/outils/formations 3 · fiches par commune 3 · lieux du quartier 4.
- Les écrans à contenu long passent en **deux colonnes** (principal + latéral) : fiche 1.35/0.65 · ma liste 1.4/0.6 ·
  linge 0.9/1.1 · quiz 1.15/0.85 · le fil 1.3/0.7 · écrire 1.35/0.65 · quoi de neuf 1.2/0.8 · profil 0.8/1.2 · admin 1.15/0.85.
- Les sections dépliables des Urgences s'ouvrent en pleine largeur (`grid-column:span 2`), numéros en 3 colonnes.
- Rayons, filets et absence d'ombres identiques à la variante mixte (6–8 px, filets noirs 1,5 px).
- En dessous de 1440 px : réduire les grilles (5→3→2 colonnes), passer les deux colonnes en une seule, et
  le rail redevient le dock horizontal du mobile sous ~900 px.
