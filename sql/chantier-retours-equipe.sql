-- ═══════════════════════════════════════════════════════════════════════════
-- LE RETOUR DE L'ÉQUIPE — 09/08/2026
--
-- Mag a fait tester l'app à ses collègues (Elfine surtout) et m'a envoyé leurs
-- remarques. Elles entrent TELLES QUELLES dans le chantier : un document qui
-- traîne dans une conversation se perd, une ligne cochable ne se perd pas.
--
-- ⚠ DEUX BLOCS, ET LA DIFFÉRENCE COMPTE :
--   « Ça attend tes collègues » / « Bugs à corriger » = ce qu'ELLE ou l'équipe a
--   demandé. C'est du travail commandé.
--   « Ça attend une phrase de toi » avec le préfixe « MA SUGGESTION — » = ce que
--   JE propose de moi-même. Elle a demandé que ce soit marqué et séparé : « note
--   bien que ce sont tes suggestions, avec une place dédiée pour toi ». Elle en
--   fait ce qu'elle veut, et elle voit d'un coup d'œil ce qui vient de moi.
--
-- ⚠ RIEN N'EST FAIT DANS L'APP par ce fichier : il ne dépose que des lignes à
-- cocher. Les corrections viendront une par une, avec elle.
-- ═══════════════════════════════════════════════════════════════════════════

insert into public.chantier(bloc, titre, detail, ordre) values

-- ── CE QUI EST CASSÉ ────────────────────────────────────────────────────────
('Bugs à corriger','Chambres — ce que coche une collègue ne s''affiche pas chez moi',
 'Elfine coche « Désencoder » sur la 201, Mag ne le voit pas. C''est LE bug le plus grave de la liste : deux personnes croient chacune que l''autre n''a rien fait. À regarder en premier (temps réel ou rechargement).',800),

('Bugs à corriger','Réseau — Elfine ne voit pas les cartes en couleur sur son iPhone',
 'Les cartes du réseau s''affichent sans leurs couleurs sur son téléphone. À reproduire sur iOS.',801),

('Bugs à corriger','Elfine ne voit pas sa liste du 2e — et l''Admin ne l''y a pas attribuée',
 'Deux choses peut-être liées : son poste (Infirmier) n''a pas d''étage attribué dans l''Admin, donc elle n''a pas la liste du 2e. Vérifier l''attribution ET que la liste tombe bien ensuite.',802),

('Bugs à corriger','Les listes médicales sont mal nommées',
 'Aujourd''hui : « Médical », « Médical — Rez », « Médical — 2e étage », « Médical — Nuit ». Ce sont en réalité : médical jour au rez, médical jour au 2e, médical nuit. Renommer pour que chacun trouve la sienne.',803),

('Bugs à corriger','La flèche de « Suivante » pointe dans le mauvais sens',
 'Dans les jeux, le bouton « Suivante » porte un chevron vers la GAUCHE.',804),

-- ── L'ACCUEIL ET LES PICTOS ─────────────────────────────────────────────────
('Ça attend tes collègues','Accueil — le contour du picto poubelle pas assez gros quand il est actif',
 'Suite du travail de l''anneau fuchsia : quand la collecte est là, le contour doit être plus épais.',810),

('Ça attend tes collègues','Accueil — sur le raccourci Linge, préciser les chambres de l''étage',
 '« Pas assez voyant, les fonts je pense. » Aujourd''hui on lit « 3E ÉTAGE » ; il faut aussi les numéros de chambres, et plus lisible.',811),

('Bugs à corriger','Accueil — sur grand écran, il manque des pictos',
 'Sa capture montre seulement Linge et Chambres ; les poubelles et les produits ne sont pas dessinés. À reproduire sur ordinateur.',812),

('Ça attend une phrase de toi','Accueil — « À faire aujourd''hui » ne montre que ce qui RESTE',
 'Mag : « quand on a coché dans la liste, ils ne tiennent que ce qu''il reste à faire — il faut notifier que c''est juste ce qu''il te reste. » Écrire « ce qu''il te reste » au lieu de « à faire aujourd''hui », ou afficher aussi ce qui est fait.',813),

('Ça attend une phrase de toi','Accueil — la section « toutes les tâches » : la garder, la minimiser ou l''enlever ?',
 'Mag : « c''est un peu nul je pense, cette section. Dis-moi d''abord ce que tu en penses avant de l''enlever, ou alors au moins la minimiser. » — MON AVIS : la minimiser plutôt que l''enlever. Elle fait doublon avec le haut de l''accueil, mais c''est la seule porte vers la liste complète quand on a tout coché.',814),

