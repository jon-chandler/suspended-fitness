const cardContainer = document.querySelector('.card-container')
const cards = document.querySelectorAll('.content-card')
const minWidth = 800

const body = document.getElementsByTagName('body')[0]
const footer = document.getElementsByTagName('footer')[0]

const contentLoader = document.querySelector('.modal__loader')

const animateCardsOnload = document.querySelector('.animate-cards-on-load')

const constrainedEl = document.querySelector('.constrained-height')

let topCard = 'right'

export function shuffleCards(topCard) {

	if(!cards || window.innerWidth < minWidth) {
		return
	}

	cards.forEach(card => {
		card.classList.add('shuffle')
		setTimeout(() => {
			card.classList.remove('shuffle')
		}, 1000)
	})
	setTimeout(() => {
		if(topCard === 'left') {
			cards[0].classList.add('content-card--top')
			cards[1].classList.remove('content-card--top')
		} else {
			cards[1].classList.add('content-card--top')
			cards[0].classList.remove('content-card--top')
		}
	}, 500)
}


// Do we want to restack the 'cards' on initial load and intersection scroll? Looks quite nice
const cardCheck = (els) => {
	els.forEach((el) => {
		if (el.isIntersecting) {
			shuffleCards(topCard)
			observer.unobserve(cardContainer)
		}
	})
}

const observer = new IntersectionObserver(cardCheck, {
	root: null,
	rootMargin: '100px',
	threshold: .2
})


if(animateCardsOnload) {
	observer.observe(cardContainer)
}


export function showLoader(shouldShow) {
	if(!contentLoader) {
		return
	}

	if(!shouldShow) {
		contentLoader.classList.remove('is-open')
		body.classList.remove('scroll-lock')
	} else {
		contentLoader.classList.add('is-open')
		body.classList.add('scroll-lock')
	}
}

export function scrollToPos(x, y) {
	if(!y) {
		return
	}

	window.scrollTo(x, y)
}


export function setConstrainedElHeight(container, el, heightMod = null) {
	if(!el) {
		return
	}
	
	let boundingBox = container.getBoundingClientRect().height + heightMod
	el.style.height = `${boundingBox}px`
}

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		setConstrainedElHeight(cardContainer, constrainedEl, 0)
	}, 10)
})

document.addEventListener('resize', () => {
	//setConstrainedElHeight(cardContainer, constrainedEl, 0)
})

