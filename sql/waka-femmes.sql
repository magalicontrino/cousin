-- ═══════════════════════════════════════════════════════════════════════════
-- WAKA UP — marquer le programme « réservé aux femmes »   (13/08/2026)
--
-- Mag : « pour les treize activités WAKA, réservé aux femmes dans la base, oui.
-- Parce qu'après, peut-être qu'il y aura d'autres associations. »
--
-- ⚠ POURQUOI C'ÉTAIT NÉCESSAIRE : les 13 activités d'août étaient bien encodées
-- (boxe, tricot, écriture, escalade, chants…) mais la colonne `pour_qui` était
-- restée VIDE. Le bouton « Réservé aux femmes » de la page Activités affichait donc
-- « rien pour l'instant » alors qu'il y avait treize activités pour les femmes ce
-- mois-ci. Une porte vide, on cesse de l'ouvrir.
--
-- ⚠ ET LA RÈGLE POUR LA SUITE : toute activité encodée pour une association dont
-- l'accueil est réservé (femmes, hommes) DOIT porter son `pour_qui` dès l'encodage.
-- L'oubli ne se voit pas — il rend juste le filtre muet.
--
-- ═══ DÉJÀ EXÉCUTÉ le 13/08/2026 par Claude, depuis la session de Mag ═══
--     13 lignes modifiées · 0 restée vide · vérifié.
-- Ce fichier garde la trace, et sert de modèle pour la prochaine association.
-- ═══════════════════════════════════════════════════════════════════════════

update public.activites
   set pour_qui = 'femmes'
 where asso = 'WAKA UP'
   and (pour_qui is null or pour_qui = '');

-- Vérification
select jour, titre, pour_qui
  from public.activites
 where asso = 'WAKA UP'
 order by jour, debut;
