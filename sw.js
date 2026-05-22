// Service Worker de fondo para el Proyecto ECOS
self.addEventListener('push', function(event) {
    let data = { title: 'Alerta ECOS', body: 'Falla de red detectada.' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = { title: 'Alerta ECOS', body: event.data.text() };
        }
    }

    const opciones = {
        body: data.body,
        icon: 'https://dashboard.ecos-app.com/_next/image?url=%2Fbrand%2Fecos-icon-128.png&w=96&q=75',
        badge: 'https://dashboard.ecos-app.com/_next/image?url=%2Fbrand%2Fecos-icon-128.png&w=96&q=75',
        data: data.data || {},
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, opciones)
    );
});

// Al dar clic sobre la alerta, abre el dashboard móvil
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
