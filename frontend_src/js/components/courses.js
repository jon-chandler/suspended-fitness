import * as bootstrap from 'bootstrap'
import { makeMap } from "./maps"

const isOfferPage = document.querySelector('.offer-page')

const courseCards = document.querySelectorAll('.card')
const cardContainer = document.getElementById('card-container')

const infoBtns = document.querySelectorAll('.info-btn')
const bookBtns = document.querySelectorAll('.book-btn')

let courseModal

if(!!isOfferPage) {
	courseModal = new bootstrap.Modal(document.getElementById('course-details'), {
		keyboard: true
	})
}

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

Array.from(infoBtns).forEach((btn, i) => {
	btn.addEventListener('click', (e)=> {

		let contentData = e.target.closest('[data-course-id]')
		let contentID = contentData.dataset.courseId
		let data = JSON.parse(contentData.dataset.courseInfo)

		courseModal.show()
		document.querySelector('.modal-body').innerHTML = popInfoModal(data)
		setTimeout(() => {
			makeMap(data.courseLat, data.courseLng)
		}, 500)
		
	})
})


Array.from(bookBtns).forEach((btn, i) => {
	btn.addEventListener('click', (e)=> {
		
		let contentData = e.target.closest('[data-course-id]')
		let contentID = contentData.dataset.courseId
		let data = JSON.parse(contentData.dataset.courseInfo)

		const url = '/booking.html'

		const form = document.createElement('form')
		form.method = 'GET'
		form.action = url

		Object.keys(data).forEach(key => {
			const input = document.createElement('input')
			input.type = 'hidden'
			input.name = key
			input.value = data[key]
			form.appendChild(input)
		})

		document.body.appendChild(form)
		form.submit()
	})
})

const popInfoModal = (data) => {

	const template = `<div class="container-fluid">
    					<div class="row">
							<div class="col-lg-6 col-md-12 col-sm-12">
	        					<h4 class="course-header">${data.courseTitle}</h4>
	        					<p>${data.courseInfo}</p>
								<div class="course-row">
									<span>location:</span> <span class="pill">${data.courseLocation}</span>
								</div>
								<div class="course-row">
									<span>Next available start date(s):</span> <span class="pill">${data.courseDates}</span>
								</div>
								<div class="course-row">
									<span>Course duration:</span> <span class="pill">${data.courseDuration}</span>
								</div>
								<div class="course-row">
									<span>Competency level:</span> <span class="pill">${data.courseCompetency}</span>
								</div>
								<div class="course-row">
									<span>Cost:</span> <span class="pill">${data.courseCost}</span>
								</div>
								<div class="course-row">
									<span>Availability:</span> <span class="pill availability"><span>${data.courseAvailability}</span> spaces</span>
								</div>
								<div class="card--action-container">
									<button class="button button--black">Book now</button>
									<button class="button button--white">Contact us</button>
								</div>
      						</div>
							<div class="col-lg-5 col-md-12 col-sm-12 ms-auto">
									<div id="map-launch" class="map-launch"></div>
									<div class="map-container" id="location-map" data-lat="${data.courseLat}" data-lng="${data.courseLng}">
							</div>
						</div>
					</div>
					`
	return template
}