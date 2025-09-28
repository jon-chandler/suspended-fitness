self.addEventListener('push', (event) => {

   if (!event.data) return

    const payload = event.data.json()

    const title = payload.title || 'Suspended Fitness notification'
    const options = {
        body: payload.body || 'NEW COURSES!',
        icon: payload.icon || 'images/pn-icon.png',
        badge: payload.badge || 'images/pn-badge.png',
        data: payload.url || '/offer.html'
    }

    event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    event.waitUntil(
        clients.openWindow(event.notification.data)
    )
})