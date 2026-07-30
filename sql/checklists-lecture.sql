-- COUSIN — qui voit quelle check-list. Passé le 2026-07-30, à la demande de Mag :
-- « le PFO ne doit pas avoir la liste des autres, juste sa liste de PFO ».
--
-- Avant : la règle disait « admin OU pfo OU sa liste » — donc les trois PFO voyaient
-- les listes de tout le monde. Maintenant seule l'administratrice voit tout (elle en a
-- besoin pour l'aperçu par rôle) ; chacun ne voit que ce qui lui est attribué.

-- Les PFO gardent LEUR liste : on la leur attribue explicitement avant de fermer le reste.
update public.allowed_emails
   set listes = array['pfo-jour','pfo-nuit']
 where pfo = true and (listes is null or array_length(listes,1) is null);

drop policy if exists "lecture checklists" on public.checklists;
create policy "lecture checklists" on public.checklists
  for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.allowed_emails ae
       where lower(ae.email) = lower(auth.jwt() ->> 'email')
         and coalesce(ae.actif, true)
         and ( checklists.liste = any (coalesce(ae.listes, '{}'::text[]))
               -- filet : un « Médical » garde la liste « médical » même si rien n'est attribué
               or lower(coalesce(ae.equipe,'')) = lower(checklists.liste) )
    )
  );
