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

    const fields = [
        { id: 'course', type: 'select' },
        { id: 'user-name', type: 'text' },
        { id: 'user-email', type: 'email' },
        { id: 'terms', type: 'checkbox' }
    ]

	userForm.addEventListener('submit', (e)=> {
		e.preventDefault()

		let isValid = true
        let firstInvalidField = null
        let delay = 0

        fields.forEach(({ id, type }) => {
            const input = document.getElementById(id)
            const label = userForm.querySelector(`label[for='${id}']`)
            let fieldValid = true

            switch (type) {
                case 'select':
                    fieldValid = input.value.trim() !== '-' && input.value.trim() !== ''
                break;
                case 'text':
                    fieldValid = input.value.trim().length > 0
                break;
                case 'email':
                    fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
                break;
                case 'checkbox':
                    fieldValid = input.checked
                break;
            }

            if (!fieldValid) {
                isValid = false
                if (!firstInvalidField) firstInvalidField = input

                setTimeout(() => {
                    input.classList.add('error')
                    if (label) label.classList.add('error-label')
                    input.offsetWidth
                }, delay)

                delay += 100

                if ('vibrate' in navigator) {
                	navigator.vibrate([500, 200, 700])
                }

            } else {
                
                input.classList.remove('error')
                if (label) label.classList.remove('error-label')

            }
        })

        if (!isValid) {
            e.preventDefault()

            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
                firstInvalidField.focus({ preventScroll: true })
            }

        } else {

        	showLoader(true)
			shuffleCards('right')
			initializeStripe(e)
			toggleLoaderInfo(true)

			if(window.innerWidth < minWidth) {
				paymentForm.scrollIntoView({ behavior: 'smooth', block: 'end' })
			}

        }

	})

	fields.forEach(({ id, type }) => {
        const input = document.getElementById(id)
        const label = userForm.querySelector(`label[for='${id}']`)

        const handler = () => {
            let fieldValid = true
            switch (type) {
                case 'select':
                    fieldValid = input.value.trim() !== '-' && input.value.trim() !== ''
                break
                case 'text':
                    fieldValid = input.value.trim().length > 0
                break
                case 'email':
                    fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
                break
                case 'checkbox':
                    fieldValid = input.checked
                break
            }
        
            if (fieldValid) {
                input.classList.remove('error')
                    if (label) label.classList.remove('error-label')
                }
            }

        input.addEventListener('input', handler)
        input.addEventListener('change', handler)
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

