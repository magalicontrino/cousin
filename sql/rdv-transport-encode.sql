-- 18/10/2026 : qui a encode le transport d'un rendez-vous (etiquette « Transport ? » -> « Transport encode »)
alter table public.rendez_vous add column if not exists transport_ok_par text, add column if not exists transport_ok_le timestamptz;
