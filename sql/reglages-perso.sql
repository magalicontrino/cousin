-- ═══════════════════════════════════════════════════════════════════════════
-- COUSIN — ce que chacun a lu et où il en est, en base.
-- Créé le 30/07/2026, après la règle posée par Mag : « tout ce qui se perd et
-- qui est intéressant de garder, tu le mets en base de données ».
--
-- Restaient deux choses qui ne vivaient que dans le téléphone :
--   · `formations` — les chapitres de formation déjà lus (cases cochées) ;
--   · `jeux`       — ses records, son avancement par domaine, sa partie du jour.
-- Nouveau téléphone = tout était à refaire. Plus maintenant.
--
-- ⚠️ LA RÈGLE DE CONFIDENTIALITÉ EST PLUS STRICTE QUE PARTOUT AILLEURS.
-- Chacun ne lit QUE sa propre ligne — l'administratrice comprise. C'est la
-- suite de la décision prise pour `jeux_semaine` : l'équipe partage un chiffre,
-- personne ne peut savoir qui s'est trompé sur quoi. Ici on garde le détail
-- pour que la personne le retrouve, et on ferme la porte à tout le monde
-- d'autre. Aucune donnée d'hébergé, comme toujours.
--
-- Une table à deux colonnes (clé → valeur) plutôt qu'une table par sujet :
-- la prochaine chose à ne plus perdre s'y range sans nouveau SQL.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.reglages_perso (
  user_id uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  cle     text        not null,            -- 'formations' | 'jeux'
  valeur  jsonb       not null,
  maj_le  timestamptz not null default now(),
  primary key (user_id, cle)
);

alter table public.reglages_perso enable row level security;

-- La seule règle, ici comme pour les favoris : « c'est à moi ».
drop policy if exists reglages_perso_lecture on public.reglages_perso;
create policy reglages_perso_lecture on public.reglages_perso
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists reglages_perso_ecriture on public.reglages_perso;
create policy reglages_perso_ecriture on public.reglages_perso
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists reglages_perso_maj on public.reglages_perso;
create policy reglages_perso_maj on public.reglages_perso
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists reglages_perso_retrait on public.reglages_perso;
create policy reglages_perso_retrait on public.reglages_perso
  for delete to authenticated using (auth.uid() = user_id);

grant select, insert, update, delete on public.reglages_perso to authenticated;

select count(*) as lignes from public.reglages_perso;