('Ça attend une phrase de toi','Accueil — remonter « Tour des chambres » avec les autres pictos',
 'Mag : « ça doit absolument être dans l''accueil avec les autres pictos, en priorité, tu le mets en premier, c''est avec les chambres. » ⚠ Elle demande AUSSI un picto à part pour le tour des chambres, à valider avec elle avant de dessiner.',815),

('Ça attend une phrase de toi','Accueil — descendre les favoris après la culture',
 'Mag : « les favoris, tu peux les mettre après culture, c''est moins important. »',816),

-- ── LA CULTURE ET LES ACTIVITÉS ─────────────────────────────────────────────
('Bugs à corriger','Sorties — l''activité du JOUR disparaît trop tôt',
 'Le 9 août, la sortie du 9 n''apparaissait plus. Elle doit rester visible au moins jusqu''à 12 h le jour même.',820),

('Ça attend tes collègues','Sorties — des cartes plus parlantes',
 'Mag : « les cards doivent être plus représentatives de l''événement, plus explicatif, avec du texte qui nous introduit ce qu''il se passe à cet endroit. »',821),

('Ça attend tes collègues','WAKA UP — un rappel d''inscription permanent, en rouge',
 'Mag : « on ne peut pas y aller comme ça. Un rappel d''inscription, c''est très important, coloré en rouge. Tu peux faire un rappel tous les jours. » À poser juste après le jeu, dans la section culture de l''accueil ET en haut de la section activités.',822),

('Ça attend tes collègues','Revoir toute la section Culture de l''accueil',
 'Mag : « en gros il faut revoir la section culture dans accueil pour que ce soit beaucoup plus attractif, fluide et compréhensif. »',823),

-- ── LE TRAVAIL D'ÉQUIPE ─────────────────────────────────────────────────────
('Ça attend tes collègues','Depuis l''app, pouvoir ajouter une tâche à TOUTES les équipes',
 'Mag : « je dois pouvoir rajouter des tâches de l''app à toutes les équipes. Par exemple là je veux rajouter : vérifier que la cuisine n''est pas en sous-effectif. » Aujourd''hui les modèles de check-lists ne se règlent pas depuis l''app.',830),

('Ça attend tes collègues','Le tour des chambres — l''impression est trop longue',
 'Mag : « s''il y a une quinzaine de chambres à faire, ça fait trop long à imprimer, trouve une solution pour que ce soit vraiment plus concis. Le but, c''est de faire une passation. » Une ligne par chambre plutôt qu''un bloc.',831),

('Ça attend tes collègues','Le tour des chambres — le champ « bacs en trop » : 3 au maximum',
 'Mag : « ici on note 3 bacs en champ maximum. Sauf exception. » Aujourd''hui le compteur monte sans limite.',832),

('Ça attend tes collègues','Les passations — pouvoir imprimer sa liste',
 'Mag : « il faudrait pouvoir imprimer sa liste pour la remettre en main propre au récalcitrant de la technologie. » Elle a dit qu''on en reparle.',833),

('Ça attend tes collègues','Ma liste — raccourcir les libellés',
 'Mag : « en gros faut que ce soit plus concis. » Exemples donnés : « PM/TTT manquants », « Réquisitoires du week-end pour la semaine », « Entretien mi-parcours ».',834),

-- ── LE CONTENU ──────────────────────────────────────────────────────────────
('Ça attend tes collègues','Protocole — diviser entre médical et travail social',
 'Mag : « il faut diviser entre med et travail social. »',840),

('Ça attend tes collègues','Formations — TOUT faire vérifier par les travailleurs',
 'Mag : « fais-moi penser à tout faire vérifier par les travailleurs. » ⚠ C''est la ligne la plus importante du lot : une formation fausse circule et fait mal.',841),

('Ça attend tes collègues','Formations — sourcer davantage',
 'Mag : « dans les formations il faut plus sourcer. » Chaque affirmation avec sa source et sa date.',842),

('Ça attend tes collègues','Housing First — corriger et sourcer',
 'Mag : « housing first est plutôt un projet bruxellois dans notre cas. » Source à utiliser : mi-is.be/fr/themes/lutter-contre-le-sans-abrisme-et-labsence-de-chez-soi/housing-first-belgium',843),

