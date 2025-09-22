const announceEl = document.getElementById('announce')
const announceContainer = announceEl.querySelector('.response')

export function showAnnouncement(type, msg, extra = null) {

	if(!announceEl) {
		return
	}

	console.log(msg)

	announceEl.classList.add('active')
	announceContainer.innerHTML = msg

	setTimeout(() => {
		hideAnnouncement()
	}, 5000)

}

export function hideAnnouncement() {
	if(!announceEl) {
		return
	}	

	announceEl.classList.remove('active')
}