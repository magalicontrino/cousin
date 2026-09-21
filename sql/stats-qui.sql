-- COUSIN — QUI S'INTERESSE A QUOI (Mag, 21/09/2026 :
-- « je veux voir ce qui porte de l'interet et a qui »)
--
-- ⚠ CECI LEVE LE GARDE-FOU DU 31/07/2026. stats-ecrans.sql disait, en toutes lettres :
-- « on peut savoir que Demarches a ete ouvert 340 fois par 11 personnes, on ne peut pas
-- savoir que Sofia a ouvert Demarches mardi a 14 h ». Mag demande aujourd'hui les noms.
-- Ce qui est leve, et ce qui ne l'est pas :
--   - on sort desormais le COUPLE (personne, ecran) avec un nombre d'ouvertures ;
--   - on ne sort TOUJOURS PAS l'heure de chaque passage, ni le journal ligne a ligne :
--     pas de policy SELECT sur usage_ecrans, cette fonction reste le seul passage ;
--   - elle est reservee a l'administratrice (is_admin), comme stats_ecrans ;
--   - les 90 jours de conservation ne changent pas.
--
-- ⚠ CE QUE LA DONNEE NE SAIT PAS DIRE : on enregistre le NOM D'ECRAN (current.view),
-- donc « fiche », jamais QUELLE fiche. Et les passages de Mag ne sont pas enregistres
-- du tout (noterEcran s'arrete sur PROFILE.admin).

create or replace function public.stats_qui(jours int default 30)
returns table(personne text, metier text, ecran text, vues bigint, derniere timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select coalesce(nullif(ae.nom, ''), au.email, 'inconnu')::text as personne,
           coalesce(ae.equipe, '')::text                           as metier,
           u.ecran,
           count(*)::bigint,
           max(u.quand)
      from public.usage_ecrans u
      join auth.users au             on au.id = u.uid
      left join public.allowed_emails ae on lower(ae.email) = lower(au.email)
     where u.quand > now() - (jours || ' days')::interval
     group by 1, 2, 3
     order by 1, count(*) desc;
end;
$$;

grant execute on function public.stats_qui(int) to authenticated;
