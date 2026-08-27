-- COUSIN -- LE WIKI DES FICHES : UN SEUL TEXTE, ECRIT PAR TOUS (Mag, 27/08/2026)
--
-- Sa demande : " ce serait bien que ca fasse comme un Wikipedia ". Deux versions lui
-- ont ete dessinees ; elle a choisi la A : le texte commun et l historique, MAIS la
-- validation reste la sienne.
--
-- (Pas d accents dans ce fichier : l editeur SQL les a deja abimes une fois.)
--
-- CE QUE CA REMPLACE, ET POURQUOI
-- Jusqu ici chacun avait SA note sur une fiche (table `avis`, une ligne par personne).
-- Elles s empilaient. Mesure faite sur le CPAS de Schaerbeek : trois personnes, trois
-- notes, et les deux premieres disaient la meme chose. Au bout de six mois il faut
-- lire dix notes pour reconstituer trois lignes.
-- Desormais : UN texte par fiche, que chacun reprend.
--
-- LES CINQ REGLES, ET OU ELLES SONT TENUES
-- (1) UN SEUL TEXTE PAR FICHE. -> cle primaire sur `sid` dans wiki_fiches.
-- (2) TOUT LE MONDE PROPOSE une modification. -> policy wiki_versions_ecrire.
-- (3) RIEN NE S AFFICHE AVANT SA VALIDATION. C est son choix A, et c est la meme
--     regle que le wiki des pages. Tenue par la BASE : le texte public vit dans
--     wiki_fiches, ou seule la coordination ecrit. Une proposition en attente n est
--     visible que par son auteur et la coordination.
--     -> policy wiki_versions_lire + wiki_fiches_ecrire.
-- (4) PERSONNE NE S AUTO-VALIDE. L insertion n accepte que etat = 'attente'.
-- (5) UN REFUS PORTE UNE RAISON. Meme contrainte que conseils et wiki_centre.
--
-- /!\ L HISTORIQUE EST LE VRAI APPORT, pas le texte commun. Sans lui, un texte que
-- tout le monde reecrit devient intenable : on ne sait plus qui a enleve quoi, ni
-- comment revenir. `wiki_versions` garde TOUTES les versions, meme validees, meme
-- remplacees. On n efface jamais une version.
--
-- /!\ LES ANCIENNES NOTES NE SONT PAS PERDUES : la migration en bas de ce fichier les
-- assemble en une premiere version par fiche, avec leurs auteurs. La table `avis`
-- n est PAS supprimee -- on ne detruit pas ce qu on vient de convertir, et les
-- etiquettes continuent d y vivre.

-- ===========================================================================
-- 1. LE TEXTE PUBLIC -- ce que l equipe lit sur la fiche
-- ===========================================================================
create table if not exists public.wiki_fiches (
  sid        text        primary key,            -- la fiche du catalogue
  texte      text        not null default '',
  maj_le     timestamptz not null default now(),
  maj_nom    text        not null default '',    -- qui a valide la version en place
  version_id bigint      null,                   -- quelle version est affichee
  constraint wiki_fiches_texte_borne check (char_length(texte) <= 4000)
);

-- ===========================================================================
-- 2. L HISTORIQUE -- toutes les versions, y compris celles en attente
-- ===========================================================================
create table if not exists public.wiki_versions (
  id          bigserial   primary key,
  sid         text        not null,
  texte       text        not null,
  resume      text        not null default '',   -- " a ajoute le numero direct "
  auteur_uid  uuid        not null default auth.uid(),
  auteur_nom  text        not null default '',
  cree_le     timestamptz not null default now(),
  etat        text        not null default 'attente',
  tranche_nom text        null,
  tranche_le  timestamptz null,
  motif       text        null,
  constraint wiki_versions_texte_plein  check (char_length(btrim(texte)) between 1 and 4000),
  constraint wiki_versions_resume_court check (char_length(resume) <= 120),
  constraint wiki_versions_etat_connu   check (etat in ('attente','ok','refus')),
  -- /!\ ON NE PEUT PAS REFUSER EN SILENCE. Un refus muet, dans une equipe, se lit
  -- comme un mepris. Meme regle que conseils.sql et wiki-centre.sql.
  constraint wiki_versions_refus_motive check (etat <> 'refus' or coalesce(motif,'') <> '')
);

-- Ce qu on lit : l historique d une fiche (recent d abord), et la file d attente de
-- la coordination (le plus vieux d abord -- c est une file, pas un fil d actualite).
create index if not exists wiki_versions_sid_idx  on public.wiki_versions (sid, cree_le desc);
create index if not exists wiki_versions_etat_idx on public.wiki_versions (etat, cree_le);

alter table public.wiki_fiches   enable row level security;
alter table public.wiki_versions enable row level security;

-- ===========================================================================
-- 3. QUI PEUT QUOI
-- ===========================================================================

-- LE TEXTE PUBLIC : tout le monde le lit, SEULE la coordination l ecrit. C est ici
-- que tient la regle (3) -- pas a l ecran. Si l ecran se trompait, la base tiendrait.
drop policy if exists wiki_fiches_lire on public.wiki_fiches;
create policy wiki_fiches_lire on public.wiki_fiches
  for select to authenticated
  using (public.is_active_member());

