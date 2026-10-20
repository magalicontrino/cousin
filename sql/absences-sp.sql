-- 19/10/2026 : statut SP sur les absences
alter table public.absences drop constraint if exists absences_statut_check; alter table public.absences add constraint absences_statut_check check (statut in ('nonjust','just','hospit','sp'));
