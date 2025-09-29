import { shuffleCards, showLoader, scrollToPos } from './utils'
import { initializeStripe } from './payment'


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

    fields.forEach(({id, type, message}) => {
        const input = document.getElementById(id)
        if (!input) return
        const label = _form.querySelector(`label[for='${id}']`)
        const fieldValid = isFieldValid(input, type)

        if (!fieldValid) {
            isValid = false
            if (!firstInvalidField) firstInvalidField = input

            setTimeout(() => {
                input.classList.add('error')
                if (label) {
                    label.classList.add('error-label')
                    label.setAttribute('title', message)
                }
                input.offsetWidth
            }, delay)

            delay += 100
        } else {
            input.classList.remove('error')
            if (label) label.classList.remove('error-label')
        }
    })

    // check before re-submit
    fields.forEach(({id, type, message}) => {
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

        if ('vibrate' in navigator) navigator.vibrate([500, 200, 700])

        return false

    } else {

    	showLoader(true)
		
        return true

    }

}


