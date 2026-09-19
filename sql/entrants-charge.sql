-- ===========================================================================
-- LES ENTRANTS : "JE M'EN OCCUPE" -- demande de Mag, 19/09/2026
--
--   "Ici je voudrais une case a cocher par la personne qui veut prendre ca en
--    charge."
--
-- Les cases Social et Medical disent QUI A FAIT l'entretien -- donc apres coup.
-- Le probleme de depart etait "on ne sait jamais qui va le faire" : cette case le
-- dit AVANT. Une seule personne a la fois ; decocher libere l'entrant.
--
-- Pas de nouvelle regle d'acces : la policy "ent_cocher" (tout le groupe A, B, C
-- peut modifier une ligne) couvre deja ces deux colonnes. Le groupe D reste refuse.
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================

alter table public.entrants add column if not exists charge_par text;
alter table public.entrants add column if not exists charge_le  timestamptz;

-- -- PASSE DANS SUPABASE LE 19/09/2026, avec sql/coordi-reconnue.sql.
-- Verifie : les 2 colonnes existent ; est_coordi() reconnait exactement les 2 comptes
-- "Coordination", et personne d'autre (boucle sur allowed_emails, jwt simule).
