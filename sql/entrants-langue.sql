-- ===========================================================================
-- LES ENTRETIENS : LA LANGUE -- demande de Mag, 19/09/2026
--   "Ici, on doit pouvoir aussi rajouter la langue." (champ d'ajout, capture)
-- La langue decide qui fait l'entretien, et s'il faut un interprete. Texte libre,
-- court. Pas de nouvelle regle d'acces : les policies existantes couvrent la colonne.
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================
alter table public.entrants add column if not exists langue text
  check (langue is null or char_length(langue) <= 40);

-- "Et aussi un bouton a appuyer si c'est un entretien mi-parcours" (meme jour).
-- Une ligne = un entretien : d'arrivee (par defaut) ou de mi-parcours. Les cases
-- Social / Medical / ROI restent les memes ; seule l'etiquette change.
alter table public.entrants add column if not exists mi_parcours boolean not null default false;

-- -- PASSE DANS SUPABASE LE 19/09/2026 ("Success"), verifie dans un 2e Run :
-- 2 colonnes presentes (langue, mi_parcours).
