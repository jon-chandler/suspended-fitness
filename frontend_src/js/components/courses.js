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


let data = {
		'courseTitle': 'Total Beginners Pole Course',
		'courseInfo': 'This 5 week course is for complete and Total Beginners ie) You’ve never touched a pole in your life or for those of you who’ve literally had a couple of classes. Our five week programme will get you doing more than you would ever have believed. Just book, you won’t regret it.',
		'courseLocation': 'Brockwell Lido',
		'courseDates': '6PM: 10/12/26',
		'courseDuration': '5 weeks',
		'courseCompetency': 'Beginner',
		'courseCost': '£100',
		'courseAvailability': 6,
		'courseLat' : 51.4533431,
		'courseLng' : -0.1087879
	}

Array.from(infoBtns).forEach((btn, i) => {
	btn.addEventListener('click', (e)=> {
		let contentID = e.target.closest('[data-course-id]').dataset.courseId
		console.log(contentID)
		courseModal.show()
		document.querySelector('.modal-body').innerHTML = popInfoModal(data)
		setTimeout(() => {
			makeMap(data.courseLat, data.courseLng)
		}, 500)
		
	})
})


Array.from(bookBtns).forEach((btn, i) => {
	btn.addEventListener('click', (e)=> {
		let contentID = e.target.closest('[data-course-id]').dataset.courseId
		window.location = `/booking.html?cID=${contentID}`
	})
})

const popInfoModal = (data) => {

	const template = `<div class="col-5">
        					<h4>${data.courseTitle}</h4>
        					<p>${data.courseInfo}</p>
							<div class="course-row">
								location: <span class="pill">${data.courseLocation}</span>
							</div>
							<div class="course-row">
								Next available start date(s): <span class="pill">${data.courseDates}</span>
							</div>
							<div class="course-row">
								Course duration: <span class="pill">${data.courseDuration}</span>
							</div>
							<div class="course-row">
								Competency level: <span class="pill">${data.courseCompetency}</span>
							</div>
							<div class="course-row">
								Cost: <span class="pill">${data.courseCost}</span>
							</div>
							<div class="course-row">
								Availability: <span class="pill availability">${data.courseAvailability}</span>
							</div>
							<div class="card--action-container">
								<button class="button button--black">Book now</button>
								<button class="button button--white">Contact us</button>
							</div>
      					</div>
						<div class="col-5">
								<div id="map-launch"></div>
								<div class="map-container" id="location-map" data-lat="${data.courseLat}" data-lng="${data.courseLng}">
						</div>
					`
	return template
}