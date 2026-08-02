-- COUSIN -- Les statistiques d usage restaient vides (constate le 03/08/2026).
--
-- Symptome : la page Gestion affichait « Rien a montrer pour l instant » depuis le 31 juillet,
-- alors que l equipe ouvre l app tous les jours.
--
-- Cause : la meme que pour les activites. noter_ecran() est en « security invoker » -- elle
-- ecrit donc SOUS L IDENTITE de la personne connectee, et cette personne n avait pas le droit
-- d ecrire dans la table. Chaque appel repondait « permission denied for table usage_ecrans »
-- (42501), et l app, qui n attend pas la reponse, continuait sans rien dire. Zero ligne
-- enregistree en trois jours.
--
-- Correction : le droit d INSERT, et rien d autre. Le garde-fou de vie privee est intact :
--   - pas de droit de SELECT sur la table -> personne ne peut lire le journal ligne a ligne,
--     meme l administratrice ; seules stats_ecrans() et stats_jours() en sortent des totaux ;
--   - la policy « usage depot » continue d exiger uid = auth.uid() -> on ne peut deposer
--     que ses propres passages, pas ceux d un collegue.

grant insert on public.usage_ecrans to authenticated;

-- L id est un bigserial : sans droit sur sa sequence, l insert echoue malgre le GRANT.
grant usage on sequence public.usage_ecrans_id_seq to authenticated;

-- Verification : on doit voir INSERT, et surtout PAS SELECT.
select privilege_type
  from information_schema.role_table_grants
 where table_schema='public' and table_name='usage_ecrans' and grantee='authenticated'
 order by privilege_type;
