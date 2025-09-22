const susChannel = new BroadcastChannel('susChannel')

export function handleMessages() {

	susChannel.onmessage = (ev) => {
		let evData = ev.data
		whatToDo(evData)
	}


	const whatToDo = (message) => {
		switch(message.event) {
			case 'contentChange':
				console.log(`NEW CONTENT.... ALERT USER ${message.msg}`)
				console.log(' ->> ', message)
			break;
			case 'paymentReceived':
				console.log(`Course booked ${message}`)
			break;
			default:
				console.log(message)
			break; 
		}

		
	}

}

