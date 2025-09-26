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

	link = (link) ? `<a href='${link}' class='white'>Find out more</a>` : ''

	let newsContent = `<div class="beacon--content">
							<div class='beacon--message'>
								<span class='font--pink'>NEW
								</span> ${message}
									<div class="white">${link}</div>
								</div>
						</div>
						`

	newsEl.innerHTML = newsContent

	let beacon = document.querySelector('.beacon--content')
	let elBounds = beacon.getBoundingClientRect()
	let contentPadd = `${elBounds.height}px`
	let nextEl = newsEl.nextElementSibling

	nextEl.style.marginTop = contentPadd
}


//showNewNews('Total Beginners Course starting on Friday 19th in Brockwell Park', '/')