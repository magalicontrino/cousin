-- 17/10/2026 : la liste des heberges pour l'agenda (une ligne, une liste : nom, prenom, chambre, LAM/Medical). Lancee par Claude.
create table if not exists public.residents_liste (id int primary key default 1 check (id = 1), liste jsonb not null default '[]'::jsonb, maj_le timestamptz not null default now(), maj_par text);
alter table public.residents_liste enable row level security;
create policy rl_lire on public.residents_liste for select to authenticated using (is_active_member());
create policy rl_ecrire on public.residents_liste for insert to authenticated with check (is_active_member());
create policy rl_maj on public.residents_liste for update to authenticated using (is_active_member()) with check (is_active_member());
grant select, insert, update on public.residents_liste to authenticated;
