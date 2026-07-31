/* Service worker COUSIN.
   Stratégie « réseau d'abord » : à chaque ouverture, l'app va chercher la dernière
   version en ligne — la mise à jour se fait donc toute seule, sans rien réinstaller.
   Si le téléphone est hors ligne, on ressert la dernière version mise en cache. */

const CACHE = 'cousin-v366';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
                './logo.png', './favicon.svg', './icon-192.png', './icon-512.png', './icon-180.png',
                './font/eastman-regular.woff2', './font/eastman-medium.woff2',
                './font/eastman-demibold.woff2', './font/eastman-extrabold.woff2',
                './font/eastman-bold.woff2', './font/eastman-condensed-black.woff2', './font/eastman-grotesque-heavy.woff2', './font/eastman-compressed-bold.woff2',
                './picto/ico-reseau.svg', './picto/ico-demarches.svg',
                './picto/ico-guillemets.svg', './picto/ico-etoile.svg', './picto/site.svg', './picto/ico-demidisques.svg', './picto/ico-fleur.svg',
                './picto/ico-donut.svg', './picto/astuce.svg',
                './picto/formations.svg', './picto/avis.svg', './picto/urgences.svg',
                './picto/petition.svg', './picto/roue.svg', './picto/cle.svg', './picto/juridique.svg', './picto/addictions.svg', './picto/planning.svg', './picto/accompagnement.svg', './picto/social.svg', './picto/lgbtqi.svg', './qrcode.js', './picto/jeu-roue.svg', './picto/jeu-cartes.svg', './picto/jeu-serie.svg', './picto/jeu-chrono.svg', './picto/jeu-enquete.svg', './picto/jeu-cible.svg', './picto/jeu-jour.svg', './picto/jeu-duel.svg', './picto/de.svg', './picto/palette.svg'];

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
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
