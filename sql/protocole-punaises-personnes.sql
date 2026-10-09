-- ═══ LES PERSONNES DE CHAQUE CHAMBRE (Mag, 09/10/2026) ═══
-- « Noter le nom des chambres et le nom des personnes ; deux personnes par chambre, parfois
-- trois ; surtout pouvoir cocher si la personne n'est pas autonome. »
-- personnes = [{"nom":"…","pa":true}]  (pa = pas autonome)
alter table public.protocole_punaises add column if not exists personnes jsonb not null default '[]'::jsonb;

-- ═══ TROIS SORTES DE PROTOCOLE (Mag, 09/10/2026) ═══
-- vapeur = la chambre seule, passée à la vapeur ; produit = produit + sacs, pas les personnes ;
-- tout = produit + sacs + le protocole de la personne.
alter table public.protocole_punaises add column if not exists protocole text not null default 'produit';
alter table public.protocole_punaises add column if not exists vapeur_le timestamptz;
alter table public.protocole_punaises add column if not exists vapeur_par text;
alter table public.protocole_punaises add column if not exists personne_le timestamptz;
alter table public.protocole_punaises add column if not exists personne_par text;

-- Rentokil ou un autre passage (Mag, 09/10/2026 : « séparer les Rentokil des non-Rentokil, en premier »)
alter table public.protocole_punaises add column if not exists rentokil boolean not null default true;

-- L'horaire du produit, par passage (Mag, 09/10/2026 : « Rentokil, il faut l'oublier ; mettre un horaire, de telle heure à telle heure »)
alter table public.protocole_punaises add column if not exists produit_de text not null default '12:00';
alter table public.protocole_punaises add column if not exists produit_a text not null default '17:00';

-- Porte fermée à clé (Mag, 09/10/2026 : personne dans la chambre pour prévenir → on ferme à clé ; celui qui rouvre signe)
alter table public.protocole_punaises add column if not exists porte_le timestamptz;
alter table public.protocole_punaises add column if not exists porte_par text;
