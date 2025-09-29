import { shuffleCards, showLoader, scrollToPos } from './utils'
import { initializeStripe } from './payment'


const formLoaderInfo = document.getElementById('pre-form-content')
const paymentForm = document.getElementById('payment-form')

const minWidth = 800

export function validateForm (_form, fields) {

    let isValid = true
    let firstInvalidField = null
    let delay = 0

    const isFieldValid = (input, type) => {
        const value = input.value.trim()
        switch (type) {
            case 'select':
                return value !== '-' && value !== ''
            case 'text':
                return value.length > 0
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            case 'tel':
                return /^\+?[0-9\s\-()]{7,15}$/.test(value)
            case 'checkbox':
                return input.checked
            default:
                return true
        }
    }   

    fields.forEach(({ id, type }) => {
        const input = document.getElementById(id)
        if (!input) return
        const label = _form.querySelector(`label[for='${id}']`)
        const fieldValid = isFieldValid(input, type)

        if (!fieldValid) {
            isValid = false
            if (!firstInvalidField) firstInvalidField = input

            setTimeout(() => {
                input.classList.add('error')
                if (label) label.classList.add('error-label')
                input.offsetWidth
            }, delay)

            delay += 100
        } else {
            input.classList.remove('error')
            if (label) label.classList.remove('error-label')
        }
    })

    // check before re-submit
    fields.forEach(({ id, type }) => {
        const input = document.getElementById(id)
        if (!input) return
        const label = _form.querySelector(`label[for="${id}"]`)

        const handler = () => {
          if (isFieldValid(input, type)) {
            input.classList.remove("error")
            if (label) label.classList.remove("error-label")
          }
        }

        input.addEventListener("input", handler)
        input.addEventListener("change", handler)
    })


    if (!isValid) {

        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            firstInvalidField.focus({ preventScroll: true })
        }

        if ('vibrate' in navigator) {
            navigator.vibrate([500, 200, 700])
        }
        
        return false

    } else {

    	showLoader(true)
		
        if(paymentForm) {
            toggleLoaderInfo(_form, true)
            shuffleCards('right')
            initializeStripe()
			if(window.innerWidth < minWidth) {
				paymentForm.scrollIntoView({ behavior: 'smooth', block: 'end' })
			}
        }

        return true

    }

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

const resize_ob = new ResizeObserver(() => {
    window.dispatchEvent(new Event('resize'))
})

if(paymentForm) {
    resize_ob.observe(paymentForm)
}