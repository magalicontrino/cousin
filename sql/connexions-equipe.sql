-- COUSIN -- Retrouver les connexions d avant le compteur (03/08/2026).
--
-- Constat : « Personne de l equipe ne s est encore connecte », alors que 15 personnes se
-- sont deja connectees a l app. Notre propre compteur (allowed_emails.derniere_connexion)
-- ne marche que depuis hier soir -- il ne sait rien d avant, et il ne se remplira que quand
-- chaque telephone aura recharge la nouvelle version.
--
-- Or Supabase note DEJA, dans auth.users, la derniere ouverture de session de chacun.
-- Attention au sens exact : last_sign_in_at, c est le moment ou la personne a retape son
-- compte Google -- pas la derniere fois qu elle a ouvert l app. Une session reste valable
-- des semaines. Les deux informations sont donc differentes, et l app les dit differemment :
--   - notre compteur  -> « aujourd hui a 09:24, 5 ouvertures »
--   - auth.users      -> « connectee le 31 juillet » (avant le compteur)
--
-- auth.users n est pas lisible depuis l app : cette fonction est le seul passage, elle est
-- reservee a l administratrice, et elle ne sort que l adresse et deux dates.

create or replace function public.connexions_equipe()
returns table(email text, derniere_connexion timestamptz, visites int, dernier_login timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select a.email,
           a.derniere_connexion,
           coalesce(a.visites, 0),
           u.last_sign_in_at
      from public.allowed_emails a
      left join auth.users u on lower(u.email) = lower(a.email);
end;
$$;

grant execute on function public.connexions_equipe() to authenticated;

select count(*) as gens, count(dernier_login) as deja_connectes from public.connexions_equipe();
