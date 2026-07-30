-- ---------------------------------------------------------------------------
-- LE CHANTIER DE MAG — sa check-liste de travail sur COUSIN.
-- Privée : elle seule (admin) peut la lire et l'écrire. Aucune donnée d'hébergé.
-- Rejouable sans risque : les cases déjà cochées ne sont jamais réécrites.
-- ---------------------------------------------------------------------------

create table if not exists public.chantier(
  id      bigserial primary key,
  bloc    text        not null default 'À construire',  -- le groupe affiché sur la page
  titre   text        not null,                          -- la ligne à cocher
  detail  text,                                          -- une phrase d'explication
  ordre   int         not null default 0,
  fait    boolean     not null default false,
  fait_le timestamptz,
  cree_le timestamptz not null default now()
);

alter table public.chantier enable row level security;

-- Réservée à Magali (is_admin() existe déjà, SECURITY DEFINER).
drop policy if exists "chantier de l'admin" on public.chantier;
create policy "chantier de l'admin" on public.chantier
  for all using (public.is_admin()) with check (public.is_admin());

-- Temps réel : il faut la ligne entière pour que la suppression parle aussi.
alter table public.chantier replica identity full;
do $$
begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and tablename='chantier') then
    execute 'alter publication supabase_realtime add table public.chantier';
  end if;
end $$;

-- Semis : UNIQUEMENT si la table est vide (pour ne jamais écraser son travail).
insert into public.chantier(bloc, titre, detail, ordre)
select * from (values
  ('Ça attend une phrase de toi', 'Hébergement : deux pavés ou un seul avec tri ?', 'Le filtre urgence s''appellerait « Lit de nuit »', 10),
  ('Ça attend une phrase de toi', 'Fusionner Enfants & familles et Culture & activités en « S''occuper » ?', 'Je le recommande', 20),
  ('Ça attend une phrase de toi', 'Boutons du bas : lesquels, dans quel ordre ?', 'Les propositions sont dans propositions-dock.html', 30),
  ('Ça attend une phrase de toi', 'Méthodes de travail : rouvrir, supprimer, ou laisser dormir ?', 'Le bouton est masqué depuis des jours, le contenu est gardé', 40),
  ('Ça attend une phrase de toi', 'Chambres : attendre l''étape d''avant avant de prévenir la suivante ?', '', 50),

  ('Ça attend tes collègues', 'Faire remplir le questionnaire par l''équipe', '10 pages, déjà en ligne', 60),
  ('Ça attend tes collègues', 'Faire relire les 3 mails types', 'Le réquisitoire est déjà validé', 70),
  ('Ça attend tes collègues', 'Faire corriger les 4 notes de soins fictives', '', 80),
  ('Ça attend tes collègues', 'Fiche « Carte d''identité perdue ou volée » : les 5 questions ouvertes', 'Le centre peut-il être adresse de référence ? Qui paie les 30,10 € ?', 90),

  ('À construire', 'Remplir Culture & activités', 'Musées gratuits, Article 27, ASBL — commencé avec « Ce qui arrive »', 100),
  ('À construire', 'Guide de questions : « carte → droits »', 'Arbre d''orientation, pas de conseil juridique', 110),
  ('À construire', 'Conduites à tenir : écrire « Lecture »', 'Sanction est prêt', 120),
  ('À construire', 'Générateur de notes en entonnoir', 'Zone du corps → côté → type → soin', 130),
  ('À construire', 'Page Admin : gérer l''équipe, les accès, les demandes', 'La base est prête, il manque l''écran', 140),
  ('À construire', 'CPAS des communes prioritaires + maisons d''accueil néerlandophones', '', 150),
  ('À construire', 'Nettoyage du code et relecture de toutes les questions', 'Tu l''as demandé pour la fin', 160),

  ('Gardé pour plus tard', 'Fiche « Téléphone perdu ou volé »', 'Questions ouvertes : Android et iPhone, téléphones de service ou personnels', 170),
  ('Gardé pour plus tard', 'Les 5 formes de pictos que tu as dessinées sans affectation', 'Il faut décider à quoi elles servent', 180),
  ('Gardé pour plus tard', 'Agenda des activités du centre', 'Écarté : trop de pression sur les éducs', 190),
  ('Gardé pour plus tard', 'Espace métier pour les éducateurs', 'Écarté : demander d''abord leur avis aux éducs', 200),
  ('Gardé pour plus tard', 'Mise en page ordinateur', 'Essai raté : les pavés ne s''élargissent jamais', 210)
) as v(bloc, titre, detail, ordre)
where not exists (select 1 from public.chantier);

select count(*) as lignes, count(*) filter (where fait) as deja_faites from public.chantier;
