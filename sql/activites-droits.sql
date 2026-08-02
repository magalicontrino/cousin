-- COUSIN -- Le programme des asbl etait invisible (constate le 03/08/2026).
--
-- Symptome : Mag clique sur « Assos » dans Ce qui arrive, et rien ne s affiche -- alors que
-- les 13 activites de WAKA UP sont bien dans la table (verifie par SELECT).
--
-- Cause : creer une table et lui poser des POLICIES ne suffit pas. Postgres a deux serrures
-- superposees. La policy dit « qui a le droit de voir quelles LIGNES » ; le GRANT dit « qui a
-- le droit de toucher la TABLE ». La table activites avait la premiere serrure et pas la
-- seconde : le serveur repondait « permission denied for table activites » (code 42501) a
-- chaque lecture. Cote app, la lecture est enveloppee dans un catch muet -- l erreur ne
-- remontait donc nulle part, et la page affichait simplement une liste vide.
--
-- Correction : on donne les droits de table au role « authenticated » (l equipe connectee).
-- Les policies restent la barriere reelle : lecture pour tous les connectes, ecriture
-- reservee a peut_gerer_equipe(). Sans policy qui autorise, un GRANT ne donne rien.

grant select                        on public.activites to authenticated;
grant insert, update, delete        on public.activites to authenticated;

-- La colonne id est un bigserial : sans droit sur sa sequence, un INSERT echoue aussi.
grant usage, select on sequence public.activites_id_seq to authenticated;

-- Verification : ce que le role « authenticated » a reellement le droit de faire.
select privilege_type
  from information_schema.role_table_grants
 where table_schema='public' and table_name='activites' and grantee='authenticated'
 order by privilege_type;
