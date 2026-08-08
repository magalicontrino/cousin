-- ═══════════════════════════════════════════════════════════════════════════
-- « POUR QUI » SUR LES ACTIVITÉS — la couleur de l'agenda (08/08/2026)
--
-- Mag a choisi l'idée 6 pour l'agenda : la couleur d'un jour dit LE PUBLIC de
-- l'activité (rose = femmes, vert = mixte, bleu = hommes), et la légende du bas
-- nomme chaque activité avec ses dates.
--
-- Sans cette colonne, aucune couleur ne peut rien dire : le calendrier resterait
-- gris. Elle est donc le préalable au branchement de l'agenda.
--
-- ⚠ VOLONTAIREMENT SANS VALEUR PAR DÉFAUT. On aurait pu mettre « mixte » partout
-- et corriger ensuite — mais ce serait AFFIRMER quelque chose de faux pour les
-- activités réservées, WAKA UP la première. Une activité dont on ne connaît pas
-- le public reste NULL, s'affiche en gris, et dit « on ne sait pas » au lieu de
-- mentir. C'est la même règle que pour les numéros de téléphone du catalogue :
-- jamais une information incertaine présentée comme sûre.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.activites
  add column if not exists pour_qui text;

-- Trois valeurs, et rien d'autre. NULL reste permis : c'est « pas encore dit ».
alter table public.activites
  drop constraint if exists activites_pour_qui_check;
alter table public.activites
  add constraint activites_pour_qui_check
  check (pour_qui is null or pour_qui in ('mixte','femmes','hommes'));

-- ── À VÉRIFIER APRÈS AVOIR LANCÉ CECI ────────────────────────────────────────
-- select pour_qui, count(*) from public.activites group by pour_qui;
--   → toutes les lignes existantes doivent être à NULL, aucune erreur.
