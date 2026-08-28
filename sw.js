/* Service worker COUSIN.
   Stratégie « réseau d'abord » : à chaque ouverture, l'app va chercher la dernière
   version en ligne — la mise à jour se fait donc toute seule, sans rien réinstaller.
   Si le téléphone est hors ligne, on ressert la dernière version mise en cache. */

const CACHE = 'cousin-v1064';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
                './logo.png', './favicon.svg', './icon-192.png', './icon-512.png', './icon-180.png',
                './font/eastman-regular.woff2', './font/eastman-medium.woff2',
                './font/eastman-demibold.woff2', './font/eastman-extrabold.woff2',
                './font/eastman-bold.woff2', './font/eastman-condensed-black.woff2', './font/eastman-grotesque-heavy.woff2', './font/eastman-compressed-bold.woff2',
                /* ═══ TOUS LES PICTOS, SANS EXCEPTION (25/08/2026) ═══
                   La liste était tenue À LA MAIN, et elle avait 46 dessins de retard :
                   la fleur des parcs, la punaise, le chevron, le linge, les colis… Or
                   cette liste est ce qui est garanti HORS LIGNE. Un picto absent, c'est
                   un rond pastel vide dans le hall ou dans une chambre.
                   ⚠ ET ÇA S'ÉTAIT DÉJÀ PRODUIT — petition, roue et cle avaient manqué
                   des semaines après leur arrivée. Une liste à la main reprend toujours
                   du retard : on met donc LE DOSSIER ENTIER (100 dessins, 165 Ko).
                   ⚠ À REGÉNÉRER quand des pictos sont ajoutés :
                      ls picto/*.svg | sed "s|.*|'./&', |"
                   ═══════════════════════════════════════════════════════════════════ */
                './picto/Arc.svg', './picto/accompagnement.svg', './picto/accueil.svg',
                './picto/addictions.svg', './picto/adresse.svg', './picto/alarme.svg',
                './picto/applaudir.svg', './picto/assise.svg', './picto/astuce.svg', './picto/avis.svg',
                './picto/bouee.svg', './picto/camera.svg', './picto/centre.svg', './picto/chevron.svg',
                './picto/cible.svg', './picto/cle.svg', './picto/coche.svg', './picto/coeur.svg',
                './picto/colis.svg', './picto/conduite.svg', './picto/confidentialite.svg',
                './picto/copier.svg', './picto/de.svg', './picto/deconnexion.svg', './picto/demarches.svg',
                './picto/demidisques.svg', './picto/donut.svg', './picto/educatif.svg',
                './picto/envoyer.svg', './picto/escalade.svg', './picto/etrangers.svg',
                './picto/favoris.svg', './picto/femme.svg', './picto/fete.svg', './picto/fil.svg',
                './picto/fleur.svg', './picto/fontaine.svg', './picto/formations.svg', './picto/gand.svg', './picto/handicap.svg',
                './picto/hebergement.svg', './picto/homme.svg', './picto/horaires.svg',
                './picto/ico-bulle.svg', './picto/ico-cartes.svg', './picto/ico-demarches.svg',
                './picto/ico-demidisques.svg', './picto/ico-donut.svg', './picto/ico-etoile.svg',
                './picto/ico-fleche-coudee.svg', './picto/ico-fleche-diagonale.svg',
                './picto/ico-fleur.svg', './picto/ico-guillemets.svg', './picto/ico-marquepage.svg',
                './picto/ico-ondes.svg', './picto/ico-photo.svg', './picto/ico-reseau.svg',
                './picto/ico-viseur.svg', './picto/imprimer.svg', './picto/jeu-cartes.svg',
                './picto/jeu-chrono.svg', './picto/jeu-cible.svg', './picto/jeu-duel.svg',
                './picto/jeu-enquete.svg', './picto/jeu-jour.svg', './picto/jeu-roue.svg',
                './picto/jeu-serie.svg', './picto/juridique.svg', './picto/lgbtqi.svg',
                './picto/linge.svg', './picto/listes.svg', './picto/logement.svg', './picto/mails.svg',
                './picto/medical.svg', './picto/modifier.svg', './picto/muscle.svg', './picto/musique.svg',
                './picto/notif-poubelle.svg', './picto/notifications.svg', './picto/palette.svg',
                './picto/partager.svg', './picto/pelote.svg', './picto/petition.svg',
                './picto/planning.svg', './picto/plume.svg', './picto/poterie.svg', './picto/pouce.svg',
                './picto/profil.svg', './picto/question.svg', './picto/recherche.svg',
                './picto/reseau.svg', './picto/roue.svg', './picto/sante-mentale.svg', './picto/site.svg',
                './picto/social.svg', './picto/stats.svg', './picto/toilettes.svg', './picto/telephone.svg', './picto/ticket.svg',
                './picto/urgences-domaine.svg', './picto/urgences.svg', './picto/whatsapp.svg',
                './qrcode.js'];

self.addEventListener('install', e => {
  self.skipWaiting(); // la nouvelle version prend la main immédiatement
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  /* POUR LES PAGES (index, essai, design…), ON EXIGE DU FRAIS (04/08/2026) : le
     navigateur a le droit de resservir une page depuis SON cache pendant 10 minutes
     (réglage de l'hébergeur) — pendant les soirées de retouches, on voyait donc
     l'ancienne version en boucle. `cache:'no-cache'` force la re-vérification auprès
     du serveur (réponse « rien de neuf » = quelques octets, ça reste instantané).
     Les polices et pictos, eux, gardent le cache normal : ils ne changent jamais. */
  const page = e.request.mode === 'navigate' || e.request.destination === 'document';
  e.respondWith(
    fetch(page ? new Request(e.request, {cache:'no-cache'}) : e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
