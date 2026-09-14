const CACHE_NAME = 'tareas-v2';

const urlsToCache = [
	'./',
	'./index.html',
	'./manifest.json',
	'./icons/icon-192.png',
	'./icons/icon-512.png',
];

self.addEventListener('install', (event) => {
	console.log('SW: instalando...');
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('SW: cache abierta, guardando archivos');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				console.log('SW: sirviendo desde cache ->', event.request.url);
				return cachedResponse;
			}

			console.log('SW: no está en cache, pidiendo a la red ->', event.request.url);
			return fetch(event.request).then((networkResponse) => {
				const responseClone = networkResponse.clone();

				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseClone);
					console.log('SW: guardado en cache para la próxima ->', event.request.url);
				});

				return networkResponse;
			});
		})
	);
});