import { shuffleCards, showLoader, scrollToPos } from '../utils/utils'

const formURL = 'http://api.com/'

const setResponse = (el, msg, type) => {
	el.innerHTML = msg
}


document.addEventListener('DOMContentLoaded', () => {

	const paramsString = window.location.search
	const searchParams = new URLSearchParams(paramsString)
	let courseID = searchParams.get('courseId') // Give Beccie some context regarding the question.

    const contactForm = document.getElementById('contact-us')
	const formHolder = document.querySelector('.contact-form-holder')

	if(contactForm) {

		contactForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		showLoader(true)

		    try {
				const formData = new FormData(contactForm)
				const body = Object.fromEntries(formData.entries())
				
				const response = await fetch(formURL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				})

				if (!response.ok) {
					throw new Error(`Server error: ${response.status}`)
				}

		        const result = await response.json()

				if (result.success) {
					setResponse(formHolder, `MESSAGE SENT ${result.userMessage}`, 'success')
					contactForm.reset()
					shuffleCards('right')
				} else {
					setResponse(formHolder, `FAIL: ${result.errorMessage}`, 'error')
				}

				showLoader(false)

			} catch (err) {
				setResponse(formHolder, `FAIL: ${err}`, 'error') 
				showLoader(false)       
			}
		})

	}
})