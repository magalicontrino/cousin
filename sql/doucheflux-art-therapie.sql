-- ═══════════════════════════════════════════════════════════════════════════
-- DoucheFLUX — Ateliers d'art-thérapie « Horizon FXMMES »  (27/08/2026)
--
-- Mag : atelier gratuit d'art-thérapie pour femmes, tous les mercredis
--       dans le cadre d'Horizon FXMMES (le centre de jour réservé aux femmes).
--
-- Animé par Maria : peinture, collage, dessin, modelage — sans savoir dessiner.
-- Pas besoin d'inscription, venir comme on est.
--
-- ═══ DÉPLOYÉ le JJ/MM/AAAA par Claude, depuis la session de Mag ═══
-- ═══════════════════════════════════════════════════════════════════════════

insert into public.activites (asso, titre, jour, gratuit, pour_qui, ajoute_par)
values
  ('DoucheFLUX', 'Art-thérapie — atelier créatif (Horizon FXMMES)', '2026-09-09', true, 'femmes', 'Claude'),
  ('DoucheFLUX', 'Art-thérapie — atelier créatif (Horizon FXMMES)', '2026-09-16', true, 'femmes', 'Claude'),
  ('DoucheFLUX', 'Art-thérapie — atelier créatif (Horizon FXMMES)', '2026-09-23', true, 'femmes', 'Claude'),
  ('DoucheFLUX', 'Art-thérapie — atelier créatif (Horizon FXMMES)', '2026-09-30', true, 'femmes', 'Claude');

-- Vérification
select jour, titre, pour_qui
  from public.activites
 where asso = 'DoucheFLUX'
   and titre like '%Art-thérapie%'
 order by jour;