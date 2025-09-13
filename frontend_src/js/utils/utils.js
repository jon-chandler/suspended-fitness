const cardContainer = document.querySelector('.card-container')
const cards = document.querySelectorAll('.card')

const shuffleCards = (topCard) => {
	if(!cards) {
		return
	}

	cards.forEach(card => {
		card.classList.add('shuffle')
		setTimeout(() => {
			card.classList.remove('shuffle')
		}, 1000)
	})
	setTimeout(() => {
		topCard === 'left' ? cards[0].classList.add('card--top') : cards[1].classList.add('card--top')
	}, 500)
}

let dir = 'left'

const cardCheck = (els) => {
	els.forEach((el) => {
		if (el.isIntersecting) {
			shuffleCards(dir)
			observer.unobserve(cardContainer)
		}
	})
}

const observer = new IntersectionObserver(cardCheck)
observer.observe(cardContainer)
