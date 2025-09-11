import "./components/navigation"
import "./utils/parallax"

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const body = document.getElementsByTagName('body')[0]
const contentLoader = document.querySelector('.modal__loader')

const swiper = new Swiper(".testimonial-carousel", {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".testimonial-pagination",
		clickable: true,
	},
})

window.addEventListener('DOMContentLoaded', () => {
	if(!contentLoader) {
		return
	}


	setTimeout(() => {
		contentLoader.classList.remove('is-open')
		body.classList.remove('scroll-lock')
	}, 3000)
	
})