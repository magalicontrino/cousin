-- COUSIN -- Reparation du compteur de connexions (31/07/2026).
-- Constat : la colonne derniere_connexion existait, la fonction touch_connexion existait,
-- et pourtant TOUT etait a NULL et visites=0 pour tout le monde. La table profiles, qui
-- recevait elle aussi une trace a chaque connexion, etait vide. Autrement dit : les deux
-- ecritures echouaient en silence (chaque appel est enveloppe dans un catch muet cote app).
--
-- Deux corrections :
--   1. on ne depend plus du seul claim 'email' du jeton : si il manque, on retrouve
--      l adresse dans auth.users a partir de auth.uid() ;
--   2. la fonction RENVOIE ce qu elle a fait (adresse trouvee + nombre de lignes mises a
--      jour), pour qu on puisse enfin voir ou ca coince au lieu de deviner.

-- L ancienne version ne renvoyait rien (void) : Postgres refuse de changer le type de
-- retour d une fonction existante, il faut donc la retirer d abord.
drop function if exists public.touch_connexion();

create or replace function public.touch_connexion()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_n     int;
begin
  select coalesce(
           nullif(auth.jwt() ->> 'email', ''),
           (select u.email from auth.users u where u.id = auth.uid())
         )
    into v_email;

  if v_email is null then
    return 'aucune session';
  end if;

  update public.allowed_emails
     set derniere_connexion = now(),
         visites = coalesce(visites, 0) + 1
   where lower(email) = lower(v_email);

  get diagnostics v_n = row_count;
  return v_email || ' -> ' || v_n || ' ligne(s)';
end;
$$;

grant execute on function public.touch_connexion() to authenticated;

select 'fonction remplacee' as etat;
