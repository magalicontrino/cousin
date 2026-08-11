# Les listes de chaque travailleur — brouillon

Commencé le **11/08/2026** avec Mag. On reprend les 12 check-lists une par une.

**Règle de travail** : rien n'est écrit dans la base tant que Mag n'a pas validé la
liste. On prépare ici, on pose d'un coup à la fin. (Sa consigne du 11/08/2026 :
« pose d'un coup à la fin ».)

**Rythmes possibles** : `jour` (tous les jours) · `semaine` (une fois par semaine) ·
`reprise` (à chaque reprise, comme l'entretien mi-parcours).

---

## Où on en est

| Liste | Dans la base | Statut |
|---|---|---|
| Travailleur social | 2 | ✅ **arrêtée** — 1 ligne, pas de liste imposée |
| Éducateur | 1 | ⏳ **en cours** |
| PFO — Jour | 7 | à faire |
| PFO — Nuit | 3 | à faire |
| Médical — toutes | 2 | à faire |
| Médical — Jour · rez | 1 | à faire |
| Médical — Jour · 2e étage | 3 | à faire |
| Médical — Nuit | 1 | à faire |
| Aide-soignants — Matin | 1 | à faire |
| Aide-soignants — Jour | 2 | à faire |
| Polyvalent — Jour | 7 | à faire |
| Polyvalent — Nuit | 11 | à faire |

---

## 1. Travailleur social (`ts`)

### ✅ ARRÊTÉ — la liste TS tient en une ligne

1. ~~Parc — 11 h~~ → **À RETIRER** (« retire parc »). Elle l'avait dictée le matin
   même, puis n'a pas su la réexpliquer. Rien de perdu : ce que les gens ont coché
   vit dans une autre table.
2. **Vérifier que la cuisine est bien en duo** · `jour` · **ordre 1**
   « Laisse comme ça, ça doit toujours être en haut. » On ne touche donc ni au
   texte ni au rythme, et elle reste la première ligne de la liste.
   → `jour` + `ordre 1` la met en tête tous les jours, sans rien coder : le bloc
   « jour » est le premier affiché.
   → conséquence assumée : elle ne passera pas en rouge le jour de la reprise du
   4/4 (ça, c'est réservé au rythme `reprise`). Elle est en haut tous les jours à
   la place.

### ✅ PAS DE JOUR/NUIT pour les TS
Décision revue le 11/08/2026. On l'avait séparé en pensant faire deux vraies
listes ; pour une seule ligne, couper en deux n'apporte rien. **La clé `ts` reste
`ts`.** Si la nuit se met à avoir ses propres tâches, on coupera à ce moment-là.

### ✅ LES TS N'AURONT PAS DE LISTE IMPOSÉE
Ses mots : « Ils travaillent un peu en urgence… ils sont en permanence en bas, ils
font de l'administratif, mais on ne peut pas dire il faut que tu fasses ça, puis ça,
puis ça. Ça n'a aucun sens. Il faut qu'eux-mêmes puissent faire leur liste. »

→ Ce qu'elle demande **existe déjà** : « **Mes rappels** » — la personne l'écrit
elle-même, elle seule la voit, elle la suit d'un téléphone à l'autre, chaque ligne
peut porter une date, et elle s'affiche juste sous la liste de métier. Rien à
construire.

### 🕓 En attente de son accord — les mots de l'écran vide
Aujourd'hui un TS lit : « Aucune check-list de rôle ne t'est attribuée. Si ton rôle
en a une, demande-la à Mag. » Ça sonne comme un oubli, alors que c'est un choix.
Proposé : « Ton métier n'a pas de liste toute faite : c'est à toi de faire la
tienne. » **Ne rien changer sans son oui** (cf. [[cousin-demander-avant-design]]).

### ✅ TS matin / TS soir — même groupe
« Les TS matin, les TS soir ne font pas la même chose, mais on peut les mettre
quand même dans le même groupe. » → une seule liste `ts`.

### 🕓 TS NUIT — repoussé
« Les TS nuit font un boulot quand même à part, et c'est un gros travail de
passation, donc on travaillera là-dessus plus tard. » **Ne pas ouvrir aujourd'hui.**
Voir [[cousin-passation-nuit]] et [[cousin-tour-des-chambres]].

---

## 2. Éducateur (`educ`)

« Les éducs, c'est un truc à part. » Eux ONT un déroulé, contrairement aux TS.

### Déjà dans la base
1. Vérifier que la cuisine est bien en duo · `jour`

### À ajouter (dicté le 11/08/2026, les deux mots douteux confirmés par elle)
2. **Le matin, faire le rapport s'il n'y a pas de travailleur social** · `jour`
   Sa précision : « parce que sinon, ce sont les travailleurs sociaux qui le font ».
   → la condition fait partie de la tâche, elle ne peut pas sauter à la réécriture.
3. **Faire les accompagnements** · `jour`
4. **Le tour des chambres** · `jour`
   (dicté « le tour des champs », confirmé : « c'est bien le tour des chambres »)

### Le tour des chambres — visible et modifiable par tous (Mag, 11/08/2026)
« Il faut que tout le monde puisse le voir. Sans exception. Et la toucher, mais
toujours avec un menu qui demande si on veut bien modifier. Et que c'est le nom de
celui qui l'a modifié. »

Vérifié dans le code et dans la base :
- **Voir — déjà le cas.** La carte vit dans Centre → « Le quotidien », qui n'est
  filtré pour personne, et les 13 rôles de `roles_acces` ont tous le pavé `centre`.
- **Toucher — déjà le cas.** Les politiques de `tour_bacs` ouvrent lecture,
  écriture, modification et suppression à tout membre connecté.
- **La fenêtre qui demande — existait sauf à un endroit.** Prévenir, régler,
  rouvrir, retirer demandaient déjà. Le compteur de bacs (− / + un bac), lui, était
  l'exception assumée (« c'est une rectification, pas une signature »).
  → **fermée le 11/08/2026** : il demande maintenant, et il signe.
- **Le nom — déjà partout** (`cree_par`, `prevenu_par`, `regle_par`, et chaque
  entrée du journal), et désormais sur la correction du nombre aussi.

⚠ À lui signaler : le compteur demandant à chaque appui, passer de 1 à 4 bacs ouvre
trois fenêtres. Si ça la gêne, l'autre façon serait de régler le nombre puis de
confirmer une seule fois — à décider avec elle.

### Reste à trancher
- Ordre des lignes ? Proposé : rapport → accompagnements → tour des chambres →
  cuisine en duo. Le rapport est le premier geste du matin.
- Jour / nuit séparés chez les éducs ?

---

## 3. PFO (`pfo-jour` / `pfo-nuit`)

### Déjà dans la base — PFO Jour (7)
1. Entretien mi-parcours · `reprise`
2. Créer le rapport (2 jours) · `jour`
3. Vérifier les nuits d'absence · `jour`
4. Désencoder les +3 jours d'absence · `jour`
5. Mettre A VIDER sur la liste étage · `jour`
6. Mettre A NETTOYER sur la liste étage · `jour`
7. Vérifier le nombre de LAM · `jour`

### Déjà dans la base — PFO Nuit (3)
1. Présence · `jour`
2. Entretien mi-parcours · `reprise`
3. Vérifier les nuits d'absence (justifié ou non) · `jour`

### À ajouter (dicté le 11/08/2026, puis précisé par elle)
- **Comparer les présences entre Kioskup et la liste étage** · `reprise`

  **Deux fois par cycle** : « c'est en début de [7/7] et en fin de 7/7 ».

  **⚠ DEUX CHOSES À LUI FAIRE CONFIRMER AVANT DE POSER LA LIGNE :**
  1. **Le nom de l'outil.** Elle a écrit **« kairos »** la première fois, puis
     **« Kioskup »** la seconde. Ce sont deux mots trop différents pour trancher à
     sa place — et un nom de logiciel faux dans une check-list rend la ligne
     incompréhensible. **Lui demander l'orthographe exacte.**
  2. **Dans quelle liste ?** Jour, nuit, ou les deux ? Le 7/7 est le cycle des PFO,
     mais l'app a deux listes séparées.

  **⚠ ET UN MANQUE DE L'APP.** Les rythmes existants sont `jour`, `semaine`,
  `reprise`. **Il n'y a rien pour « en fin de cycle ».** `reprise` pose la tâche au
  PREMIER jour du 7/7 — la moitié « fin de 7/7 » ne peut donc pas s'exprimer telle
  quelle. Deux façons de faire, à choisir avec elle :
  - **Sans rien coder** : une seule ligne en `reprise`, dont le TEXTE dit « en début
    et en fin de 7/7 ». On la voit le premier jour, on sait qu'il y en aura une
    deuxième. Imparfait : rien ne la rappellera le dernier jour.
  - **En codant un quatrième rythme `fin-de-cycle`** : l'app connaît déjà la date
    de reprise de la personne (`repriseLe()`) et la longueur des cycles
    (`cyclesDuJour()`), donc elle peut savoir quel jour le cycle se termine. C'est
    du travail, mais c'est la seule façon que la tâche apparaisse le bon jour.

⚠ Rappel du bouton PFO ci-dessous : la liste PFO ne doit contenir que ce que le PFO
a **en plus** du travailleur social.

---

## Le bouton PFO (Mag, 11/08/2026)

**Ce qu'elle demande.** Un travailleur social garde SA liste de TS. Le jour où il
prend la garde PFO, il appuie sur un bouton marqué **PFO** et les tâches du PFO
**s'ajoutent** à sa liste — elle s'allonge, elle ne change pas.

**⚠ Il s'éteint chaque nuit, on le rallume chaque matin.** Ses mots : « on doit
l'allumer, tous les matins il faut le mettre ».

**Pourquoi c'est un dépannage et pas un rôle.** « Le PFO, il est payé en tant que
PFO et attitré. C'est juste que si jamais le PFO est absent. » Le PFO titulaire a
donc sa liste en permanence (il est dans `pfo-jour` / `pfo-nuit` par ses accès) ;
le bouton ne sert qu'à celui qui le remplace pour la journée.

**Ce que ça impose au contenu.** La liste PFO ne doit contenir **que ce que le PFO
a EN PLUS** du travailleur social. Sinon, le jour où le bouton est allumé, les
tâches communes apparaissent en double.

**Jour et nuit suivent.** Le bouton donne `pfo-jour` à qui suit la liste de jour,
`pfo-nuit` à qui suit celle de nuit.

**À construire** (rien n'est codé) : le bouton dans « Ma liste », et une mémoire du
jour — même logique que les cases qui se décochent chaque nuit.

---

## ⚠ À FAIRE AVANT QUE TOUT ÇA SERVE — les accès

Relevé le 11/08/2026 : **29 personnes sur 35 n'ont aucune liste attachée.**

- Ont une liste : `pfo-jour` (4), `pfo-nuit` (3), `polyvalent-jour` (1).
- N'ont rien : les 10 travailleurs sociaux, les 8 infirmiers, les 4 éducateurs,
  les 3 aide-soignants, les 2 psychologues, les 2 logistiques…

Les listes sont donc invisibles pour presque toute la maison. Une fois les contenus
prêts, il faut passer par **Admin → chaque personne → cocher ses listes**.

### À ajouter
_(en attente de sa dictée)_
