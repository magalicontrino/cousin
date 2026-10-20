-- 20/10/2026 : « mettre en avant » une passation (rond rose), nuit ou social
alter table public.passations add column if not exists en_avant boolean not null default false;
