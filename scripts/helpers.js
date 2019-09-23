	const addDays = function(date, days) {
	  const newDate = new Date(date)
	  newDate.setDate(newDate.getDate() + days)
	  return newDate
	}

	const msToDays = function(milliseconds) {
	  return parseInt(Math.ceil(milliseconds/24/60/60/1000).toFixed(0))
	}

	const timeDiff = function(date1, date2) {
		const d1 = new Date(date1)
		const d2 = new Date(date2)
		return d1 - d2
	}

	const prettyDate = function(timeStamp, long = false) {
		const d = new Date(timeStamp)
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		const day = d.getDate()
		const month = long ? months[d.getMonth()] : months[d.getMonth()].slice(0,3).concat('.')
		const year = d.getFullYear()
		const date = `${day}. ${month} ${year}`
	  return date
	}

	const regularDate = function(timeStamp = new Date()) {
		return `${timeStamp.getFullYear()}-${leadingZero(timeStamp.getMonth()+1)}-${timeStamp.getDate()}`
	}

const leadingZero = function(number, zeros = 1) {
	const one = "1"
	let leading = ""
	let counter = 0
	while (counter < zeros) {
		leading = leading.concat("0")
		counter++
	}
	return number < parseInt(one.concat(leading)) ? leading.concat(number.toString()) : number.toString()
}
