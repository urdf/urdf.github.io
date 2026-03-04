// Service worker: cache-first for /robots/** assets.
// catalog.json is always fetched fresh; if it changes the asset cache is busted.

const CACHE_META   = 'urdf-robots-meta-v1';
const CACHE_ASSETS = 'urdf-robots-assets-v1';

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (!url.pathname.startsWith('/robots/')) return;

    if (url.pathname === '/robots/catalog.json') {
        event.respondWith(networkFirstCatalog(event.request));
    } else {
        event.respondWith(cacheFirst(event.request));
    }
});

// catalog.json: always try network, bust asset cache if content changed.
async function networkFirstCatalog(request) {
    const metaCache = await caches.open(CACHE_META);
    try {
        const response  = await fetch(request);
        if (!response.ok) throw new Error(response.status);

        const text       = await response.text();
        const cached     = await metaCache.match(request);
        if (cached) {
            const cachedText = await cached.text();
            if (cachedText !== text) await caches.delete(CACHE_ASSETS);
        }

        const headers = new Headers(response.headers);
        headers.set('content-type', 'application/json');
        const fresh = new Response(text, { status: 200, headers });
        await metaCache.put(request, fresh.clone());
        return fresh;
    } catch {
        const fallback = await metaCache.match(request);
        return fallback ?? Response.error();
    }
}

// All other /robots/** assets: serve from cache, populate on miss.
async function cacheFirst(request) {
    const cache  = await caches.open(CACHE_ASSETS);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
}
