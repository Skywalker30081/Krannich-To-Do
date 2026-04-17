// No caching - always fetch from network
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.url.includes('googleapis.com') || e.request.url.includes('accounts.google.com')) return;
  e.respondWith(fetch(e.request.url, {cache: 'no-store'}));
});
