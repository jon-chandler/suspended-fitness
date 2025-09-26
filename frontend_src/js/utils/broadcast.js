import { showAnnouncement, hideAnnouncement} from "../components/announcer"
import {shuffleCards, broadcaster, showLoader} from "./utils"

const susChannel = new BroadcastChannel('susChannel')

export function handleMessages() {

	susChannel.onmessage = (ev) => {
		let evData = ev.data
		whatToDo(evData)
	}


	const whatToDo = (message) => {

		switch(message.event) {
			case 'contentChange':
				showAnnouncement('info', message.msg)
				showNewNews(message.msg)
			break;
			case 'paymentReceived':
				showAnnouncement('success', message.msg)
			break;
				defashowAnnouncement('warning', message.msg)
			break; 
		}

		
	}

}

export function showNewNews(message, link = null) {
	let newsEl = document.getElementById('news-flash')

	if(!newsEl) {
		return
	}

	shuffleCards('left')

	link = (link) ? `<a href='${link}'>Find out more</a>` : ''

	let newsContent = `<div class="beacon--content">
							<p><span class='font--pink'>NEW</span> ${message}</p>
							${link}
						</div>
						`


	newsEl.innerHTML = newsContent

	let beacon = document.querySelector('.beacon--content')
	let elBounds = beacon.getBoundingClientRect()
	let contentPadd = `${elBounds.height}px`
	let nextEl = newsEl.nextElementSibling

	nextEl.style.marginTop = contentPadd

}
