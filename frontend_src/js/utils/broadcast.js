import { showAnnouncement, hideAnnouncement} from "../components/announcer"

const susChannel = new BroadcastChannel('susChannel')

export function handleMessages() {

	susChannel.onmessage = (ev) => {
		let evData = ev.data
		whatToDo(evData)

		console.log('<><><><><><><> ', evData)
	}


	const whatToDo = (message) => {

		console.log('EVENT: ', message.event)

		switch(message.event) {
			case 'contentChange':
				console.log('----- contentChange')
				showAnnouncement('info', message.msg)
			break;
			case 'paymentReceived':
				console.log('----- payment')
				showAnnouncement('booking', message.msg)
			break;
				console.log('----- generic')
				defashowAnnouncement('general', message.msg)
			break; 
		}

		
	}

}

