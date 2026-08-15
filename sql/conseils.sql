-- COUSIN — « Conseillee par l equipe » : proposee par tous, approuvee par la coordination
-- (Mag, 15/08/2026)
--
-- Sa demande, en deux temps. D abord : « comment je rajoute une notification positive ? »
-- Puis, apres reflexion : « en fait, tout le monde peut poser. Mais c est la coordination
-- qui doit approuver. » Enfin, sur les quatre questions restees ouvertes : « fais le plus
-- logique ». Voici ce que j ai tranche, et pourquoi.
--
-- (Pas d accents dans ce fichier : l editeur SQL les avait deja abimes une fois.)
--
-- ① QUI VOIT UNE PROPOSITION EN ATTENTE ? La coordination, et celui qui l a proposee.
--    Personne d autre — et c est verrouille ICI, dans la policy de lecture, pas
--    seulement a l ecran. Un « conseille » affiche a tous AVANT d etre relu agit deja
--    comme un conseil : on enverrait quelqu un sur la foi d une recommandation que
--    personne n a verifiee.
-- ② CA SE PERIME QUAND ? Jamais. Une proposition qui s efface toute seule, c est le
--    travail d une collegue jete sans que personne ne le sache. L app montre les plus
--    vieilles en premier et signale celles qui dorment depuis plus de 30 jours.
-- ③ SI C EST REFUSE ? Le refus porte un NOM et une RAISON, obligatoire (verifiee par
--    une contrainte plus bas, pas seulement par l ecran). Un refus muet, dans une
--    equipe, se lit comme un mepris.
-- ④ PEUT-ON DE-CONSEILLER ? NON. C est sa regle du 13/08, ecrite dans avis.sql :
--    « ne pas rouvrir la colonne sans elle ». Un « a eviter » signe sur une association
--    nommee, dans un outil que 35 personnes lisent et qui s imprime, peut sortir du
--    centre. A la place, la coordination RETIRE un conseil qui n est plus vrai.
--
-- ⚠ LES TROIS FICHES CONSEILLEES EN DUR NE BOUGENT PAS (Goujonissimo, Centre de Sante
-- du Miroir, Medecine pour le Peuple) : la fonction reco() du code continue de marcher.
-- Cette table s ajoute par-dessus, elle ne remplace rien.

create table if not exists public.conseils (
  sid          text        primary key,          -- une seule proposition vivante par fiche
  texte        text        not null default '',  -- pourquoi on la conseille
  propose_uid  uuid        not null default auth.uid(),
  propose_nom  text        not null default '',  -- signe, comme les avis
  propose_le   timestamptz not null default now(),
  etat         text        not null default 'attente',
  tranche_nom  text        null,                 -- qui a approuve ou refuse
  tranche_le   timestamptz null,
  motif        text        null,                 -- la raison du refus
  constraint conseils_etat_connu check (etat in ('attente','ok','refus')),
  -- ⚠ ON NE PEUT PAS REFUSER EN SILENCE. La regle ③ tient ici, pas dans le bouton.
  constraint conseils_refus_motive check (etat <> 'refus' or coalesce(motif,'') <> '')
);

create index if not exists conseils_etat_idx on public.conseils (etat, propose_le);

alter table public.conseils enable row level security;

-- LIRE : ce qui est approuve, tout le monde. Ce qui attend ou a ete refuse, seulement
-- celui qui l a propose et la coordination. C est la regle ① et elle est ici.
drop policy if exists conseils_lire on public.conseils;
create policy conseils_lire on public.conseils
  for select to authenticated
  using (
    public.is_active_member() and (
      etat = 'ok'
      or propose_uid = auth.uid()
      or public.peut_gerer_equipe()
    )
  );

-- PROPOSER : tout membre actif, et seulement en « attente ». Personne ne s auto-approuve.
drop policy if exists conseils_proposer on public.conseils;
create policy conseils_proposer on public.conseils
  for insert to authenticated
  with check (
    propose_uid = auth.uid() and public.is_active_member() and etat = 'attente'
  );

-- TRANCHER : la coordination et l administration. Celui qui a propose peut encore
-- corriger SA proposition tant qu elle attend — mais pas la faire passer en « ok ».
drop policy if exists conseils_trancher on public.conseils;
create policy conseils_trancher on public.conseils
  for update to authenticated
  using (
    public.peut_gerer_equipe()
    or (propose_uid = auth.uid() and etat = 'attente')
  )
  with check (
    public.peut_gerer_equipe()
    or (propose_uid = auth.uid() and etat = 'attente')
  );

-- RETIRER : le sien, ou la coordination (c est ainsi qu on enleve un conseil devenu faux).
drop policy if exists conseils_retirer on public.conseils;
create policy conseils_retirer on public.conseils
  for delete to authenticated
  using (propose_uid = auth.uid() or public.peut_gerer_equipe());

-- ⚠ SANS CE GRANT, LES POLICIES NE SUFFISENT PAS : « permission denied ».
-- La lecon a deja coute une seance (voir la memoire « le grant des nouvelles tables »).
grant select, insert, update, delete on public.conseils to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Le temps reel, comme les avis : une approbation doit apparaitre sans recharger.
alter table public.conseils replica identity full;
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'conseils'
  ) then
    alter publication supabase_realtime add table public.conseils;
  end if;
end $$;

-- Verification : doit repondre sans erreur, et 0 ligne au depart.
select count(*) as propositions from public.conseils;
