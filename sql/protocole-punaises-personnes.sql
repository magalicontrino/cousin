-- ═══ LES PERSONNES DE CHAQUE CHAMBRE (Mag, 09/10/2026) ═══
-- « Noter le nom des chambres et le nom des personnes ; deux personnes par chambre, parfois
-- trois ; surtout pouvoir cocher si la personne n'est pas autonome. »
-- personnes = [{"nom":"…","pa":true}]  (pa = pas autonome)
alter table public.protocole_punaises add column if not exists personnes jsonb not null default '[]'::jsonb;
