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

# LE CONTENU RÉEL DE LA BASE — relevé le 13/08/2026

Lu directement dans `CHECKLISTS`, app connectée en admin. **41 tâches en tout.**
C'est le point de départ : ne pas redicter ce qui est déjà là.

### PFO — Jour (`pfo-jour`) — 7
1. Entretien mi-parcours · `reprise`
2. Créer le rapport (2 jours) · `jour`
3. Vérifier les nuits d'absence · `jour`
4. Désencoder les +3 jours d'absence · `jour`
5. Mettre A VIDER sur la liste étage · `jour`
6. Mettre A NETTOYER sur la liste étage · `jour`
7. Vérifier le nombre de LAM · `jour`

### PFO — Nuit (`pfo-nuit`) — 3
1. Présence · `jour`
2. Entretien mi-parcours · `reprise`
3. Vérifier les nuits d'absence (justifié ou non) · `jour`

### Travailleur social (`ts`) — 2
1. **Parc — 11 h** · `jour` → ⚠ **à retirer**, décidé le 11/08, pas encore fait
2. Vérifier que la cuisine est bien en duo · `jour`

### Éducateur (`educ`) — 1
1. Vérifier que la cuisine est bien en duo · `jour`

### Médical — toutes (`médical`) — 2
1. Pharmacie · `jour`
2. Encoder les transports · `jour`

### Médical — Jour · rez (`médical-rez`) — 1
1. Entretien mi-parcours · `reprise`

### Médical — Jour · 2e étage (`médical-2e`) — 3
1. Vous pouvez demander les PM, les TTT manquants · `jour`
2. Entretien mi-parcours · `reprise`
3. Vérifier les réquisitoires le week-end pour la semaine · `semaine`

### Médical — Nuit (`médical-nuit`) — 1
1. Entretien mi-parcours · `reprise`

### Aide-soignants — Matin (`aide-soignant-matin`) — 1
1. Toilettes · `jour`

### Aide-soignants — Jour (`aide-soignant-soir`) — 2
1. Les entrants · `jour`
2. Les protocoles · `jour`

### Polyvalent — Jour (`polyvalent-jour`) — 7
1. Rondes & présence · `jour`
2. Mise en place du petit-déjeuner · `jour`
3. Préparation café et thé (2 cafés + 1 thé) · `jour`
4. Recharger le petit-déjeuner (lait, confiture, pain…) · `jour`
5. Accompagnement petit-déjeuner jusqu'à 07h45 · `jour`
6. Contrôler le retour du matériel avant départ (talkies, clés voitures, clés coordi…) · `jour`
7. Vérification des clés avant départ (voiture, coordi, talkies, téléphones…) · `jour`

### Polyvalent — Nuit (`polyvalent-nuit`) — 11
1. Vérification des clés (voiture, coordi, talkies, téléphones…) · `jour`
2. Briefing et note des infos du jour avec le travailleur social · `jour`
3. Tour du bâtiment (stocks, garage, -1) · `jour`
4. Lancement du lavage du linge (10 sacs/nuit) · `jour`
5. Sortie poubelle & rangement garage · `jour`
6. Rangement du stock (affaires des hébergés) · `jour`
7. Rangement du linge de lit sale dans les chariots · `jour`
8. Ravitaillement de la fontaine à eau · `jour`
9. Rangement réfectoire & jardin · `jour`
10. Distribution du linge de lit aux étages · `jour`
11. Changer les sacs de linge aux étages & descendre au -1 · `jour`

## ⚠ Ce que la lecture fait apparaître — 4 points à trancher avec elle

