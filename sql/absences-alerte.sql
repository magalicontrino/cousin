-- ═══════════════════════════════════════════════════════════════════════════
-- ABSENCES — l'alerte « disparition inquiétante »   (06/10/2026)
--
-- Mag : « il faut pouvoir mettre une alerte quelque part sur l'absence. Et cette
-- alerte, elle doit vraiment remonter tout en haut. » (la dame de 90 ans qui ne
-- peut pas dormir dehors). Piste B choisie : cadre rouge, tout en haut de la liste.
--
-- EXÉCUTÉ le 06/10/2026 par Claude (éditeur SQL) : colonne créée, lue depuis l app.
-- Une colonne de plus, rien d autre. Les droits (policies + grant) de la table
-- couvrent déjà la nouvelle colonne. Re-jouable.
-- ═══════════════════════════════════════════════════════════════════════════
alter table public.absences add column if not exists alerte boolean not null default false;
select column_name, data_type, column_default from information_schema.columns
 where table_schema='public' and table_name='absences' and column_name='alerte';
