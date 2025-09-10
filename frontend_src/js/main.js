import "./components/navigation"
import "./utils/parallax"

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper(".testimonial-carousel", {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".testimonial-pagination",
		clickable: true,
	},
})