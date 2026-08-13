# La grande dictée du 13/08/2026 — tout ce qu'elle a demandé

Écrit avant d'y toucher, pour ne rien perdre. **Rien ici n'est fait tant que ce n'est
pas marqué ✅.** Les points marqués **PROPOSER** sont ceux où elle a explicitement
demandé une proposition AVANT construction.

---

## 0. LE PRINCIPE QUI COMMANDE TOUT — l'impression

Ses mots, et c'est la phrase la plus importante de la journée :

> « L'idée de cette application COUSIN, c'est **surtout pour pouvoir imprimer** les
> passations et **les remettre en main propre**, parce qu'on ne fait pas confiance à
> ceux qui ne vont pas aller sur l'application. Il faut vraiment que tu comprennes que
> dans toute la structure de tout ce qu'on fait là : **si les gens l'utilisent, c'est
> ok ; sinon**… »

**⚠ L'APPLICATION N'EST PAS LE LIVRABLE. LE PAPIER L'EST.**
L'app est l'outil qui lui sert à ÉCRIRE (de son téléphone ou de son PC) et à
rassembler ses informations. Ce qui arrive à l'équipe, c'est une feuille.
→ **Toute liste doit être imprimable.** Et de deux façons, qu'elle demande
explicitement : **par carte / par section**, et **entièrement**, pour voir l'ensemble.
→ Ne jamais concevoir un écran sans se demander de quoi il aura l'air sur papier.

---

## 1. LA PASSATION — la refonte la plus importante

Ce qui existe aujourd'hui lui plaît (« ça, c'est super »), mais il manque l'essentiel.

**Quatre boutons au lieu de deux.** Elle clique sur UN des quatre, écrit une petite
remarque, et c'est fait :
1. **Réveil** (il porte déjà une heure et une chambre)
2. **Médical à jeun** — « quand quelqu'un doit être à jeun »
3. **Sortie de centre** — « quelqu'un qui doit sortir du centre ce jour-là, qui a été
   mis dehors par exemple, à une date limite »
4. **Info**

**⚠ La passation est PRIVÉE.** « Je voudrais que ce soit juste la personne qui la voit,
que la passation ne soit **que pour la PFO de nuit, que l'équipe de nuit** — que tout
le monde ne la voie pas. **C'est vraiment entre nous.** »
→ C'est un changement de règle : aujourd'hui elle est ouverte. À reprendre en RLS.

**⚠ Elle doit s'IMPRIMER.** « Il faut qu'on puisse imprimer la passation pour l'équipe
de nuit. Je dois pouvoir l'imprimer pour leur donner. »

**Dire clairement « passation équipe de nuit »** — c'est le cas le plus fréquent.

---

## 2. LES TROIS LISTES — sa vraie architecture

Elle décrit un système à trois listes, et ce n'est pas ce qu'on a aujourd'hui :

| Liste | Ce que c'est | Qui la voit |
|---|---|---|
| **Les choses à FAIRE** | la liste PFO générale, le métier | tout le monde, « au moins ils ont une vue de ce qu'ils peuvent faire » |
| **Les choses à DIRE** | 🆕 **à construire** — ce qu'elle doit dire en réunion | elle seule |
| **La PASSATION** | ce qu'on transmet à l'équipe suivante | l'équipe concernée seulement |

**La liste « à dire en réunion »** est une idée neuve : « parfois je travaille, je dois
juste marquer que j'ai parlé de monsieur Truc, de monsieur Machin, de la situation.
**Si je mets juste les initiales**, au moins c'est un pense-bête. »
⚠ **Initiales seulement**, jamais un nom — c'est la règle de la maison, et elle
l'applique d'elle-même.

**Les trois doivent s'imprimer**, y compris « Ma liste perso ».

**Plus tard** : « les infirmiers ont aussi une liste de passation. »

---

## 3. LA GARDE PFO — correction de ce qui vient d'être construit

- ❌ Retirer **« Laisse tomber »** → une simple **croix ✕** pour fermer.
- **En faire une vraie POP-UP**, ouverte par un bouton **PFO**. « Ce serait plus
  simple. »
- **⚠ CORRECTION DE FOND** : « il ne faudrait **pas** devoir remettre PFO tous les
  jours quand on est **PFO de base**. Il faut être **attitré de base**. Si tu dois le
  faire, c'est que **tu remplaces le PFO parce qu'il est en congé**. »
  → Donc : **les PFO titulaires gardent leur liste en permanence** (c'était la règle
  du 11/08, elle revient dessus), et **le bouton sert au REMPLAÇANT**, pour un jour.
  ✅ Le code fait déjà ça (`majMesListes()` ajoute la garde par-dessus la base) — il
  reste à ajuster le texte du bouton, qui parle comme s'il servait à tout le monde.

---

## 4. LE CENTRE — **PROPOSER**, ne rien faire avant son accord

« Je n'aime **pas du tout** cette mise en page. Il faut que tu me proposes que ce soit
plus clair… ça ne donne pas envie d'aller cliquer. Tu peux proposer le design, mais
aussi **une structure différente**. Réfléchis bien et propose-moi quelque chose de
**très intelligent**. **Juste pour la première section** en tout cas. »

