-- COUSIN — ce que chaque rôle voit sur l'accueil (réglé depuis l'Admin, section « Qui voit quoi »).
-- Passé le 2026-07-29.
create table if not exists public.roles_acces (
  role   text primary key,
  paves  text[] not null default '{}'::text[],
  maj_le timestamptz not null default now()
);
alter table public.roles_acces enable row level security;

drop policy if exists roles_acces_lecture on public.roles_acces;
create policy roles_acces_lecture on public.roles_acces
  for select to authenticated using (is_active_member());

drop policy if exists roles_acces_admin on public.roles_acces;
create policy roles_acces_admin on public.roles_acces
  for all to authenticated using (is_admin()) with check (is_admin());

insert into public.roles_acces(role, paves) values
  ('TS',                    array['reseau','demarches','formations','mails','methodes','centre']),
  ('Médical',               array['reseau','demarches','formations','mails','methodes','centre']),
  ('Éduc',                  array['reseau','demarches','formations','mails','methodes','centre']),
  ('Psy',                   array['reseau','demarches','formations','mails','methodes','centre']),
  ('Infi',                  array['reseau','demarches','formations','mails','methodes','centre']),
  ('Coordi',                array['reseau','demarches','formations','mails','methodes','centre']),
  ('Aide-soignante',        array['reseau','formations','centre']),
  ('Polyvalent',            array['reseau','formations','centre']),
  ('Agent entretien',       array['reseau','formations','centre']),
  ('Travaux / Maintenance', array['reseau','formations','centre']),
  ('Logistique',            array['reseau','formations','centre']),
  ('Responsable punaise',   array['reseau','formations','centre']),
  ('Article 60',            array['reseau','formations','centre'])
on conflict (role) do nothing;
