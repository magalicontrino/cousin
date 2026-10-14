-- COUSIN — Chambres à vider : les polyvalents cochent eux-mêmes (14/10/2026)
-- 1) La coche « Prêt pour le transport » (les polyvalents ne font pas le transport).
alter table public.chambres add column if not exists pret_le  timestamptz;
alter table public.chambres add column if not exists pret_par text;

-- 2) À LIRE AVANT DE TOUCHER AUX DROITS : qui peut lire / modifier les chambres aujourd'hui ?
select policyname, cmd, roles, qual, with_check
from pg_policies where schemaname='public' and tablename='chambres';
