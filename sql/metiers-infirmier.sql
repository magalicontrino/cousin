-- ═══════════════════════════════════════════════════════════════════════════
-- UN SEUL MÉTIER POUR LES INFIRMIÈRES — 10/08/2026
--
-- Mag : « infi ou médical mais pas les deux. Mets plutôt infis. »
--
-- La liste des métiers proposait « Médical » ET « Infirmier ». Deux noms pour le
-- même travail : chacun choisissait au hasard, et l'équipe se retrouvait coupée en
-- deux dans l'Admin comme dans les check-lists. « Médical » disparaît de la liste.
--
-- ⚠ ON BASCULE LES PERSONNES, ON NE SE CONTENTE PAS DE RETIRER LE MOT. Retirer
-- « Médical » de la liste sans toucher à la base laisserait les collègues déjà
-- rangées là avec un métier qui n'existe plus : plus de check-list, plus de groupe
-- d'accès correct. On les passe donc en « Infirmier ».
--
-- ⚠ ANDREA FALCONERI N'EST PAS CONCERNÉ : il est passé en « Médecin » juste avant
-- (unique médecin du centre, aucune liste de tâches imposée). La clause l'exclut
-- explicitement, pour qu'un rejeu de ce fichier ne le range pas chez les infirmières.
-- ═══════════════════════════════════════════════════════════════════════════

update public.allowed_emails
   set equipe = 'Infirmier'
 where equipe = 'Médical'
   and email <> 'andrea.falconeri@samusocial.be';

-- Vérification : plus personne en « Médical », et le compte des infirmières.
select equipe, count(*) as combien
  from public.allowed_emails
 group by equipe
 order by combien desc;

-- ── PASSÉ DANS SUPABASE LE 10/08/2026 ────────────────────────────────────────
-- Fait. Plus personne en « Médical ». Répartition après bascule :
--   Travailleur social 10 · Infirmier 8 · Éducateur 4 · Polyvalent 3 ·
--   Aide-soignant 3 · Psychologue 2 · Logistique 2 · … · Médecin 1 (Andrea).
