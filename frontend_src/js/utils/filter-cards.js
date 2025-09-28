import * as bootstrap from 'bootstrap'

import { setConstrainedElHeight, animtateRange} from './utils'

const filterCards = document.querySelectorAll('.course-card')
const containerEl = document.getElementById('card-container')
const mobileFilterBtn = document.querySelector('.course-filter--launch')
const bgContainer = document.getElementById('background-animation')

const isFilterPage = !!document.getElementById('course-filters')

const introDiv = document.querySelector('.intro')
const footer = document.getElementsByTagName('footer')[0]
const body = document.getElementsByTagName('body')[0]

let filterModal

const getUniqueValues = (key, transformFn) => {

	const courseCards = document.querySelectorAll('.course-card')
	const values = new Set()

	courseCards.forEach(card => {
		const data = JSON.parse(card.dataset.courseInfo)
		if (data[key]) {
			const value = transformFn ? transformFn(data[key]) : data[key]
			if (value) values.add(JSON.stringify(value))
		}
	});

	return Array.from(values).map(v => {
		try { return JSON.parse(v) } catch { return v }
	})

}


const buildSelect = (id, label, options, title) => {
	const select = document.createElement('select')
	select.id = id
	select.className = 'select max-w'

	const defaultOption = document.createElement('option')
	defaultOption.value = ''
	defaultOption.textContent = `${label}`;
	select.appendChild(defaultOption)

	options.forEach(opt => {
		const option = document.createElement('option')
		option.value = opt
		option.textContent = opt
		select.appendChild(option)
	})

  	return select
}

const parseMonthYear = (dateStr) => {

  	const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/)
  	if (!match) return null

  	const day = parseInt(match[1], 10)
  	const monthIndex = parseInt(match[2], 10) - 1
  	let year = parseInt(match[3], 10)
  	if (year < 100) year += 2000

  	const date = new Date(year, monthIndex, day)

	return {
		name: `${date.toLocaleString('default', { month: 'long' })} ${year}`,
		index: monthIndex,
		year: year
	}
}

const updateFilterOptionStates = () => {
    const locationSelect = document.getElementById('locationFilter')
    const competencySelect = document.getElementById('competencyFilter')
    const monthSelect = document.getElementById('monthFilter')

    const selectedLocation = locationSelect.value
    const selectedCompetency = competencySelect.value
    const selectedMonth = monthSelect.value

    const allCourses = Array.from(document.querySelectorAll('.course-card')).map(card => {
    const data = JSON.parse(card.dataset.courseInfo)
    return {
        element: card,
        data,
        monthYear: parseMonthYear(data.courseDates)
    }
})


const matches = (course, location, competency, month) => {
    const locationMatch = !location || course.data.courseLocation === location
    const competencyMatch = !competency || course.data.courseCompetency === competency
    const monthMatch = !month || (course.monthYear && course.monthYear.name === month)

    return locationMatch && competencyMatch && monthMatch
}

Array.from(locationSelect.options).forEach(option => {
    if (!option.value) return 
        const wouldMatch = allCourses.some(c =>
        matches(c, option.value, selectedCompetency, selectedMonth)
    )
    option.disabled = !wouldMatch
})


Array.from(competencySelect.options).forEach(option => {
    if (!option.value) return
        const wouldMatch = allCourses.some(c =>
        matches(c, selectedLocation, option.value, selectedMonth)
    )
    option.disabled = !wouldMatch
})

Array.from(monthSelect.options).forEach(option => {
    if (!option.value) return
        const wouldMatch = allCourses.some(c =>
        matches(c, selectedLocation, selectedCompetency, option.value)
    )
        option.disabled = !wouldMatch
    })
}

let prevCount = 0

