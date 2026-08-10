-- ═══════════════════════════════════════════════════════════════════════════
-- LA DATE D'ULTIMATUM SUR LE TOUR DES CHAMBRES — 10/08/2026
--
-- Mag : « marquer la date à laquelle on l'a dit, et SURTOUT la date à laquelle on
-- leur a dit de vider les affaires — l'ultimatum. Ensuite on met ça à jour tout le
-- temps et, à la fin du 4x4, on l'imprime pour l'envoyer, ou on l'envoie par mail. »
--
-- ⚠ POURQUOI UNE VRAIE COLONNE ET PAS UN CALCUL. L'app calculait l'échéance :
-- `prevenu_le` + 3 jours. Ça marche tant que le délai est toujours de trois jours —
-- or c'est une DÉCISION, pas une mécanique. On accorde parfois plus, on raccourcit
-- parfois, et c'est la date DITE À LA PERSONNE qui l'engage, pas celle que l'app
-- déduit. Une échéance calculée qui ne correspond pas à ce qu'on a annoncé, c'est
-- exactement le genre d'écart qui fait jeter les affaires de quelqu'un un jour trop
-- tôt.
--
-- La colonne reste FACULTATIVE : sans elle, l'app garde son calcul à trois jours
-- (les lignes déjà écrites ne changent pas de comportement).
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.tour_bacs add column if not exists ultimatum date;

comment on column public.tour_bacs.ultimatum is
  'La date DITE à la personne pour vider ses affaires. Facultative : sans elle, on retombe sur prevenu_le + 3 jours.';

-- Vérification
select column_name, data_type
  from information_schema.columns
 where table_schema='public' and table_name='tour_bacs'
 order by ordinal_position;

-- ── PASSÉ DANS SUPABASE LE 10/08/2026 ────────────────────────────────────────
-- À compléter après exécution.
