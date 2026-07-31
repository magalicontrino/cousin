-- COUSIN -- "Referent-e" devient une ETIQUETTE, plus un metier (demande de Mag, 31/07/2026).
-- "Referent-e infis & aide-soignant-es" etait un role a part entiere dans la liste des
-- metiers. Or une infirmiere referente reste une infirmiere : elle fait le meme travail,
-- elle a les memes listes, les memes acces. Le referat est une casquette en plus.
--
-- On ajoute donc une colonne, et on bascule les personnes concernees vers "Infi".
-- (Pas d'accents dans ce fichier : l'editeur SQL les avait deja abimes une fois.)

alter table public.allowed_emails
  add column if not exists referent boolean not null default false;

-- Bascule : le motif evite les accents, qui peuvent se perdre au copier-coller.
update public.allowed_emails
   set referent = true,
       equipe   = 'Infi'
 where equipe ilike 'R%f%rent%';

-- Verification (doit renvoyer les personnes basculees) :
select email, equipe, referent from public.allowed_emails where referent = true;
