import { Loader } from "@googlemaps/js-api-loader"

const locationMap = document.getElementById('location-map')

if(locationMap) {

	const loader = new Loader({
		apiKey: 'AIzaSyCSQTqTijoj0_tBVlrvU4WIJ2-WIYRpSKM',
		version: 'weekly'
	})

	let pos = { lat: 51.4533431, lng: -0.1087879 }

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

}