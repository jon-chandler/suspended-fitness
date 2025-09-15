let setListener =  []
let settings =  []
let resizeID


let winH = window.innerHeight
let scrollTop = window.pageYOffset || document.documentElement.scrollTop
let scrollBottom = scrollTop + winH
let targets

const listeners = ['deviceorientation', 'visibilitychange', 'load', '...']

const minWidth = 800

const bgContainer = document.getElementById('background-animation')
const footer = document.getElementsByTagName('footer')[0]

const parallax = ()=> {

	const targetClass = '.parallax-elem'
	const childClass = '.js-parallax-elem'

	targets = Array.prototype.slice.call(document.querySelectorAll(targetClass),0)

	if(targets.length === 0) {
		return
	}

	targets.forEach((target,index) => {
		
		target.setAttribute('data-index',index)
		
		const child = target.querySelector(childClass)
		
		if(!child) {
			return
		}

		settings.push({
			child: child,
			scrollRatio: (child.clientHeight - target.clientHeight) / (winH + target.clientHeight)
		})

		setListener.push(
			{
				target: target,
				handleEvent: function handleEvent () {
					observer.observe(target)
				}
			}
		)

		bindThem(target)
	})


	window.addEventListener('resize', ()=> {
		setAnimationSize()
		clearTimeout(resizeID)
		resizeID = setTimeout(() => {
			winH = window.innerHeight
			targets.forEach((target,index) => {
				if(!settings[index].child) {
					return
				}
				settings[index].scrollRatio = (settings[index].child.clientHeight - target.clientHeight) / (winH + target.clientHeight)
			})
		}, 10)
	})

	window.addEventListener('scroll', ()=> {
		scrollTop = window.pageYOffset || document.documentElement.scrollTop
		scrollBottom = scrollTop + winH
	}, {passive: false})

	
	for(event of listeners) {
	    window.addEventListener(event, function() {
	        window.dispatchEvent(new Event('resize'))
	    })
	}

	
}

const observerFunc = (entries)=> {
	entries.forEach(entry => {
  		const target = entry.target
		const listener =  setListener[target.getAttribute('data-index')]
		
		if(entry.isIntersecting) {
    		target.style.willChange = 'transform'
			window.addEventListener('scroll', listener, {passive: false})
		} else {
    		target.style.willChange = ''
			window.removeEventListener('scroll', listener, {passive: false})
		}

		requestAnimationFrame(parallaxFunc.bind(target))
	})
}

const parallaxFunc = function() {

	const index =  Number(this.getAttribute('data-index'))
	let targetPosi = scrollTop

	let setVal = (targetPosi - settings[index].scrollRatio.toFixed(1))

	//Ahem... Artificial limit
	if(setVal > 800 && screen.width < minWidth) {
		setVal = 200
	} else if (setVal > 900) {
		setVal = 900
	}

	settings[index].child.style.transform = 'translateY('+ (setVal) +'px)'
}


let observer = new IntersectionObserver(observerFunc, {
	root: null,
	rootMargin: '0px',
	threshold: .5
})

const bindThem = (elem) => {
	observer.observe(elem)
	requestAnimationFrame(parallaxFunc.bind(elem))
}

const addObserver = (entries)=> {
	entries.forEach(entry => {
		requestAnimationFrame(parallaxFunc.bind(entry))
	})
}

const setAnimationSize = () => {
	let sz = footer.getBoundingClientRect().top + window.scrollY
	bgContainer.style.minHeight = `${sz}px`

	targets.forEach((target) => {
		target.style.setProperty('--defHeight', `${sz}px`)
	})
}

window.addEventListener('DOMContentLoaded', () => {
	const bgAmin = document.getElementById('background-animation')

	if(!bgAmin) {
		return
	}

	parallax()
	bgContainer.scrollTo(0, window.innerHeight)
	setAnimationSize()
})