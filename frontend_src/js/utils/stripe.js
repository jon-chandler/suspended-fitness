import { loadStripe } from '@stripe/stripe-js'
import { shuffleCards, showLoader, scrollToPos } from './utils'

const pKey = 'pk_test_51S8QxnEad35pCFHl7T75TJYFhaaS1LJCcvFkhpd6thynfJcdbiotB0qf7P2P2tfJo0YqXQYYYtTDF5GPnylglvcC00CDb6lDHp'
const stripe = await loadStripe(pKey);

const userForm = document.getElementById('user-details')
const formLoaderInfo = document.getElementById('pre-form-content')
const formSuccessInfo = document.getElementById('post-form-content')
const paymentForm = document.getElementById('payment-form')

const minWidth = 800

const susChannel = new BroadcastChannel('susChannel')

async function initializeStripe(e) {
	let checkout
	let chkOut
	let data = new URLSearchParams([...new FormData(e.target).entries()])

	const handleComplete = () => {
		shuffleCards('left')
		susChannel.postMessage({'event': 'paymentReceived', 'msg' : 'Yee-haw!'})
		setTimeout(() => {
			formSuccessInfo.classList.remove('hide-it')
			chkOut.destroy()
			//toggleLoaderInfo(false)
			window.location = '/confirmation.html'
		}, 2000)
	}

	const fetchClientSecret = async () => {
	const response = await fetch('http://192.168.0.113/session.php', {
		method: "POST",
		body: data
	})

	const { clientSecret } = await response.json()
		return clientSecret
	}

	checkout = await stripe.initEmbeddedCheckout({
		fetchClientSecret, 
		onComplete: handleComplete
	}).then(function (checkout) {
		checkout.mount('#payment-form')
		chkOut = checkout
	})

  	showLoader(false)
  	window.dispatchEvent(new Event('resize'))
}

if(userForm) {
	userForm.addEventListener('submit', (e)=> {
		e.preventDefault()
		showLoader(true)
		shuffleCards('right')
		initializeStripe(e)
		toggleLoaderInfo(true)

		if(window.innerWidth < minWidth) {
			let elBounds = paymentForm.getBoundingClientRect()
			let yScroll = elBounds.top + elBounds.height/2
			scrollToPos(0, yScroll)
		}

	})
}

const toggleLoaderInfo = (vis) => {
	if(vis == true) {
		userForm.classList.add('read-only')
		formLoaderInfo.classList.add('hide-it')
	} else {
		userForm.classList.remove('read-only')
		formLoaderInfo.classList.remove('hide-it') 
	}
	window.dispatchEvent(new Event('resize'))
}

const resize_ob = new ResizeObserver(() => {
	window.dispatchEvent(new Event('resize'))
})

if(paymentForm) {
	resize_ob.observe(paymentForm)
}

