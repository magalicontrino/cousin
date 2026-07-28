-- COUSIN — Feed en couleur : catégorie, épinglage et réactions.
alter table public.feed add column if not exists type text not null default 'info';
alter table public.feed add column if not exists epingle boolean not null default false;

create table if not exists public.feed_reactions (
  id bigserial primary key,
  feed_id bigint not null references public.feed(id) on delete cascade,
  emoji text not null,
  auteur_id uuid not null default auth.uid(),
  auteur_nom text,
  cree_le timestamptz not null default now(),
  unique (feed_id, emoji, auteur_id)   -- une seule fois la même réaction par personne
);

alter table public.feed_reactions enable row level security;

drop policy if exists fr_lire on public.feed_reactions;
create policy fr_lire on public.feed_reactions for select to authenticated using (public.is_active_member());

drop policy if exists fr_ajouter on public.feed_reactions;
create policy fr_ajouter on public.feed_reactions for insert to authenticated with check (public.is_active_member() and auteur_id = auth.uid());

drop policy if exists fr_retirer on public.feed_reactions;   -- on ne retire que SA réaction
create policy fr_retirer on public.feed_reactions for delete to authenticated using (auteur_id = auth.uid());

grant select, insert, delete on public.feed_reactions to authenticated;
grant usage, select on all sequences in schema public to authenticated;
