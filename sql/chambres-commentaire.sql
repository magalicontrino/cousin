-- 19/10/2026 : un commentaire libre sur un sortant (remplace les choix sortant/hospitalise/affaires)
alter table public.chambres add column if not exists commentaire text;
