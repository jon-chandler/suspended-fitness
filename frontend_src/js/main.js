import "./components/navigation"
import "./utils/parallax"

import "./utils/filter-cards"

import { makeMap } from "./components/maps"
import "./components/courses"
import "./components/contact"


import {shuffleCards, broadcaster, showLoader} from "./utils/utils"
import { showAnnouncement, hideAnnouncement} from "./components/announcer"
import { createNotificationService } from "./utils/push-notifcation"

//import "./utils/validate"

import Swiper from 'swiper/bundle'

import 'swiper/css/bundle'

import "./utils/payment"

import { handleMessages } from "./utils/broadcast"


const DEVMODE = false
const isLocal = (location.hostname === 'localhost') ? 1 : 0
const backendDomain = (isLocal) ? 'http://localhost' : 'http://192.168.0.113'


const susChannel = new BroadcastChannel('susChannel')

handleMessages()

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
	}, 200)

	if(!DEVMODE) {
		const sse = new EventSource(`${backendDomain}/broadcast.php`)

		sse.addEventListener('contentChange', (e)=> {
			let _data = JSON.parse(e.data)
			susChannel.postMessage({'event' : 'contentChange', 'msg': _data.msg, 'completeResponse' : _data})
		})

		window.addEventListener('beforeunload', () => {
			sse.close()
		})

	}

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


createNotificationService()





