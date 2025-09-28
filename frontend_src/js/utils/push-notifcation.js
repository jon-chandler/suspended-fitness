const VAPID = {
	"subject": "mailto: <connect@jonc.work>",
	"publicKey": "BDN3S4upXA2aqjMH-hA-8xAtML0DDNG0zPqteCDwO2XTXEjciA72NoUhHVswpBcrH8bPeKaBFumiiw8jNMcQZ3U",
	"privateKey": "dMptQeanlcYxoDATvWQqix-v7m67MQ5Zn_xQY6molbU"
}

export function createNotificationService() {

	async function initPushNotifications() {
		if (!('serviceWorker' in navigator)) {
			console.warn('Service workers are not supported by this browser.')
			return
		}
		if (!('PushManager' in window)) {
			console.warn('Push notifications are not supported by this browser.')
			return
		}

	try {
		const registration = await navigator.serviceWorker.register('/service-worker.js')
		console.log('Service Worker registered:', registration)

		const permission = await Notification.requestPermission()
		if (permission !== 'granted') {
			console.warn('Permission for notifications was denied.')
			return
		}

		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array('BDN3S4upXA2aqjMH-hA-8xAtML0DDNG0zPqteCDwO2XTXEjciA72NoUhHVswpBcrH8bPeKaBFumiiw8jNMcQZ3U')
		})

		console.log('Push subscription:', subscription)

		await fetch("http://localhost:8000/save-subscription", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(subscription)
		})

		const payload = JSON.stringify({
			title: "New course dates",
			body: "Some new courses! YAY",
			icon: "/icons/pn-course.png",
			badge: "/icons/pn-badge.png",
			url: "http://suspendedfitness.com/offer.html?cID=123",
		})

		await fetch("http://localhost:8000/send-push", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: payload
		})

		self.addEventListener('push', (event) => {
			alert()
			console.log('------------- ', event)
			const data = event.data.json()

			console.log(data)
		})

	} catch (err) {
			console.error('Error setting up push notifications:', err)
		}
	}

	function urlBase64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
		const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
		const rawData = atob(base64)
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
	}


	initPushNotifications()
}