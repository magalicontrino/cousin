-- 18/10/2026 : reponse a « Comment y va-t-il ? » sur les rendez-vous (seul / transport / taxi)
alter table public.rendez_vous add column if not exists trajet text;
