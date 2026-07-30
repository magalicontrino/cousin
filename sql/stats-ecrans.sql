-- COUSIN — Où l'équipe passe son temps dans l'app (statistiques d'usage)
-- Demandé par Mag le 2026-07-31 : « c'est juste pour connaître l'engouement des gens
-- pour l'app et faire des statistiques, savoir où ils traînent le plus ».
--
-- ⚠ Ceci ÉLARGIT ce que dit stats-connexion.sql (« pas de pages consultées »). Le garde-fou
-- est déplacé, pas supprimé : on enregistre bien l'écran ouvert, mais PERSONNE ne peut lire
-- le journal ligne à ligne depuis l'app — il n'existe aucune politique de lecture sur la
-- table. On ne sort que des TOTAUX, par l'intermédiaire des deux fonctions du bas.
-- Autrement dit : on peut savoir que « Démarches a été ouvert 340 fois par 11 personnes »,
-- on ne peut pas savoir que « Sofia a ouvert Démarches mardi à 14 h ».

create table if not exists public.usage_ecrans (
  id     bigserial primary key,
  uid    uuid not null references auth.users(id) on delete cascade,
  ecran  text not null,
  quand  timestamptz not null default now()
);

create index if not exists usage_ecrans_quand_idx on public.usage_ecrans (quand desc);
create index if not exists usage_ecrans_ecran_idx on public.usage_ecrans (ecran);

alter table public.usage_ecrans enable row level security;

-- Chacun ne peut déposer QUE ses propres lignes. Et personne ne lit : pas de policy SELECT,
-- pas de policy UPDATE, pas de policy DELETE. C'est volontaire.
drop policy if exists "usage depot" on public.usage_ecrans;
create policy "usage depot" on public.usage_ecrans
  for insert to authenticated
  with check (uid = auth.uid());

-- Déposer une ligne : appelé par l'app à chaque écran ouvert.
create or replace function public.noter_ecran(nom text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if auth.uid() is null then return; end if;
  insert into public.usage_ecrans (uid, ecran) values (auth.uid(), left(coalesce(nom, '?'), 40));
end;
$$;

grant execute on function public.noter_ecran(text) to authenticated;

-- ─────────────── LA LECTURE : DES TOTAUX, RIEN QUE DES TOTAUX ───────────────

-- Où l'équipe passe son temps, sur les N derniers jours.
-- Réservé à l'administratrice (is_admin), et au passage on efface ce qui a plus de 90 jours :
-- garder trois mois suffit pour voir une tendance, au-delà c'est un historique de présence.
create or replace function public.stats_ecrans(jours int default 30)
returns table(ecran text, vues bigint, personnes bigint, derniere timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then return; end if;
  delete from public.usage_ecrans where quand < now() - interval '90 days';
  return query
    select u.ecran, count(*)::bigint, count(distinct u.uid)::bigint, max(u.quand)
      from public.usage_ecrans u
     where u.quand > now() - (jours || ' days')::interval
     group by u.ecran
     order by count(*) desc;
end;
$$;

grant execute on function public.stats_ecrans(int) to authenticated;

-- L'engouement dans le temps : une ligne par jour, combien d'ouvertures et combien de gens.
create or replace function public.stats_jours(jours int default 30)
returns table(jour date, vues bigint, personnes bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select (u.quand at time zone 'Europe/Brussels')::date as jour,
           count(*)::bigint,
           count(distinct u.uid)::bigint
      from public.usage_ecrans u
     where u.quand > now() - (jours || ' days')::interval
     group by 1
     order by 1;
end;
$$;

grant execute on function public.stats_jours(int) to authenticated;
