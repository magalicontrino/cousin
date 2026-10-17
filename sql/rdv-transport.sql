-- 17/10/2026 : Transport classique sur les rendez-vous (lance par Claude dans l'editeur SQL)
alter table public.rendez_vous add column if not exists transport boolean not null default false;
