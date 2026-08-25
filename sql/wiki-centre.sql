-- COUSIN — LE WIKI DES PAGES : ecrit par tous, VALIDE PAR ELLE (Mag, 26/08/2026)
--
-- Sa demande, en trois messages : « mets un wiki dans tout ca pour que les
-- travailleurs puissent participer aux infos » — « dans chacun d eux » — puis, et
-- c est ce qui decide de tout : « ce wiki ne va servir qu a affiner les infos.
-- tout sera ensemble mais d abord valide par moi ».
--
-- (Pas d accents dans ce fichier : l editeur SQL les avait deja abimes une fois.)
--
-- CE QUE CA EST, ET CE QUE CA N EST PAS
-- Ce n est pas un fil de discussion. C est un moyen de CORRIGER ou de PRECISER ce
-- qui est deja ecrit sur une page — l etage du linge, une heure qui a change, un
-- numero qui ne repond plus. Une note qui ne change pas ce qu on fait n a rien a
-- faire ici (sa regle : « ne rien ecrire qui ne change pas ce qu on fait »).
--
-- LES QUATRE REGLES, ET OU ELLES SONT TENUES
-- (1) TOUT LE MONDE ECRIT. N importe quel membre actif pose une note.
--     -> policy wiki_centre_ecrire.
-- (2) RIEN N APPARAIT AVANT SA VALIDATION. Une note en attente n est visible que
--     par celui qui l a ecrite et par la coordination. C est verrouille ICI, dans
--     la policy de LECTURE, et pas seulement a l ecran : une correction fausse
--     affichee a 35 personnes, c est pire que pas de correction du tout.
--     -> policy wiki_centre_lire.
-- (3) PERSONNE NE S AUTO-VALIDE. L insertion n accepte que etat = 'attente', meme
--     venant de la coordination : on relit toujours a deux yeux.
--     -> `with check (... etat = 'attente')`.
-- (4) UN REFUS PORTE UN NOM ET UNE RAISON. Un refus muet, dans une equipe, se lit
--     comme un mepris. Meme regle que conseils.sql, meme contrainte.
--     -> contrainte wiki_centre_refus_motive.
--
-- ⚠ PLUSIEURS NOTES PAR PAGE, contrairement a `conseils` qui en a une par fiche.
-- Un wiki, c est un mot pose par l une, une phrase ajoutee par l autre. La cle
-- primaire est donc un id, et `page` n est qu une colonne indexee.
--
-- ⚠ CA NE VA PAS SUR LE PAPIER. Sa reponse etait « non, ecran seulement » : la
-- feuille qu on donne a l equipe garde les consignes officielles. Rien a faire ici
-- — c est le code de l app qui n imprime pas ce bloc — mais c est note pour que
-- personne ne l ajoute plus tard en croyant bien faire.

create table if not exists public.wiki_centre (
  id          bigserial   primary key,
  page        text        not null,             -- 'linge', 'chambres', 'eau'…
  texte       text        not null,
  auteur_uid  uuid        not null default auth.uid(),
  auteur_nom  text        not null default '',  -- signe, comme les avis
  cree_le     timestamptz not null default now(),
  etat        text        not null default 'attente',
  tranche_nom text        null,                 -- qui a valide ou refuse
  tranche_le  timestamptz null,
  motif       text        null,                 -- la raison du refus
  constraint wiki_centre_page_courte  check (char_length(page) between 1 and 40),
  constraint wiki_centre_texte_plein  check (char_length(btrim(texte)) between 1 and 600),
  constraint wiki_centre_etat_connu   check (etat in ('attente','ok','refus')),
  -- ⚠ ON NE PEUT PAS REFUSER EN SILENCE. La regle (4) tient ici, pas dans le bouton.
  constraint wiki_centre_refus_motive check (etat <> 'refus' or coalesce(motif,'') <> '')
);

-- Ce qu on lit sur une page : les notes validees de CETTE page, les plus recentes
-- d abord. Et la file d attente de la coordination : par date, les plus vieilles
-- d abord (c est une file, pas un fil d actualite).
create index if not exists wiki_centre_page_idx  on public.wiki_centre (page, etat, cree_le desc);
create index if not exists wiki_centre_etat_idx  on public.wiki_centre (etat, cree_le);

alter table public.wiki_centre enable row level security;

-- LIRE : ce qui est valide, tout le monde. Ce qui attend ou a ete refuse,
-- seulement celui qui l a ecrit et la coordination. C est la regle (2), et elle
-- est ici — pas dans l ecran.
drop policy if exists wiki_centre_lire on public.wiki_centre;
create policy wiki_centre_lire on public.wiki_centre
  for select to authenticated
  using (
    public.is_active_member() and (
      etat = 'ok'
      or auteur_uid = auth.uid()
      or public.peut_gerer_equipe()
    )
  );

-- ECRIRE : tout membre actif, et SEULEMENT en « attente ». Regles (1) et (3).
drop policy if exists wiki_centre_ecrire on public.wiki_centre;
create policy wiki_centre_ecrire on public.wiki_centre
  for insert to authenticated
  with check (
    auteur_uid = auth.uid() and public.is_active_member() and etat = 'attente'
  );

-- TRANCHER : la coordination et l administration. Celui qui a ecrit peut encore
-- corriger SA note tant qu elle attend — mais pas la faire passer en « ok ».
drop policy if exists wiki_centre_trancher on public.wiki_centre;
create policy wiki_centre_trancher on public.wiki_centre
  for update to authenticated
  using (
    public.peut_gerer_equipe()
    or (auteur_uid = auth.uid() and etat = 'attente')
  )
  with check (
    public.peut_gerer_equipe()
    or (auteur_uid = auth.uid() and etat = 'attente')
  );

-- RETIRER : la sienne, ou la coordination (c est ainsi qu on enleve une note
-- devenue fausse — un etage qui rechange, un numero qui rerepond).
drop policy if exists wiki_centre_retirer on public.wiki_centre;
create policy wiki_centre_retirer on public.wiki_centre
  for delete to authenticated
  using (auteur_uid = auth.uid() or public.peut_gerer_equipe());

-- ⚠ SANS CE GRANT, LES POLICIES NE SUFFISENT PAS : « permission denied ».
-- La lecon a deja coute une seance (voir la memoire « le grant des nouvelles tables »).
grant select, insert, update, delete on public.wiki_centre to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Le temps reel, comme les avis : une validation doit apparaitre sans recharger.
alter table public.wiki_centre replica identity full;
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'wiki_centre'
  ) then
    alter publication supabase_realtime add table public.wiki_centre;
  end if;
end $$;

-- Verification : doit repondre sans erreur, et 0 ligne au depart.
select count(*) as notes from public.wiki_centre;
