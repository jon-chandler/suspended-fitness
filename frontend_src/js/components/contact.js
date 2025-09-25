import { shuffleCards, showLoader, scrollToPos } from '../utils/utils'

const contactForm = document.getElementById('contact-us')
const formHolder = document.querySelector('.contact-form-holder')

const paramsString = window.location.search
const searchParams = new URLSearchParams(paramsString)
let courseID = searchParams.get('courseId') // Give Beccie some context regarding the question.



if(contactForm) {
	contactForm.addEventListener('submit', (e)=> {
		e.preventDefault()
		showLoader(true)
		shuffleCards('right')

		setTimeout(() => {
			showLoader(false)
			setSuccess(formHolder, `MESSAGE SENT`)
		}, 2000)
	})
}

const setSuccess = (el, msg) => {
	el.innerHTML = msg
}