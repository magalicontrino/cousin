-- ═══════════════════════════════════════════════════════════════════════════
-- COUSIN — le compteur d'équipe de la salle de jeux
-- Créé le 30/07/2026, après le choix de Mag : pas de duel, pas de classement,
-- UN SEUL chiffre partagé — « cette semaine, l'équipe a répondu juste N fois ».
--
-- Ce qu'on enregistre : une ligne par personne et par semaine, avec deux nombres.
-- Ce qu'on n'enregistre PAS : quelle question, quelle réponse, quel domaine.
-- Personne ne peut donc savoir qui s'est trompé sur quoi — c'est volontaire.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.jeux_semaine (
  user_id  uuid not null references auth.users(id) on delete cascade,
  lundi    date not null,                    -- le lundi de la semaine concernée
  justes   integer not null default 0,
  total    integer not null default 0,
  maj_le   timestamptz not null default now(),
  primary key (user_id, lundi)
);

alter table public.jeux_semaine enable row level security;

-- Lecture : toute l'équipe active voit les compteurs (c'est le but — un score commun).
drop policy if exists jeux_semaine_lecture on public.jeux_semaine;
create policy jeux_semaine_lecture on public.jeux_semaine
  for select using (is_active_member());

-- Écriture : chacun n'écrit que sa propre ligne.
drop policy if exists jeux_semaine_ecriture on public.jeux_semaine;
create policy jeux_semaine_ecriture on public.jeux_semaine
  for insert with check (auth.uid() = user_id and is_active_member());

drop policy if exists jeux_semaine_maj on public.jeux_semaine;
create policy jeux_semaine_maj on public.jeux_semaine
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Ménage : on ne garde pas d'historique éternel — huit semaines suffisent largement.
-- (À lancer à la main de temps en temps, ou à brancher sur un cron plus tard.)
-- delete from public.jeux_semaine where lundi < current_date - interval '8 weeks';
