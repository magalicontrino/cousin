-- 13/10/2026 : Refuser (avec la raison) et un mot a la validation. Passe dans l'editeur SQL.
alter table public.rendez_vous add column if not exists refuse_le timestamptz;
alter table public.rendez_vous add column if not exists refuse_par text;
alter table public.rendez_vous add column if not exists refuse_motif text;
alter table public.rendez_vous add column if not exists valide_mot text;
