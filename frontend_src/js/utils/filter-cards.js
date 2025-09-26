const filterCards = document.querySelectorAll('.course-card')
const containerEl = document.getElementById('card-container')

function getUniqueValues(key, transformFn) {

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


function buildSelect(id, label, options, title) {
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

function parseMonthYear(dateStr) {

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

function filterCourses() {
	const locationFilter = document.getElementById('locationFilter').value
	const competencyFilter = document.getElementById('competencyFilter').value
	const monthFilter = document.getElementById('monthFilter').value

	document.querySelectorAll('.course-card').forEach(card => {
		const data = JSON.parse(card.dataset.courseInfo)

	    const locationMatch = !locationFilter || data.courseLocation === locationFilter
	    const competencyMatch = !competencyFilter || data.courseCompetency === competencyFilter


    	const parsed = parseMonthYear(data.courseDates)
    	const courseMonthYear = parsed ? parsed.name : null
    	const monthMatch = !monthFilter || courseMonthYear === monthFilter

	    card.style.display = (locationMatch && competencyMatch && monthMatch) ? '' : 'none'

		window.dispatchEvent(new Event('resize'))

		let scrollP = (window.scrollY + containerEl.getBoundingClientRect().y) - 160
		window.scrollTo(0, scrollP)
		
	})
}

document.addEventListener('DOMContentLoaded', () => {
	const filtersDiv = document.getElementById('filters')

	const locationSelect = buildSelect('locationFilter', 'Location', getUniqueValues('courseLocation'))
	locationSelect.addEventListener('change', filterCourses)

	const competencySelect = buildSelect('competencyFilter', 'Competency level', getUniqueValues('courseCompetency'))
	competencySelect.addEventListener('change', filterCourses)

	const monthYearObjects = getUniqueValues('courseDates', parseMonthYear)
    	.filter(Boolean)
    	.reduce((acc, m) => {
    		if (!acc.some(existing => existing.name === m.name)) acc.push(m);
    			return acc;
    		}, [])
    	.sort((a, b) => a.year === b.year ? a.index - b.index : a.year - b.year);

	const monthSelect = buildSelect('monthFilter', 'Start date', monthYearObjects.map(m => m.name))
	monthSelect.addEventListener('change', filterCourses)

	document.getElementById('location-filter').appendChild(locationSelect)
	document.getElementById('competency-filter').appendChild(competencySelect)
	document.getElementById('date-filter').appendChild(monthSelect)
})





