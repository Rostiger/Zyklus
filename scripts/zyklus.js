'use strict'

let entries = []
const stats = {}
const days = ["{{day-sunday}}", "{{day-monday}}", "{{day-tuesday}}", "{{day-wednesday}}", "{{day-thursday}}", "{{day-friday}}", "{{day-saturday}}"]
const months = ["{{month-january}}", "{{month-february}}", "{{month-march}}", "{{month-april}}", "{{month-may}}", "{{month-june}}", "{{month-july}}", "{{month-august}}", "{{month-september}}", "{{month-october}}", "{{month-november}}", "{{month-december}}"]
const maxDuration = 35


function Zyklus() {
	const defaultTheme = themes.AARON
	this.language
	this.themeName

	this.install = function(host) {
		this.io = new IO(this)
		this.theme = new Theme(defaultTheme)
		this.theme.install(host)
		this.interpreter = new Interpreter()
		this.interface = new Interface(this)
		this.interface.install(host)
	}

	this.start = function() {
		this.theme.start()
		this.io.load()
		this.interpreter.start()
		this.interface.datePicker.start()
		this.update()
	}

	this.update = function() {
		if (entries.length > 0) {
			for (const id in entries) entries[id].update(id)
			this.stats()
			entries.sort(sortByDate)
		}
		this.interface.update()
	}

	this.stats = function () {

		this.daysSinceEntry = function (id) {
			const date1 = regularDate(new Date())
			const date2 = entries[id].endDate == undefined ? entries[id].startDate : entries[id].endDate
			return Math.floor(daysDiff(date1, date2) / stats.avrgCycleDuration)
		}

		let totalDays = 0
		let menstruationDays = 0

		for (const entry of entries) {
			totalDays += entry.cycleDuration
			menstruationDays += entry.mensDuration
		}
	  stats.avrgCycleDuration = (totalDays / entries.length).toFixed(2)
		stats.avrgMensDuration = (menstruationDays / entries.length).toFixed(2)
		
		stats.cyclesSinceLastEntry = this.daysSinceEntry(0)
	  stats.cyclesSinceFirstEntry = this.daysSinceEntry(entries.length - 1)
	  
	  stats.lastEstimatedCycle = entries[0].day < stats.avrgCycleDuration ? entries[0].startDate : addDays(entries[0].startDate, stats.avrgCycleDuration * stats.cyclesSinceLastEntry)
	  stats.lastCycle = entries[0].startDate
	  stats.nextCycle = addDays(stats.lastCycle, Math.floor(stats.avrgCycleDuration))
	}

	this.getFormData = function (obj) {
	  const id = obj.id
	  const split = id.indexOf("_")
	  if (split != -1) {
	    const key = id.slice(0,split)
	    const index = id.slice(split+1)
	    const entry = entries[index]
	    entry[key] = obj.value
	  } else {
	    const entry = new Entry(obj.value)
	    entries.push(entry)
	  }
	  this.update()
	  this.io.save()
	}

  this.deleteData = function () {
		const header = this.interpreter.parse("{{settings-delete-data}}")
		const content = this.interpreter.parse(`<h2 class="confirmation">{{settings-delete-data-confirmation}}</h2>`)
		this.interface.popup.open(header, content, `zyklus.io.reset()`)
	}
}