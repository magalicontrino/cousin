-- COUSIN — Le tour des chambres, en début de cycle (Mag, 22/08/2026)
--
-- SA DEMANDE, mot pour mot : « Dans la check-list PFO, il faut rajouter, à faire en
-- tout début de 7-7, le tour des chambres : vérifier qu'il n'y ait pas des gens déjà
-- désencodés qui ont encore des affaires en chambre. »
--
-- POURQUOI SUR LES DEUX LISTES, jour ET nuit : « il vaut mieux vérifier deux fois ».
-- Une chambre qu'on croit vide et qui ne l'est pas, c'est une place qu'on n'attribue
-- pas — ou pire, les affaires de quelqu'un qui partent à la poubelle. Le doublon est
-- voulu : deux équipes, deux passages, deux chances de le voir.
--
-- POURQUOI `rythme = 'reprise'` ET PAS 'jour' : cette tâche n'a de sens qu'au moment
-- où l'on reprend son cycle — après quatre ou sept jours d'absence, on ne sait pas ce
-- qui s'est passé dans les chambres. Tous les jours, elle deviendrait du bruit et on
-- cesserait de la voir. C'est exactement ce que fait le bloc « À la reprise de ton
-- cycle » de la check-list, qui passe en rouge et remonte en tête le jour venu.
--
-- ⚠ LE TEXTE EST LE SIEN, MOT POUR MOT (« change le titre, juste mets ça »). Un premier
-- libellé plus long avait été posé puis corrigé le soir même, directement en base.
--
-- ⚠ RELANÇABLE SANS DANGER : le `where not exists` empêche de créer un doublon si on
-- exécute ce fichier deux fois. Rien n'est effacé, rien n'est écrasé.
-- ⚠ CE QUE ÇA NE TOUCHE PAS : `checklist_faites`, où est gardé ce que chacun a coché.

insert into public.checklists (liste, tache, ordre, rythme)
select v.liste, v.tache, v.ordre, v.rythme
from (values
  ('pfo-jour', 'Tour des chambres — personne désencodées', 900, 'reprise'),
  ('pfo-nuit', 'Tour des chambres — personne désencodées', 900, 'reprise')
) as v(liste, tache, ordre, rythme)
where not exists (
  select 1 from public.checklists c
  where c.liste = v.liste and c.tache = v.tache
);

-- Pour vérifier après coup :
-- select liste, tache, rythme, ordre from public.checklists
--  where tache like 'Tour des chambres%' order by liste;
