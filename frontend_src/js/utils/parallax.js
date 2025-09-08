let setListener =  []
let settings =  []
let resizeID


let winH = window.innerHeight
let scrollTop = window.pageYOffset || document.documentElement.scrollTop
let scrollBottom = scrollTop + winH


const parallax = ()=> {

	const targetClass = '.parallax-elem'
	const childClass = '.js-parallax-elem'

	const targets = Array.prototype.slice.call(document.querySelectorAll(targetClass),0)

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
			//scrollRatio: (child.clientHeight - target.clientHeight) / (winH + target.clientHeight)
			scrollRatio: child.clientHeight / (winH + target.clientHeight)
		})

		console.log(settings)		

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
		clearTimeout(resizeID)
		resizeID = setTimeout(() => {
			winH = window.innerHeight
			targets.forEach((target,index) => {
				if(!settings[index].child) {
					return
				}
				settings[index].scrollRatio = (settings[index].child.clientHeight - target.clientHeight) / (winH + target.clientHeight)
			})
		}, 200)
	})

	window.addEventListener('scroll', ()=> {
		scrollTop = window.pageYOffset || document.documentElement.scrollTop
		scrollBottom = scrollTop + winH
	}, {passive: true})

	
}

const observerFunc = (entries)=> {
	entries.forEach(entry => {
  		const target = entry.target
		const listener =  setListener[target.getAttribute('data-index')]
		
		if(entry.isIntersecting) {
    		target.style.willChange = 'transform'
			window.addEventListener('scroll', listener, {passive: true})
		} else {
    		target.style.willChange = ''
			window.removeEventListener('scroll', listener, {passive: true})
		}

		requestAnimationFrame(parallaxFunc.bind(target))
	})
}

const parallaxFunc = function() {
	const index =  Number(this.getAttribute('data-index'))
	let targetPosi = scrollTop + 100

	//const setVal = ((scrollBottom - targetPosi) * settings[index].scrollRatio).toFixed(1) * 1.1

	let setVal = (targetPosi - settings[index].scrollRatio.toFixed(1))

	settings[index].child.style.transform = 'translate3d(0,'+ (setVal) +'px,0)'
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

window.addEventListener('DOMContentLoaded', () => {
	const bgAmin = document.getElementById('background-animation')

	if(!bgAmin) {
		return
	}

	parallax()
})