import "./components/navigation"
import "./utils/parallax"

import {shuffleCards, broadcaster} from "./utils/utils"

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const body = document.getElementsByTagName('body')[0]
const contentLoader = document.querySelector('.modal__loader')

const susChannel = new BroadcastChannel('susChannel')

const swiper = new Swiper('.testimonial-carousel', {
		spaceBetween: 300,
		centeredSlides: true,
		speed: 800,
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

	contentLoader.classList.remove('is-open')
	body.classList.remove('scroll-lock')

	susChannel.postMessage({'newContentMsg' : 'Messages bound to channel'})
	
})