-- COUSIN -- La coordination peut aider a gerer l equipe (demande de Mag, 31/07/2026).
-- Elle peut : ajouter quelqu un, suspendre ou reactiver quelqu un, et traiter les demandes
-- d acces. Elle ne peut PAS : supprimer definitivement, changer les roles, toucher aux
-- acces, ni voir les statistiques. Tout le reste reste a l administratrice.
--
-- Pourquoi des fonctions plutot que d elargir les regles de lecture/ecriture des tables :
-- une regle RLS ne sait pas dire "cette personne peut modifier UNE colonne". Une fonction,
-- si. Chaque geste autorise est donc une fonction, et rien d autre ne s ouvre.
-- (Pas d accents dans ce fichier : l editeur SQL les avait deja abimes une fois.)

create or replace function public.est_coordi()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.allowed_emails
     where lower(email) = lower(auth.jwt() ->> 'email')
       and coalesce(actif, true)
       and lower(coalesce(equipe, '')) = 'coordi');
$$;

create or replace function public.peut_gerer_equipe()
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or public.est_coordi();
$$;

grant execute on function public.est_coordi() to authenticated;
grant execute on function public.peut_gerer_equipe() to authenticated;

-- ─────────── LIRE ───────────

create or replace function public.gestion_equipe()
returns table(email text, nom text, equipe text, pfo boolean, referent boolean,
              admin boolean, actif boolean, listes text[])
language plpgsql security definer set search_path = public as $$
begin
  if not public.peut_gerer_equipe() then return; end if;
  return query
    select a.email, a.nom, a.equipe, a.pfo, a.referent, a.admin, a.actif, a.listes
      from public.allowed_emails a
     order by a.email;
end $$;

create or replace function public.gestion_demandes()
returns table(id bigint, email text, mot text, cree_le timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not public.peut_gerer_equipe() then return; end if;
  return query
    select d.id, d.email, d.mot, d.cree_le
      from public.access_requests d
     where coalesce(d.statut, 'attente') = 'attente'
     order by d.cree_le;
end $$;

-- ─────────── AGIR ───────────

create or replace function public.gestion_ajouter(p_email text, p_equipe text, p_listes text[] default '{}')
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.peut_gerer_equipe() then
    raise exception 'Reserve a la coordination et a l administration';
  end if;
  -- Adresse professionnelle obligatoire, SAUF pour l administratrice : elle seule peut
  -- ouvrir la porte a une adresse personnelle (un stage, un remplacement, un cas a part).
  if not public.is_admin() and lower(trim(p_email)) not like '%@samusocial.be' then
    raise exception 'Il faut une adresse @samusocial.be';
  end if;
  insert into public.allowed_emails (email, equipe, actif, listes)
  values (lower(trim(p_email)), coalesce(p_equipe, ''), true, coalesce(p_listes, '{}'))
  on conflict (email) do update
    set equipe = excluded.equipe, actif = true, listes = excluded.listes;
end $$;

-- Suspendre ou reactiver. On ne touche QU A la colonne actif, et jamais a une
-- administratrice : personne ne doit pouvoir fermer la porte a celle qui tient les cles.
create or replace function public.gestion_actif(p_email text, p_actif boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.peut_gerer_equipe() then
    raise exception 'Reserve a la coordination et a l administration';
  end if;
  update public.allowed_emails
     set actif = p_actif
   where lower(email) = lower(trim(p_email))
     and coalesce(admin, false) = false;
end $$;

-- Les demandes d acces : approuver, refuser, ou supprimer la ligne.
create or replace function public.gestion_demande(p_id bigint, p_action text, p_email text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.peut_gerer_equipe() then
    raise exception 'Reserve a la coordination et a l administration';
  end if;
  if p_action = 'approuver' then
    -- Meme regle que pour un ajout a la main : seule l administratrice peut approuver
    -- une adresse qui n est pas @samusocial.be.
    if not public.is_admin() and lower(trim(p_email)) not like '%@samusocial.be' then
      raise exception 'Il faut une adresse @samusocial.be';
    end if;
    insert into public.allowed_emails (email, equipe, actif)
    values (lower(trim(p_email)), '', true)
    on conflict (email) do update set actif = true;
    update public.access_requests set statut = 'approuve' where id = p_id;
  elsif p_action = 'refuser' then
    update public.access_requests set statut = 'refuse' where id = p_id;
  elsif p_action = 'supprimer' then
    delete from public.access_requests where id = p_id;
  end if;
end $$;

grant execute on function public.gestion_equipe() to authenticated;
grant execute on function public.gestion_demandes() to authenticated;
grant execute on function public.gestion_ajouter(text, text, text[]) to authenticated;
grant execute on function public.gestion_actif(text, boolean) to authenticated;
grant execute on function public.gestion_demande(bigint, text, text) to authenticated;

-- Verification : doit renvoyer false pour toi (tu es admin, pas coordi) et true a la ligne
-- suivante (parce qu administratrice).
select public.est_coordi() as je_suis_coordi, public.peut_gerer_equipe() as je_peux_gerer;
