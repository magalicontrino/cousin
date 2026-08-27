-- ═══════════════════════════════════════════════════════════════════════════
-- LE CARNET DES PROPOSITIONS S'OUVRE AU DEHORS (Mag, 28/08/2026)
--
--   « Rajoute un bouton proposition d'activité, avec les idées et les
--    propositions dans et hors centre. »
--
-- Le carnet ne savait noter que ce qui se passe SUR PLACE — il s'appelait
-- d'ailleurs « Ici, au centre ». Or la moitié de ce qu'on propose à quelqu'un se
-- passe ailleurs : une sortie, un musée, un club, un atelier dans une asbl.
-- C'est la même envie, notée par les mêmes gens, au même moment : ça n'avait
-- aucune raison de devenir un deuxième carnet.
--
-- `lieu` — OÙ ÇA SE PASSERAIT :
--   'centre' → au centre, dans nos murs
--   'dehors' → à l'extérieur
--
-- ⚠ `default 'centre'` N'EST PAS UN DÉTAIL : les propositions déjà notées n'ont
-- pas de lieu, et elles parlent TOUTES du centre — c'était le seul carnet qui
-- existait. Sans ce défaut, elles se retrouveraient sans étiquette, et il faudrait
-- les reclasser à la main une par une.
--
-- ⚠ RIEN D'AUTRE NE CHANGE : mêmes policies, mêmes droits. Tout le monde écrit,
-- tout le monde met « +1 », supprimer reste à l'auteur. Une colonne de plus sur
-- une table existante n'a pas besoin de `grant` — le droit porte sur la TABLE.
-- (Voir la leçon des tables neuves : là, sans `grant`, c'est « permission denied ».)
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.propositions
  add column if not exists lieu text not null default 'centre';

-- On borne les deux valeurs possibles : une faute de frappe dans le code ferait
-- disparaître la ligne des DEUX paquets à l'écran, sans rien signaler.
alter table public.propositions
  drop constraint if exists propositions_lieu_check;
alter table public.propositions
  add constraint propositions_lieu_check check (lieu in ('centre','dehors'));

create index if not exists propositions_lieu_idx on public.propositions (lieu, etat);

-- ── PASSÉ DANS SUPABASE LE 28/08/2026 ────────────────────────────────────────
-- « Success. No rows returned », puis vérifié :
--   select lieu, count(*) from public.propositions group by lieu;
--   → centre : 1  ·  dehors : 0
-- La seule proposition déjà notée est donc restée au centre, comme prévu.