const filterCourses = () => {
	const locationFilter = document.getElementById('locationFilter').value
  	const competencyFilter = document.getElementById('competencyFilter').value
  	const monthFilter = document.getElementById('monthFilter').value
  	const courseCount = document.getElementById('course-count')

  	let count = 0

	document.querySelectorAll('.course-card').forEach(card => {

		card.classList.remove('offset-md-2')

	    const data = JSON.parse(card.dataset.courseInfo)

	    const locationMatch = !locationFilter || data.courseLocation === locationFilter
	    const competencyMatch = !competencyFilter || data.courseCompetency === competencyFilter

	    const parsed = parseMonthYear(data.courseDates)
	    const courseMonthYear = parsed ? parsed.name : null
	    const monthMatch = !monthFilter || courseMonthYear === monthFilter

	    const shouldShow = locationMatch && competencyMatch && monthMatch

	    if (shouldShow) {
	      	count++

	      	if (count % 2 != 0) card.classList.add('offset-md-2')

	      	if (card.classList.contains('hidden')) {
				card.style.display = 'block'
				requestAnimationFrame(() => card.classList.remove('hidden'))
			}

	    } else {

			if (!card.classList.contains('hidden')) {
	        	card.classList.add('hidden')
	        	setTimeout(() => {
					if (card.classList.contains('hidden')) {
						card.style.display = 'none'
					}
				}, 310)
			}
		}

  	})

	let coursesAvailMsg = (count === 1) ? ` Course available` : ` Courses available`
	animtateRange(courseCount, prevCount, count, true, coursesAvailMsg)

	prevCount = (count) ? count : 0

	updateFilterOptionStates()

	setTimeout(() => {
		window.dispatchEvent(new Event('resize'))
		let scrollP = (window.scrollY + containerEl.getBoundingClientRect().y) - 160
		window.scrollTo(0, scrollP)
		hackeyNudge()
	}, 350)
}


document.addEventListener('DOMContentLoaded', () => {

	if(!isFilterPage) {
		return
	}

	const constrainedEl = document.querySelector('.constrained-height')
	
	const monthYearObjects = getUniqueValues('courseDates', parseMonthYear)
    	.filter(Boolean)
    	.reduce((acc, m) => {
    		if (!acc.some(existing => existing.name === m.name)) acc.push(m)
    			return acc
    		}, [])
    	.sort((a, b) => a.year === b.year ? a.index - b.index : a.year - b.year)

    const locationSelect = buildSelect('locationFilter', 'Location', getUniqueValues('courseLocation'))
	locationSelect.addEventListener('change', filterCourses)

	const competencySelect = buildSelect('competencyFilter', 'Competency level', getUniqueValues('courseCompetency'))
	competencySelect.addEventListener('change', filterCourses)

	const monthSelect = buildSelect('monthFilter', 'Start date', monthYearObjects.map(m => m.name))
	monthSelect.addEventListener('change', filterCourses)


	document.getElementById('location-filter').appendChild(locationSelect)
	document.getElementById('competency-filter').appendChild(competencySelect)
	document.getElementById('date-filter').appendChild(monthSelect)


	filterModal = new bootstrap.Modal(document.getElementById('filter-modal'), {
		keyboard: false
	})

	mobileFilterBtn.addEventListener('click', ()=> {

		filterModal.show()

		document.getElementById('location-filter-modal').appendChild(locationSelect)
		document.getElementById('date-filter-modal').appendChild(competencySelect)
		document.getElementById('competency-filter-modal').appendChild(monthSelect)

	})

	shuffleStack()

	setTimeout(() => {
		setConstrainedElHeight(containerEl, constrainedEl, 50)
	}, 500)

	window.addEventListener('resize', () => {
		setConstrainedElHeight(containerEl, constrainedEl, 50)
		hackeyNudge()
	})

})

const hackeyNudge = () => {
	window.scrollTo(0, window.scrollY)
}

const shuffleStack = () => {
	document.querySelectorAll('.course-card').forEach((card, i) => {
		if (i % 2 === 0) card.classList.add('offset-md-2')
	})
}



