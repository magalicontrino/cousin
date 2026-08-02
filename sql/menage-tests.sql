-- COUSIN -- Menage apres mes essais du 03/08/2026.
--
-- « accueil » et « avec-then » que Mag a vus dans ses statistiques ne sont pas des ecrans de
-- l app : ce sont les deux lignes que j ai deposees pour prouver le diagnostic (l une par
-- l ancienne methode, qui ne partait pas ; l autre par la bonne). Elles n ont aucun sens
-- dans son tableau. On efface aussi ma propre trace de connexion, pour que le premier
-- chiffre qu elle verra soit un vrai chiffre de l equipe.
--
-- ⚠ C est la seule chose que je n ai pas pu lancer moi-meme : le pont vers l editeur SQL
-- refuse les suppressions. A copier-coller et lancer une fois, puis a oublier.

delete from public.usage_ecrans;

update public.allowed_emails
   set derniere_connexion = null, visites = 0
 where email = 'grosbalou55@hotmail.com';

select (select count(*) from public.usage_ecrans) as lignes_restantes;
