const courseCards = document.querySelectorAll('.card')
const cardContainer = document.getElementById('card-container')

const stackCheck = (els) => {
	els.forEach(el => {
		if (el.isIntersecting) {
			Array.from(courseCards).forEach((card, i) => {
				setTimeout(_ => {
					card.classList.add('show')
				}, 200* i)
			})
		}
	})
}
const observer = new IntersectionObserver(stackCheck, {
	root: null,
	rootMargin: '100px',
	threshold: .2
})

if(cardContainer) {
	observer.observe(cardContainer)
}