1. **« Entretien mi-parcours » — ✅ RÉPONDU le 13/08/2026.** Ses mots : « c'est **tous
   les travailleurs sociaux et tous les médicaux**. Pour ce qui est des PFO aussi. »

   **Donc SEPT listes la portent** : `ts`, les trois `médical-*`, `médical`, et les
   deux `pfo-*`. Aujourd'hui elle est dans cinq — et **elle manque chez les TS**,
   alors qu'ils y ont droit.

   ⚠ **C'est exactement le piège des doublons du catalogue** : sept copies de la même
   phrase, et le jour où on change le mot, il faut penser aux sept. Deux façons :
   - **① La recopier dans les sept listes.** Rien à coder, on pose sept lignes. Mais
     sept endroits à corriger le jour où ça bouge, et rien ne garantit qu'elles
     resteront identiques (c'est ce qui est arrivé à la Croix-Rouge).
   - **② Une ligne « pour tout le monde », écrite UNE fois.** Une liste `tous` dans la
     base, dont les tâches viennent s'ajouter en haut de la liste de chacun. Une
     ligne dans la base, une seule à corriger, et personne ne peut la rater. Il faut
     coder l'ajout — c'est petit.
     **Ma suggestion : ②.** Et cette liste `tous` servira sûrement à autre chose
     ensuite (les consignes qui valent pour toute la maison).

   ### ✅ ELLE A CHOISI ② LE 13/08/2026 — « pour tout le monde »
   Une seule ligne dans la base, qui s'ajoute à la liste de chacun. **Une phrase, un
   endroit à corriger.** C'est le code qui la distribue, pas la recopie.
   → À construire : une liste de clé **`tous`** dont les tâches viennent se poser en
   tête de chaque liste de métier. Le reste (rythme `reprise`, l'ordre) ne change pas.
   ⚠ Une fois faite, **retirer les cinq copies existantes** (les deux PFO et les trois
   Médical), sinon la ligne apparaîtra deux fois chez eux.

   ✅ **Et le bouton PFO est reconfirmé** (13/08) : « un PFO peut être un autre PFO le
   lendemain, donc il faut pouvoir se mettre PFO pour avoir la liste adéquate. »
   Voir la section « Le bouton PFO » plus bas.

2. **Deux listes n'ont QUE cette ligne** : `médical-rez` et `médical-nuit`. Elles sont
   donc vides en pratique. Un infirmier de nuit qui ouvre sa liste voit une seule
   tâche, qui n'est pas de son service — il n'ouvrira plus.

3. **Les aide-soignants — ✅ RÉPONDU le 13/08/2026** : « l'équipe **du matin** et
   l'équipe **de jour** ». Donc **l'étiquette affichée est la bonne**, et il n'y a
   pas d'équipe du soir.
   ⚠ **C'est la CLÉ qui trompe** : elle s'appelle `aide-soignant-soir` alors que la
   liste est celle du **jour**. Personne ne voit la clé à l'écran — mais celui qui
   ouvrira la base dans six mois lira « soir » et croira à une équipe qui n'existe
   pas. **Ne pas la renommer à la légère** : la clé est recopiée dans
   `allowed_emails.listes` de chaque personne, et la renommer sans mettre à jour ces
   lignes ferait disparaître la liste de tout le monde d'un coup. Soit on la laisse
   avec un commentaire, soit on la renomme **et** on met à jour les accès dans la
   même opération. 🕓 À décider quand on posera tout.

4. **Polyvalent — Jour : deux lignes pour le même geste — ✅ TRANCHÉ le 13/08/2026.**
   Ses mots : « il y a deux choses qui disent la même chose, **retire-en une** » —
   elle m'a laissé choisir laquelle.

   - ❌ **À retirer** : *Contrôler le retour du matériel avant départ (talkies, clés
     voitures, clés coordi…)*
   - ✅ **À garder** : *Vérification des clés avant départ (voiture, coordi, talkies,
     téléphones…)*

   **Pourquoi celle-là.** Elle est **mot pour mot** la ligne 1 de Polyvalent — Nuit
   (« Vérification des clés — voiture, coordi, talkies, téléphones… »). Les deux
   équipes font le même contrôle, chacune au bout de son service : en gardant la même
   phrase des deux côtés, celui qui passe du jour à la nuit reconnaît son geste sans
   le relire. Et sa parenthèse est la plus complète des deux — elle est la seule à
   citer les **téléphones**.

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

## 3. Médical (`médical` · `médical-rez` · `médical-2e` · `médical-nuit`)

### ✅ LA STRUCTURE, dictée le 13/08/2026
« Pour les médicaux, il y a **deux étages**. Et au **rez-de-chaussée, il n'y a que
l'équipe du jour**. Au **deuxième étage, il y a l'équipe du jour ET de la nuit**. »

Donc trois services, pas quatre :

| Où | Jour | Nuit |
|---|---|---|
| **Rez-de-chaussée** | ✅ | — *il n'y a personne* |
| **2e étage** | ✅ | ✅ |

**⚠ CE QUE ÇA CORRIGE.** La liste s'appelle aujourd'hui « **Médical — Nuit** », comme
s'il y avait une nuit partout. Il n'y en a qu'une, et elle est **au 2e étage**.
→ **✅ VALIDÉ PAR ELLE le 13/08/2026 (« ok ») : la liste devient « Médical — 2e étage ·
Nuit »**, en face de « Médical — 2e étage · Jour ». La clé `médical-nuit` **ne bouge
pas** (personne ne la voit, et la renommer casserait les accès de chacun) : c'est
`LISTE_LABELS` qu'on change, dans `index.html`.
Sans ça, un infirmier du rez cherche sa liste de nuit — et elle n'existe pas.

### Ce qu'il y a aujourd'hui
- **Médical — toutes** (2) : Pharmacie · Encoder les transports
- **Rez · Jour** (1) : *rien que* l'entretien mi-parcours
- **2e · Jour** (3) : demander les PM / TTT manquants · entretien mi-parcours ·
  vérifier les réquisitoires le week-end pour la semaine (`semaine`)
- **Nuit** (1) : *rien que* l'entretien mi-parcours

→ Deux des trois services n'ont **aucune tâche à eux**.

### 🕓 À dicter — ce qu'il reste à savoir
- **Rez · Jour** : que fait l'équipe du rez, dans l'ordre de la journée ?
- **2e · Nuit** : que fait l'infirmier de nuit ? (c'est le plus vide de tous)
- **Médical — toutes** : « Pharmacie » et « Encoder les transports » — est-ce que ça
  vaut pour les trois services, ou est-ce que c'est du rez ?

---

## 4. PFO (`pfo-jour` / `pfo-nuit`)

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

  **1. ✅ TRANCHÉ le 13/08/2026 — et ce n'était pas les présences.**
  Le nom d'abord : elle avait dicté « kairos » puis « Kioskup ». Sa réponse :
  **« Kioskup, ça n'a aucun rapport. »** → c'est **KAIROS**.

  Puis elle a corrigé la ligne elle-même : **« retire la tâche. En fait, sur la liste,
  ce que je voulais mettre, c'est comparaison, absence, Kairos et liste étage. »**

  → **Ce n'est pas « comparer les PRÉSENCES », c'est comparer les ABSENCES.**
  Ligne retenue : **« Comparer les absences entre Kairos et la liste étage »**.
  ⚠ La ligne dictée le 11/08 (présences / « Kioskup ») est **annulée**, pas amendée.

  **Pourquoi la nuance compte.** Les trois autres lignes d'absence du PFO le disent :
  *Vérifier les nuits d'absence* · *Désencoder les +3 jours d'absence* (Jour) et
  *Vérifier les nuits d'absence, justifié ou non* (Nuit). Le travail du PFO porte sur
  **qui n'est PAS là** — c'est ce qui déclenche le désencodage et libère un lit.
  Comparer les présences aurait fait chercher dans l'autre sens.

  **2. Dans quelle liste ? 🕓 TOUJOURS SANS RÉPONSE** — posée le 11/08 et le 13/08,
  elle est passée à côté les deux fois. Jour, nuit, ou les deux ?
  **Ma suggestion si elle ne tranche pas : les DEUX.** Comparer les présences est un
  contrôle de cohérence — il ne sert que s'il est fait au moment où l'on prend et où
  l'on rend le service. Et c'est justement ce qu'elle a dicté : « en début de 7/7 et
  en fin de 7/7 ». Le mettre dans une seule des deux listes revient à ne le faire
  qu'une fois sur deux.

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

### La dictée des accès — commencée le 13/08/2026

**Relevé ce jour dans `allowed_emails` : 35 personnes actives, 30 sans aucune liste.**
Seuls Boutaher Tahiri, Yasmina Abettiou et Magali ont `pfo-jour`/`pfo-nuit`, et
Anisse Assihout a `polyvalent-jour`. ⚠ **Leontine Pyot est PFO mais n'a aucune liste**
— probablement un oubli, à lui confirmer.

⚠ **Rien n'est encore écrit** : on pose tout d'un coup, comme pour les tâches.
⚠ **`allowed_emails.nom` est VIDE pour tout le monde** — le prénom affiché vient du
compte Google. Les noms ci-dessous sont reconstitués depuis l'adresse mail.

#### Infirmiers (8) — dicté le 13/08/2026

| Personne | Service dicté | Liste |
|---|---|---|
| Amélie Viguier | 2e · jour | `médical-2e` |
| Elfine Hachemane | 2e · **jour** | `médical-2e` |
| Elisa Delme | 2e · **jour** | `médical-2e` |
| Imene Cherfaoui | **rez · jour** | `médical-rez` |
| Nadia Draoui | **rez · jour** | `médical-rez` |
| Patrick Omari | 2e · jour | `médical-2e` |
| Marthe Byakolo | **nuit** | `médical-nuit` (= 2e étage · nuit) |
| Vianne Maketa | **« gestion équipe infi »** | 🕓 **à trancher** |

**⚠ Vianne Maketa n'est pas un service, c'est un rôle.** Elle encadre l'équipe
infirmière. Deux façons, à lui demander :
- elle reçoit **les trois listes** (`médical-rez`, `médical-2e`, `médical-nuit`) pour
  voir ce que fait chacun — mais sa propre liste devient un empilement de 3 services ;
- ou elle a **sa propre liste** (`médical-gestion`, à écrire), et elle peut consulter
  les autres par le déroulant, comme tout le monde.
**Ma suggestion : la seconde.** L'app montre déjà toutes les listes dans le déroulant
— elle n'a pas besoin qu'on les lui empile pour aller les regarder. Et son travail à
elle (encadrement, plannings, commandes ?) n'est écrit nulle part aujourd'hui.
⚠ Voir aussi `sql/referent.sql` : « Référent·e infis & aide-soignant·es » a déjà
existé comme rôle à part entière. C'est peut-être elle.

**🕓 QUESTION POSÉE, SANS RÉPONSE : « Médical — toutes » (Pharmacie · Encoder les
transports) va-t-elle à TOUS les infirmiers en plus de leur étage ?** Si oui, on
l'ajoute d'office aux huit et on ne repose plus la question.

#### Le reste de l'équipe — 🕓 en attente de sa dictée
#### Aide-soignants — dicté le 13/08/2026

| Personne | Dicté | Liste |
|---|---|---|
| Karima Boukricha | **matin** | `aide-soignant-matin` |
| Paul Baykonday | **jour** | `aide-soignant-soir` *(la clé dit soir, l'étiquette dit Jour)* |
| `fallypaulbay@yahoo.fr` | — | 🕓 **à trancher — voir ci-dessous** |

**✅ LES DEUX COMPTES PAUL SONT LE MÊME HOMME** (confirmé le 13/08/2026).
`paul.baykonday@samusocial.be` et `fallypaulbay@yahoo.fr`. **Il utilise le yahoo pour
l'instant : il a perdu le mot de passe de son adresse du travail.**
→ **Les DEUX reçoivent `aide-soignant-soir`.** Ce n'est pas une précaution : si on ne
sert que l'adresse du travail, il ouvre l'app et ne voit aucune liste — et il n'a
aucun moyen de comprendre pourquoi.
⚠ **Ce que ça coûte quand même** : deux comptes pour un seul homme, donc **ce qu'il
coche d'un côté ne se voit pas de l'autre** (`checklist_faites` est rangé par
compte). C'est supportable tant qu'il n'en utilise qu'un.
→ **Rappel posé dans son chantier le 13/08/2026** (ligne 108, bloc « Ça attend tes
collègues ») : à partir du **13/09/2026**, lui redemander de récupérer son mot de
passe, puis **couper le compte yahoo**. Elle l'a demandé elle-même : « rappelle-moi
dans un mois ».

*(Vérifié au passage : Charlotte Dorval (psychologue) et Charlotte Doyen (travailleuse
sociale) sont bien **deux personnes différentes**, pas un doublon.)*
- **Éducateurs (4)** : Imed Kenzari · Gaith Boubes · Ellie Moreaux · Mathilde Lona
#### Polyvalents — dicté le 13/08/2026

| Personne | Dicté | Liste |
|---|---|---|
| Anisse Assihout | *(déjà en base)* | `polyvalent-jour` |
| Nordine Azeroual | **jour** | `polyvalent-jour` |
| Younes Armarchouh | **jour** | `polyvalent-jour` |

**🕓 ⚠ ET UNE PHRASE À FAIRE CONFIRMER — « du matin, du jour et de la nuit ».**
Sa dictée finit par ces mots, sur les polyvalents. Si je l'entends bien, **il y a
TROIS services de polyvalents, pas deux** — et l'app n'en connaît que deux
(`polyvalent-jour`, `polyvalent-nuit`). Il manquerait donc **« Polyvalent — Matin »**.

C'est très plausible : **les aide-soignants sont déjà découpés en Matin / Jour**, donc
la maison tourne bien avec un service du matin distinct.

⚠ **Ne rien créer avant qu'elle confirme.** Et si c'est bien trois, il faut lui
redemander les trois personnes : **elles ont toutes les trois été dictées « jour »**,
ce qui voudrait dire que le matin et la nuit n'ont personne — donc que la question
n'a pas été comprise dans le même sens des deux côtés.
⚠ À vérifier aussi : la liste **Polyvalent — Jour** commence par « Mise en place du
petit-déjeuner » et « Accompagnement petit-déjeuner jusqu'à 07h45 ». **C'est un
travail du matin.** Si un service du matin existe, ces lignes-là sont peut-être à lui,
pas à celui du jour.
- **Travailleurs sociaux (10)** : Afaf Aboulkhir · Charlotte Doyen · Fouad Roughou ·
  Selma Sefiani · Yaszakis

**⚠ LÉONTINE PYOT EST MARQUÉE PFO À TORT** (13/08/2026) : « Léontine est TS, c'est
**Lic** qui est PFO. » → mettre `pfo = false` sur `leontine.pyot@samusocial.be`.
Elle garde son métier de travailleuse sociale.

**C'est LOÏC**, et **il n'a pas encore reçu l'application** (13/08/2026). Il n'a donc
aucun compte — ce n'était pas une erreur de saisie, il n'a simplement jamais été créé.

# 🔑 LE CHANGEMENT DE FOND DU 13/08/2026 — PERSONNE N'EST « PFO » DANS LA BASE

Ses mots : « **PFO par PFO, ça peut changer souvent.** Donc c'est peut-être mieux que
**tous les TS soient un peu égaux**, et que le PFO ait une petite liste à côté. Si tu
**décrètes que tu es PFO**, tu peux voir la liste — elle se déroule, elle s'active.
Sinon elle ne s'active pas. »

**⚠ CECI REMPLACE LA RÈGLE DU 11/08.** Ce jour-là on avait dit l'inverse : « le PFO
est attitré et payé, il a sa liste en permanence ; le bouton n'est qu'un dépannage ».
Elle a changé d'avis, et elle a raison — la suite de la séance l'a prouvé :

- **On a passé dix minutes sur qui est PFO**, pour découvrir que **Léontine était
  marquée PFO à tort** et que **le vrai PFO, Loïc, n'a pas de compte du tout**.
- Un attribut `pfo` figé dans la base **prétend décrire quelque chose qui bouge toutes
  les semaines**. Il sera faux la plupart du temps, et personne ne pensera à le
  corriger — c'est exactement ce qui vient de se passer.
- La bonne question n'est pas « qui EST PFO ? » mais « **qui l'est aujourd'hui ?** ».
  Seule la personne qui prend la garde le sait, et elle est là au bon moment pour le
  dire.

**Ce que ça donne :**
1. **Tous les travailleurs sociaux sont égaux** — même liste `ts`, personne n'a de
   statut en plus.
2. **La liste PFO est une liste à côté**, qui ne s'affiche pas par défaut.
3. **On se déclare PFO pour la journée** : la liste s'ouvre et se déroule. Sinon,
   rien.
4. **Ça s'éteint tout seul la nuit** (sa règle du 11/08, qui elle reste vraie : « on
   doit l'allumer, tous les matins il faut le mettre »).

**Ce que ça simplifie, et qui compte** : Loïc n'a plus besoin d'un réglage particulier.
Le jour où il reçoit l'application, il est travailleur social comme les autres, et il
appuie sur le bouton quand il prend la garde. **Plus personne à tenir à jour.**

→ `allowed_emails.pfo` ne commande donc plus rien pour les listes. On le laisse en
place (d'autres endroits s'en servent peut-être), mais **il ne décide plus qui voit la
liste PFO**. Et la correction de Léontine devient sans objet : plus personne n'est PFO
dans la base.

**🕓 LA SEULE QUESTION QUI RESTE : jour ou nuit ?** Il y a deux listes PFO. Quand
quelqu'un se déclare, l'app ne peut pas deviner s'il prend la garde de jour ou de
nuit. Proposé : le bouton demande, en deux mots — **« PFO aujourd'hui : jour · nuit »**.
- **Les autres (7)** : Laura Campeert (coordination) · Andrea Falconeri (médecin) ·
  Charlotte Dorval et Ysaline Pinchart (psychologues) · Luis Rodrigues et Theclick Bxl
  (logistique) · Gandi12 (admin).
  **Ma suggestion : pas de liste** pour la coordination et les psychologues — même
  raisonnement que pour les travailleurs sociaux.
