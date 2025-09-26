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
				showAnnouncement('info', message.msg)
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

	let cardLoader = `<div class="beacon--content">
							<div class="overlay-loader overlay-loader--sm"></div>
						</div>
						`

	newsEl.innerHTML = cardLoader
	nudgeContent(newsEl)

	setTimeout(() => {

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
		nudgeContent(newsEl)

	}, 1000)
}

const nudgeContent = (el) => {
	let beacon = document.querySelector('.beacon--content')
	let elBounds = beacon.getBoundingClientRect()
	let contentPadd = `${elBounds.height}px`
	let nextEl = el.nextElementSibling

	nextEl.style.marginTop = contentPadd
}

// setTimeout(() => {
// 	showNewNews('Total Beginners Course starting on Friday 19th in Brockwell Park', '/')
// }, 1500)
