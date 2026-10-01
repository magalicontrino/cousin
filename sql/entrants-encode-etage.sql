-- ===========================================================================
-- LES ENTRETIENS : "ENCODE" + "LISTE ETAGE" -- demande de Mag, 01/10/2026
--
-- Deux cases de plus sur la ligne, meme forme que ROI : QUAND et PAR QUI.
-- Elles ne comptent pas dans "vu" (Social + Medical + ROI).
-- La policy "ent_cocher" couvre deja les colonnes de la table.
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================

alter table public.entrants add column if not exists encode_le  timestamptz;
alter table public.entrants add column if not exists encode_par text;
alter table public.entrants add column if not exists etage_le   timestamptz;
alter table public.entrants add column if not exists etage_par  text;
