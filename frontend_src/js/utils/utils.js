const cardContainer = document.querySelector('.card-container')
const cards = document.querySelectorAll('.card')
const minWidth = 800

const body = document.getElementsByTagName('body')[0]
const contentLoader = document.querySelector('.modal__loader')

const animateCardsOnload = document.querySelector('.animate-cards-on-load')

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
			cards[0].classList.add('card--top')
			cards[1].classList.remove('card--top')
		} else {
			cards[1].classList.add('card--top')
			cards[0].classList.remove('card--top')
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
