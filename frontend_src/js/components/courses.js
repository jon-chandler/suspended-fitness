import * as bootstrap from 'bootstrap'
import { makeMap } from "./maps"

const isOfferPage = document.querySelector('.offer-page')

const courseCards = document.querySelectorAll('.card')
const cardContainer = document.getElementById('card-container')

const infoBtns = document.querySelectorAll('.info-btn')

const modalBody = document.querySelector('.modal-body')

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

		modalBody.innerHTML = defaultInfoModalState()

		let contentData = e.target.closest('[data-course-info]')
		let data = JSON.parse(contentData.dataset.courseInfo)

		courseModal.show()
		let contentTimer = setTimeout(() => {
			modalBody.innerHTML = popInfoModal(data)
			makeMap(data.courseLat, data.courseLng)
			bindBookingBtns()
			clearTimeout(contentTimer)
		}, 1000)
		
	})
})

const bindBookingBtns = () => {

	const bookBtns = document.querySelectorAll('.book-btn')

	Array.from(bookBtns).forEach((btn, i) => {
		btn.addEventListener('click', (e)=> {
			
			let contentData = e.target.closest('[data-course-info]')
			let data = JSON.parse(contentData.dataset.courseInfo)

			let courseId = data.courseId

			const url = `/booking.html?courseId=${courseId}`
			window.location = url

			// const form = document.createElement('form')
			// form.method = 'GET'
			// form.action = url

			// Object.keys(data).forEach(key => {
			// 	const input = document.createElement('input')
			// 	input.type = 'hidden'
			// 	input.name = key
			// 	input.value = data[key]
			// 	form.appendChild(input)
			// })

			// document.body.appendChild(form)
			// form.submit()
		})
	})
}

const defaultInfoModalState = () => {
	const template = `<div class="ssc container-fluid col-12">
						<div class="row col-12 g-0">
							<div class="row col-12 d-flex">
								<div class="col-12 col-xl-6">
									<div class="ssc-head-line mb-32"></div>
									<div class="ssc-square ssc-square--rect mb-24"></div>
									<div class="ssc-line mb-32"></div>
									<div class="ssc-line mb-32"></div>
									<div class="ssc-line mb-32"></div>
									<div class="ssc-line mb-32"></div>
									<div class="ssc-line mb-32"></div>
									<div class="ssc-line mb-32"></div>
								</div>
								<div class="col-12 col-xl-5 offset-xl-1">
									<div class="ssc-square mb only-lg"></div>
								</div>
							</div>
						</div>
					</div>
					`
		return template
}

const popInfoModal = (data) => {

	const template = `<div class="container-fluid" data-course-info='${JSON.stringify(data)}'>
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
									<button class="button button--black book-btn">Book now</button>
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



bindBookingBtns()




