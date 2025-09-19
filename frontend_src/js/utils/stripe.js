import { loadStripe } from '@stripe/stripe-js'
import { shuffleCards, showLoader } from './utils'

const pKey = 'pk_test_51S8QxnEad35pCFHl7T75TJYFhaaS1LJCcvFkhpd6thynfJcdbiotB0qf7P2P2tfJo0YqXQYYYtTDF5GPnylglvcC00CDb6lDHp'
const stripe = await loadStripe(pKey);

const userForm = document.getElementById('user-details')
const formLoaderInfo = document.getElementById('pre-form-content')
const paymentForm = document.getElementById('payment-form')

const susChannel = new BroadcastChannel('susChannel')

async function initializeStripe(e) {
	let checkout
	let data = new URLSearchParams([...new FormData(e.target).entries()])

	const handleComplete = () => {
		toggleLoaderInfo(false)
		shuffleCards('left')
		susChannel.postMessage({'newContentMsg' : 'Payment received'})
		setTimeout(() => {
			checkout.destroy()
		}, 1000)
	}

	const fetchClientSecret = async () => {
	const response = await fetch('http://localhost/session.php', {
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
	})

  	showLoader(false)
}

userForm.addEventListener('submit', (e)=> {
	showLoader(true)
	e.preventDefault()
	shuffleCards('right')
	initializeStripe(e)
	toggleLoaderInfo(true)
})

const toggleLoaderInfo = (vis) => {
	if(vis == true) {
		userForm.classList.add('read-only')
		formLoaderInfo.classList.add('hide-it')
	} else {
		userForm.classList.remove('read-only')
		formLoaderInfo.classList.remove('hide-it') 
	}
}