'use strict'

let entries = []
let stats = {}

function Zyklus() {

	this.install = function(host) {
		this.theme = theme
		this.io = new IO(this)
		this.interface = new Interface(this)
		this.interface.install(host)
	}

	this.start = function() {
		this.io.load()
	}

	this.update = function() {
		if (entries.length > 0) {
			entries.sort(sortByDate)
			for (const id in entries) entries[id].update(id)
			this.stats()
		}
		this.interface.update()
	}

	this.stats = function () {
		let total = 0
		for (const id in entries) {
			total += id > 0 ? timeDiff(entries[id-1].startDate,entries[id].startDate) : 0
		}
	  stats.avrgCycleDuration = (msToDays(total) / entries.length).toFixed(2)
	  stats.cyclesSinceLastEntry = Math.floor(entries[0].day / stats.avrgCycleDuration)
	  stats.lastCycle = entries[0].day < stats.avrgCycleDuration ? entries[0].startDate : addDays(entries[0].startDate, stats.avrgCycleDuration * stats.cyclesSinceLastEntry)
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

	this.deleteEntry = function (id) {
    entries.splice(id,1)
    this.update()
	  this.io.save()
  }

  function validate(value, msg) {
    if (value == null || value == "") {
      alert(msg)
      return true
    } 
    return false
  }

  function sortByDate(a, b) {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  }
}