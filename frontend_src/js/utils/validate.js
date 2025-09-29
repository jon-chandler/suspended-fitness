import { shuffleCards, showLoader, scrollToPos } from './utils'
import { initializeStripe } from './payment'


const formLoaderInfo = document.getElementById('pre-form-content')
const paymentForm = document.getElementById('payment-form')

const minWidth = 800

export function validateForm (_form, fields) {

	let isValid = true
    let firstInvalidField = null
    let delay = 0

    fields.forEach(({ id, type }) => {
        const input = document.getElementById(id)
        const label = _form.querySelector(`label[for='${id}']`)
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
            case 'tel':
                 fieldValid = /^\+?[0-9\s\-()]{7,15}$/.test(input.value.trim())
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

        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            firstInvalidField.focus({ preventScroll: true })
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

	fields.forEach(({ id, type }) => {
        const input = document.getElementById(id)
        const label = _form.querySelector(`label[for='${id}']`)

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