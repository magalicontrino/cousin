-- ===========================================================================
-- LA COORDINATION N'ETAIT PAS RECONNUE -- corrige le 19/09/2026 (accord de Mag : "ok")
--
-- est_coordi() (sql/gestion-coordi.sql, 31/07/2026) testait equipe = 'coordi'.
-- Or les deux coordinateurs sont enregistres en "Coordination" (constate dans la base
-- le 18/09/2026 : 2 personnes). La fonction repondait donc NON pour eux.
--
-- CE QUE CA BLOQUAIT, EN SILENCE, depuis que le metier a ete renomme :
-- tout ce qui passe par peut_gerer_equipe() --
--   la gestion de l'equipe (ajouter, suspendre, traiter les demandes) ;
--   l'agenda des activites (ecrire, modifier, retirer) ;
--   "Conseillee par l'equipe" (approuver, retirer) ;
--   le tri des avis ;
--   le wiki des fiches et du centre (ecrire, valider).
-- Chaque regle avait ete ecrite pour "l'administration ET la coordination" ;
-- aucune ne marchait pour la coordination.
--
-- LA CORRECTION : on accepte les deux noms. L'ancien ("coordi") reste, pour une ligne
-- qui n'aurait pas ete renommee -- meme principe que les anciens noms de metier de
-- l'app (GROUPE_DE_METIER).
-- (Pas d'accents dans ce fichier : l'editeur SQL les abime.)
-- ===========================================================================

create or replace function public.est_coordi()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.allowed_emails
     where lower(email) = lower(auth.jwt() ->> 'email')
       and coalesce(actif, true)
       and lower(coalesce(equipe, '')) in ('coordi', 'coordination'));
$$;

grant execute on function public.est_coordi() to authenticated;

-- -- PASSE DANS SUPABASE LE 19/09/2026. Verifie compte par compte : reconnus
-- coordination = les 2 comptes "Coordination", et eux seuls.
