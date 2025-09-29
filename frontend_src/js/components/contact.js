import { shuffleCards, showLoader, scrollToPos } from '../utils/utils'
import { validateForm } from '../utils/validate'

const formURL = 'http://api.com/'

const setResponse = (el, msg, type) => {
	el.innerHTML = msg
}


const paramsString = window.location.search
const searchParams = new URLSearchParams(paramsString)
let courseID = searchParams.get('courseId') // Give Beccie some context regarding the question.

const contactForm = document.getElementById('contact-us')
const formHolder = document.querySelector('.contact-form-holder')

if(contactForm) {

	const fields = [
			{ id: 'user-name', type: 'text' },
			{ id: 'user-email', type: 'email' },
			{ id: 'user-phone', type: 'tel' },
			{ id: 'user-msg', type: 'text'}
	]

	contactForm.addEventListener('submit', (e)=> {
		e.preventDefault()

		if(validateForm(contactForm, fields)) {

			try {
				const formData = new FormData(contactForm)
				const body = Object.fromEntries(formData.entries())

				const response = fetch(formURL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				})
				.then(response => {

			        const result = response.json()

					if (result.success) {
						setResponse(formHolder, `MESSAGE SENT ${result.userMessage}`, 'success')
						contactForm.reset()
						shuffleCards('right')
					} else {
						setResponse(formHolder, `FAIL: ${result.errorMessage}`, 'error')
					}

				})
				.catch((error) => {

					setResponse(formHolder, `FAIL: ${error}`, 'error')

				})

				showLoader(false)

			} catch (err) {
				setResponse(formHolder, `FAIL: ${err}`, 'error') 
				showLoader(false)       
			}

		}

	})

}
	
