import { loadStripe } from '@stripe/stripe-js'
import { shuffleCards, showLoader, scrollToPos } from './utils'
import { validateForm } from './validate'

const pKey = 'pk_test_51S8QxnEad35pCFHl7T75TJYFhaaS1LJCcvFkhpd6thynfJcdbiotB0qf7P2P2tfJo0YqXQYYYtTDF5GPnylglvcC00CDb6lDHp'
const stripe = await loadStripe(pKey);

const userForm = document.getElementById('user-details')
const formSuccessInfo = document.getElementById('post-form-content')
const paymentForm = document.getElementById('payment-form')
const formLoaderInfo = document.getElementById('pre-form-content')

const susChannel = new BroadcastChannel('susChannel')

const minWidth = 800

export async function initializeStripe() {
	let checkout
	let chkOut
	let data = new URLSearchParams([...new FormData(userForm).entries()])

	const handleComplete = () => {
		showLoader(false)
		shuffleCards('left')
		susChannel.postMessage({'event': 'paymentReceived', 'msg' : 'Yee-haw!'})
		setTimeout(() => {
			formSuccessInfo.classList.remove('hide-it')
			chkOut.destroy()
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

    const fields = [
		{ id: 'course', type: 'select', message: 'Please select a course' },
		{ id: 'user-name', type: 'text', message: 'Name is required' },
		{ id: 'user-email', type: 'email', message: 'Please enter a valid email address' },
		{ id: 'terms', type: 'checkbox', message: 'You must agree before continuing' }
    ]

    userForm.addEventListener('submit', (e)=> {
		e.preventDefault()
		
    	if(validateForm(userForm, fields)) {
    		toggleLoaderInfo(userForm, true)
            shuffleCards('right')
            initializeStripe()
			if(window.innerWidth < minWidth) {
				paymentForm.scrollIntoView({ behavior: 'smooth', block: 'end' })
			}

    	}
    })
}

const resize_ob = new ResizeObserver(() => {
    window.dispatchEvent(new Event('resize'))
})

if(paymentForm) {
    resize_ob.observe(paymentForm)
}

const toggleLoaderInfo = (_form, vis) => {
    if(vis == true) {
        _form.classList.add('read-only')
        formLoaderInfo.classList.add('hide-it')
    } else {
        _form.classList.remove('read-only')
        formLoaderInfo.classList.remove('hide-it') 
    }
    window.dispatchEvent(new Event('resize'))
}



