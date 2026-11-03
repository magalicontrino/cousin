-- 03/11/2026 : la date du DERNIER COLLAGE de la liste KAIROS (ligne id 2) n'a jamais pu
-- s'ecrire : la table n'acceptait que id = 1. L'app se rabattait sur la nuit la plus
-- recente. On accepte maintenant les deux lignes : 1 = derniere mise a jour, 2 = dernier collage.
alter table public.absences_maj drop constraint if exists absences_maj_id_check;
alter table public.absences_maj add constraint absences_maj_id_check check (id in (1,2));
