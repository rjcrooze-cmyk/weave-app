// The app moved up one level. Remove this old worker so it never serves stale pages.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => { e.waitUntil(self.registration.unregister()); });
