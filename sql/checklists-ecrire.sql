-- COUSIN — Écrire les modèles de check-lists depuis l'app (06/08/2026)
--
-- Le symptôme : dans Admin → Les modèles, ajouter ou retirer une tâche ne fait rien.
-- La cause : la table `checklists` n'avait qu'une politique de LECTURE
-- (sql/checklists-lecture.sql). Personne n'avait jamais eu besoin d'écrire depuis
-- l'app — Mag passait par le SQL Editor à chaque changement de tâche.
--
-- La règle posée ici : SEULE l'administration écrit les modèles. Les autres
-- continuent de les LIRE selon la politique existante, qui ne bouge pas.
--
-- ⚠ Ce que ça ne touche pas : `checklist_faites`, où est gardé ce que chacun a
-- coché. Retirer une tâche du modèle n'efface donc le travail de personne.

drop policy if exists checklists_ecrire on public.checklists;
create policy checklists_ecrire on public.checklists
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant insert, update, delete on public.checklists to authenticated;
grant usage, select on all sequences in schema public to authenticated;
