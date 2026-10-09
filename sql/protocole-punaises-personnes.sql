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
