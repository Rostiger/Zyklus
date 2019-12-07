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

	const daysDiff = function (date1, date2) {
		return Math.floor(msToDays(timeDiff(date1, date2)))
	}

	const prettyDate = function(timeStamp, long = false) {
		if (timeStamp == undefined) {console.error(`prettyDate:`,`Timestamp is undefined`); return undefined}
		const d = getDateObj(timeStamp)
		const day = d.day
		const month = long ? d.month : d.month.slice(0,3).concat('.')
		const year = d.year

		return `${day}. ${month} ${year}`
	}

	const getDateObj = function(timeStamp) {
		const d = new Date(timeStamp)
		const date = {}
		date.weekday = days[d.getDay()]
		date.day = d.getDate()
		date.month = zyklus.interpreter.parse(months[d.getMonth()])
		date.year = d.getFullYear()
		return date
	}

	const regularDate = function(timeStamp = new Date(), time = false) {
		const t = `${leadingZero(timeStamp.getHours())}${leadingZero(timeStamp.getMinutes())}`
		const d = `${timeStamp.getFullYear()}-${leadingZero(timeStamp.getMonth()+1)}-${timeStamp.getDate()}`
		return time ? `${d}-${t}` : d
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

const sortByDate = function (a, b) {
  return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
}
