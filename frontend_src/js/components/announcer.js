const announceEl = document.getElementById('announce')
const announceContainer = announceEl.querySelector('.response')
const announceClose = announceEl.querySelector('.close')

export function showAnnouncement(type, msg, extra = null) {

	if(!announceEl) {
		return
	}

	const attr = 'data-type'

	announceEl.classList.add('active')
	announceEl.removeAttribute(attr)
	announceEl.setAttribute(attr, type)
	announceContainer.innerHTML = msg

	setTimeout(() => {
		hideAnnouncement()
	}, 5000)

	announceClose.addEventListener('click', ()=> {
		hideAnnouncement()
	})

}

export function hideAnnouncement() {
	if(!announceEl) {
		return
	}	

	announceEl.classList.remove('active')
}