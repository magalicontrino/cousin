-- ═══════════════════════════════════════════════════════════════════════════
-- LES DROITS QUI MANQUAIENT — 08/08/2026
--
-- LE SYMPTÔME. « Passation illisible — la base a refusé de répondre »,
--   « permission denied for table passations ».
--
-- LA CAUSE, ET ELLE EST À RETENIR. Écrire les règles (les policies : qui lit,
--   qui coche, qui supprime) NE SUFFIT PAS. Les règles disent qui a le droit de
--   faire quoi UNE FOIS DANS LA PIÈCE ; le `grant`, lui, donne la clé de la
--   porte. Sans la clé, la base ne dit pas « c'est vide », elle dit « accès
--   refusé ».
--
-- ⚠ CE N'EST PAS AUTOMATIQUE. Les vieilles tables (chantier, favoris, feed…)
--   avaient reçu la clé toutes seules à leur création. Les tables créées le
--   08/08/2026 ne l'ont pas eue : elles n'avaient que REFERENCES, TRIGGER,
--   TRUNCATE — c'est-à-dire rien de ce qui sert à lire ou écrire. Donc :
--   POUR TOUTE NOUVELLE TABLE, ÉCRIRE LE `grant` À LA MAIN, dans le même
--   fichier que le `create table`.
--
-- CE QUE ÇA N'OUVRE PAS. `grant` ne contourne aucune règle : la sécurité reste
--   entièrement dans les policies déjà écrites (on ne supprime que ses propres
--   lignes, etc.). On rend juste la porte utilisable.
-- ═══════════════════════════════════════════════════════════════════════════

-- La passation de nuit (sql/passations.sql)
grant select, insert, update, delete on public.passations     to authenticated;

-- Les propositions d'activités (sql/propositions.sql)
grant select, insert, update, delete on public.propositions   to authenticated;

-- Le tour des chambres, les bacs (sql/tour-chambres.sql)
grant select, insert, update, delete on public.tour_bacs      to authenticated;

-- La fiche « qui s'est connecté » (upsert au démarrage : select + insert + update)
grant select, insert, update          on public.profiles      to authenticated;

-- ── À VÉRIFIER APRÈS AVOIR LANCÉ CECI ────────────────────────────────────────
-- select * from public.passations;   -- doit répondre « 0 lignes », pas une erreur
--
-- ── PASSÉ DANS SUPABASE LE 08/08/2026 ────────────────────────────────────────
-- « Success. No rows returned ».
