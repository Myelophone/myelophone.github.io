const CACHE_NAME = 'my-site-cache-v1';
const CACHE_VERSION = 1;
const CACHE_LIFETIME = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
const URLS_TO_CACHE = ['/favicon.png'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(URLS_TO_CACHE);
		})
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.url.match(/\.(?:css|woff2?|eot|ttf|otf)$/)) {
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return cache.match(event.request).then((response) => {
					const fetchPromise = fetch(event.request).then(
						(networkResponse) => {
							if (networkResponse.ok) {
								cache.put(
									event.request,
									networkResponse.clone()
								);
							}
							return networkResponse;
						}
					);
					return response || fetchPromise;
				});
			})
		);
	}
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.keys().then((keys) => {
				keys.forEach((key) => {
					cache.match(key).then((response) => {
						if (!response) return;
						const dateHeader = response.headers.get('date');
						if (dateHeader) {
							const responseDate = new Date(dateHeader);
							if (
								Date.now() - responseDate.getTime() >
								CACHE_LIFETIME
							) {
								cache.delete(key);
							}
						}
					});
				});
			});
		})
	);
});