drop policy if exists wiki_fiches_ecrire on public.wiki_fiches;
create policy wiki_fiches_ecrire on public.wiki_fiches
  for insert to authenticated
  with check (public.peut_gerer_equipe());

drop policy if exists wiki_fiches_modifier on public.wiki_fiches;
create policy wiki_fiches_modifier on public.wiki_fiches
  for update to authenticated
  using (public.peut_gerer_equipe())
  with check (public.peut_gerer_equipe());

-- LES VERSIONS : ce qui est valide se lit par tous ; ce qui attend ou a ete refuse,
-- seulement par son auteur et par la coordination. Regle (3), tenue ici.
drop policy if exists wiki_versions_lire on public.wiki_versions;
create policy wiki_versions_lire on public.wiki_versions
  for select to authenticated
  using (
    public.is_active_member() and (
      etat = 'ok'
      or auteur_uid = auth.uid()
      or public.peut_gerer_equipe()
    )
  );

-- ECRIRE : tout membre actif, et SEULEMENT en " attente ". Regles (2) et (4).
drop policy if exists wiki_versions_ecrire on public.wiki_versions;
create policy wiki_versions_ecrire on public.wiki_versions
  for insert to authenticated
  with check (
    auteur_uid = auth.uid() and public.is_active_member() and etat = 'attente'
  );

-- TRANCHER : la coordination. Celui qui a propose peut encore corriger SA proposition
-- tant qu elle attend -- mais pas la faire passer en " ok ".
drop policy if exists wiki_versions_trancher on public.wiki_versions;
create policy wiki_versions_trancher on public.wiki_versions
  for update to authenticated
  using (
    public.peut_gerer_equipe()
    or (auteur_uid = auth.uid() and etat = 'attente')
  )
  with check (
    public.peut_gerer_equipe()
    or (auteur_uid = auth.uid() and etat = 'attente')
  );

-- RETIRER : sa propre proposition tant qu elle attend, ou l administration.
-- /!\ On ne supprime PAS une version validee : c est l historique, il doit rester
-- complet pour que " revenir " ait un sens.
drop policy if exists wiki_versions_retirer on public.wiki_versions;
create policy wiki_versions_retirer on public.wiki_versions
  for delete to authenticated
  using (
    (auteur_uid = auth.uid() and etat = 'attente')
    or public.is_admin()
  );

-- /!\ SANS CE GRANT, LES POLICIES NE SUFFISENT PAS : " permission denied ".
-- La lecon a deja coute une seance (voir la memoire " le grant des nouvelles tables ").
grant select, insert, update, delete on public.wiki_fiches   to authenticated;
grant select, insert, update, delete on public.wiki_versions to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Le temps reel, comme les avis : une validation doit apparaitre sans recharger.
alter table public.wiki_fiches   replica identity full;
alter table public.wiki_versions replica identity full;
do $$
begin
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and tablename = 'wiki_fiches') then
    alter publication supabase_realtime add table public.wiki_fiches;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and tablename = 'wiki_versions') then
    alter publication supabase_realtime add table public.wiki_versions;
  end if;
end $$;

-- ===========================================================================
-- 4. LA MIGRATION -- les anciennes notes deviennent la premiere version
-- ===========================================================================
-- /!\ ELLE NE S EXECUTE QU UNE FOIS : le `where not exists` fait qu un second passage
-- ne recree rien. On peut relancer ce fichier entier sans rien casser.
-- /!\ ET ELLE NE TOUCHE PAS A `avis` : on ne detruit pas ce qu on vient de convertir.
-- Les etiquettes continuent d y vivre, seul le TEXTE demenage.

-- Une version d origine par fiche, faite des notes existantes mises bout a bout,
-- signees dans le corps du texte : c est le passage d un format a l autre, et la
-- signature de chacun ne doit pas se perdre au change.
insert into public.wiki_versions (sid, texte, resume, auteur_uid, auteur_nom, etat, tranche_nom, tranche_le)
select
  a.sid,
  string_agg(btrim(a.texte), E'\n' order by a.cree_le),
  'reprise des notes de l equipe',
  '00000000-0000-0000-0000-000000000000'::uuid,
  'reprise automatique',
  'ok',
  'migration du 27/08/2026',
  now()
from public.avis a
where btrim(coalesce(a.texte,'')) <> ''
  and not exists (select 1 from public.wiki_fiches w where w.sid = a.sid)
group by a.sid;

insert into public.wiki_fiches (sid, texte, maj_nom, version_id)
select v.sid, v.texte, 'migration du 27/08/2026', max(v.id)
from public.wiki_versions v
where v.resume = 'reprise des notes de l equipe'
  and not exists (select 1 from public.wiki_fiches w where w.sid = v.sid)
group by v.sid, v.texte;

-- ===========================================================================
-- 5. VERIFICATION -- doit repondre sans erreur
-- ===========================================================================
select
  (select count(*) from public.wiki_fiches)   as fiches_avec_un_texte,
  (select count(*) from public.wiki_versions) as versions_en_tout,
  (select count(*) from public.wiki_versions where etat = 'attente') as en_attente,
  (select count(distinct sid) from public.avis where btrim(coalesce(texte,'')) <> '') as anciennes_fiches_notees;
