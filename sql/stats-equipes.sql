-- COUSIN -- Les statistiques par metier (demande de Mag, 03/08/2026).
-- Elle voulait savoir « de quelle commune » les gens se connectent : localiser des gens,
-- ce n est plus mesurer l engouement, c est les suivre -- et l adresse internet d un
-- telephone belge designe le noeud de l operateur, pas la commune. On repond donc a la
-- vraie question (QUI se sert de l app, et de quoi) avec ce qu on sait deja : le metier,
-- qui est dans le profil. Aucune donnee nouvelle n est collectee.
--
-- ⚠ PROTECTION DES PETITES EQUIPES : sous 3 personnes, « les infi ouvrent surtout
-- Demarches » revient a dire « Vianne ouvre surtout Demarches ». Le detail des ecrans est
-- donc masque pour ces groupes-la : on ne donne que le total. C est la meme regle que pour
-- le reste du journal -- des totaux, jamais quelqu un en particulier.

create or replace function public.stats_equipes(jours int default 30)
returns table(equipe text, personnes bigint, vues bigint, top text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then return; end if;
  return query
  with base as (
    select coalesce(nullif(ae.equipe, ''), 'Sans metier') as eq, u.uid, u.ecran
      from public.usage_ecrans u
      join auth.users au           on au.id = u.uid
      join public.allowed_emails ae on lower(ae.email) = lower(au.email)
     where u.quand > now() - (jours || ' days')::interval
  ),
  totaux as (
    select eq, count(distinct uid)::bigint as p, count(*)::bigint as v
      from base group by eq
  ),
  par_ecran as (
    select eq, ecran, count(*)::bigint as n,
           row_number() over (partition by eq order by count(*) desc, ecran) as r
      from base group by eq, ecran
  )
  select t.eq, t.p, t.v,
         case when t.p < 3 then null
              else (select string_agg(pe.ecran || '|' || pe.n, ' ; ' order by pe.n desc)
                      from par_ecran pe where pe.eq = t.eq and pe.r <= 3)
         end
    from totaux t
   order by t.v desc;
end;
$$;

grant execute on function public.stats_equipes(int) to authenticated;

select 'stats_equipes prete' as etat;
