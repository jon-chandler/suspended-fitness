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
				showNewNews(message.msg)
			break;
			case 'newsUpdate':
				showNewNews(message.msg)
			break;
			case 'paymentReceived':
				showAnnouncement('success', message.msg)
			break;
			case 'showWarning':
				showAnnouncement('warning', message.msg)
			break; 
				showNewNews(message.msg)
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
							<div><span class='font--pink'>NEW</span> ${message}</div>
							<div>${link}</div>
						</div>
						`

	newsEl.innerHTML = newsContent

	let beacon = document.querySelector('.beacon--content')
	let elBounds = beacon.getBoundingClientRect()
	let contentPadd = `${elBounds.height}px`
	let nextEl = newsEl.nextElementSibling

	nextEl.style.marginTop = contentPadd
}
