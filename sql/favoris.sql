-- ═══════════════════════════════════════════════════════════════════════════
-- COUSIN — les favoris passent en base.
-- Créé le 30/07/2026. Avant, l'étoile ne vivait que dans le téléphone : nouveau
-- téléphone, app désinstallée ou navigateur nettoyé = tous les favoris perdus,
-- et rien ne suivait la personne d'un appareil à l'autre.
--
-- Ce qu'on enregistre : QUI a mis en favori QUELLE fiche. Rien d'autre.
-- Chacun ne voit que ses propres favoris — personne ne peut lire ceux d'un
-- collègue, pas même l'administratrice.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.favoris (
  user_id uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  sid     text        not null,           -- l'identifiant stable de la fiche (ex. « d-42 »)
  cree_le timestamptz not null default now(),
  primary key (user_id, sid)              -- deux fois la même étoile = une seule ligne
);

alter table public.favoris enable row level security;

-- Volontairement simple : la seule règle, c'est « c'est à moi ».
-- Pas de is_active_member() ici — quelqu'un de temporairement suspendu ne doit pas
-- perdre l'accès à ses propres favoris, et la porte de connexion filtre déjà l'entrée.
drop policy if exists favoris_lecture on public.favoris;
create policy favoris_lecture on public.favoris
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists favoris_ajout on public.favoris;
create policy favoris_ajout on public.favoris
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists favoris_retrait on public.favoris;
create policy favoris_retrait on public.favoris
  for delete to authenticated using (auth.uid() = user_id);

grant select, insert, delete on public.favoris to authenticated;

select count(*) as favoris_enregistres from public.favoris;
