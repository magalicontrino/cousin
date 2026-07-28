-- COUSIN — Statistiques d'usage (volontairement minimales)
-- On enregistre UNIQUEMENT : la dernière connexion et le nombre d'ouvertures de l'app.
-- Pas de temps passé, pas de clics, pas de pages consultées : l'outil aide l'équipe,
-- il ne la surveille pas. Ces deux infos répondent à la seule vraie question :
-- « est-ce que l'équipe s'en sert ? »

alter table public.allowed_emails add column if not exists derniere_connexion timestamptz;
alter table public.allowed_emails add column if not exists visites integer not null default 0;

-- Chaque personne ne peut mettre à jour QUE sa propre ligne, et seulement ces deux champs.
-- (fonction security definer : elle contourne RLS mais uniquement pour ce geste précis)
create or replace function public.touch_connexion()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.allowed_emails
     set derniere_connexion = now(),
         visites = coalesce(visites, 0) + 1
   where lower(email) = lower(auth.jwt() ->> 'email');
end;
$$;

grant execute on function public.touch_connexion() to authenticated;
