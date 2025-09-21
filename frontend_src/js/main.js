import "./components/navigation"
import "./utils/parallax"

import { makeMap } from "./components/maps"
import {shuffleCards, broadcaster, showLoader} from "./utils/utils"

import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import "./utils/stripe"

const DEVMODE = false
const isLocal = (location.hostname === 'localhost') ? 1 : 0
const backendDomain = (isLocal) ? 'http://localhost/' : 'http://192.168.0.113/'


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


	if(!DEVMODE) {
		const sse = new EventSource(`${backendDomain}broadcast.php`)

		sse.addEventListener('contentChange', function(e){
			let data = e.data.data
			console.log(e, data)
			susChannel.postMessage({'newContentMsg' : `MSG from backend: ${data.msg}`})
		})
	}

})

window.addEventListener('beforeunload', (e) => {
	showLoader(true)
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