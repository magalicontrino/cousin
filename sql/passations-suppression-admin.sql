-- ===========================================================================
-- PASSATIONS : l'administration et la coordination peuvent supprimer celles
-- des autres -- demande de Mag, 04/10/2026 (« retire cette note !!! », une
-- passation d'Elfine que sa corbeille n'effacait pas).
-- Avant : seul l'auteur (uid = auth.uid()). La base refusait en silence.
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================

create or replace function public.peut_supprimer_passations()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.allowed_emails a
     where lower(a.email) = lower(auth.jwt() ->> 'email')
       and coalesce(a.actif, true)
       and ( coalesce(a.admin, false)
          or public.equipe_propre(a.equipe) in ('admin', 'coordination', 'coordi') ) );
$$;
grant execute on function public.peut_supprimer_passations() to authenticated;

drop policy if exists pass_suppr on public.passations;
create policy pass_suppr on public.passations for delete to authenticated
  using (uid = auth.uid() or public.peut_supprimer_passations());