('Ça attend tes collègues','Ajouter la fiche « Foyer Selah » (Armée du Salut)',
 'armeedusalut.be/foyer-selah/ — unité 72.',844),

('Ça attend une phrase de toi','Formation à écrire : Marx / Adam Smith, et se sourcer sur la Toupie',
 'Mag : « source-toi sur la toupie pour des définitions politiques (toupie.org). Et fais une formation sur la différence entre Marx et Adam Smith. »',845),

('Ça attend tes collègues','Dictionnaire de la recherche (RECH_MOTS) — à remplir avec l''équipe',
 'La loupe marche mais ne connaît pas encore les mots de l''équipe : « mutuelle » → maisons médicales, « papiers » → démarches, « manger » → colis alimentaires… 20 minutes en réunion suffisent. Je peux préparer la liste des mots à leur soumettre.',846),

-- ── L'ONBOARDING ET LE PARTAGE ──────────────────────────────────────────────
('Ça attend tes collègues','Onboarding — il doit arriver ENTRE la connexion et l''interface',
 'Mag : « le onboarding doit arriver entre la connexion et l''interface, et non dans l''interface. » Aujourd''hui il s''ouvre par-dessus l''app une fois connecté.',850),

('Ça attend tes collègues','Onboarding — retirer l''écran d''explication du raccourci',
 'Mag : « retirer la page avec l''explication pour mettre en favori. » ⚠ C''est l''écran 6 (« Garde-moi sous la main ») refait ce matin en trois dessins — à confirmer avant de le supprimer.',851),

('Ça attend tes collègues','Partager — un bouton façon WhatsApp, et le QR imprimable en A4',
 'Mag : « il faudrait partager directement au WhatsApp. Je voudrais pouvoir imprimer le QR code en gros sur une feuille A4. » Elle a envoyé la capture du menu WhatsApp comme modèle : « je trouve ça bien comme bouton, inspire-toi et montre-moi AVANT de changer. »',852),

-- ── MES SUGGESTIONS À MOI (elle a demandé une place dédiée) ─────────────────
('Ça attend une phrase de toi','MA SUGGESTION — sauvegarder le catalogue, tous les mois',
 'Les 252 fiches n''existent qu''en ligne (Supabase + GitHub). Un fichier téléchargeable, gardé sur ton ordinateur, coûte une minute et évite de tout réécrire. ⚠ RYTHME QUE JE PROPOSE : une fois par mois, et AVANT chaque grosse modification du catalogue. Plus souvent serait du zèle, moins souvent laisserait perdre un mois de travail. Je te le redéposerai ici chaque mois.',860),

('Ça attend une phrase de toi','MA SUGGESTION — finir les fiches sans numéro (~30 restantes)',
 'La campagne des 53 fiches sans téléphone : 8 faites. Une fiche sans numéro fait perdre dix minutes à un collègue pressé. Règle qu''on s''est donnée : jamais un numéro incertain.',861),

('Ça attend une phrase de toi','MA SUGGESTION — le règlement dans les mêmes langues que les schémas',
 'La feuille du règlement existe en français. La machinerie des schémas (français, anglais, roumain, polonais, arabe) existe déjà : on la remet à quelqu''un qui n''est pas obligé de lire le français. Tu me l''as demandé — c''est ici pour ne pas l''oublier.',862),

('Ça attend une phrase de toi','MA SUGGESTION — vérifier le plan du quartier sur le terrain',
 'Les directions et les temps de marche sont ESTIMÉS, jamais vérifiés. Maintenant que le plan sera imprimé et remis à l''arrivée avec le règlement, l''erreur se retrouve dans la main de quelqu''un.',863),

('Ça attend une phrase de toi','MA SUGGESTION — retirer la fiche des formations Ulysse après le 24/11/2026',
 'Fiche datée. Je te le rappellerai en temps voulu.',864),

('Ça attend une phrase de toi','MA SUGGESTION — chaque mois, je dépose une suggestion ici',
 '⚠ C''EST MA PLACE DÉDIÉE, à ta demande (« tous les mois tu peux faire une suggestion et donner ton avis dans le chantier, mais avec une place dédiée pour toi »). Toutes mes propositions portent le préfixe « MA SUGGESTION — » : tu vois d''un coup d''œil ce qui vient de moi et ce qui vient de l''équipe. Tu coches, tu ignores, tu supprimes — c''est ton chantier.',865);

-- ── PASSÉ DANS SUPABASE LE 09/08/2026 ────────────────────────────────────────
-- À compléter après exécution.
