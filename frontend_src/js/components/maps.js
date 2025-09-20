import { Loader } from "@googlemaps/js-api-loader"

const locationMap = document.getElementById('location-map')
const launchGoogle = document.getElementById('map-launch')

export function makeMap(lat, lng) {

	if(!locationMap || !lat || !lng) {
		return
	}

	const mapLink = `https://maps.google.com/?q=${lat},${lng}`

	const loader = new Loader({
		apiKey: 'AIzaSyCSQTqTijoj0_tBVlrvU4WIJ2-WIYRpSKM',
		version: 'weekly'
	})

	let pos = { lat: lat, lng: lng }

	loader.load().then(async () => {
		const { Map } = await google.maps.importLibrary('maps')
		const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

		let map = new Map(locationMap, {
			center: pos,
			zoom: 16,
			mapId: '1b1878fa6169bbb6a365cdcc',
			disableDefaultUI: true
		})

		let marker = new AdvancedMarkerElement({
    		map: map,
    		position: pos,
    		title: 'Suspended Fitness',
  		})
	})


	launchGoogle.addEventListener('click', _=> {
		window.open(mapLink)
	})

}


