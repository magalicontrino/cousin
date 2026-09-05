# Le COUSIN de chacun

Ce dossier sert à donner à chaque membre de l'équipe son propre assistant, sur
son propre compte Claude. Il ne fait pas partie de l'application : c'est la
matière à copier dans un projet Claude.

- **COUSIN-mode-emploi.md** — la feuille à donner à l'équipe. Les cinq étapes,
  les deux règles, des exemples de questions.
- **COUSIN-instructions.md** — le texte à coller dans les instructions du projet.
  C'est lui qui tient l'assistant dans le cadre : ne pas inventer de numéro,
  écrire court, aucun nom d'hébergé.
- **COUSIN-catalogue.md** — l'export des fiches, des cours et des mails. C'est le
  fichier qu'on dépose dans le projet.

## Refaire l'export quand le catalogue a bougé

Depuis la racine du dépôt :

    node agent/refaire.js

Le script relit `index.html` et réécrit `COUSIN-catalogue.md`. Il s'arrête avec
un message clair s'il ne retrouve plus le tableau des fiches.

⚠ L'export fige un état. Il faut le refaire de temps en temps, et prévenir
l'équipe de redéposer le fichier dans son projet.

⚠ Ce qui vit dans la base (le wiki des fiches, les conseils de l'équipe, les
avis, les questions ouvertes) n'est pas dans cet export : le script ne lit que
ce qui est écrit dans le code.

---

## La bulle dans le site

Le code de la bulle n'est pas ici, il est dans `supabase/functions/bulle/`.
C'est une fonction qui tourne chez Supabase, pas dans le site : la clé qui fait
payer n'a rien à faire dans une page publique.

Deux secrets à installer côté Supabase, jamais dans le dépôt :

- `ANTHROPIC_API_KEY` — la clé de Mag.
- `BULLE_ACCES` — les adresses qui ont le droit, séparées par des virgules.
  Ajouter quelqu'un, c'est ajouter une adresse ici. Rien à redéployer.
