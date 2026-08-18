-- COUSIN — LA PAGE DE TRI : ranger les messages de l equipe (Mag, 18/08/2026)
--
-- Son idee : « avec toi, Claude, on pourra revoir tous les messages, les verifier,
-- les mettre dans la bonne case avec la bonne information, et les mettre dans la
-- serie de lieux conseilles par l equipe. »
--
-- Sur le terrain on ECRIT. Le rangement en etiquettes se fait apres, a deux.
-- Ce fichier ajoute juste de quoi savoir CE QUI A DEJA ETE RANGE — sans ca, on
-- relit dix fois les memes messages et on ne sait jamais ou on en est.
--
-- (Pas d accents dans ce fichier : l editeur SQL les avait deja abimes une fois.)

alter table public.avis add column if not exists range_le  timestamptz null;
alter table public.avis add column if not exists range_par text        null;

-- Les non-ranges d abord, les plus vieux en tete : c est une file d attente.
create index if not exists avis_a_ranger_idx on public.avis (range_le, cree_le);

-- ⚠ LA COORDINATION DOIT POUVOIR MODIFIER L AVIS D UNE COLLEGUE, et c est tout
-- l objet de la page de tri : poser l etiquette que l auteur n a pas eu a choisir.
-- La policy d origine (`avis_modifier`) ne permettait QUE de modifier le sien —
-- le tri n aurait rien pu ecrire, et l ecran aurait affiche « pas enregistre »
-- sans que personne comprenne pourquoi.
--
-- ⚠ CE QUE CA N AUTORISE PAS : reecrire le TEXTE de quelqu un. Ca, la policy ne
-- peut pas l empecher toute seule — c est une regle d usage, et elle est ecrite
-- dans le code de la page de tri : on classe, on ne recrit pas. Un avis est signe
-- ([[cousin-avis-des-collegues]]) ; si son texte changeait sous la signature de
-- son auteur, la signature ne voudrait plus rien dire.
drop policy if exists avis_modifier on public.avis;
create policy avis_modifier on public.avis
  for update to authenticated
  using      (uid = auth.uid() or public.peut_gerer_equipe())
  with check (uid = auth.uid() or public.peut_gerer_equipe());

-- Rien a ajouter cote `grant` : le droit porte sur la table, pas sur la colonne
-- (voir la memoire « le grant des nouvelles tables »).

-- Verification : combien de messages restent a ranger ?
select count(*)                                        as messages_en_tout,
       count(*) filter (where range_le is null)        as a_ranger,
       count(*) filter (where coalesce(texte,'') <> '') as avec_du_texte
  from public.avis;
