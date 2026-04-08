const CACHE = 'taskflow-v3';
const ASSETS = ['./index.html','./manifest.json','./icon-192.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.url.includes('googleapis.com')||e.request.url.includes('accounts.google.com'))return;
  e.respondWith(fetch(e.request).then(resp=>{
    if(resp.ok&&e.request.method==='GET'){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}
    return resp;
  }).catch(()=>caches.match(e.request)));
});