**Ce qui est déjà tranché, à appliquer :**
- ❌ **Retirer les légendes de droite** (« ce qu'on fait pour quelqu'un », « ce qu'on
  fait avec quelqu'un », « pour toi quand tu as le temps ») — « **insupportable** ».
- « Le quotidien » → **« Gestion du centre »**
- « Ce qu'on propose » → **« Éduc / Activités »**
- « Le travail avec la personne » → **on garde**, elle aime
- « Apprendre » → **on garde**, elle aime
- ➕ **Ajouter un bouton vers les JEUX** dans Apprendre (« jeux pour apprendre »),
  ce qui fera trois boutons dans cette section.

**Le vrai chantier — la première section.** Aujourd'hui : Protocole · Démarches ·
Mails et notes · Les schémas à donner · Le règlement. Ses remarques :
- « **ce n'est pas assez ordonné**, je voudrais que ce soit plus construit, plus
  intéressant » ;
- « **les mails et les notes, c'est dans les démarches** un peu ensemble » ;
- « ou alors il faudrait marquer **Modèles, mails et notes** » ;
- « pour les schémas : c'est peut-être **le titre qui ne va pas**, ce serait peut-être
  plutôt dans Démarches » ;
- « **outils d'aide à la personne** ? Je ne sais pas trop. »

---

## 5. LES ACTIVITÉS — écran et impression

- **Le programme WAKA imprimé doit tenir sur UN A4.** « Ça fait beaucoup
  d'impressions. Il y a moyen de faire ça très joli, mais **plus petit** aussi. »
- **Le panneau d'une liste (ex. « Gratuit ») est parfait**, sauf :
  - sur grand écran il est **trop large** → le ramener à la largeur de son contenu ;
  - ⚠ **il manque l'itinéraire sur CHAQUE lieu** — un bouton du type « Y ALLER ».
    « Quand tu cliques, il est **itinéraire du centre** : en partant du centre pour
    arriver jusqu'au lieu. » (Une seule ligne l'a aujourd'hui.)
- **Le haut de la page Activités (les 3 boutons + l'encart WAKA) est beaucoup trop
  grand sur écran** → taille normale.
- **Marquer « il faut s'inscrire à l'avance » sur les activités WAKA** elles-mêmes.

---

## 6. MA LISTE — corrections précises

- ❌ Retirer le bloc **« Un nouveau 7-7 commence aujourd'hui »**. « Retire ça. »
- ❌ Retirer **« — X à faire »** dans le nom des listes du déroulant.
- **PROPOSER** : le sélecteur de liste (« LE TRAVAIL » + le déroulant) doit être
  **beaucoup plus discret pour elle qui est admin** : « ça rentre dans ma page et
  c'est confus, je ne sais plus où j'en suis dans mes tâches ». **Proposer avant de
  faire.**
- **Ma liste perso** : elle redemande de retirer le blabla ✅ *(déjà fait en v719 —
  sa capture montrait la version d'avant)*. **Mais elle veut UNE phrase** : dire que
  **cette page est personnelle et n'est pas vue par les équipes**. Rien d'autre.

## 7. LE CONTENU DES LISTES — dicté

- **PFO** : « Créer le rapport (2 jours) » → **« Rapport »**
- **PFO** : « Désencoder les +3 jours d'absence » → **« Vérifier plus de trois jours
  d'absence »**
- **PFO** : garder « Mettre à vider sur les étages » et « Mettre à nettoyer »
- **PFO** : « Vérifier le nombre de LAM » → garder tel quel
- ➕ **« Vérifier équipe cuisine duo »** à ajouter chez les **travailleurs sociaux**,
  les **éducateurs** ET les **polyvalents**

## 8. LES ACCÈS — ses réponses

- **Polyvalents : TROIS services** — matin, jour, nuit. ✅ confirmé.
  → il faut **créer `polyvalent-matin`**, et redécouper : les lignes petit-déjeuner de
  la liste « Jour » sont probablement celles du matin.
- **Vianne Maketa** : « elle peut voir les trois, **mais elle fera sa propre liste
  toute seule** ».
- **Médical** : « la même chose pour tous les médicaux, **on verra par la suite avec
  eux** » → donc `médical` (Pharmacie · Encoder les transports) **à tous**.
- **Éducateurs** : « on verra la liste **avec eux** » — ne pas l'inventer.
- **Les 5 TS restants** : elle ne comprend pas la question, et elle a raison — il n'y
  a rien à demander. **Tous les TS ont la même liste `ts`**, c'est déjà décidé.

## 9. À CHERCHER — des ASBL d'activités gratuites

- ➕ **Ajouter HOBO** : `lesmarolles.be/Organization/hobo/`
- **Chercher d'autres ASBL dans l'esprit de WAKA** : activités gratuites, « ça peut
  être à l'église, ça peut être fait par des bénévoles ».
- **Livrable attendu : une LISTE DE PROPOSITIONS**, avec les sources, qu'elle puisse
  vérifier et **faire vérifier par les éducateurs** avant qu'on les mette dans l'app.
  ⚠ Règle habituelle : on ne publie rien sans qu'elle ait vu la liste.
