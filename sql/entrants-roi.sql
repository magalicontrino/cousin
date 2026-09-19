-- ===========================================================================
-- LES ENTRETIENS : "ROI SIGNE" -- demande de Mag, 19/09/2026
--
--   "Retire [Je m'en occupe]. Mais par contre ajoute une case ROI signe."
--
-- Le reglement d'ordre interieur signe a l'arrivee. Meme forme que les cases Social
-- et Medical : QUAND et PAR QUI elle a ete cochee.
-- Pas de nouvelle regle d'acces : la policy "ent_cocher" couvre ces colonnes, et le
-- groupe D reste refuse par la base.
-- (charge_par / charge_le restent dans la table -- "Je m'en occupe" est retire de
--  l'ecran, pas de la base : rien n'est efface.)
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================

alter table public.entrants add column if not exists roi_le  timestamptz;
alter table public.entrants add column if not exists roi_par text;
