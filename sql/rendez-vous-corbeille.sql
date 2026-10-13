-- 13/10/2026 : la corbeille des rendez-vous (Mag : « je dois absolument avoir un backup »). Passé dans l'éditeur SQL.
alter table public.rendez_vous add column if not exists retire_le timestamptz;
alter table public.rendez_vous add column if not exists retire_par text;
