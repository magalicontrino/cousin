-- 10/10/2026 — Mag : « quand c'est OUI (accompagnement), ça ouvre une pop-up : il faut un commentaire
-- médical ou social, un argument ». L'argument est gardé avec le rendez-vous.
alter table public.rendez_vous add column if not exists accomp_motif text;

-- 10/10/2026 — les accompagnements se VALIDENT (coordination) : qui et quand.
alter table public.rendez_vous add column if not exists valide_par text;
alter table public.rendez_vous add column if not exists valide_le timestamptz;
