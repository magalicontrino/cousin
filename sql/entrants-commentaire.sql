-- ===========================================================================
-- LES ENTRETIENS : UN COMMENTAIRE -- demande de Mag, 19/09/2026
--   "Et aussi, peut-etre pouvoir mettre un commentaire" -- puis "ok" sur :
--   une ligne sous le nom, que tout le monde ecrit et lit, avec le nom de qui l'a ecrit,
--   et qui sort sur la feuille imprimee et dans le message partage.
-- Pas de nouvelle regle d'acces : la policy "ent_cocher" (update par qui voit la liste)
-- couvre ces colonnes. Le groupe D reste refuse par la base.
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================
alter table public.entrants add column if not exists commentaire text
  check (commentaire is null or char_length(commentaire) <= 300);
alter table public.entrants add column if not exists commentaire_par text;
alter table public.entrants add column if not exists commentaire_le timestamptz;
-- PASSE DANS SUPABASE LE 19/09/2026 par Claude (pont Chrome), verifie : 3 colonnes presentes.
