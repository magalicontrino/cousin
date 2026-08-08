-- ═══════════════════════════════════════════════════════════════════════════
-- LES POINTS DU RÈGLEMENT À VÉRIFIER — 08/08/2026
--
-- Mag a dicté d'un trait ce qu'on explique à quelqu'un qui arrive (repas, rentrée,
-- consommations, découcher, étages, vol). C'est devenu la page #/reglement.
--
-- ⚠ SIX POINTS N'ÉTAIENT PAS CLAIRS, et on ne les a PAS devinés : un règlement à
-- moitié inventé annoncerait à quelqu'un une règle qui décide de son hébergement.
-- Ils sont marqués « À vérifier » sur la page ET posés ici, dans le chantier —
-- sur la page pour que personne ne les annonce, ici pour qu'on pense à demander.
--
-- Bloc « Ça attend tes collègues » : ces réponses-là ne sont pas dans COUSIN, elles
-- sont dans la tête de la coordination.
-- ═══════════════════════════════════════════════════════════════════════════

insert into public.chantier(bloc, titre, detail, ordre) values
  ('Ça attend tes collègues',
   'Règlement — le petit déjeuner, 7 h → 8 h 30 ?',
   'Tu as demandé toi-même de le vérifier en le dictant.', 610),

  ('Ça attend tes collègues',
   'Règlement — la rentrée du soir : 21 h 30 ou 9 h 30 ?',
   'Tu as dicté « 9:30 ». Pour un retour le soir ça se lit 21 h 30, mais les autres horaires étaient en clair (18:00 → 19:30). Douze heures d''écart : on ne devine pas.', 620),

  ('Ça attend tes collègues',
   'Règlement — le découcher : 10 jours par mois ET 3 nuits d''affilée ?',
   'Dicté : « 10 jours et 3 jours d''affilée, et 10 jours au total, mais pas au bout de trois nuits ». Trois chiffres pour deux règles — et à partir de quand le désencodage ?', 630),

  -- ⚠ TRANCHÉ PAR MAG LE 09/08/2026, quelques heures après la dictée : « c'est 6e
  -- étage et troisième étage, je me suis trompée ». Le « 5e » était un lapsus.
  -- La ligne a été renommée et cochée dans la base (update du 09/08), la page dit
  -- maintenant « Le 3e et le 6e » sans À vérifier.
  ('Ça attend tes collègues',
   'Règlement — l''étage des femmes : le 3e, le 5e, ou les deux ?',
   'Dicté : « au troisième étage, au cinquième étage, c''est l''étage des femmes ».', 640),

  ('Ça attend tes collègues',
   'Règlement — le vol : sortie définitive ou exclusion de trois mois ?',
   'Les deux ont été dits dans la même phrase. Ils ne peuvent pas être vrais tous les deux, et c''est la sanction la plus lourde de la page.', 650),

  ('Ça attend une phrase de toi',
   'Règlement — ce qui manque encore',
   'Visites, argent et objets de valeur, animaux, ménage de la chambre, à qui on parle quand ça va mal. Tu as dit « pour le reste, tu peux me le rappeler après ».', 660),

  ('Ça attend tes collègues',
   'Règlement — le faire relire par la coordination avant de s''en servir',
   'La page dit en haut que c''est une ébauche. Tant que cette ligne n''est pas cochée, on ne la lit pas devant quelqu''un.', 670);

-- ── PASSÉ DANS SUPABASE LE 08/08/2026 ────────────────────────────────────────
-- « Success. No rows returned ».

-- ═══ LE LENDEMAIN (09/08/2026), MAG A RÉPONDU À PRESQUE TOUT ═══
-- Passé dans Supabase le 09/08 (updates + inserts, vérifié : 10 lignes, 3 cochées) :
--   · id 59 rentrée   → COCHÉE : 21 h 30 ; présences en chambre vers 22 h ;
--                       pas là = absent ; trois absences = désencodé.
--   · id 61 étages    → COCHÉE : le 3e et le 6e (le « 5e » était un lapsus).
--   · id 62 vol       → COCHÉE : trois mois en général, cas par cas — mais la page
--                       et la feuille disent juste « c'est une sanction ».
--   · id 63 il manque → réduit à : l'argent et les objets de valeur. Le reste est
--                       réglé : visites NON (centre anonyme), photos/réseaux NON,
--                       animaux NON, ménage = chacun sa chambre, parler = service
--                       social, équipes soir et nuit.
--   · id 58 petit déj → reste OUVERTE : « je pense, mais je ne suis pas sûre ».
--
-- Et trois lignes NOUVELLES, nées de la feuille imprimable qu'elle a demandée
-- (« on la remettra aux hébergés, l'important en rouge, une page si possible ») :
--   · 680 relire la feuille — avec MES ajouts déclarés : pied Urgences 112 ·
--         Police 101, phrase « la date des produits est annoncée dans le centre »,
--         tableau des jours du linge recopié de l'app.
--   · 690 les horaires des infirmeries (en haut, en bas) — je ne les ai pas ; la
--         feuille a deux cases rouges « à compléter » en attendant.
--   · 700 les pictos de la feuille — « on verra les pictos ensemble après » :
--         rien n'est dessiné sans elle.
