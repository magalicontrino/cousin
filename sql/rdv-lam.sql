-- 17/10/2026 : LAM ou Medical sur les rendez-vous (lance par Claude)
alter table public.rendez_vous add column if not exists lam boolean;
