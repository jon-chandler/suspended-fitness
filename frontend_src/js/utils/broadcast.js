import { showAnnouncement, hideAnnouncement} from "../components/announcer"

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
			break;
			case 'paymentReceived':
				showAnnouncement('success', message.msg)
			break;
				defashowAnnouncement('warning', message.msg)
			break; 
		}

		
	}

}

