-- COUSIN -- Le programme du mois des associations (demande de Mag, 01/08/2026).
-- « Ce qui arrive » ne savait afficher que des REGLES qui se repetent (tous les mercredis).
-- Or des asbl comme WAKA UP sortent un calendrier neuf chaque mois : des dates uniques, un
-- lieu qui change, une inscription a prendre. Elles vivent donc dans une table, que Mag ou
-- la coordination remplissent depuis l app -- sans passer par moi, sinon le mois passe.
--
-- Lecture : toute l equipe connectee (c est fait pour etre lu).
-- Ecriture : l administratrice ou la coordination (meme regle que la gestion d equipe).
-- (Pas d accents dans ce fichier : l editeur SQL les avait deja abimes une fois.)

create table if not exists public.activites (
  id          bigserial primary key,
  asso        text not null,
  titre       text not null,
  jour        date not null,
  debut       text,
  fin         text,
  lieu        text,
  adresse     text,
  gratuit     boolean not null default true,
  inscription text,
  ajoute_le   timestamptz not null default now(),
  ajoute_par  text
);

create index if not exists activites_jour_idx on public.activites (jour);

alter table public.activites enable row level security;

drop policy if exists "activites lecture" on public.activites;
create policy "activites lecture" on public.activites
  for select to authenticated using (true);

drop policy if exists "activites ecriture" on public.activites;
create policy "activites ecriture" on public.activites
  for insert to authenticated with check (public.peut_gerer_equipe());

drop policy if exists "activites correction" on public.activites;
create policy "activites correction" on public.activites
  for update to authenticated using (public.peut_gerer_equipe());

drop policy if exists "activites suppression" on public.activites;
create policy "activites suppression" on public.activites
  for delete to authenticated using (public.peut_gerer_equipe());

-- Le menage : ce qui a plus de six mois ne sert plus a rien.
create or replace function public.purger_activites()
returns void language sql security definer set search_path = public as $$
  delete from public.activites where jour < current_date - interval '6 months';
$$;

grant execute on function public.purger_activites() to authenticated;

select 'table activites prete' as etat;
