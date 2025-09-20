import "./components/navigation"
import "./utils/parallax"

import { makeMap } from "./components/maps"
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
	}, 100)
})

const saveContentBtn = document.querySelectorAll('.open-print-dialog')
Array.from(saveContentBtn).forEach(btn => { 
	btn.addEventListener('click', ()=> {
		window.print()
	})
})


const locationMap = document.getElementById('location-map')

if(locationMap) {
	let lat = 51.4533431
	let lng = -0.1087879

	makeMap(lat, lng)
}