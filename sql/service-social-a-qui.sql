-- ═══ SERVICE SOCIAL — À QUI ? (08/10/2026) ═══════════════════════════════════
-- Ta décision : « je choisis à chaque fois ». Une ligne envoyée au service social ne
-- part plus forcément à tout le service : on coche les prénoms.
--
--   pour_qui  = les e-mails (en minuscules) des personnes cochées.
--               NULL = tout le service social — c'est le cas de toutes les lignes
--               envoyées AVANT ce changement : elles restent pour tous (ta réponse).
--
-- ⚠ LA BASE TRIE, PAS L'ÉCRAN. Une ligne que tu as réservée à Afaf n'est jamais
-- envoyée au téléphone de quelqu'un d'autre : la règle de lecture la retient.
-- Lisent une ligne du service social : son auteur, et les personnes cochées.
-- La nuit et les autres passations ne changent pas (pour <> 'ts' → tout le monde lit).
--
-- Les réponses suivent leur ligne : on lit une réponse si on peut lire la ligne.
--
-- Rejouable : on peut le relancer sans rien casser.
-- ══════════════════════════════════════════════════════════════════════════════

alter table public.passations add column if not exists pour_qui text[];

drop policy if exists pass_lecture on public.passations;
create policy pass_lecture on public.passations for select to authenticated using (
  pour <> 'ts'
  or pour_qui is null
  or uid = auth.uid()
  or lower(auth.jwt() ->> 'email') = any (pour_qui)
);

-- Une réponse se lit (et s'écrit) seulement sous une ligne qu'on a le droit de lire.
drop policy if exists pr_lecture on public.passation_reponses;
create policy pr_lecture on public.passation_reponses for select to authenticated using (
  exists (select 1 from public.passations p where p.id = passation_id)
);
drop policy if exists pr_ecriture on public.passation_reponses;
create policy pr_ecriture on public.passation_reponses for insert to authenticated with check (
  uid = auth.uid() and exists (select 1 from public.passations p where p.id = passation_id)
);

-- Les prénoms à cocher : les comptes actifs « Travailleur social ». Le prénom vient du
-- compte Google ; sans lui, du début de l'adresse (selma.sefiani → Selma).
-- Seul quelqu'un du service social (ou l'administration) reçoit la liste.
create or replace function public.service_social()
returns table(email text, prenom text)
language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.allowed_emails a
     where lower(a.email) = lower(auth.jwt() ->> 'email')
       and coalesce(a.actif, true)
       and (coalesce(a.admin, false)
            or public.equipe_propre(a.equipe) in ('travailleur social', 'ts'))
  ) then return; end if;
  return query
    select lower(a.email)::text,
           coalesce(
             nullif(split_part(coalesce(u.raw_user_meta_data ->> 'full_name',
                                        u.raw_user_meta_data ->> 'name', ''), ' ', 1), ''),
             initcap(split_part(split_part(a.email, '@', 1), '.', 1))
           )::text
      from public.allowed_emails a
      left join auth.users u on lower(u.email) = lower(a.email)
     where coalesce(a.actif, true)
       and public.equipe_propre(a.equipe) in ('travailleur social', 'ts')
     order by 2;
end $$;
revoke all on function public.service_social() from public;
grant execute on function public.service_social() to authenticated;
