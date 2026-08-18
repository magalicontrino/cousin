-- COUSIN — PLUSIEURS ETIQUETTES PAR LIEU (Mag, 18/08/2026)
--
-- Sa remarque : « le probleme c'est qu'on pourrait par exemple faire une sieste
-- ces deux jours et manger en meme temps ». Elle a raison, et c'est un vrai defaut :
-- la table ne gardait QU'UNE etiquette par avis, donc un accueil de jour ou l'on
-- mange devait choisir entre « jour » et « manger ». Il choisissait, et l'autre
-- information disparaissait.
--
-- Elle a aussi separe les deux natures : « il y a deux choses, il y a le conseil
-- et il y a donner l'information ». Les etiquettes sont l'INFORMATION (ca se
-- constate) ; le conseil vit dans sa table a lui (conseils.sql), il s'assume et
-- passe par la coordination.
--
-- (Pas d'accents dans ce fichier : l'editeur SQL les avait deja abimes une fois.)
--
-- ⚠ CE FICHIER NE DETRUIT RIEN. L'ancienne colonne `etiquette` reste en place et
-- reste remplie. On AJOUTE `etiquettes` (une liste) a cote, et on y recopie ce qui
-- existe deja. Si quelque chose se passe mal cote app, l'ancienne colonne repond
-- encore et personne ne perd ce qu'il avait note.

alter table public.avis
  add column if not exists etiquettes text[] not null default '{}';

-- On recopie l'existant : une etiquette seule devient une liste d'une seule.
-- `where etiquettes = '{}'` : relancer ce fichier deux fois ne duplique rien.
update public.avis
   set etiquettes = array[etiquette]
 where etiquette is not null
   and etiquettes = '{}';

-- ⚠ LA MEME LISTE DE MOTS QUE LA CONTRAINTE D'ORIGINE, et pour la meme raison :
-- une etiquette inventee cote app ne doit pas pouvoir entrer ici. `<@` veut dire
-- « tout ce qu'il y a dedans fait partie de cette liste ».
-- Une liste VIDE reste permise : « on ne sait pas » est une reponse valable
-- (sa regle des trois etats, posee pour le PMR le 13/08) — on ne deduit jamais
-- d'un blanc.
alter table public.avis drop constraint if exists avis_etiquettes_connues;
alter table public.avis add constraint avis_etiquettes_connues check (
  etiquettes <@ array['jour','nuit','manger','sieste','sejour','urgence','orientation']::text[]
);

-- Deux fois la meme etiquette dans la liste n'aurait aucun sens : ce serait dire
-- deux fois la meme chose et fausser tout comptage.
alter table public.avis drop constraint if exists avis_etiquettes_sans_doublon;
alter table public.avis add constraint avis_etiquettes_sans_doublon check (
  array_length(etiquettes,1) is null
  or array_length(etiquettes,1) = (select count(distinct e) from unnest(etiquettes) e)
);

-- Pour retrouver vite « tous les lieux ou l'on peut manger ».
create index if not exists avis_etiquettes_idx on public.avis using gin (etiquettes);

-- ⚠ Rien a changer cote policies : ce sont les memes lignes, la meme table, les
-- memes droits. Et rien a ajouter cote `grant` non plus — le droit porte sur la
-- table, pas sur chaque colonne (voir la memoire « le grant des nouvelles tables »).

-- Verification : doit repondre sans erreur.
-- La 2e ligne montre ce qui a ete recopie depuis l'ancienne colonne.
select count(*) as avis_en_tout,
       count(*) filter (where array_length(etiquettes,1) is not null) as avec_etiquette,
       count(*) filter (where array_length(etiquettes,1) > 1)        as avec_plusieurs
  from public.avis;
