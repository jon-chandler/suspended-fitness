import "./components/navigation"
import "./utils/parallax"


import {shuffleCards, broadcaster, showLoader} from "./utils/utils"

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import "./utils/stripe"


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

window.addEventListener('load', () => {
	setTimeout(() => {
		showLoader(false)
	}, 500)
	susChannel.postMessage({'newContentMsg' : 'Messages bound to channel'})
})