-- COUSIN -- Les visites du jour (24/09/2026).
-- Mag : « j'aimerais voir hier combien de visites et les visites au total ».
-- On ne garde PAS de carnet jour par jour : un seul compteur, celui du jour de la
-- derniere ouverture. Il repart a 1 le premier passage d'un nouveau jour (heure de
-- Bruxelles). Le total (visites) ne change pas.

alter table public.allowed_emails add column if not exists visites_jour integer not null default 0;
alter table public.allowed_emails add column if not exists jour_visite date;

create or replace function public.touch_connexion()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_n     int;
  v_jour  date := (now() at time zone 'Europe/Brussels')::date;
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
         visites = coalesce(visites, 0) + 1,
         visites_jour = case when jour_visite = v_jour then coalesce(visites_jour, 0) + 1 else 1 end,
         jour_visite = v_jour
   where lower(email) = lower(v_email);

  get diagnostics v_n = row_count;
  return v_email || ' -> ' || v_n || ' ligne(s)';
end;
$$;

grant execute on function public.touch_connexion() to authenticated;
